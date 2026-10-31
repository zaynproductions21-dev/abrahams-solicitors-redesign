"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pushFormSubmit } from "@/lib/tracking";
import { pushWizardEvent } from "@/lib/wizard-events";
import { useSpamGuard } from "@/lib/spam-client";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { GclidField, MsclkidField, UtmFields } from "@/components/v6/gclid-field";
import { submitEnquiry } from "@/lib/publishos";

const WIZARD_SOURCE = "housing-qualifier";

const ISSUES = [
  { id: "damp", label: "Damp / condensation" },
  { id: "mould", label: "Mould / black mould" },
  { id: "leaks", label: "Leaks (roof / pipes)" },
  { id: "heating", label: "No heating / hot water" },
  { id: "electrics", label: "Faulty wiring / sockets" },
  { id: "structural", label: "Cracks / subsidence" },
  { id: "windows", label: "Draughty / broken windows" },
  { id: "pest", label: "Vermin / pests" },
  { id: "plaster", label: "Damaged plaster / walls" },
  { id: "drainage", label: "Drainage / sewage" },
];

const DURATIONS = [
  { value: "<3m", label: "Under 3 months" },
  { value: "3-12m", label: "3 to 12 months" },
  { value: "1-3y", label: "1 to 3 years" },
  { value: "3+y", label: "Over 3 years" },
];

const LANDLORDS = [
  { value: "council", label: "Council" },
  { value: "ha", label: "Housing association" },
  { value: "private", label: "Private landlord" },
];

const REPORTED = [
  { value: "multiple", label: "Yes, multiple times" },
  { value: "once", label: "Yes, once" },
  { value: "no", label: "Not yet" },
];

type Strength = "strong" | "likely" | "worth-reviewing";

function calcStrength(issues: string[], duration: string, reported: string): Strength {
  let score = 0;
  // issue weight
  const heavy = ["damp", "mould", "leaks", "heating", "electrics", "structural"];
  score += issues.filter(i => heavy.includes(i)).length * 2;
  score += issues.filter(i => !heavy.includes(i)).length * 1;
  // duration
  score += duration === "3+y" ? 4 : duration === "1-3y" ? 3 : duration === "3-12m" ? 2 : 1;
  // reported (the only one that can disqualify — no notice = weak claim)
  if (reported === "multiple") score += 3;
  else if (reported === "once") score += 2;
  else score += 0;
  if (score >= 9) return "strong";
  if (score >= 5) return "likely";
  return "worth-reviewing";
}

