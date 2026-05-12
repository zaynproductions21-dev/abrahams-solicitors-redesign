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
  AlertCircle, Scale, FileCheck2, Clock, BadgeCheck, ExternalLink, Calendar,
} from "lucide-react";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/uk-dependent-child-visa/";
const LAST_REVIEWED = "May 2026";
const AUTHOR = team.find(t => t.slug === "humaira-anjum")!;
const SUPERVISOR = team.find(t => t.slug === "imran-shah")!;

const FAQS: { question: string; answer: string }[] = [
  {
    question: "What is a UK Dependent Child Visa and who can apply?",
    answer:
      "A UK Dependent Child Visa lets a child under 18 join or remain with a parent who is a British citizen, has settled status (Indefinite Leave to Remain), refugee status, or limited leave on certain routes. The route sits in Appendix FM of the Immigration Rules — Section EC-C for entry clearance and Section R-LTRC for leave to remain in the UK. The applicant child must show four core elements: their age (under 18 at the date of application), their parental relationship to the UK-based sponsor, that suitable accommodation and financial maintenance is available without recourse to public funds, and either that the UK-based parent has sole responsibility for them or that there are serious and compelling family or other considerations making exclusion undesirable.",
  },
  {
    question: "How much does a UK Dependent Child Visa cost?",
    answer:
      "There are three layers of cost. First, our solicitor fee starts from £900 plus VAT for a straightforward dependent child application — fixed before any work begins, with a written quote covering scope and supervision. Second, the UKVI government application fee, currently around £2,055 for entry clearance and £1,048 for leave to remain (figures correct at the date this page was last reviewed — confirm current rates at gov.uk/government/publications/visa-regulations-revised-table). Third, the Immigration Health Surcharge, currently £1,035 per year of leave granted — usually 30 months for an in-country application (£2,587.50) or up to 33 months for entry clearance. We give you a full written breakdown of every figure on the free assessment so you can see the total cost before instructing us.",
  },
  {
    question: "How long does a UK Dependent Child Visa application take?",
    answer:
      "UKVI publishes service standards on its processing-time dashboard at gov.uk/visa-processing-times. At the date this page was last reviewed, the service standards were approximately 12 weeks for entry clearance applications (child applying from outside the UK to join their parent) and 8 weeks for leave to remain applications (child already in the UK applying to extend or switch). Priority and super-priority services can shorten this to 5 working days and 1 working day respectively for an additional UKVI fee. Processing times can vary by visa application centre and case complexity — applications with sole responsibility evidence or where the child has a complex immigration history typically take longer than the published service standard.",
  },
  {
    question: "What is the sole responsibility test for child visas?",
    answer:
      "Sole responsibility is the legal test under E-ECC.1.6(b) of Appendix FM that applies where only one parent is in the UK. The leading case is TD (Paragraph 297(i)(e): \"sole responsibility\") Yemen [2006] UKAIT 00049, which remains the authority. The test is one of fact, not legal status — it asks whether the UK-based parent has had continuing direction and control over the child's upbringing, including the major decisions about education, religion, residence, healthcare and welfare. Day-to-day care being provided by relatives abroad does not defeat sole responsibility provided the UK parent retains overall control. Evidence typically includes school correspondence, financial support records, communication logs, photographs, medical authorisation, and witness statements. If sole responsibility cannot be shown, the alternative is to demonstrate \"serious and compelling family or other considerations\" under E-ECC.1.6(c).",
  },
  {
    question: "Does my child need a separate application or are they included in my spouse visa?",
    answer:
      "They almost always need a separate application. Spouse and partner visas under Appendix FM cover the partner relationship only — children are not automatically included as dependants on the partner's grant of leave. Each child needs their own application, their own UKVI fee, and their own Immigration Health Surcharge. The applications can be submitted together so they progress in parallel, and the same evidence of accommodation and maintenance can support both. There is one narrow exception for refugee family reunion under paragraphs 352A-352FJ, where children of a recognised refugee can be added to the same application bundle. For most cases — spouse, fiancé, unmarried partner — plan and budget for one application per family member.",
  },
  {
    question: "My child lives with my ex-partner abroad. Can I still sponsor them to the UK?",
    answer:
      "Possibly, but the case turns on whether you can establish either sole responsibility under E-ECC.1.6(b) or serious and compelling considerations under E-ECC.1.6(c). Living arrangements are not decisive. The court in TD (Yemen) was clear that a parent abroad providing day-to-day care does not automatically defeat the UK parent's sole responsibility, provided the UK parent retains continuing control over major life decisions. Where the ex-partner objects to the child relocating, additional issues arise around international child abduction (Hague Convention 1980) and sometimes a UK family court order is needed before UKVI will be satisfied. These are some of the most fact-sensitive cases we handle. Each one needs full documentary evidence and often an expert legal opinion before the application is submitted.",
  },
];

