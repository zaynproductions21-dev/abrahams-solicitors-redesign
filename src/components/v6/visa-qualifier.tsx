"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pushFormSubmit } from "@/lib/tracking";
import { pushWizardEvent } from "@/lib/wizard-events";
import { useSpamGuard } from "@/lib/spam-client";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { GclidField, MsclkidField } from "@/components/v6/gclid-field";
import { submitEnquiry } from "@/lib/publishos";

/**
 * Generic 3-step visa qualifier — used by both /uk-dependent-child-visa/
 * and /uk-dependent-parent-visa/. The two consumer pages pass their own
 * step-1 + step-2 question schemas so the same form structure applies
 * but the specifics differ per route.
 *
 * Strength labels are deliberately neutral (per SRA Standard 8.1) — they
 * describe whether eligibility criteria appear to be met, NOT a prediction
 * of outcome.
 */

export type QualifierOption = { value: string; label: string };
export type QualifierStep = {
  heading: string;
  helper?: string;
  options: QualifierOption[];
  /** Which option values are positive signals (criteria met). */
  positive: string[];
  /** Which option values are negative / hard-to-pass signals. */
  negative: string[];
};

type Indicator = "criteria-met" | "needs-evidence" | "further-review" | "complications";

const INDICATOR_LABEL: Record<Indicator, { title: string; sub: string; tone: string }> = {
  "criteria-met": {
    title: "Eligibility criteria appear to be met",
    sub: "Based on your answers, your circumstances appear to fit the route. A solicitor will confirm this on the free assessment call and walk you through the evidence required.",
    tone: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  "needs-evidence": {
    title: "Some criteria may need evidence",
    sub: "Your answers suggest the route is realistic but particular elements will turn on the documentary evidence. A solicitor will go through this with you free of charge.",
    tone: "bg-blue-50 text-blue-700 border-blue-200",
  },
  "further-review": {
    title: "Further review needed",
    sub: "Your circumstances need a more detailed review before any view on eligibility. A solicitor will go through the detail with you free of charge before any commitment.",
    tone: "bg-amber-50 text-amber-700 border-amber-200",
  },
  complications: {
    title: "Complications to talk through",
    sub: "There are factors in your case that need careful review — alternative routes or appeal options may apply. A solicitor will discuss your options on a free assessment call.",
    tone: "bg-orange-50 text-orange-700 border-orange-200",
  },
};

function calcIndicator(step1: string, step2: string, schema1: QualifierStep, schema2: QualifierStep): Indicator {
  const isComplication = (v: string, schema: QualifierStep) => schema.negative.includes(v);
  const isPositive = (v: string, schema: QualifierStep) => schema.positive.includes(v);

  if (isComplication(step1, schema1) || isComplication(step2, schema2)) return "complications";
  const positives = (isPositive(step1, schema1) ? 1 : 0) + (isPositive(step2, schema2) ? 1 : 0);
  if (positives === 2) return "criteria-met";
  if (positives === 1) return "needs-evidence";
  return "further-review";
}

export function VisaQualifier({
  source,
  service,
  step1,
  step2,
}: {
  /** Source tag forwarded to SalesHub (e.g. "uk-dependent-child-visa-qualifier"). */
  source: string;
  /** Service line (e.g. "UK Dependent Child Visa"). */
  service: string;
  step1: QualifierStep;
  step2: QualifierStep;
}) {
  const [step, setStep] = useState(1);
  const [s1, setS1] = useState("");
  const [s2, setS2] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<Indicator | null>(null);
  const spam = useSpamGuard();

  // GTM telemetry — same canonical event taxonomy as the rest of the
  // wizard family. Fires on widget mount and when the result indicator
  // displays after submission.
  const startedRef = useRef(false);
  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      pushWizardEvent("wizard_start", { source });
    }
  }, [source]);
  const lastIndicatorRef = useRef<Indicator | null>(null);
  useEffect(() => {
    if (submitted && lastIndicatorRef.current !== submitted) {
      lastIndicatorRef.current = submitted;
      pushWizardEvent("wizard_result_shown", {
        source,
        route_id: submitted,
        route_name: INDICATOR_LABEL[submitted].title,
      });
    }
  }, [submitted, source]);

  const step1Valid = s1 !== "";
  const step2Valid = s2 !== "";
  const step3Valid = name && email && phone && postcode;

  async function handleSubmit() {
    if (!step3Valid) return;
    setSubmitting(true);
    pushFormSubmit({ email, phone });
    const indicator = calcIndicator(s1, s2, step1, step2);
    const caseDetail = [
      `${step1.heading.replace(/[^a-zA-Z ]/g, "")}: ${s1}`,
      `${step2.heading.replace(/[^a-zA-Z ]/g, "")}: ${s2}`,
      `Postcode: ${postcode}`,
      `Auto-indicator: ${indicator}`,
    ].join("\n");
    await submitEnquiry({
      source,
      name,
      email,
      phone,
      service,
      case: caseDetail,
    }, spam.payload());
    setSubmitting(false);
    setSubmitted(indicator);
  }

  if (submitted) {
    const s = INDICATOR_LABEL[submitted];
    return (
      <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-xl p-5 sm:p-8">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${s.tone}`}>
          <CheckCircle2 className="h-3.5 w-3.5" />
          {s.title}
        </div>
        <h3 className="mt-4 text-2xl font-black text-slate-900 tracking-tight">Thanks {name.split(" ")[0]} — we&rsquo;ve got your details.</h3>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">{s.sub}</p>
        <div className="mt-6 p-4 rounded-lg bg-slate-50 border border-slate-100 text-sm text-slate-600">
          <p className="font-semibold text-slate-900 mb-1">What happens next</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>A solicitor calls you within the hour from a 0203 number.</li>
            <li>30-minute free assessment — no obligation.</li>
            <li>If we proceed, a written quote with all fees broken out before any work starts.</li>
          </ol>
        </div>
        <p className="mt-4 text-xs text-slate-400">
          This is an initial eligibility indicator only. It is not legal advice and is not a prediction of outcome — Home Office and tribunal decisions turn on full evidence. A solicitor will give you a proper assessment.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-xl overflow-hidden w-full max-w-full">
      <div className="px-4 sm:px-8 pt-5 pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
          <span>Step {step} of 3</span>
          <span className="flex items-center gap-1.5 text-brand-red">
            <ShieldCheck className="h-3.5 w-3.5" />
            SRA #809071
          </span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-brand-red transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
        </div>
      </div>

      <div className="p-4 sm:p-8">
        {step === 1 && (
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">{step1.heading}</h3>
            {step1.helper && <p className="text-sm text-slate-500 mb-4">{step1.helper}</p>}
            <div className="flex flex-col gap-2">
              {step1.options.map(o => {
                const active = s1 === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setS1(o.value)}
                    className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg border text-[13px] sm:text-sm text-left transition-colors ${active ? "border-brand-red bg-brand-red/5 text-slate-900 font-semibold" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${active ? "bg-brand-red border-brand-red" : "border-slate-300"}`}>
                      {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="leading-snug min-w-0">{o.label}</span>
                  </button>
                );
              })}
            </div>
            <Button
              onClick={() => {
                pushWizardEvent("wizard_question_answered", {
                  source,
                  question_id: step1.heading,
                  question_step: 1,
                  question_total: 3,
                  answer: s1,
                });
                setStep(2);
              }}
              disabled={!step1Valid}
              className="mt-6 w-full bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-wide disabled:opacity-40"
            >
              Continue <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">{step2.heading}</h3>
            {step2.helper && <p className="text-sm text-slate-500 mb-3">{step2.helper}</p>}
            <div className="grid grid-cols-1 gap-2">
              {step2.options.map(o => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setS2(o.value)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium text-left transition-colors ${s2 === o.value ? "border-brand-red bg-brand-red/5 text-slate-900" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}
                >
                  <span className="leading-snug min-w-0">{o.label}</span>
                  {s2 === o.value && <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 ml-2" />}
                </button>
              ))}
            </div>
            <div className="mt-6 flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="rounded-lg h-12 px-3 border-slate-200 text-slate-700 shrink-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => {
                  pushWizardEvent("wizard_question_answered", {
                    source,
                    question_id: step2.heading,
                    question_step: 2,
                    question_total: 3,
                    answer: s2,
                  });
                  setStep(3);
                }}
                disabled={!step2Valid}
                className="flex-1 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-wide disabled:opacity-40"
              >
                Continue <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">How can we reach you?</h3>
            <p className="text-sm text-slate-500 mb-4">A solicitor will call you within the hour.</p>
            <form
              onSubmit={async (e) => { e.preventDefault(); await handleSubmit(); }}
              className="space-y-3"
            >
              <HoneypotInput value={spam.honeypot} onChange={spam.setHoneypot} />
              <GclidField />
              <MsclkidField />
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red" />
              <div className="grid sm:grid-cols-2 gap-3">
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red" />
                <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Phone" required className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red" />
              </div>
              <input value={postcode} onChange={e => setPostcode(e.target.value.toUpperCase())} placeholder="Postcode" required className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red" maxLength={10} />

              <div className="flex gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setStep(2)} className="rounded-lg h-12 px-3 border-slate-200 text-slate-700 shrink-0">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="submit"
                  disabled={!step3Valid || submitting}
                  className="flex-1 min-w-0 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-normal sm:tracking-wide disabled:opacity-40 px-3 truncate"
                >
                  {submitting ? "Sending..." : "Get free assessment"}
                </Button>
              </div>
              <p className="text-xs text-slate-400 flex items-start gap-1.5 pt-1">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span className="min-w-0 leading-snug">
                  Your details go straight to a solicitor — no third-party brokers. By submitting you agree to our{" "}
                  <Link href="/privacy-policy/" className="text-brand-red hover:underline whitespace-nowrap">privacy policy</Link>.
                </span>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
