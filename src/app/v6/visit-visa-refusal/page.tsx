"use client";

/**
 * Standalone /visit-visa-refusal/ page (Phase 2 wizard).
 *
 * Companion to /visa-wizard/ (Phase 1 — Spouse Visa). This page triages a
 * *refused* UK visit-visa application and routes the visitor to the right
 * next-step conversation (PAP-or-fresh specialist review, pattern-of-refusals
 * consultation, urgent dual track, fresh application long-gap, fresh
 * application strengthened, or refusal-review consultation).
 *
 * The wizard logic + UI lives in <VisitVisaRefusalWidget />. This page wraps
 * it in the breadcrumb, hero, disclaimer banner, content-quality block and
 * footer disclaimer needed for a canonical SEO-discoverable page that can
 * also be used as a Google Ads destination URL.
 *
 * Same widget is also embedded on /visa-refusal-appeal/ via the slug template.
 */

import Link from "next/link";
import { TrustBadges } from "@/components/v6/trust-badges";
import { TeamStrip } from "@/components/v6/team-strip";
import { VisitVisaRefusalWidget } from "@/components/v6/visit-visa-refusal-widget";
import {
  JsonLd, breadcrumbSchema, personSchema, faqPageSchema,
} from "@/components/v6/jsonld";
import { team } from "@/lib/team";
import {
  ChevronRight, ShieldCheck, Info, AlertCircle, Calendar,
} from "lucide-react";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/visit-visa-refusal/";
const LAST_REVIEWED = "May 2026";
const AUTHOR = team.find(t => t.slug === "imran-shah")!;

const VISIT_REFUSAL_FAQS = [
  {
    question: "Can I appeal a UK visit visa refusal?",
    answer:
      "In almost all cases, no. A standard visitor visa refusal usually carries no right of appeal and no administrative review. The realistic options are to make a fresh, better-evidenced application, or — where a human-rights issue or an unlawful decision arises — to consider a limited legal challenge such as a Pre-Action Protocol letter and, if necessary, Judicial Review (which is tightly time-limited). For most refusals, reapplying with stronger evidence is the practical route.",
  },
  {
    question: "How soon can I reapply after a visit visa refusal?",
    answer:
      "There is no fixed waiting period — you can reapply as soon as you are ready. But reapplying immediately without addressing the reason for refusal usually leads to another refusal. The better approach is to read the refusal letter carefully, fix the specific concerns the decision-maker raised, and only reapply once your evidence genuinely answers them.",
  },
  {
    question: "What evidence strengthens a re-application?",
    answer:
      "It depends on the refusal reason, but commonly: clearer evidence of your finances and how the trip is funded; stronger ties to your home country showing you will leave the UK at the end of the visit; a credible, well-documented itinerary; and, where relevant, proper sponsor and accommodation details. Each reason in the refusal letter should be answered directly with documents rather than assertions. Decisions are made by the Home Office on the facts of each case.",
  },
  {
    question: "Will a refusal harm my future applications?",
    answer:
      "A simple refusal must be disclosed in future applications but does not automatically bar you. However, where a refusal includes a finding that you used false documents or made a false representation, that can trigger a re-entry ban and serious suitability consequences under the suitability and paragraph 9 grounds. Those cases are far more serious and should be taken to a solicitor before any further application.",
  },
  {
    question: "Do I need a solicitor for a visit visa refusal?",
    answer:
      "Not always — a straightforward refusal can sometimes be addressed with a stronger fresh application. But advice is worth taking where there has been more than one refusal, where the refusal alleges deception or false documents, where there is a possible human-rights or unlawful-decision angle, or where you are unsure how to answer the reasons given. A solicitor can read the refusal letter against your original application and advise on the most realistic next step.",
  },
];

