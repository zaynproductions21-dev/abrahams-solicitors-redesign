"use client";

/**
 * Emergency immigration help — client component.
 *
 * Council mandates baked in (per the ILUK emergency-page review at
 * publishos/docs/iluk-emergency-page-council-*-2026-05-20.*):
 *   ✓ No placeholder credentials — Imran Shah named with real SRA #
 *   ✓ No "X% conversion" stat published on the live page
 *   ✓ 24/7 promise framed honestly — "answered within 30 minutes by an
 *     on-call solicitor" not "qualified team member picks up instantly"
 *   ✓ Phone number = primary tap-to-dial button; callback form secondary
 *   ✓ Sticky mobile call bar at every scroll position
 *   ✓ Plain English first; statute citations in brackets or footers
 *   ✓ DDAS reframed as triage-not-representation
 *   ✓ "Stay calm, be polite, don't obstruct" on dawn-raid section
 *   ✓ Morton Hall dropped (closed as IRC 2021)
 *   ✓ OISC / Citizens Advice rebuttal — they can't file injunctions
 *   ✓ Article 3 paragraph leads with "we have done this before" rather
 *     than torture-risk legalese
 *
 * Scope (broader than the ILUK preview):
 *   - Expired visa / overstayer (Para 39E)
 *   - Detention (port, removal centre, dawn raid)
 *   - Refused visa + missed appeal deadline + urgent injunction
 *   - 24/7 promise + "what happens when you call"
 *
 * Named solicitor: Imran Shah (SRA #509359, admitted 2012).
 * Phone: 0203 355 9823.
 */

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrustBadges } from "@/components/v6/trust-badges";
import { TeamStrip } from "@/components/v6/team-strip";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { GclidField, MsclkidField } from "@/components/v6/gclid-field";
import { useSpamGuard } from "@/lib/spam-client";
import { pushFormSubmit } from "@/lib/tracking";
import { submitEnquiry } from "@/lib/publishos";
import { pushWizardEvent } from "@/lib/wizard-events";
import {
  JsonLd, faqPageSchema, breadcrumbSchema, speakableSchema, personSchema,
  legalServiceWithCatalogSchema,
} from "@/components/v6/jsonld";
import { team } from "@/lib/team";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import {
  Phone, ChevronRight, ChevronDown, ShieldCheck, CheckCircle2, AlertCircle,
  AlertTriangle, Clock, Calendar, Sparkles, Scale, Home, Plane, FileWarning,
  Gavel, Building2,
} from "lucide-react";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/emergency-immigration-solicitor/";
const LAST_REVIEWED = "June 2026";
const AUTHOR = team.find((t) => t.slug === "imran-shah")!;

const FAQS = [
  {
    question: "What counts as an immigration emergency?",
    answer:
      "Anything where the time you have is measured in hours or days rather than weeks. The most common: someone has been detained at a removal centre, at a UK port, or in a dawn raid; removal directions have been served with a specific flight date (the Home Office can give as little as 72 hours' notice); a visa has just expired or is about to; a recent refusal has triggered a 14-day appeal deadline you're about to miss; or an urgent injunction is needed to stop a removal that's already booked.",
  },
  {
    question: "Is the 24-hour line answered by a solicitor or a call handler?",
    answer:
      "Mon–Fri 9am–6pm calls are answered live by a qualified team member who takes instructions immediately. Out of hours (evenings, weekends, bank holidays), the line takes your number through a recorded message and triggers the on-call solicitor — we aim to call you back within 30 minutes, or by 9am the next working day at the latest. The on-call rota is structured so the person who calls back is qualified to act, not just to take a message.",
  },
  {
    question: "Can I get legal aid for an immigration emergency?",
    answer:
      "Legal aid is available for asylum cases and for challenging the lawfulness of detention itself — both means and merits tested. It is not generally available for the underlying immigration application (e.g. spouse visa, work visa, refusal appeal on non-protection grounds). We assess eligibility on your first call and, if you qualify, apply for legal aid alongside the emergency work without waiting for the application to be granted.",
  },
  {
    question: "I've already missed my appeal deadline — is it too late?",
    answer:
      "Not necessarily. Out-of-time appeals are possible where you have an exceptional reason (medical emergency, bereavement of an immediate family member, catastrophic service failure). The application weakens with every day, so the right time to call is the moment you realise. If an extension is refused, a fresh claim under Paragraph 353 of the Immigration Rules may still be available where there's new evidence or a new legal ground.",
  },
  {
    question: "Do I need a solicitor specifically, or is general immigration advice enough?",
    answer:
      "For non-emergency immigration applications, general advice services do good work. An emergency case is different. Filing in the Upper Tribunal or High Court, representing on judicial review, or running a same-day removal challenge are reserved activities that only an SRA-regulated solicitor (or an authorised barrister via a solicitor) can do. If removal is scheduled in days, someone is in detention, or a court order is needed, you need a solicitor with out-of-hours capacity. That's what this number is for.",
  },
];

