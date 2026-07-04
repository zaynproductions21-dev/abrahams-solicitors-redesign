"use client";

/**
 * HousingSimpleForm — short lead capture for /housing-disrepair/
 *
 * Shipped 2026-06-02 after the QS audit found that the existing 5-step
 * HousingQualifier wizard was the dominant CVR killer for paid traffic:
 * tenants in distress arriving via Google Ads at 9am want immediate
 * human contact, not a quiz. The qualifier remains accessible via an
 * "expand for full check" toggle for organic visitors who'd prefer the
 * pre-qualifying questions.
 *
 * Submission goes to /api/lead with source "housing-disrepair-simple-form"
 * and serviceLine "housing" — both prefixes/values are recognised by the
 * smart routing in api/lead/route.ts (shipped earlier today for the Kerry
 * Oliver case) so the lead routes to abrahams_housing_enquiries, not
 * immigration.
 */

import { useState } from "react";
import { ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pushFormSubmit } from "@/lib/tracking";
import { useSpamGuard } from "@/lib/spam-client";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { GclidField, MsclkidField, UtmFields } from "@/components/v6/gclid-field";
import { submitEnquiry } from "@/lib/publishos";

const FORM_SOURCE = "housing-disrepair-simple-form";

// Landlord-type filter. Per Imran (2026-06-02), Abrahams only takes
// Council and Housing Association housing-disrepair cases — private
// landlord cases don't meet the firm's commercial criteria. Capturing
// this at the form level (and showing a redirect for private leads)
// gates 75% of currently-misfit traffic before it ever reaches SalesHub.
type Landlord = "" | "council" | "ha" | "private";

export function HousingSimpleForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [landlord, setLandlord] = useState<Landlord>("");
  const [problem, setProblem] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // gateBlocked is true when a private-landlord lead is selected — we show
  // a polite redirect instead of accepting the submission. Lead is NOT
  // sent to SalesHub or the abrahams_housing_enquiries mirror.
  const [gateBlocked, setGateBlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const spam = useSpamGuard();

  // Private-landlord redirect state — shown instead of posting to /api/lead.
  // Tenants of private landlords still deserve a clear next step (Citizens
  // Advice, Shelter), even though Abrahams cannot take their case.
  if (gateBlocked) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-7">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-700 mb-3">
          <AlertCircle className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-black text-slate-900 tracking-tight">
          We don&rsquo;t take private-landlord cases — but here&rsquo;s where to get help
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Our housing-disrepair team specialises in Council and Housing
          Association tenancies. For private rentals, these free services
          are best-placed to help:
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <a href="https://www.shelter.org.uk/get_help" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-red hover:underline">
              Shelter — free housing advice →
            </a>
          </li>
          <li>
            <a href="https://www.citizensadvice.org.uk/housing/" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-red hover:underline">
              Citizens Advice — housing →
            </a>
          </li>
          <li>
            <a href="https://www.gov.uk/private-renting-complaints" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-red hover:underline">
              Gov.uk — complain about a private landlord →
            </a>
          </li>
        </ul>
        <button
          type="button"
          onClick={() => { setGateBlocked(false); setLandlord(""); }}
          className="mt-5 text-xs font-semibold text-slate-500 hover:text-brand-red underline-offset-2 hover:underline"
        >
          Wrong selection? Change landlord type
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
          Got it — a solicitor will call you back today.
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

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (submitting) return;
          setError(null);
          // Landlord-type gate — block private-landlord submissions BEFORE
          // hitting GTM / SalesHub. Show redirect screen instead. We don't
          // want these in the conversion signal for Smart Bidding (they
          // dilute the council/HA target) and we don't want them clogging
          // SalesHub or the housing mirror.
          if (landlord === "private") {
            setGateBlocked(true);
            return;
          }
          if (!landlord) {
            setError("Please select your landlord type.");
            return;
          }
          setSubmitting(true);
          try {
            // GTM telemetry (mirrors pushFormSubmit pattern used elsewhere
            // on the site — Enhanced Conversions for Leads picks this up).
            pushFormSubmit({ email, phone });
            // Pack postcode + landlord + problem into `case` field to match
            // the Enquiry type. service:"housing" triggers the smart-routing
            // path in api/lead/route.ts → routes to housing mirror.
            const landlordLabel = landlord === "council" ? "Council" : "Housing Association";
            const caseDetail = [
              `Landlord: ${landlordLabel}`,
              postcode ? `Postcode: ${postcode}` : null,
              problem ? `Problem: ${problem}` : null,
              "Submitted via simple-form (paid traffic path)",
            ].filter(Boolean).join("\n");
            const ok = await submitEnquiry(
              {
                source: FORM_SOURCE,
                name,
                email,
                phone,
                service: "housing",
                case: caseDetail,
              },
              spam.payload(),
            );
            if (!ok) {
              setError("Could not send — please call us instead on 0203 355 9823.");
              setSubmitting(false);
              return;
            }
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

        {/* Landlord-type gate — required. Private-landlord selection
            short-circuits the submit and shows a redirect screen rather
            than reaching SalesHub. Council and HA are accepted. */}
        <div>
          <label htmlFor="hsf-landlord" className="block text-xs font-semibold text-slate-600 mb-1.5">
            Who is your landlord?
          </label>
          <select
            id="hsf-landlord"
            required
            value={landlord}
            onChange={(e) => setLandlord(e.target.value as Landlord)}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/30"
          >
            <option value="">Select landlord type…</option>
            <option value="council">Council</option>
            <option value="ha">Housing Association</option>
            <option value="private">Private landlord</option>
          </select>
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
