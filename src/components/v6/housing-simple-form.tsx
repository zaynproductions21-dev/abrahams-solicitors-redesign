"use client";

/**
 * HousingSimpleForm — short lead capture for /housing-disrepair/
 *
 * Shipped 2026-06-02 after the QS audit found that the existing 5-step
 * HousingQualifier wizard was the dominant CVR killer for paid traffic:
 * tenants in distress arriving via Google Ads at 9am want immediate
 * human contact, not a quiz.
 *
 * 2026-11-24: Reworked to a STEP-0 QUALIFIER GATE. Before any form fields
 * appear the visitor is asked one question: who do they pay their rent to?
 * Private-landlord selections short-circuit to a redirect (Shelter /
 * Citizens Advice / Gov.uk) and NEVER fire a lead POST — these cases
 * don't meet the firm's commercial criteria and were polluting SalesHub +
 * the Smart Bidding conversion signal. Social and "not sure" both proceed
 * to the form; landlord_type is promoted to a top-level lead field (via
 * submitEnquiry meta → /api/lead dual-write) so the CRM can filter and
 * report on it without parsing the free-text `case` field.
 *
 * Copy for the gate and decline message passed through: council (2026-11-17,
 * 4 advisors, convergent APPROVE-WITH-CHANGES) → copywriting pass →
 * /api/humanise.
 */

import { useState } from "react";
import { ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, HelpCircle, Home as HomeIcon, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pushFormSubmit } from "@/lib/tracking";
import { useSpamGuard } from "@/lib/spam-client";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { GclidField, MsclkidField, UtmFields } from "@/components/v6/gclid-field";
import { submitEnquiry } from "@/lib/publishos";
import { captureHousingDisrepairLead } from "@/lib/housing-ab-tracking";

const FORM_SOURCE = "housing-disrepair-simple-form";

// Step-0 qualifier gate. "social" + "unknown" both proceed to the form;
// "unknown" is tagged separately so the team can triage on callback.
// "private" short-circuits to the decline screen and never fires a POST —
// those cases don't meet the firm's commercial criteria.
type GateState = "ask" | "social" | "unknown" | "private";