export default function VisitVisaRefusalPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
        { name: "Immigration", url: "https://www.abrahamssolicitors.co.uk/immigration/" },
        { name: "UK Visit Visa Refusal Wizard" },
      ])} />
      <JsonLd data={personSchema({
        name: AUTHOR.name,
        jobTitle: AUTHOR.role,
        sraNumber: AUTHOR.sraNumber,
        sraUrl: AUTHOR.sraUrl,
        bio: AUTHOR.short,
        slug: AUTHOR.slug,
      })} />
      <JsonLd data={faqPageSchema(VISIT_REFUSAL_FAQS)} />

      {/* Breadcrumb */}
      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/immigration/" className="hover:text-brand-red transition-colors">Immigration</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">UK Visit Visa Refusal Wizard</span>
          </nav>
        </div>
      </section>

      {/* Hero + intro */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-bold text-brand-red uppercase tracking-widest">Visa Wizard · v2 (Visit Visa Refusal)</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="h-3 w-3" />
              Free · No call · No spam
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
            UK visit visa refused? Find your next step in 60 seconds.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            Answer five plain-English questions. We&rsquo;ll tell you which next step looks most relevant — a fresh application with strengthened evidence, a Pre-Action Protocol challenge, or a specialist consultation — with the rule reference and what to think about next. <strong className="text-slate-900">No call follows automatically</strong> — we only contact you if you specifically ask us to email the result.
          </p>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5 max-w-3xl">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" />
              <div className="text-sm text-slate-600 leading-relaxed">
                This wizard is a guide to which next step may apply after a UK visit-visa refusal, <strong className="text-slate-700">not legal advice</strong> and not a prediction of outcome. Visit visas have no administrative review and no general right of appeal except on human rights grounds — the routes the wizard recommends reflect that.{" "}
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
          <VisitVisaRefusalWidget source="visit-visa-refusal-standalone" />
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
              Most people landing on a refused visit-visa page already know they need help — they don&rsquo;t know <em>which</em> route is realistic for their specific situation. The official UK government information at{" "}
              <a href="https://www.gov.uk/visit-visa-refused" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">gov.uk</a>
              {" "}is accurate but doesn&rsquo;t triage between the practical paths that actually exist after a refusal — a fresh application versus a Pre-Action Protocol challenge versus a specialist consultation.
            </p>
            <p>
              This wizard is five plain-English questions written by{" "}
              <Link href="/our-team/" className="font-semibold text-slate-900 hover:text-brand-red">{AUTHOR.name}</Link>{" "}
              ({AUTHOR.role}, SRA #{AUTHOR.sraNumber}, admitted {AUTHOR.admittedYear}) and reviewed against the current Immigration Rules and Civil Procedure Rules for Judicial Review. The output is a route name, the relevant rule reference, and what you should think about next — not a prediction of whether a challenge or fresh application will succeed.
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
                <span>It&rsquo;s not legal advice. A solicitor reviewing the full refusal letter and your original application will give you a proper assessment.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>It&rsquo;s not a prediction of approval. Outcomes depend on the full evidence, the case officer, and case-specific facts the wizard can&rsquo;t see.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>It covers UK visit-visa refusals only. For other refusal types (spouse, work, settlement) ask us directly.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Depth: understanding visit visa refusals */}
      <section className="py-10 lg:py-14 bg-slate-50/40 border-t border-slate-100">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">
            Understanding visit visa refusals
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Why visit visas are refused &mdash; and what you can actually do
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              A UK Standard Visitor visa refusal is frustrating, but it is rarely the end of the road.
              The key thing to understand is that the realistic next step is almost always a fresh,
              better-evidenced application rather than an appeal &mdash; because standard visit visa
              refusals usually carry <strong>no right of appeal and no administrative review</strong>.
              Understanding the reason for refusal, and answering it with evidence, is what matters.
            </p>
          </div>

          <h3 className="mt-8 text-lg font-bold text-slate-900">Common refusal reasons</h3>
          <ul className="mt-3 space-y-2 text-base text-slate-600 leading-relaxed list-disc pl-5">
            <li><strong>Not a genuine visitor</strong> &mdash; the decision-maker is not satisfied you genuinely intend to visit and will leave the UK at the end of your stay.</li>
            <li><strong>Finances</strong> &mdash; insufficient or unexplained funds, or unclear evidence of how the trip is paid for.</li>
            <li><strong>Sponsor / accommodation</strong> &mdash; weak or missing detail about where you will stay and who is supporting the visit.</li>
            <li><strong>Immigration history</strong> &mdash; previous overstays, refusals or breaches that raise doubt.</li>
            <li><strong>Mandatory refusals</strong> &mdash; suitability issues under the suitability and paragraph 9 grounds, including a finding of false documents or false representations.</li>
          </ul>

          <h3 className="mt-8 text-lg font-bold text-slate-900">Appeal, review, or reapply?</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Standard visit visa refusals <strong>usually carry no right of appeal and no
            administrative review</strong>. In practice that leaves two paths: a fresh application
            with stronger evidence, or &mdash; only where a human-rights issue or an unlawful decision
            genuinely arises &mdash; a limited legal challenge such as a Pre-Action Protocol letter and,
            if needed, Judicial Review, which is strictly time-limited. For most refusals, reapplying
            is the right route.
          </p>

          <h3 className="mt-8 text-lg font-bold text-slate-900">Addressing each refusal reason with evidence</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            The refusal letter sets out each concern. A strong re-application answers them one by one
            with documents rather than assertions &mdash; clearer financial evidence, stronger ties to
            your home country, a credible itinerary, and proper sponsor and accommodation details.
            The official information is at{" "}
            <a href="https://www.gov.uk/standard-visitor" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">gov.uk</a>.
          </p>

          <h3 className="mt-8 text-lg font-bold text-slate-900">When a refusal is more serious</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            A finding of <strong>false documents or false representations</strong> is in a different
            category &mdash; it can trigger a re-entry ban and serious suitability consequences. These
            cases should be taken to a solicitor before any further application, because the wrong move
            can make matters worse.
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
            UK visit visa refusal &mdash; common questions
          </h2>
          <dl className="mt-6 divide-y divide-slate-100">
            {VISIT_REFUSAL_FAQS.map((f) => (
              <div key={f.question} className="py-5">
                <dt className="text-lg font-bold text-slate-900">{f.question}</dt>
                <dd className="mt-2 text-base text-slate-600 leading-relaxed">{f.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-slate-500 leading-relaxed">
            This page is general information about UK visit visa refusals, reviewed by{" "}
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
            This page is general guidance, not legal advice. Visit visas have no administrative review and no general right of appeal except on human rights grounds (Immigration Act 2014). Judicial Review must be brought within 3 months of the original decision under CPR 54.5. UKVI fees change periodically — confirm current rates at gov.uk before applying. Past results do not guarantee future outcomes. Abrahams Solicitors · SRA-regulated firm #809071. Last reviewed: {LAST_REVIEWED} by {AUTHOR.name} (SRA #{AUTHOR.sraNumber}). Reviewed quarterly against Statements of Changes to the Immigration Rules.
          </p>
          <p className="text-xs text-slate-400 text-center leading-relaxed flex items-center justify-center gap-1.5">
            <Calendar className="h-3 w-3" /> Wizard logic last reviewed: {LAST_REVIEWED}. Page URL: {PAGE_URL}.
          </p>
        </div>
      </section>
    </>
  );
}
