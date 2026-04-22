import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Phone,
  PoundSterling,
  MessageSquare,
  Shield,
  Award,
  Heart,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Abrahams Solicitors | Immigration & Housing Law Experts",
  description:
    "Meet our experienced immigration and housing law team. SRA regulated, nationwide coverage, fixed fees. Direct solicitor access guaranteed.",
};

const stats = [
  { value: "5,000+", label: "Cases Handled" },
  { value: "98%", label: "Success Rate" },
  { value: "9+", label: "Professionals" },
  { value: "2", label: "Offices" },
];

const pillars = [
  {
    icon: Phone,
    title: "Direct Access Guarantee",
    description:
      "Always speak to your solicitor, never a call centre. Every client is assigned a dedicated solicitor who manages their case from start to finish, ensuring continuity and accountability throughout the entire process.",
  },
  {
    icon: PoundSterling,
    title: "Fixed Fee Transparency",
    description:
      "Know your costs upfront, no hidden charges or surprise bills. We provide clear, written fee agreements before any work begins so you can plan with confidence and focus on what matters most.",
  },
  {
    icon: MessageSquare,
    title: "Client Communication",
    description:
      "Regular updates, a responsive team, and clear plain-English advice. We believe that keeping you informed at every stage reduces stress and empowers you to make the best decisions for your future.",
  },
];

const teamMembers = [
  {
    name: "Ahrika Ghalib",
    role: "Principal Solicitor",
    specialisation: "Immigration Law",
    slug: "ahrika-ghalib",
  },
  {
    name: "Ansar Malik",
    role: "Senior Solicitor",
    specialisation: "Housing & Personal Injury",
    slug: "ansar-malik",
  },
  {
    name: "Adam Ejaz",
    role: "Solicitor",
    specialisation: "Immigration Law",
    slug: "adam-ejaz",
  },
  {
    name: "Faisal Mahmood",
    role: "Solicitor",
    specialisation: "Immigration Law",
    slug: "faisal-mahmood",
  },
  {
    name: "Jenna Sandhu",
    role: "Solicitor",
    specialisation: "Personal Injury",
    slug: "jenna-sandhu",
  },
  {
    name: "Mohamed Mohamed",
    role: "Solicitor",
    specialisation: "Immigration Law",
    slug: "mohamed-mohamed",
  },
  {
    name: "Nsrin Bairam",
    role: "Paralegal",
    specialisation: "Immigration Law",
    slug: "nsrin-bairam",
  },
  {
    name: "Savas Kaya",
    role: "Solicitor",
    specialisation: "Housing Law",
    slug: "savas-kaya",
  },
  {
    name: "Siama Naz",
    role: "Legal Secretary",
    specialisation: "Administration",
    slug: "siama-naz",
  },
];

const accreditations = [
  {
    icon: Shield,
    title: "SRA Regulated",
    description:
      "Abrahams Solicitors is authorised and regulated by the Solicitors Regulation Authority, ensuring we meet the highest standards of professional conduct and client care.",
  },
  {
    icon: Award,
    title: "Professional Memberships",
    description:
      "Our solicitors hold memberships with leading professional bodies, keeping us connected to best practice across immigration, housing, and personal injury law.",
  },
  {
    icon: Heart,
    title: "Diversity & Inclusion",
    description:
      "We are proud to serve clients from all backgrounds and communities. Our multilingual team reflects the diverse society we work within, and we are committed to equality in everything we do.",
  },
  {
    icon: BookOpen,
    title: "Continuing Professional Development",
    description:
      "Every member of our team participates in ongoing training and development, ensuring our advice is always informed by the latest legal developments and procedural changes.",
  },
];

