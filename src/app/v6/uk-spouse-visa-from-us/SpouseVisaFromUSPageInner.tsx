"use client";

/**
 * /uk-spouse-visa-from-us/ — INNER CLIENT COMPONENT.
 *
 * Sister to /uk-spouse-visa/ SpouseVisaPageInner. Same structural pattern
 * with US-specific copy and council-prescribed fixes (see page.tsx docs).
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck, CheckCircle2, ChevronRight, Phone, Clock,
  FileCheck2, Scale, BadgeCheck, Calendar, ChevronDown, Plane,
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

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/uk-spouse-visa-from-us/";
const LAST_REVIEWED = "May 2026";
const AUTHOR = team.find(t => t.slug === "imran-shah")!;

const WIZARD_SOURCE = "uk-spouse-visa-from-us-lp";

const ELIGIBILITY_BULLETS = [
  "You're a US citizen or US-resident partner of a British citizen or settled person",
  "Sponsor's gross annual income is at least £29,000 (≈$36,000 USD) — OR savings of £88,500+ (≈$112,000)",
  "You're married, civil-partnered, or planning to marry within 6 months",
];

const HOW_IT_WORKS_US = [
  {
    n: 1, title: "Free 15-min scoping call (EST or PST friendly)",
    body: "Book a Zoom or phone call in your time zone. We listen, ask the right questions about your US circumstances, and identify refusal risks before you commit a penny.",
  },
  {
    n: 2, title: "Fixed-scope quote in writing",
    body: "Total fee in writing, scope clearly defined, before any work begins. We bill in GBP via secure international transfer; we accept US-issued cards on request.",
  },
  {
    n: 3, title: "Application prep — from your home in the US",
    body: "Your dedicated UK solicitor builds the case file remotely: sponsor's financial evidence, your US-side relationship documentation, supporting letters. We share everything via a secure US-accessible portal.",
  },
  {
    n: 4, title: "Biometrics + UKVI submission + travel",
    body: "You attend biometrics at one of ~21 US Visa Application Centres (Houston, NYC, LA, Chicago, DC etc). UKVI decides in 3-12 weeks (5 days with Super Priority). We respond to caseworker queries on your behalf. You travel to the UK once approved.",
  },
];

/**
 * US-origin spouse visa SCENARIOS — not testimonials. Council blocker #2
 * removed the "Sarah from NYC" style fake testimonials. These are case-type
 * descriptions, no fictional names, no fictional outcomes claimed.
 */
const US_SCENARIOS = [
  {
    label: "Self-employed US sponsor",
    challenge: "US-based sponsor with US LLC income, no W-2 — UKVI's £29K rule is built around UK employment evidence formats.",
    approach: "We translate US 1099 / Schedule C income into the evidence UKVI accepts (12-month accounts, business bank statements, accountant's letter). Quote in writing before commitment.",
  },
  {
    label: "Sponsor in the UK, applicant in the US",
    challenge: "Most common pattern — British/UK-settled partner already in the UK, US applicant applying for entry clearance from the US.",
    approach: "Sponsor's UK financial evidence (payslips, P60, employment letter) plus your US-side relationship documentation. We build the case from both sides in parallel.",
  },
  {
    label: "Fiancé(e) route — wedding in the UK",
    challenge: "Coming to the UK to marry, then switching to spouse visa from inside the UK. Different evidence pack (wedding-planning evidence) than spouse visa.",
    approach: "Fiancé visa secures 6 months to enter and marry; spouse switch from inside the UK after the ceremony. We sequence both applications correctly.",
  },
];