const STRENGTH_LABEL: Record<Strength, { title: string; sub: string; tone: string }> = {
  strong: {
    title: "Strong claim",
    sub: "Your case has the hallmarks of a solid housing disrepair claim. Expect a call from a solicitor within the hour.",
    tone: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  likely: {
    title: "Likely viable",
    sub: "Your answers suggest a claim is realistic. A solicitor will review the detail with you free, then advise on next steps.",
    tone: "bg-blue-50 text-blue-700 border-blue-200",
  },
  "worth-reviewing": {
    title: "Worth reviewing",
    sub: "There may be a route to compensation. A solicitor will go through the detail with you free of charge before any commitment.",
    tone: "bg-amber-50 text-amber-700 border-amber-200",
  },
};

export function HousingQualifier() {
  const [step, setStep] = useState(1);
  const [issues, setIssues] = useState<string[]>([]);
  const [duration, setDuration] = useState("");
  const [landlord, setLandlord] = useState("");
  const [reported, setReported] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<Strength | null>(null);
  const spam = useSpamGuard();

  // GTM telemetry: fire wizard_start once on first mount, then
  // wizard_question_answered when each step advances. wizard_result_shown
  // fires from the result-render branch (after submission, since this
  // qualifier asks for contact details as part of the qualifier itself
  // and shows the strength card on submit).
  const startedRef = useRef(false);
  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      pushWizardEvent("wizard_start", { source: WIZARD_SOURCE });
    }
  }, []);
  const lastResultStrengthRef = useRef<Strength | null>(null);
  useEffect(() => {
    if (submitted && lastResultStrengthRef.current !== submitted) {
      lastResultStrengthRef.current = submitted;
      pushWizardEvent("wizard_result_shown", {
        source: WIZARD_SOURCE,
        route_id: submitted,
        route_name: STRENGTH_LABEL[submitted].title,
      });
    }
  }, [submitted]);

  const toggleIssue = (id: string) =>
    setIssues(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  const step1Valid = issues.length > 0 && duration !== "";
  const step2Valid = landlord !== "" && reported !== "";
  const step3Valid = name && phone && postcode;

  async function handleSubmit() {
    if (!step3Valid) return;
    setSubmitting(true);
    pushFormSubmit({ email, phone });
    const strength = calcStrength(issues, duration, reported);
    const caseDetail = [
      `Issues: ${issues.join(", ")}`,
      `Duration: ${duration}`,
      `Landlord: ${landlord}`,
      `Reported: ${reported}`,
      `Postcode: ${postcode}`,
      `Auto-strength: ${strength}`,
    ].join("\n");
    await submitEnquiry({
      source: "housing-disrepair-qualifier",
      name,
      email,
      phone,
      service: "[Wizard] Housing Disrepair",
      case: caseDetail,
    }, spam.payload());
    setSubmitting(false);
    setSubmitted(strength);
  }

  if (submitted) {
    const s = STRENGTH_LABEL[submitted];
    // WhatsApp handoff for photos of the disrepair. The number
    // +447476548311 is the same Twilio number that sends the SMS
    // auto-reply and is also provisioned on WhatsApp Business for
    // the firm. wa.me opens the recipient's WhatsApp app directly to
    // a chat with the firm, with the message below pre-filled —
    // zero infrastructure on our side, photos land straight in the
    // firm's WhatsApp Business inbox where the solicitor can review
    // them before the callback. No file upload UI needed yet, and
    // Twilio WhatsApp API template approvals are not on the critical
    // path since the user initiates the conversation.
    const firstName = name.split(" ")[0] || "there";
    const waText =
      `Hi, I've just completed my housing disrepair case check with Abrahams Solicitors (${name}). ` +
      `Here are photos of the problem in my home:`;
    const whatsappUrl = `https://wa.me/447476548311?text=${encodeURIComponent(waText)}`;

    return (
      <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-xl p-5 sm:p-8">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${s.tone}`}>
          <CheckCircle2 className="h-3.5 w-3.5" />
          {s.title}
        </div>
        <h3 className="mt-4 text-2xl font-black text-slate-900 tracking-tight">Thanks {firstName} — we&rsquo;ve got your details.</h3>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">{s.sub}</p>

        {/* WhatsApp photo handoff — the solicitor can prepare for
            the call properly if they can see the damage first. One
            tap opens WhatsApp with the firm's number pre-selected
            and a template message naming the client. */}
        <div className="mt-5 p-4 sm:p-5 rounded-xl bg-emerald-50 border border-emerald-200">
          <p className="text-sm sm:text-base font-bold text-slate-900 mb-1">
            Have photos of the damage?
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3.5">
            Send them on WhatsApp before the call — the solicitor can review the evidence first instead of asking you to describe it on the phone.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DAD4F] text-white rounded-lg text-sm font-bold px-4 h-11 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.52 5.26l-.999 3.648 3.969-1.041zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.03-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            Send photos on WhatsApp
          </a>
          <p className="mt-2.5 text-[11px] text-slate-500">
            Or just show the solicitor on the call — this is optional.
          </p>
        </div>

        <div className="mt-5 p-4 rounded-lg bg-slate-50 border border-slate-100 text-sm text-slate-600">
          <p className="font-semibold text-slate-900 mb-1">What happens next</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>A solicitor (Sannah or one of the team) calls you within the hour from a 0203 number.</li>
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
      {/* Progress */}
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
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">What&rsquo;s wrong with your home?</h3>
            <p className="text-sm text-slate-500 mb-4">Tick everything that applies.</p>
            <div className="flex flex-col gap-2">
              {ISSUES.map(i => {
                const active = issues.includes(i.id);
                return (
                  <button
                    key={i.id}
                    type="button"
                    onClick={() => toggleIssue(i.id)}
                    className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg border text-[13px] sm:text-sm text-left transition-colors ${active ? "border-brand-red bg-brand-red/5 text-slate-900 font-semibold" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}
                  >
                    <div className={`w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center ${active ? "bg-brand-red border-brand-red" : "border-slate-300"}`}>
                      {active && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </div>
                    <span className="leading-snug min-w-0 break-words">{i.label}</span>
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-sm font-semibold text-slate-900">How long has it been a problem?</p>
            {/* py-3 (≥44px effective tap target with line-height) per
                iOS HIG. Was py-2.5 = ~42px which is borderline.
                Mobile QA Tier 3. */}
            <div className="mt-2 grid grid-cols-2 gap-2">
              {DURATIONS.map(d => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDuration(d.value)}
                  className={`px-3 py-3 rounded-lg border text-sm font-medium transition-colors ${duration === d.value ? "border-brand-red bg-brand-red/5 text-slate-900" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            <Button
              onClick={() => {
                pushWizardEvent("wizard_question_answered", {
                  source: WIZARD_SOURCE,
                  question_id: "issues-and-duration",
                  question_step: 1,
                  question_total: 3,
                  answer: `${issues.join(",")}|${duration}`,
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
            <h3 className="text-xl font-bold text-slate-900 mb-1">Who do you rent from?</h3>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {LANDLORDS.map(l => (
                <button
                  key={l.value}
                  type="button"
                  onClick={() => setLandlord(l.value)}
                  className={`px-3 py-3 rounded-lg border text-sm font-medium transition-colors ${landlord === l.value ? "border-brand-red bg-brand-red/5 text-slate-900" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-7 mb-1">Have you reported it to your landlord?</h3>
            <p className="text-sm text-slate-500 mb-3">Written notice is the strongest evidence — even text or email counts.</p>
            <div className="grid grid-cols-1 gap-2">
              {REPORTED.map(r => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setReported(r.value)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${reported === r.value ? "border-brand-red bg-brand-red/5 text-slate-900" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}
                >
                  {r.label}
                  {reported === r.value && <CheckCircle2 className="h-4 w-4 text-brand-red" />}
                </button>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="rounded-lg h-12 px-4 border-slate-200 text-slate-700"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => {
                  pushWizardEvent("wizard_question_answered", {
                    source: WIZARD_SOURCE,
                    question_id: "landlord-and-reported",
                    question_step: 2,
                    question_total: 3,
                    answer: `${landlord}|${reported}`,
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
            <h3 className="text-xl font-bold text-slate-900 mb-1">How can we reach you?</h3>
            <p className="text-sm text-slate-500 mb-4">A solicitor will call you within the hour from a 0203 number — keep your phone to hand.</p>
            <form
              onSubmit={async (e) => { e.preventDefault(); await handleSubmit(); }}
              className="space-y-3"
            >
              <HoneypotInput value={spam.honeypot} onChange={spam.setHoneypot} />
              <GclidField />
              <MsclkidField />
              <UtmFields />
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red" />
              <div className="grid sm:grid-cols-2 gap-3">
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email (optional)" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red" />
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
                {/* Responsive label: "Get assessment" on phones (fits
                    next to the back-arrow button without truncate-clip),
                    full "Get free assessment" on tablet+. Was clipping
                    to "Get free assess…" on 375px. Mobile QA 2026-06-03. */}
                <Button
                  type="submit"
                  disabled={!step3Valid || submitting}
                  className="flex-1 min-w-0 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-normal sm:tracking-wide disabled:opacity-40 px-3"
                >
                  {submitting ? "Sending..." : (
                    <>
                      <span className="sm:hidden">Get assessment</span>
                      <span className="hidden sm:inline">Get free assessment</span>
                    </>
                  )}
                </Button>
              </div>
              {/* pt-3 (was pt-1) — the privacy-policy disclaimer was
                  hugging the submit button uncomfortably on mobile.
                  Mobile QA Tier 3. */}
              <p className="text-xs text-slate-400 flex items-start gap-1.5 pt-3">
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
