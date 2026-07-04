"use client";

/**
 * Generic, config-driven WizardWidget.
 *
 * Visually + behaviourally a clone of VisaWizardWidget but accepts a
 * WizardConfig prop. Used by:
 *   - /ilr-wizard/  (config: ILR_WIZARD_CONFIG)
 *   - /citizenship-wizard/  (config: CITIZENSHIP_WIZARD_CONFIG)
 *
 * The existing /uk-spouse-visa/ + /visa-wizard/ continue to use the legacy
 * VisaWizardWidget unchanged — zero risk to live spouse traffic.
 *
 * Council mandates baked in:
 *   - Variable question count (config.questions.length, not hardcoded)
 *   - Q-level `conditional` predicate (ILR Q6 only shows when 10y+)
 *   - Result shown BEFORE email capture
 *   - GTM events include `wizard_type` payload
 *   - Confidence badge rendered when route specifies one
 *   - Imran named on every result + footer with SRA + admitted year
 *   - SalesHub write only on explicit opt-in
 */

import Link from "next/link";
import { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { GclidField, MsclkidField, UtmFields } from "@/components/v6/gclid-field";
import { useSpamGuard } from "@/lib/spam-client";
import { pushFormSubmit } from "@/lib/tracking";
import { pushWizardEvent } from "@/lib/wizard-events";
import { submitEnquiry } from "@/lib/publishos";
import { team } from "@/lib/team";
import type { Answers, Confidence, RouteResult, RouteTone, WizardConfig } from "@/lib/wizards/types";
import {
  ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle, Phone,
  Scale, Sparkles, Calendar,
} from "lucide-react";

const AUTHOR = team.find((t) => t.slug === "imran-shah")!;

const TONE_STYLES: Record<RouteTone, { ring: string; bg: string; text: string }> = {
  positive: { ring: "ring-emerald-200", bg: "bg-emerald-50", text: "text-emerald-700" },
  mixed: { ring: "ring-blue-200", bg: "bg-blue-50", text: "text-blue-700" },
  "needs-review": { ring: "ring-amber-200", bg: "bg-amber-50", text: "text-amber-700" },
};

const CONFIDENCE_STYLES: Record<Confidence, { bg: string; text: string; label: string }> = {
  high: { bg: "bg-emerald-100", text: "text-emerald-800", label: "High confidence" },
  medium: { bg: "bg-amber-100", text: "text-amber-800", label: "Medium confidence" },
  low: { bg: "bg-slate-100", text: "text-slate-800", label: "Indicative — solicitor needed" },
};

function answerKey(id: string): string {
  return id.replace(/-/g, "_");
}

export function WizardWidget({
  config,
  compact = false,
  source,
}: {
  config: WizardConfig;
  compact?: boolean;
  /** Override CRM source tag (default: config.defaultSource). */
  source?: string;
}) {
  const wizardSource = source ?? config.defaultSource;

  // Filter questions by their conditional predicate so the question count
  // reflects what the user will actually see given current answers.
  const [answers, setAnswers] = useState<Answers>({});
  const visibleQuestions = useMemo(
    () => config.questions.filter((q) => !q.conditional || q.conditional(answers)),
    [config.questions, answers],
  );

  // step: 0..N-1 = questions, N = result, N+1 = email-capture, N+2 = thanks
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const spam = useSpamGuard();

  const setAnswer = (id: string, value: string) =>
    setAnswers((prev) => ({ ...prev, [answerKey(id)]: value }));

  const totalQuestions = visibleQuestions.length;
  const result: RouteResult | null = step >= totalQuestions ? config.routeFor(answers) : null;

  // ─── GTM telemetry ─────────────────────────────────────────────────────
  const startedRef = useRef(false);
  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      pushWizardEvent("wizard_start", { source: wizardSource, wizard_type: config.wizardType });
    }
  }, [wizardSource, config.wizardType]);

  const lastTrackedStepRef = useRef<number | null>(null);
  useEffect(() => {
    if (lastTrackedStepRef.current === step) return;
    lastTrackedStepRef.current = step;
    if (step === totalQuestions && result) {
      pushWizardEvent("wizard_result_shown", {
        source: wizardSource,
        wizard_type: config.wizardType,
        route_id: result.id,
        route_name: result.name,
        tone: result.tone,
        confidence: result.confidence,
      });
    } else if (step === totalQuestions + 1 && result) {
      pushWizardEvent("wizard_email_capture_opened", {
        source: wizardSource,
        wizard_type: config.wizardType,
        route_id: result.id,
      });
    }
  }, [step, result, wizardSource, config.wizardType, totalQuestions]);

  async function handleEmailCapture(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitting(true);
    pushFormSubmit({ email, phone });
    const r = result!;
    const caseDetail = [
      `${config.brandName} route: ${r.name}`,
      `Confidence: ${r.confidence ?? "n/a"}`,
      `Citation: ${r.citation}`,
      ...visibleQuestions.map((q) => {
        const v = answers[answerKey(q.id)];
        return `${q.heading} → ${v ?? "(skipped)"}`;
      }),
    ].join("\n");
    await submitEnquiry(
      {
        source: `${wizardSource}:${r.id}`,
        name,
        email,
        phone,
        service: config.serviceName,
        case: caseDetail,
      },
      spam.payload(),
      undefined,
      { wizardType: config.wizardType },
    );
    setSubmitting(false);
    setSubmitted(true);
    setStep(totalQuestions + 2);
  }

  const cardClass = `bg-white rounded-2xl border-2 border-slate-200 shadow-sm ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8"}`;
  const emailHeading = config.copy?.emailHeading ?? "Email your result — no call, no spam";
  const emailBody =
    config.copy?.emailBody ??
    "We'll send you a copy of your result. By submitting you agree we can email you about your enquiry. We won't add you to marketing lists, and we won't call unless you specifically ask.";
  const emailCtaLabel = config.copy?.emailCtaLabel ?? "Email me the result";
  const resultBadge = config.copy?.resultBadge ?? "Most relevant route";

  return (
    <div className="w-full max-w-full">
      {/* Step bar (questions only) */}
      {step < totalQuestions && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>
              Step {step + 1} of {totalQuestions}
            </span>
            <span className="flex items-center gap-1.5 text-brand-red">
              <ShieldCheck className="h-3.5 w-3.5" />
              SRA #809071
            </span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-red transition-all duration-300"
              style={{ width: `${((step + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Question screens */}
      {step < totalQuestions &&
        (() => {
          const q = visibleQuestions[step];
          const stateKey = answerKey(q.id);
          const selected = answers[stateKey];
          return (
            <div
              key={`q-${step}-${q.id}`}
              className={`${cardClass} animate-in fade-in-0 slide-in-from-bottom-1 duration-150`}
            >
              <h2
                className={`${
                  compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
                } font-black text-slate-900 leading-tight tracking-tight`}
              >
                {q.heading}
              </h2>
              {q.helper && <p className="mt-2 text-sm text-slate-500">{q.helper}</p>}
              <div className="mt-5 flex flex-col gap-2">
                {q.options.map((o) => {
                  const active = selected === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => setAnswer(q.id, o.value)}
                      className={`flex items-start gap-3 w-full px-3 py-2.5 rounded-lg border text-[13px] sm:text-sm text-left transition-colors ${
                        active
                          ? "border-brand-red bg-brand-red/5 text-slate-900 font-semibold"
                          : "border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center ${
                          active ? "bg-brand-red border-brand-red" : "border-slate-300"
                        }`}
                      >
                        {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="leading-snug min-w-0">
                        {o.label}
                        {o.helper && (
                          <span className="block text-xs text-slate-400 font-normal mt-0.5">
                            {o.helper}
                          </span>
                        )}
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
                    onClick={() => setStep((s) => s - 1)}
                    className="rounded-lg h-12 px-3 border-slate-200 text-slate-700 shrink-0"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={() => {
                    pushWizardEvent("wizard_question_answered", {
                      source: wizardSource,
                      wizard_type: config.wizardType,
                      question_id: q.id,
                      question_step: step + 1,
                      question_total: totalQuestions,
                      answer: selected,
                    });
                    setStep((s) => s + 1);
                  }}
                  disabled={!selected}
                  className="flex-1 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-wide disabled:opacity-40"
                >
                  {step === totalQuestions - 1 ? "See result" : "Continue"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          );
        })()}

      {/* Result screen — shown BEFORE email capture */}
      {step === totalQuestions && result && (
        <div className={`${cardClass} animate-in fade-in-0 duration-200`}>
          <div className="flex flex-wrap items-center gap-2">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ring-1 ${TONE_STYLES[result.tone].ring} ${TONE_STYLES[result.tone].bg} ${TONE_STYLES[result.tone].text}`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {resultBadge}
            </div>
            {result.confidence && (
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${CONFIDENCE_STYLES[result.confidence].bg} ${CONFIDENCE_STYLES[result.confidence].text}`}
                title="Indicative confidence — based on a decision tree, not document review"
              >
                {CONFIDENCE_STYLES[result.confidence].label}
              </span>
            )}
          </div>

          <h2
            className={`mt-4 ${
              compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"
            } font-black text-slate-900 leading-tight tracking-tight`}
          >
            {result.name}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {result.summary}
          </p>

          <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
              What to think about next
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              {result.considerations.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <strong>Indicative only.</strong> Not legal advice. Eligibility is confirmed only after
            full document review.
          </div>

          <div className="mt-5 flex items-start gap-2 text-xs text-slate-500">
            <Scale className="h-3.5 w-3.5 shrink-0 mt-0.5 text-brand-red" />
            <span>
              <strong className="text-slate-700">Rule reference:</strong> {result.citation}.{" "}
              For the current Immigration Rules see{" "}
              <a
                href="https://www.gov.uk/guidance/immigration-rules"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-red hover:underline"
              >
                gov.uk/guidance/immigration-rules
              </a>
              .
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
              onClick={() => setStep(totalQuestions + 1)}
              className="rounded-lg h-12 text-sm font-semibold border-slate-300 text-slate-800 hover:border-brand-red hover:text-brand-red flex-1"
            >
              {emailCtaLabel}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => {
              setStep(0);
              setAnswers({});
            }}
            className="mt-4 text-xs text-slate-400 hover:text-slate-600 underline"
          >
            ← Start over with different answers
          </button>

          <p className="mt-4 text-xs text-slate-400 leading-relaxed">
            Reviewed by {AUTHOR.name} — SRA #{AUTHOR.sraNumber} · admitted {AUTHOR.admittedYear}.
            Last reviewed: {config.lastReviewed}. This is a guide, not legal advice.
          </p>
        </div>
      )}

      {/* Email capture screen */}
      {step === totalQuestions + 1 && result && (
        <div className={`${cardClass} animate-in fade-in-0 slide-in-from-bottom-1 duration-150`}>
          <h2
            className={`${
              compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
            } font-black text-slate-900 leading-tight tracking-tight`}
          >
            {emailHeading}
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">{emailBody}</p>
          <form onSubmit={handleEmailCapture} className="mt-5 space-y-3">
            <HoneypotInput value={spam.honeypot} onChange={spam.setHoneypot} />
            <GclidField />
            <MsclkidField />
            <UtmFields />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="Phone (optional — only if you want a call)"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red"
            />

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(totalQuestions)}
                className="rounded-lg h-12 px-3 border-slate-200 text-slate-700 shrink-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                type="submit"
                disabled={!name || !email || submitting}
                className="flex-1 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-normal sm:tracking-wide disabled:opacity-40 truncate px-3"
              >
                {submitting ? "Sending..." : emailCtaLabel}
              </Button>
            </div>

            <p className="text-xs text-slate-400 flex items-start gap-1.5 pt-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span className="leading-snug min-w-0">
                Your details go straight to a solicitor — no third-party brokers. By submitting you
                agree to our{" "}
                <Link href="/privacy-policy/" className="text-brand-red hover:underline">
                  privacy policy
                </Link>
                .
              </span>
            </p>
          </form>
        </div>
      )}

      {/* Thanks screen */}
      {step === totalQuestions + 2 && submitted && result && (
        <div className={`${cardClass} text-center`}>
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h2
            className={`mt-4 ${
              compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"
            } font-black text-slate-900 leading-tight tracking-tight`}
          >
            Thanks {name.split(" ")[0]}
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            We&rsquo;ve sent your result to <strong className="text-slate-900">{email}</strong>. If
            you also want to talk it through with {AUTHOR.name} or one of the team:
          </p>
          <div className="mt-5 flex flex-col sm:flex-row items-stretch justify-center gap-2">
            <DynamicCallLink className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 px-5 text-sm font-bold uppercase tracking-wide flex-1">
              <Phone className="h-4 w-4" />
              <DynamicPhoneText />
            </DynamicCallLink>
            <Link
              href="/free-consultation/"
              className="inline-flex items-center justify-center rounded-lg h-12 px-5 text-sm font-semibold border border-slate-300 text-slate-800 hover:border-brand-red hover:text-brand-red flex-1"
            >
              Book online
            </Link>
          </div>
          <p className="mt-5 text-xs text-slate-400 leading-relaxed flex items-center justify-center gap-1.5">
            <Calendar className="h-3 w-3" /> Reviewed by {AUTHOR.name} (SRA #{AUTHOR.sraNumber}) ·{" "}
            {config.lastReviewed}
          </p>
        </div>
      )}
    </div>
  );
}
