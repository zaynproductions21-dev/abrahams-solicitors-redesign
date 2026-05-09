"use client";

/**
 * UK Visa Eligibility Wizard — v1 (Spouse Visa only)
 *
 * Built per the 6-advisor Council review (May 2026):
 *  • Pure decision tree, no AI (Council unanimous on v1)
 *  • Spouse Visa only — fastest-to-impact route, highest avg fee
 *  • 6 questions max, plain English (no "Appendix FM EC-P", "MIR", "non-visa
 *    national" in the question text — statutory cites move to result footers)
 *  • Neutral routing language — NO "Strong / Likely / Time-barred" labels.
 *    The wizard tells the visitor which route is relevant, not whether they
 *    will succeed (Contrarian's blocking change for SRA Standard 8.1/8.6/8.8)
 *  • Result FIRST, then optional email capture (Outsider — the
 *    "ask-before-show" pattern reads as a trap)
 *  • Imran Shah named as the reviewing solicitor on every result + statutory
 *    footnote (Content Quality + Contrarian)
 *  • GDPR/PECR consent gate — no SalesHub write until the visitor explicitly
 *    asks for the result by email (Contrarian)
 *  • Last reviewed date displayed; quarterly rules-update review owned by
 *    Imran (Content Quality + Contrarian)
 *
 * v2 follow-ons (deferred per Council):
 *  • Shareable result URLs + WhatsApp/PDF share (Expansionist)
 *  • Additional routes (Skilled Worker, ILR) added weekly after spouse proves
 *  • /visa-wizard/logic.txt for AI search citation (Content Quality)
 *  • AI summary at end (Hybrid Option C) — only if spouse v1 converts
 */

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrustBadges } from "@/components/v6/trust-badges";
import { TeamStrip } from "@/components/v6/team-strip";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { GclidField, MsclkidField } from "@/components/v6/gclid-field";
import { useSpamGuard } from "@/lib/spam-client";
import { pushFormSubmit } from "@/lib/tracking";
import { submitEnquiry } from "@/lib/publishos";
import { team } from "@/lib/team";
import {
  JsonLd, breadcrumbSchema, personSchema,
} from "@/components/v6/jsonld";
import {
  ArrowRight, ArrowLeft, ChevronRight, ChevronDown, ShieldCheck,
  CheckCircle2, AlertCircle, Phone, Calendar, Scale, Info, Sparkles,
} from "lucide-react";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/visa-wizard/";
const LAST_REVIEWED = "May 2026";
const AUTHOR = team.find(t => t.slug === "imran-shah")!;

// ─── Question schema ─────────────────────────────────────────────────────────
type Option = { value: string; label: string; helper?: string };
type Question = {
  id: string;
  heading: string;
  helper?: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    id: "where",
    heading: "Where are you and your partner right now?",
    helper: "We'll use this to work out which version of the spouse visa applies.",
    options: [
      { value: "uk-sponsoring-abroad", label: "I'm in the UK, my partner is abroad" },
      { value: "abroad-sponsoring-uk", label: "I'm abroad, my partner is in the UK" },
      { value: "both-uk", label: "We're both in the UK" },
      { value: "both-abroad", label: "We're both abroad" },
    ],
  },
  {
    id: "relationship",
    heading: "What's your relationship?",
    options: [
      { value: "married", label: "Married or in a civil partnership" },
      { value: "cohabiting-2y", label: "Lived together for 2+ years (unmarried partners)" },
      { value: "engaged", label: "Engaged — planning to marry in the UK within 6 months" },
      { value: "newer", label: "Together less than 2 years, not married yet" },
    ],
  },
  {
    id: "uk-status",
    heading: "What's the UK partner's status?",
    helper: "The partner who is (or will be) in the UK as the sponsor.",
    options: [
      { value: "british", label: "British citizen" },
      { value: "settled", label: "Settled (Indefinite Leave to Remain)" },
      { value: "refugee", label: "Refugee or humanitarian protection" },
      { value: "pre-settled", label: "Pre-settled status under EU Settlement Scheme" },
      { value: "other-visa", label: "Another visa (work, student, etc.)" },
    ],
  },
  {
    id: "income",
    heading: "Annual household income (gross, before tax)?",
    helper: "This is the financial requirement — the threshold is currently £29,000.",
    options: [
      { value: "above-29k", label: "£29,000 or more from employment / self-employment" },
      { value: "savings-route", label: "Below £29,000 but we have £88,500+ in savings" },
      { value: "disability-exempt", label: "The UK partner receives certain disability benefits (exempt)" },
      { value: "below", label: "Below £29,000 with no large savings" },
    ],
  },
  {
    id: "english",
    heading: "English language — does the applicant partner have any of these?",
    helper: "The applying partner needs to show English ability. Pick the closest match.",
    options: [
      { value: "test", label: "An English test certificate at CEFR A1 or higher" },
      { value: "degree", label: "A degree taught in English" },
      { value: "english-country", label: "Citizenship of a majority English-speaking country (US, Canada, Australia, NZ, etc.)" },
      { value: "none", label: "None of the above yet" },
    ],
  },
  {
    id: "history",
    heading: "Has the applying partner been refused a UK visa before?",
    options: [
      { value: "no", label: "No, never refused" },
      { value: "old", label: "Yes, but more than 10 years ago" },
      { value: "recent", label: "Yes, in the last 10 years" },
    ],
  },
];

