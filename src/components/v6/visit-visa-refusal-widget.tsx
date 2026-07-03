"use client";

/**
 * VisitVisaRefusalWidget — Phase 2 of the wizard programme.
 *
 * Companion to <VisaWizardWidget /> (Phase 1: Spouse Visa). This wizard
 * triages a *refused* UK visit-visa application and routes the visitor
 * to the right next-step conversation.
 *
 * Council mandates (carried over from Phase 1):
 *   • Pure decision tree, no AI
 *   • 5 plain-English questions (no statutory jargon in question text)
 *   • Neutral routing language (no "Strong / Likely / Time-barred" labels)
 *   • Result shown BEFORE email capture
 *   • SalesHub write only fires on explicit opt-in (GDPR/PECR)
 *   • Imran Shah named on every result + footer, "Last reviewed" date
 *
 * Imran sign-off (12 May 2026):
 *   • Visit visas have NO right of appeal (except on human rights / Art 8 grounds)
 *     and NO administrative review (Appendix AR doesn't cover them)
 *   • Only formal challenge route is Pre-Action Protocol → Judicial Review
 *     within the 3-month CPR 54.5 window
 *   • Standard remedy is a fresh application with strengthened evidence
 *
 * Same GTM event taxonomy as Phase 1 — no GTM container changes needed.
 */

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { GclidField, MsclkidField, UtmFields } from "@/components/v6/gclid-field";
import { useSpamGuard } from "@/lib/spam-client";
import { pushFormSubmit } from "@/lib/tracking";
import { pushWizardEvent } from "@/lib/wizard-events";
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
    id: "refusal-reason",
    heading: "What was the refusal reason in your letter?",
    helper: "Pick the closest match — refusal letters often list more than one reason; pick the main one.",
    options: [
      { value: "not-genuine-visitor", label: "Not satisfied you are a genuine visitor / will leave at the end" },
      { value: "insufficient-funds", label: "Insufficient or unclear funds" },
      { value: "weak-ties", label: "Weak family, social or economic ties to your home country" },
      { value: "adverse-history", label: "Adverse immigration history (overstay, prior refusals)" },
      { value: "deception", label: "False representation or deception" },
      { value: "missing-docs", label: "Missing or inadequate supporting documents" },
      { value: "multiple-not-sure", label: "Multiple reasons / I'm not sure" },
    ],
  },
  {
    id: "timing",
    heading: "When were you refused?",
    helper: "This affects strategy — very recent refusals may still be within the window where a Pre-Action Protocol challenge is possible; older refusals usually point to a fresh application.",
    options: [
      { value: "within-3m", label: "Within the last 3 months" },
      { value: "3m-1y", label: "Between 3 months and 1 year ago" },
      { value: "over-1y", label: "More than 1 year ago" },
    ],
  },
  {
    id: "applied-from",
    heading: "Where did you apply from?",
    helper: "Most visit-visa applications are made from overseas, but in-country visit-visa applications do happen occasionally.",
    options: [
      { value: "overseas", label: "From outside the UK (overseas visa application)" },
      { value: "in-country", label: "From inside the UK" },
    ],
  },
  {
    id: "purpose",
    heading: "What was the purpose of the visit?",
    helper: "The reason for travel affects which evidence strengthens a fresh application and whether an urgent route is available.",
    options: [
      { value: "family-friends", label: "Visiting family or friends" },
      { value: "tourism", label: "Tourism / holiday" },
      { value: "business", label: "Business meetings / conference" },
      { value: "time-sensitive", label: "Time-sensitive event (wedding, funeral, family medical emergency, court hearing)" },
      { value: "medical", label: "Medical treatment in the UK" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "previous-refusals",
    heading: "Have you been refused a UK visa before?",
    helper: "Cumulative refusal history changes the strategy significantly.",
    options: [
      { value: "no", label: "No, this was the first refusal" },
      { value: "once", label: "Yes, refused once before" },
      { value: "multiple", label: "Yes, refused multiple times" },
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

/**
 * Routing precedence (first match wins) — per signed-off spec v1.1:
 *
 *   1. Deception refusal → Outcome 1 (PAP-or-fresh specialist review)
 *   2. Multiple previous refusals → Outcome 2 (Pattern-of-refusals consultation)
 *   3. Time-sensitive event + refused within 3 months → Outcome 3 (Urgent)
 *   4. Refused over 1 year ago → Outcome 4 (Fresh app, long-gap)
 *   5. Refused within last year (any reason except above) → Outcome 5 (Fresh app, strengthened)
 *   6. Default → Outcome 6 (Refusal review consultation)
 *
 * Deception (rule 1) deliberately trumps urgency (rule 3): a deception finding
 * carries a 10-year ban under Para 9.8.1 and needs careful handling regardless
 * of how time-sensitive the trip is.
 */
function routeFor(a: Answers): RouteResult {
  const reason = a.refusal_reason;
  const timing = a.timing;
  const purpose = a.purpose;
  const previous = a.previous_refusals;

  // 1 — Deception finding (PAP-or-fresh territory)
  if (reason === "deception") return {
    id: "deception-specialist-review",
    name: "Section 320 / Suitability — PAP-or-fresh specialist review",
    citation: "Para 9.7–9.10 Immigration Rules (General Grounds for Refusal) + Suitability S-EC.1.5 / S-LTR.1.6 + Pre-Action Protocol for Judicial Review (CPR PD54)",
    summary: "A refusal citing false representation or deception is the most consequential type — most carry a 10-year ban from re-entering the UK. Visit visas have no administrative review and no right of appeal except on human rights grounds, so the route forward is either a carefully-prepared fresh application that addresses the finding head-on, or — where the finding itself looks unlawful — a Pre-Action Protocol letter as the precursor to Judicial Review. This is specialist territory and should not be handled by a routine fresh application without solicitor review.",
    considerations: [
      "Get the original refusal letter reviewed — many \"deception\" findings turn out to be procedural errors that can be challenged via PAP before any JR claim is issued",
      "10-year ban under Para 9.8.1 / S-EC.1.5 needs precise handling — a misstep can compound the ban",
      "A successful PAP can clear the record entirely; a fresh application made without addressing the finding can make things much worse",
      "This is exactly the case where solicitor review pays for itself many times over",
    ],
    tone: "needs-review",
  };

  // 2 — Pattern of refusals (cumulative-effect specialist)
  if (previous === "multiple") return {
    id: "pattern-of-refusals",
    name: "Pattern of refusals — specialist consultation",
    citation: "Cumulative effect under Suitability S-EC.1.4 + Para 9.7–9.10 of the Immigration Rules",
    summary: "Multiple visit visa refusals create a pattern that affects how a fresh application is assessed. Each subsequent refusal becomes harder. Visit visas have no right of appeal except on human rights grounds, so the work is either a fresh application that addresses the cumulative pattern, or — in narrow circumstances — a Pre-Action Protocol where the most recent refusal looks unlawful.",
    considerations: [
      "A solicitor reads all your refusal letters together — patterns emerge that single-refusal review misses",
      "Sometimes the right strategy is a different visa category entirely",
      "Do not reapply without addressing the pattern — a third or fourth refusal is materially harder to undo",
    ],
    tone: "needs-review",
  };

  // 3 — Time-sensitive event + recent refusal (urgent dual track)
  if (purpose === "time-sensitive" && timing === "within-3m") return {
    id: "urgent-dual-track",
    name: "Urgent: priority fresh application + PAP/JR consideration",
    citation: "Appendix V (Visitor) + Article 8 ECHR (where family event) + Pre-Action Protocol for Judicial Review (within the 3-month CPR 54.5 window)",
    summary: "A time-sensitive event (wedding, funeral, family medical emergency or court hearing) plus a recent refusal usually means a fresh application with priority service is the right route — and where there is a real Article 8 family-life angle or the refusal itself looks unlawful, a Pre-Action Protocol letter can run in parallel. Same-day decisions are possible in priority cases.",
    considerations: [
      "Priority service decisions can come in 5 working days; super-priority in 1 working day",
      "For weddings / funerals / serious illness, supporting evidence (doctor's letter, death certificate, court summons) substantially strengthens the application",
      "If family ties to the UK are strong and the refusal interfered with Article 8 family life, a PAP letter can run in parallel — JR must be brought within 3 months of the original decision (CPR 54.5)",
      "Don't apply blindly with priority service — a refused priority application costs more than a thoughtful one",
    ],
    tone: "positive",
  };

  // 4 — Long-gap fresh application
  if (timing === "over-1y") return {
    id: "fresh-application-long-gap",
    name: "Fresh application — long-gap reapplication",
    citation: "Appendix V (Visitor) — Immigration Rules",
    summary: "A refusal more than a year ago largely no longer dominates a fresh application — UKVI will see the previous refusal but it isn't contemporaneous. The right approach is a strong fresh application that addresses why the original refusal occurred and shows the circumstances have moved on.",
    considerations: [
      "Disclose the previous refusal in the fresh application — non-disclosure can itself trigger a deception finding",
      "Address the original refusal reason head-on (fund clarity, ties evidence, genuine-visitor evidence)",
      "Circumstances may have changed substantially since the original refusal (new job, marriage, children) — surface those explicitly",
      "A fresh application after a long gap is usually the cleanest route",
    ],
    tone: "positive",
  };

  // 5 — Strengthened-evidence fresh application (recent refusal, no special flags)
  if (timing === "within-3m" || timing === "3m-1y") return {
    id: "fresh-application-strengthened",
    name: "Fresh application — strengthened evidence",
    citation: "Appendix V (Visitor) + visitor-specific evidence rules",
    summary: "Most visit-visa refusals are best addressed by a fresh application with strengthened evidence rather than by trying to challenge the existing refusal. Visit visas have no administrative review and no right of appeal except on human rights grounds — so the fresh application is generally the cleanest route. It reaches a different case officer, allows new evidence, and usually decides faster than any legal challenge.",
    considerations: [
      "Strengthened evidence usually means: clearer funds, better ties documentation, rigorous travel-history disclosure, a sponsor letter if visiting family",
      "Wait until the obvious gaps in the original application are fixed before reapplying",
      "A refused fresh application can stack — get it right the second time",
      "Where the original refusal itself looks unlawful (e.g. a wrongly-applied deception finding), a Pre-Action Protocol can be considered — but that's specialist work, out-of-scope of a routine fresh application",
    ],
    tone: "positive",
  };

  // 6 — Default fallback (refusal review consultation)
  return {
    id: "refusal-review-consultation",
    name: "Refusal review consultation",
    citation: "Appendix V (Visitor) + general refusal-handling",
    summary: "Your circumstances need a more detailed review than a wizard can give. A 30-minute free consultation will go through the refusal letter, your specific facts, and the right next step.",
    considerations: [
      "Bring your refusal letter, original application copy, and supporting documents to the call",
      "We'll identify whether a fresh application, a Pre-Action Protocol challenge, or a different visa category fits best",
      "Free 30-minute consultation, no obligation",
    ],
    tone: "mixed",
  };
}

const TONE_STYLES: Record<RouteResult["tone"], { ring: string; bg: string; text: string }> = {
  positive: { ring: "ring-emerald-200", bg: "bg-emerald-50", text: "text-emerald-700" },
  mixed: { ring: "ring-blue-200", bg: "bg-blue-50", text: "text-blue-700" },
  "needs-review": { ring: "ring-amber-200", bg: "bg-amber-50", text: "text-amber-700" },
};

export function VisitVisaRefusalWidget({
  compact = false,
  source = "visit-visa-refusal-wizard",
}: {
  /** Compact mode trims margins/padding for embedding inside narrow columns. */
  compact?: boolean;
  /** Source tag forwarded to SalesHub so wizard leads can be filtered by entry point. */
  source?: string;
}) {
  const [step, setStep] = useState(0); // 0..4 = questions, 5 = result, 6 = email-capture, 7 = thanks
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const spam = useSpamGuard();

  const setAnswer = (id: string, value: string) =>
    setAnswers(prev => ({ ...prev, [id.replace(/-/g, "_")]: value }));

  const result = step >= QUESTIONS.length ? routeFor(answers) : null;

  // ─── GTM telemetry ─────────────────────────────────────────────────────
  const startedRef = useRef(false);
  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      pushWizardEvent("wizard_start", { source });
    }
  }, [source]);

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
      `Visit Visa Refusal Wizard route: ${r.name}`,
      `Citation: ${r.citation}`,
      ...QUESTIONS.map(q => {
        const v = answers[q.id.replace(/-/g, "_")];
        return `${q.heading} → ${v ?? "(skipped)"}`;
      }),
    ].join("\n");
    await submitEnquiry({
      source: `${source}:${r.id}`,
      name, email, phone,
      service: "[Wizard] UK Visit Visa Refusal",
      case: caseDetail,
    }, spam.payload());
    setSubmitting(false);
    setSubmitted(true);
    setStep(QUESTIONS.length + 2);
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
            Reviewed by {AUTHOR.name} — SRA #{AUTHOR.sraNumber}. Last reviewed: {LAST_REVIEWED}. This is a guide, not legal advice. Visit visas have no administrative review and no general right of appeal except on human rights grounds — see your result above for the route most relevant to your circumstances.
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
            <UtmFields />
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
