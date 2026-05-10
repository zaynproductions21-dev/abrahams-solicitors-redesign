"use client";

/**
 * VisaWizardWidget — the wizard form/result/capture UI, extracted so it can
 * be embedded in either the standalone /visa-wizard/ page or the
 * /uk-spouse-visa/ hero (Pattern A from the Council placement decision).
 *
 * The widget handles its own state, routing logic, and CRM capture. The
 * consumer just chooses where to render it.
 *
 * Council mandates baked in (see /visa-wizard/page.tsx for full notes):
 *   • Pure decision tree, no AI
 *   • 6 plain-English questions (no statutory jargon in question text)
 *   • Neutral routing language (no "Strong / Likely / Time-barred" labels)
 *   • Result shown BEFORE email capture
 *   • SalesHub write only fires on explicit opt-in (GDPR/PECR)
 *   • Imran Shah named on every result + footer, "Last reviewed" date
 */

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { GclidField, MsclkidField } from "@/components/v6/gclid-field";
import { useSpamGuard } from "@/lib/spam-client";
import { pushFormSubmit } from "@/lib/tracking";
import { submitEnquiry } from "@/lib/publishos";
import { team } from "@/lib/team";
import {
  ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle, Phone,
  Scale, Sparkles, Calendar,
} from "lucide-react";

const LAST_REVIEWED = "May 2026";
const AUTHOR = team.find(t => t.slug === "imran-shah")!;

type Option = { value: string; label: string; helper?: string };
type Question = { id: string; heading: string; helper?: string; options: Option[] };

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

type Answers = Partial<Record<string, string>>;

type RouteResult = {
  id: string;
  name: string;
  citation: string;
  summary: string;
  considerations: string[];
  tone: "positive" | "mixed" | "needs-review";
};

