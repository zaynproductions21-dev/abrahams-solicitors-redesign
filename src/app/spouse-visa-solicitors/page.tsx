import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Clock,
  FileText,
  Users,
  ShieldCheck,
  PoundSterling,
  Phone,
  ArrowRight,
  AlertTriangle,
  Lightbulb,
  CreditCard,
  ChevronDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Spouse Visa Solicitors UK | Expert UK Partner Visa Help",
  description:
    "Expert spouse visa solicitors. Fixed fee UK partner visa applications with 95% success rate. Free consultation. Direct solicitor access guaranteed.",
};

const services = [
  {
    title: "Initial Spouse Visa Application",
    fee: "From £1,500",
    timeline: "8–12 weeks processing",
    included: [
      "Full eligibility assessment",
      "Document review and preparation",
      "Online application completion",
      "Supporting letter drafted by solicitor",
      "Biometrics appointment guidance",
      "Post-submission tracking",
    ],
  },
  {
    title: "Spouse Visa Extension (FLR(M))",
    fee: "From £1,200",
    timeline: "8 weeks processing",
    included: [
      "Eligibility check for extension",
      "Updated financial evidence review",
      "Relationship evidence assessment",
      "Application form completion",
      "Cover letter and supporting documents",
      "Biometrics appointment support",
    ],
  },
  {
    title: "Switch to Spouse Visa",
    fee: "From £1,500",
    timeline: "8–12 weeks processing",
    included: [
      "Assessment of current visa status",
      "Switching eligibility confirmation",
      "Full document preparation",
      "Application submission",
      "Solicitor-drafted cover letter",
      "Ongoing case updates",
    ],
  },
  {
    title: "ILR After Spouse Visa",
    fee: "From £1,200",
    timeline: "6–8 weeks processing",
    included: [
      "Settlement eligibility review",
      "Life in the UK test guidance",
      "English language requirement check",
      "Five-year evidence compilation",
      "Application and submission",
      "Decision follow-up",
    ],
  },
];

const requirements = [
  {
    title: "Financial Requirement",
    description:
      "You or your partner must demonstrate a minimum annual income of £29,000 (as of April 2025). This can be met through employment, self-employment, cash savings, or a combination. We help you identify the best route to satisfy this threshold.",
  },
  {
    title: "English Language Requirement",
    description:
      "The applicant must prove English language ability at CEFR Level A1 for initial applications or A2 for extensions. Exemptions apply for nationals of majority English-speaking countries, those over 65, or those with certain disabilities.",
  },
  {
    title: "Genuine Relationship Evidence",
    description:
      "You must demonstrate that your relationship is genuine and subsisting. Evidence includes photographs together, correspondence, joint financial commitments, travel records, and statements from friends and family.",
  },
  {
    title: "Adequate Accommodation",
    description:
      "You must show that suitable accommodation is available for you and your dependants without recourse to public funds. The property must not be overcrowded under housing legislation standards.",
  },
];

const processSteps = [
  {
    step: 1,
    title: "Free Consultation",
    description:
      "We assess your circumstances, explain the requirements, and provide a clear plan for your spouse visa application. No obligation, no charge.",
  },
  {
    step: 2,
    title: "Document Preparation",
    description:
      "Your solicitor compiles and reviews all supporting documents, identifies any gaps, and prepares a comprehensive evidence bundle tailored to your case.",
  },
  {
    step: 3,
    title: "Application Submission",
    description:
      "We complete and submit your application online, ensuring every section is accurate and supported by the correct documentation.",
  },
  {
    step: 4,
    title: "Biometrics Appointment",
    description:
      "We guide you through the biometrics process, including booking your appointment and advising on what to bring and expect on the day.",
  },
  {
    step: 5,
    title: "Decision & Next Steps",
    description:
      "Once a decision is received, we explain the outcome, assist with any further steps such as collecting your BRP, and advise on future applications.",
  },
];