export default function AboutUsPage() {
  return (
    <SiteLayout>
      {/* ── Hero ── */}
      <section className="bg-brand-navy py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
            Who We Are
          </p>
          <h1 className="font-heading font-bold text-white text-4xl lg:text-6xl mb-6">
            About Abrahams Solicitors
          </h1>
          <p className="text-lg leading-relaxed text-slate-300 max-w-2xl mx-auto">
            Founded on the principle that everyone deserves direct access to
            expert legal representation, we have spent years building a practice
            rooted in transparency, tenacity, and genuine care for the people
            we serve.
          </p>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Text column */}
            <div>
              <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
                Our Story
              </p>
              <h2 className="font-heading font-bold text-brand-navy text-3xl lg:text-5xl mb-8">
                Built on Principle, Driven by Results
              </h2>
              <div className="space-y-5 text-lg leading-relaxed text-slate-500">
                <p>
                  Abrahams Solicitors was founded by Ahrika Ghalib with a
                  singular vision: to create a law firm where every client
                  receives the same level of dedication and expertise, regardless
                  of the complexity of their case. What began as a specialist
                  immigration practice has grown into a multi-disciplinary firm
                  spanning immigration, housing disrepair, and personal injury
                  law.
                </p>
                <p>
                  From our offices in London and Bradford, we serve clients
                  across the United Kingdom. Our growth has been deliberate and
                  client-focused. Rather than expanding for expansion&apos;s
                  sake, we have added new practice areas only when we could
                  guarantee the same standard of direct solicitor access and
                  transparent advice that our clients have come to expect.
                </p>
                <p>
                  Today, our team of nine professionals brings together deep
                  specialist knowledge and a shared commitment to building
                  lasting relationships. Many of our clients return to us year
                  after year, and a significant proportion of new instructions
                  come through personal recommendations&mdash;a testament to the
                  trust we have earned.
                </p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm text-center"
                >
                  <p className="font-heading font-bold text-brand-navy text-4xl lg:text-5xl mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Approach ── */}
      <section className="bg-slate-50 py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Our Approach
            </p>
            <h2 className="font-heading font-bold text-brand-navy text-3xl lg:text-5xl mb-6">
              Three Pillars That Define Us
            </h2>
            <p className="text-lg leading-relaxed text-slate-500 max-w-2xl mx-auto">
              Every case we take on is guided by three non-negotiable
              commitments. These are not marketing slogans&mdash;they are
              promises we make to every client who walks through our doors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy/5 mb-6">
                  <pillar.icon className="h-6 w-6 text-brand-gold" />
                </div>
                <h3 className="font-heading font-bold text-brand-navy text-xl mb-3">
                  {pillar.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full Team ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Our People
            </p>
            <h2 className="font-heading font-bold text-brand-navy text-3xl lg:text-5xl mb-6">
              Meet the Team
            </h2>
            <p className="text-lg leading-relaxed text-slate-500 max-w-2xl mx-auto">
              Our solicitors, paralegals, and support staff work together as a
              close-knit team. Get to know the people who will be handling your
              case.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => {
              const initials = member.name
                .split(" ")
                .map((n) => n[0])
                .join("");
              return (
                <Link
                  key={member.slug}
                  href={`/our-team/${member.slug}/`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow h-full">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-navy text-white font-bold text-xl mb-5">
                      {initials}
                    </div>
                    <h3 className="font-heading font-bold text-brand-navy text-lg group-hover:text-brand-red transition-colors mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-brand-gold mb-1">
                      {member.role}
                    </p>
                    <p className="text-sm text-slate-500">
                      {member.specialisation}
                    </p>
                    <div className="mt-4 flex items-center text-sm font-medium text-brand-red opacity-0 group-hover:opacity-100 transition-opacity">
                      View profile
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Accreditations ── */}
      <section className="bg-slate-50 py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Standards & Accreditations
            </p>
            <h2 className="font-heading font-bold text-brand-navy text-3xl lg:text-5xl mb-6">
              Regulated, Accredited, Committed
            </h2>
            <p className="text-lg leading-relaxed text-slate-500 max-w-2xl mx-auto">
              We hold ourselves to the highest professional and ethical
              standards. Our accreditations reflect an ongoing commitment to
              quality, accountability, and continuous improvement.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {accreditations.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-brand-gold shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading font-bold text-brand-navy text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-brand-navy py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
            Get in Touch
          </p>
          <h2 className="font-heading font-bold text-white text-3xl lg:text-5xl mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-lg leading-relaxed text-slate-300 max-w-2xl mx-auto mb-10">
            Whether you need advice on an immigration application, a housing
            disrepair claim, or a personal injury matter, our team is here to
            help. Contact us today for an initial consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl"
            >
              <Link href="/contact-us/">Book a Consultation</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 rounded-xl"
            >
              <Link href="/our-team/">View Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
