"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrustBadges } from "@/components/v6/trust-badges";
import { TeamStrip } from "@/components/v6/team-strip";
import { VisaQualifier } from "@/components/v6/visa-qualifier";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import {
  JsonLd,
  faqPageSchema,
  breadcrumbSchema,
  speakableSchema,
  personSchema,
  legalServiceWithCatalogSchema,
} from "@/components/v6/jsonld";
import { team } from "@/lib/team";
import {
  Phone, ChevronRight, ChevronDown, ShieldCheck, CheckCircle2,
  AlertCircle, AlertTriangle, Scale, FileCheck2, Clock, BadgeCheck,
  ExternalLink, Calendar, X,
} from "lucide-react";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/uk-dependent-parent-visa/";
const LAST_REVIEWED = "May 2026";
const AUTHOR = team.find(t => t.slug === "imran-shah")!;

const FAQS: { question: string; answer: string }[] = [
  {
    question: "Who qualifies for the UK Adult Dependent Relative visa?",
    answer:
      "The Adult Dependent Relative (ADR) visa is for a parent, grandparent, sibling aged over 18, or adult child of a British citizen or person with settled status in the UK. The eligibility framework is at Appendix FM Section EC-DR of the Immigration Rules. Five requirements apply at E-ECDR.2.1 to E-ECDR.3.2: the relationship type, the applicant&rsquo;s age (over 18 with limited exceptions), the long-term personal-care need (caused by age, illness or disability), the lack of suitable or affordable care in the country of residence, and the sponsor&rsquo;s ability to maintain and accommodate the applicant in the UK without recourse to public funds. All five must be satisfied — failing any one is fatal to the application.",
  },
  {
    question: "Why are most Adult Dependent Relative applications refused?",
    answer:
      "Home Office published immigration statistics show that since the rules were tightened in July 2012, ADR grant rates have remained extremely low. The Independent Chief Inspector of Borders and Immigration (ICIBI) inspection of the route published in 2016 confirmed grant rates of around 4-6%, and subsequent Home Office quarterly statistics have shown similar figures. The single most common refusal reason is the requirement at E-ECDR.2.5 that care be unavailable or unaffordable in the country of residence — this is interpreted strictly. The Court of Appeal in <em>R (Britcits) v Secretary of State for the Home Department</em> [2017] EWCA Civ 368 upheld the rules but clarified that the test is about the practical level of care needed, not the applicant&rsquo;s preference to live near family. Applicants with means in their home country, or who have local relatives able to provide care, almost always fail.",
  },
  {
    question: "What evidence does the Home Office require for an Adult Dependent Relative visa?",
    answer:
      "Three layers of evidence are essential. First, medical evidence — a detailed report from the applicant&rsquo;s doctor identifying the specific care tasks the applicant cannot perform alone (washing, dressing, cooking, mobility, medication management). Second, evidence about care availability in the home country — written statements from local care providers showing what services exist, what they cost, and why those services cannot meet the applicant&rsquo;s needs. Third, sponsor evidence — the UK-based sponsor&rsquo;s financial position (bank statements, payslips, accounts) plus accommodation details. Appendix FM-SE sets the documentary requirements. Anything less than this comprehensive package will almost always result in refusal. Applications that succeed are typically those built around independent expert evidence, not just family statements.",
  },
  {
    question: "Can I appeal an Adult Dependent Relative visa refusal?",
    answer:
      "Yes — most ADR refusals carry a right of appeal to the First-tier Tribunal (Immigration and Asylum Chamber) on human rights grounds under Article 8 of the European Convention on Human Rights. The deadline is 28 days from the date the decision was sent (14 days if you are inside the UK). Appeals are heard on the papers or at an oral hearing, and the tribunal will reconsider the evidence afresh. Tribunal success on ADR appeals is possible but difficult — the appellate court has consistently held that the Rules are a complete code for ordinary cases and Article 8 only succeeds where there are exceptional circumstances. If your refusal is appealable, we will assess the merits with you at the free assessment before you commit to instructing us.",
  },
  {
    question: "Can my parent come to the UK on a visit visa instead?",
    answer:
      "A standard visit visa lets a parent come to the UK for up to six months at a time, but it is not a substitute for the Adult Dependent Relative route. Visit visas are granted on the strict condition that the applicant intends to leave the UK at the end of their visit and does not intend to live or settle here. If the parent overstays, applies for further leave from inside the UK, or shows an obvious intention to settle, the visit visa can be refused or curtailed. There is also no NHS access on a visit visa beyond emergency treatment. For families with elderly parents who clearly need long-term UK-based care, the Adult Dependent Relative route — difficult as it is — is the only route. We will tell you honestly at the free assessment whether your circumstances fit.",
  },
];