// ─── Routing logic ───────────────────────────────────────────────────────────
type Answers = Partial<Record<string, string>>;

type RouteResult = {
  /** Route identifier — used for telemetry + share URLs (v2). */
  id: string;
  /** Plain-English route name shown to visitor. */
  name: string;
  /** Statutory citation shown in result footer (E-E-A-T). */
  citation: string;
  /** Two-sentence summary of what this route is. */
  summary: string;
  /** Specific things the visitor needs to address before applying. */
  considerations: string[];
  /** Tone hint for the result card (positive | mixed | needs-review). */
  tone: "positive" | "mixed" | "needs-review";
};

function routeFor(a: Answers): RouteResult {
  const where = a.where;
  const rel = a.relationship;
  const status = a.uk_status;
  const income = a.income;
  const english = a.english;
  const history = a.history;

  // Engaged → Fiancé(e) Visa
  if (rel === "engaged") {
    return {
      id: "fiance-visa",
      name: "Fiancé(e) or Proposed Civil Partner Visa",
      citation: "Appendix FM, Section EC-P (Family Members) — Immigration Rules",
      summary:
        "The Fiancé(e) Visa is a 6-month entry-clearance visa for a partner coming to the UK to marry or enter a civil partnership. Once married in the UK, you switch to the Spouse Visa from inside the UK.",
      considerations: [
        "You will need to show genuine intention to marry within 6 months of arrival",
        "Financial requirement (£29,000) and English language requirements still apply",
        "Plan the wedding date and venue before applying — UKVI will ask",
      ],
      tone: "positive",
    };
  }

  // Newer relationship, not married
  if (rel === "newer") {
    return {
      id: "newer-relationship",
      name: "Relationship requirement not yet met",
      citation: "Appendix FM, Section EC-P.1.1 — relationship requirements",
      summary:
        "The Spouse / Partner Visa requires either marriage / civil partnership OR 2+ years of cohabitation. Without either, the standard route isn't available yet.",
      considerations: [
        "Options: marry or enter a civil partnership, then apply",
        "Or: build 2 years of cohabitation evidence (joint tenancy, bills, photos), then apply as unmarried partners",
        "A solicitor can advise on the safest, fastest path given your specific facts",
      ],
      tone: "needs-review",
    };
  }

  // EU Settlement Scheme angle (pre-settled status)
  if (status === "pre-settled") {
    return {
      id: "euss-family",
      name: "EU Settlement Scheme — family member route",
      citation: "Appendix EU and Appendix EU (Family Permit) — Immigration Rules",
      summary:
        "If your partner has pre-settled status under the EU Settlement Scheme, the family member route under Appendix EU is likely the right starting point — not the standard Spouse Visa.",
      considerations: [
        "EUSS family permits have different evidence requirements to Appendix FM",
        "The relationship must usually have been formed before 31 December 2020 for some routes",
        "A solicitor will identify whether EUSS or Appendix FM is stronger for your facts",
      ],
      tone: "needs-review",
    };
  }

  // Sponsor on a non-settled visa
  if (status === "other-visa") {
    return {
      id: "sponsor-not-eligible",
      name: "Most non-settled visas cannot sponsor a partner under Appendix FM",
      citation: "Appendix FM, Section EC-P.1.1(c) — eligibility of sponsor",
      summary:
        "Standard Spouse / Partner sponsorship requires the UK partner to be a British citizen, settled (ILR), or have refugee status. There may still be routes — for example, dependants of certain work visas — but these are different rules.",
      considerations: [
        "Skilled Worker / Health & Care Worker / Student visa holders can sometimes bring a dependent partner under those visa-specific routes",
        "The dependent route's rules differ from Appendix FM (no separate financial threshold for dependants of Skilled Workers)",
        "Book a consultation so we can identify the right dependent route for your visa category",
      ],
      tone: "needs-review",
    };
  }

  // Recent refusal — flag for solicitor review
  if (history === "recent") {
    return {
      id: "recent-refusal-review",
      name: "Spouse Visa with prior-refusal complications",
      citation: "Appendix FM Section EC-P + Suitability provisions (S-LTR / S-EC)",
      summary:
        "Recent refusals (within the last 10 years) affect future applications. Depending on the refusal reason, a fresh application, administrative review or appeal may be the right next step before reapplying.",
      considerations: [
        "Get the original refusal letter reviewed line-by-line — many refusals have specific procedural answers",
        "False-representation or deception findings carry a 10-year re-entry ban that needs careful handling",
        "Don't reapply blind — this is exactly the case where solicitor review pays for itself",
      ],
      tone: "needs-review",
    };
  }

  // Financial requirement gap
  if (income === "below") {
    return {
      id: "financial-gap",
      name: "Spouse Visa with financial requirement to address",
      citation: "Appendix FM-SE (specified evidence) — financial requirement",
      summary:
        "The £29,000 financial requirement is the most common reason for refusal. Several routes around it exist: third-party support, future earnings, self-employment averaging, savings combined with income.",
      considerations: [
        "Joint income from both partners may count once the applicant is in the UK",
        "Cash savings of £88,500 substitute for income; partial savings can top up below-threshold income",
        "Specific exemptions apply if the UK partner receives certain disability benefits",
        "These are the cases where a solicitor's pre-application review is most valuable",
      ],
      tone: "needs-review",
    };
  }

  // English language gap
  if (english === "none") {
    return {
      id: "english-gap",
      name: "Spouse Visa with English language requirement to address",
      citation: "Appendix FM, Section EC-P.4.1 — English language requirement",
      summary:
        "Your partner needs to evidence English ability before applying. The standard route is a CEFR A1 test from a UKVI-approved provider for the initial visa (B1 for settlement).",
      considerations: [
        "IELTS Life Skills A1 is the most common test — usually book 3-4 weeks ahead",
        "Exemptions exist for over-65s, those with long-term physical or mental conditions, and graduates of UK-recognised English-taught degrees",
        "We'll advise on the right test or exemption for your case",
      ],
      tone: "needs-review",
    };
  }

  // In-country switch (both in UK, applicant on another visa)
  if (where === "both-uk") {
    return {
      id: "in-country-switch",
      name: "Spouse Visa leave to remain (in-country switch)",
      citation: "Appendix FM, Section R-LTRP — leave to remain as a partner",
      summary:
        "If both of you are in the UK and the UK partner is British, settled, or has refugee status, the applying partner may be able to switch to a Spouse Visa from inside the UK — depending on their current visa status.",
      considerations: [
        "Visitors generally cannot switch and must leave and apply from abroad",
        "Other visa categories (Student, Worker) usually can switch in-country",
        "Section 3C leave can preserve immigration status during the application — important if a current visa is close to expiry",
      ],
      tone: "mixed",
    };
  }

  // Both abroad — they need to settle in UK, build a relationship in another country first?
  // Or partner needs to come to UK first as British citizen / settled. Edge case.
  if (where === "both-abroad") {
    return {
      id: "both-abroad",
      name: "Standard Spouse Visa (entry clearance) — sequencing matters",
      citation: "Appendix FM, Section EC-P — entry clearance as a partner",
      summary:
        "The Spouse Visa is the right route, but the UK partner usually needs to be in the UK at the time of application (or returning with the applicant). The income evidence required depends on which.",
      considerations: [
        "If the UK partner is moving back to the UK at the same time, returning-resident rules + future-earnings income can both apply",
        "If the UK partner is staying abroad longer, the application typically can't yet meet the requirements",
        "This is a common sequencing question — book a free consultation and we'll plot the timeline",
      ],
      tone: "mixed",
    };
  }

  // Standard happy path — entry clearance from abroad, sponsor in UK, criteria appear met
  return {
    id: "standard-spouse-visa",
    name: "Spouse / Partner Visa (entry clearance)",
    citation: "Appendix FM, Section EC-P (Family Members) — Immigration Rules",
    summary:
      "Based on your answers, the standard Spouse / Partner Visa under Appendix FM is the route most relevant to discuss. Your circumstances appear to fit the core eligibility shape — relationship, sponsor status, financial requirement and English language all look in scope.",
    considerations: [
      "Documentary evidence is decisive — most refusals come from missing or unclear evidence, not eligibility itself",
      "UKVI standard service is roughly 12 weeks for entry clearance; priority and super-priority services are available",
      "A solicitor review before submission is the highest-leverage step you can take — it's much cheaper than a refusal",
    ],
    tone: "positive",
  };
}

