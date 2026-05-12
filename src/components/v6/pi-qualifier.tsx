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

const WIZARD_SOURCE = "pi-qualifier";

const CLAIM_TYPES = [
  { id: "workplace", label: "Accident at work" },
  { id: "road", label: "Road traffic accident" },
  { id: "slip", label: "Slip, trip or fall" },
  { id: "public", label: "Public place / occupier liability" },
  { id: "serious", label: "Serious injury (head, spinal, sight)" },
  { id: "fatal", label: "Fatal accident / family member" },
  { id: "medical", label: "Medical negligence" },
  { id: "other", label: "Something else" },
];

const TIMING = [
  { value: "<6m", label: "Under 6 months ago" },
  { value: "6-12m", label: "6 to 12 months ago" },
  { value: "1-2y", label: "1 to 2 years ago" },
  { value: "2-3y", label: "2 to 3 years ago" },
  { value: ">3y", label: "Over 3 years ago" },
];

const FAULT = [
  { value: "yes", label: "Yes — clearly someone else's fault" },
  { value: "partial", label: "Partly — fault is shared" },
  { value: "unsure", label: "Not sure — need advice" },
];

type Strength = "strong" | "likely" | "worth-reviewing" | "time-barred";

function calcStrength(claim: string, timing: string, fault: string): Strength {
  // Limitation Act 1980 s.11 — generally 3 years from date of accident or
  // knowledge of injury. Cases over 3y old need Date of Knowledge analysis.
  if (timing === ">3y") return "time-barred";

  let score = 0;
  // Recency boosts — fresher cases have stronger evidence
  score += timing === "<6m" ? 4 : timing === "6-12m" ? 3 : timing === "1-2y" ? 2 : 1;
  // Fault — clearer = stronger
  score += fault === "yes" ? 4 : fault === "partial" ? 2 : 1;
  // Claim type weight (heavier = higher liability typically)
  const heavy = ["workplace", "road", "serious", "fatal"];
  score += heavy.includes(claim) ? 2 : 1;

  if (score >= 9) return "strong";
  if (score >= 6) return "likely";
  return "worth-reviewing";
}

const STRENGTH_LABEL: Record<Strength, { title: string; sub: string; tone: string }> = {
  strong: {
    title: "Strong claim",
    sub: "Your answers point to a solid personal injury claim. Expect a call from a solicitor within the hour.",
    tone: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  likely: {
    title: "Likely viable",
    sub: "Your case looks realistic. A solicitor will review the detail with you free, then advise on next steps and funding.",
    tone: "bg-blue-50 text-blue-700 border-blue-200",
  },
  "worth-reviewing": {
    title: "Worth reviewing",
    sub: "There may be a route forward. A solicitor will go through the detail with you free of charge before any commitment.",
    tone: "bg-amber-50 text-amber-700 border-amber-200",
  },
  "time-barred": {
    title: "Time-limit concerns",
    sub: "Personal injury claims usually have a 3-year limitation period. We&rsquo;ll still review your circumstances — exceptions can apply (date of knowledge, minors, mental capacity).",
    tone: "bg-orange-50 text-orange-700 border-orange-200",
  },
};

export function PiQualifier() {
  const [step, setStep] = useState(1);
  const [claim, setClaim] = useState("");
  const [timing, setTiming] = useState("");
  const [fault, setFault] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<Strength | null>(null);
  const spam = useSpamGuard();

  const startedRef = useRef(false);
  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      pushWizardEvent("wizard_start", { source: WIZARD_SOURCE });
    }
  }, []);
  const lastStrengthRef = useRef<Strength | null>(null);
  useEffect(() => {
    if (submitted && lastStrengthRef.current !== submitted) {
      lastStrengthRef.current = submitted;
      pushWizardEvent("wizard_result_shown", {
        source: WIZARD_SOURCE,
        route_id: submitted,
        route_name: STRENGTH_LABEL[submitted].title,
      });
    }
  }, [submitted]);

  const step1Valid = claim !== "" && timing !== "";
  const step2Valid = fault !== "";
  const step3Valid = name && email && phone && postcode;

  async function handleSubmit() {
    if (!step3Valid) return;
    setSubmitting(true);
    pushFormSubmit({ email, phone });
    const strength = calcStrength(claim, timing, fault);
    const caseDetail = [
      `Claim type: ${claim}`,
      `Timing: ${timing}`,
      `Fault: ${fault}`,
      `Postcode: ${postcode}`,
      `Auto-strength: ${strength}`,
    ].join("\n");
    await submitEnquiry({
      source: "personal-injury-qualifier",
      name,
      email,
      phone,
      service: "[Wizard] Personal Injury",
      case: caseDetail,
    }, spam.payload());
    setSubmitting(false);
    setSubmitted(strength);
  }

  if (submitted) {
    const s = STRENGTH_LABEL[submitted];
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
            <li>If we take the case, it runs on no win, no fee.</li>
          </ol>
        </div>
        <p className="mt-4 text-xs text-slate-400">
          This is an early indicator only — not legal advice or a guarantee of outcome. A solicitor will give you a proper assessment based on the full evidence.
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
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">What happened?</h3>
            <p className="text-sm text-slate-500 mb-4">Pick the closest match.</p>
            <div className="flex flex-col gap-2">
              {CLAIM_TYPES.map(c => {
                const active = claim === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setClaim(c.id)}
                    className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg border text-[13px] sm:text-sm text-left transition-colors ${active ? "border-brand-red bg-brand-red/5 text-slate-900 font-semibold" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${active ? "bg-brand-red border-brand-red" : "border-slate-300"}`}>
                      {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="leading-snug min-w-0">{c.label}</span>
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-sm font-semibold text-slate-900">When did it happen?</p>
            <div className="mt-2 grid grid-cols-1 gap-2">
              {TIMING.map(t => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTiming(t.value)}
                  className={`px-3 py-2.5 rounded-lg border text-sm font-medium text-left transition-colors ${timing === t.value ? "border-brand-red bg-brand-red/5 text-slate-900" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <Button
              onClick={() => {
                pushWizardEvent("wizard_question_answered", {
                  source: WIZARD_SOURCE,
                  question_id: "claim-and-timing",
                  question_step: 1,
                  question_total: 3,
                  answer: `${claim}|${timing}`,
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
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">Who was at fault?</h3>
            <p className="text-sm text-slate-500 mb-3">Doesn&rsquo;t need to be perfect — we&rsquo;ll work it out together.</p>
            <div className="grid grid-cols-1 gap-2">
              {FAULT.map(f => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFault(f.value)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${fault === f.value ? "border-brand-red bg-brand-red/5 text-slate-900" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}
                >
                  {f.label}
                  {fault === f.value && <CheckCircle2 className="h-4 w-4 text-brand-red" />}
                </button>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="rounded-lg h-12 px-3 border-slate-200 text-slate-700 shrink-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => {
                  pushWizardEvent("wizard_question_answered", {
                    source: WIZARD_SOURCE,
                    question_id: "fault",
                    question_step: 2,
                    question_total: 3,
                    answer: fault,
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
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="rounded-lg h-12 px-3 border-slate-200 text-slate-700 shrink-0"
                >
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
