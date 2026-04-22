import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle2,
  ArrowRight,
  Phone,
  FileText,
  Clock,
  ShieldCheck,
  Users,
  Globe,
  AlertTriangle,
  PoundSterling,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "British Citizenship Application Solicitors | Naturalisation Help",
  description:
    "British citizenship application experts. Naturalisation, marriage route, ancestry applications. Fixed fees, 98% success rate. Free eligibility check.",
};

const citizenshipRoutes = [
  {
    title: "Naturalisation",
    subtitle: "5+ years residence in the UK",
    description:
      "The most common route to British citizenship. If you have lived lawfully in the United Kingdom for at least five years and hold indefinite leave to remain (ILR), you may be eligible to apply for naturalisation as a British citizen.",
    requirements: [
      "Held ILR or EU settled status for at least 12 months",
      "Lived in the UK for at least 5 years",
      "Not spent more than 450 days outside the UK in 5 years",
      "Not spent more than 90 days outside the UK in the final year",
      "Passed the Life in the UK test",
      "Met the English language requirement",
    ],
    timeline: "Typically 6 months from submission",
    fee: "From £1,500 + Home Office fee",
  },
  {
    title: "Marriage to a British Citizen",
    subtitle: "3+ years residence",
    description:
      "If you are married to or in a civil partnership with a British citizen, you may qualify for naturalisation after three years of lawful residence in the United Kingdom. This route has reduced residency requirements compared to the standard naturalisation route.",
    requirements: [
      "Married to or in civil partnership with a British citizen",
      "Lived in the UK for at least 3 years",
      "Held ILR or EU settled status for at least 12 months",
      "Not spent more than 270 days outside the UK in 3 years",
      "Not spent more than 90 days outside the UK in the final year",
      "Met good character, language, and Life in the UK test requirements",
    ],
    timeline: "Typically 6 months from submission",
    fee: "From £1,500 + Home Office fee",
  },
  {
    title: "Ancestry",
    subtitle: "UK-born grandparent",
    description:
      "If you are a Commonwealth citizen with a grandparent who was born in the United Kingdom, the Channel Islands, or the Isle of Man, you may be eligible to apply for a UK Ancestry visa. After five years on this visa, you can apply for ILR and subsequently British citizenship.",
    requirements: [
      "Commonwealth citizen aged 17 or over",
      "Grandparent born in the UK, Channel Islands, or Isle of Man",
      "Ability to work and intend to take employment in the UK",
      "Adequate maintenance and accommodation without recourse to public funds",
      "5 years on Ancestry visa before applying for ILR",
      "12 months with ILR before citizenship application",
    ],
    timeline: "Ancestry visa: 12 weeks; citizenship: 6 months after ILR",
    fee: "From £1,200 + Home Office fees",
  },
  {
    title: "Birth Registration & Right of Abode",
    subtitle: "Citizenship by entitlement",
    description:
      "Certain individuals are automatically British citizens by birth or descent, or have the right of abode in the United Kingdom. If you were born in the UK before 1983, or if one of your parents was a British citizen or settled at the time of your birth, you may already be a British citizen and simply need to register or obtain proof of your status.",
    requirements: [
      "Born in the UK before 1 January 1983",
      "Born in the UK after 1983 with a British citizen or settled parent",
      "Born outside the UK to a British citizen parent (citizenship by descent)",
      "Stateless children born in the UK",
      "Children adopted by British citizens",
      "Registration under Section 3(1) of the British Nationality Act 1981",
    ],
    timeline: "Typically 3 to 6 months",
    fee: "From £1,000 + Home Office fee",
  },
];

const eligibilityRequirements = [
  {
    title: "Residency Requirements",
    description:
      "You must have lived in the United Kingdom for a continuous period, the length of which depends on your route to citizenship. Absences from the UK are closely scrutinised, and excessive time spent abroad can jeopardise your application.",
  },
  {
    title: "Good Character Requirement",
    description:
      "The Home Office will assess your character, including any criminal record, immigration history, financial affairs, and general conduct. Previous convictions, cautions, or civil penalties may affect your application but do not necessarily prevent approval.",
  },
  {
    title: "English Language & Life in the UK Test",
    description:
      "Applicants aged 18 to 64 must demonstrate knowledge of the English language to at least CEFR B1 level and must pass the Life in the UK test. Certain nationalities and qualifications may satisfy the language requirement automatically.",
  },
  {
    title: "No Immigration Violations",
    description:
      "You must not have any outstanding immigration issues, including overstaying, illegal working, or deception in previous applications. Any breach of immigration rules must be disclosed and may need to be addressed before applying.",
  },
];

const serviceInclusions = [
  "Comprehensive eligibility assessment and advice on the most suitable route",
  "Full review and preparation of all supporting documents",
  "Completion and verification of application forms",
  "Preparation of a detailed cover letter addressing all requirements",
  "Residency calculation and verification of absence records",
  "Liaison with the Home Office on your behalf",
  "Submission of your application and tracking progress",
  "Guidance on the citizenship ceremony booking process",
];