const problems = [
  {
    problem: "Previous Visa Refusal",
    solution:
      "We analyse your refusal notice in detail, identify the specific grounds, and build a fresh application that directly addresses every reason for refusal with strengthened evidence.",
  },
  {
    problem: "Insufficient Relationship Evidence",
    solution:
      "Our solicitors guide you on exactly what evidence to gather, how to present it persuasively, and draft a detailed cover letter that tells the story of your relationship clearly.",
  },
  {
    problem: "Complex Financial Situations",
    solution:
      "Whether you rely on self-employment income, savings, or third-party support, we structure your financial evidence to meet the £29,000 threshold using the most advantageous calculation method.",
  },
  {
    problem: "Mixed Immigration History",
    solution:
      "Previous overstays, refused applications, or complex visa histories do not necessarily prevent a successful spouse visa. We assess your history honestly and advise on the best path forward.",
  },
];

const pricing = [
  {
    service: "Initial Spouse Visa",
    price: "From £1,500",
    note: "Entry clearance application",
  },
  {
    service: "Spouse Visa Extension",
    price: "From £1,200",
    note: "Further leave to remain",
  },
  {
    service: "Switch to Spouse Visa",
    price: "From £1,500",
    note: "In-country switching",
  },
  {
    service: "ILR After Spouse Visa",
    price: "From £1,200",
    note: "Indefinite leave to remain",
  },
];

const faqs = [
  {
    question: "How long does a UK spouse visa application take?",
    answer:
      "Standard processing for an initial spouse visa is typically 8 to 12 weeks from the date of your biometrics appointment. Priority and super priority services are available for an additional Home Office fee, reducing the wait to approximately 5 working days or 24 hours respectively. We advise on the best option for your timeline.",
  },
  {
    question: "What is the minimum income requirement for a spouse visa in 2025?",
    answer:
      "As of April 2025, the sponsoring partner must demonstrate a minimum annual income of £29,000. This can be met through employment income, self-employment profits, non-employment income such as rental income or dividends, cash savings above £16,000, or a combination of these sources. We help you calculate and present your finances in the most favourable way.",
  },
  {
    question: "Can I apply for a spouse visa if my previous application was refused?",
    answer:
      "Yes, a previous refusal does not automatically prevent a future application. The key is understanding why the earlier application was refused and ensuring those issues are fully addressed. Our solicitors specialise in overturning refusals and have a strong track record of securing approvals on subsequent applications.",
  },
  {
    question: "What documents do I need for a spouse visa application?",
    answer:
      "You will typically need your passport, your partner's proof of immigration status, marriage or civil partnership certificate, financial evidence covering at least six months, English language test certificate, proof of adequate accommodation, and evidence of your genuine relationship such as photographs, correspondence, and joint financial documents. We provide a comprehensive checklist tailored to your specific circumstances.",
  },
  {
    question: "How long can I stay in the UK on a spouse visa?",
    answer:
      "An initial spouse visa is granted for 33 months (approximately 2.5 years) if applying from outside the UK, or 30 months if switching from within the UK. After this period, you can apply for an extension of a further 30 months. After completing five years on spouse visas, you become eligible to apply for indefinite leave to remain (settlement) in the UK.",
  },
  {
    question: "Do you offer payment plans for spouse visa applications?",
    answer:
      "Yes, we understand that legal fees combined with Home Office fees can represent a significant outlay. We offer flexible payment plans that allow you to spread the cost of our professional fees over several months. We discuss payment options during your free initial consultation so you can plan ahead with confidence.",
  },
];

export default function SpouseVisaSolicitorsPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="bg-brand-navy py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
            Specialist Immigration Law
          </p>
          <h1 className="font-heading font-bold text-white text-4xl lg:text-6xl mb-6">
            Spouse Visa Solicitors — 95% Success Rate, Fixed Fees
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Our dedicated spouse visa solicitors handle every aspect of your
            partner visa application. Transparent pricing, direct solicitor
            access, and a proven track record of bringing families together.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-3xl font-bold text-brand-gold">95%</p>
              <p className="text-sm text-slate-300 mt-1">Success Rate</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-3xl font-bold text-brand-gold">8–12</p>
              <p className="text-sm text-slate-300 mt-1">Week Processing</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-3xl font-bold text-brand-gold">£1,500</p>
              <p className="text-sm text-slate-300 mt-1">Fixed Fee From</p>
            </div>
          </div>
          <Button
            asChild
            size="lg"
            className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-base px-8"
          >
            <Link href="/contact-us">
              Check Your Spouse Visa Eligibility
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Spouse Visa Services */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Our Services
            </p>
            <h2 className="font-heading font-bold text-brand-navy text-3xl lg:text-5xl mb-4">
              Spouse Visa Services
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
              From initial applications to settlement, we provide end-to-end
              legal support for every stage of the spouse visa journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-heading font-bold text-brand-navy text-xl">
                    {service.title}
                  </h3>
                  <span className="text-brand-gold font-bold text-lg whitespace-nowrap ml-4">
                    {service.fee}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                  <Clock className="h-4 w-4 text-brand-gold" />
                  <span>{service.timeline}</span>
                </div>
                <ul className="space-y-3">
                  {service.included.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                      <span className="text-slate-500">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="bg-slate-50 py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Eligibility Criteria
            </p>
            <h2 className="font-heading font-bold text-brand-navy text-3xl lg:text-5xl mb-4">
              Spouse Visa Requirements
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
              Understanding the key requirements is the first step towards a
              successful application. Here is what the Home Office expects.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {requirements.map((req) => (
              <div
                key={req.title}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-brand-gold shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading font-bold text-brand-navy text-lg mb-2">
                      {req.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed">
                      {req.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              How It Works
            </p>
            <h2 className="font-heading font-bold text-brand-navy text-3xl lg:text-5xl mb-4">
              Our 5-Step Process
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
              A clear, structured approach from your first enquiry through to a
              successful decision.
            </p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200 hidden md:block" />
            <div className="space-y-12">
              {processSteps.map((step) => (
                <div key={step.step} className="flex items-start gap-6">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white font-bold text-lg">
                    {step.step}
                  </div>
                  <div className="pt-1">
                    <h3 className="font-heading font-bold text-brand-navy text-xl mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Common Problems We Solve */}
      <section className="bg-slate-50 py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Overcoming Obstacles
            </p>
            <h2 className="font-heading font-bold text-brand-navy text-3xl lg:text-5xl mb-4">
              Common Problems We Solve
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
              Difficult circumstances do not have to mean a refused application.
              Our solicitors regularly overcome these challenges.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problems.map((item) => (
              <div
                key={item.problem}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-5 w-5 text-brand-red shrink-0" />
                  <h3 className="font-heading font-bold text-brand-navy text-lg">
                    {item.problem}
                  </h3>
                </div>
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                  <p className="text-slate-500 leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparent Pricing */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Clear Pricing
            </p>
            <h2 className="font-heading font-bold text-brand-navy text-3xl lg:text-5xl mb-4">
              Transparent Pricing
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
              No hidden charges, no hourly surprises. Our fixed fees cover
              everything from initial consultation to decision.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-brand-navy text-white text-sm font-semibold">
                <div className="p-4 lg:p-6">Service</div>
                <div className="p-4 lg:p-6">Fee</div>
                <div className="p-4 lg:p-6">Details</div>
              </div>
              {pricing.map((row, index) => (
                <div
                  key={row.service}
                  className={`grid grid-cols-3 text-sm ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  <div className="p-4 lg:p-6 font-semibold text-brand-navy">
                    {row.service}
                  </div>
                  <div className="p-4 lg:p-6 font-bold text-brand-gold">
                    {row.price}
                  </div>
                  <div className="p-4 lg:p-6 text-slate-500">{row.note}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-sm">
              <CreditCard className="h-4 w-4 text-brand-gold" />
              <span>
                Flexible payment plans available — spread the cost over several
                months. Home Office fees are payable separately.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Your Questions Answered
            </p>
            <h2 className="font-heading font-bold text-brand-navy text-3xl lg:text-5xl mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 lg:p-8 list-none">
                  <span className="font-heading font-bold text-brand-navy text-lg pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown className="h-5 w-5 text-slate-400 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 lg:px-8 pb-6 lg:pb-8 -mt-2">
                  <p className="text-slate-500 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-navy py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
            Get Started Today
          </p>
          <h2 className="font-heading font-bold text-white text-3xl lg:text-5xl mb-6">
            Ready to Begin Your Spouse Visa Application?
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Book your free consultation with one of our specialist spouse visa
            solicitors. We will assess your eligibility, explain the process, and
            provide a fixed fee quote — all with no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-base px-8"
            >
              <Link href="/contact-us">
                Book Free Consultation
                <Phone className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline-light"
              className="rounded-xl text-base px-8"
            >
              <Link href="/our-fees">
                View All Fees
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
