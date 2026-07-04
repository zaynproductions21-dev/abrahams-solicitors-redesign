"use client";

/**
 * Adequate maintenance calculator — client component.
 *
 * Calculation:
 *   available_weekly_income = max(0, weekly_net_income − weekly_housing_costs)
 *   threshold = income_support_rate(family_composition)  (April 2025 baseline)
 *   verdict =
 *     "pass"     if available ≥ threshold + £10 buffer
 *     "marginal" if available within £10 of threshold (either side)
 *     "fail"     if available < threshold − £10
 *     "solicitor" if any input flagged "not sure"
 *
 * The three-state verdict beats the binary pass/fail you see elsewhere
 * (e.g. Connaught Law) because marginal cases are exactly where solicitor
 * scrutiny adds the most value — you don't want to tell a panicked family
 * "you pass" when they're a fiver above the line and a single bill change
 * tips the case under.
 *
 * Source-of-truth note: Income Support rates are uprated by the Treasury
 * each April. The baseline figures used here are the April 2025 rates.
 * When the April 2026 uprating comes through, edit the IS_RATES table
 * below and bump the LAST_REVIEWED constant.
 *
 * VERIFY at build/refresh time:
 *   - Income Support rates (gov.uk → Income Support → benefit rates)
 *   - Qualifying benefit list (Appendix FM section E-ECP.3.3 / paragraph
 *     6A — last refreshed 2024/2025)
 */

import Link from "next/link";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { TrustBadges } from "@/components/v6/trust-badges";
import { TeamStrip } from "@/components/v6/team-strip";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { GclidField, MsclkidField, UtmFields } from "@/components/v6/gclid-field";
import { useSpamGuard } from "@/lib/spam-client";
import { pushFormSubmit } from "@/lib/tracking";
import { submitEnquiry } from "@/lib/publishos";
import {
  JsonLd, faqPageSchema, breadcrumbSchema, speakableSchema, personSchema,
  legalServiceWithCatalogSchema,
} from "@/components/v6/jsonld";
import { team } from "@/lib/team";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import {
  Phone, ChevronRight, ChevronDown, ShieldCheck, CheckCircle2, AlertCircle,
  Calculator, AlertTriangle, Sparkles, Calendar, Info, Scale, ArrowRight,
} from "lucide-react";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/adequate-maintenance-calculator/";
const LAST_REVIEWED = "June 2026";
const RATES_AS_OF = "April 2026";
const AUTHOR = team.find((t) => t.slug === "humaira-anjum")!;

// ─── Calculator data ────────────────────────────────────────────────────
//
// Income Support rates verified against the DWP "Benefit and pension rates
// 2026 to 2027" publication (last updated 16 February 2026, effective from
// 6 April 2026). Verified by Claude on 1 June 2026 from gov.uk.
//
// Composite thresholds below = personal allowance (single OR couple) + the
// dependent-child personal allowance (£87.88) per child. The Family Premium
// has been abolished for new Income Support claims since 30 April 2016, so
// it isn't added.
//
// IMPORTANT — IS is now closed to new claimants under UC migration, but the
// published IS rates remain the legal benchmark for the adequate-maintenance
// test because the case-law (KA Pakistan, AM Ethiopia) was anchored to IS
// before UC existed. The Home Office continues to apply IS rates for this
// test even where the sponsor would in practice be on UC.
//
// Next review: April 2027 uprating order (typically published November 2026,
// effective 6 April 2027).

const IS_PERSONAL_ALLOWANCE_SINGLE_25_PLUS = 95.55;
const IS_PERSONAL_ALLOWANCE_SINGLE_UNDER_25 = 75.65;
const IS_PERSONAL_ALLOWANCE_COUPLE = 150.15;
const IS_CHILD_AMOUNT = 87.88;

type FamilyKey =
  | "single-25-plus"
  | "single-18-24"
  | "couple"
  | "couple-1-child"
  | "couple-2-children"
  | "couple-3-children"
  | "couple-4-children";

const IS_RATES: Record<FamilyKey, { label: string; weekly: number }> = {
  "single-25-plus": {
    label: "Single applicant, 25 or over",
    weekly: IS_PERSONAL_ALLOWANCE_SINGLE_25_PLUS,
  },
  "single-18-24": {
    label: "Single applicant, 18 to 24",
    weekly: IS_PERSONAL_ALLOWANCE_SINGLE_UNDER_25,
  },
  couple: {
    label: "Couple (no children)",
    weekly: IS_PERSONAL_ALLOWANCE_COUPLE,
  },
  "couple-1-child": {
    label: "Couple + 1 child",
    weekly: IS_PERSONAL_ALLOWANCE_COUPLE + IS_CHILD_AMOUNT,
  },
  "couple-2-children": {
    label: "Couple + 2 children",
    weekly: IS_PERSONAL_ALLOWANCE_COUPLE + 2 * IS_CHILD_AMOUNT,
  },
  "couple-3-children": {
    label: "Couple + 3 children",
    weekly: IS_PERSONAL_ALLOWANCE_COUPLE + 3 * IS_CHILD_AMOUNT,
  },
  "couple-4-children": {
    // Shortened 2026-06-03 from "Couple + 4 children (+£87.88 each
    // beyond)". The parenthetical was overflowing iOS Safari's <option>
    // truncation (~30 chars) and the quick-reference list on 375px.
    // The per-child amount is documented in the body content above so
    // it's not lost. Mobile QA.
    label: "Couple + 4 children",
    weekly: IS_PERSONAL_ALLOWANCE_COUPLE + 4 * IS_CHILD_AMOUNT,
  },
};

