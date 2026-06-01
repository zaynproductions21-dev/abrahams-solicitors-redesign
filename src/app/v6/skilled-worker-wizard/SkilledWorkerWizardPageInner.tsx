"use client";

/**
 * /skilled-worker-wizard/ — UK Skilled Worker triage wizard (client component).
 *
 * Built off the approved spec at docs/skilled-worker-wizard-spec-v1.md
 * (APPROVED v1.0 by Imran Shah on 1 June 2026).
 *
 * Wizard mechanics live in the shared <WizardWidget /> engine; the config
 * (5 questions + 7 routing outcomes + scoring function) lives in
 * src/lib/wizards/skilled-worker-config.ts.
 *
 * One thing this wizard does differently from the others:
 *   Outcome 1 (job-search deflection) is intentionally non-instructable.
 *   Its RouteResult carries `noFollowUp: true`. The WizardWidget could
 *   eventually special-case this to soften the email-capture wording —
 *   for v1 the result body itself makes the no-call default explicit so
 *   visitors know what to expect.
 *
 * Named solicitor for this wizard: Imran Shah (SRA #509359). Skilled
 * Worker and business immigration sit in his personal practice; Humaira
 * handles family routes.
 */

import Link from "next/link";
import { TrustBadges } from "@/components/v6/trust-badges";
import { TeamStrip } from "@/components/v6/team-strip";
import { WizardWidget } from "@/components/v6/wizard-widget";
import { SKILLED_WORKER_WIZARD_CONFIG } from "@/lib/wizards/skilled-worker-config";
import { JsonLd, breadcrumbSchema, personSchema } from "@/components/v6/jsonld";
import { team } from "@/lib/team";
import {
  ChevronRight, ShieldCheck, Info, AlertCircle, Calendar, ExternalLink,
} from "lucide-react";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/skilled-worker-wizard/";
const LAST_REVIEWED = "June 2026";
const AUTHOR = team.find((t) => t.slug === "imran-shah")!;

export default function SkilledWorkerWizardPageInner() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
          { name: "Immigration", url: "https://www.abrahamssolicitors.co.uk/immigration/" },
          { name: "Skilled Worker Wizard" },
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
            <span className="text-slate-600 font-medium">Skilled Worker Wizard</span>
          </nav>
        </div>
      </section>

      {/* Hero + intro */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
              Skilled Worker Wizard · v1
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="h-3 w-3" />
              Free · No call · No spam
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
            UK Skilled Worker visa — what&rsquo;s your next step?
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            Answer five plain-English questions about your situation. We&rsquo;ll route you to the
            right next step &mdash; whether that&rsquo;s urgent legal review (sponsor licence
            revoked, 60-day grace period, overstayer), a routine switching / extension case, an
            ILR application, or simply finding a sponsor first.{" "}
            <strong className="text-slate-900">No call follows automatically</strong> &mdash; we
            only contact you if you specifically ask us to email the result.
          </p>

          {/* gov.uk preflight callout — for visitors still job-hunting */}
          <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-5 max-w-3xl">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900 leading-relaxed">
                <strong>Still job-hunting and looking for a sponsor?</strong> You may not need a
                solicitor yet &mdash; you need an offer from a UK employer who holds a sponsor
                licence first. Search the{" "}
                <a
                  href="https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline hover:text-blue-700 inline-flex items-center gap-0.5"
                >
                  official register of licensed sponsors on gov.uk
                  <ExternalLink className="h-3 w-3" />
                </a>{" "}
                first; once you have a real offer, come back and the wizard will route you to the
                right instructable case.
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5 max-w-3xl">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" />
              <div className="text-sm text-slate-600 leading-relaxed">
                This wizard is a guide to which Skilled Worker step may apply,{" "}
                <strong className="text-slate-700">not legal advice</strong> and not a prediction
                of outcome. Home Office decisions turn on the full evidence of your case. Reviewed
                by{" "}
                <Link
                  href="/our-team/"
                  className="font-semibold text-slate-900 hover:text-brand-red"
                >
                  {AUTHOR.name}
                </Link>{" "}
                &mdash; SRA #{AUTHOR.sraNumber} · admitted {AUTHOR.admittedYear} ·{" "}
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
            config={SKILLED_WORKER_WIZARD_CONFIG}
            source="skilled-worker-wizard-standalone"
          />
        </div>
      </section>

      <TrustBadges />

      {/* Content-quality / E-E-A-T explainer */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">
            Why this wizard exists
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Five questions. Honest routing — including &ldquo;you don&rsquo;t need a solicitor yet.&rdquo;
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              Most Skilled Worker enquiries we receive by phone aren&rsquo;t instructable legal
              work. They&rsquo;re people looking for a sponsor &mdash; which a solicitor can&rsquo;t
              help with, because that&rsquo;s recruitment, not legal work. We built this wizard to
              triage in 60 seconds and tell each visitor what they actually need: gov.uk + LinkedIn
              if they&rsquo;re still job-hunting, urgent legal review if their licence has been
              revoked or they&rsquo;re on the 60-day clock, a routine application if they&rsquo;ve
              got an offer, or an ILR / family-route consultation if they&rsquo;re past those.
            </p>
            <p>
              The questions were written by{" "}
              <Link
                href="/our-team/"
                className="font-semibold text-slate-900 hover:text-brand-red"
              >
                {AUTHOR.name}
              </Link>{" "}
              ({AUTHOR.role}, SRA #{AUTHOR.sraNumber}, admitted {AUTHOR.admittedYear}) and reviewed
              against the current Immigration Rules (Appendix Skilled Worker, Appendix Continuous
              Residence, Appendix English Language, Appendix Finance, Paragraph 39E).
            </p>
            <p>
              <strong className="text-slate-900">
                It is free, anonymous until you ask us to follow up by email, and there is no
                automatic call.
              </strong>{" "}
              For the job-search deflection outcome we specifically don&rsquo;t default to a
              follow-up call &mdash; we send you the result and the useful gov.uk + LinkedIn links,
              and let you come back when you have a real offer.
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
                  It doesn&rsquo;t check Certificate of Sponsorship validity, SOC code salary
                  thresholds or RQF level &mdash; those are technical checks we do on the
                  consultation.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  It doesn&rsquo;t introduce you to sponsoring employers &mdash; that&rsquo;s
                  recruitment work, not legal work, and we&rsquo;ll tell you so honestly if
                  that&rsquo;s what you need.
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
            This page is general guidance, not legal advice. UKVI fees, Skilled Worker salary
            thresholds and SOC-code going rates change periodically &mdash; confirm current rates
            at gov.uk before applying. Past results do not guarantee future outcomes. Abrahams
            Solicitors · SRA-regulated firm #809071. Last reviewed: {LAST_REVIEWED} by{" "}
            {AUTHOR.name} (SRA #{AUTHOR.sraNumber}). Reviewed quarterly against Statements of
            Changes to the Immigration Rules.
          </p>
          <p className="text-xs text-slate-400 text-center leading-relaxed flex items-center justify-center gap-1.5">
            <Calendar className="h-3 w-3" /> Wizard logic last reviewed: {LAST_REVIEWED}. Page URL:{" "}
            {PAGE_URL}.
          </p>
        </div>
      </section>
    </>
  );
}
