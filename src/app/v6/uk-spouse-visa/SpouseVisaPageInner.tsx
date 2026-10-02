"use client";

/**
 * /uk-spouse-visa/ — INNER CLIENT COMPONENT.
 *
 * All interactive content (state, form, FAQ accordion, scroll handlers) lives
 * here. The route entry point page.tsx is a server component that exports
 * metadata and renders this. Don't import this directly from anywhere else —
 * it's the route's inner shell.
 *
 * See page.tsx for the route docs.
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck, CheckCircle2, ChevronRight, Phone, Clock,
  FileCheck2, Scale, BadgeCheck, Calendar, ExternalLink, ChevronDown,
  PoundSterling, AlertTriangle, Hourglass,
} from "lucide-react";
import { TrustBadges } from "@/components/v6/trust-badges";
import { TeamStrip } from "@/components/v6/team-strip";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import {
  JsonLd, faqPageSchema, breadcrumbSchema, personSchema, speakableSchema,
  legalServiceWithCatalogSchema,
} from "@/components/v6/jsonld";
import { team } from "@/lib/team";
import { pushFormSubmit } from "@/lib/tracking";
import { pushWizardEvent } from "@/lib/wizard-events";
import { useSpamGuard } from "@/lib/spam-client";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { GclidField, MsclkidField, UtmFields } from "@/components/v6/gclid-field";
import { submitEnquiry } from "@/lib/publishos";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/uk-spouse-visa/";
const LAST_REVIEWED = "May 2026";
const AUTHOR = team.find(t => t.slug === "imran-shah")!;

const WIZARD_SOURCE = "uk-spouse-visa-lp";

// ---------------------------------------------------------------------------
// Content — council-prescribed copy (hero, eligibility, pricing, SLA, FAQ)
// ---------------------------------------------------------------------------

const ELIGIBILITY_BULLETS = [
  "You're the British citizen or settled partner sponsoring an applicant",
  "Your gross annual income is at least £29,000 (or savings of £88,500+)",
  "You have evidence of a genuine, ongoing relationship",
];

const HOW_IT_WORKS = [
  {
    n: 1, title: "Free 15-min scoping call",
    body: "Speak directly to a qualified solicitor. We listen, ask the right questions, and identify any risks in your case before you commit a penny.",
  },
  {
    n: 2, title: "Fixed-scope quote in writing",
    body: "You get the total fee in writing, scope clearly defined, before any work begins. No hourly surprises.",
  },
  {
    n: 3, title: "Case & evidence preparation",
    body: "Your dedicated solicitor builds the case file — financial evidence, relationship documentation, supporting letters. Reviewed line by line for refusal-risk before submission.",
  },
  {
    n: 4, title: "Submission + decision support",
    body: "We submit to UKVI, track progress, and respond to any caseworker queries on your behalf. You stay informed throughout.",
  },
];

const TESTIMONIALS = [
  {
    names: "Sarah & Ahmed",
    challenge: "Self-employed sponsor — variable monthly income made the £29k threshold harder to evidence",
    solution: "We used 6-month income averaging plus rental income from a buy-to-let to clear the financial threshold",
    result: "Granted in 9 weeks despite an initial Home Office query",
    quote: "Other firms said it was impossible. Abrahams found a way.",
  },
  {
    names: "James & Priya",
    challenge: "First application refused for insufficient relationship evidence",
    solution: "Built a refused-application strategy with new evidence and a detailed relationship timeline",
    result: "Administrative review succeeded — visa granted without a tribunal hearing",
    quote: "Worth every penny. Direct contact with our solicitor made all the difference.",
  },
  {
    names: "Emma & Carlos",
    challenge: "Carlos's visa expiring in 6 weeks — needed an emergency switch to spouse route",
    solution: "Super Priority service application with a complete documentation pack prepared in 5 working days",
    result: "Granted in 4 weeks — gave them their wedding without an immigration cliff-edge",
    quote: "Stress-free process. They handled everything while we focused on the wedding.",
  },
];

// GOV.UK sources for the requirement sections below. Figures verified against
// these pages on 2 Oct 2026; the copy defers to GOV.UK rather than presenting
// any of them as settled, because the thresholds and waiting times move.
const GOV_APPENDIX_FM =
  "https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-fm-family-members";
const GOV_WAIT_TIMES =
  "https://www.gov.uk/guidance/visa-decision-waiting-times-applications-outside-the-uk";

const DOCUMENT_GROUPS = [
  {
    title: "Your relationship",
    detail: "Marriage or civil partnership certificate, evidence of how the relationship developed, messages and travel records, and cohabitation evidence where the route needs it.",
  },
  {
    title: "The money",
    detail: "Payslips and matching personal bank statements covering the period your category requires, an employer letter confirming the role and salary, your P60, tax returns and accounts if you\u2019re self-employed, and six months of statements for any savings relied on.",
  },
  {
    title: "Where you\u2019ll live",
    detail: "Tenancy agreement or mortgage statement, and a letter from the owner plus room details if you\u2019re staying with family.",
  },
  {
    title: "English language",
    detail: "An approved secure English language test at the level required for your stage, or evidence that you\u2019re exempt \u2014 a degree taught in English, for instance, or nationality of an exempt country. Check which level and which exemptions apply to your route on GOV.UK.",
  },
  {
    title: "Identity and health",
    detail: "Current and previous passports, and a tuberculosis certificate if you\u2019re applying from a listed country.",
  },
];

const REFUSAL_REASONS = [
  {
    title: "Financial evidence in the wrong format, or covering the wrong number of months",
    detail: "Appendix FM-SE is prescriptive, and a payslip set that doesn\u2019t line up with the bank statements behind it is a refusal waiting to happen.",
  },
  {
    title: "The relationship not being accepted as genuine and subsisting",
    detail: "Usually because the evidence is thin on the period the caseworker actually cares about, rather than thin overall.",
  },
  {
    title: "Missing or wrong-level English language evidence",
    detail: "Or a missing tuberculosis certificate where one was required.",
  },
  {
    title: "Accommodation and maintenance concerns",
    detail: "Particularly where the couple will be living with relatives.",
  },
  {
    title: "Suitability",
    detail: "Previous breaches of immigration law, deception in an earlier application, or criminality.",
  },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How much does a UK Spouse Visa solicitor cost in 2026?",
    answer:
      "Our fee for a standard spouse visa application is from £900 plus VAT. That's a fixed scope quoted in writing before any work begins, covering complete application preparation, document review, the supporting cover letter to UKVI, and direct solicitor access until decision. Complex cases (previous refusals, dependants, financial-requirement issues, sponsor self-employment with variable income) attract a higher fee — quoted in writing on the free 15-minute scoping call so there are no surprises. UKVI's own application fees and the Immigration Health Surcharge (currently around £1,846 each) are separate and paid directly to the Home Office.",
  },
  {
    question: "What income do I need to sponsor a spouse visa under the 2026 rules?",
    answer:
      "The minimum income requirement under Appendix FM is £29,000 gross per year for the UK-based sponsor (paragraph E-LTRP.3.1(a)), in force since 11 April 2024. Check the current figure on GOV.UK before you rely on it. If you don't meet it on salary alone, cash savings work on a formula rather than a flat number: £16,000 plus two and a half times the shortfall, normally held for at least 6 months — so £88,500 if the sponsor has no qualifying income, but £38,500 if the sponsor earns £20,000. Self-employment, pension and non-employment income such as rent or dividends also count. New applications carry no separate child uplift, but applications running on the pre-April-2024 basis keep the transitional threshold of £18,600 plus £3,800 for the first child and £2,400 for each additional child, capped at £29,000. See the worked examples in the financial requirement section above.",
  },
  {
    question: "How long does a UK Spouse Visa application take to be decided?",
    answer:
      "GOV.UK publishes a 12-week decision time for partner and spouse applications made from outside the UK; in-country extensions and switches are usually quicker. Priority and super priority services are available at extra cost on many routes and cut the wait substantially. Waiting times are published per route and they change, so check the current figure on GOV.UK before planning around it — and see the timelines section above. We give you a realistic range at the scoping call so you can plan around weddings, travel, or work commitments.",
  },
  {
    question: "What happens if my spouse visa is refused?",
    answer:
      "Refusals under Appendix FM usually come down to financial evidence in the wrong format, relationship evidence that is thin on the period the caseworker cares about, or missing documents — the refusals section above sets out the full list. A refusal of a partner application under Appendix FM is treated as a refusal of a human rights claim, which means it carries a right of appeal to the First-tier Tribunal (Immigration and Asylum Chamber) on Article 8 grounds under section 82 of the Nationality, Immigration and Asylum Act 2002. The deadline is 14 days from the date the decision was sent if you are inside the UK, and 28 days if you are outside it — but work to the date on your own refusal notice, not to this page. An appeal is not the only route: a fresh application addressing the refusal reasons is sometimes faster and cheaper, and judicial review exists where the decision was unlawful rather than simply wrong on the evidence. Our refusal-appeal work starts at £1,250 plus VAT, and we review the refusal letter free on the scoping call before quoting. We tell you straight either way.",
  },
  {
    question: "Do I need a solicitor for a UK Spouse Visa or can I apply myself?",
    answer:
      "You can apply yourself — UKVI's online forms are designed to be DIY-friendly. But spouse visa refusal rates are non-trivial: financial-requirement evidence and relationship-evidence presentation are the two single biggest refusal triggers, and they're both areas where a solicitor's review before submission pays for itself many times over. We're SRA-regulated (firm #809071), so you have professional indemnity insurance and a formal complaint route if anything goes wrong — protections you don't have on DIY applications. For straightforward cases with clear-cut income evidence, DIY is realistic. For self-employed sponsors, blended income, previous refusals, or any complication, the math usually favours using a solicitor.",
  },
  {
    question: "Can I sponsor my fiancé(e) or unmarried partner under this route?",
    answer:
      "Yes — Appendix FM also covers fiancé(e) visas (granted for 6 months to allow the couple to marry in the UK, then convert to a spouse visa), civil partner visas, and unmarried partner visas (for couples who have lived together in a relationship akin to marriage for at least 2 years before applying). Each variant has slightly different evidence requirements — fiancé(e)s need wedding-planning evidence; unmarried partners need cohabitation evidence covering the qualifying 2 years. Our fee structure is the same for all four routes (spouse, civil partner, fiancé(e), unmarried partner). Pick the right route on the scoping call so we set the case up correctly from day one.",
  },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function SpouseVisaPageInner() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
        { name: "Immigration", url: "https://www.abrahamssolicitors.co.uk/immigration/" },
        { name: "UK Spouse Visa Solicitors" },
      ])} />
      <JsonLd data={faqPageSchema(FAQS)} />
      <JsonLd data={legalServiceWithCatalogSchema({
        name: "UK Spouse Visa Solicitors",
        description: "Fixed-scope UK Spouse Visa applications under Appendix FM of the Immigration Rules. SRA-regulated solicitor-led applications covering spouse, fiancé(e), civil partner and unmarried partner routes. Free 15-minute scoping call. From £900 plus VAT. SRA-regulated firm #809071.",
        slug: "uk-spouse-visa",
        author: { name: AUTHOR.name, sraUrl: AUTHOR.sraUrl },
        catalog: [
          { name: "Spouse Visa legal representation", description: "Legal representation under Appendix FM for the spouse of a British citizen or settled person." },
          { name: "Fiancé(e) Visa legal representation", description: "6-month leave to enter for the fiancé(e) of a British citizen or settled person, to marry in the UK and switch into the spouse route." },
          { name: "Civil Partner Visa legal representation", description: "Legal representation under Appendix FM for the civil partner of a British citizen or settled person." },
          { name: "Unmarried Partner Visa legal representation", description: "Application for partners in a relationship akin to marriage who have lived together for at least 2 years before applying." },
          { name: "Spouse Visa extension (FLR-M)", description: "2.5-year extension applications under Appendix FM after the initial leave period." },
          { name: "Spouse Visa refusal — challenge or fresh application", description: "Administrative review, Pre-Action Protocol, or a strengthened fresh application following a refusal." },
        ],
      })} />
      <JsonLd data={personSchema({
        name: AUTHOR.name,
        jobTitle: AUTHOR.role,
        sraNumber: AUTHOR.sraNumber,
        sraUrl: AUTHOR.sraUrl,
        bio: AUTHOR.short,
        slug: AUTHOR.slug,
      })} />
      <JsonLd data={speakableSchema([
        "#hero-lead",
        "#pricing-summary",
        "#faq-answer-0",
        "#faq-answer-1",
        "#faq-answer-2",
        "#faq-answer-3",
        "#faq-answer-4",
        "#faq-answer-5",
      ])} />

      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/immigration/" className="hover:text-brand-red transition-colors">Immigration</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">UK Spouse Visa</span>
          </nav>
        </div>
      </section>

      {/* ── HERO with inline form (council-mandated structure) ────────── */}
      <Hero />

      <TrustBadges />

      {/* ── Pricing block — SRA-safe scoping language, no asterisk-trap ── */}
      <PricingBlock />

      {/* ── How it works ───────────────────────────────────────── */}
      <HowItWorks />

      {/* ── Requirements, checklist, timelines, refusals ────────── */}
      <Requirements />

      {/* ── Testimonials ─────────────────────────────────────── */}
      <Testimonials />

      <TeamStrip />

      {/* Contextual inlink to the Bradford city page — the spouse-visa cluster is
          our strongest ranking asset, so it is the most useful page to pass
          internal equity from. */}
      <section className="py-6 border-y border-slate-100 bg-slate-50/40">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <p className="text-sm text-slate-500 leading-relaxed">
            In West Yorkshire? We take spouse visa instructions in person at our Bradford office on Listerhills Science Park &mdash;{" "}
            <Link href="/immigration-solicitor-bradford/" className="text-brand-red font-semibold hover:underline">
              immigration solicitors in Bradford
            </Link>{" "}
            has the office details, the areas we cover and where Bradford appeals are heard.
          </p>
        </div>
      </section>

      {/* ── FAQ section with schema markup ──────────────────────────── */}
      <FaqSection openFaq={openFaq} setOpenFaq={setOpenFaq} />

      {/* ── Final CTA — phone-prominent, repeats form anchor ─────── */}
      <FinalCta />

      {/* ── Footer disclaimer ───────────────────────────────── */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-5 space-y-2">
          <p className="text-xs text-slate-400 text-center leading-relaxed">
            This page is general guidance, not legal advice. Each spouse visa application is decided on its own facts and the current version of the Immigration Rules. UKVI fees and the Immigration Health Surcharge change periodically — confirm current figures at gov.uk before applying. Past results don&rsquo;t guarantee future outcomes. Abrahams Solicitors · SRA-regulated firm #809071. Last reviewed: {LAST_REVIEWED} by {AUTHOR.name} (SRA #{AUTHOR.sraNumber}).
          </p>
          <p className="text-xs text-slate-400 text-center leading-relaxed flex items-center justify-center gap-1.5">
            <Calendar className="h-3 w-3" /> Page last reviewed: {LAST_REVIEWED}. URL: {PAGE_URL}.
          </p>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Hero (the council-prescribed core — H1, sub, eligibility, form, trust, SLA)
// ---------------------------------------------------------------------------

function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50/60 border-b border-slate-100">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-8 lg:py-14">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-start">
          {/* Left: H1, sub, eligibility, trust strip, SLA */}
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="h-3 w-3" />
              SRA-regulated firm #809071
            </span>

            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 leading-[1.05] tracking-tight">
              UK Spouse Visa Solicitors — Fixed-Scope Fees, Direct Solicitor Access
            </h1>
            <p id="hero-lead" className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              SRA-regulated immigration solicitors advising and representing spouse, fiancé, civil partner and unmarried partner clients under Appendix FM. <strong className="text-slate-900">From £900</strong> for standard cases, quoted in writing on a free 15-minute scoping call before you commit.
            </p>

            {/* Eligibility 3-bullet check */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
              <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-2">You likely qualify if:</p>
              <ul className="space-y-2">
                {ELIGIBILITY_BULLETS.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-slate-700 leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-slate-500">
                Unsure?{" "}
                <Link href="/visa-wizard/" className="font-semibold text-brand-red hover:underline underline-offset-2">
                  Use our 6-question eligibility checker →
                </Link>
              </p>
            </div>

            {/* Trust strip — promoted to hero per council */}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-slate-500" />
                SRA firm #809071
              </span>
              <span className="text-slate-300">·</span>
              <span>
                <Link href="/our-team/" className="font-semibold text-slate-900 hover:text-brand-red">{AUTHOR.name}</Link> (SRA #{AUTHOR.sraNumber})
              </span>
              <span className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-1 text-amber-600 font-semibold">
                ★★★★★ <span className="text-slate-600">5.0 Google · 97 reviews</span>
              </span>
            </div>

            {/* Phone CTA secondary */}
            <p className="mt-5 text-sm text-slate-500">
              Or call us direct on{" "}
              <DynamicCallLink className="font-bold text-brand-red hover:underline">
                <DynamicPhoneText />
              </DynamicCallLink>
              {" "}— Mon-Fri 9am-6pm.
            </p>
          </div>

          {/* Right: inline form ABOVE the fold on mobile (sticks below on lg) */}
          <div className="lg:sticky lg:top-6">
            <SpouseVisaInlineForm />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Inline form — the council's "tell us your situation, free, reply within 24h"
// ---------------------------------------------------------------------------

type Route = "spouse" | "fiance" | "civil-partner" | "unmarried-partner" | "not-sure";

function SpouseVisaInlineForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [route, setRoute] = useState<Route | "">("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const spam = useSpamGuard();
  const startedRef = useRef(false);

  // GTM telemetry — fire wizard_start once on first mount.
  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      pushWizardEvent("wizard_start", { source: WIZARD_SOURCE });
    }
  }, []);

  const valid = firstName && lastName && email && phone && route;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    pushFormSubmit({ email, phone });
    pushWizardEvent("wizard_result_shown", { source: WIZARD_SOURCE, route_id: route, route_name: route });
    const caseDetail = [
      `Route: ${route}`,
      notes && `Notes: ${notes}`,
    ].filter(Boolean).join("\n");
    await submitEnquiry({
      source: WIZARD_SOURCE,
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone,
      service: "[LP] UK Spouse Visa",
      case: caseDetail,
    }, spam.payload());
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border-2 border-emerald-200 shadow-xl p-5 sm:p-7">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Thanks {firstName.split(" ")[0]} — we&rsquo;ve got your details.</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              A qualified solicitor will reply within <strong className="text-slate-900">24 hours</strong> (Mon-Fri working hours). We&rsquo;ll arrange a free 15-minute scoping call to talk through your circumstances and quote the full fee in writing.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              In a rush? Call{" "}
              <DynamicCallLink className="font-bold text-brand-red hover:underline">
                <DynamicPhoneText />
              </DynamicCallLink>
              {" "}— Mon-Fri 9-6.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border-2 border-slate-200 shadow-xl p-5 sm:p-7"
    >
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
        Tell us your situation —{" "}
        <span className="text-brand-red">we&rsquo;ll reply within 24 hours</span>
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Free, no obligation. We listen first, then quote the full fee in writing if you want to proceed.
      </p>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="First name" value={firstName} onChange={setFirstName} autoComplete="given-name" />
        <Field label="Last name" value={lastName} onChange={setLastName} autoComplete="family-name" />
        <Field label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
        <Field label="Phone" type="tel" value={phone} onChange={setPhone} autoComplete="tel" />
      </div>

      <label className="block mt-3">
        <span className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Which visa route?</span>
        <select
          value={route}
          onChange={e => setRoute(e.target.value as Route | "")}
          className="w-full rounded-lg border-2 border-slate-200 bg-white px-3 py-2.5 text-sm sm:text-base text-slate-900 focus:border-brand-red focus:outline-none transition-colors"
        >
          <option value="">Choose one…</option>
          <option value="spouse">Spouse Visa</option>
          <option value="fiance">Fiancé(e) Visa</option>
          <option value="civil-partner">Civil Partner Visa</option>
          <option value="unmarried-partner">Unmarried Partner Visa</option>
          <option value="not-sure">Not sure yet</option>
        </select>
      </label>

      <label className="block mt-3">
        <span className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Anything we should know? <span className="text-slate-400 font-normal lowercase">(optional, 1-2 sentences)</span></span>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={2}
          className="w-full rounded-lg border-2 border-slate-200 bg-white px-3 py-2.5 text-sm sm:text-base text-slate-900 focus:border-brand-red focus:outline-none transition-colors"
          placeholder="e.g. previous refusal, self-employed sponsor, urgent timing…"
        />
      </label>

      <HoneypotInput value={spam.honeypot} onChange={spam.setHoneypot} />
      <GclidField />
      <MsclkidField />
      <UtmFields />

      <button
        type="submit"
        disabled={!valid || submitting}
        className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-brand-red text-white font-bold text-sm sm:text-base px-5 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-red-dark transition-colors"
      >
        {submitting ? "Sending…" : "Send my details — free 15-min scoping call"}
      </button>

      <p className="mt-3 text-xs text-slate-500 leading-relaxed flex items-start gap-1.5">
        <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
        We reply within 24 hours (Mon-Fri 9-6 BST). Submitted outside hours? You&rsquo;ll hear from us first thing the next working day.
      </p>
    </form>
  );
}

