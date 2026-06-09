"use client";

/**
 * Standalone /visa-wizard/ page.
 *
 * The wizard logic + UI lives in <VisaWizardWidget />. This page wraps it in
 * the breadcrumb, hero, disclaimer banner, content-quality block and footer
 * disclaimer needed for a canonical SEO-discoverable page that can also be
 * used as a Google Ads destination URL.
 *
 * Same widget is also embedded on /uk-spouse-visa/ via the slug template
 * (Pattern A from the Council placement decision — Pattern A on
 * /uk-spouse-visa/ only as v1 placement test).
 */

import Link from "next/link";
import { TrustBadges } from "@/components/v6/trust-badges";
import { TeamStrip } from "@/components/v6/team-strip";
import { VisaWizardWidget } from "@/components/v6/visa-wizard-widget";
import {
  JsonLd, breadcrumbSchema, personSchema, faqPageSchema,
} from "@/components/v6/jsonld";
import { team } from "@/lib/team";
import {
  ChevronRight, ShieldCheck, Info, AlertCircle, Calendar,
} from "lucide-react";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/visa-wizard/";
const LAST_REVIEWED = "May 2026";
const AUTHOR = team.find(t => t.slug === "imran-shah")!;

const VISA_FAQS = [
  {
    question: "Which UK visa do I need?",
    answer:
      "It depends on why you are coming to the UK and your circumstances. The main families are work routes (such as the Skilled Worker visa), family and partner routes (such as a spouse or partner under Appendix FM), study routes, visit routes, and business or talent routes (such as Global Talent). Each has different eligibility, evidence and cost. The official starting point is the GOV.UK 'check which visa you need' tool, and this wizard helps narrow the family that fits your situation before you take advice.",
  },
  {
    question: "Can I switch to a different visa while I am inside the UK?",
    answer:
      "Sometimes. Some routes allow you to switch in-country without leaving (for example switching into the Skilled Worker route), while others require you to apply from outside the UK. Whether you can switch depends on your current immigration status and the route you want to move to, and visitors generally cannot switch in-country. Because the consequences of getting this wrong are serious, it is worth checking the current switching rules on GOV.UK or with a solicitor before you apply.",
  },
  {
    question: "Do I need a job offer or a sponsor?",
    answer:
      "For most work routes, yes. The Skilled Worker visa requires a job offer from an employer who holds a Home Office sponsor licence, with a Certificate of Sponsorship for an eligible role. Family, visit and some talent routes do not require a sponsoring employer. Identifying whether your route needs sponsorship is one of the first things to settle.",
  },
  {
    question: "How long does a UK visa decision take?",
    answer:
      "Processing times vary by route, by where you apply, and by whether you use any optional priority service. They also change over time. We do not quote fixed timescales as fact — check the current expected processing times for your route at gov.uk before you plan travel or make commitments.",
  },
  {
    question: "How much does a UK visa cost?",
    answer:
      "The Home Office application fee, the Immigration Health Surcharge and any optional priority service are all set by the Home Office and change periodically, so check the current amounts at gov.uk. There may also be costs such as English tests, document translation and, depending on the route, evidence that you meet a financial requirement. Our own fixed fee for preparing an application is agreed in writing before any work begins.",
  },
  {
    question: "What can I do if my visa application is refused?",
    answer:
      "It depends on the route and the reason for refusal. Some refusals carry a right of appeal or administrative review; others can only realistically be addressed by a fresh, better-evidenced application. The refusal letter sets out the reasons and any review or appeal rights. A solicitor can read the letter against your original application and advise on the most realistic next step — outcomes are decided by the Home Office on the facts of each case.",
  },
];

