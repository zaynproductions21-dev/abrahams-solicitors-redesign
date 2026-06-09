"use client";

/**
 * /ilr-wizard/ — standalone ILR (Indefinite Leave to Remain) wizard page.
 *
 * Built off the council-approved spec at docs/ilr-wizard-spec-v1.md (v1.0,
 * approved by Imran Shah on 20 May 2026). The wizard logic + UI lives in
 * <WizardWidget config={ILR_WIZARD_CONFIG} />.
 *
 * Same widget engine as /citizenship-wizard/; same brand framing as the
 * existing /visa-wizard/ standalone page (breadcrumb, hero, disclaimer
 * banner, content-quality block, team strip, footer disclaimer).
 *
 * Pre-req gates met:
 *   1. Council approval — 20 May 2026 (wholesale, including line copy)
 *   2. Engine refactor — config-driven WizardWidget shipped
 *   3. Imran sign-off on route logic — wholesale per spec doc
 */

import Link from "next/link";
import { TrustBadges } from "@/components/v6/trust-badges";
import { TeamStrip } from "@/components/v6/team-strip";
import { WizardWidget } from "@/components/v6/wizard-widget";
import { ILR_WIZARD_CONFIG } from "@/lib/wizards/ilr-config";
import { JsonLd, breadcrumbSchema, personSchema, faqPageSchema } from "@/components/v6/jsonld";
import { team } from "@/lib/team";
import {
  ChevronRight, ShieldCheck, Info, AlertCircle, Calendar,
} from "lucide-react";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/ilr-wizard/";
const LAST_REVIEWED = "May 2026";
const AUTHOR = team.find((t) => t.slug === "imran-shah")!;

const ILR_FAQS = [
  {
    question: "How long do I need to have lived in the UK to apply for ILR?",
    answer:
      "It depends on your route. Most work and family routes qualify for indefinite leave to remain after 5 years of continuous lawful residence; the long-residence route is based on 10 years of continuous lawful residence; and some routes (for example certain Global Talent and partner-of-British-citizen cases) can be shorter. The wizard helps identify which route fits your circumstances — always confirm the current qualifying period for your route on GOV.UK.",
  },
  {
    question: "How many days can I spend outside the UK without breaking continuous residence?",
    answer:
      "For most settlement routes the rule is no more than 180 days' absence in any rolling 12-month period across the qualifying years. The way absences are counted has changed over time and differs by route, so excessive or borderline absences should be checked carefully — see the Home Office long-residence and continuous-residence guidance on GOV.UK, and take advice if you are close to the limit.",
  },
  {
    question: "Do I have to pass the Life in the UK Test and an English test for ILR?",
    answer:
      "Yes — most ILR applicants must pass the Life in the UK Test and meet the English language requirement (usually B1 speaking and listening), unless they are exempt (for example by age, or on certain protection routes). A relevant UK degree can meet the English requirement but does not remove the Life in the UK Test.",
  },
  {
    question: "What happens if I have an absence over the limit, a gap in my leave, or a complex history?",
    answer:
      "Excess absences, gaps in leave, time on different visa categories, or suitability issues (such as previous refusals or criminal matters) do not automatically end your eligibility, but they need careful handling. Where the wizard reaches one of these fact patterns it routes you to a solicitor rather than guessing, because the outcome turns on the full evidence.",
  },
  {
    question: "How much does an ILR application cost?",
    answer:
      "The Home Office application fee (and any optional priority service) is set by the Home Office and changes periodically, so check the current amount at gov.uk before you apply. The Immigration Health Surcharge is generally not payable for ILR itself. Our own fixed fee for preparing the application is agreed in writing before any work begins.",
  },
  {
    question: "Can I travel outside the UK while my ILR application is pending?",
    answer:
      "It is usually best not to. If your existing leave expires while the application is pending you remain in the UK lawfully under section 3C leave, but that protection does not cover travel — leaving the UK can be treated as withdrawing the application. Speak to a solicitor before making any travel plans during the decision period.",
  },
  {
    question: "How soon after getting ILR can I apply for British citizenship?",
    answer:
      "Most people can apply for naturalisation 12 months after being granted ILR, provided they meet the residence, good-character and other requirements (those married to a British citizen may not need to wait the extra 12 months). We can help you plan the timing of a citizenship application after settlement.",
  },
];

