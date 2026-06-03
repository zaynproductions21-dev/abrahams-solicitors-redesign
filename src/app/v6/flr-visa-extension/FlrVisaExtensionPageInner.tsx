"use client";

/**
 * FLR(M) Visa Extension landing page — client component.
 *
 * Built off the brief 20 May 2026. Conversion-optimised for Google Ads paid
 * traffic on "flr visa", "flr m", "spouse visa extension uk", "partner visa
 * extension uk" queries. Lives at /flr-visa-extension/.
 *
 * Design parity with the existing /uk-spouse-visa/ + /housing-disrepair/
 * pattern: bespoke hero with inline capture form, trust strip with named
 * solicitor, 10 sections including pricing/process/FAQ/named bio, schema
 * markup for LegalService + FAQ + Person + Breadcrumb + Speakable.
 *
 * Phone number for this page: 0203 355 9823 (per brief).
 * Named solicitor: Humaira Anjum (SRA #663190).
 * Pricing: From £900 + VAT + Home Office fee (£1,048).
 */

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrustBadges } from "@/components/v6/trust-badges";
import { TeamStrip } from "@/components/v6/team-strip";
import { AdequateMaintenanceCallout } from "@/components/v6/adequate-maintenance-callout";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { GclidField, MsclkidField } from "@/components/v6/gclid-field";
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
  Star, FileCheck2, Clock, BadgeCheck, PoundSterling, Calendar, Users,
  AlertTriangle, Sparkles,
} from "lucide-react";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/flr-visa-extension/";
const LAST_REVIEWED = "May 2026";
const AUTHOR = team.find((t) => t.slug === "humaira-anjum")!;

const WHAT_WE_HANDLE = [
  {
    icon: FileCheck2,
    name: "FLR(M) extension — standard 30-month route",
    body: "End-to-end Home Office filing for partners and spouses on the 5-year route under Appendix FM.",
  },
  {
    icon: AlertTriangle,
    name: "Complex FLR(M) — prior refusal or gap in leave",
    body: "We rebuild evidence around a previous refusal, late application or break in continuous leave.",
  },
  {
    icon: BadgeCheck,
    name: "Biometric Residence Permit (BRP) renewal",
    body: "BRP-only renewals where leave status is unchanged — fixed-fee, fast turnaround.",
  },
  {
    icon: FileCheck2,
    name: "Full Home Office evidence bundle",
    body: "We assemble the documentary evidence — income, cohabitation, finances, English language and Life in UK — to the standard a caseworker expects.",
  },
];

const PROCESS_STEPS = [
  {
    title: "Free 15-min scoping call",
    body: "We listen to where you are and tell you which version of FLR(M) applies. No obligation, no sales pitch.",
  },
  {
    title: "Fixed-fee quote in writing",
    body: "You see the cost before any work starts — £900 + VAT for standard cases. Complex cases are quoted individually.",
  },
  {
    title: "We build your evidence bundle",
    body: "Income, savings, cohabitation, English language, Life in UK — packaged the way the Home Office expects.",
  },
  {
    title: "We submit to the Home Office",
    body: "We file the application on your behalf and confirm receipt. You don't talk to UKVI — we do.",
  },
  {
    title: "We track and respond",
    body: "If the Home Office requests further information, we handle the response inside the deadline. You stay informed throughout.",
  },
];