const REQUIREMENTS = [
  { title: "Relationship", desc: "Parent, grandparent, sibling over 18, or adult child of a British citizen or settled person (E-ECDR.2.1)." },
  { title: "Age & circumstances", desc: "Applicant aged 18 or over (E-ECDR.2.2). Below 18 only applies in limited cases." },
  { title: "Long-term personal care need", desc: "As a result of age, illness or disability the applicant requires long-term personal care to perform everyday tasks (E-ECDR.2.4)." },
  { title: "No suitable care available locally", desc: "The applicant must be unable, even with the practical and financial help of the sponsor, to obtain the required level of care in their country (E-ECDR.2.5)." },
  { title: "Sponsor maintenance & accommodation", desc: "The sponsor must be able to maintain, accommodate and care for the applicant without recourse to public funds (E-ECDR.3.1, 3.2)." },
];

const STATUTES = [
  {
    name: "Appendix FM, Section EC-DR (E-ECDR.2.1–3.2)",
    what: "The eligibility framework for entry clearance as an Adult Dependent Relative — relationship, age, care needs, lack of care available locally, and sponsor maintenance.",
    href: "https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-fm-family-members",
  },
  {
    name: "R (Britcits) v Secretary of State for the Home Department [2017] EWCA Civ 368",
    what: "Court of Appeal upheld the post-2012 ADR rules but clarified that the care-availability test relates to the practical level of care required.",
    href: "https://www.bailii.org/ew/cases/EWCA/Civ/2017/368.html",
  },
  {
    name: "Article 8, European Convention on Human Rights",
    what: "Right to respect for private and family life — relevant on appeal where refusal under the Rules would be a disproportionate interference with established family life.",
    href: "https://www.echr.coe.int/documents/d/echr/Convention_ENG",
  },
  {
    name: "GEN.3.2, Appendix FM",
    what: "The exceptional-circumstances provision allowing the Home Office to grant leave outside the Rules where refusal would breach Article 8 ECHR.",
    href: "https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-fm-family-members",
  },
];

const ALTERNATIVES = [
  {
    name: "Adult Dependent Relative visa",
    summary: "Settlement route. Permanent if granted.",
    bullets: [
      "Five strict requirements under Appendix FM EC-DR all need to be satisfied",
      "Grant rates around 4-6% (Home Office data)",
      "Full NHS access and right to settle",
      "Right of appeal on Article 8 grounds if refused",
    ],
    tone: "primary" as const,
  },
  {
    name: "Long-stay visit visa",
    summary: "Temporary visits of up to 6 months at a time, up to 10 years total.",
    bullets: [
      "Granted on condition the applicant intends to leave the UK",
      "No NHS access beyond emergency treatment",
      "Cannot be used as a settlement route — overstaying triggers re-entry bans",
      "Suitable for parents who want to visit family regularly but live abroad",
    ],
    tone: "neutral" as const,
  },
  {
    name: "Article 8 outside the Rules",
    summary: "Residual route — only succeeds in exceptional circumstances.",
    bullets: [
      "Available where refusal under the Rules would breach Article 8 family-life rights",
      "Applied via GEN.3.2 of Appendix FM and on appeal",
      "Requires evidence of established family life, dependency, and disproportionate interference",
      "Higher chance of success on appeal than at first instance",
    ],
    tone: "neutral" as const,
  },
];