const commonIssues = [
  {
    title: "Previous Application Refusals",
    description:
      "If your citizenship application has been refused previously, we can review the reasons for refusal, identify what went wrong, and prepare a fresh application that addresses the Home Office's concerns directly.",
  },
  {
    title: "Complex Residency Calculations",
    description:
      "Residency requirements are one of the most common areas where applications fail. Our solicitors meticulously calculate your absences from the UK and advise whether you meet the threshold or need to wait before applying.",
  },
  {
    title: "Character Requirement Concerns",
    description:
      "If you have previous criminal convictions, cautions, penalty notices, or county court judgments, we can assess how these affect your application and prepare supporting evidence to demonstrate good character.",
  },
  {
    title: "Time Spent Outside the UK",
    description:
      "Excessive absences can result in refusal. We analyse your travel history, advise on whether discretion may be exercised in your favour, and prepare compelling representations where absence limits have been exceeded.",
  },
];

const pricingTiers = [
  {
    route: "Naturalisation",
    price: "£1,500",
    description: "Standard 5-year residency route to British citizenship",
    includes: [
      "Full eligibility assessment",
      "Document preparation and review",
      "Application submission",
      "Home Office correspondence",
    ],
  },
  {
    route: "Marriage Route",
    price: "£1,500",
    description: "3-year residency route for spouses of British citizens",
    includes: [
      "Full eligibility assessment",
      "Marriage/partnership verification",
      "Application submission",
      "Home Office correspondence",
    ],
  },
  {
    route: "Ancestry",
    price: "£1,200",
    description: "Commonwealth citizens with UK-born grandparents",
    includes: [
      "Ancestry verification",
      "Document preparation and review",
      "Application submission",
      "Home Office correspondence",
    ],
  },
  {
    route: "Registration",
    price: "£1,000",
    description: "Birth registration, right of abode, and entitlement claims",
    includes: [
      "Entitlement assessment",
      "Supporting evidence preparation",
      "Application submission",
      "Home Office correspondence",
    ],
  },
];

const faqs = [
  {
    question: "How long does a British citizenship application take?",
    answer:
      "Most citizenship applications are processed within six months of submission, although some cases may take longer if additional checks are required. We track every application and follow up with the Home Office if there are delays. Once your application is approved, you will be invited to attend a citizenship ceremony, which must be completed within three months.",
  },
  {
    question: "Can I apply for citizenship if I have a criminal record?",
    answer:
      "A criminal record does not automatically disqualify you from obtaining British citizenship, but it is a factor in the good character assessment. Minor offences and spent convictions are less likely to cause issues, while more serious or recent offences may lead to refusal. Our solicitors can assess your circumstances and advise on the best time to apply.",
  },
  {
    question: "Do I need to give up my existing nationality?",
    answer:
      "The United Kingdom permits dual nationality, so you do not need to renounce your existing citizenship when becoming British. However, you should check whether your country of origin allows dual nationality, as some countries require you to give up your previous citizenship upon acquiring a new one.",
  },
  {
    question: "What happens if my application is refused?",
    answer:
      "If your citizenship application is refused, you will receive a letter explaining the reasons. There is no formal right of appeal against a citizenship refusal, but you can submit a fresh application addressing the reasons for refusal. In some cases, you may be able to request a judicial review. We can advise on the most appropriate course of action.",
  },
  {
    question: "Can my children be included in my citizenship application?",
    answer:
      "Children cannot be included in an adult's citizenship application. However, once you become a British citizen, your children may be eligible to register as British citizens in their own right. Children born in the UK after you become a citizen will automatically be British. We can advise on the best route for your family.",
  },
];