const FAQS = [
  {
    question: "How long does an FLR(M) application take?",
    answer:
      "The standard Home Office service is roughly 8 weeks for FLR(M) applications. A super-priority service is available for an additional £1,000 fee, which usually gives a decision within 24 working hours of biometrics. Our preparation time before submission is typically 2-3 weeks, depending on how complete your documents are at the start.",
  },
  {
    question: "What documents do I need for FLR(M)?",
    answer:
      "The core bundle includes proof of identity (current BRPs / passports for both partners), evidence of your relationship (joint correspondence, photos, cohabitation evidence covering the relevant period), proof of meeting the financial requirement (payslips, bank statements, P60s, savings evidence), proof of accommodation, English language certificate (or qualifying degree), and Life in UK Test certificate if applying for indefinite leave. We provide a checklist on the scoping call.",
  },
  {
    question: "Can I work while my FLR(M) is being processed?",
    answer:
      "Yes. If you apply for FLR(M) before your current leave expires, your existing work rights continue automatically under Section 3C of the Immigration Act 1971 until the Home Office makes a decision. You can ask UKVI for a Certificate of Application (CoA) which evidences your right to work to employers during the processing period.",
  },
  {
    question: "What if I've had a previous refusal?",
    answer:
      "A prior refusal does not stop a fresh FLR(M) application — but it changes the evidence we need to assemble. We review the original refusal letter line-by-line, identify the specific ground that was failed, and build the new application to address it directly. Refusal-recovery FLR(M) cases are quoted individually because the work varies by the reason for refusal.",
  },
  {
    question: "Do I need to leave the UK while it's being processed?",
    answer:
      "No. FLR(M) is an in-country application — you apply from inside the UK and you remain in the UK while it is being decided. Leaving the UK before the application is decided will withdraw your application automatically. We arrange the biometric appointment at a UK Visa and Citizenship Application Services (UKVCAS) location near you.",
  },
];

const PRICING_NOTES = [
  "Government Home Office fee (£1,048) and Immigration Health Surcharge are payable in addition.",
  "Super-priority service (£1,000 — UKVI fee) is available if you need a decision within 24 working hours.",
  "Complex cases — previous refusals, gaps in leave, dependent applications — are quoted individually after the free scoping call.",
];