const FAQS_US: { question: string; answer: string }[] = [
  {
    question: "I'm in the US — how does the UK spouse visa application work from here?",
    answer:
      "You apply online from your home in the US via UKVI's (UK Visas and Immigration — the UK government's visa department) online portal. After paying the fee, you book a biometrics appointment at a US Visa Application Centre — there are about 21 across the US including Houston, NYC, LA, Chicago, DC, Atlanta and Boston. UKVI then takes 3-12 weeks to decide (or 5 working days on Super Priority service). Once approved, you receive a vignette in your passport and can travel to the UK. You don't need to leave the US or visit the UK during the application itself.",
  },
  {
    question: "What's the income or savings minimum I need to qualify for the UK spouse visa?",
    answer:
      "The UK Visas and Immigration income threshold is £29,000 gross per year (≈$36,000 USD at typical exchange rates). The sponsoring partner needs to meet this — if your UK-settled partner earns the £29,000, you qualify on income alone. If not, you can rely on cash savings of £88,500 or more (≈$112,000 USD) held for at least 6 months by either of you. Other paths exist: pension income, rental income, US-side self-employment translated into UKVI's accepted evidence formats. The £29,000 rule is what UKVI requires — we tell you whether the income evidence you have meets it. We're not US-side tax or income advisors and can't comment on US tax classification.",
  },
  {
    question: "How much does this cost in total — your fee plus government fees?",
    answer:
      "Our fee for a standard spouse or fiancé visa is from £900 plus VAT (~$1,150 USD) — fixed scope, quoted in writing on the free scoping call. UK government fees are separate and paid directly to UKVI: the application fee is currently around £1,846 (~$2,350 USD), and the Immigration Health Surcharge is £1,035/year × the visa length (a 33-month spouse visa = £2,846, a 5-year fiancé→spouse pathway can exceed £5,000). All amounts confirmed at gov.uk before you commit. We give you the total written breakdown at the scoping call so there are no surprises.",
  },
  {
    question: "Why is your fee £900 when US immigration lawyers charge $3,000-5,000?",
    answer:
      "Two reasons. First, UK regulated solicitor fees are price-competitive — SRA (Solicitors Regulation Authority — the UK equivalent of US state bar associations) regulations require upfront fee transparency, and the UK legal market is structurally more competitive than the US one. Second, our £900 is for a standard-scope spouse visa where the income evidence is clean and there are no refusal-risk complications. Complex cases (self-employed sponsor, blended income, previous refusal, fiancé+switch pathway, dependants) attract a higher quoted fee. The £900 isn't a discount — it's the actual market rate for an SRA-regulated UK solicitor handling a clean spouse visa case.",
  },
  {
    question: "Can I keep my US job while waiting for the UK visa decision?",
    answer:
      "Yes. The UKVI decision happens entirely while you remain in the US. You don't need to quit your US job, give up your US lease, or travel anywhere during the 3-12 week decision window. Once the visa is granted you receive a 30-day vignette in your passport allowing you to enter the UK; you then collect your full Biometric Residence Permit in the UK. Many of our US clients plan their move date around the decision so they can give US employers proper notice. We'll talk you through the timeline at the scoping call.",
  },
  {
    question: "Where in the US can I do my biometrics appointment?",
    answer:
      "UKVI uses VFS Global (its US service partner) for biometric collection. There are about 21 US Visa Application Centres including: New York, Los Angeles, San Francisco, Chicago, Houston, Atlanta, Washington DC, Boston, Miami, Seattle, Detroit, Philadelphia, Phoenix, Charlotte and Las Vegas. Most major US cities are within driving distance of a centre. Appointments typically open 2-6 weeks ahead — we'll flag this on the scoping call so you book early. You can pay extra for a Premium Lounge appointment if the standard slots are full.",
  },
  {
    question: "Do I need to be married already, or can I come to the UK to marry first?",
    answer:
      "Either works. If you're already married or in a civil partnership, you apply for a spouse visa directly (33 months initial leave, switches to ILR — Indefinite Leave to Remain, the UK's permanent residence status — after 5 years). If you want to marry in the UK first, you apply for a fiancé(e) visa (6 months entry to marry, then switch to spouse visa from inside the UK). Unmarried partner visas exist too if you've lived together for 2+ years before applying. The right route depends on your timing and circumstances — we identify which one fits at the scoping call.",
  },
  {
    question: "I hold a US green card or other US visa — does that affect my UK spouse visa?",
    answer:
      "No — your US immigration status doesn't affect your UK application directly. UKVI assesses the UK rules (relationship, income, accommodation, English language) independently of your US status. That said, your US tax filing position may affect what income evidence is easiest to present (US W-2 employees often have cleaner evidence than self-employed 1099 contractors). We're not US tax or immigration advisors — if your US situation is complex, you may want to consult a US-side professional alongside us. Our job is making sure the UK visa application is built correctly on UKVI's evidence rules.",
  },
];

