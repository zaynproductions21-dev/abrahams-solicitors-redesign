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
import { JsonLd, breadcrumbSchema, personSchema, faqPageSchema } from "@/components/v6/jsonld";
import { team } from "@/lib/team";
import {
  ChevronRight, ShieldCheck, Info, AlertCircle, Calendar, ExternalLink,
} from "lucide-react";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/citizenship-wizard/";
const LAST_REVIEWED = "May 2026";
const AUTHOR = team.find((t) => t.slug === "imran-shah")!;

const CITIZENSHIP_FAQS = [
  {
    question: "How long must I have lived in the UK before I can apply for naturalisation?",
    answer:
      "Under section 6(1) of the British Nationality Act 1981 the residence requirement is commonly 5 years' lawful residence in the UK, and you must usually have held indefinite leave to remain or settled status for at least 12 months before you apply. If you are married to or the civil partner of a British citizen you may apply under section 6(2) after 3 years' residence, and the extra 12-month wait after settlement does not apply to that route. Always confirm the current residence and absence requirements for your route on GOV.UK.",
  },
  {
    question: "Can I apply for British citizenship online?",
    answer:
      "Naturalisation is applied for on Home Office form AN; the application is started online but you book and attend a biometrics appointment afterwards, and supporting documents are submitted as directed. It is not an instant online grant. Because the good-character and absence questions can be involved, many people choose to have the application checked before it is submitted.",
  },
  {
    question: "I have EU settled status — can I use that to naturalise?",
    answer:
      "Settled status under the EU Settlement Scheme is a form of indefinite leave and can count as the settled status needed for naturalisation. You will still normally need to have held it for 12 months (unless applying as the spouse of a British citizen under section 6(2)) and to meet the residence, absence, good-character, Life in the UK Test and English requirements. The day-counting of absences in your qualifying period should be checked against the published Home Office guidance on GOV.UK.",
  },
  {
    question: "What is the good-character requirement?",
    answer:
      "Applicants aged 10 or over must satisfy the Home Office that they are of good character. This covers matters such as criminal convictions, immigration breaches, deception, financial soundness (including tax and bankruptcy) and similar issues. It is assessed on the whole picture rather than a single checkbox, so where there is any history it is worth taking advice before applying.",
  },
  {
    question: "Will I have to give up my current nationality? Is dual nationality allowed?",
    answer:
      "The UK permits dual (and multiple) nationality, so becoming a British citizen does not require you to renounce another nationality as far as UK law is concerned. However, some other countries do not allow their nationals to hold another citizenship — you should check the rules of your country of origin separately, as that is a matter for that country's law, not the UK's.",
  },
  {
    question: "Do I still have to pass the Life in the UK Test and an English test?",
    answer:
      "Yes — most applicants must have passed the Life in the UK Test and meet the English language requirement (usually level B1 speaking and listening), unless they are exempt by age or another ground. Many people already met these at the ILR stage, but the requirements still apply at naturalisation.",
  },
  {
    question: "What happens after I am approved — and what if I am refused?",
    answer:
      "If approved, you are invited to a citizenship ceremony where you make an oath or affirmation and pledge; your citizenship dates from the ceremony. If an application is refused, you can usually ask for reconsideration of the decision or make a fresh, better-evidenced application addressing the reason for refusal — there is no general right of appeal against a naturalisation refusal. The Home Office application fee is set by the Home Office and changes periodically, so check the current amount at gov.uk.",
  },
];

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
      <JsonLd data={faqPageSchema(CITIZENSHIP_FAQS)} />

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

      {/* Depth: understanding naturalisation */}
      <section className="py-10 lg:py-14 bg-slate-50/40 border-t border-slate-100">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">
            Understanding British citizenship
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            Naturalisation and registration, explained
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              Becoming a British citizen as an adult almost always means{" "}
              <strong>naturalisation</strong> under the British Nationality Act 1981. It is the
              final step after settlement &mdash; you must already hold indefinite leave to remain
              or settled status, and meet a set of residence, character and knowledge requirements.
              Children usually become British a different way (registration), and some people are
              already British by birth or descent without realising it.
            </p>
          </div>

          <h3 className="mt-8 text-lg font-bold text-slate-900">The main routes</h3>
          <ul className="mt-3 space-y-2 text-base text-slate-600 leading-relaxed list-disc pl-5">
            <li><strong>Naturalisation under section 6(1)</strong> &mdash; the standard adult route, based on 5 years&rsquo; residence plus holding ILR/settled status for 12 months.</li>
            <li><strong>Naturalisation under section 6(2)</strong> &mdash; for spouses and civil partners of British citizens, based on 3 years&rsquo; residence; the extra 12-month wait after settlement does not apply.</li>
            <li><strong>Registration of children</strong> &mdash; a separate application family for those under 18, with its own rules.</li>
          </ul>

          <h3 className="mt-8 text-lg font-bold text-slate-900">Residence and holding settled status</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Most adults need <strong>5 years&rsquo;</strong> lawful residence (or <strong>3 years</strong>{" "}
            if married to a British citizen) and, for the section 6(1) route, to have held ILR or
            settled status for <strong>12 months</strong> before applying. EU Settlement Scheme settled
            status can count as the settled status required.
          </p>

          <h3 className="mt-8 text-lg font-bold text-slate-900">Absences from the UK</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            There are published limits on the days you can spend outside the UK during your qualifying
            period, and the Home Office can exercise discretion in some cases. The day-count rules
            change and are applied carefully, so check the current naturalisation guidance on{" "}
            <a href="https://www.gov.uk/apply-citizenship-indefinite-leave-to-remain" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">GOV.UK</a>{" "}
            and take advice if your absences are borderline.
          </p>

          <h3 className="mt-8 text-lg font-bold text-slate-900">Life in the UK Test and English</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Most applicants must have passed the <strong>Life in the UK Test</strong> and meet the{" "}
            <strong>English language requirement</strong> (usually B1 speaking and listening), unless
            exempt by age or another ground.
          </p>

          <h3 className="mt-8 text-lg font-bold text-slate-900">Good character</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Applicants aged 10 or over must satisfy the <strong>good-character requirement</strong>.
            This looks at criminal history, immigration breaches, deception and financial matters
            among others, assessed on the whole picture. Where there is any history, it is best
            addressed properly rather than left to chance.
          </p>

          <h3 className="mt-8 text-lg font-bold text-slate-900">The ceremony and dual nationality</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            If approved you attend a <strong>citizenship ceremony</strong> and make an oath or
            affirmation and pledge; your citizenship dates from that ceremony. The UK allows{" "}
            <strong>dual nationality</strong>, so you do not have to renounce another citizenship as
            far as UK law is concerned &mdash; though you should check whether your country of origin
            permits it. The Home Office application fee is set by the Home Office and changes
            periodically &mdash; check the current amount at{" "}
            <a href="https://www.gov.uk/apply-citizenship-indefinite-leave-to-remain" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">gov.uk</a>.
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
            British citizenship &mdash; common questions
          </h2>
          <dl className="mt-6 divide-y divide-slate-100">
            {CITIZENSHIP_FAQS.map((f) => (
              <div key={f.question} className="py-5">
                <dt className="text-lg font-bold text-slate-900">{f.question}</dt>
                <dd className="mt-2 text-base text-slate-600 leading-relaxed">{f.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-slate-500 leading-relaxed">
            This page is general information about British citizenship, reviewed by{" "}
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