export default function VisaWizardPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
        { name: "Immigration", url: "https://www.abrahamssolicitors.co.uk/immigration/" },
        { name: "UK Visa Wizard" },
      ])} />
      <JsonLd data={personSchema({
        name: AUTHOR.name,
        jobTitle: AUTHOR.role,
        sraNumber: AUTHOR.sraNumber,
        sraUrl: AUTHOR.sraUrl,
        bio: AUTHOR.short,
        slug: AUTHOR.slug,
      })} />
      <JsonLd data={faqPageSchema(VISA_FAQS)} />

      {/* Breadcrumb */}
      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/immigration/" className="hover:text-brand-red transition-colors">Immigration</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">UK Visa Wizard</span>
          </nav>
        </div>
      </section>

      {/* Hero + intro */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-bold text-brand-red uppercase tracking-widest">Visa Wizard · v1 (Spouse Visa)</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="h-3 w-3" />
              Free · No call · No spam
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Which UK Spouse Visa route fits your situation?
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            Answer six plain-English questions. We&rsquo;ll tell you which Spouse Visa route looks most relevant, with the rule reference, and whatever you should think about next. <strong className="text-slate-900">No call follows automatically</strong> — we only contact you if you specifically ask us to email the result.
          </p>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5 max-w-3xl">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" />
              <div className="text-sm text-slate-600 leading-relaxed">
                This wizard is a guide to which visa route may apply, <strong className="text-slate-700">not legal advice</strong> and not a prediction of outcome. Home Office decisions turn on the full evidence of your case.{" "}
                Reviewed by{" "}
                <Link href="/our-team/" className="font-semibold text-slate-900 hover:text-brand-red">{AUTHOR.name}</Link>
                {" "}— SRA #{AUTHOR.sraNumber} · admitted {AUTHOR.admittedYear} ·{" "}
                <a href={AUTHOR.sraUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-red underline-offset-2 hover:underline">verify on SRA register</a>
                . Last reviewed: {LAST_REVIEWED}.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wizard widget */}
      <section className="py-10 lg:py-14 bg-slate-50/40">
        <div className="max-w-[760px] mx-auto px-6 lg:px-8">
          <VisaWizardWidget source="visa-wizard-standalone" />
        </div>
      </section>

      <TrustBadges />

      {/* Content quality / E-E-A-T explainer */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Why we built this</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Plain-English routing. No sales call. No spam.
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              Most people landing on a UK visa page already know they need help — they don&rsquo;t know <em>which</em> route applies to their specific situation. The official UK government tool at{" "}
              <a href="https://www.gov.uk/check-uk-visa" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">gov.uk/check-uk-visa</a>
              {" "}is comprehensive but doesn&rsquo;t flag the practical considerations that decide most cases (financial gaps, English-language exemptions, in-country switching restrictions, recent refusals).
            </p>
            <p>
              This wizard is six plain-English questions written by{" "}
              <Link href="/our-team/" className="font-semibold text-slate-900 hover:text-brand-red">{AUTHOR.name}</Link>{" "}
              ({AUTHOR.role}, SRA #{AUTHOR.sraNumber}, admitted {AUTHOR.admittedYear}) and reviewed against the current Immigration Rules. The output is a route name, the relevant rule reference, and what you should think about next — not a prediction of whether you will succeed.
            </p>
            <p>
              <strong className="text-slate-900">It is free, anonymous until you ask us to follow up by email, and there is no automatic call.</strong> If you want to book a 30-minute free consultation, that&rsquo;s a separate decision you make at the end.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border-2 border-slate-200 bg-slate-50 p-5 sm:p-6">
            <p className="text-sm font-semibold text-slate-900 mb-2">What this wizard isn&rsquo;t</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>It&rsquo;s not legal advice. A solicitor reviewing the full evidence will give you a proper assessment.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>It&rsquo;s not a prediction of approval. Outcomes depend on your evidence, the case officer, and case-specific facts the wizard can&rsquo;t see.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>It only covers the Spouse / Partner Visa family in v1. Other routes (Skilled Worker, ILR, Citizenship) come next.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Depth: understanding UK visa routes */}
      <section className="py-10 lg:py-14 bg-slate-50/40 border-t border-slate-100">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">
            Understanding UK visas
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Choosing the right UK visa route
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              The UK immigration system is organised into route families, each with its own
              eligibility, evidence and cost. The biggest practical step is identifying which family
              fits your reason for coming &mdash; work, family, study, a visit, or a business or
              talent route &mdash; before you worry about the detail. Getting the family right first
              saves time and avoids applying on the wrong route.
            </p>
          </div>

          <h3 className="mt-8 text-lg font-bold text-slate-900">The main visa families</h3>
          <ul className="mt-3 space-y-2 text-base text-slate-600 leading-relaxed list-disc pl-5">
            <li><strong>Work</strong> &mdash; including the <strong>Skilled Worker</strong> visa, which needs a job offer from a licensed sponsor.</li>
            <li><strong>Family / partner</strong> &mdash; spouse, partner, parent and similar routes under <strong>Appendix FM</strong>.</li>
            <li><strong>Study</strong> &mdash; the Student route for those with an offer from a licensed education provider.</li>
            <li><strong>Visit</strong> &mdash; the Standard Visitor route for tourism, family visits and certain business activities.</li>
            <li><strong>Business / talent</strong> &mdash; including <strong>Global Talent</strong> and other specialist routes.</li>
          </ul>

          <h3 className="mt-8 text-lg font-bold text-slate-900">How to identify the right route</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Start from your purpose and your circumstances: why you are coming, how long for, whether
            you have a job offer or family connection, and your current status. The official{" "}
            <a href="https://www.gov.uk/check-uk-visa" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">gov.uk/check-uk-visa</a>{" "}
            tool is a good first filter; this wizard adds the practical considerations that often
            decide a case.
          </p>

          <h3 className="mt-8 text-lg font-bold text-slate-900">Switching in-country vs applying from overseas</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Some routes let you switch while you remain in the UK; others require an application from
            outside the UK, and visitors generally cannot switch in-country. Whether switching is
            possible depends on your current status and the route you want, so it should be checked
            before you apply.
          </p>

          <h3 className="mt-8 text-lg font-bold text-slate-900">Sponsorship</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Most work routes require sponsorship &mdash; a job offer from an employer holding a Home
            Office <strong>sponsor licence</strong>, with a Certificate of Sponsorship for an eligible
            role. Family, visit and some talent routes do not need a sponsoring employer.
          </p>

          <h3 className="mt-8 text-lg font-bold text-slate-900">English-language and financial requirements</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Many routes require you to show a certain level of English and to meet a financial
            requirement &mdash; the exact level and the figures depend on the route and change over
            time. Do not rely on a remembered figure: check the current English-language and
            financial requirements for your route at{" "}
            <a href="https://www.gov.uk/browse/visas-immigration" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">gov.uk</a>.
          </p>

          <h3 className="mt-8 text-lg font-bold text-slate-900">When to take advice</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Advice is most valuable where there is complexity &mdash; a previous refusal, a financial
            gap, a switching question, a tight deadline, or a route you are unsure about. A solicitor
            can confirm the route, the evidence, and the realistic plan before you commit to a fee.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 lg:py-14 border-t border-slate-100">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">
            Frequently asked questions
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            UK visas &mdash; common questions
          </h2>
          <dl className="mt-6 divide-y divide-slate-100">
            {VISA_FAQS.map((f) => (
              <div key={f.question} className="py-5">
                <dt className="text-lg font-bold text-slate-900">{f.question}</dt>
                <dd className="mt-2 text-base text-slate-600 leading-relaxed">{f.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-slate-500 leading-relaxed">
            This page is general information about UK visa routes, reviewed by{" "}
            <Link href="/our-team/" className="font-semibold text-slate-700 hover:text-brand-red">{AUTHOR.name}</Link>{" "}
            (SRA #{AUTHOR.sraNumber}). It is not a substitute for tailored legal advice, and outcomes
            depend on the full evidence of your case.
          </p>
        </div>
      </section>

      <TeamStrip />

      <section className="bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-5 space-y-2">
          <p className="text-xs text-slate-400 text-center leading-relaxed">
            This page is general guidance, not legal advice. UKVI fees and the Immigration Health Surcharge change periodically — confirm current rates at gov.uk before applying. Past results do not guarantee future outcomes. Abrahams Solicitors · SRA-regulated firm #809071. Last reviewed: {LAST_REVIEWED} by {AUTHOR.name} (SRA #{AUTHOR.sraNumber}). Reviewed quarterly against Statements of Changes to the Immigration Rules.
          </p>
          <p className="text-xs text-slate-400 text-center leading-relaxed flex items-center justify-center gap-1.5">
            <Calendar className="h-3 w-3" /> Wizard logic last reviewed: {LAST_REVIEWED}. Page URL: {PAGE_URL}.
          </p>
        </div>
      </section>
    </>
  );
}