export default function SpouseVisaFromUSPageInner() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
        { name: "Immigration", url: "https://www.abrahamssolicitors.co.uk/immigration/" },
        { name: "UK Spouse Visa for Americans" },
      ])} />
      <JsonLd data={faqPageSchema(FAQS_US)} />
      <JsonLd data={legalServiceWithCatalogSchema({
        name: "UK Spouse Visa Solicitors for Americans",
        description: "UK Spouse and Fiancé visa applications under Appendix FM of the UK Immigration Rules — for US-resident applicants. SRA-regulated UK solicitors handling the application remotely from the US. Free 15-minute scoping call. From £900 plus VAT. SRA-regulated firm #809071.",
        slug: "uk-spouse-visa-from-us",
        author: { name: AUTHOR.name, sraUrl: AUTHOR.sraUrl },
        catalog: [
          { name: "UK Spouse Visa application — applying from the US", description: "Initial entry-clearance application under Appendix FM for a US-resident partner of a British citizen or UK-settled person." },
          { name: "UK Fiancé(e) Visa application — applying from the US", description: "6-month entry clearance for a US-resident fiancé(e) of a British citizen or UK-settled person, to marry in the UK and switch into the spouse route." },
          { name: "UK Unmarried Partner Visa application — applying from the US", description: "Application for US-resident partners in a relationship akin to marriage who have lived together for at least 2 years before applying." },
          { name: "Spouse Visa refusal — challenge or fresh application", description: "Administrative review or strengthened fresh application following a UKVI refusal for US-resident applicants." },
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
        "#why-900-anchor",
        "#faq-answer-0",
        "#faq-answer-1",
        "#faq-answer-2",
      ])} />

      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/immigration/" className="hover:text-brand-red transition-colors">Immigration</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/uk-spouse-visa/" className="hover:text-brand-red transition-colors">UK Spouse Visa</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">For Americans</span>
          </nav>
        </div>
      </section>

      <Hero />
      <TrustBadges />
      <ProcessExplainer />
      <PricingBlock />
      <Why900Anchor />
      <USScenarios />
      <TeamStrip />
      <FaqSection openFaq={openFaq} setOpenFaq={setOpenFaq} />
      <FinalCta />

      <section className="bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-5 space-y-2">
          <p className="text-xs text-slate-400 text-center leading-relaxed">
            This page is general guidance for US-resident applicants, not legal advice. Each UK spouse visa application is decided on its own facts and the current UK Immigration Rules. UK government fees and the Immigration Health Surcharge change periodically — confirm current figures at gov.uk before applying. We are not US-side immigration, tax or legal advisors. Past results don&rsquo;t guarantee future outcomes. Abrahams Solicitors · SRA-regulated firm #809071. Last reviewed: {LAST_REVIEWED} by {AUTHOR.name} (SRA #{AUTHOR.sraNumber}).
          </p>
          <p className="text-xs text-slate-400 text-center leading-relaxed flex items-center justify-center gap-1.5">
            <Calendar className="h-3 w-3" /> Page last reviewed: {LAST_REVIEWED}. URL: {PAGE_URL}.
          </p>
        </div>
      </section>
    </>
  );
}