const QUALIFYING_BENEFITS = [
  "Personal Independence Payment (PIP)",
  "Disability Living Allowance (DLA)",
  "Attendance Allowance",
  "Carer's Allowance (paid to the sponsor for caring for a disabled person who themselves receives a qualifying benefit)",
  "Armed Forces Independence Payment (AFIP)",
  "War Disablement Pension",
  "Armed Forces Compensation Scheme — Guaranteed Income Payment",
  "Severe Disablement Allowance",
  "Industrial Injuries Disablement Benefit paid with Constant Attendance Allowance",
  "Constant Attendance Allowance (standalone, under the War Pensions Scheme)",
  "Mobility Supplement (War Pensions Scheme)",
];

const FAQS = [
  {
    question: "What is the adequate maintenance test in UK immigration?",
    answer:
      "Adequate maintenance is the financial test that replaces the £29,000 minimum income requirement when the UK sponsor receives certain qualifying benefits — PIP, DLA, Carer's Allowance, Attendance Allowance, AFIP, or a War Disablement Pension. Instead of meeting an income threshold, the household must show that net weekly income after housing costs is at least equal to the level of Income Support the family would receive if eligible. The legal authority comes from KA (Pakistan) [2006] and AM (Ethiopia) [2008], applied through Appendix FM of the Immigration Rules.",
  },
  {
    question: "Who can use the adequate maintenance route instead of the £29,000 requirement?",
    answer:
      "The exemption only applies if the UK sponsor (the British or settled partner) receives at least one of these benefits at the date of application: Personal Independence Payment (PIP), Disability Living Allowance (DLA), Attendance Allowance, Carer's Allowance, Armed Forces Independence Payment, or a War Disablement Pension. The applicant does not need to be receiving the benefit — only the sponsor. If neither partner receives a qualifying benefit, the £29,000 minimum income requirement (or £88,500 in savings) applies and this calculator does not apply.",
  },
  {
    question: "What counts as housing costs in this calculation?",
    answer:
      "Deductible housing costs are the unavoidable, recurring weekly costs of keeping a roof over your head. This includes rent or mortgage repayments, council tax, ground rent and service charges, mandatory buildings and contents insurance, and essential utilities (gas, electricity, water). It does not include luxuries (broadband-as-entertainment, TV packages, gym subscriptions), non-essential subscriptions, or any cost that exceeds a reasonable accommodation standard. The Home Office reviews housing costs for reasonableness against local market rents.",
  },
  {
    question: "What if I'm a few pounds above or below the threshold?",
    answer:
      "If you're within about £10/week of the Income Support level either side, the case sits in the marginal zone. Caseworkers look at this much more carefully — a single bill change can flip the result, and many marginal cases are refused even though the maths technically passes. Take legal advice before submitting a marginal case. We can advise on third-party support arrangements, additional qualifying benefits the sponsor may be entitled to but not yet claiming, and how to evidence stability over the 30-month visa period.",
  },
  {
    question: "Can I use savings to top up if my weekly income is short?",
    answer:
      "Yes — savings can supplement income for the adequate maintenance test, but the rules are stricter than the £29,000 + £88,500 savings route. Savings must be held for at least six months in the name of the sponsor, applicant, or jointly, and must be liquid (not pension funds, property, or shares). A common approach is to argue that drawdown of savings over the visa period would bridge any weekly shortfall. This is a fact-sensitive argument; we'd want to see the savings position and the family budget before advising whether the case stacks up.",
  },
  {
    question: "How long does this exemption last?",
    answer:
      "The adequate maintenance route is available for each application — entry clearance, the FLR(M) extension, and the ILR application — but only if the sponsor still receives a qualifying benefit on the date of each application. If the sponsor's benefit ends between applications (recovery, reassessment, or PIP downgrade), the next application has to meet the standard £29,000 income / £88,500 savings test instead. Plan your renewal timeline with this in mind — losing the benefit mid-cycle has caught a lot of families out.",
  },
];

// ─── UI helpers ────────────────────────────────────────────────────────