function PrimaryForm({ id = "consultation-form" }: { id?: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [scenario, setScenario] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const spam = useSpamGuard();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !email || !phone) return;
    setSubmitting(true);
    pushFormSubmit({ email, phone });
    await submitEnquiry(
      {
        source: "flr-visa-extension-lp",
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone,
        service: "[LP] FLR(M) Visa Extension",
        case: `Visa scenario: ${scenario || "(not specified)"}`,
      },
      spam.payload(),
    );
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border-2 border-emerald-200 shadow-sm p-6 sm:p-7" id={id}>
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-xl font-black text-slate-900 text-center tracking-tight">
          Thanks {firstName.split(" ")[0]}.
        </h3>
        <p className="mt-3 text-sm text-slate-600 text-center leading-relaxed">
          We&rsquo;ve received your request. {AUTHOR.name} or someone in the team will call you back within
          one working hour Mon&ndash;Fri. Weekend submissions land Monday morning.
        </p>
        <p className="mt-3 text-xs text-slate-400 text-center">
          If your case is urgent, call <DynamicPhoneText /> now.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-5 sm:p-6" id={id}>
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-brand-red" />
        <p className="text-xs font-bold text-brand-red uppercase tracking-widest">Free 15-Min Scoping Call</p>
      </div>
      <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
        Tell us where you are and we&rsquo;ll call you back.
      </h3>
      <p className="mt-2 text-xs text-slate-500 leading-relaxed">
        SRA-regulated firm #809071. Reviewed by {AUTHOR.name} (SRA #{AUTHOR.sraNumber}).
      </p>
      <form onSubmit={onSubmit} className="mt-4 space-y-2">
        <HoneypotInput value={spam.honeypot} onChange={spam.setHoneypot} />
        <GclidField />
        <MsclkidField />
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
        <select
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
          className="w-full px-3 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red bg-white"
        >
          <option value="">Your situation (optional)</option>
          <option value="first-extension">First FLR(M) extension — existing spouse visa</option>
          <option value="previous-refusal">I&rsquo;ve had a previous refusal</option>
          <option value="gap-in-leave">There&rsquo;s a gap in my leave</option>
          <option value="income-question">Income / threshold question</option>
          <option value="brp-renewal">BRP renewal only</option>
          <option value="other">Other / not sure</option>
        </select>
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
            <ChevronDown
              className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${openIdx === i ? "rotate-180" : ""}`}
            />
          </button>
          {openIdx === i && (
            <div id={`faq-answer-${i}`} className="px-5 pb-5 text-sm text-slate-600 leading-relaxed speakable-faq-answer">
              {q.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function FlrVisaExtensionPageInner() {
  return (
    <>
      {/* ─── JSON-LD schema (LegalService + FAQ + Person + Breadcrumb + Speakable) ─── */}
      <JsonLd
        data={legalServiceWithCatalogSchema({
          name: "FLR(M) Visa Extension Solicitors",
          description:
            "Fixed-fee FLR(M) (Further Leave to Remain — Marriage / Civil Partnership) visa extension solicitors. SRA-regulated firm #809071. Standard FLR(M) from £900 + VAT. Free 15-minute scoping call.",
          slug: "flr-visa-extension",
          author: { name: AUTHOR.name, sraUrl: AUTHOR.sraUrl },
          catalog: WHAT_WE_HANDLE.map((c) => ({ name: c.name, description: c.body })),
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
          { name: "FLR(M) Visa Extension" },
        ])}
      />
      <JsonLd data={speakableSchema(["#hero-lead", "#what-is-flrm", ".speakable-faq-answer"])} />

      {/* ─── Breadcrumb ─── */}
      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/immigration/" className="hover:text-brand-red transition-colors">Immigration</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">FLR(M) Visa Extension</span>
          </nav>
        </div>
      </section>

      {/* ─── Hero ─── headline left, capture form right */}
      <section className="relative bg-white border-b border-slate-100 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Left: 3 cols */}
            <div className="lg:col-span-3 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-bold text-brand-red uppercase tracking-widest">FLR(M) Visa Extension</span>
                <span className="text-xs font-bold text-white bg-brand-red px-3 py-1 rounded-full">From £900</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="h-3 w-3" />
                  SRA #809071
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
                FLR(M) Visa Extension Solicitors
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Extend your spouse or partner visa in the UK — fixed fee, direct solicitor access. We handle the
                evidence bundle, the Home Office filing, and any follow-up queries so you don&rsquo;t have to.
              </p>

              {/* Trust bar — Google-Ads brief verbatim */}
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-semibold text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-brand-red" /> SRA #809071
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" /> 4.9 from 97 reviews
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <PoundSterling className="h-4 w-4 text-brand-red" /> Fixed fees from £900
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-brand-red" /> Free 15-min call
                </span>
              </div>

              {/* Hero CTAs — stack full-width on phones (was wrapping
                  "Get a Free 15-Min Scoping Call" to 2 lines at 375px
                  + orphaning the phone button on its own row). Side-by-
                  side natural width on tablet+. Responsive label drops
                  "15-Min" on mobile to fit; full text on desktop.
                  Mobile QA 2026-06-03. */}
              <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase sm:tracking-wide px-6 h-12"
                >
                  <a href="#consultation-form">
                    <span className="sm:hidden">Free Scoping Call</span>
                    <span className="hidden sm:inline">Get a Free 15-Min Scoping Call</span>
                  </a>
                </Button>
                <DynamicCallLink className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg text-sm font-semibold h-12 px-5 border border-slate-300 text-slate-800 hover:border-brand-red hover:text-brand-red bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  <DynamicPhoneText />
                </DynamicCallLink>
              </div>

              {/* Lede — speakable + E-E-A-T anchor */}
              <p id="hero-lead" className="mt-6 text-sm text-slate-500 leading-relaxed max-w-2xl">
                FLR(M) — Further Leave to Remain (Marriage / Civil Partnership) — is the visa you apply for when
                your initial spouse or partner visa is about to expire and you want to stay in the UK. We file
                FLR(M) extensions for couples in London and across England and Wales.
              </p>

              {/* Author byline */}
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-sm">
                  HA
                </div>
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
                    <a
                      href={AUTHOR.sraUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-red underline-offset-2 hover:underline"
                    >
                      Verify on SRA register
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: 2 cols — capture form */}
            <div className="lg:col-span-2 min-w-0">
              <PrimaryForm />
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* ─── Section 1 — What is FLR(M)? ─── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">The basics</p>
          <h2 id="what-is-flrm" className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            What is FLR(M)?
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              FLR(M) stands for <strong className="text-slate-900">Further Leave to Remain (Marriage / Civil Partnership)</strong>.
              It&rsquo;s the application you make when your initial UK spouse or partner visa is approaching its
              expiry date and you want to extend your stay on the 5-year route to settlement.
            </p>
            <p>
              The 5-year route is two 30-month visas — your first spouse visa, then FLR(M) — and after five years
              of qualifying residence you can apply for Indefinite Leave to Remain (settlement). Get the FLR(M)
              evidence bundle wrong and the clock can reset. That&rsquo;s why most couples instruct a solicitor
              for this stage even if they did the first visa themselves.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Section 2 — The £29,000 income threshold ─── */}
      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Income requirement</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Worried about the £29,000 income requirement?
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              The 2024 changes to Appendix FM lifted the financial requirement from £18,600 to{" "}
              <strong className="text-slate-900">£29,000</strong> for new applicants. The rules around what counts
              and how it&rsquo;s evidenced have changed at the same time, and most couples land on this page
              uncertain whether their situation qualifies.
            </p>
            <p>
              Several factors matter that aren&rsquo;t obvious from the gov.uk guidance: which kinds of income count
              and over what period; how self-employment, dividend income and director&rsquo;s pay are treated;
              whether savings can top up below-threshold income (yes &mdash; £88,500 in cash savings substitutes for
              income); whether disability benefits trigger exemption; and how joint income is treated once the
              applying partner is in the UK and working.
            </p>
            <p>
              We know exactly how to evidence income, savings and combined earnings to meet the requirement &mdash;
              and where the gaps are, we identify them on the scoping call so you have time to fix them before the
              application goes in.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide px-6 h-12"
            >
              <a href="#consultation-form">Check Your Income Position — Free Call</a>
            </Button>
          </div>

          {/* Cross-link to the AM calculator for the disability-sponsor cohort */}
          <div className="mt-6">
            <AdequateMaintenanceCallout />
          </div>
        </div>
      </section>

      {/* ─── Section 3 — What we handle ─── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">What we handle</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              The four versions of FLR(M) we routinely file
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Standard extensions to complex refusal-recovery cases &mdash; below is the work we take on most often.
              If your situation isn&rsquo;t listed, the scoping call is the right place to talk it through.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {WHAT_WE_HANDLE.map((c) => (
              <div
                key={c.name}
                className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 hover:border-brand-red transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900">{c.name}</p>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{c.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 4 — Why not DIY? ─── */}
      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">DIY risks</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Three reasons people regret a DIY FLR(M)
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            FLR(M) is one of the more form-able UK visa applications &mdash; the rules are public, the form is online,
            and the price difference between DIY and instructed is real. Here&rsquo;s where the work pays for itself.
          </p>
          <div className="mt-6 grid gap-4 sm:gap-5">
            {[
              {
                title: "Wrong or missing documents",
                body: "The financial requirement alone has 17 separate evidence categories. Missing one is a refusal — and the £1,048 Home Office fee is non-refundable.",
              },
              {
                title: "Missed deadlines",
                body: "Apply after your current leave expires and you risk overstayer status, which carries a 12-month re-entry ban on top of any refusal. We file inside the deadline window.",
              },
              {
                title: "Discretionary refusals that are hard to appeal",
                body: "Many FLR(M) refusals are on suitability or evidential grounds with no statutory right of appeal — only an administrative review, which is slower and harder to win than getting the original application right.",
              },
            ].map((r) => (
              <div key={r.title} className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900">{r.title}</p>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{r.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 5 — Our process ─── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Our process &mdash; from first call to decision
          </h2>
          <ol className="mt-6 space-y-4">
            {PROCESS_STEPS.map((s, i) => (
              <li key={s.title} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-brand-red text-white flex items-center justify-center font-black shrink-0">
                  {i + 1}
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-bold text-slate-900">{s.title}</p>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Section 6 — Pricing ─── */}
      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Fixed-fee FLR(M) &mdash; no hidden costs
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            You see the cost before any work starts. Our standard fee covers the full evidence build and Home Office
            submission &mdash; what changes case-by-case is whether your facts trigger the &ldquo;complex&rdquo; band.
          </p>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border-2 border-brand-red p-5 sm:p-6">
              <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-1">Standard FLR(M)</p>
              <p className="text-3xl font-black text-slate-900">
                From £900 <span className="text-base font-bold text-slate-500">+ VAT</span>
              </p>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                First extension on a clean 5-year route &mdash; no prior refusal, no gap in leave. Full evidence bundle and Home Office filing included.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Complex cases</p>
              <p className="text-3xl font-black text-slate-900">Quoted individually</p>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Previous refusal, gap in leave, dependent applications, or financial-requirement complications. Quote is
                given in writing after the free scoping call.
              </p>
            </div>
          </div>

          <ul className="mt-6 space-y-2">
            {PRICING_NOTES.map((n) => (
              <li key={n} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Section 7 — Reviews ─── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Reviews</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Clients who&rsquo;ve been through the process
          </h2>
          <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
              ))}
            </div>
            <span><strong className="text-slate-900">4.9 out of 5</strong> from 97 reviews.</span>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              {
                name: "Priya & Daniel",
                text: "Our first spouse visa we did ourselves and got lucky. For FLR(M) we used Abrahams and felt the difference straight away — Humaira knew exactly which payslips would and wouldn't count toward the threshold. Approved in 6 weeks.",
              },
              {
                name: "Marek",
                text: "We&rsquo;d been refused once for missing financial evidence. Abrahams rebuilt the bundle from scratch, explained what went wrong, and the second application went through cleanly. Fixed fee, no surprises.",
              },
              {
                name: "Aisha",
                text: "The £29,000 change happened mid-way through our planning and we panicked. Humaira walked us through how to combine income and savings to meet the new threshold. No call centres — direct solicitor access throughout.",
              },
            ].map((r) => (
              <div key={r.name} className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed italic">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-3 text-xs font-bold text-slate-900">{r.name}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-slate-400">
            Verified clients. First names only at client request. Past results do not guarantee future outcomes.
          </p>
        </div>
      </section>

      {/* ─── Section 8 — Meet your solicitor ─── */}
      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Meet your solicitor</p>
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
              <p>{AUTHOR.short}</p>
              <p className="text-xs text-slate-500">
                SRA #{AUTHOR.sraNumber} &middot; Admitted {AUTHOR.admittedYear} &middot;{" "}
                <a
                  href={AUTHOR.sraUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-red hover:underline underline-offset-2"
                >
                  Verify on SRA register
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 9 — FAQ ─── */}
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
            Ready to start your FLR(M) extension?
          </h2>
          <p className="mt-3 text-base text-white/80 leading-relaxed">
            Book a free 15-minute scoping call. We&rsquo;ll tell you which version of FLR(M) applies and what the fixed fee will be &mdash; no obligation, no sales pitch.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-stretch justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide px-6 h-12"
            >
              <a href="#consultation-form">Get a Free 15-Min Scoping Call</a>
            </Button>
            <DynamicCallLink className="inline-flex items-center justify-center rounded-lg text-sm font-bold uppercase tracking-wide h-12 px-6 bg-white text-brand-navy hover:bg-slate-100">
              <Phone className="h-4 w-4 mr-2" />
              <DynamicPhoneText />
            </DynamicCallLink>
          </div>
          <p className="mt-6 text-xs text-white/60 leading-relaxed flex items-center justify-center gap-1.5">
            <Calendar className="h-3 w-3" /> Last reviewed: {LAST_REVIEWED} by {AUTHOR.name} (SRA #{AUTHOR.sraNumber}). Page URL: {PAGE_URL}.
          </p>
        </div>
      </section>
    </>
  );
}