function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50/60 border-b border-slate-100">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-8 lg:py-14">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-start">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="h-3 w-3" />
              SRA-regulated UK firm #809071 — for US-resident applicants
            </span>

            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 leading-[1.05] tracking-tight">
              UK Spouse Visa for Americans — Move to the UK on a Partner Visa
            </h1>
            <p id="hero-lead" className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              SRA-regulated (the UK&rsquo;s Solicitors Regulation Authority — equivalent to US state bar associations) UK immigration specialists handling spouse and fiancé(e) visa applications for US-resident applicants. <strong className="text-slate-900">From £900 (~$1,150)</strong> for standard cases, quoted in writing on a free 15-minute scoping call before you commit.
            </p>

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
                Don&rsquo;t qualify yet?{" "}
                <Link href="#hero-form" className="font-semibold text-brand-red hover:underline underline-offset-2">
                  Send us your situation — we&rsquo;ll tell you what would qualify →
                </Link>
              </p>
            </div>

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

            <p className="mt-5 text-sm text-slate-500">
              UK office hours overlap with EST 4-6am and PST 1-3am — book a Zoom slot in your time zone below, or call{" "}
              <DynamicCallLink className="font-bold text-brand-red hover:underline">
                <DynamicPhoneText />
              </DynamicCallLink>
              {" "}between 9am-1pm EST / 6am-10am PST for live UK morning hours.
            </p>
          </div>

          <div id="hero-form" className="lg:sticky lg:top-6">
            <SpouseVisaFromUSInlineForm />
          </div>
        </div>
      </div>
    </section>
  );
}

type Route = "spouse" | "fiance" | "unmarried-partner" | "not-sure";

function SpouseVisaFromUSInlineForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [route, setRoute] = useState<Route | "">("");
  const [usState, setUsState] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const spam = useSpamGuard();
  const startedRef = useRef(false);

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
      usState && `US State: ${usState}`,
      notes && `Notes: ${notes}`,
    ].filter(Boolean).join("\n");
    await submitEnquiry({
      source: WIZARD_SOURCE,
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone,
      service: "[LP] UK Spouse Visa from US",
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
              A UK-qualified solicitor will reply within <strong className="text-slate-900">24 hours</strong> (UK working hours — 9am-6pm BST / 4am-1pm EST / 1am-10am PST). We&rsquo;ll arrange a Zoom or phone call at a US-friendly time and quote the full fee in writing.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              In a rush? Call{" "}
              <DynamicCallLink className="font-bold text-brand-red hover:underline">
                <DynamicPhoneText />
              </DynamicCallLink>
              {" "}9am-1pm EST / 6am-10am PST.
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
        <Field label="Phone (+1)" type="tel" value={phone} onChange={setPhone} autoComplete="tel" placeholder="+1 555 123 4567" />
      </div>

      <label className="block mt-3">
        <span className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Which visa route?</span>
        <select
          value={route}
          onChange={e => setRoute(e.target.value as Route | "")}
          className="w-full rounded-lg border-2 border-slate-200 bg-white px-3 py-2.5 text-sm sm:text-base text-slate-900 focus:border-brand-red focus:outline-none transition-colors"
        >
          <option value="">Choose one…</option>
          <option value="spouse">Spouse Visa (already married)</option>
          <option value="fiance">Fiancé(e) Visa (marrying in the UK)</option>
          <option value="unmarried-partner">Unmarried Partner Visa (2+ years together)</option>
          <option value="not-sure">Not sure yet</option>
        </select>
      </label>

      <label className="block mt-3">
        <span className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">US State <span className="text-slate-400 font-normal lowercase">(optional)</span></span>
        <input
          type="text"
          value={usState}
          onChange={e => setUsState(e.target.value)}
          placeholder="e.g. Texas, New York, California"
          className="w-full rounded-lg border-2 border-slate-200 bg-white px-3 py-2.5 text-sm sm:text-base text-slate-900 focus:border-brand-red focus:outline-none transition-colors"
        />
      </label>

      <label className="block mt-3">
        <span className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Anything we should know? <span className="text-slate-400 font-normal lowercase">(optional, 1-2 sentences)</span></span>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={2}
          className="w-full rounded-lg border-2 border-slate-200 bg-white px-3 py-2.5 text-sm sm:text-base text-slate-900 focus:border-brand-red focus:outline-none transition-colors"
          placeholder="e.g. partner is British in London, we plan to marry next year…"
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
        We reply within 24 hours (UK working hours). If you submit outside UK hours, you&rsquo;ll hear from us first thing the next UK working day — roughly 4am-9am EST / 1am-6am PST.
      </p>
    </form>
  );
}