const STATUTES = [
  {
    name: "Appendix FM, Section EC-C (E-ECC.1.1–2.4)",
    what: "The current eligibility framework for entry clearance as a child of a British citizen or settled person — including age, parental relationship, sole responsibility, accommodation and maintenance.",
    href: "https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-fm-family-members",
  },
  {
    name: "Appendix FM, Section R-LTRC",
    what: "The leave-to-remain version of the rules above, for children already in the UK applying to extend or switch to a child route.",
    href: "https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-fm-family-members",
  },
  {
    name: "Section 117B, Nationality, Immigration and Asylum Act 2002",
    what: "Public-interest considerations the Home Office must apply when assessing Article 8 family-life arguments — inserted by section 19 of the Immigration Act 2014.",
    href: "https://www.legislation.gov.uk/ukpga/2002/41/section/117B",
  },
  {
    name: "Article 8, European Convention on Human Rights",
    what: "Right to respect for private and family life — relevant where the application falls outside the Rules but family-life ties make refusal disproportionate.",
    href: "https://www.echr.coe.int/documents/d/echr/Convention_ENG",
  },
];

const ELIGIBILITY = [
  { title: "Child under 18 at date of application", desc: "Age is fixed at the date the application is submitted — turning 18 between submission and decision does not defeat the claim." },
  { title: "Parental relationship to UK sponsor", desc: "Birth certificate, adoption order, or court order. Step-parents must show the parental relationship is recognised in UK law." },
  { title: "Sole responsibility OR serious and compelling considerations", desc: "Under E-ECC.1.6(b) or (c). Sole responsibility under TD (Yemen) is fact-sensitive; serious and compelling is a higher threshold." },
  { title: "Adequate accommodation", desc: "The UK home must be of suitable size for the family without overcrowding and exclusively occupied by the family unit." },
  { title: "Adequate maintenance", desc: "The family must be supportable without recourse to public funds. Income tests under Appendix FM-SE apply." },
  { title: "English language (age 12-17 in some cases)", desc: "Older children entering UK schools may need to meet English language requirements depending on their status route." },
];