function Field({ label, value, onChange, type = "text", autoComplete }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">{label}</span>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        autoComplete={autoComplete}
        required
        className="w-full rounded-lg border-2 border-slate-200 bg-white px-3 py-2.5 text-sm sm:text-base text-slate-900 focus:border-brand-red focus:outline-none transition-colors"
      />
    </label>
  );
}

// ---------------------------------------------------------------------------
// Pricing block — council-prescribed SRA-safe language (no asterisk-trap)
// ---------------------------------------------------------------------------

function PricingBlock() {
  return (
    <section className="py-10 lg:py-14 bg-white">
      <div className="max-w-[920px] mx-auto px-6 lg:px-8">
        <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Fees</p>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
          Fixed-fee spouse visa legal representation — from <span className="text-brand-red">£900</span>
        </h2>
        <p id="pricing-summary" className="mt-4 text-base text-slate-600 leading-relaxed max-w-2xl">
          Fees vary by case complexity, number of dependants, and Home Office charges (Immigration Health Surcharge, biometric, application fees — paid separately to UKVI). Free 15-minute scoping call — we quote the full fee in writing before you commit.
        </p>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2 mb-2">
              <FileCheck2 className="h-5 w-5 text-slate-700" />
              <h3 className="text-base font-bold text-slate-900">Standard case — from £900</h3>
            </div>
            <ul className="space-y-1.5 text-sm text-slate-600">
              <li>Complete case preparation &amp; evidence review</li>
              <li>Financial + relationship evidence review</li>
              <li>Supporting cover letter to UKVI</li>
              <li>Direct solicitor access until decision</li>
            </ul>
          </div>
          <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="h-5 w-5 text-slate-700" />
              <h3 className="text-base font-bold text-slate-900">Complex case — quoted at scoping call</h3>
            </div>
            <ul className="space-y-1.5 text-sm text-slate-600">
              <li>Previous refusals or appeals</li>
              <li>Self-employed sponsor / variable income</li>
              <li>Financial-requirement difficulties</li>
              <li>Dependants or unusual circumstances</li>
            </ul>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 leading-relaxed">
          <p>
            <strong className="text-amber-900">UKVI government fees are separate.</strong> The Immigration Health Surcharge and the application fee are paid directly to the Home Office (typically around £1,846 each — confirm current rates at gov.uk before applying). We&rsquo;ll give you a written breakdown of the total cost at the scoping call, so there are no surprises.
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// How it works
// ---------------------------------------------------------------------------

function HowItWorks() {
  return (
    <section className="py-10 lg:py-14 bg-slate-50/40">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
        <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">How it works</p>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
          Four steps from first contact to decision
        </h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOW_IT_WORKS.map((s) => (
            <div key={s.n} className="rounded-xl bg-white border border-slate-200 p-5">
              <div className="w-9 h-9 rounded-full bg-brand-red text-white flex items-center justify-center font-black text-sm">{s.n}</div>
              <h3 className="mt-3 text-base font-bold text-slate-900 leading-snug">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Testimonials — specific spouse visa wins (council: outcomes not just praise)
// ---------------------------------------------------------------------------

function Testimonials() {
  return (
    <section className="py-10 lg:py-14 bg-white">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
        <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Spouse visa cases we&rsquo;ve handled</p>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
          Real cases with named outcomes
        </h2>
        <div className="mt-8 grid lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <article key={i} className="rounded-xl border-2 border-slate-100 bg-slate-50/50 p-5">
              <p className="text-sm font-bold text-slate-900">{t.names}</p>
              <p className="mt-2 text-xs font-bold text-slate-500 uppercase tracking-widest">Challenge</p>
              <p className="text-sm text-slate-600 leading-relaxed">{t.challenge}</p>
              <p className="mt-3 text-xs font-bold text-slate-500 uppercase tracking-widest">Solution</p>
              <p className="text-sm text-slate-600 leading-relaxed">{t.solution}</p>
              <p className="mt-3 text-xs font-bold text-emerald-600 uppercase tracking-widest">Result</p>
              <p className="text-sm font-semibold text-emerald-800 leading-relaxed">{t.result}</p>
              <blockquote className="mt-4 border-l-2 border-brand-red pl-3 italic text-sm text-slate-600">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs text-slate-400 leading-relaxed">
          Names and details anonymised for client confidentiality. Past results don&rsquo;t guarantee future outcomes — every spouse visa application is decided on its own facts and the current Immigration Rules.
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// FAQ section — uses faqPageSchema markup (added at page top)
// ---------------------------------------------------------------------------

/**
 * Requirements / checklist / timelines / refusals.
 *
 * These four topics were previously only inside collapsed FAQ accordions.
 * Promoted to body prose per the council review (2 Oct 2026) so the page
 * carries the substance a prospective client is actually searching for, with
 * the FAQ entries kept as condensed signposts rather than duplicates.
 */
function Requirements() {
  return (
    <section className="py-10 lg:py-14 bg-white">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8 space-y-12">

        {/* ── Financial requirement ── */}
        <div>
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">The financial requirement</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            What You Actually Have to Prove
          </h2>
          <div className="mt-5 grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                This is where most spouse visa applications are won or lost. The sponsor must show a gross annual income of at least <strong className="text-slate-900">&pound;29,000</strong>, under paragraph E-LTRP.3.1(a) of{" "}
                <a href={GOV_APPENDIX_FM} target="_blank" rel="noopener noreferrer" className="text-brand-red font-semibold hover:underline">
                  Appendix FM
                </a>. That figure replaced the old &pound;18,600 threshold on 11 April 2024. Check the current figure on GOV.UK before you rely on it &mdash; the thresholds have moved twice in recent years.
              </p>
              <p>Two things about that rule are routinely misunderstood, and both cost people their applications.</p>
              <p>
                First, cash savings aren&rsquo;t a flat number. The rule is a formula: &pound;16,000, plus two and a half times the shortfall between your income and the threshold. If the sponsor has no qualifying income at all, that works out at &pound;88,500. But if the sponsor earns &pound;20,000, the shortfall is &pound;9,000 &mdash; so the savings needed are &pound;16,000 plus &pound;22,500, which is <strong className="text-slate-900">&pound;38,500, not &pound;88,500</strong>. Savings normally have to be held for at least six months and be under your control.
              </p>
              <p>
                Second, if your application runs on the pre-April-2024 basis, the transitional threshold is &pound;18,600 plus &pound;3,800 for the first child and &pound;2,400 for each additional child &mdash; capped at &pound;29,000. New applications no longer carry a child uplift, but the transitional route hasn&rsquo;t disappeared. We regularly see couples talked out of applying because someone told them it had.
              </p>
              <p>
                Income can come from salaried or non-salaried employment, self-employment, pension income, non-employment income such as rent or dividends, cash savings, or a combination. Each route has its own specified evidence under Appendix FM-SE, and that&rsquo;s the part that catches people out: the evidence rules are mandatory, not advisory. The right figure proved the wrong way still gets refused.
              </p>
            </div>
            <aside className="bg-slate-50 border border-slate-200 rounded-2xl p-5 h-fit">
              <div className="flex items-center gap-2">
                <PoundSterling className="h-4 w-4 text-brand-red" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Savings, worked</p>
              </div>
              <dl className="mt-4 space-y-3 text-sm">
                {[
                  { k: "Sponsor income", v: "£0", s: "£88,500 savings" },
                  { k: "Sponsor income", v: "£20,000", s: "£38,500 savings" },
                  { k: "Sponsor income", v: "£29,000", s: "No savings needed" },
                ].map(row => (
                  <div key={row.v} className="flex items-baseline justify-between gap-3 border-b border-slate-200 pb-2 last:border-0">
                    <dt className="text-slate-500">{row.k} <strong className="text-slate-900">{row.v}</strong></dt>
                    <dd className="text-brand-red font-bold text-right shrink-0">{row.s}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                &pound;16,000 + 2.5 &times; the shortfall. Illustrative only &mdash; check the current threshold and evidence rules on GOV.UK, and the figure for your own case at the scoping call.
              </p>
            </aside>
          </div>
        </div>

        {/* ── Document checklist ── */}
        <div>
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Evidence</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            What You Need to Send: The Document Checklist
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-3xl">
            Every case differs, but a partner application is built from five groups of evidence.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOCUMENT_GROUPS.map(g => (
              <div key={g.title} className="rounded-xl border border-slate-200 p-5">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-brand-red shrink-0" />
                  <h3 className="text-sm font-bold text-slate-900">{g.title}</h3>
                </div>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{g.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-base text-slate-600 leading-relaxed max-w-3xl">
            We send you a checklist built for your specific category rather than a generic list, then review every document before anything is submitted.
          </p>
        </div>

        {/* ── Timelines ── */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Timelines</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              How Long It Takes
            </h2>
            <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                GOV.UK currently publishes a <strong className="text-slate-900">12-week</strong> decision time for partner and spouse applications made from outside the UK. In-country extensions and switches are usually quicker. Priority and super priority services are available at extra cost on many routes and cut the wait substantially.
              </p>
              <p>
                Treat all of that as a planning assumption, not a promise. Waiting times are{" "}
                <a href={GOV_WAIT_TIMES} target="_blank" rel="noopener noreferrer" className="text-brand-red font-semibold hover:underline">
                  published per route on GOV.UK
                </a>{" "}
                and they change &mdash; check the current figure before booking a wedding, a flight or handing in a notice period around them. We give you a realistic range at the scoping call and tell you when a priority service is worth paying for and when it isn&rsquo;t.
              </p>
            </div>
          </div>
          <aside className="bg-brand-navy text-white rounded-2xl p-5 h-fit">
            <div className="flex items-center gap-2">
              <Hourglass className="h-4 w-4 text-white/70" />
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Published standard</p>
            </div>
            <p className="mt-3 text-4xl font-black leading-none">12 <span className="text-lg font-bold">weeks</span></p>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Partner or spouse, applied for outside the UK. Per GOV.UK at the date of our last review &mdash; confirm the current figure before planning around it.
            </p>
          </aside>
        </div>

        {/* ── Refusal reasons ── */}
        <div>
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Refusals</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Why Spouse Visa Applications Get Refused
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-3xl">
            In our experience, refusals come down to a short list. And almost all of it is evidential rather than substantive.
          </p>
          <ul className="mt-6 space-y-3">
            {REFUSAL_REASONS.map(r => (
              <li key={r.title} className="flex items-start gap-3 rounded-xl border border-slate-200 p-4">
                <AlertTriangle className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{r.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mt-1">{r.detail}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl border-2 border-brand-red/20 bg-brand-red/5 p-5">
            <p className="text-base text-slate-700 leading-relaxed">
              If you&rsquo;ve already been refused, read the refusal notice before you do anything else. The clock is already running.
            </p>
            <p className="mt-3 text-base text-slate-700 leading-relaxed">
              A refusal of a partner application under Appendix FM is treated as a refusal of a human rights claim &mdash; which means it carries a right of appeal to the First-tier Tribunal (Immigration and Asylum Chamber) on Article 8 grounds under{" "}
              <a href="https://www.legislation.gov.uk/ukpga/2002/41/section/82" target="_blank" rel="noopener noreferrer" className="text-brand-red font-semibold hover:underline">
                section 82 of the Nationality, Immigration and Asylum Act 2002
              </a>. The deadline is <strong>14 days</strong> from the date the decision was sent if you&rsquo;re inside the UK, and <strong>28 days</strong> if you&rsquo;re outside it. Your refusal notice states the exact deadline that applies to your case &mdash; work to that date, not to this page.
            </p>
            <p className="mt-3 text-base text-slate-700 leading-relaxed">
              An appeal isn&rsquo;t the only option. A fresh application that directly addresses the reasons for refusal is sometimes faster and cheaper, and judicial review is available where the decision was unlawful rather than simply wrong on the evidence. We review the notice free on the scoping call and tell you which route actually fits your situation &mdash; because going down the wrong one burns the deadline on the right one.
            </p>
            <Link href="/visa-refusal-appeal/" className="inline-flex items-center gap-1.5 mt-3 text-sm font-bold text-brand-red hover:underline">
              More on visa refusals and appeals <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* ── Cluster interlinks: the sibling partner routes ── */}
        <div className="border-t border-slate-100 pt-8">
          <p className="text-sm font-bold text-slate-900">Not married, or not married yet?</p>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-3xl">
            Appendix FM covers four partner routes, and the evidence differs between them. Pick the right one before you apply:
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link href="/uk-fiance-visa/" className="text-brand-red font-semibold hover:underline">Fianc&eacute;(e) visa &rarr;</Link>
            <Link href="/uk-unmarried-partner-visa/" className="text-brand-red font-semibold hover:underline">Unmarried partner visa &rarr;</Link>
            <Link href="/civil-partnership-visa/" className="text-brand-red font-semibold hover:underline">Civil partnership visa &rarr;</Link>
            <Link href="/uk-partner-visa-extension/" className="text-brand-red font-semibold hover:underline">Partner visa extension &rarr;</Link>
            <Link href="/uk-spouse-visa-solicitors/" className="text-brand-red font-semibold hover:underline">Full requirements guide &rarr;</Link>
          </div>
        </div>

      </div>
    </section>
  );
}

function FaqSection({ openFaq, setOpenFaq }: {
  openFaq: number | null;
  setOpenFaq: (n: number | null) => void;
}) {
  return (
    <section className="py-10 lg:py-14 bg-slate-50/40">
      <div className="max-w-[920px] mx-auto px-6 lg:px-8">
        <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Common questions</p>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
          UK Spouse Visa FAQs
        </h2>
        <div className="mt-6 divide-y divide-slate-200 rounded-xl border-2 border-slate-200 bg-white overflow-hidden">
          {FAQS.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={i}>
                <h3 className="m-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="w-full flex items-start justify-between gap-4 text-left px-5 sm:px-6 py-4 text-sm sm:text-base font-bold text-slate-900 leading-snug hover:bg-slate-50 transition-colors"
                  >
                    <span>{f.question}</span>
                    <ChevronDown className={`h-5 w-5 text-slate-400 shrink-0 mt-0.5 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                </h3>
                {/* GEO: answer stays in the server-rendered DOM always (collapsed
                    via CSS grid) so AI crawlers can read and cite it. */}
                <div className={`grid transition-[grid-template-rows] duration-200 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div id={`faq-answer-${i}`} className="px-5 sm:px-6 pb-5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      {f.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Final CTA — phone-prominent, repeats form anchor
// ---------------------------------------------------------------------------

function FinalCta() {
  return (
    <section className="py-10 lg:py-14 bg-gradient-to-br from-brand-navy to-slate-900 text-white">
      <div className="max-w-[920px] mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
          Ready to talk to a qualified spouse visa solicitor?
        </h2>
        <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
          Free 15-minute scoping call. We listen first, then quote the full fee in writing if you want to proceed.
        </p>
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#top"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg px-7 h-12 text-sm font-bold uppercase tracking-wide transition-colors w-full sm:w-auto"
          >
            Send my details
            <ChevronRight className="h-4 w-4" />
          </a>
          <DynamicCallLink className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-7 h-12 text-sm font-bold uppercase tracking-wide transition-colors w-full sm:w-auto">
            <Phone className="h-4 w-4" />
            <DynamicPhoneText />
          </DynamicCallLink>
        </div>
        <p className="mt-6 text-xs text-white/60 inline-flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-brand-gold" />
          SRA-regulated firm #809071 · Reviewed by {AUTHOR.name} (SRA #{AUTHOR.sraNumber}) · Last reviewed {LAST_REVIEWED}
        </p>
      </div>
    </section>
  );
}