export function HousingSimpleForm({
  abHeroVariant,
  sourceOverride,
}: { abHeroVariant?: string; sourceOverride?: string } = {}) {
  const [gate, setGate] = useState<GateState>("ask");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [problem, setProblem] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const spam = useSpamGuard();

  // ─────────────────────────────────────────────────────────────────
  // Step 0 — qualifier gate. Shown BEFORE any form fields so private-
  // landlord tenants don't waste time filling name/email/phone just
  // to hit a rejection, and the Smart-Bidding conversion signal stays
  // clean (council + HA only).
  // ─────────────────────────────────────────────────────────────────
  if (gate === "ask") {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Free
          </span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            One quick question
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Who do you pay your rent to?
        </h2>
        <p className="mt-1.5 text-sm text-slate-500 leading-snug">
          We only take council and housing-association cases — this just
          saves you filling in a form we can&rsquo;t act on.
        </p>

        <div className="mt-5 space-y-3">
          {/* Primary tile — brand-red, the desired path. Per Creative
              Director: guide, don't gate; ~80%+ of real cases are here. */}
          <button
            type="button"
            onClick={() => setGate("social")}
            data-landlord-choice="social"
            className="w-full text-left rounded-xl bg-brand-red hover:bg-brand-red-dark text-white px-5 py-4 transition-colors"
          >
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <div className="text-sm font-bold uppercase tracking-wide">
                  The council, or a housing association
                </div>
                <div className="mt-1 text-xs text-white/85 leading-snug">
                  Including Peabody, Clarion, Sanctuary, L&amp;Q, housing trusts, ALMOs
                </div>
              </div>
            </div>
          </button>

          {/* Ghost tile — private landlord. Short-circuits to decline. */}
          <button
            type="button"
            onClick={() => setGate("private")}
            data-landlord-choice="private"
            className="w-full text-left rounded-xl bg-white border border-slate-200 hover:border-slate-400 text-slate-800 px-5 py-3.5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <HomeIcon className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
              <div className="text-sm font-semibold">A private landlord or letting agent</div>
            </div>
          </button>

          {/* Ghost tile — not sure. Routes to the form with
              landlord_type=unknown so a solicitor can triage on callback. */}
          <button
            type="button"
            onClick={() => setGate("unknown")}
            data-landlord-choice="unknown"
            className="w-full text-left rounded-xl bg-white border border-slate-200 hover:border-slate-400 text-slate-800 px-5 py-3.5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
              <div className="text-sm font-semibold">I&rsquo;m not sure</div>
            </div>
          </button>
        </div>

        <div className="mt-5 flex items-center gap-2 text-[11px] text-slate-400 leading-snug">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
          SRA-regulated firm #809071. No win, no fee for most clients.
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────
  // Private landlord → decline screen. Zero lead POSTs fire from this
  // branch. Shelter leads as the primary resource (Creative Director).
  // Deliberately uses white/navy with an emerald Shelter accent — NOT a
  // red/amber warning UI — because this is redirection, not failure.
  // ─────────────────────────────────────────────────────────────────
  if (gate === "private") {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7">
        <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
          You deserve help with this &mdash; it&rsquo;s just not us.
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          We only take cases for council and housing-association tenants.
          If you&rsquo;re renting privately, these three teams can help &mdash;
          and they&rsquo;re all free.
        </p>

        {/* Shelter — primary emerald card (per CD: the housing authority
            most tenants already trust). */}
        <a
          href="https://www.shelter.org.uk/get_help"
          target="_blank"
          rel="noopener noreferrer"
          data-decline-resource="shelter"
          className="group mt-4 block rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition-colors px-4 py-3.5"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-bold text-slate-900">Shelter</div>
              <div className="mt-0.5 text-xs text-slate-600 leading-snug">
                Free housing emergency advice, UK-wide
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-emerald-700 shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </a>

        {/* CA + Gov.uk — secondary chips. */}
        <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <a
            href="https://www.citizensadvice.org.uk/housing/"
            target="_blank"
            rel="noopener noreferrer"
            data-decline-resource="citizens-advice"
            className="rounded-lg border border-slate-200 bg-white hover:border-slate-400 px-3.5 py-2.5 text-xs font-semibold text-slate-700 transition-colors"
          >
            Citizens Advice &mdash; housing &rarr;
          </a>
          <a
            href="https://www.gov.uk/private-renting-complaints"
            target="_blank"
            rel="noopener noreferrer"
            data-decline-resource="gov-uk"
            className="rounded-lg border border-slate-200 bg-white hover:border-slate-400 px-3.5 py-2.5 text-xs font-semibold text-slate-700 transition-colors"
          >
            Gov.uk &mdash; complain about a landlord &rarr;
          </a>
        </div>

        <button
          type="button"
          onClick={() => setGate("ask")}
          className="mt-5 text-xs font-semibold text-slate-500 hover:text-brand-red underline-offset-2 hover:underline"
        >
          Not right? Change my answer
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mb-4">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">
          Got it &mdash; a solicitor will call you back today.
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          {name ? `Thanks, ${name.split(" ")[0]}.` : "Thanks."}{" "}
          A housing-disrepair solicitor will review your details and call
          you within the next hour during office hours. No spam, no obligation.
        </p>
        <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          SRA-regulated firm #809071. Conversation is privileged.
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────
  // Form — reached only when gate is "social" or "unknown".
  // ─────────────────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
          Free
        </span>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          30-second form
        </span>
      </div>
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
        Speak to a housing-disrepair solicitor today
      </h2>
      <p className="mt-1.5 text-sm text-slate-500 leading-snug">
        No win, no fee. We&rsquo;ll call you back within the hour.
      </p>
      {gate === "unknown" ? (
        <p className="mt-2 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 leading-snug">
          Not sure what type of landlord you have? No problem &mdash; we&rsquo;ll
          confirm that on the call.{" "}
          <button
            type="button"
            onClick={() => setGate("ask")}
            className="font-semibold text-brand-red hover:underline"
          >
            Change answer
          </button>
        </p>
      ) : null}

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (submitting) return;
          setError(null);
          setSubmitting(true);
          try {
            pushFormSubmit({ email, phone });
            const caseDetail = [
              postcode ? `Postcode: ${postcode}` : null,
              problem ? `Problem: ${problem}` : null,
              `Landlord type (gate): ${gate}`,
              "Submitted via simple-form (paid traffic path)",
            ].filter(Boolean).join("\n");
            const ok = await submitEnquiry(
              {
                source: sourceOverride ?? FORM_SOURCE,
                name,
                email,
                phone,
                service: "housing",
                case: caseDetail,
              },
              spam.payload(),
              undefined,
              { landlordType: gate === "social" ? "social" : "unknown" },
            );
            if (!ok) {
              setError("Could not send — please call us instead on 0203 355 9823.");
              setSubmitting(false);
              return;
            }
            // PostHog conversion event — landlord dimension now captured
            // separately via landlord_type on the lead, so we pass null
            // here (the council/ha split no longer exists in the form).
            captureHousingDisrepairLead({
              variant: abHeroVariant,
              landlord: null,
              postcode,
              source: "simple-form",
            });
            setSubmitted(true);
          } catch {
            setError("Something went wrong — please call us instead on 0203 355 9823.");
            setSubmitting(false);
          }
        }}
        className="mt-5 space-y-3"
      >
        <HoneypotInput value={spam.honeypot} onChange={spam.setHoneypot} />
        <GclidField />
        <MsclkidField />
        <UtmFields />

        <div>
          <label htmlFor="hsf-name" className="sr-only">Your name</label>
          <input
            id="hsf-name"
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
          <label htmlFor="hsf-email" className="sr-only">Email address</label>
          <input
            id="hsf-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            autoComplete="email"
            inputMode="email"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/30"
          />
        </div>

        <div>
          <label htmlFor="hsf-phone" className="sr-only">Phone number</label>
          <input
            id="hsf-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            autoComplete="tel"
            inputMode="tel"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/30"
          />
        </div>

        <div>
          <label htmlFor="hsf-postcode" className="sr-only">Postcode</label>
          <input
            id="hsf-postcode"
            type="text"
            required
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="Postcode (e.g. SW18 4QB)"
            autoComplete="postal-code"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/30"
          />
        </div>

        <div>
          <label htmlFor="hsf-problem" className="sr-only">Brief description of the problem</label>
          <textarea
            id="hsf-problem"
            rows={2}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="What's the problem? e.g. damp / mould / leaks"
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
          {submitting ? "Sending…" : (
            <>
              Get my free case check
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>

        <p className="text-[11px] text-slate-400 leading-snug">
          By submitting you consent to a callback. SRA-regulated firm
          #809071. We never share your details.
        </p>
      </form>
    </div>
  );
}