function moneyGbp(n: number): string {
  return n.toLocaleString("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function VerdictCard({
  verdict,
  available,
  threshold,
  family,
}: {
  verdict: "pass" | "marginal" | "fail" | "solicitor";
  available: number;
  threshold: number;
  family: FamilyKey;
}) {
  const margin = available - threshold;

  if (verdict === "solicitor") {
    return (
      <div className="rounded-2xl border-2 border-slate-300 bg-slate-50 p-5 sm:p-6">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-widest">
          <AlertCircle className="h-4 w-4" /> Solicitor consultation needed
        </div>
        <h3 className="mt-3 text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          We can&rsquo;t safely return a verdict from a calculator.
        </h3>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          One or more of your answers is &ldquo;not sure&rdquo;. The adequate maintenance test
          turns on detail that the wrong input would misroute &mdash; book a free 15-minute call
          with a named solicitor and we&rsquo;ll walk through it together.
        </p>
      </div>
    );
  }

  const verdictMap = {
    pass: {
      ring: "border-emerald-300 bg-emerald-50",
      badge: "bg-emerald-100 text-emerald-800",
      badgeText: "Arithmetic pass — evidence assessment still needed",
      title: "The maths suggests you meet the test.",
      body: `Available weekly income after housing costs is ${moneyGbp(margin)} above the Income Support level for your household. That's a positive signal — but adequate maintenance also turns on the durability of the sponsor's benefit award (PIP reassessment dates can fall inside the visa cycle), accommodation adequacy under the Housing Health and Safety Rating System (room count and suitability, not just cost), and the strength of the relationship evidence. The maths is one part of the case, not the whole case.`,
    },
    marginal: {
      ring: "border-amber-300 bg-amber-50",
      badge: "bg-amber-100 text-amber-800",
      badgeText: "Borderline — solicitor review essential",
      title: "Your figures sit within £5 either side of the line.",
      body: `Available weekly income is ${moneyGbp(margin)} ${margin >= 0 ? "above" : "below"} the threshold. Borderline cases are exactly where caseworkers refuse and exactly where good evidence wins. A single bill change can flip the result. Most refusals we see in this zone are recoverable with a stronger evidence pack and a slightly different budgeting argument. Book a 15-minute call before you submit — this is not a case to file unrepresented.`,
    },
    fail: {
      ring: "border-rose-300 bg-rose-50",
      badge: "bg-rose-100 text-rose-800",
      badgeText: "Arithmetic shortfall — but routes exist",
      title: "The maths falls short — but the case may still be winnable.",
      body: `Available weekly income is ${moneyGbp(Math.abs(margin))} below the Income Support level on the figures you entered. That doesn't end the case. Third-party support (a credit-worthy family member or friend who undertakes to maintain the household), additional qualifying benefits the sponsor may be entitled to but not yet claiming, accommodation cost reductions, or savings drawdown can each bridge the gap. These arguments are fact-sensitive — a free 15-minute call is the right next step.`,
    },
  } as const;
  const v = verdictMap[verdict];

  return (
    <div className={`rounded-2xl border-2 ${v.ring} p-5 sm:p-6`}>
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${v.badge}`}>
        <Calculator className="h-3.5 w-3.5" /> {v.badgeText}
      </div>
      <h3 className="mt-3 text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{v.title}</h3>
      <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">{v.body}</p>

      {/* Verdict stat cards — stacked on phones, side-by-side on
          tablet+. grid-cols-2 at 375px gave each card ~155px which
          cramped the Threshold sub-label (family composition).
          Mobile QA Tier 3. */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-white border border-slate-200 p-3">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Available weekly</p>
          <p className="text-lg font-black text-slate-900">{moneyGbp(available)}</p>
        </div>
        <div className="rounded-lg bg-white border border-slate-200 p-3">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Threshold</p>
          <p className="text-lg font-black text-slate-900">{moneyGbp(threshold)}</p>
          <p className="text-[10px] text-slate-400 mt-1 leading-tight">{IS_RATES[family].label}</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-white/60 border border-current/10 p-3 text-xs text-slate-600 leading-relaxed flex items-start gap-2">
        <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-slate-400" />
        <span>
          Indicative only. Not legal advice. Income Support rates current as of {RATES_AS_OF}. Home
          Office decisions also consider the durability of income, accommodation adequacy, and
          long-term maintenance sustainability over the 30-month visa period.
        </span>
      </div>
    </div>
  );
}

// ─── Lead-capture form ─────────────────────────────────────────────────

function ConsultationForm({ verdict }: { verdict: "pass" | "marginal" | "fail" | "solicitor" | null }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const spam = useSpamGuard();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !email || !phone) return;
    setSubmitting(true);
    pushFormSubmit({ email, phone });
    // Verdict is NOT included in `source` — that field is processed by the
    // CRM as a campaign tag and would persist legal-status-flavoured data
    // (DPA Article 9 concern flagged by the council). Verdict is captured
    // in the `case` field which sits under "Original message" in SalesHub.
    await submitEnquiry(
      {
        source: "adequate-maintenance-calculator-lp",
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone,
        service: "[LP] Adequate Maintenance Calculator",
        case: `Visitor used the adequate-maintenance calculator and wants a 15-min scoping call to confirm. Calculator self-assessment outcome: ${verdict ?? "(not captured)"}.`,
      },
      spam.payload(),
    );
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border-2 border-emerald-200 p-6 sm:p-7 text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-xl font-black text-slate-900 tracking-tight">
          Thanks {firstName.split(" ")[0]}.
        </h3>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          We&rsquo;ve received your request. {AUTHOR.name} or a member of the team will call you back
          within one working hour (Mon&ndash;Fri). Weekend submissions land Monday morning.
        </p>
        <p className="mt-3 text-xs text-slate-400">
          If your case is urgent, call <DynamicPhoneText /> now.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-brand-red" />
        <p className="text-xs font-bold text-brand-red uppercase tracking-widest">Free 15-min scoping call</p>
      </div>
      <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
        Get your figures confirmed by a solicitor.
      </h3>
      <p className="mt-2 text-xs text-slate-500 leading-relaxed">
        Reviewed by {AUTHOR.name} (SRA #{AUTHOR.sraNumber}). No obligation.
      </p>
      <form onSubmit={onSubmit} className="mt-4 space-y-2">
        <HoneypotInput value={spam.honeypot} onChange={spam.setHoneypot} />
        <GclidField />
        <MsclkidField />
        <UtmFields />
        <div className="grid grid-cols-2 gap-2">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            required
            className="px-3 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red"
          />
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            className="px-3 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red"
          />
        </div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          required
          className="w-full px-3 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
          placeholder="Phone"
          required
          className="w-full px-3 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red"
        />
        <Button
          type="submit"
          disabled={!firstName || !email || !phone || submitting}
          className="w-full bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-wide disabled:opacity-40"
        >
          {submitting ? "Sending..." : "Get a Free 15-Min Scoping Call"}
        </Button>
        <p className="text-xs text-slate-400 leading-snug">
          Or call <DynamicPhoneText /> — Mon&ndash;Fri 9am&ndash;6pm.
        </p>
      </form>
    </div>
  );
}

// ─── FAQ accordion ─────────────────────────────────────────────────────

function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {FAQS.map((q, i) => (
        <div key={q.question} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-slate-50/60"
          >
            <span className="text-sm sm:text-base font-bold text-slate-900">{q.question}</span>
            <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${openIdx === i ? "rotate-180" : ""}`} />
          </button>
          {openIdx === i && (
            <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed speakable-faq-answer">{q.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────

export default function AdequateMaintenanceCalculatorPageInner() {
  const [sponsorBenefit, setSponsorBenefit] = useState<"yes" | "no" | "not-sure" | "">("");
  const [family, setFamily] = useState<FamilyKey | "">("");
  const [incomeMode, setIncomeMode] = useState<"monthly" | "weekly">("monthly");
  const [housingMode, setHousingMode] = useState<"monthly" | "weekly">("monthly");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [housingAmount, setHousingAmount] = useState("");
  const [calculated, setCalculated] = useState(false);

  // Wizard state — show one step at a time to eliminate vertical scroll.
  // currentStep advances on user action; previous steps collapse to a
  // one-line summary with a "change" affordance. showAll bypasses the
  // wizard for users who want to see every question at once.
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [showAll, setShowAll] = useState(false);

  // 52 / 12 = 4.333… weeks per month. Multiply monthly by 12/52 to get
  // weekly equivalent; weekly stays weekly. This is the HM Treasury /
  // DWP convention for benefit-rate conversion.
  const monthlyToWeekly = (n: number) => n * (12 / 52);

  const calc = useMemo(() => {
    const rawIncome = parseFloat(incomeAmount) || 0;
    const rawHousing = parseFloat(housingAmount) || 0;
    const incomeWeekly = incomeMode === "monthly" ? monthlyToWeekly(rawIncome) : rawIncome;
    const housingWeekly = housingMode === "monthly" ? monthlyToWeekly(rawHousing) : rawHousing;
    const available = Math.max(0, incomeWeekly - housingWeekly);
    const threshold = family ? IS_RATES[family].weekly : 0;
    return { income: incomeWeekly, housing: housingWeekly, available, threshold };
  }, [incomeAmount, housingAmount, incomeMode, housingMode, family]);

  // Marginal buffer reduced from £10 to £5 after council review
  // (1 June 2026). £10 against a £114.85 threshold was 8.7% — that's a
  // meaningful shortfall, not "marginal". £5 (~4%) is closer to a true
  // rounding zone but still flags borderline cases for solicitor review.
  const MARGINAL_BUFFER = 5;

  const verdict: "pass" | "marginal" | "fail" | "solicitor" | null = useMemo(() => {
    if (!calculated) return null;
    if (sponsorBenefit === "not-sure" || !family) return "solicitor";
    const margin = calc.available - calc.threshold;
    if (margin >= MARGINAL_BUFFER) return "pass";
    if (margin >= -MARGINAL_BUFFER) return "marginal";
    return "fail";
  }, [calculated, sponsorBenefit, family, calc.available, calc.threshold]);

  const canCalc =
    sponsorBenefit === "yes" &&
    !!family &&
    !!incomeAmount &&
    !!housingAmount &&
    parseFloat(incomeAmount) > 0;

  return (
    <>
      {/* ─── Schema ─── */}
      <JsonLd
        data={legalServiceWithCatalogSchema({
          name: "Adequate Maintenance Calculator — UK Spouse Visa",
          description:
            "Calculator and explainer for the UK adequate maintenance test under Appendix FM. Alternative to the £29,000 minimum income requirement for sponsors who receive qualifying disability benefits or war pensions. SRA-regulated firm #809071.",
          slug: "adequate-maintenance-calculator",
          author: { name: AUTHOR.name, sraUrl: AUTHOR.sraUrl },
          catalog: [
            { name: "Spouse / partner visa under adequate maintenance route", description: "Entry clearance and FLR(M) extensions where the UK sponsor receives PIP, DLA, Carer's Allowance or other qualifying benefit." },
            { name: "Adult Dependent Relative applications", description: "Cases turning on the adequate maintenance test rather than the standard financial requirement." },
            { name: "Third-party support arguments", description: "Where weekly income falls short and a credit-worthy third party undertakes to support the household." },
            { name: "Marginal-case strategy", description: "Where figures sit within £10 of the threshold either side — evidence strategy and budgeting arguments." },
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
          { name: "Adequate Maintenance Calculator" },
        ])}
      />
      <JsonLd data={speakableSchema(["#hero-lead", "#what-is-am", ".speakable-faq-answer"])} />

      {/* ─── Breadcrumb ─── */}
      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/immigration/" className="hover:text-brand-red transition-colors">Immigration</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">Adequate Maintenance Calculator</span>
          </nav>
        </div>
      </section>

      {/* ─── Hero ─── */}
      <section className="relative bg-white border-b border-slate-100 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Left */}
            <div className="lg:col-span-3 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-bold text-brand-red uppercase tracking-widest">Spouse Visa — Financial Requirement</span>
                <span className="text-xs font-bold text-white bg-brand-red px-3 py-1 rounded-full">Free Calculator</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="h-3 w-3" /> SRA #809071
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
                Can someone on PIP, DLA or Carer&rsquo;s Allowance sponsor a UK spouse visa?
              </h1>
              <p id="hero-lead" className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                <strong className="text-slate-900">Yes &mdash; in most cases.</strong> If your UK
                sponsor receives Personal Independence Payment, Disability Living Allowance,
                Attendance Allowance, Carer&rsquo;s Allowance, AFIP or a War Disablement Pension,
                the £29,000 minimum income requirement <strong className="text-slate-900">does not
                apply</strong>. Instead, the lower <em>adequate maintenance</em> test does. This
                free calculator checks whether your household meets it.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide px-6 h-12">
                  <a href="#calculator">Open Calculator</a>
                </Button>
                <DynamicCallLink className="inline-flex items-center justify-center rounded-lg text-sm font-semibold h-12 px-5 border border-slate-300 text-slate-800 hover:border-brand-red hover:text-brand-red bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  <DynamicPhoneText />
                </DynamicCallLink>
              </div>

              {/* Author byline */}
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-sm">HA</div>
                <div>
                  <p className="text-sm text-slate-700">
                    Reviewed by{" "}
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
            </div>

            {/* Right — quick lookup table */}
            <div className="lg:col-span-2 min-w-0">
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6">
                <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Quick reference</p>
                <p className="text-sm font-bold text-slate-900 mb-1">Weekly adequate-maintenance thresholds</p>
                <p className="text-xs text-slate-500 mb-3">Income Support rates &mdash; effective from 6 April {RATES_AS_OF.split(" ")[1]}.</p>
                <ul className="space-y-1.5 text-sm">
                  {Object.values(IS_RATES).map((r) => (
                    <li key={r.label} className="flex items-baseline justify-between gap-3 text-slate-700">
                      {/* min-w-0 lets the label shrink + wrap cleanly
                          instead of pushing the right-aligned price
                          off-screen on narrow mobile widths. The price
                          stays in a fixed-width column via shrink-0.
                          Mobile QA 2026-06-03. */}
                      <span className="leading-snug min-w-0">{r.label}</span>
                      <span className="font-bold text-slate-900 tabular-nums shrink-0">{moneyGbp(r.weekly)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[11px] text-slate-500 leading-snug">
                  Income Support is closed to new claimants since UC migration, but its rates remain
                  the legal benchmark for the adequate-maintenance test under{" "}
                  <em>KA (Pakistan) [2006]</em>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* ─── Calculator ─── */}
      <section id="calculator" className="py-10 lg:py-14 bg-slate-50/40">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Calculator</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Run the test on your figures
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Four quick questions. We&rsquo;ll show you whether your household clears the adequate
            maintenance threshold, sits in the marginal zone, or falls short.
          </p>

          {/* ─── Wizard progress bar ─── */}
          {!showAll && (
            <div className="mt-6 mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                {[1, 2, 3, 4].map((n) => {
                  const isCurrent = currentStep === n;
                  const isDone = n < currentStep;
                  return (
                    <div key={n} className="flex items-center gap-2 sm:gap-3 flex-1">
                      <div
                        className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                          isDone
                            ? "bg-brand-red text-white"
                            : isCurrent
                              ? "bg-brand-red/10 text-brand-red border-2 border-brand-red"
                              : "bg-slate-200 text-slate-500"
                        }`}
                        aria-label={`Step ${n}${isDone ? " — done" : isCurrent ? " — current" : ""}`}
                      >
                        {isDone ? <CheckCircle2 className="h-4 w-4" /> : n}
                      </div>
                      {n < 4 && (
                        <div className={`h-0.5 flex-1 rounded-full ${isDone ? "bg-brand-red" : "bg-slate-200"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="hidden sm:inline text-xs font-semibold text-slate-500 hover:text-brand-red underline-offset-2 hover:underline whitespace-nowrap"
              >
                Show all questions
              </button>
            </div>
          )}
          {showAll && (
            <div className="mt-6 mb-4 flex items-center justify-end">
              <button
                type="button"
                onClick={() => { setShowAll(false); setCurrentStep(1); }}
                className="text-xs font-semibold text-slate-500 hover:text-brand-red underline-offset-2 hover:underline"
              >
                ← Back to wizard view
              </button>
            </div>
          )}

          <div className="space-y-4">
            {/* ─── Step 1 — Sponsor benefit gate ─── */}
            {(() => {
              const isActive = showAll || currentStep === 1;
              const isCollapsed = !showAll && currentStep > 1 && sponsorBenefit !== "";
              if (isCollapsed) {
                const label =
                  sponsorBenefit === "yes" ? "Yes" : sponsorBenefit === "no" ? "No" : "Not sure";
                return (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="w-full bg-white rounded-2xl border border-slate-200 px-5 py-3.5 flex items-center justify-between gap-3 text-left hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span className="text-sm text-slate-600">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step 1 ·</span>{" "}
                        Sponsor benefit:{" "}
                        <strong className="text-slate-900">{label}</strong>
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-brand-red shrink-0">Change</span>
                  </button>
                );
              }
              if (!isActive) return null;
              return (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Step 1 of 4 &middot; Sponsor benefit gate</p>
                  <h3 className="text-lg font-black text-slate-900 leading-tight">
                    Does your UK sponsor receive a qualifying benefit?
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Adequate maintenance only applies if at least one qualifying benefit is in payment to the sponsor (PIP, DLA, Carer&rsquo;s Allowance, etc.).
                  </p>
                  <details className="mt-3 group">
                    <summary className="cursor-pointer text-xs font-semibold text-brand-red hover:text-brand-red-dark inline-flex items-center gap-1 list-none">
                      <ChevronDown className="h-3 w-3 transition-transform group-open:rotate-180" />
                      See the {QUALIFYING_BENEFITS.length} qualifying benefits
                    </summary>
                    <ul className="mt-3 grid sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600">
                      {QUALIFYING_BENEFITS.map((b) => (
                        <li key={b} className="flex items-start gap-1.5">
                          <CheckCircle2 className="h-3 w-3 text-brand-red shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                      { value: "not-sure", label: "Not sure" },
                    ].map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        onClick={() => {
                          const v = o.value as "yes" | "no" | "not-sure";
                          setSponsorBenefit(v);
                          setCalculated(false);
                          if (!showAll && v !== "no") setCurrentStep(2);
                        }}
                        className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                          sponsorBenefit === o.value
                            ? "border-brand-red bg-brand-red/5 text-slate-900"
                            : "border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>

                  {sponsorBenefit === "no" && (
                    <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-900 leading-relaxed">
                      <strong>Adequate maintenance doesn&rsquo;t apply to your case.</strong> Without a
                      qualifying benefit in payment, the standard £29,000 minimum income requirement
                      applies. See our{" "}
                      <Link href="/flr-visa-extension/" className="font-bold underline">FLR(M) Visa Extension</Link>{" "}
                      page or{" "}
                      <Link href="/uk-spouse-visa/" className="font-bold underline">spouse visa</Link>{" "}
                      page for the standard route.
                    </div>
                  )}
                  {sponsorBenefit === "not-sure" && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">
                      <strong>That&rsquo;s normal.</strong> Continue and we&rsquo;ll flag your result
                      as needing solicitor review.
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ─── Step 2 — Family composition ─── */}
            {sponsorBenefit !== "no" && (() => {
              const isActive = showAll || currentStep === 2;
              const isCollapsed = !showAll && currentStep > 2 && !!family;
              if (isCollapsed) {
                return (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-full bg-white rounded-2xl border border-slate-200 px-5 py-3.5 flex items-center justify-between gap-3 text-left hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span className="text-sm text-slate-600 truncate">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step 2 ·</span>{" "}
                        <strong className="text-slate-900">{IS_RATES[family as FamilyKey].label}</strong>
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-brand-red shrink-0">Change</span>
                  </button>
                );
              }
              if (!isActive) return null;
              return (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Step 2 of 4 &middot; Household</p>
                  <h3 className="text-lg font-black text-slate-900 leading-tight">
                    Who will live in the UK household once the applicant arrives?
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Count the UK sponsor, the visa applicant, and any dependent children under 18 sharing the home.
                  </p>
                  <select
                    value={family}
                    onChange={(e) => {
                      const v = e.target.value as FamilyKey | "";
                      setFamily(v);
                      setCalculated(false);
                      if (!showAll && v) setCurrentStep(3);
                    }}
                    className="mt-3 w-full px-3 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red bg-white"
                  >
                    <option value="">Choose your household type…</option>
                    {Object.entries(IS_RATES).map(([key, r]) => (
                      <option key={key} value={key}>
                        {r.label} &mdash; {moneyGbp(r.weekly)}/week threshold
                      </option>
                    ))}
                  </select>
                  {!showAll && (
                    <div className="mt-3 flex justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-xs font-semibold text-slate-500 hover:text-brand-red"
                      >
                        ← Back
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ─── Step 3 — Income ─── */}
            {sponsorBenefit !== "no" && (() => {
              const isActive = showAll || currentStep === 3;
              const incomeReady = !!incomeAmount && parseFloat(incomeAmount) > 0;
              const isCollapsed = !showAll && currentStep > 3 && incomeReady;
              if (isCollapsed) {
                return (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="w-full bg-white rounded-2xl border border-slate-200 px-5 py-3.5 flex items-center justify-between gap-3 text-left hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span className="text-sm text-slate-600 truncate">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step 3 ·</span>{" "}
                        Income:{" "}
                        <strong className="text-slate-900">{moneyGbp(parseFloat(incomeAmount))} {incomeMode === "monthly" ? "/mo" : "/wk"}</strong>
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-brand-red shrink-0">Change</span>
                  </button>
                );
              }
              if (!isActive) return null;
              return (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Step 3 of 4 &middot; Income</p>
                  <h3 className="text-lg font-black text-slate-900 leading-tight">Net household income (£)</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Take-home pay after tax + the qualifying benefit itself + any other regular household income.
                  </p>
                  <div className="mt-3 flex gap-2 mb-2">
                    {[
                      { value: "monthly", label: "Monthly" },
                      { value: "weekly", label: "Weekly" },
                    ].map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        onClick={() => { setIncomeMode(o.value as "monthly" | "weekly"); setCalculated(false); }}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                          incomeMode === o.value
                            ? "border-brand-red bg-brand-red/5 text-slate-900"
                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step={1}
                    value={incomeAmount}
                    onChange={(e) => { setIncomeAmount(e.target.value); setCalculated(false); }}
                    placeholder={incomeMode === "monthly" ? "e.g. 1,500" : "e.g. 350"}
                    className="w-full px-3 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red"
                  />
                  {!showAll && (
                    <div className="mt-3 flex justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-xs font-semibold text-slate-500 hover:text-brand-red"
                      >
                        ← Back
                      </button>
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(4)}
                        disabled={!incomeReady}
                        className="bg-brand-navy hover:bg-brand-navy/90 text-white rounded-lg px-5 h-10 text-sm font-semibold disabled:opacity-40"
                      >
                        Next <ArrowRight className="h-4 w-4 ml-1.5" />
                      </Button>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ─── Step 4 — Housing ─── */}
            {sponsorBenefit !== "no" && (() => {
              const isActive = showAll || currentStep === 4;
              if (!isActive) return null;
              return (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Step 4 of 4 &middot; Housing costs</p>
                  <h3 className="text-lg font-black text-slate-900 leading-tight">Housing costs (£)</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Rent/mortgage + council tax + essential utilities + buildings insurance. Exclude broadband, TV, subscriptions.
                  </p>
                  <div className="mt-3 flex gap-2 mb-2">
                    {[
                      { value: "monthly", label: "Monthly" },
                      { value: "weekly", label: "Weekly" },
                    ].map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        onClick={() => { setHousingMode(o.value as "monthly" | "weekly"); setCalculated(false); }}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                          housingMode === o.value
                            ? "border-brand-red bg-brand-red/5 text-slate-900"
                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step={1}
                    value={housingAmount}
                    onChange={(e) => { setHousingAmount(e.target.value); setCalculated(false); }}
                    placeholder={housingMode === "monthly" ? "e.g. 800" : "e.g. 180"}
                    className="w-full px-3 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red"
                  />
                  {!showAll && (
                    <div className="mt-3 flex justify-start">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="text-xs font-semibold text-slate-500 hover:text-brand-red"
                      >
                        ← Back
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Calculate button — shown on Step 4 (wizard) or always (showAll) */}
            {sponsorBenefit !== "no" && (showAll || currentStep === 4) && (
              <Button
                type="button"
                onClick={() => setCalculated(true)}
                disabled={!canCalc && sponsorBenefit !== "not-sure"}
                className="w-full bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-wide disabled:opacity-40"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}

            {/* Verdict */}
            {verdict && (
              <div className="mt-2 space-y-4">
                {/* Above-verdict disclaimer per council recommendation (1 June 2026) */}
                <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-4 sm:p-5 text-sm text-amber-900 leading-relaxed">
                  <p className="font-bold mb-1.5">Before reading the verdict — what this calculator doesn&rsquo;t check</p>
                  <ul className="space-y-1.5 list-disc pl-5">
                    <li>
                      <strong>Benefit durability</strong> &mdash; PIP, DLA and Carer&rsquo;s
                      Allowance can be reassessed and reduced. If the award is up for review
                      inside the visa cycle, the Home Office may treat the income as not
                      sustainable.
                    </li>
                    <li>
                      <strong>Accommodation adequacy</strong> &mdash; the Home Office checks bedroom
                      count and suitability for the household size, not just cost. A 1-bed flat for
                      a couple + 2 children fails this even if the maths passes.
                    </li>
                    <li>
                      <strong>Third-party support and savings</strong> &mdash; these can bridge
                      shortfalls but are case-sensitive arguments not captured here.
                    </li>
                    <li>
                      <strong>Rate currency</strong> &mdash; Income Support rates are uprated each
                      April. The figures below are <strong>{RATES_AS_OF}</strong>. Verify against
                      the rates in force on the date of your application before relying on the
                      verdict.
                    </li>
                  </ul>
                </div>

                <VerdictCard
                  verdict={verdict}
                  available={calc.available}
                  threshold={calc.threshold}
                  family={(family || "single-25-plus") as FamilyKey}
                />
                <ConsultationForm verdict={verdict} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── What is adequate maintenance ─── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">The basics</p>
          <h2 id="what-is-am" className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            What is the adequate maintenance test?
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              The default financial test for a UK spouse or partner visa under Appendix FM is the{" "}
              <strong className="text-slate-900">£29,000 minimum income requirement</strong>{" "}
              (raised from £18,600 in April 2024). The sponsor must show this from employment,
              self-employment, or a combination of income and £88,500+ in cash savings.
            </p>
            <p>
              The adequate maintenance route is the alternative when the UK sponsor is on certain
              benefits and the £29,000 figure would unfairly exclude families where one partner
              cannot work, or works limited hours, because of disability or caring responsibilities.
              The test was settled in <em>KA (Pakistan) [2006]</em> and <em>AM (Ethiopia) [2008]</em>{" "}
              and is now baked into Appendix FM-SE.
            </p>
            <p>
              The maths are:
            </p>
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 sm:p-5">
              <p className="text-sm font-mono text-slate-700">
                weekly net income &minus; weekly housing costs &nbsp;&ge;&nbsp; Income Support rate
                for the household
              </p>
            </div>
            <p>
              If the result clears the Income Support line for that household composition, the test
              is met. If not, the application is usually refused on financial grounds &mdash; but
              that&rsquo;s not the end. Third-party support, additional benefits the sponsor may be
              entitled to but not yet claiming, and savings drawdown can often bridge the gap.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Qualifying benefits list ─── */}
      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Eligibility</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Which benefits qualify the sponsor for this route
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
            The sponsor must be in receipt of at least one of these on the date of application.
            The applicant doesn&rsquo;t need a qualifying benefit &mdash; only the UK sponsor.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {QUALIFYING_BENEFITS.map((b) => (
              <div key={b} className="bg-white rounded-xl border border-slate-100 p-4 flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">{b}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 sm:p-5 rounded-xl bg-white border border-slate-200 text-sm text-slate-600 leading-relaxed flex items-start gap-3">
            <Scale className="h-4 w-4 shrink-0 mt-0.5 text-brand-red" />
            <span>
              Statutory authority: Appendix FM, paragraph E-ECP.3.3 of the Immigration Rules
              (and the equivalent provisions for in-country extension and ILR). Case law: <em>KA
              and Others (adequacy of maintenance) Pakistan [2006] UKAIT 00065</em> and <em>AM
              (3rd party support) Ethiopia [2008] UKAIT 00058</em>.
            </span>
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
      <section className="py-12 lg:py-16 bg-brand-navy">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3">Ready when you are</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
            Want a solicitor to double-check your figures?
          </h2>
          <p className="mt-3 text-base text-white/80 leading-relaxed">
            The calculator is indicative. A 15-minute call with {AUTHOR.name} will confirm whether the adequate maintenance
            route applies to your case and what evidence to put together. No obligation.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-stretch justify-center gap-3">
            <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide px-6 h-12">
              <a href="#calculator">Run the Calculator</a>
            </Button>
            <DynamicCallLink className="inline-flex items-center justify-center rounded-lg text-sm font-bold uppercase tracking-wide h-12 px-6 bg-white text-brand-navy hover:bg-slate-100">
              <Phone className="h-4 w-4 mr-2" />
              <DynamicPhoneText />
            </DynamicCallLink>
          </div>
          <p className="mt-6 text-xs text-white/60 leading-relaxed flex items-center justify-center gap-1.5">
            <Calendar className="h-3 w-3" /> Last reviewed: {LAST_REVIEWED} by {AUTHOR.name} (SRA #{AUTHOR.sraNumber}). Income Support rates as of {RATES_AS_OF}. Page URL: {PAGE_URL}.
          </p>
        </div>
      </section>
    </>
  );
}