const TONE_STYLES: Record<RouteResult["tone"], { ring: string; bg: string; text: string }> = {
  positive: { ring: "ring-emerald-200", bg: "bg-emerald-50", text: "text-emerald-700" },
  mixed: { ring: "ring-blue-200", bg: "bg-blue-50", text: "text-blue-700" },
  "needs-review": { ring: "ring-amber-200", bg: "bg-amber-50", text: "text-amber-700" },
};

// ─── Page ────────────────────────────────────────────────────────────────────
export default function VisaWizardPage() {
  const [step, setStep] = useState(0); // 0..5 = questions, 6 = result, 7 = email-capture, 8 = thanks
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const spam = useSpamGuard();

  const setAnswer = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id.replace(/-/g, "_")]: value }));
  };

  const result = step >= 6 ? routeFor(answers) : null;

  async function handleEmailCapture(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitting(true);
    pushFormSubmit({ email, phone });
    const r = result!;
    const caseDetail = [
      `Visa Wizard route: ${r.name}`,
      `Citation: ${r.citation}`,
      ...QUESTIONS.map(q => {
        const v = answers[q.id.replace(/-/g, "_")];
        return `${q.heading} → ${v ?? "(skipped)"}`;
      }),
    ].join("\n");
    await submitEnquiry({
      source: `visa-wizard:${r.id}`,
      name, email, phone,
      service: "UK Spouse Visa (wizard)",
      case: caseDetail,
    }, spam.payload());
    setSubmitting(false);
    setSubmitted(true);
    setStep(8);
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
        { name: "Immigration", url: "https://www.abrahamssolicitors.co.uk/immigration/" },
        { name: "UK Visa Wizard" },
      ])} />
      <JsonLd data={personSchema({
        name: AUTHOR.name,
        jobTitle: AUTHOR.role,
        sraNumber: AUTHOR.sraNumber,
        sraUrl: AUTHOR.sraUrl,
        bio: AUTHOR.short,
        slug: AUTHOR.slug,
      })} />

      {/* Breadcrumb */}
      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/immigration/" className="hover:text-brand-red transition-colors">Immigration</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">UK Visa Wizard</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-bold text-brand-red uppercase tracking-widest">Visa Wizard · v1 (Spouse Visa)</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="h-3 w-3" />
              Free · No call · No spam
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Which UK Spouse Visa route fits your situation?
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            Answer six plain-English questions. We&rsquo;ll tell you which Spouse Visa route looks most relevant, with the rule reference, and whatever you should think about next. <strong className="text-slate-900">No call follows automatically</strong> — we only contact you if you specifically ask us to email the result.
          </p>

          {/* Disclaimer banner — top of every page state */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5 max-w-3xl">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" />
              <div className="text-sm text-slate-600 leading-relaxed">
                This wizard is a guide to which visa route may apply, <strong className="text-slate-700">not legal advice</strong> and not a prediction of outcome. Home Office decisions turn on the full evidence of your case.{" "}
                Reviewed by{" "}
                <Link href="/our-team/" className="font-semibold text-slate-900 hover:text-brand-red">{AUTHOR.name}</Link>
                {" "}— SRA #{AUTHOR.sraNumber} · admitted {AUTHOR.admittedYear} ·{" "}
                <a href={AUTHOR.sraUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-red underline-offset-2 hover:underline">verify on SRA register</a>
                . Last reviewed: {LAST_REVIEWED}.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wizard body */}
      <section className="py-10 lg:py-14 bg-slate-50/40">
        <div className="max-w-[760px] mx-auto px-6 lg:px-8">

          {/* Step bar (questions only) */}
          {step < QUESTIONS.length && (
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                <span>Step {step + 1} of {QUESTIONS.length}</span>
                <span className="flex items-center gap-1.5 text-brand-red">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  SRA #809071
                </span>
              </div>
              <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-brand-red transition-all duration-300" style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
              </div>
            </div>
          )}

          {/* Question screens */}
          {step < QUESTIONS.length && (() => {
            const q = QUESTIONS[step];
            const stateKey = q.id.replace(/-/g, "_");
            const selected = answers[stateKey];
            return (
              <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight tracking-tight">
                  {q.heading}
                </h2>
                {q.helper && <p className="mt-2 text-sm text-slate-500">{q.helper}</p>}
                <div className="mt-5 flex flex-col gap-2">
                  {q.options.map(o => {
                    const active = selected === o.value;
                    return (
                      <button
                        key={o.value}
                        type="button"
                        onClick={() => setAnswer(q.id, o.value)}
                        className={`flex items-start gap-3 w-full px-4 py-3 rounded-lg border text-sm text-left transition-colors ${active ? "border-brand-red bg-brand-red/5 text-slate-900 font-semibold" : "border-slate-200 text-slate-700 hover:border-slate-300"}`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center ${active ? "bg-brand-red border-brand-red" : "border-slate-300"}`}>
                          {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="leading-snug min-w-0">
                          {o.label}
                          {o.helper && <span className="block text-xs text-slate-400 font-normal mt-0.5">{o.helper}</span>}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-6 flex gap-2">
                  {step > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(s => s - 1)}
                      className="rounded-lg h-12 px-3 border-slate-200 text-slate-700 shrink-0"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={() => setStep(s => s + 1)}
                    disabled={!selected}
                    className="flex-1 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-wide disabled:opacity-40"
                  >
                    {step === QUESTIONS.length - 1 ? "See result" : "Continue"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            );
          })()}

          {/* Result screen — shown BEFORE asking for email (Outsider's blocking change) */}
          {step === QUESTIONS.length && result && (
            <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-6 sm:p-8">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ring-1 ${TONE_STYLES[result.tone].ring} ${TONE_STYLES[result.tone].bg} ${TONE_STYLES[result.tone].text}`}>
                <Sparkles className="h-3.5 w-3.5" />
                Most relevant route
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                {result.name}
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                {result.summary}
              </p>

              <div className="mt-6 p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">What to think about next</p>
                <ul className="space-y-2 text-sm text-slate-700">
                  {result.considerations.map(c => (
                    <li key={c} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Statutory citation footer */}
              <div className="mt-5 flex items-start gap-2 text-xs text-slate-500">
                <Scale className="h-3.5 w-3.5 shrink-0 mt-0.5 text-brand-red" />
                <span>
                  <strong className="text-slate-700">Rule reference:</strong> {result.citation}.
                  {" "}For the current Immigration Rules see{" "}
                  <a href="https://www.gov.uk/guidance/immigration-rules" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">gov.uk/guidance/immigration-rules</a>.
                </span>
              </div>

              {/* Two paths forward — book consultation OR email me the result */}
              <div className="mt-7 grid sm:grid-cols-2 gap-3">
                <DynamicCallLink className="flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-wide">
                  <Phone className="h-4 w-4" />
                  Book free consultation
                </DynamicCallLink>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(QUESTIONS.length + 1)}
                  className="rounded-lg h-12 text-sm font-semibold border-slate-300 text-slate-800 hover:border-brand-red hover:text-brand-red"
                >
                  Email me the result (no call)
                </Button>
              </div>

              <button
                type="button"
                onClick={() => { setStep(0); setAnswers({}); }}
                className="mt-5 text-xs text-slate-400 hover:text-slate-600 underline"
              >
                ← Start over with different answers
              </button>

              <p className="mt-5 text-xs text-slate-400 leading-relaxed">
                This is a guide, not legal advice. Eligibility on Home Office applications turns on your specific evidence. Reviewed by {AUTHOR.name} — SRA #{AUTHOR.sraNumber}. Last reviewed: {LAST_REVIEWED}.
              </p>
            </div>
          )}

          {/* Email capture screen — only if user opted in via "Email me the result" */}
          {step === QUESTIONS.length + 1 && result && (
            <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight tracking-tight">
                Email your result — no call, no spam
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                We&rsquo;ll send you a copy of your result. By submitting you agree we can email you about your visa enquiry. We won&rsquo;t add you to marketing lists, and we won&rsquo;t call unless you specifically ask.
              </p>
              <form onSubmit={handleEmailCapture} className="mt-6 space-y-3">
                <HoneypotInput value={spam.honeypot} onChange={spam.setHoneypot} />
                <GclidField />
                <MsclkidField />
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red" />
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red" />
                <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Phone (optional — only if you want a call)" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red" />

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(QUESTIONS.length)}
                    className="rounded-lg h-12 px-3 border-slate-200 text-slate-700 shrink-0"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="submit"
                    disabled={!name || !email || submitting}
                    className="flex-1 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-normal sm:tracking-wide disabled:opacity-40"
                  >
                    {submitting ? "Sending..." : "Email me the result"}
                  </Button>
                </div>

                <p className="text-xs text-slate-400 flex items-start gap-1.5 pt-1">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    Your details go straight to a solicitor — no third-party brokers. By submitting you agree to our{" "}
                    <Link href="/privacy-policy/" className="text-brand-red hover:underline">privacy policy</Link>.
                  </span>
                </p>
              </form>
            </div>
          )}

          {/* Thanks screen */}
          {step === QUESTIONS.length + 2 && submitted && result && (
            <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-6 sm:p-8 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">Thanks {name.split(" ")[0]}</h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-md mx-auto">
                We&rsquo;ve sent your result to <strong className="text-slate-900">{email}</strong>. If you also want to talk it through with {AUTHOR.name} or one of the team, here&rsquo;s how:
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <DynamicCallLink className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 px-6 text-sm font-bold uppercase tracking-wide">
                  <Phone className="h-4 w-4" />
                  <DynamicPhoneText />
                </DynamicCallLink>
                <Link href="/free-consultation/" className="inline-flex items-center justify-center rounded-lg h-12 px-6 text-sm font-semibold border border-slate-300 text-slate-800 hover:border-brand-red hover:text-brand-red">
                  Book online
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <TrustBadges />

      {/* Why use this wizard — content quality / E-E-A-T block */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Why we built this</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Plain-English routing. No sales call. No spam.
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              Most people landing on a UK visa page already know they need help — they don&rsquo;t know <em>which</em> route applies to their specific situation. The official UK government tool at{" "}
              <a href="https://www.gov.uk/check-uk-visa" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">gov.uk/check-uk-visa</a>
              {" "}is comprehensive but doesn&rsquo;t flag the practical considerations that decide most cases (financial gaps, English-language exemptions, in-country switching restrictions, recent refusals).
            </p>
            <p>
              This wizard is six plain-English questions written by{" "}
              <Link href="/our-team/" className="font-semibold text-slate-900 hover:text-brand-red">{AUTHOR.name}</Link>{" "}
              ({AUTHOR.role}, SRA #{AUTHOR.sraNumber}, admitted {AUTHOR.admittedYear}) and reviewed against the current Immigration Rules. The output is a route name, the relevant rule reference, and what you should think about next — not a prediction of whether you will succeed.
            </p>
            <p>
              <strong className="text-slate-900">It is free, anonymous until you ask us to follow up by email, and there is no automatic call.</strong> If you want to book a 30-minute free consultation, that&rsquo;s a separate decision you make at the end.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border-2 border-slate-200 bg-slate-50 p-5 sm:p-6">
            <p className="text-sm font-semibold text-slate-900 mb-2">What this wizard isn&rsquo;t</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>It&rsquo;s not legal advice. A solicitor reviewing the full evidence will give you a proper assessment.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>It&rsquo;s not a prediction of approval. Outcomes depend on your evidence, the case officer, and case-specific facts the wizard can&rsquo;t see.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>It only covers the Spouse / Partner Visa family in v1. Other routes (Skilled Worker, ILR, Citizenship) come next.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <TeamStrip />

      {/* Footer disclaimer */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-5 space-y-2">
          <p className="text-xs text-slate-400 text-center leading-relaxed">
            This page is general guidance, not legal advice. UKVI fees and the Immigration Health Surcharge change periodically — confirm current rates at gov.uk before applying. Past results do not guarantee future outcomes. Abrahams Solicitors · SRA-regulated firm #809071. Last reviewed: {LAST_REVIEWED} by {AUTHOR.name} (SRA #{AUTHOR.sraNumber}). Reviewed quarterly against Statements of Changes to the Immigration Rules.
          </p>
          <p className="text-xs text-slate-400 text-center leading-relaxed flex items-center justify-center gap-1.5">
            <Calendar className="h-3 w-3" /> Wizard logic last reviewed: {LAST_REVIEWED}. Page URL: {PAGE_URL}.
          </p>
        </div>
      </section>
    </>
  );
}
