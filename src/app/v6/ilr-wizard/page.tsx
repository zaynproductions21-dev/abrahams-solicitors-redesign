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
import { JsonLd, breadcrumbSchema, personSchema } from "@/components/v6/jsonld";
import { team } from "@/lib/team";
import {
  ChevronRight, ShieldCheck, Info, AlertCircle, Calendar,
} from "lucide-react";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/ilr-wizard/";
const LAST_REVIEWED = "May 2026";
const AUTHOR = team.find((t) => t.slug === "imran-shah")!;

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
