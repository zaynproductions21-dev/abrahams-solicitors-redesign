import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Award,
  Briefcase,
  GraduationCap,
  Scale,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Phone,
  Clock,
  Train,
  ChevronDown,
  Users,
  PoundSterling,
  Gavel,
  FileCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Immigration Solicitors London | UK Visa Experts | Abrahams Law",
  description:
    "Expert London immigration solicitors for UK visas, spouse visas, citizenship applications. Fixed fees, direct access. Book free consultation today.",
};

const services = [
  {
    icon: Heart,
    title: "Spouse & Partner Visas",
    description:
      "Reunite with your loved one in the UK. We handle spouse visa applications, partner visas, and fiance visas with meticulous attention to the financial and relationship evidence required by the Home Office.",
  },
  {
    icon: Award,
    title: "British Citizenship",
    description:
      "From naturalisation applications to registration for children born abroad, our team guides you through every step of securing British citizenship, including complex good character assessments.",
  },
  {
    icon: Briefcase,
    title: "Work Visas",
    description:
      "Skilled Worker visas, Global Talent endorsements, and sponsor licence applications. We advise both employers and individuals on lawful routes to work in the United Kingdom.",
  },
  {
    icon: GraduationCap,
    title: "Student Visas",
    description:
      "Expert guidance on Student visa applications, Short-term Study visas, and switching from student to post-study work routes under the Graduate visa scheme.",
  },
  {
    icon: Scale,
    title: "Visa Appeals",
    description:
      "Refused a visa or facing removal? Our solicitors have extensive experience before the First-tier and Upper Tribunals, challenging unlawful Home Office decisions on your behalf.",
  },
  {
    icon: ShieldCheck,
    title: "Asylum & Human Rights",
    description:
      "Compassionate, expert representation for asylum seekers and those with human rights claims. We prepare thorough cases supported by country evidence and medical reports.",
  },
];

const whyChoose = [
  {
    icon: MapPin,
    title: "Local Home Office Expertise",
    description:
      "Our London solicitors attend the capital's Home Office reporting centres and premium service centres regularly. We understand how London caseworkers assess applications and tailor our submissions accordingly.",
  },
  {
    icon: Users,
    title: "Direct Solicitor Access Guaranteed",
    description:
      "You will never be passed between multiple handlers. A named, qualified solicitor manages your case from initial consultation through to decision, giving you a single point of contact at all times.",
  },
  {
    icon: PoundSterling,
    title: "Fixed Transparent Fees",
    description:
      "No hidden charges and no hourly billing surprises. We quote a fixed fee before we begin work so you can plan your finances with confidence. If your case becomes more complex, we discuss costs openly.",
  },
  {
    icon: Gavel,
    title: "Court Representation Experience",
    description:
      "When cases proceed to tribunal or judicial review, our solicitors have the courtroom experience to represent you effectively. We have secured successful outcomes at every level of the immigration tribunal system.",
  },
];

const successStories = [
  {
    outcome: "Spouse Visa Approved After Initial Refusal",
    description:
      "Our client, a British citizen, had their spouse visa application refused due to insufficient evidence of a genuine relationship. We gathered comprehensive supporting documentation, including detailed witness statements, financial records, and communication evidence spanning three years. The fresh application was approved within eight weeks.",
    stat: "8 weeks",
    statLabel: "to approval",
  },
  {
    outcome: "British Citizenship Granted for Long-term Resident",
    description:
      "A long-term London resident with over 15 years of continuous lawful residence was concerned about gaps in their residency history. Our team meticulously reconstructed their immigration timeline, addressed good character concerns, and prepared a robust naturalisation application that was granted on the first attempt.",
    stat: "15+ years",
    statLabel: "of residence evidenced",
  },
  {
    outcome: "Asylum Claim Won at Appeal",
    description:
      "After an initial refusal by the Home Office, we represented our client at the First-tier Tribunal. Through expert country evidence, detailed witness preparation, and a compelling legal submission highlighting flaws in the original decision, the tribunal allowed the appeal and granted our client refugee status.",
    stat: "Appeal allowed",
    statLabel: "refugee status granted",
  },
];

const faqs = [
  {
    question: "How much do London immigration solicitors charge?",
    answer:
      "Our London office operates on a fixed-fee basis for most immigration services. Spouse visa applications typically range from £1,500 to £3,000 plus VAT, depending on complexity. Citizenship applications start from £1,200 plus VAT. We provide a detailed fee quote during your free initial consultation so there are no surprises.",
  },
  {
    question: "Do I need to visit your London office in person?",
    answer:
      "While we welcome in-person consultations at our City of London office, we also offer video and telephone appointments for clients who cannot attend. Document submission can be handled securely online. For tribunal hearings in London, we attend the hearing centre on your behalf.",
  },
  {
    question: "How long does a UK visa application take from London?",
    answer:
      "Processing times vary by visa type. Standard spouse visa applications take around 12 weeks, while the Home Office priority service (available for many application types) can reduce this to as little as 5 working days. During your consultation, we advise on the most realistic timeline for your specific case.",
  },
  {
    question: "Can you help if my visa application has already been refused?",
    answer:
      "Absolutely. We regularly assist clients whose applications have been refused by the Home Office. We will review the refusal letter, assess the merits of an appeal or fresh application, and advise on the strongest route forward. Many of our successful cases began as refusals handled elsewhere.",
  },
  {
    question: "Are your London immigration solicitors regulated?",
    answer:
      "Yes. Abrahams Solicitors is authorised and regulated by the Solicitors Regulation Authority (SRA). All of our immigration solicitors hold current practising certificates and are registered with the Office of the Immigration Services Commissioner (OISC). You can verify our credentials on the SRA website.",
  },
];

export default function ImmigrationSolicitorsLondonPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-brand-navy">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-24 lg:py-32 text-center">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
            London Immigration Law Firm
          </p>
          <h1 className="font-heading font-bold text-white text-4xl lg:text-6xl leading-tight mb-6">
            Immigration Solicitors London — Your UK Visa Experts
          </h1>
          <p className="text-slate-300 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Serving London clients with expert immigration advice. From spouse
            visas to citizenship, asylum to appeals, our City of London
            solicitors deliver results you can rely on.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl px-8 py-3 text-base"
            >
              <Link href="/contact-us">Book Free London Consultation</Link>
            </Button>
            <Button
              asChild
              variant="outline-light"
              size="lg"
              className="rounded-xl px-8 py-3 text-base"
            >
              <Link href="tel:02034880512">
                <Phone className="size-4 mr-2" />
                020 3488 0512
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* London Immigration Services */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Our Services
            </p>
            <h2 className="font-heading font-bold text-brand-navy text-3xl lg:text-5xl mb-4">
              London Immigration Services
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
              Our London solicitors handle the full spectrum of UK immigration
              matters, providing specialist advice tailored to your
              circumstances.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <service.icon className="size-10 text-brand-gold mb-5" />
                <h3 className="font-heading font-bold text-brand-navy text-xl mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* London Office Details */}
      <section className="bg-slate-50 py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Visit Us
            </p>
            <h2 className="font-heading font-bold text-brand-navy text-3xl lg:text-5xl mb-4">
              Our London Office
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
              Conveniently located in the City of London, our office is easily
              accessible by public transport and offers a discreet, professional
              environment for consultations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm">
              <MapPin className="size-8 text-brand-gold mb-4" />
              <h3 className="font-heading font-bold text-brand-navy text-lg mb-2">
                Address
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Suite 10, Atlas House
                <br />
                1 King Street
                <br />
                London EC2V 8AU
              </p>
            </div>
            <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm">
              <Phone className="size-8 text-brand-gold mb-4" />
              <h3 className="font-heading font-bold text-brand-navy text-lg mb-2">
                Telephone
              </h3>
              <p className="text-slate-500 leading-relaxed">
                <Link
                  href="tel:02034880512"
                  className="hover:text-brand-navy transition-colors"
                >
                  020 3488 0512
                </Link>
              </p>
            </div>
            <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm">
              <Train className="size-8 text-brand-gold mb-4" />
              <h3 className="font-heading font-bold text-brand-navy text-lg mb-2">
                Transport Links
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Bank Station (5 min)
                <br />
                Mansion House (4 min)
                <br />
                Cannon Street (6 min)
              </p>
            </div>
            <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm">
              <Clock className="size-8 text-brand-gold mb-4" />
              <h3 className="font-heading font-bold text-brand-navy text-lg mb-2">
                Opening Hours
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Monday &ndash; Friday
                <br />
                9:00am &ndash; 5:30pm
                <br />
                Weekend by appointment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our London Team */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Why Abrahams
            </p>
            <h2 className="font-heading font-bold text-brand-navy text-3xl lg:text-5xl mb-4">
              Why Choose Our London Team
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
              We combine deep knowledge of the UK immigration system with a
              personal, client-focused approach that sets us apart from larger,
              impersonal firms.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {whyChoose.map((item) => (
              <div
                key={item.title}
                className="flex gap-5"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center">
                    <item.icon className="size-6 text-brand-gold" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-brand-navy text-xl mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* London Success Stories */}
      <section className="bg-slate-50 py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Case Studies
            </p>
            <h2 className="font-heading font-bold text-brand-navy text-3xl lg:text-5xl mb-4">
              London Success Stories
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
              Real outcomes for real clients. These anonymised case studies
              illustrate the quality of work our London immigration team
              delivers.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <div
                key={story.outcome}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-5">
                  <CheckCircle2 className="size-8 text-brand-gold mb-3" />
                  <h3 className="font-heading font-bold text-brand-navy text-xl mb-3">
                    {story.outcome}
                  </h3>
                </div>
                <p className="text-slate-500 leading-relaxed mb-6">
                  {story.description}
                </p>
                <div className="pt-5 border-t border-slate-100">
                  <p className="font-heading font-bold text-brand-navy text-2xl">
                    {story.stat}
                  </p>
                  <p className="text-slate-400 text-sm uppercase tracking-wide">
                    {story.statLabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Common Questions
            </p>
            <h2 className="font-heading font-bold text-brand-navy text-3xl lg:text-5xl mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
              Answers to the questions our London clients ask most often. If you
              need further guidance, get in touch for a free consultation.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 list-none">
                  <span className="font-heading font-bold text-brand-navy text-lg pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown className="size-5 text-slate-400 flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-slate-500 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-navy">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-24 lg:py-32 text-center">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
            Take the First Step
          </p>
          <h2 className="font-heading font-bold text-white text-3xl lg:text-5xl mb-6">
            Get Expert London Immigration Advice Today
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Whether you are applying for a visa, facing a refusal, or planning
            your route to British citizenship, our London solicitors are ready to
            help. Book a free, no-obligation consultation and find out where you
            stand.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl px-8 py-3 text-base"
            >
              <Link href="/contact-us">Book Free Consultation</Link>
            </Button>
            <Button
              asChild
              variant="outline-light"
              size="lg"
              className="rounded-xl px-8 py-3 text-base"
            >
              <Link href="tel:02034880512">
                <Phone className="size-4 mr-2" />
                020 3488 0512
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