export default function BritishCitizenshipServicesPage() {
  return (
    <SiteLayout>
      {/* ── Hero ── */}
      <section className="relative bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-navy-light/60 via-transparent to-transparent" />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              British Citizenship Solicitors
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white leading-[1.08] tracking-tight">
              British Citizenship Applications — Expert Legal Support
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-white/60 leading-relaxed max-w-2xl">
              Naturalisation, marriage route, ancestry, and birth registration.
              Fixed fees, 98% success rate, and a dedicated solicitor guiding you
              through every step of your citizenship journey.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/40">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                Naturalisation
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                Marriage Route
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                Ancestry
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                Birth Registration
              </span>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-base px-8 h-13"
              >
                <Link href="/contact-us/">
                  Free Citizenship Eligibility Check
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 rounded-xl text-base px-8 h-13"
              >
                <Link href="tel:+442071234567">
                  <Phone className="h-4 w-4 mr-2" />
                  Speak to a Solicitor
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <div className="border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-1.5 text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href="/immigration/"
              className="hover:text-brand-red transition-colors"
            >
              Immigration
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-brand-navy font-medium">
              British Citizenship
            </span>
          </nav>
        </div>
      </div>

      {/* ── Citizenship Routes ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
            Routes to Citizenship
          </p>
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy mb-6">
            Four Routes to Becoming British
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed max-w-3xl mb-16">
            There are several routes to British citizenship, each with different
            eligibility criteria, residency requirements, and timelines. Our
            solicitors will assess your circumstances and advise on the most
            suitable route for you.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {citizenshipRoutes.map((route) => (
              <div
                key={route.title}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-heading font-bold text-brand-navy mb-1">
                  {route.title}
                </h3>
                <p className="text-sm text-brand-gold font-semibold mb-4">
                  {route.subtitle}
                </p>
                <p className="text-slate-500 leading-relaxed mb-6">
                  {route.description}
                </p>
                <ul className="space-y-2.5 mb-6">
                  {route.requirements.map((req) => (
                    <li
                      key={req}
                      className="flex items-start gap-2.5 text-sm text-brand-navy/80"
                    >
                      <CheckCircle2 className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                      {req}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-6 pt-4 border-t border-slate-100 text-sm">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="h-4 w-4 text-brand-gold" />
                    {route.timeline}
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-brand-navy">
                    <PoundSterling className="h-4 w-4 text-brand-gold" />
                    {route.fee}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Eligibility Requirements ── */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
            Eligibility Criteria
          </p>
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy mb-6">
            Key Requirements for British Citizenship
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed max-w-3xl mb-16">
            Every citizenship application is assessed against a set of core
            requirements. Understanding these criteria before you apply is
            essential to avoiding unnecessary refusals and delays.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {eligibilityRequirements.map((req) => (
              <div
                key={req.title}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-brand-gold shrink-0 mt-0.5" />
                  <h3 className="text-lg font-heading font-bold text-brand-navy">
                    {req.title}
                  </h3>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  {req.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Document Preparation Service ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
                Full-Service Support
              </p>
              <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy mb-6">
                Document Preparation &amp; Application Service
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-6">
                Our citizenship service covers every aspect of your application,
                from initial eligibility assessment through to attendance at your
                citizenship ceremony. We handle the paperwork so you can focus on
                preparing for life as a British citizen.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Each application is reviewed by a qualified solicitor before
                submission, ensuring accuracy, completeness, and the strongest
                possible presentation of your case. We also provide a detailed
                cover letter setting out how you meet every requirement.
              </p>
            </div>
            <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm">
              <h3 className="text-lg font-heading font-bold text-brand-navy mb-6">
                What Is Included
              </h3>
              <ul className="space-y-4">
                {serviceInclusions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-brand-navy/80"
                  >
                    <CheckCircle2 className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Common Application Issues ── */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
            Problem Solving
          </p>
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy mb-6">
            Common Application Issues We Resolve
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed max-w-3xl mb-16">
            Many citizenship applications are refused due to avoidable errors or
            misunderstandings of the requirements. Our solicitors have extensive
            experience resolving complex issues and preparing applications that
            succeed.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {commonIssues.map((issue) => (
              <div
                key={issue.title}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                  <h3 className="text-lg font-heading font-bold text-brand-navy">
                    {issue.title}
                  </h3>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  {issue.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Transparent Pricing ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Transparent Pricing
            </p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy mb-6">
              Fixed Fees — No Hidden Charges
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed max-w-3xl mx-auto">
              We believe in complete transparency. Our fixed fees cover the
              entire solicitor service from initial consultation to application
              submission. Home Office fees are payable separately.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.route}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <h3 className="text-lg font-heading font-bold text-brand-navy mb-1">
                  {tier.route}
                </h3>
                <p className="text-sm text-slate-500 mb-4">{tier.description}</p>
                <p className="text-3xl font-heading font-bold text-brand-navy mb-1">
                  {tier.price}
                </p>
                <p className="text-xs text-slate-400 mb-6">
                  + Home Office fee
                </p>
                <ul className="space-y-2.5 mt-auto">
                  {tier.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-brand-navy/80"
                    >
                      <CheckCircle2 className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4 text-center">
              Frequently Asked Questions
            </p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy mb-12 text-center">
              Common Questions About British Citizenship
            </h2>

            <Accordion className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={index}
                  className="bg-white rounded-2xl ring-1 ring-slate-200 px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-heading font-semibold text-brand-navy hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-500 leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-brand-navy-light/60 via-transparent to-transparent" />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-24 lg:py-32 text-center">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
            Start Your Application
          </p>
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white mb-6">
            Ready to Become a British Citizen?
          </h2>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mb-10">
            Book a free eligibility check with one of our citizenship
            solicitors. We will assess your circumstances, explain your options,
            and provide a clear fixed-fee quote — all with no obligation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-base px-8 h-13"
            >
              <Link href="/contact-us/">
                Free Citizenship Eligibility Check
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 rounded-xl text-base px-8 h-13"
            >
              <Link href="tel:+442071234567">
                <Phone className="h-4 w-4 mr-2" />
                Call Us Today
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
