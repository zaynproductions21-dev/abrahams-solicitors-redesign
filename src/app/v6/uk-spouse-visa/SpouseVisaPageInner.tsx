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
import { GclidField, MsclkidField } from "@/components/v6/gclid-field";
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
    n: 3, title: "Application prep",
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

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How much does a UK Spouse Visa solicitor cost in 2026?",
    answer:
      "Our fee for a standard spouse visa application is from £900 plus VAT. That's a fixed scope quoted in writing before any work begins, covering complete application preparation, document review, the supporting cover letter to UKVI, and direct solicitor access until decision. Complex cases (previous refusals, dependants, financial-requirement issues, sponsor self-employment with variable income) attract a higher fee — quoted in writing on the free 15-minute scoping call so there are no surprises. UKVI's own application fees and the Immigration Health Surcharge (currently around £1,846 each) are separate and paid directly to the Home Office.",
  },
  {
    question: "What income do I need to sponsor a spouse visa under the 2026 rules?",
    answer:
      "The minimum income requirement under Appendix FM is currently £29,000 gross per year for the UK-based sponsor, with no separate child uplift since the April 2024 change. If you don't meet the income figure on salary alone, you can rely on cash savings (the threshold is £88,500 held for 6 months), self-employment income, pension income, or non-employment income from rental properties or investments. The evidence requirements are strict — payslips, P60s, employment confirmation letters, bank statements covering the relevant period. Missing the right format or the right number of months is one of the most common refusal reasons.",
  },
  {
    question: "How long does a UK Spouse Visa application take to be decided?",
    answer:
      "UKVI's published service standard for out-of-country spouse visa applications is around 12 weeks; in-country applications (extensions and switches) are usually decided in around 8 weeks. Priority service decisions come within 5 working days, and Super Priority service decisions within 1 working day — both attract an additional UKVI fee on top of the standard application fee. Processing times vary by visa application centre and case complexity. We give you a realistic timeline at the scoping call so you can plan around weddings, travel, or work commitments.",
  },
  {
    question: "What happens if my spouse visa is refused?",
    answer:
      "Visa refusals under Appendix FM usually result from one of: insufficient financial evidence, weak relationship evidence, or document errors. Most spouse visa refusals don't carry a right of appeal — but they can be challenged via Administrative Review (a paper-based UKVI re-decision), a fresh application addressing the refusal reasons, or a Pre-Action Protocol letter and Judicial Review if the refusal is unlawful. Our refusal-appeal work starts at £1,250 plus VAT. We do a free review of the refusal letter on the scoping call before quoting — sometimes a fresh application is the better path, sometimes the refusal itself is challengeable. We tell you straight either way.",
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
          { name: "Spouse Visa application", description: "Initial application under Appendix FM for the spouse of a British citizen or settled person." },
          { name: "Fiancé(e) Visa application", description: "6-month leave to enter for the fiancé(e) of a British citizen or settled person, to marry in the UK and switch into the spouse route." },
          { name: "Civil Partner Visa application", description: "Application under Appendix FM for the civil partner of a British citizen or settled person." },
          { name: "Unmarried Partner Visa application", description: "Application for partners in a relationship akin to marriage who have lived together for at least 2 years before applying." },
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

      {/* ── Testimonials ─────────────────────────────────────── */}
      <Testimonials />

      <TeamStrip />

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
              SRA-regulated immigration specialists handling spouse, fiancé, civil partner and unmarried partner visa applications. <strong className="text-slate-900">From £900</strong> for standard cases, quoted in writing on a free 15-minute scoping call before you commit.
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
          From <span className="text-brand-red">£900</span> for standard spouse visa applications
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
              <li>Complete application preparation</li>
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
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                  className="w-full flex items-start justify-between gap-4 text-left px-5 sm:px-6 py-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">{f.question}</span>
                  <ChevronDown className={`h-5 w-5 text-slate-400 shrink-0 mt-0.5 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open && (
                  <div id={`faq-answer-${i}`} className="px-5 sm:px-6 pb-5 -mt-1 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                    {f.answer}
                  </div>
                )}
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
