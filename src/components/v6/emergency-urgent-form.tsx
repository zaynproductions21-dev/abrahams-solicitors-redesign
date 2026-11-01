"use client";

/**
 * EmergencyUrgentForm — short lead-capture form for the emergency
 * immigration landing-page family (/emergency-immigration-solicitor/,
 * /visa-expired-urgent/, /immigration-detention/,
 * /removal-directions-urgent/).
 *
 * Three design decisions baked in from the LLM Council review on
 * 2026-11-01:
 *
 *  1. Panic-English copy — the council pointed out that a visitor
 *     Googling at 2am after a Home Office letter isn't going to
 *     recognise "removal directions" or "refusal notice". The copy here
 *     stays in plain English and lets the parent page tell the
 *     component which scenario is being captured via the `situation`
 *     prop so the SalesHub record has the real taxonomy.
 *
 *  2. Free-text situation box — the current page's rigid dropdown
 *     dumped 35% of leads into "other" and 22% into "(not specified)".
 *     Replaced here with a one-line text field pre-filled with a prompt
 *     ("Tell us what's happened in your own words") so the solicitor
 *     has useful context before the callback.
 *
 *  3. Service claim bounded to the service act, not the result — "a
 *     specialist solicitor will call you back" never "we'll stop your
 *     removal". SRA Code Standard 8 + Google government-docs policy
 *     have both bitten this account before.
 */

import { useRef, useState } from "react";
import { Phone, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pushFormSubmit } from "@/lib/tracking";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { GclidField, MsclkidField, UtmFields } from "@/components/v6/gclid-field";
import { submitEnquiry } from "@/lib/publishos";
import {
  captureEmergencyImmigrationLead,
  type EmergencyLeadSource,
} from "@/lib/emergency-ab-tracking";

type Props = {
  /** PostHog variant key for this submission (control / router). */
  abHeroVariant?: string;
  /** Which page is this form living on — used for routing in SalesHub. */
  leadSource: EmergencyLeadSource;
  /**
   * Canonical situation tag persisted alongside the lead:
   *   - visa-expired, detention, removal-directions, triage
   * This is the FIRM taxonomy, not the visitor's self-description.
   * The free-text field below captures the visitor's own words.
   */
  situation: "visa-expired" | "detention" | "removal-directions" | "triage";
  /** Headline above the form — scenario-specific, panic-English. */
  heading: string;
  /** Sub-head under the headline. */
  subheading: string;
  /** Submit CTA label. Default "Request an urgent callback". */
  submitLabel?: string;
};

const SITUATION_LABELS: Record<Props["situation"], string> = {
  "visa-expired": "Visa expired / overstayed",
  detention: "Someone has been detained",
  "removal-directions": "Letter saying they have to leave",
  triage: "Not sure yet — need to speak to someone",
};

export function EmergencyUrgentForm({
  abHeroVariant,
  leadSource,
  situation,
  heading,
  subheading,
  submitLabel = "Request an urgent callback",
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [whatHappened, setWhatHappened] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadedAt = useRef(Date.now());

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mb-4">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">
          Got it{name ? `, ${name.split(" ")[0]}` : ""} — a solicitor is on the way to call you.
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          A specialist immigration solicitor from the Abrahams on-call team will phone you back shortly. If this is time-critical (someone is held, or there is a hearing in the next 24 hours), please also call us direct on <strong className="text-slate-900">0203 355 9823</strong> — our line is answered day and night.
        </p>
        <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          SRA-regulated firm #809071. Everything you say to us is confidential.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
          Free
        </span>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Day &amp; night
        </span>
      </div>
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{heading}</h2>
      <p className="mt-1.5 text-sm text-slate-500 leading-snug">{subheading}</p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (submitting) return;
          setError(null);
          setSubmitting(true);
          try {
            pushFormSubmit({ email, phone });
            const caseDetail = [
              `Situation (firm tag): ${SITUATION_LABELS[situation]}`,
              `Situation (in their own words): ${whatHappened || "(not provided)"}`,
              `Submitted via emergency-immigration page (${leadSource}).`,
            ].join("\n");
            const ok = await submitEnquiry(
              {
                source: `emergency-immigration-${situation}`,
                name,
                email,
                phone,
                service: `[LP] Emergency — ${SITUATION_LABELS[situation]}`,
                case: caseDetail,
              },
              { _hp: honeypot, _t: loadedAt.current },
            );
            if (!ok) {
              setError("Could not send — please call us direct on 0203 355 9823.");
              setSubmitting(false);
              return;
            }
            captureEmergencyImmigrationLead({
              variant: abHeroVariant,
              situation,
              source: leadSource,
            });
            setSubmitted(true);
          } catch {
            setError("Could not send — please call us direct on 0203 355 9823.");
            setSubmitting(false);
          }
        }}
        className="mt-5 space-y-3"
      >
        <HoneypotInput value={honeypot} onChange={setHoneypot} />
        <GclidField />
        <MsclkidField />
        <UtmFields />

        <div>
          <label htmlFor="eu-name" className="sr-only">Your name</label>
          <input
            id="eu-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/30"
          />
        </div>
        <div>
          <label htmlFor="eu-phone" className="sr-only">Phone number</label>
          <input
            id="eu-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Mobile number — we will call you back"
            autoComplete="tel"
            inputMode="tel"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/30"
          />
        </div>
        <div>
          <label htmlFor="eu-email" className="sr-only">Email address (optional)</label>
          <input
            id="eu-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email (optional — so we can send next steps)"
            autoComplete="email"
            inputMode="email"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/30"
          />
        </div>
        <div>
          <label htmlFor="eu-what" className="sr-only">What has happened?</label>
          <textarea
            id="eu-what"
            rows={3}
            value={whatHappened}
            onChange={(e) => setWhatHappened(e.target.value)}
            placeholder="Tell us what has happened in your own words — a few lines is plenty."
            className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/30 resize-none"
          />
        </div>

        {error ? (
          <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        ) : null}

        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Sending…" : (<>{submitLabel}<ArrowRight className="h-4 w-4 ml-2" /></>)}
        </Button>

        <p className="text-[11px] text-slate-400 leading-snug">
          By submitting you ask Abrahams Solicitors to call you back. SRA-regulated firm #809071. We never share your details.
        </p>
      </form>
    </div>
  );
}