export default function UkDependentChildVisaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <JsonLd data={legalServiceWithCatalogSchema({
        name: "UK Dependent Child Visa Solicitors",
        description: "Fixed-fee UK Dependent Child Visa applications under Appendix FM Section EC-C of the Immigration Rules. Solicitor-led entry clearance and leave-to-remain applications for children of British citizens, settled persons and refugees. SRA-regulated firm #809071.",
        slug: "uk-dependent-child-visa",
        author: { name: AUTHOR.name, sraUrl: AUTHOR.sraUrl },
        catalog: [
          { name: "Entry clearance for child of British citizen", description: "Application under Appendix FM Section EC-C for a child overseas joining a British parent." },
          { name: "Entry clearance for child of settled person", description: "Application for a child overseas joining a parent with Indefinite Leave to Remain." },
          { name: "Child of refugee — family reunion", description: "Family reunion application under paragraphs 352A-352FJ for children of recognised refugees." },
          { name: "Leave to remain as a child", description: "In-country switching or extension application under Section R-LTRC of Appendix FM." },
          { name: "Sole responsibility cases", description: "Complex applications under E-ECC.1.6(b) where only one parent is in the UK." },
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
        { name: "UK Dependent Child Visa" },
      ])} />
      <JsonLd data={speakableSchema([
        "#hero-lead",
        "#what-is-dependent-child-visa",
        "#faq-answer-0",
        "#faq-answer-1",
        "#faq-answer-2",
        "#faq-answer-3",
        "#faq-answer-4",
        "#faq-answer-5",
      ])} />

      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/immigration/" className="hover:text-brand-red transition-colors">Immigration</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">UK Dependent Child Visa</span>
          </nav>
        </div>
      </section>

      <section className="relative bg-white border-b border-slate-100 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-bold text-brand-red uppercase tracking-widest">UK Dependent Child Visa</span>
                <span className="text-xs font-bold text-white bg-brand-red px-3 py-1 rounded-full">Fixed Fee from £900 + VAT</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="h-3 w-3" />
                  SRA #809071
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
                Bring your child to live with you in the UK
              </h1>

              <p id="hero-lead" className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                A UK Dependent Child Visa lets a child under 18 join a parent who is a British citizen or has settled status. The route is governed by <strong className="text-slate-900">Appendix FM, Section EC-C of the Immigration Rules</strong> (E-ECC.1.1 onwards) and section 117B of the Nationality, Immigration and Asylum Act 2002. Most applications turn on three points: parental relationship, accommodation and maintenance, and either sole responsibility or serious and compelling family considerations.
              </p>

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
                  HA
                </div>
                <div>
                  <p className="text-sm text-slate-700">
                    Reviewed by <Link href="/our-team/" className="font-semibold text-slate-900 hover:text-brand-red">{AUTHOR.name}</Link> — {AUTHOR.role.toLowerCase()}.
                  </p>
                  <p className="text-xs text-slate-400">
                    SRA #{AUTHOR.sraNumber} · Admitted {AUTHOR.admittedYear} · Supervised by {SUPERVISOR.name} (admitted {SUPERVISOR.admittedYear}, SRA #{SUPERVISOR.sraNumber}) ·{" "}
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
                source="uk-dependent-child-visa-qualifier"
                service="[Wizard] UK Dependent Child Visa"
                step1={{
                  heading: "Where is your child now?",
                  helper: "Pick the closest match.",
                  options: [
                    { value: "abroad-under-18", label: "Outside UK, under 18" },
                    { value: "uk-under-18-leave", label: "In UK on existing leave, under 18" },
                    { value: "uk-no-leave", label: "In UK without current leave" },
                    { value: "over-18", label: "Now over 18" },
                  ],
                  positive: ["abroad-under-18", "uk-under-18-leave"],
                  negative: ["over-18"],
                }}
                step2={{
                  heading: "What is your status in the UK?",
                  helper: "We&rsquo;ll match you to the right route.",
                  options: [
                    { value: "british", label: "British citizen" },
                    { value: "ilr", label: "Indefinite Leave to Remain (settled)" },
                    { value: "refugee", label: "Refugee or humanitarian protection" },
                    { value: "limited-leave", label: "Limited leave (work, spouse, student)" },
                    { value: "unsure", label: "Not sure" },
                  ],
                  positive: ["british", "ilr", "refugee"],
                  negative: [],
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />

      <section className="bg-brand-navy py-7 lg:py-9">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-center sm:text-left">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-brand-gold">£900+ VAT</p>
              <p className="mt-1 text-sm text-white/80 leading-snug">Fixed solicitor fees from. Excludes UKVI application fee and Immigration Health Surcharge — broken out in writing before you instruct.</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-brand-gold">~12 weeks</p>
              <p className="mt-1 text-sm text-white/80 leading-snug">UKVI standard service for entry clearance. ~8 weeks for in-country leave to remain. Priority service available.</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-brand-gold">No call centres</p>
              <p className="mt-1 text-sm text-white/80 leading-snug">Direct access to a qualified solicitor — supervision arrangement disclosed in your engagement letter.</p>
            </div>
          </div>
          <p className="mt-5 text-[11px] text-white/40 text-center sm:text-left">
            UKVI fees and Immigration Health Surcharge change periodically. Confirm current rates at gov.uk before applying. This page is general guidance, not legal advice.
          </p>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">The basics</p>
          <h2 id="what-is-dependent-child-visa" className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
            What is a UK Dependent Child Visa?
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              A UK Dependent Child Visa lets a child under 18 join or remain with a parent who is a British citizen, has Indefinite Leave to Remain (settled), has refugee status, or in some cases has limited leave on a qualifying route. The application sits under <strong className="text-slate-900">Appendix FM of the Immigration Rules</strong> — Section EC-C handles entry clearance from outside the UK, and Section R-LTRC handles leave to remain for children already in the UK.
            </p>
            <p>
              Five eligibility limbs need to be met. <strong className="text-slate-900">Age</strong> is fixed at the date of application — the child must be under 18 — though they will not lose status if they turn 18 between submission and decision. <strong className="text-slate-900">Parental relationship</strong> needs documentary proof: birth certificate, adoption order or family-court order. <strong className="text-slate-900">Either sole responsibility or serious and compelling considerations</strong> applies under E-ECC.1.6(b) and (c). <strong className="text-slate-900">Adequate accommodation</strong> requires a UK home of sufficient size for the whole family without overcrowding (the relevant test is in Appendix FM-SE). <strong className="text-slate-900">Adequate maintenance</strong> means the family can support itself without recourse to public funds.
            </p>
            <p>
              Sole responsibility is the test that defeats most weak applications. The leading authority is <em>TD (Paragraph 297(i)(e): &quot;sole responsibility&quot;) Yemen</em> [2006] UKAIT 00049 — still applied today despite predating Appendix FM. The case made clear sole responsibility is a question of <em>fact</em>, not legal status, and not defeated by a relative providing day-to-day care abroad if the UK-based parent retains continuing control over major life decisions: schooling, religion, residence, healthcare, and welfare. Strong applications back this up with school correspondence, financial support records, communication logs and witness statements.
            </p>
            <p>
              Where sole responsibility cannot be shown, the alternative is to demonstrate <strong className="text-slate-900">serious and compelling family or other considerations</strong> under E-ECC.1.6(c). This is a higher threshold and typically applies where the child has lost their other parent, where the carer abroad has died or become incapacitated, or where the child is at serious physical or psychological risk. UKVI applies this strictly.
            </p>
            <p>
              Where the family relationship is genuine but the application falls outside the Rules — for example a child slightly over 18, or where evidence of sole responsibility is incomplete — <strong className="text-slate-900">Article 8 of the European Convention on Human Rights</strong> may provide a residual route under GEN.3.2 of Appendix FM. Article 8 is not a primary route; it is a proportionality safeguard, and section 117B of the Nationality, Immigration and Asylum Act 2002 (inserted by section 19 of the Immigration Act 2014) sets out the public-interest considerations decision-makers must apply.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Your legal framework</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              The four sources of law that govern this route
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              We cite each source so you can verify it yourself on gov.uk.
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
                      Read on gov.uk <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Eligibility checklist</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              The six things UKVI will check
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Each one needs documentary evidence. Missing any of them will result in a refusal.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ELIGIBILITY.map(e => (
              <div key={e.title} className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-brand-red transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <FileCheck2 className="h-4 w-4 text-brand-red" />
                  <p className="text-sm font-bold text-slate-900">{e.title}</p>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{e.desc}</p>
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
                UK Dependent Child Visa FAQ
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
                    <div id={`faq-answer-${i}`} className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {f.answer}
                    </div>
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
                There are three layers of cost: our solicitor fee, UKVI&rsquo;s government fees, and the Immigration Health Surcharge. We give you a written breakdown of every figure on the free assessment so the total is clear before you instruct us.
              </p>
              <Button asChild className="mt-5 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide">
                <Link href="/our-fees/">View All Fees</Link>
              </Button>
            </div>
            <ul className="space-y-3 bg-white rounded-2xl border border-slate-100 p-6">
              {[
                { t: "Solicitor fee from £900 + VAT", b: "Fixed fee for a straightforward dependent child application — agreed in writing before any work begins." },
                { t: "UKVI application fee", b: "Government fee — confirm current rates at gov.uk before applying." },
                { t: "Immigration Health Surcharge", b: "Per year of leave granted — confirm current rate at gov.uk before applying." },
                { t: "Disbursements (translations, courier)", b: "Charged at cost. Scope and likely figures listed in your engagement letter." },
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
          <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3">Free 30-Minute Assessment</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
            Get your child to the UK with proper legal advice
          </h2>
          <p className="mt-4 text-base text-white/70 leading-relaxed max-w-2xl mx-auto">
            Spend 60 seconds telling us your circumstances — a specialist solicitor will call you back within the hour with a free, honest assessment.
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
            Abrahams Solicitors · SRA #809071 · {PAGE_URL} · This page is general guidance and not legal advice. Confirm current government fees and rules at gov.uk. Last reviewed: {LAST_REVIEWED}.
          </p>
        </div>
      </section>
    </>
  );
}
