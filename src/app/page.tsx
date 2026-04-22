import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site-layout";
import {
  Phone,
  Star,
  Scale,
  Home,
  Shield,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Quote,
  Clock,
  Users,
  Award,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Immigration Solicitors London | Housing Law | Abrahams Solicitors",
  description:
    "UK immigration & housing solicitors. Fixed fees, direct solicitor access nationwide. Spouse visas, citizenship, disrepair claims. Free consultation.",
};

const services = [
  {
    icon: Scale,
    title: "Immigration Law",
    description:
      "Visa applications, British citizenship, asylum claims, partner visas, and appeals. Expert guidance through every step of the immigration process.",
    href: "/immigration/",
    stats: "98% success rate",
    features: ["Spouse & Partner Visas", "British Citizenship", "Asylum Claims", "Visa Appeals"],
  },
  {
    icon: Home,
    title: "Housing Disrepair",
    description:
      "Property condition claims against landlords for damp, heating failures, structural issues. No win, no fee representation.",
    href: "/housing-disrepair/",
    stats: "No win, no fee",
    features: ["Damp & Mould", "Heating Failures", "Structural Issues", "Compensation Claims"],
  },
  {
    icon: Shield,
    title: "Personal Injury",
    description:
      "Work accidents, road traffic claims, and serious injuries. Dedicated legal team fighting for the compensation you deserve.",
    href: "/personal-injury/",
    stats: "No win, no fee",
    features: ["Workplace Accidents", "Road Traffic Claims", "Serious Injury", "Fatal Accidents"],
  },
];

const testimonials = [
  {
    text: "Abrahams Solicitors handled my spouse visa application with incredible professionalism. They made a stressful process feel manageable and kept me informed at every stage.",
    author: "Sarah M.",
    service: "Immigration",
  },
  {
    text: "After months of living with damp and mould, Abrahams helped me get proper compensation from my landlord. They were thorough, responsive, and genuinely cared about my situation.",
    author: "James T.",
    service: "Housing Disrepair",
  },
  {
    text: "Following my workplace accident, Ansar and the team secured a settlement that covered all my medical costs and lost earnings. I couldn't recommend them more highly.",
    author: "Priya K.",
    service: "Personal Injury",
  },
];

const comparisonPoints = [
  { feature: "Direct solicitor access", us: true, them: false },
  { feature: "Fixed, transparent fees", us: true, them: false },
  { feature: "Specialist immigration & housing focus", us: true, them: false },
  { feature: "Free initial consultation", us: true, them: false },
  { feature: "Nationwide coverage", us: true, them: true },
  { feature: "SRA regulated", us: true, them: true },
];

