"use client";

/**
 * /immigration-solicitors/ — client component.
 *
 * Council-mandated structure for paid-traffic LP (commercial-intent
 * "immigration solicitor" / "immigration lawyer" queries):
 *
 *   - H1 message-matches ad keyword (no "Near You" filler)
 *   - Hero is form + phone + reviews — no wizards
 *   - Refusal-state entry strip per the Outsider advisor — addresses
 *     the post-refusal panic visitor missed by the existing /immigration/
 *   - Reviews block visible above the fold (social proof out-converts
 *     copy on commercial-intent legal traffic)
 *   - Fixed-fee table — kills the "vague pricing feels like a sales-call
 *     trap" objection
 *   - ≤5 outbound links total (vs the existing page's 20+)
 *   - Sticky mobile call bar
 *   - GTM events: form_started / form_submitted / phone_tap with
 *     placement payload for hero-vs-final-CTA CVR split
 *
 * Named solicitor: Imran Shah (SRA #509359, admitted 2012, Director).
 * Phone: 0203 355 9823.
 */

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrustBadges } from "@/components/v6/trust-badges";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { GclidField, MsclkidField } from "@/components/v6/gclid-field";
import { useSpamGuard } from "@/lib/spam-client";
import { pushFormSubmit } from "@/lib/tracking";
import { pushWizardEvent } from "@/lib/wizard-events";
import { submitEnquiry } from "@/lib/publishos";
import {
  JsonLd, faqPageSchema, breadcrumbSchema, speakableSchema, personSchema,
  legalServiceWithCatalogSchema,
} from "@/components/v6/jsonld";
import { team } from "@/lib/team";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import {
  Phone, ChevronRight, ChevronDown, ShieldCheck, CheckCircle2, AlertCircle,
  AlertTriangle, Clock, Calendar, Star, Sparkles, PoundSterling, MapPin,
  ArrowRight, Scale, Award, Briefcase,
} from "lucide-react";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/immigration-solicitors/";
const LAST_REVIEWED = "June 2026";
const AUTHOR = team.find((t) => t.slug === "imran-shah")!;

const FIXED_FEES = [
  {
    service: "Spouse visa (first application)",
    fee: "From £900",
    note: "Plus UKVI fees (£1,938 + IHS)",
  },
  {
    service: "FLR(M) extension",
    fee: "From £900",
    note: "Plus UKVI fee (£1,048 + IHS)",
  },
  {
    service: "Indefinite Leave to Remain",
    fee: "From £750",
    note: "Plus UKVI fee (£3,029)",
  },
  {
    service: "British Citizenship (naturalisation)",
    fee: "From £900",
    note: "Plus UKVI fee (£1,580 + ceremony £80)",
  },
  {
    service: "Visa refusal appeal (FTT IAC)",
    fee: "Quoted individually",
    note: "Free 30-min review of refusal letter first",
  },
  {
    service: "Skilled Worker switching / extension",
    fee: "From £900",
    note: "Plus UKVI fee + IHS",
  },
];

const TESTIMONIALS = [
  {
    name: "Daniel & Sara",
    service: "Spouse visa appeal",
    text: "After a brutal refusal we were close to giving up. Imran walked us through the grounds line by line, rebuilt the evidence pack, and won the appeal. Honest from day one — never sold us a result he couldn't deliver.",
  },
  {
    name: "Priya",
    service: "FLR(M) extension",
    text: "The £29,000 financial threshold change happened mid-way through our planning. We were panicking. Direct contact with the solicitor throughout — no call centres, no junior handlers. Approved in 6 weeks.",
  },
  {
    name: "Marek",
    service: "Skilled Worker → ILR",
    text: "10 years on Skilled Worker, then a sponsor licence revocation that nearly derailed everything. Abrahams got the variation through inside the 60-day grace period and then the ILR a year later. Worth every penny.",
  },
];