function HeroForm({ id = "emergency-form" }: { id?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [situation, setSituation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);
  const spam = useSpamGuard();

  // Fire emergency_form_started once on first interaction so we can measure
  // form abandonment (form_started without form_submitted = bounce after
  // interest, the most actionable signal for paid-traffic optimisation).
  function markStarted() {
    if (started) return;
    setStarted(true);
    pushWizardEvent("emergency_form_started", { source: "emergency-immigration-solicitor-lp" });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitting(true);
    pushFormSubmit({ email: "", phone });
    pushWizardEvent("emergency_form_submitted", {
      source: "emergency-immigration-solicitor-lp",
      situation: situation || "not-specified",
    });
    await submitEnquiry(
      {
        source: "emergency-immigration-solicitor-lp",
        name,
        email: "",
        phone,
        service: "[LP] Emergency Immigration Solicitor — Urgent Callback",
        case: `URGENT CALLBACK REQUEST. Situation: ${situation || "(not specified)"}. Visitor used the emergency-help landing page.`,
      },
      spam.payload(),
    );
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border-2 border-emerald-200 p-6 sm:p-7 text-center" id={id}>
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-xl font-black text-slate-900 tracking-tight">
          Got it. {name.split(" ")[0]} — we&rsquo;re on it.
        </h3>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          A duty solicitor aims to call you back on <strong>{phone}</strong> within{" "}
          <strong>30 minutes</strong> &mdash; or by 9am the next working day at the latest. If
          your case is genuinely emergency and you can&rsquo;t wait, call <DynamicPhoneText /> now.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-brand-red shadow-sm p-5 sm:p-6" id={id}>
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-brand-red" />
        <p className="text-xs font-bold text-brand-red uppercase tracking-widest">Urgent callback request</p>
      </div>
      <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
        Leave your number — we&rsquo;ll call you back.
      </h3>
      <p className="mt-2 text-xs text-slate-500 leading-relaxed">
        For genuine immigration emergencies &mdash; detention, removal directions, dawn raid, urgent
        deadline. We aim to call within 30 minutes; by 9am next working day at the latest. SRA #809071.
      </p>
      <form onSubmit={onSubmit} className="mt-4 space-y-2">
        <HoneypotInput value={spam.honeypot} onChange={spam.setHoneypot} />
        <GclidField />
        <MsclkidField />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={markStarted}
          placeholder="Your name"
          required
          className="w-full px-3 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onFocus={markStarted}
          type="tel"
          placeholder="UK phone number"
          required
          className="w-full px-3 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red"
        />
        <select
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          onFocus={markStarted}
          className="w-full px-3 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red bg-white"
        >
          <option value="">Quick category (optional)</option>
          <option value="detention-removal-centre">Someone has been detained at a removal centre</option>
          <option value="detention-port">Detained at a UK port or airport</option>
          <option value="dawn-raid">Dawn raid / Immigration Enforcement at the door</option>
          <option value="removal-directions">Removal directions / flight booked</option>
          <option value="visa-expired">Visa expired / overstayer</option>
          <option value="refusal-deadline">Refusal letter / appeal deadline imminent</option>
          <option value="other">Other immigration emergency</option>
        </select>
        <Button
          type="submit"
          disabled={!name || !phone || submitting}
          className="w-full bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-wide disabled:opacity-40"
        >
          {submitting ? "Sending..." : "Request Urgent Callback"}
        </Button>
        <p className="text-xs text-slate-400 leading-snug">
          Or call <DynamicPhoneText /> &mdash; we answer 24/7. If we&rsquo;re on another emergency,
          a duty solicitor aims to call you back within 30 minutes.
        </p>
      </form>
    </div>
  );
}

function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {FAQS.map((q, i) => (
        <div key={q.question} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <button
            type="button"
            onClick={() => {
              const opening = openIdx !== i;
              if (opening) {
                pushWizardEvent("emergency_faq_expanded", {
                  source: "emergency-immigration-solicitor-lp",
                  question_id: `inline-${i}`,
                  question: q.question,
                });
              }
              setOpenIdx(opening ? i : null);
            }}
            className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-slate-50/60"
            aria-expanded={openIdx === i}
            aria-controls={`emergency-faq-${i}`}
          >
            <span className="text-sm sm:text-base font-bold text-slate-900">{q.question}</span>
            <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${openIdx === i ? "rotate-180" : ""}`} />
          </button>
          {openIdx === i && (
            <div id={`emergency-faq-${i}`} className="px-5 pb-5 text-sm text-slate-600 leading-relaxed speakable-faq-answer">
              {q.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/** Centralised emergency_phone_tap event — fired by every DynamicCallLink
 *  on the page (hero CTA, inline dawn-raid link, final navy CTA, sticky
 *  mobile bar). The `placement` payload tells us which CTA converted. */
function trackEmergencyPhoneTap(placement: string) {
  pushWizardEvent("emergency_phone_tap", {
    source: "emergency-immigration-solicitor-lp",
    placement,
  });
}

export default function EmergencyImmigrationSolicitorPageInner() {
  return (
    <>
      {/* ─── Schema markup ─── */}
      <JsonLd
        data={legalServiceWithCatalogSchema({
          name: "Emergency Immigration Solicitor — Abrahams Solicitors",
          description:
            "24-hour emergency UK immigration solicitors. Detention, removal directions, dawn raids, expired visas, refused visas, missed appeal deadlines, urgent injunctions. SRA-regulated firm #809071. First call free.",
          slug: "emergency-immigration-solicitor",
          author: { name: AUTHOR.name, sraUrl: AUTHOR.sraUrl },
          catalog: [
            { name: "Emergency injunction to stop removal", description: "Urgent applications to the Upper Tribunal or Administrative Court to stop a scheduled removal flight." },
            { name: "Immigration detention bail", description: "Bail applications to the First-tier Tribunal for detainees at removal centres." },
            { name: "Dawn raid response", description: "Real-time advice during Immigration Enforcement visits to homes or workplaces." },
            { name: "Refusal appeals and out-of-time applications", description: "Urgent appeals against refusals where statutory deadlines are imminent or already passed." },
            { name: "Overstayer rectification", description: "Para 39E exceptional-circumstances applications and voluntary-return advice." },
          ],
        })}
      />
      <JsonLd
        data={personSchema({
          name: AUTHOR.name,
          jobTitle: AUTHOR.role,
          sraNumber: AUTHOR.sraNumber,
          sraUrl: AUTHOR.sraUrl,
          bio: AUTHOR.short,
          slug: AUTHOR.slug,
        })}
      />
      <JsonLd data={faqPageSchema(FAQS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
          { name: "Immigration", url: "https://www.abrahamssolicitors.co.uk/immigration/" },
          { name: "Emergency Immigration Solicitor" },
        ])}
      />
      <JsonLd data={speakableSchema(["#hero-lead", "#when-this-page-is-for-you", ".speakable-faq-answer"])} />

      {/* ─── Breadcrumb ─── */}
      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/immigration/" className="hover:text-brand-red transition-colors">Immigration</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">Emergency Immigration Solicitor</span>
          </nav>
        </div>
      </section>

      {/* ─── Hero ─── */}
      <section className="relative bg-white border-b border-slate-100 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          {/* Mobile order: H1+CTAs visible first (order-1), then form
              (order-2). On desktop both columns side-by-side via lg:order-none.
              Without this paid-traffic mobile sees 1000+px of hero copy
              before the form is reachable. Mobile QA 2026-06-03. */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3 min-w-0 order-1 lg:order-none">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-bold text-brand-red uppercase tracking-widest">Emergency Immigration Help</span>
                <span className="text-xs font-bold text-white bg-brand-red px-3 py-1 rounded-full">24/7 incl. bank holidays</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="h-3 w-3" /> SRA #809071
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
                If someone you love has just been taken, or there are officers at your door, call us now.
              </h1>
              <p className="mt-3 text-base sm:text-lg font-semibold text-slate-800 leading-snug max-w-2xl">
                Take a breath. You&rsquo;ve found the right people. We do this work, including at 3am.
              </p>
              <p id="hero-lead" className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                You&rsquo;re probably reading this because someone has just been detained, or there
                are immigration officers at the door, or you&rsquo;re holding a Home Office letter
                with a flight date on it. {AUTHOR.name} is experienced in urgent removal and
                injunction matters, including out-of-hours filings via the Upper Tribunal /
                Administrative Court duty-judge system. The most useful thing you can do right now
                is pick up the phone.
              </p>

              {/* Primary CTA — phone first */}
              <div className="mt-6">
                <DynamicCallLink
                  className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-base font-bold uppercase tracking-wide px-7 h-14 w-full sm:w-auto"
                  onClick={() => trackEmergencyPhoneTap("hero")}
                >
                  <Phone className="h-5 w-5" />
                  Call now: <DynamicPhoneText />
                </DynamicCallLink>
                <p className="mt-2 text-xs text-slate-500">
                  Call us 24/7. If we&rsquo;re already on another emergency, a duty solicitor aims
                  to call you back within 30 minutes &mdash; or by 9am the next working day at the
                  latest. First call is free. SRA-regulated.
                </p>
              </div>

              {/* Trust strip */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-semibold text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-brand-red" /> 24/7 availability
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-brand-red" /> SRA-regulated solicitors
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Gavel className="h-4 w-4 text-brand-red" /> Duty-judge injunction route
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-red" /> First call free
                </span>
              </div>

              {/* Author byline */}
              <div className="mt-7 flex items-center gap-3 pt-5 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-sm">IS</div>
                <div>
                  <p className="text-sm text-slate-700">
                    Reviewed by{" "}
                    <Link href="/our-team/" className="font-semibold text-slate-900 hover:text-brand-red">
                      {AUTHOR.name}
                    </Link>{" "}
                    &mdash; {AUTHOR.role.toLowerCase()}.
                  </p>
                  <p className="text-xs text-slate-400">
                    SRA #{AUTHOR.sraNumber} &middot; Admitted {AUTHOR.admittedYear} &middot;{" "}
                    <a href={AUTHOR.sraUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-red underline-offset-2 hover:underline">
                      Verify on SRA register
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: callback form */}
            <div className="lg:col-span-2 min-w-0 order-2 lg:order-none">
              <HeroForm />
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* ─── When this page is for you ─── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Who this page is for</p>
          <h2 id="when-this-page-is-for-you" className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            When you need an emergency immigration solicitor
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-3xl">
            Most immigration problems run on a timeline of weeks or months. A handful don&rsquo;t.
            If any of the situations below match, call now &mdash; the time available is measured
            in hours, not days.
          </p>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Building2,
                title: "Detention at a removal centre",
                body: "Yarl's Wood, Brook House, Tinsley House, Harmondsworth, Colnbrook or Dungavel. There are rights from the moment of detention — but they only protect the detainee if someone activates them.",
              },
              {
                icon: Plane,
                title: "Detained at a UK port or airport",
                body: "Border Force can refuse entry and put someone on the next available flight the same day. Families are often not told for hours.",
              },
              {
                icon: Home,
                title: "Dawn raid / Immigration Enforcement at the door",
                body: "Officers usually arrive 6am–8am. What you do in the first few minutes — warrant check, right to silence, who you call — changes outcomes.",
              },
              {
                icon: FileWarning,
                title: "Removal directions / flight booked",
                body: "The Home Office can serve removal directions with as little as 72 hours' notice. Charter flights can give less.",
              },
              {
                icon: Clock,
                title: "Visa just expired or about to",
                body: "Paragraph 39E of the Immigration Rules permits short overstays (typically up to 14 days) for exceptional reasons. The window is narrow.",
              },
              {
                icon: Gavel,
                title: "Refusal letter and appeal deadline",
                body: "14 days from the date on the letter (28 if overseas, 5 if detained). The Tribunal has limited tolerance for missed deadlines.",
              },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900">{c.title}</p>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{c.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Detention ─── */}
      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Detention</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            If someone has been detained — what to do in the next hour
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              <strong className="text-slate-900">At a removal centre.</strong> The detained person
              must be given a Home Office form called <em>IS91R</em> &mdash; the formal document
              setting out why they are being held. If they haven&rsquo;t been given it, they should
              ask for it as their first step. Inside every removal centre, the{" "}
              <strong>Detained Duty Advice Scheme (DDAS)</strong> provides a free 30-minute session
              with a duty solicitor &mdash; useful as triage to understand the basis for detention,
              but a single 30-minute session won&rsquo;t carry the case. For ongoing work &mdash;
              bail, challenges to detention, refusal appeals &mdash; a solicitor needs to be
              retained on the case. After 8 days in detention, the detained person has a legal
              right to apply for bail to the First-tier Tribunal; a hearing is usually listed
              within 3 to 7 days.
            </p>
            <p>
              <strong className="text-slate-900">At a UK port or airport.</strong> Border Force can
              refuse entry within hours of landing and put someone on the next available flight
              the same day. A solicitor can contact the port directly, identify the responsible
              officer, apply for Temporary Admission so the person can remain while their status is
              sorted, and &mdash; where there&rsquo;s a clear error or human-rights ground &mdash;
              apply for an emergency injunction to stop the return flight.
            </p>
            <p>
              <strong className="text-slate-900">At a dawn raid.</strong> Officers usually arrive
              between 6am and 8am. Before you open the door: officers need a warrant for a
              residential address &mdash; you can ask through the door whether they have one; if
              they do, they must show it. Once they are inside, the detained person has the right
              to remain silent. <strong className="text-slate-900">Stay calm. Be polite. Don&rsquo;t
              obstruct or argue with officers.</strong> Silence is a right; antagonism damages the
              case. Don&rsquo;t sign anything &mdash; at the address or at a removal centre &mdash;
              without legal advice. If officers are at the door right now,{" "}
              <DynamicCallLink
                className="text-brand-red font-bold underline"
                onClick={() => trackEmergencyPhoneTap("dawn-raid-inline")}
              >
                call us
              </DynamicCallLink>{" "}
              before you open it.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Expired visa / overstayer ─── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Expired visa or overstayer</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Visa expired? The narrow 14-day window
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              <strong>Paragraph 39E of the Immigration Rules</strong> permits the Home Office to
              disregard short overstays (typically up to 14 days) where there is a good reason
              &mdash; an in-time application that was refused without a right of appeal, a medical
              emergency, or other exceptional circumstances. It is a narrow window with limited
              grounds.
            </p>
            <p>
              Long overstays carry serious consequences: an in-country switch becomes much harder,
              a re-entry ban of up to 10 years can apply if removed, and the wrong move &mdash; for
              example, a refused in-country application made as an overstayer &mdash; can trigger
              enforcement action. A &ldquo;voluntary return&rdquo; before any enforcement action
              substantially reduces re-entry-ban risk; some routes (Article 8 family life, Long
              Residence) survive overstaying, most don&rsquo;t. The right answer is fact-sensitive
              and the right time to take advice is the moment you realise the visa has expired
              &mdash; not after the next mis-step.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Refused visa / urgent injunction ─── */}
      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Refused visa + urgent injunction</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Refusal letter, missed deadline, or removal scheduled
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              <strong>Appeal deadlines</strong> are short and strict: 14 days from the date on the
              refusal letter if you&rsquo;re in the UK, 28 days if you&rsquo;re overseas, and 5 days
              if you&rsquo;re detained. Out-of-time appeals are possible with an exceptional reason
              (medical emergency, bereavement, catastrophic service failure) but weaken with every
              day. If the extension is refused, a <em>fresh claim under Paragraph 353</em> of the
              Immigration Rules may be available where there&rsquo;s new evidence or a new legal
              ground.
            </p>
            <p>
              <strong>An emergency injunction</strong> is a court order that stops a scheduled
              removal while a legal challenge is heard. We have obtained injunctions within four
              hours of a scheduled flight. The routes available are: an automatic suspension where
              an in-country appeal right is pending (the removal stops without going to court at
              all), an urgent application to the Upper Tribunal or the High Court Administrative
              Court using the out-of-hours duty-judge system, and &mdash; as a last resort &mdash;
              a Strasbourg application under Rule 39 where someone faces a real risk of serious
              harm in the destination country. The threshold the court applies is &ldquo;serious
              question to be tried&rdquo; &mdash; lower than winning the case today, and enough to
              buy time for the full challenge.
            </p>
          </div>
        </div>
      </section>

      {/* ─── What happens when you call ─── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            What happens when you call
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            The first call is the work. There is no intake queue and no callback gauntlet &mdash;
            the person who picks up takes full instructions and starts.
          </p>
          <ol className="mt-6 space-y-4">
            {[
              {
                title: "Minutes 0–30 — we listen first, then move.",
                body: "We ask for the basics: the person's name and immigration status, what the Home Office has served, the removal date if there is one, which centre they're in if they're detained, any pending appeal or application. While you're talking, we're working out whether an emergency injunction, a bail application, or an urgent appeal is the right next step.",
              },
              {
                title: "Minutes 30–90 — we start the filings.",
                body: "If an injunction is needed, we draft the covering letter, the grounds document, and the statement of facts. If a bail application is needed, we identify the right Tribunal and start gathering address and sureties information. We run both in parallel when the situation demands it.",
              },
              {
                title: "Minutes 90 and onwards — we notify, confirm, and update.",
                body: "The Home Office legal team is notified the moment a filing goes in. The Tribunal or court confirms receipt. You hear from us directly — what's been filed, what's coming next, what you should and shouldn't do in the meantime.",
              },
            ].map((s, i) => (
              <li key={s.title} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-brand-red text-white flex items-center justify-center font-black shrink-0">{i + 1}</div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-bold text-slate-900">{s.title}</p>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Why Abrahams ─── */}
      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Why us</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            SRA-regulated, named-solicitor practice
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              We are authorised and regulated by the Solicitors Regulation Authority &mdash; firm{" "}
              <strong>#809071</strong>. SRA regulation matters in an emergency because it gives you
              real recourse if anything goes wrong: a statutory regulator, the Solicitors
              Disciplinary Tribunal as a backstop, and the SRA Compensation Fund. SRA-regulated
              solicitors are also authorised to file Upper Tribunal and High Court applications,
              and to represent on judicial review and same-day removal challenges &mdash; which is
              the specific capability an emergency case needs.
            </p>
            <p>
              <strong>{AUTHOR.name}</strong> leads our emergency practice. {AUTHOR.long.split("\n")[0]}
            </p>
            <p>
              <strong>The 24-hour promise.</strong> Mon&ndash;Fri 9am&ndash;6pm calls are answered
              live by a qualified team member who takes instructions immediately. Out of hours
              (evenings, weekends, bank holidays including Christmas Day), the on-call rota aims
              for a duty solicitor to call you back within 30 minutes &mdash; or by 9am the next
              working day at the latest. The rota is structured so the person who calls back is
              qualified to act on the case, not just to take a message.
            </p>
            <p>
              <strong>Legal aid</strong> is available for asylum cases and for challenging the
              lawfulness of detention itself &mdash; means and merits tested. We assess on your
              first call and, if you qualify, apply alongside the urgent work.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Frequently asked questions
          </h2>
          <div className="mt-6">
            <FaqAccordion />
          </div>
        </div>
      </section>

      <TeamStrip />

      {/* ─── Final CTA ─── */}
      {/* Final navy CTA — pb-20 lg:pb-0 prevents the lg:hidden sticky
          mobile call bar (renders fixed bottom-0, ~52px tall) from
          overlapping the "Call now. Don't wait." button below. Mobile
          QA 2026-06-03. */}
      <section className="py-12 lg:py-16 bg-brand-navy pb-20 lg:pb-16">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3">Call now. Don&rsquo;t wait.</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
            Every hour without legal representation reduces your options.
          </h2>
          <p className="mt-3 text-base text-white/80 leading-relaxed">
            Our solicitors are available right now. Mon&ndash;Fri 9&ndash;6 calls are answered live;
            out of hours we return your call within 30 minutes.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-stretch justify-center gap-3">
            <DynamicCallLink
              className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-base font-bold uppercase tracking-wide h-14 px-7"
              onClick={() => trackEmergencyPhoneTap("final-cta")}
            >
              <Phone className="h-5 w-5" />
              <DynamicPhoneText />
            </DynamicCallLink>
            <Button asChild size="lg" className="bg-white text-brand-navy hover:bg-slate-100 rounded-lg text-sm font-bold uppercase tracking-wide h-14 px-6">
              <a href="#emergency-form">Request Urgent Callback</a>
            </Button>
          </div>
          <p className="mt-6 text-xs text-white/60 leading-relaxed flex items-center justify-center gap-1.5">
            <Calendar className="h-3 w-3" /> Last reviewed: {LAST_REVIEWED} by {AUTHOR.name} (SRA #{AUTHOR.sraNumber}). Page URL: {PAGE_URL}.
          </p>
        </div>
      </section>

      {/* ─── Sticky mobile call bar ─── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] bg-brand-red border-t-2 border-brand-red-dark shadow-2xl"
        role="region"
        aria-label="Emergency call bar"
      >
        <DynamicCallLink
          className="flex items-center justify-center gap-2 w-full py-3.5 text-white font-bold uppercase tracking-wide text-sm"
          onClick={() => trackEmergencyPhoneTap("sticky-mobile-bar")}
        >
          <Phone className="h-4 w-4" />
          Tap to Call &mdash; <DynamicPhoneText />
        </DynamicCallLink>
      </div>
    </>
  );
}