export default function UkDependentParentVisaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <JsonLd data={legalServiceWithCatalogSchema({
        name: "UK Adult Dependent Relative Visa Solicitors",
        description: "Solicitor-led applications and appeals on the UK Adult Dependent Relative route under Appendix FM Section EC-DR of the Immigration Rules. Honest assessment of eligibility, evidence packages and Article 8 appeals. SRA-regulated firm #809071.",
        slug: "uk-dependent-parent-visa",
        author: { name: AUTHOR.name, sraUrl: AUTHOR.sraUrl },
        catalog: [
          { name: "Adult Dependent Relative entry clearance", description: "Application under Appendix FM Section EC-DR for a parent, grandparent or other adult relative requiring long-term care." },
          { name: "ADR refusal appeal", description: "First-tier Tribunal appeals on Article 8 grounds against ADR refusals." },
          { name: "Article 8 outside the Rules", description: "Applications and appeals under GEN.3.2 of Appendix FM where the strict ADR rules cannot be met but family life is established." },
          { name: "Pre-application strategy review", description: "Honest assessment of whether your circumstances fit the route before any application is made." },
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
      <JsonLd data={faqPageSchema(FAQS)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
        { name: "Immigration", url: "https://www.abrahamssolicitors.co.uk/immigration/" },
        { name: "UK Adult Dependent Relative Visa" },
      ])} />
      <JsonLd data={speakableSchema([
        "#hero-lead",
        "#what-is-adr",
        "#faq-answer-0",
        "#faq-answer-1",
        "#faq-answer-2",
        "#faq-answer-3",
        "#faq-answer-4",
      ])} />

      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/immigration/" className="hover:text-brand-red transition-colors">Immigration</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">Adult Dependent Relative</span>
          </nav>
        </div>
      </section>

      <section className="relative bg-white border-b border-slate-100 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-bold text-brand-red uppercase tracking-widest">Adult Dependent Relative</span>
                <span className="text-xs font-bold text-white bg-brand-red px-3 py-1 rounded-full">Honest assessment first</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="h-3 w-3" />
                  SRA #809071
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
                Bring an elderly parent to live with you in the UK
              </h1>

              <p id="hero-lead" className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                The UK Adult Dependent Relative route lets a parent, grandparent or adult child of a British citizen or settled person join them in the UK if they require long-term personal care that is not available or affordable locally. It is the most restrictive UK family route — Home Office published data and the 2016 ICIBI inspection found grant rates around <strong className="text-slate-900">4-6%</strong>. The route is governed by <strong className="text-slate-900">Appendix FM, Section EC-DR of the Immigration Rules</strong>.
              </p>

              {/* Honesty banner — SRA-compliant rephrase */}
              <div className="mt-5 rounded-xl border-2 border-amber-200 bg-amber-50 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-amber-900">Be informed before you instruct</p>
                    <p className="mt-1 text-sm text-amber-800 leading-relaxed">
                      We only accept Adult Dependent Relative instructions where, on the evidence available, we believe there is a properly arguable case under Appendix FM EC-DR. We tell you honestly at the free assessment whether your circumstances fit — most enquiries do not, and we will say so. Where they do, we build the application around independent medical and care evidence that gives the strongest possible chance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <DynamicCallLink className="inline-flex items-center justify-center bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide px-6 h-12">
                  <Phone className="h-4 w-4 mr-2" />
                  <DynamicPhoneText />
                </DynamicCallLink>
                <Button asChild variant="outline" size="lg" className="rounded-lg text-sm font-semibold h-12 border-slate-300 text-slate-800 hover:border-brand-red hover:text-brand-red">
                  <a href="#qualifier">Free 60-second check</a>
                </Button>
                <a href="#qualifier" className="text-sm font-semibold text-brand-red hover:underline">
                  Or request a callback →
                </a>
              </div>

              <div className="mt-7 flex items-center gap-3 pt-5 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-sm">
                  IS
                </div>
                <div>
                  <p className="text-sm text-slate-700">
                    Reviewed by <Link href="/our-team/" className="font-semibold text-slate-900 hover:text-brand-red">{AUTHOR.name}</Link> — {AUTHOR.role.toLowerCase()}.
                  </p>
                  <p className="text-xs text-slate-400">
                    SRA #{AUTHOR.sraNumber} · Admitted {AUTHOR.admittedYear} · Litigation experience matters because most ADR cases that succeed do so on appeal ·{" "}
                    <a href={AUTHOR.sraUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-red underline-offset-2 hover:underline">
                      Verify on SRA register
                    </a>
                  </p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Last reviewed: {LAST_REVIEWED}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                {[
                  { icon: BadgeCheck, text: "Fixed fees, no hidden costs" },
                  { icon: Scale, text: "Solicitor-led, never paralegals" },
                  { icon: Clock, text: "Callback within the hour" },
                ].map(t => (
                  <div key={t.text} className="flex items-center gap-2 text-xs text-slate-500">
                    <t.icon className="h-4 w-4 text-brand-red" />{t.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 min-w-0" id="qualifier">
              <VisaQualifier
                source="uk-dependent-parent-visa-qualifier"
                service="[Wizard] UK Adult Dependent Relative Visa"
                step1={{
                  heading: "Where is the applicant now?",
                  helper: "And do they have a long-term care need?",
                  options: [
                    { value: "abroad-with-need", label: "Outside UK, with long-term care need" },
                    { value: "abroad-no-need", label: "Outside UK, no significant care need yet" },
                    { value: "uk-overstay", label: "In UK, on visit visa or overstay" },
                    { value: "uk-other-leave", label: "In UK on other limited leave" },
                  ],
                  positive: ["abroad-with-need"],
                  negative: ["abroad-no-need", "uk-overstay"],
                }}
                step2={{
                  heading: "Is care available locally to them?",
                  helper: "Either practically (relatives, providers) or affordably (means).",
                  options: [
                    { value: "no-care", label: "No suitable care available, no relatives, no means" },
                    { value: "partial-care", label: "Some care exists but inadequate for their needs" },
                    { value: "care-exists", label: "Care or relatives are locally available" },
                    { value: "unsure", label: "Not sure — need advice" },
                  ],
                  positive: ["no-care"],
                  negative: ["care-exists"],
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* Stat strip with CITED source per SRA Standard 8.8 */}
      <section className="bg-brand-navy py-7 lg:py-9">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-center sm:text-left">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-brand-gold">~4-6%</p>
              <p className="mt-1 text-sm text-white/80 leading-snug">Reported grant rates for Adult Dependent Relative applications since 2012. Source: Independent Chief Inspector of Borders and Immigration inspection (2016) and Home Office published immigration statistics.</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-brand-gold">12+ weeks</p>
              <p className="mt-1 text-sm text-white/80 leading-snug">UKVI standard service for entry clearance. Complex cases routinely take longer. Confirm current processing times at gov.uk before applying.</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-brand-gold">Article 8 appeal</p>
              <p className="mt-1 text-sm text-white/80 leading-snug">Most refusals carry a right of appeal to the First-tier Tribunal on human rights grounds. 28-day deadline.</p>
            </div>
          </div>
          <p className="mt-5 text-[11px] text-white/40 text-center sm:text-left">
            Past results do not guarantee future outcomes. UKVI fees and rules change — confirm current rates at gov.uk. This page is general guidance, not legal advice.
          </p>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">The basics</p>
          <h2 id="what-is-adr" className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
            What is the UK Adult Dependent Relative visa?
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              The Adult Dependent Relative (ADR) route is the only UK visa route designed for an adult family member — a parent, grandparent, sibling over 18, or adult child — to settle permanently with a British citizen or settled relative. The framework is at <strong className="text-slate-900">Appendix FM, Section EC-DR of the Immigration Rules</strong>, with eligibility requirements at E-ECDR.2.1 to E-ECDR.3.2.
            </p>
            <p>
              The route was substantially tightened on 9 July 2012. Before that change, an ADR applicant had only to show financial dependence and a relationship to the UK sponsor. Since 2012, five separate requirements apply and all five must be met. They are: a qualifying <strong className="text-slate-900">relationship</strong> (parent, grandparent, sibling, adult child); the applicant&rsquo;s <strong className="text-slate-900">age</strong> (over 18 with limited exceptions); a <strong className="text-slate-900">long-term personal care need</strong> arising from age, illness or disability; the <strong className="text-slate-900">unavailability or unaffordability of suitable care</strong> in the country where the applicant lives; and the UK <strong className="text-slate-900">sponsor&rsquo;s ability to maintain and accommodate</strong> the applicant without recourse to public funds.
            </p>
            <p>
              The fourth requirement — care availability — is where most applications fail. The Court of Appeal in <em>R (Britcits) v Secretary of State for the Home Department</em> [2017] EWCA Civ 368 upheld the rules but emphasised that the test relates to the practical level of care the applicant requires, not the applicant&rsquo;s preference for living near family. UKVI applies this strictly. If a local care provider could meet the applicant&rsquo;s needs, even if that provider is expensive or imperfect, the application will be refused. The same applies if the applicant has local relatives who could help, or financial means that could fund local care. This is a high bar.
            </p>
            <p>
              The evidence package is therefore decisive. Successful applications are typically built around <strong className="text-slate-900">independent medical evidence</strong> identifying specific care tasks the applicant cannot perform alone (mobility, washing, dressing, cooking, medication management); <strong className="text-slate-900">written statements from local care providers</strong> showing what services exist and why those services cannot meet the applicant&rsquo;s specific needs; and <strong className="text-slate-900">sponsor financial evidence</strong> showing the UK family can support the applicant indefinitely.
            </p>
            <p>
              Where the application falls just outside the Rules — for example, where some local care exists but is plainly inadequate — the residual route is <strong className="text-slate-900">Article 8 of the European Convention on Human Rights</strong>, applied via GEN.3.2 of Appendix FM at first instance and on appeal to the First-tier Tribunal. Article 8 is not a primary route; it is a proportionality safeguard, and it succeeds only where refusing leave would be a disproportionate interference with established family life. Section 117B of the Nationality, Immigration and Asylum Act 2002 (inserted by section 19 of the Immigration Act 2014) sets the public-interest considerations that decision-makers and tribunals must apply.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">The five requirements</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              The requirements under Appendix FM EC-DR
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              All five must be satisfied. Failing any one is fatal to the application.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REQUIREMENTS.map(r => (
              <div key={r.title} className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-brand-red transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <FileCheck2 className="h-4 w-4 text-brand-red" />
                  <p className="text-sm font-bold text-slate-900">{r.title}</p>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three-way alternatives comparison — high-value addition per SEO review */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Be informed</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              Three routes for an elderly parent — which fits your case?
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Adult Dependent Relative is the only settlement route, but it is not the only option. Honest comparison so you can decide for yourself.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {ALTERNATIVES.map(a => (
              <div key={a.name} className={`rounded-2xl p-6 ${a.tone === "primary" ? "bg-white border-2 border-brand-red" : "bg-white border border-slate-200"}`}>
                <p className={`text-sm font-bold mb-1 ${a.tone === "primary" ? "text-brand-red" : "text-slate-900"}`}>{a.name}</p>
                <p className="text-xs text-slate-500 mb-4">{a.summary}</p>
                <ul className="space-y-2 text-sm text-slate-600">
                  {a.bullets.map(b => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${a.tone === "primary" ? "text-brand-red" : "text-slate-400"}`} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Where applications fail</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              Why most ADR applications are refused
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Reading these before you apply is the single most useful thing you can do.
            </p>
          </div>
          <ol className="grid md:grid-cols-2 gap-5">
            {[
              { n: "01", t: "Care available locally", b: "The single most common refusal reason. Where local care providers exist (even expensive ones), or where local relatives could provide care, the application typically fails E-ECDR.2.5 (Britcits)." },
              { n: "02", t: "Insufficient medical evidence", b: "A GP letter alone is rarely enough. Successful applications use independent specialist reports identifying specific everyday care tasks the applicant cannot perform alone." },
              { n: "03", t: "Inadequate sponsor finances", b: "The sponsor must show ability to maintain and accommodate without recourse to public funds — bank statements, payslips, accommodation evidence under Appendix FM-SE." },
              { n: "04", t: "Mismatch with home-country evidence", b: "Statements from local care providers must explain why those services cannot meet the applicant's specific needs. Generic statements are insufficient." },
            ].map(s => (
              <li key={s.n} className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
                <p className="text-xs font-bold text-brand-red uppercase tracking-widest">{s.n}</p>
                <p className="mt-1 text-base font-bold text-slate-900">{s.t}</p>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Your legal framework</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              The four sources of law that govern this route
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              We cite each source so you can verify it yourself.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {STATUTES.map(s => (
              <div key={s.name} className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                    <Scale className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900">{s.name}</p>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{s.what}</p>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-red hover:underline">
                      Read source <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
              <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Common questions</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                ADR visa FAQ
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Direct answers in plain English. If yours isn&rsquo;t here, ring us — we don&rsquo;t charge to ask a question.
              </p>
              <DynamicCallLink className="mt-6 inline-flex items-center bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide h-10 px-4">
                <Phone className="h-4 w-4 mr-2" />
                <DynamicPhoneText />
              </DynamicCallLink>
            </div>
            <div className="lg:col-span-2 space-y-3">
              {FAQS.map((f, i) => (
                <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex items-center justify-between gap-4 w-full p-5 text-left text-sm sm:text-base font-bold text-slate-900 hover:text-brand-red transition-colors"
                  >
                    {f.question}
                    <ChevronDown className={`h-4 w-4 shrink-0 text-brand-red transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div id={`faq-answer-${i}`} className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4" dangerouslySetInnerHTML={{ __html: f.answer }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Pricing — be honest with me</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                What does this actually cost me?
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                ADR cases need significant evidence-gathering, so solicitor fees are higher than for routine immigration applications. There are three layers of cost: our fee, UKVI&rsquo;s government fee, and the Immigration Health Surcharge if applicable. We give you a written breakdown of every figure on the free assessment so you can see the total before you instruct us.
              </p>
              <Button asChild className="mt-5 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide">
                <Link href="/our-fees/">View All Fees</Link>
              </Button>
            </div>
            <ul className="space-y-3 bg-white rounded-2xl border border-slate-100 p-6">
              {[
                { t: "Solicitor fee + VAT", b: "Fixed fee agreed in writing before any work begins. ADR cases are typically more involved than routine applications because of the evidence package required." },
                { t: "UKVI application fee", b: "Government fee — confirm current rates at gov.uk before applying." },
                { t: "Independent medical evidence", b: "Specialist reports to support the care-need element. Charged at cost." },
                { t: "Disbursements (translations, courier)", b: "Charged at cost. Likely figures included in your engagement letter." },
                { t: "Appeal fees if refused", b: "First-tier Tribunal appeal fees and additional solicitor work scoped separately if the application is refused." },
              ].map(item => (
                <li key={item.t} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.t}</p>
                    <p className="text-sm text-slate-500" dangerouslySetInnerHTML={{ __html: item.b }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <TeamStrip />

      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3">Free Eligibility Assessment</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
            Let us tell you honestly whether you have a case
          </h2>
          <p className="mt-4 text-base text-white/70 leading-relaxed max-w-2xl mx-auto">
            Adult Dependent Relative applications are difficult — but if your circumstances fit the rules, we will build the strongest possible case. Spend 60 seconds telling us your circumstances and a specialist solicitor will call you back within the hour.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <DynamicCallLink className="inline-flex items-center justify-center bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide px-8 h-12">
              <Phone className="h-4 w-4 mr-2" />
              <DynamicPhoneText />
            </DynamicCallLink>
            <Button asChild variant="outline" size="lg" className="rounded-lg text-sm font-semibold h-12 bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-navy">
              <a href="#qualifier">Free 60-second check</a>
            </Button>
          </div>
          <p className="mt-6 text-xs text-white/40 max-w-2xl mx-auto">
            Abrahams Solicitors · SRA #809071 · {PAGE_URL} · This page is general guidance and not legal advice. Past results do not guarantee future outcomes. Confirm current government fees and rules at gov.uk. Last reviewed: {LAST_REVIEWED}.
          </p>
        </div>
      </section>
    </>
  );
}