const FAQS = [
  {
    question: "How much does an immigration solicitor cost?",
    answer:
      "We work on fixed fees, agreed in writing before any work starts — so you know the total cost before we begin. Most spouse visa, FLR(M), ILR and citizenship applications start from £750 to £900 plus VAT, with the UKVI government fee and Immigration Health Surcharge paid separately to the Home Office. Complex cases (previous refusal, gap in leave, dependants, judicial review) are quoted individually after a free 30-minute scoping call. Interest-free payment plans are available across most matters.",
  },
  {
    question: "Is the first call really free?",
    answer:
      "Yes — the first 30 minutes is free, with no obligation. You speak directly to a qualified solicitor (not a call handler or a junior paralegal). We use the call to identify the right route, flag any complications, and give you a written fixed-fee quote afterwards if you want to instruct. If we can't help you, we'll tell you straight and point you to who can.",
  },
  {
    question: "What's the difference between an immigration solicitor and an OISC adviser?",
    answer:
      "Solicitors are regulated by the SRA and can act on every category of immigration work — applications, appeals, judicial review, High Court and Upper Tribunal proceedings. OISC-regulated advisers are authorised at three levels; only Level 3 advisers can take appeals to Tribunal. For straightforward applications either is fine. For refusals, appeals, urgent injunctions, or anything that may reach a court, you need an SRA-regulated solicitor.",
  },
  {
    question: "Do I have to come to your office or can we work remotely?",
    answer:
      "Almost all of our immigration work is done remotely. We use phone, video (Zoom, WhatsApp), and secure document upload — we don't require you to travel to our office for any application work. We have offices in London and Bradford if you prefer face-to-face meetings, but it's not necessary. We act for clients across England and Wales, plus UK nationals and partners overseas filing for entry clearance.",
  },
  {
    question: "What happens on a visa refusal — how fast do I need to act?",
    answer:
      "Appeal deadlines are short: 14 days from the date on the refusal letter if you're in the UK, 28 days if you're overseas, 5 working days if you're detained. Out-of-time appeals are possible with an exceptional reason (medical emergency, bereavement, catastrophic service failure) but weaken with every day. If a deadline is within 7 days, call us today on 0203 355 9823. The earlier we have the refusal letter, the more options remain on the table.",
  },
];

// ─── Form ──────────────────────────────────────────────────────────────