export default function HomePage() {
  return (
    <SiteLayout>
      {/* ── Hero ── */}
      <section className="relative bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-navy-light/60 via-transparent to-transparent" />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-8">
              <div className="flex -space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <span className="text-white/50 text-sm">5.0 from 120+ reviews</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-[1.05] tracking-tight">
              UK Immigration &amp; Housing Solicitors —{" "}
              <span className="text-brand-red">Direct Access, Fixed Fees</span>
            </h1>
            <p className="mt-8 text-lg lg:text-xl text-white/60 leading-relaxed max-w-2xl">
              No call centres. No hidden costs. No surprises. Speak directly to
              your dedicated solicitor from day one.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-base px-8 h-13"
              >
                <Link href="/contact-us/">
                  Free Immigration Consultation
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline-light"
                size="lg"
                className="rounded-xl text-base h-13"
              >
                <a href="tel:02034880512">
                  <Phone className="h-4 w-4 mr-2" />
                  020 3488 0512
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
            {[
              { icon: Star, value: "5,000+", label: "Cases Handled" },
              { icon: Award, value: "98%", label: "Success Rate" },
              { icon: Users, value: "9+", label: "Legal Professionals" },
              { icon: MapPin, value: "2", label: "UK Offices" },
            ].map((stat) => (
              <div key={stat.label} className="py-8 lg:py-10 text-center">
                <stat.icon className="h-5 w-5 text-brand-gold mx-auto mb-3" />
                <p className="text-2xl lg:text-3xl font-heading font-bold text-brand-navy">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Our Expertise
            </p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">
              Legal Services You Can Trust
            </h2>
            <p className="mt-5 text-lg text-slate-500 leading-relaxed">
              Specialising in immigration, housing, and personal injury law with
              a proven track record of results for clients nationwide.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group block bg-white rounded-2xl ring-1 ring-slate-200 p-8 lg:p-10 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-red/8 flex items-center justify-center mb-6">
                  <service.icon className="h-6 w-6 text-brand-red" />
                </div>
                <h3 className="text-xl font-heading font-bold text-brand-navy mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-brand-gold font-medium mb-4">
                  {service.stats}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2.5 mb-8">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-brand-navy/80"
                    >
                      <CheckCircle2 className="h-4 w-4 text-brand-gold shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center text-sm font-semibold text-brand-red group-hover:gap-2.5 gap-1.5 transition-all">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Abrahams ── */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
                Why Choose Us
              </p>
              <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">
                Your Goals Become Our Mission
              </h2>
              <p className="mt-6 text-lg text-slate-500 leading-relaxed">
                At Abrahams Solicitors, we understand legal matters can be
                overwhelming. Our dedicated team provides clear, practical, and
                effective solutions tailored to your specific needs.
              </p>
              <div className="mt-10 space-y-5">
                {[
                  {
                    title: "Direct Solicitor Access",
                    desc: "Speak to your solicitor directly — never a call centre",
                  },
                  {
                    title: "Fixed, Transparent Fees",
                    desc: "Know your costs upfront with no hidden charges",
                  },
                  {
                    title: "Specialist Focus",
                    desc: "Immigration and housing law is all we do",
                  },
                  {
                    title: "Nationwide Coverage",
                    desc: "Offices in London and Bradford, serving clients UK-wide",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-navy">{item.title}</p>
                      <p className="text-sm text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Button
                  asChild
                  className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl"
                >
                  <Link href="/about-us/">
                    Meet Our Team
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Comparison table */}
            <div className="bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-brand-navy text-white text-sm font-semibold">
                <div className="p-5 col-span-1" />
                <div className="p-5 text-center">Abrahams</div>
                <div className="p-5 text-center text-white/60">Large Firms</div>
              </div>
              {comparisonPoints.map((point, i) => (
                <div
                  key={point.feature}
                  className={`grid grid-cols-3 text-sm ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  }`}
                >
                  <div className="p-4 pl-5 text-brand-navy/80">{point.feature}</div>
                  <div className="p-4 text-center">
                    <CheckCircle2 className="h-5 w-5 text-brand-gold mx-auto" />
                  </div>
                  <div className="p-4 text-center">
                    {point.them ? (
                      <CheckCircle2 className="h-5 w-5 text-slate-300 mx-auto" />
                    ) : (
                      <span className="text-slate-300">&mdash;</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team Preview ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Our Team
            </p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">
              Meet Your Legal Team
            </h2>
            <p className="mt-5 text-lg text-slate-500 leading-relaxed">
              Experienced solicitors dedicated to achieving the best outcomes for
              every client.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Ahrika Ghalib",
                role: "Principal Solicitor",
                area: "Immigration Law",
                href: "/our-team/ahrika-ghalib/",
              },
              {
                name: "Ansar Malik",
                role: "Senior Solicitor",
                area: "Housing & Personal Injury",
                href: "/our-team/ansar-malik/",
              },
              {
                name: "Adam Ejaz",
                role: "Solicitor",
                area: "Immigration Law",
                href: "/our-team/adam-ejaz/",
              },
            ].map((member) => (
              <Link key={member.name} href={member.href} className="group block">
                <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-brand-navy flex items-center justify-center text-white font-heading text-xl font-bold mb-6">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="text-lg font-heading font-bold text-brand-navy group-hover:text-brand-red transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-brand-red text-sm font-medium mt-1">
                    {member.role}
                  </p>
                  <p className="text-xs text-slate-400 mt-3 uppercase tracking-wider font-medium">
                    {member.area}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/about-us/">
                View Full Team
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Client Reviews
            </p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 lg:p-10 shadow-sm"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-brand-gold text-brand-gold"
                    />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-brand-red/15 mb-4" />
                <p className="text-slate-600 text-[15px] leading-relaxed mb-8 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="border-t border-slate-100 pt-5">
                  <p className="font-semibold text-brand-navy text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {testimonial.service} Client
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Locations ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Our Locations
            </p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">
              Visit Our Offices
            </h2>
            <p className="mt-5 text-lg text-slate-500">
              London and Bradford offices serving clients nationwide.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                city: "London",
                address: "Suite 10, Atlas House, 1 King Street, London EC2V 8AU",
                phone: "020 3488 0512",
                transport: "Bank, Mansion House, Cannon Street stations",
              },
              {
                city: "Bradford",
                address: "2nd Floor, 6 Piccadilly, Bradford BD1 3LS",
                phone: "020 3488 0512",
                transport: "Bradford Interchange station",
              },
            ].map((office) => (
              <div
                key={office.city}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 lg:p-10 shadow-sm"
              >
                <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-5">
                  {office.city} Office
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-brand-gold/60 shrink-0 mt-0.5" />
                    <p className="text-brand-navy">{office.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-brand-gold/60 shrink-0" />
                    <a
                      href={`tel:${office.phone.replace(/\s/g, "")}`}
                      className="text-brand-navy hover:text-brand-red transition-colors"
                    >
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-brand-gold/60 shrink-0" />
                    <p className="text-slate-500 text-sm">Mon &ndash; Fri: 9:00am &ndash; 5:30pm</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-5">
                  Nearest stations: {office.transport}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-brand-navy py-24 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white leading-tight">
            Speak to Your Dedicated Solicitor Today
          </h2>
          <p className="mt-6 text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Book a free consultation to discuss your case. We offer phone, video,
            and in-person appointments.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-base h-13 px-8"
            >
              <Link href="/contact-us/">Make an Appointment</Link>
            </Button>
            <Button
              asChild
              variant="outline-light"
              size="lg"
              className="rounded-xl text-base h-13"
            >
              <a href="tel:02034880512">
                <Phone className="h-4 w-4 mr-2" />
                020 3488 0512
              </a>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