export default function IlrWizardPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
          { name: "Immigration", url: "https://www.abrahamssolicitors.co.uk/immigration/" },
          { name: "UK ILR Wizard" },
        ])}
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
      <JsonLd data={faqPageSchema(ILR_FAQS)} />

      {/* Breadcrumb */}
      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/immigration/" className="hover:text-brand-red transition-colors">
              Immigration
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">UK ILR Wizard</span>
          </nav>
        </div>
      </section>

      {/* Hero + intro */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
              ILR Wizard · v1
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="h-3 w-3" />
              Free · No call · No spam
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Which UK settlement (ILR) route fits your situation?
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            Answer eight plain-English questions. We&rsquo;ll tell you which ILR route looks most
            relevant for your circumstances, with the rule reference, and whatever you should think
            about next.{" "}
            <strong className="text-slate-900">No call follows automatically</strong> — we only
            contact you if you specifically ask us to email the result.
          </p>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5 max-w-3xl">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" />
              <div className="text-sm text-slate-600 leading-relaxed">
                This wizard is a guide to which ILR route may apply,{" "}
                <strong className="text-slate-700">not legal advice</strong> and not a prediction
                of outcome. Home Office decisions turn on the full evidence of your case. Reviewed
                by{" "}
                <Link href="/our-team/" className="font-semibold text-slate-900 hover:text-brand-red">
                  {AUTHOR.name}
                </Link>{" "}
                — SRA #{AUTHOR.sraNumber} · admitted {AUTHOR.admittedYear} ·{" "}
                <a
                  href={AUTHOR.sraUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-red underline-offset-2 hover:underline"
                >
                  verify on SRA register
                </a>
                . Last reviewed: {LAST_REVIEWED}.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wizard widget */}
      <section className="py-10 lg:py-14 bg-slate-50/40">
        <div className="max-w-[760px] mx-auto px-6 lg:px-8">
          <WizardWidget config={ILR_WIZARD_CONFIG} source="ilr-wizard-standalone" />
        </div>
      </section>

      <TrustBadges />

      {/* Content-quality / E-E-A-T explainer */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">
            Why we built this
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Plain-English routing. No sales call. No spam.
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              Most people landing on an ILR page already know they need help — they don&rsquo;t
              know <em>which</em> route applies to their specific situation. The official UK
              government guidance at{" "}
              <a
                href="https://www.gov.uk/indefinite-leave-to-remain"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-red hover:underline"
              >
                gov.uk/indefinite-leave-to-remain
              </a>{" "}
              is comprehensive but doesn&rsquo;t flag the practical considerations that decide
              most cases (absences clocks, continuous-residence breaks, suitability rules,
              category-switch consequences).
            </p>
            <p>
              This wizard is eight plain-English questions written by{" "}
              <Link
                href="/our-team/"
                className="font-semibold text-slate-900 hover:text-brand-red"
              >
                {AUTHOR.name}
              </Link>{" "}
              ({AUTHOR.role}, SRA #{AUTHOR.sraNumber}, admitted {AUTHOR.admittedYear}) and
              reviewed against the current Immigration Rules. The output is a route name, the
              relevant rule reference, and what you should think about next — not a prediction of
              whether you will succeed.
            </p>
            <p>
              <strong className="text-slate-900">
                It is free, anonymous until you ask us to follow up by email, and there is no
                automatic call.
              </strong>{" "}
              If you want to book a free 30-minute consultation, that&rsquo;s a separate decision
              you make at the end.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border-2 border-slate-200 bg-slate-50 p-5 sm:p-6">
            <p className="text-sm font-semibold text-slate-900 mb-2">What this wizard isn&rsquo;t</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  It&rsquo;s not legal advice. A solicitor reviewing the full evidence will give
                  you a proper assessment.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  It&rsquo;s not a prediction of approval. Outcomes depend on your evidence, the
                  case officer, and case-specific facts the wizard can&rsquo;t see.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Where the answers reach a complex fact pattern (switched visa categories,
                  serious suitability questions, or any &ldquo;not sure&rdquo;), the wizard routes
                  to a solicitor consultation instead of guessing.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Depth: understanding ILR */}
      <section className="py-10 lg:py-14 bg-slate-50/40 border-t border-slate-100">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">
            Understanding UK settlement
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Indefinite Leave to Remain (ILR), explained
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              Indefinite Leave to Remain &mdash; also called <strong>settlement</strong> &mdash; is
              permanent immigration status in the UK. Once you have ILR there is no time limit on your
              stay, you are free of most visa conditions, and after a further qualifying period you can
              usually apply for British citizenship. Because settlement is decided on the whole of your
              immigration history, the route you qualify under and the continuity of your residence
              both matter.
            </p>
          </div>

          <h3 className="mt-8 text-lg font-bold text-slate-900">The main routes to ILR</h3>
          <ul className="mt-3 space-y-2 text-base text-slate-600 leading-relaxed list-disc pl-5">
            <li><strong>Five-year work routes</strong> &mdash; for example Skilled Worker, after five years of continuous qualifying residence.</li>
            <li><strong>Five-year family routes</strong> &mdash; partner or parent under Appendix FM.</li>
            <li><strong>Long residence</strong> &mdash; based on a continuous period of lawful residence (the qualifying period and how it is counted are set out in the Home Office long-residence guidance).</li>
            <li><strong>Protection routes</strong> &mdash; settlement following refugee status or humanitarian protection.</li>
            <li><strong>Other routes</strong> &mdash; including Global Talent and certain business routes, some of which can settle sooner.</li>
          </ul>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Confirm the current qualifying period for your route on{" "}
            <a href="https://www.gov.uk/indefinite-leave-to-remain" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">GOV.UK</a>.
          </p>

          <h3 className="mt-8 text-lg font-bold text-slate-900">Continuous residence and absences</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Most settlement routes require your residence to have been continuous, with no more than{" "}
            <strong>180 days&rsquo; absence in any rolling 12-month period</strong>. The way absences
            are counted has changed over time and varies by route, so if you are close to the limit, or
            have gaps in your leave, that needs checking carefully before you apply.
          </p>

          <h3 className="mt-8 text-lg font-bold text-slate-900">Life in the UK Test and English language</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Most applicants must pass the <strong>Life in the UK Test</strong> and meet the{" "}
            <strong>English language requirement</strong> (usually B1 speaking and listening), unless
            exempt by age or on certain protection routes. A relevant UK degree can satisfy the English
            requirement but does not remove the Life in the UK Test.
          </p>

          <h3 className="mt-8 text-lg font-bold text-slate-900">Suitability and good character</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            The Home Office also assesses suitability &mdash; criminal history, previous breaches or
            deception, and similar issues can affect an application. These do not automatically end your
            eligibility, but they should be addressed properly rather than left to chance.
          </p>

          <h3 className="mt-8 text-lg font-bold text-slate-900">Fees, processing and what happens after</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            The Home Office application fee and any optional priority service are set by the Home Office
            and change periodically &mdash; check the current amounts at{" "}
            <a href="https://www.gov.uk/indefinite-leave-to-remain" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">gov.uk</a>.
            Once granted, ILR is evidenced digitally (or by a biometric residence permit on older
            grantings). After 12 months with settled status &mdash; and subject to the good-character and
            residence rules &mdash; many people go on to apply for British citizenship. ILR can lapse if
            you spend a long continuous period outside the UK, so keep that in mind once settled.
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
            UK settlement (ILR) &mdash; common questions
          </h2>
          <dl className="mt-6 divide-y divide-slate-100">
            {ILR_FAQS.map((f) => (
              <div key={f.question} className="py-5">
                <dt className="text-lg font-bold text-slate-900">{f.question}</dt>
                <dd className="mt-2 text-base text-slate-600 leading-relaxed">{f.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-slate-500 leading-relaxed">
            This page is general information about UK settlement, reviewed by{" "}
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
            This page is general guidance, not legal advice. UKVI fees and the Immigration Health
            Surcharge change periodically — confirm current rates at gov.uk before applying. Past
            results do not guarantee future outcomes. Abrahams Solicitors · SRA-regulated firm
            #809071. Last reviewed: {LAST_REVIEWED} by {AUTHOR.name} (SRA #{AUTHOR.sraNumber}).
            Reviewed quarterly against Statements of Changes to the Immigration Rules.
          </p>
          <p className="text-xs text-slate-400 text-center leading-relaxed flex items-center justify-center gap-1.5">
            <Calendar className="h-3 w-3" /> Wizard logic last reviewed: {LAST_REVIEWED}. Page
            URL: {PAGE_URL}.
          </p>
        </div>
      </section>
    </>
  );
}