function HeroForm({ id = "consultation-form" }: { id?: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [matter, setMatter] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);
  const spam = useSpamGuard();

  function markStarted() {
    if (started) return;
    setStarted(true);
    pushWizardEvent("immigration_solicitors_lp_form_started", {
      source: "immigration-solicitors-lp",
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !email || !phone) return;
    setSubmitting(true);
    pushFormSubmit({ email, phone, firstName, lastName });
    pushWizardEvent("immigration_solicitors_lp_form_submitted", {
      source: "immigration-solicitors-lp",
      matter: matter || "not-specified",
    });
    await submitEnquiry(
      {
        source: "immigration-solicitors-lp",
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone,
        service: "[LP] Immigration Solicitors",
        case: `Free 30-min consultation request. Matter: ${matter || "(not specified)"}.`,
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
          Thanks {firstName.split(" ")[0]}.
        </h3>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          {AUTHOR.name} or someone in the immigration team will call you back on{" "}
          <strong>{phone}</strong> within <strong>one working hour</strong> (Mon&ndash;Fri). Weekend
          submissions land Monday morning.
        </p>
        <p className="mt-3 text-xs text-slate-400">
          If urgent, call <DynamicPhoneText /> now.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-brand-red shadow-sm p-5 sm:p-6" id={id}>
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-brand-red" />
        <p className="text-xs font-bold text-brand-red uppercase tracking-widest">Free 30-min consultation</p>
      </div>
      <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
        Speak to a named immigration solicitor today.
      </h3>
      <p className="mt-2 text-xs text-slate-500 leading-relaxed">
        Reviewed by {AUTHOR.name} &mdash; SRA #{AUTHOR.sraNumber}, admitted {AUTHOR.admittedYear}.
      </p>
      <form id="enquiry-form" onSubmit={onSubmit} className="mt-4 space-y-2 scroll-mt-24">
        <HoneypotInput value={spam.honeypot} onChange={spam.setHoneypot} />
        <GclidField />
        <MsclkidField />
        {/* Form fields wired with autoComplete + inputMode so iOS AutoFill
            fills name/email/phone in one tap, and the correct mobile
            keyboard appears for each field (no alpha keyboard on phone).
            Mobile QA 2026-06-03 — was a meaningful CVR leak per Apple's
            documented HIG. */}
        <div className="grid grid-cols-2 gap-2">
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} onFocus={markStarted}
            placeholder="First name" required
            autoComplete="given-name"
            className="px-3 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red" />
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} onFocus={markStarted}
            placeholder="Last name"
            autoComplete="family-name"
            className="px-3 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red" />
        </div>
        <input value={email} onChange={(e) => setEmail(e.target.value)} onFocus={markStarted} type="email"
          placeholder="Email" required
          autoComplete="email" inputMode="email"
          className="w-full px-3 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} onFocus={markStarted} type="tel"
          placeholder="UK phone number" required
          autoComplete="tel" inputMode="tel"
          className="w-full px-3 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red" />
        {/* Placeholder shortened — full "What's your matter? (optional)"
            was clipping to "What's your matter? (option" on iOS Safari
            because the native dropdown chevron reserves ~30px of right
            padding. Mobile QA Tier 3 follow-up. */}
        <select value={matter} onChange={(e) => setMatter(e.target.value)} onFocus={markStarted}
          className="w-full px-3 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red bg-white">
          <option value="">Your matter (optional)</option>
          <option value="spouse-visa">Spouse / partner visa</option>
          <option value="flr-m">FLR(M) extension</option>
          <option value="ilr">Indefinite Leave to Remain</option>
          <option value="citizenship">British citizenship</option>
          <option value="refusal-appeal">Visa refusal / appeal</option>
          <option value="skilled-worker">Skilled Worker / sponsorship</option>
          <option value="other">Other immigration matter</option>
        </select>
        {/* Button text shortened 2026-06-03 from "Book Free 30-Min
            Consultation" (30 chars + uppercase + tracking-wide → clipped
            on phones at ~370px wide). The 30-min detail is already in
            the form heading above so dropping it from the button costs
            no information. Also drops tracking-wide on phones via the
            sm: breakpoint — keeps the desktop look, fits the phone. */}
        <Button type="submit" disabled={!firstName || !email || !phone || submitting}
          className="w-full bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase sm:tracking-wide disabled:opacity-40">
          {submitting ? "Sending..." : "Book Free Consultation"}
        </Button>
        <p className="text-xs text-slate-400 leading-snug">
          Or call <DynamicPhoneText /> &mdash; Mon&ndash;Fri 9am&ndash;6pm.
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
          <button type="button"
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-slate-50/60"
            aria-expanded={openIdx === i} aria-controls={`is-faq-${i}`}>
            <span className="text-sm sm:text-base font-bold text-slate-900">{q.question}</span>
            <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${openIdx === i ? "rotate-180" : ""}`} />
          </button>
          {openIdx === i && (
            <div id={`is-faq-${i}`} className="px-5 pb-5 text-sm text-slate-600 leading-relaxed speakable-faq-answer">
              {q.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/** Phone-tap tracking helper. Every DynamicCallLink on the page uses this
 *  so we can split CVR by placement (hero vs refusal-strip vs final-cta
 *  vs sticky-mobile-bar). Wired through the optional onClick prop added
 *  to DynamicCallLink earlier in the session. */
function trackPhoneTap(placement: string) {
  pushWizardEvent("immigration_solicitors_lp_phone_tap", {
    source: "immigration-solicitors-lp",
    placement,
  });
}

export default function ImmigrationSolicitorsPageInner() {
  return (
    <>
      {/* ─── Schema markup ─── */}
      <JsonLd
        data={legalServiceWithCatalogSchema({
          name: "UK Immigration Solicitors — Abrahams Solicitors",
          description:
            "SRA-regulated immigration solicitors. Spouse visas, FLR(M) extensions, ILR, British citizenship, refusal appeals, Skilled Worker sponsorship, judicial review. Fixed fees from £750. Direct solicitor access — no call centres. Firm #809071.",
          slug: "immigration-solicitors",
          author: { name: AUTHOR.name, sraUrl: AUTHOR.sraUrl },
          catalog: [
            { name: "Spouse / partner visa applications and extensions", description: "Appendix FM entry clearance, FLR(M) 30-month extensions, and indefinite leave after 5 years on the partner route." },
            { name: "Indefinite Leave to Remain (ILR / settlement)", description: "5-year and 10-year long-residence routes, refugee/HP settlement, EUSS Settled Status." },
            { name: "British citizenship by naturalisation", description: "Standard 5-year route, spouse-route 3-year, and discretion cases." },
            { name: "Visa refusal appeals and judicial review", description: "First-tier and Upper Tribunal appeals, Pre-Action Protocol letters, JR in the Administrative Court." },
            { name: "Skilled Worker sponsorship and ILR", description: "Switching, extension, 60-day grace period after sponsor revocation, and 5-year settlement." },
            { name: "Sponsor licence applications and compliance", description: "A-rating applications, governance reviews, and compliance audits." },
          ],
        })}
      />
      <JsonLd data={personSchema({ name: AUTHOR.name, jobTitle: AUTHOR.role, sraNumber: AUTHOR.sraNumber, sraUrl: AUTHOR.sraUrl, bio: AUTHOR.short, slug: AUTHOR.slug })} />
      <JsonLd data={faqPageSchema(FAQS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
          { name: "Immigration", url: "https://www.abrahamssolicitors.co.uk/immigration/" },
          { name: "Immigration Solicitors" },
        ])}
      />
      <JsonLd data={speakableSchema(["#hero-lead", ".speakable-faq-answer"])} />

      {/* ─── Breadcrumb ─── */}
      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/immigration/" className="hover:text-brand-red transition-colors">Immigration</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">Immigration Solicitors</span>
          </nav>
        </div>
      </section>

      {/* ─── Hero ─── */}
      <section className="relative bg-white border-b border-slate-100 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3 min-w-0">
              {/* Hero badge row — tightened gap-2 (was gap-3) so the
                  three pills fit on 2 rows max at 375px. Eyebrow label
                  hidden on phones (`hidden sm:inline`) since the H1
                  immediately below repeats the keyword. Mobile QA Tier 3. */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="hidden sm:inline text-xs font-bold text-brand-red uppercase tracking-widest">UK Immigration Solicitors</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="h-3 w-3" /> SRA-Regulated #809071
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> 4.9 / 5 &middot; 97 reviews
                </span>
              </div>

              {/* H1 — em-dash replaced with `: ` on mobile (was forcing
                  the phrase to wrap mid-statement). Desktop keeps the
                  typographic em-dash via the responsive span swap.
                  Mobile QA Tier 3. */}
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
                UK Immigration Solicitors<span className="sm:hidden">: </span><span className="hidden sm:inline"> &mdash; </span>direct access, no call centres.
              </h1>
              <p id="hero-lead" className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Speak to a <strong>named SRA-regulated solicitor</strong>{" "}
                on your first call &mdash; not a call handler, not a junior. Fixed fees agreed in
                writing before any work starts. Spouse visas, FLR(M), ILR, citizenship, refusal
                appeals and Skilled Worker sponsorship. Free 30-minute consultation.
              </p>

              {/* Primary CTAs — both w-full on mobile, side-by-side natural width on tablet+.
                  Em-dash replaced with colon to avoid mid-button line break at 375px.
                  Mobile QA 2026-06-03. */}
              {/* Phone label "Call now:" — text-sm + whitespace-nowrap +
                  tighter px-4 on mobile so the full number fits on one
                  line. Was wrapping to "0203 051" / "7760" at text-base
                  + uppercase + tracking. Mobile QA Tier 3 follow-up. */}
              <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
                <DynamicCallLink
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm sm:text-base font-bold uppercase sm:tracking-wide px-4 sm:px-7 h-14 whitespace-nowrap"
                  onClick={() => trackPhoneTap("hero")}
                >
                  <Phone className="h-5 w-5" />
                  Call now: <DynamicPhoneText />
                </DynamicCallLink>
                <Button asChild size="lg" className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-bold uppercase sm:tracking-wide px-6 h-14">
                  <a href="#consultation-form">Or request a callback</a>
                </Button>
              </div>

              {/* Trust strip — 2-col grid on mobile (was 4 one-per-line
                  items eating ~7rem vertical above the fold), inline-flex
                  with wrap on tablet+. Mobile QA Tier 3. */}
              <div className="mt-6 grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-semibold text-slate-600">
                <span className="inline-flex items-center gap-1.5"><Award className="h-4 w-4 text-brand-red shrink-0" /> SRA-regulated firm</span>
                <span className="inline-flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-brand-red shrink-0" /> Named solicitor</span>
                <span className="inline-flex items-center gap-1.5"><PoundSterling className="h-4 w-4 text-brand-red shrink-0" /> Fees from £750</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-brand-red shrink-0" /> 1-hour callback</span>
              </div>

              {/* Author byline */}
              <div className="mt-7 flex items-center gap-3 pt-5 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full bg-brand-navy text-white flex items-center justify-center font-black text-lg">IS</div>
                <div>
                  <p className="text-sm text-slate-700">
                    Practice led by{" "}
                    <Link href="/our-team/" className="font-semibold text-slate-900 hover:text-brand-red">{AUTHOR.name}</Link>
                    {" "}&mdash; {AUTHOR.role.toLowerCase()}.
                  </p>
                  <p className="text-xs text-slate-400">
                    SRA #{AUTHOR.sraNumber} &middot; Admitted {AUTHOR.admittedYear} &middot;{" "}
                    <a href={AUTHOR.sraUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-red underline-offset-2 hover:underline">
                      Verify on SRA register
                    </a>
                  </p>
                </div>
              </div>

              {/* Offices strip */}
              {/* Office strip — short form on mobile (city + postcode),
                  full street address on tablet+. Mobile QA Tier 3:
                  full strings were wrapping mid-address at 375px and
                  reading messy. */}
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-brand-red shrink-0" />
                  <span className="sm:hidden">London EC2V &middot; Bradford BD7</span>
                  <span className="hidden sm:inline">London &middot; Suite 10, Atlas House, 1 King Street, EC2V 8AU</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-brand-red shrink-0" /> Bradford &middot; Listerhills Science Park, BD7 1HR</span>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-2 min-w-0">
              <HeroForm />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Refusal-state entry strip ─── bolstered 2026-06-03 per
          Council Track C (Outsider advisor: refusal-state visitors are
          the highest-intent segment but H1 doesn't mirror their urgency
          — strip needs to do the job). Changes from prior version:
          - URGENT badge at top in deep rose for skimmability
          - Larger refusal headline (was sm/base → base/lg)
          - Specific deadline ranges spelt out: 14/28/5 days
          - Three secondary CTAs (Call / Refusal review form / Read FAQ)
            instead of one phone — gives the panic visitor multiple paths
          - Tighter copy on out-of-time consequence */}
      <section className="bg-rose-50 border-y-2 border-rose-300">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-6 lg:py-7">
          {/* Layout: stacked on mobile/tablet (text on top, full-width
              buttons below), side-by-side on lg+. The previous flex-wrap
              approach collapsed the text column to ~1-character-per-line
              on phones because shrink-0 on the right column ate the
              available width. Fixed 2026-06-03 from a mobile QA screen. */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
            <div className="flex items-start gap-3 min-w-0 lg:flex-1">
              <AlertTriangle className="h-7 w-7 text-rose-600 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest mb-2">
                  <AlertTriangle className="h-3 w-3" />
                  Time-sensitive
                </div>
                <p className="text-base sm:text-lg font-black text-rose-900 leading-snug">
                  Visa refused? Appeal deadlines: <span className="underline decoration-rose-400 decoration-2 underline-offset-2">14 days</span> in the UK, <span className="underline decoration-rose-400 decoration-2 underline-offset-2">28 days</span> overseas, <span className="underline decoration-rose-400 decoration-2 underline-offset-2">5 days</span> if detained.
                </p>
                <p className="mt-1.5 text-xs sm:text-sm text-rose-800 leading-snug">
                  Out-of-time appeals get harder by the day. If your deadline is within 7 days,
                  call now &mdash; we'll review your refusal letter free in the first 30 minutes.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 lg:shrink-0 w-full lg:w-auto">
              <DynamicCallLink
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-black uppercase tracking-wide px-5 h-11"
                onClick={() => trackPhoneTap("refusal-strip")}
              >
                <Phone className="h-4 w-4" />
                Call <DynamicPhoneText />
              </DynamicCallLink>
              <a
                href="#enquiry-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border-2 border-rose-300 hover:border-rose-600 text-rose-700 hover:text-rose-900 rounded-lg text-sm font-bold uppercase tracking-wide px-5 h-11 transition-colors"
              >
                Free refusal review
              </a>
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* ─── Reviews block ─── council mandate: above-fold-ish, before content */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">What clients say</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            4.9 out of 5 from 97 verified reviews
          </h2>
          <div className="mt-3 flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-500" />)}
            <span className="ml-2 text-xs text-slate-500 font-semibold">Google 5.0 &middot; ReviewSolicitors 5.0 (19) &middot; Skeepers 4.9 (97)</span>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />)}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{t.name}</p>
                  <p className="text-[11px] text-slate-500">{t.service}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-slate-400">Verified clients. Names abbreviated at client request. Past results do not guarantee future outcomes.</p>
        </div>
      </section>

      {/* ─── Fixed-fee table ─── council mandate: kill vague pricing */}
      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Fixed-fee pricing</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Quoted in writing before any work starts
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-3xl">
            We don&rsquo;t do open-ended hourly billing. Standard immigration matters are fixed-fee,
            agreed before instruction. Complex cases (previous refusals, gaps in leave, judicial
            review) are quoted individually after a free 30-minute scoping call. Interest-free
            payment plans available.
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-100/60">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Service</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Our fee</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700 hidden sm:table-cell">Plus government fees</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {FIXED_FEES.map((row) => (
                  <tr key={row.service}>
                    <td className="px-4 py-3 text-slate-900 font-medium">
                      {row.service}
                      {/* Plus-government-fees note rendered inline on
                          mobile (under the service name) because the
                          dedicated column is hidden via sm:table-cell.
                          Without this the "vague pricing" trap returns
                          for the 100% mobile paid traffic. Mobile QA
                          2026-06-03. */}
                      <span className="block sm:hidden mt-1 text-[11px] font-normal text-slate-500 leading-snug">{row.note}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-900 font-black whitespace-nowrap">{row.fee}<span className="ml-1 text-xs font-normal text-slate-500">+ VAT</span></td>
                    <td className="px-4 py-3 text-slate-500 text-xs hidden sm:table-cell">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-slate-500">Need a quote? Tell us your situation on the free 30-min call &mdash; you&rsquo;ll get the fixed fee in writing afterwards. <Link href="/our-fees/" className="text-brand-red hover:underline">See full fee schedule</Link>.</p>
        </div>
      </section>

      {/* ─── Why us ─── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Why us</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            SRA-regulated, named-solicitor practice
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              We are authorised and regulated by the Solicitors Regulation Authority &mdash; firm{" "}
              <strong>#809071</strong>. SRA regulation matters because it gives you real recourse
              if anything goes wrong: a statutory regulator, the Solicitors Disciplinary Tribunal
              as a backstop, and the SRA Compensation Fund. SRA-regulated solicitors are also
              authorised to act on Upper Tribunal and High Court applications, judicial review,
              and same-day removal challenges &mdash; capabilities OISC-regulated advisers don&rsquo;t
              have.
            </p>
            <p>
              <strong>Direct solicitor access.</strong> Every case is handled by a qualified
              solicitor, not routed to junior paralegals or call-centre staff. {AUTHOR.name} leads
              our immigration practice and is the named solicitor on every case file unless
              another team member is allocated with your explicit agreement.
            </p>
            <p>
              <strong>Honest reads, honestly priced.</strong> If your case is straightforward, we
              say so &mdash; you may not need us. If it&rsquo;s difficult, we tell you the realistic
              outcome before you commit. Every matter is fixed-fee in writing; we don&rsquo;t
              surprise-bill, we don&rsquo;t charge for routine calls, and we apply for legal aid on
              your behalf if you qualify (asylum and detention-lawfulness work).
            </p>
          </div>
        </div>
      </section>

      {/* ─── How it works — 3 steps ─── */}
      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Three steps from call to instruction
          </h2>
          <ol className="mt-6 space-y-4">
            {[
              { title: "Free 30-min scoping call", body: "You speak directly to a solicitor &mdash; same day if you call Mon–Fri 9am–6pm, otherwise we call back within one working hour. We identify the right route and flag any complications.", icon: Phone },
              { title: "Fixed-fee quote in writing", body: "Within 24 hours of the call we send a written fixed-fee quote covering the scope of work and a timeline. You decide whether to instruct &mdash; no obligation, no follow-up sales calls.", icon: PoundSterling },
              { title: "We handle the case end-to-end", body: "Once instructed we build the evidence bundle, draft the application, submit to UKVI or the Tribunal, and handle any further-information requests. You stay informed throughout; we don't disappear after instruction.", icon: Briefcase },
            ].map((s, i) => (
              <li key={s.title} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-brand-red text-white flex items-center justify-center font-black shrink-0">{i + 1}</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <s.icon className="h-4 w-4 text-brand-red" />
                    <p className="text-sm sm:text-base font-bold text-slate-900">{s.title}</p>
                  </div>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: s.body }} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Imran's bio ─── council mandate: above the fold but elevated again here */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Your solicitor</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            {AUTHOR.name} &mdash; {AUTHOR.role}
          </h2>
          <div className="mt-5 grid sm:grid-cols-5 gap-6 items-start">
            <div className="sm:col-span-1">
              <div className="w-24 h-24 rounded-full bg-brand-navy text-white flex items-center justify-center font-black text-2xl">
                {AUTHOR.name.split(" ").map((n) => n[0]).join("")}
              </div>
            </div>
            <div className="sm:col-span-4 space-y-3 text-sm text-slate-600 leading-relaxed">
              {AUTHOR.long.split("\n").filter(Boolean).map((para, i) => <p key={i}>{para}</p>)}
              <p className="text-xs text-slate-500">
                SRA #{AUTHOR.sraNumber} &middot; Admitted {AUTHOR.admittedYear} &middot;{" "}
                <a href={AUTHOR.sraUrl} target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline underline-offset-2">
                  Verify on SRA register
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
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

      {/* ─── Final CTA ─── */}
      {/* Final navy CTA — pb-20 lg:pb-0 prevents the lg:hidden sticky
          mobile call bar (~52px tall, position:fixed bottom-0) from
          overlapping the "Speak to a solicitor today" button + the
          footer copy. Mobile QA 2026-06-03. */}
      <section className="py-12 lg:py-16 bg-brand-navy pb-20 lg:pb-16">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3">Ready when you are</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
            Speak to a named immigration solicitor &mdash; free 30-min call.
          </h2>
          <p className="mt-3 text-base text-white/80 leading-relaxed">
            We&rsquo;ll listen, identify the route, and send a fixed-fee quote in writing within
            24 hours. No obligation. No follow-up sales calls.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-stretch justify-center gap-3">
            <DynamicCallLink
              className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-base font-bold uppercase tracking-wide h-14 px-7"
              onClick={() => trackPhoneTap("final-cta")}
            >
              <Phone className="h-5 w-5" />
              Call <DynamicPhoneText />
            </DynamicCallLink>
            <Button asChild size="lg" className="bg-white text-brand-navy hover:bg-slate-100 rounded-lg text-sm font-bold uppercase tracking-wide h-14 px-6">
              <a href="#consultation-form">Request a callback</a>
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
        aria-label="Call bar"
      >
        <DynamicCallLink
          className="flex items-center justify-center gap-2 w-full py-3.5 text-white font-bold uppercase tracking-wide text-sm"
          onClick={() => trackPhoneTap("sticky-mobile-bar")}
        >
          <Phone className="h-4 w-4" />
          Tap to Call &mdash; <DynamicPhoneText />
        </DynamicCallLink>
      </div>
    </>
  );
}