function Field({ label, value, onChange, type = "text", autoComplete, placeholder }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">{label}</span>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        className="w-full rounded-lg border-2 border-slate-200 bg-white px-3 py-2.5 text-sm sm:text-base text-slate-900 focus:border-brand-red focus:outline-none transition-colors"
      />
    </label>
  );
}

function ProcessExplainer() {
  return (
    <section className="py-10 lg:py-14 bg-slate-50/40">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
        <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">How it works from the US</p>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
          From application to UK — step by step
        </h2>
        <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
          You stay in the US for the entire application process. No need to fly to the UK to apply, no need to leave your US job before the visa is approved.
        </p>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOW_IT_WORKS_US.map((s) => (
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

function PricingBlock() {
  return (
    <section className="py-10 lg:py-14 bg-white">
      <div className="max-w-[920px] mx-auto px-6 lg:px-8">
        <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Fees</p>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
          From <span className="text-brand-red">~$1,150 (£900)</span> for standard spouse visa applications
        </h2>
        <p id="pricing-summary" className="mt-4 text-base text-slate-600 leading-relaxed max-w-2xl">
          Our fee is in pounds sterling (£900 plus VAT). USD equivalents shown at typical exchange rates and confirmed at the scoping call. UK government fees and the Immigration Health Surcharge are separate and paid directly to UKVI.
        </p>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2 mb-2">
              <FileCheck2 className="h-5 w-5 text-slate-700" />
              <h3 className="text-base font-bold text-slate-900">Standard case — from £900 (~$1,150)</h3>
            </div>
            <ul className="space-y-1.5 text-sm text-slate-600">
              <li>Complete UK application preparation</li>
              <li>Financial + relationship evidence review</li>
              <li>Supporting cover letter to UKVI</li>
              <li>Direct UK solicitor access until decision</li>
            </ul>
          </div>
          <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="h-5 w-5 text-slate-700" />
              <h3 className="text-base font-bold text-slate-900">Complex case — quoted at scoping call</h3>
            </div>
            <ul className="space-y-1.5 text-sm text-slate-600">
              <li>Self-employed US sponsor / 1099 income</li>
              <li>Previous UK or US visa refusals</li>
              <li>Blended income across jurisdictions</li>
              <li>Dependants or fiancé→spouse switch sequencing</li>
            </ul>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 leading-relaxed">
          <p className="font-bold mb-1.5 text-amber-900">UK government fees you&rsquo;ll pay UKVI separately:</p>
          <ul className="space-y-1 text-amber-900">
            <li>· UKVI application fee: ~£1,846 (≈$2,350 USD)</li>
            <li>· Immigration Health Surcharge: £1,035/year × visa length — a 33-month spouse visa = <strong>£2,846 (≈$3,610)</strong>; the 5-year fiancé→spouse pathway can exceed £5,000 (≈$6,350)</li>
            <li>· Biometric appointment fee at US Visa Application Centre: typically $0-150 depending on Premium upgrade</li>
          </ul>
          <p className="mt-2">All confirmed at gov.uk before you commit. Total written breakdown on the scoping call.</p>
        </div>
      </div>
    </section>
  );
}

function Why900Anchor() {
  return (
    <section className="py-10 lg:py-14 bg-slate-50/40">
      <div className="max-w-[820px] mx-auto px-6 lg:px-8">
        <p id="why-900-anchor" className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Why so much less than US lawyers?</p>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
          Why £900 — and not $4,000 like a US immigration attorney?
        </h2>
        <div className="mt-5 space-y-4 text-base text-slate-700 leading-relaxed">
          <p>
            US immigration attorneys handling family-based green card cases typically charge <strong>$3,000-$5,000</strong> for a comparable case. Our standard UK spouse visa fee is <strong>£900 (~$1,150)</strong>. The gap isn&rsquo;t about quality — it&rsquo;s about market structure.
          </p>
          <p>
            UK regulated solicitor fees are price-competitive by design. <strong>The SRA</strong> (the UK&rsquo;s Solicitors Regulation Authority — equivalent to US state bar associations) <strong>requires upfront fee transparency</strong> — we have to tell you the total fee in writing before any work begins. That keeps the market honest. The UK legal market also has more competition between firms than the US one, which keeps prices down.
          </p>
          <p>
            Our £900 is the market rate for a standard-scope UK spouse visa — not a discount, not a loss leader. We can charge this because UK overheads are different, UK legal fees are regulated, and we&rsquo;ve invested in the case-prep workflow to make it efficient. Complex cases (self-employed sponsor, blended income, previous refusal) attract a higher quoted fee — but the headline £900 reflects the genuine standard-case price.
          </p>
        </div>
      </div>
    </section>
  );
}

function USScenarios() {
  return (
    <section className="py-10 lg:py-14 bg-white">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
        <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">US-to-UK spouse visa scenarios we handle</p>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
          Common situations for US-resident applicants
        </h2>
        <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
          Every US-to-UK partner visa case has its own quirks — US tax filing position, sponsor location, marital status timing, employment type. Below are the patterns we see most often.
        </p>
        <div className="mt-8 grid lg:grid-cols-3 gap-5">
          {US_SCENARIOS.map((s, i) => (
            <article key={i} className="rounded-xl border-2 border-slate-100 bg-slate-50/50 p-5">
              <p className="text-sm font-bold text-slate-900">{s.label}</p>
              <p className="mt-3 text-xs font-bold text-slate-500 uppercase tracking-widest">Common challenge</p>
              <p className="text-sm text-slate-600 leading-relaxed">{s.challenge}</p>
              <p className="mt-3 text-xs font-bold text-emerald-600 uppercase tracking-widest">Our approach</p>
              <p className="text-sm font-semibold text-emerald-800 leading-relaxed">{s.approach}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs text-slate-400 leading-relaxed">
          These are case-type descriptions, not specific client testimonials. We&rsquo;re building our US client review pool — if you become a client, we&rsquo;ll ask for a review with your permission. Past results don&rsquo;t guarantee future outcomes.
        </p>
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
        <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Common questions from US applicants</p>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
          UK Spouse Visa from the US — FAQs
        </h2>
        <div className="mt-6 divide-y divide-slate-200 rounded-xl border-2 border-slate-200 bg-white overflow-hidden">
          {FAQS_US.map((f, i) => {
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

function FinalCta() {
  return (
    <section className="py-10 lg:py-14 bg-gradient-to-br from-brand-navy to-slate-900 text-white">
      <div className="max-w-[920px] mx-auto px-6 lg:px-8 text-center">
        <Plane className="h-10 w-10 text-brand-gold mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
          Ready to talk to a UK-qualified spouse visa solicitor?
        </h2>
        <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
          Free 15-minute scoping call by Zoom or phone in your US time zone. We listen first, then quote the full fee in writing if you want to proceed. Live UK office overlap: 9am-1pm EST / 6am-10am PST.
        </p>
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#hero-form"
            onClick={(e) => { e.preventDefault(); document.querySelector("#hero-form")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
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
          SRA-regulated UK firm #809071 · Reviewed by {AUTHOR.name} (SRA #{AUTHOR.sraNumber}) · Last reviewed {LAST_REVIEWED}
        </p>
      </div>
    </section>
  );
}
