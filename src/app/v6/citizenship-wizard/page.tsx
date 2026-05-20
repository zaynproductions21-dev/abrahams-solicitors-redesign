"use client";

/**
 * /citizenship-wizard/ — standalone British Citizenship (Naturalisation)
 * wizard page.
 *
 * Built off the council-approved spec at docs/citizenship-wizard-spec-v1.md
 * (v1.0, approved by Imran Shah on 20 May 2026). The wizard logic + UI lives
 * in <WizardWidget config={CITIZENSHIP_WIZARD_CONFIG} />.
 *
 * Council note: 4 questions only — deliberately shorter than the ILR wizard,
 * because Citizenship inherits ILR's gates (B1 English + Life in UK Test
 * already evidenced at the ILR stage). Re-asking adds friction.
 *
 * The "British by birth?" path is handled BEFORE the wizard with a link to
 * gov.uk's check tool, per Council recommendation.
 */

import Link from "next/link";
import { TrustBadges } from "@/components/v6/trust-badges";
import { TeamStrip } from "@/components/v6/team-strip";
import { WizardWidget } from "@/components/v6/wizard-widget";
import { CITIZENSHIP_WIZARD_CONFIG } from "@/lib/wizards/citizenship-config";
import { JsonLd, breadcrumbSchema, personSchema } from "@/components/v6/jsonld";
import { team } from "@/lib/team";
import {
  ChevronRight, ShieldCheck, Info, AlertCircle, Calendar, ExternalLink,
} from "lucide-react";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/citizenship-wizard/";
const LAST_REVIEWED = "May 2026";
const AUTHOR = team.find((t) => t.slug === "imran-shah")!;

export default function CitizenshipWizardPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
          { name: "Immigration", url: "https://www.abrahamssolicitors.co.uk/immigration/" },
          { name: "British Citizenship Wizard" },
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
            <span className="text-slate-600 font-medium">British Citizenship Wizard</span>
          </nav>
        </div>
      </section>

      {/* Hero + intro */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
              Citizenship Wizard · v1
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="h-3 w-3" />
              Free · No call · No spam
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Which British citizenship route fits your situation?
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            Answer four plain-English questions. We&rsquo;ll tell you which naturalisation route
            looks most relevant, with the statute reference, and whatever you should think about
            next.{" "}
            <strong className="text-slate-900">No call follows automatically</strong> — we only
            contact you if you specifically ask us to email the result.
          </p>

          {/* gov.uk preflight callout — for people who may already be British by birth */}
          <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-5 max-w-3xl">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900 leading-relaxed">
                <strong>Born in the UK or to British parents?</strong> You may already be a
                British citizen and not need to naturalise at all —{" "}
                <a
                  href="https://www.gov.uk/check-british-citizen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline hover:text-blue-700 inline-flex items-center gap-0.5"
                >
                  check on gov.uk
                  <ExternalLink className="h-3 w-3" />
                </a>{" "}
                before using this tool.
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5 max-w-3xl">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" />
              <div className="text-sm text-slate-600 leading-relaxed">
                This wizard is a guide to which naturalisation route may apply,{" "}
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
          <WizardWidget
            config={CITIZENSHIP_WIZARD_CONFIG}
            source="citizenship-wizard-standalone"
          />
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
            Four questions. Plain English. Honest routing.
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              British citizenship is mostly a gating check on top of ILR — most prerequisites
              (B1 English, Life in UK Test) are evidenced when you got settlement, and don&rsquo;t
              need re-asking. So this wizard is short: four questions on status, residence,
              spouse, and absences. The output is the relevant section of the British Nationality
              Act 1981 and what to think about next — not a prediction of approval.
            </p>
            <p>
              The questions were written by{" "}
              <Link
                href="/our-team/"
                className="font-semibold text-slate-900 hover:text-brand-red"
              >
                {AUTHOR.name}
              </Link>{" "}
              ({AUTHOR.role}, SRA #{AUTHOR.sraNumber}, admitted {AUTHOR.admittedYear}) and
              reviewed against current Home Office guidance.
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
                  It doesn&rsquo;t check the good-character test in detail — that&rsquo;s a
                  consultation conversation, not a checkbox.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  It doesn&rsquo;t cover children registering as British under MN1 — that&rsquo;s
                  a separate application family with its own rules.
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
            This page is general guidance, not legal advice. UKVI fees and Home Office processing
            times change periodically — confirm current rates at gov.uk before applying. Past
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