function routeFor(a: Answers): RouteResult {
  const where = a.where;
  const rel = a.relationship;
  const status = a.uk_status;
  const income = a.income;
  const english = a.english;
  const history = a.history;

  if (rel === "engaged") return {
    id: "fiance-visa",
    name: "Fiancé(e) or Proposed Civil Partner Visa",
    citation: "Appendix FM, Section EC-P (Family Members) — Immigration Rules",
    summary: "The Fiancé(e) Visa is a 6-month entry-clearance visa for a partner coming to the UK to marry or enter a civil partnership. Once married in the UK, you switch to the Spouse Visa from inside the UK.",
    considerations: [
      "You will need to show genuine intention to marry within 6 months of arrival",
      "Financial requirement (£29,000) and English language requirements still apply",
      "Plan the wedding date and venue before applying — UKVI will ask",
    ],
    tone: "positive",
  };
  if (rel === "newer") return {
    id: "newer-relationship",
    name: "Relationship requirement not yet met",
    citation: "Appendix FM, Section EC-P.1.1 — relationship requirements",
    summary: "The Spouse / Partner Visa requires either marriage / civil partnership OR 2+ years of cohabitation. Without either, the standard route isn't available yet.",
    considerations: [
      "Options: marry or enter a civil partnership, then apply",
      "Or: build 2 years of cohabitation evidence (joint tenancy, bills, photos), then apply as unmarried partners",
      "A solicitor can advise on the safest, fastest path given your specific facts",
    ],
    tone: "needs-review",
  };
  if (status === "pre-settled") return {
    id: "euss-family",
    name: "EU Settlement Scheme — family member route",
    citation: "Appendix EU and Appendix EU (Family Permit) — Immigration Rules",
    summary: "If your partner has pre-settled status under the EU Settlement Scheme, the family member route under Appendix EU is likely the right starting point — not the standard Spouse Visa.",
    considerations: [
      "EUSS family permits have different evidence requirements to Appendix FM",
      "The relationship must usually have been formed before 31 December 2020 for some routes",
      "A solicitor will identify whether EUSS or Appendix FM is stronger for your facts",
    ],
    tone: "needs-review",
  };
  if (status === "other-visa") return {
    id: "sponsor-not-eligible",
    name: "Most non-settled visas cannot sponsor a partner under Appendix FM",
    citation: "Appendix FM, Section EC-P.1.1(c) — eligibility of sponsor",
    summary: "Standard Spouse / Partner sponsorship requires the UK partner to be a British citizen, settled (ILR), or have refugee status. There may still be routes — for example, dependants of certain work visas — but these are different rules.",
    considerations: [
      "Skilled Worker / Health & Care Worker / Student visa holders can sometimes bring a dependent partner under those visa-specific routes",
      "The dependent route's rules differ from Appendix FM (no separate financial threshold for dependants of Skilled Workers)",
      "Book a consultation so we can identify the right dependent route for your visa category",
    ],
    tone: "needs-review",
  };
  if (history === "recent") return {
    id: "recent-refusal-review",
    name: "Spouse Visa with prior-refusal complications",
    citation: "Appendix FM Section EC-P + Suitability provisions (S-LTR / S-EC)",
    summary: "Recent refusals (within the last 10 years) affect future applications. Depending on the refusal reason, a fresh application, administrative review or appeal may be the right next step before reapplying.",
    considerations: [
      "Get the original refusal letter reviewed line-by-line — many refusals have specific procedural answers",
      "False-representation or deception findings carry a 10-year re-entry ban that needs careful handling",
      "Don't reapply blind — this is exactly the case where solicitor review pays for itself",
    ],
    tone: "needs-review",
  };
  if (income === "below") return {
    id: "financial-gap",
    name: "Spouse Visa with financial requirement to address",
    citation: "Appendix FM-SE (specified evidence) — financial requirement",
    summary: "The £29,000 financial requirement is the most common reason for refusal. Several routes around it exist: third-party support, future earnings, self-employment averaging, savings combined with income.",
    considerations: [
      "Joint income from both partners may count once the applicant is in the UK",
      "Cash savings of £88,500 substitute for income; partial savings can top up below-threshold income",
      "Specific exemptions apply if the UK partner receives certain disability benefits",
      "These are the cases where a solicitor's pre-application review is most valuable",
    ],
    tone: "needs-review",
  };
  if (english === "none") return {
    id: "english-gap",
    name: "Spouse Visa with English language requirement to address",
    citation: "Appendix FM, Section EC-P.4.1 — English language requirement",
    summary: "Your partner needs to evidence English ability before applying. The standard route is a CEFR A1 test from a UKVI-approved provider for the initial visa (B1 for settlement).",
    considerations: [
      "IELTS Life Skills A1 is the most common test — usually book 3-4 weeks ahead",
      "Exemptions exist for over-65s, those with long-term physical or mental conditions, and graduates of UK-recognised English-taught degrees",
      "We'll advise on the right test or exemption for your case",
    ],
    tone: "needs-review",
  };
  if (where === "both-uk") return {
    id: "in-country-switch",
    name: "Spouse Visa leave to remain (in-country switch)",
    citation: "Appendix FM, Section R-LTRP — leave to remain as a partner",
    summary: "If both of you are in the UK and the UK partner is British, settled, or has refugee status, the applying partner may be able to switch to a Spouse Visa from inside the UK — depending on their current visa status.",
    considerations: [
      "Visitors generally cannot switch and must leave and apply from abroad",
      "Other visa categories (Student, Worker) usually can switch in-country",
      "Section 3C leave can preserve immigration status during the application — important if a current visa is close to expiry",
    ],
    tone: "mixed",
  };
  if (where === "both-abroad") return {
    id: "both-abroad",
    name: "Standard Spouse Visa (entry clearance) — sequencing matters",
    citation: "Appendix FM, Section EC-P — entry clearance as a partner",
    summary: "The Spouse Visa is the right route, but the UK partner usually needs to be in the UK at the time of application (or returning with the applicant). The income evidence required depends on which.",
    considerations: [
      "If the UK partner is moving back to the UK at the same time, returning-resident rules + future-earnings income can both apply",
      "If the UK partner is staying abroad longer, the application typically can't yet meet the requirements",
      "This is a common sequencing question — book a free consultation and we'll plot the timeline",
    ],
    tone: "mixed",
  };
  return {
    id: "standard-spouse-visa",
    name: "Spouse / Partner Visa (entry clearance)",
    citation: "Appendix FM, Section EC-P (Family Members) — Immigration Rules",
    summary: "Based on your answers, the standard Spouse / Partner Visa under Appendix FM is the route most relevant to discuss. Your circumstances appear to fit the core eligibility shape — relationship, sponsor status, financial requirement and English language all look in scope.",
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

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Push a wizard-specific event to the GTM dataLayer. Quietly no-ops on
 * the server. Wizard event names are prefixed `wizard_` so they're easy to
 * filter in GTM and GA4. */
function pushWizardEvent(event: string, payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

export function VisaWizardWidget({
  compact = false,
  source = "visa-wizard",
}: {
  /** Compact mode trims margins/padding for embedding inside narrow columns. */
  compact?: boolean;
  /** Source tag forwarded to SalesHub so wizard leads can be filtered by entry point. */
  source?: string;
}) {
  const [step, setStep] = useState(0); // 0..5 = questions, 6 = result, 7 = email-capture, 8 = thanks
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const spam = useSpamGuard();

  const setAnswer = (id: string, value: string) =>
    setAnswers(prev => ({ ...prev, [id.replace(/-/g, "_")]: value }));

  const result = step >= 6 ? routeFor(answers) : null;

  // ─── GTM telemetry ─────────────────────────────────────────────────────
  // Fire once on first mount — top-of-funnel count.
  const startedRef = useRef(false);
  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      pushWizardEvent("wizard_start", { source });
    }
  }, [source]);

  // Fire when the result page is shown (anonymous — no email yet) and when
  // the email capture is opened. The actual email submission keeps using
  // the existing pushFormSubmit() path so Google Ads + Bing Ads enhanced
  // conversions tags continue to fire on `ec_form_submit`.
  const lastTrackedStepRef = useRef<number | null>(null);
  useEffect(() => {
    if (lastTrackedStepRef.current === step) return;
    lastTrackedStepRef.current = step;
    if (step === QUESTIONS.length && result) {
      pushWizardEvent("wizard_result_shown", {
        source,
        route_id: result.id,
        route_name: result.name,
        tone: result.tone,
      });
    } else if (step === QUESTIONS.length + 1 && result) {
      pushWizardEvent("wizard_email_capture_opened", {
        source,
        route_id: result.id,
      });
    }
  }, [step, result, source]);

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
      source: `${source}:${r.id}`,
      name, email, phone,
      service: "UK Spouse Visa (wizard)",
      case: caseDetail,
    }, spam.payload());
    setSubmitting(false);
    setSubmitted(true);
    setStep(8);
  }

  const cardClass = `bg-white rounded-2xl border-2 border-slate-200 shadow-sm ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8"}`;

  return (
    <div className="w-full max-w-full">
      {/* Step bar (questions only) */}
      {step < QUESTIONS.length && (
        <div className="mb-4">
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
          <div className={cardClass}>
            <h2 className={`${compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"} font-black text-slate-900 leading-tight tracking-tight`}>
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
                    className={`flex items-start gap-3 w-full px-3 py-2.5 rounded-lg border text-[13px] sm:text-sm text-left transition-colors ${active ? "border-brand-red bg-brand-red/5 text-slate-900 font-semibold" : "border-slate-200 text-slate-700 hover:border-slate-300"}`}
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
                onClick={() => {
                  pushWizardEvent("wizard_question_answered", {
                    source,
                    question_id: q.id,
                    question_step: step + 1,
                    question_total: QUESTIONS.length,
                    answer: selected,
                  });
                  setStep(s => s + 1);
                }}
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

      {/* Result screen — shown BEFORE asking for email */}
      {step === QUESTIONS.length && result && (
        <div className={cardClass}>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ring-1 ${TONE_STYLES[result.tone].ring} ${TONE_STYLES[result.tone].bg} ${TONE_STYLES[result.tone].text}`}>
            <Sparkles className="h-3.5 w-3.5" />
            Most relevant route
          </div>
          <h2 className={`mt-4 ${compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"} font-black text-slate-900 leading-tight tracking-tight`}>
            {result.name}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {result.summary}
          </p>

          <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-100">
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

          <div className="mt-5 flex items-start gap-2 text-xs text-slate-500">
            <Scale className="h-3.5 w-3.5 shrink-0 mt-0.5 text-brand-red" />
            <span>
              <strong className="text-slate-700">Rule reference:</strong> {result.citation}.
              {" "}For the current Immigration Rules see{" "}
              <a href="https://www.gov.uk/guidance/immigration-rules" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">gov.uk/guidance/immigration-rules</a>.
            </span>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <DynamicCallLink className="flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-wide px-4 flex-1">
              <Phone className="h-4 w-4" />
              Book free consultation
            </DynamicCallLink>
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(QUESTIONS.length + 1)}
              className="rounded-lg h-12 text-sm font-semibold border-slate-300 text-slate-800 hover:border-brand-red hover:text-brand-red flex-1"
            >
              Email me the result
            </Button>
          </div>

          <button
            type="button"
            onClick={() => { setStep(0); setAnswers({}); }}
            className="mt-4 text-xs text-slate-400 hover:text-slate-600 underline"
          >
            ← Start over with different answers
          </button>

          <p className="mt-4 text-xs text-slate-400 leading-relaxed">
            Reviewed by {AUTHOR.name} — SRA #{AUTHOR.sraNumber}. Last reviewed: {LAST_REVIEWED}. This is a guide, not legal advice.
          </p>
        </div>
      )}

      {/* Email capture screen */}
      {step === QUESTIONS.length + 1 && result && (
        <div className={cardClass}>
          <h2 className={`${compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"} font-black text-slate-900 leading-tight tracking-tight`}>
            Email your result — no call, no spam
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            We&rsquo;ll send you a copy of your result. By submitting you agree we can email you about your visa enquiry. We won&rsquo;t add you to marketing lists, and we won&rsquo;t call unless you specifically ask.
          </p>
          <form onSubmit={handleEmailCapture} className="mt-5 space-y-3">
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
                className="flex-1 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-normal sm:tracking-wide disabled:opacity-40 truncate px-3"
              >
                {submitting ? "Sending..." : "Email me the result"}
              </Button>
            </div>

            <p className="text-xs text-slate-400 flex items-start gap-1.5 pt-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span className="leading-snug min-w-0">
                Your details go straight to a solicitor — no third-party brokers. By submitting you agree to our{" "}
                <Link href="/privacy-policy/" className="text-brand-red hover:underline">privacy policy</Link>.
              </span>
            </p>
          </form>
        </div>
      )}

      {/* Thanks screen */}
      {step === QUESTIONS.length + 2 && submitted && result && (
        <div className={`${cardClass} text-center`}>
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h2 className={`mt-4 ${compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"} font-black text-slate-900 leading-tight tracking-tight`}>Thanks {name.split(" ")[0]}</h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            We&rsquo;ve sent your result to <strong className="text-slate-900">{email}</strong>. If you also want to talk it through with {AUTHOR.name} or one of the team:
          </p>
          <div className="mt-5 flex flex-col sm:flex-row items-stretch justify-center gap-2">
            <DynamicCallLink className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 px-5 text-sm font-bold uppercase tracking-wide flex-1">
              <Phone className="h-4 w-4" />
              <DynamicPhoneText />
            </DynamicCallLink>
            <Link href="/free-consultation/" className="inline-flex items-center justify-center rounded-lg h-12 px-5 text-sm font-semibold border border-slate-300 text-slate-800 hover:border-brand-red hover:text-brand-red flex-1">
              Book online
            </Link>
          </div>
          <p className="mt-5 text-xs text-slate-400 leading-relaxed flex items-center justify-center gap-1.5">
            <Calendar className="h-3 w-3" /> Reviewed by {AUTHOR.name} (SRA #{AUTHOR.sraNumber}) · {LAST_REVIEWED}
          </p>
        </div>
      )}
    </div>
  );
}
