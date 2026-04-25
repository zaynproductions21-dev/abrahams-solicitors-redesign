import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Phone, Star, Scale, Home, Shield, ArrowRight, MapPin,
  CheckCircle2, Quote, Clock, Users, Award, MessageCircle,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "V1 Clean Professional | Abrahams Solicitors",
  description: "Design variation 1 — Clean Professional. UK immigration & housing solicitors.",
};

const services = [
  {
    icon: Scale, title: "Immigration Law",
    description: "Visa applications, ILR (permanent residency), asylum claims, partner visas, and appeals. Expert guidance through every step of the immigration process.",
    href: "/v1/immigration/", stats: "From £1,500",
    features: ["Spouse & Partner Visas", "ILR (Permanent Residency)", "Asylum Claims", "Visa Appeals"],
  },
  {
    icon: Home, title: "Housing Disrepair",
    description: "Property condition claims against landlords for damp, heating failures, and structural issues. No Win, No Fee representation — you pay nothing unless we win.",
    href: "/v1/housing-disrepair/", stats: "No Win, No Fee",
    features: ["Damp & Mould", "Heating Failures", "Structural Issues", "Compensation Claims"],
  },
  {
    icon: Shield, title: "British Citizenship",
    description: "Helping you secure the right to call the UK home. From naturalisation to registration, our solicitors guide you through every step of the citizenship process.",
    href: "/v1/british-citizenship/", stats: "From £1,200",
    features: ["Naturalisation", "Registration", "Dual Citizenship", "Citizenship Ceremonies"],
  },
];

const testimonials = [
  { text: "Abrahams Solicitors handled my spouse visa application with incredible professionalism. They made a stressful process feel manageable and kept me informed at every stage.", author: "Sarah M.", service: "Immigration" },
  { text: "After months of living with damp and mould, Abrahams helped me get proper compensation from my landlord. They were thorough, responsive, and genuinely cared about my situation.", author: "James T.", service: "Housing Disrepair" },
  { text: "Adam helped me through my British citizenship application after living in the UK for 12 years. The whole process was smooth and stress-free.", author: "Fatima A.", service: "British Citizenship" },
];

const faqs = [
  {
    question: "How much does a spouse visa application cost?",
    answer: "We offer a fixed fee from £1,500 for spouse and partner visa applications. This covers the full legal service — preparing your application, reviewing documents, and submitting to the Home Office. There are no hidden costs. Home Office application fees and the Immigration Health Surcharge are payable separately to the government.",
  },
  {
    question: "What is ILR and how do I apply?",
    answer: "ILR stands for Indefinite Leave to Remain — it is the UK's form of permanent residency. Once granted, you can live and work in the UK without any visa restrictions. Most applicants qualify after five years of continuous lawful residence, though certain visa routes have different requirements. Our fixed fee for ILR applications starts from £1,200. We will assess your eligibility and manage the entire application on your behalf.",
  },
  {
    question: "Can you help with damp and mould in my rented home?",
    answer: "Yes. If your landlord has failed to repair damp, mould, heating problems, or structural issues despite being notified, you may be entitled to compensation. We handle all housing disrepair claims on a No Win, No Fee basis — meaning you pay nothing unless your claim succeeds. Get in touch for a free assessment of your situation.",
  },
  {
    question: "How do your fixed fees work?",
    answer: "We believe in complete transparency. Before we begin any work, we will give you a clear, written quote covering everything included in your matter. No hidden charges, no unexpected invoices. For housing disrepair and certain other cases we work on a No Win, No Fee basis. For immigration and citizenship work, fixed fees are agreed upfront so you always know exactly where you stand.",
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

export default function V1HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-navy-light/60 via-transparent to-transparent" />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-28 lg:py-40">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-8">
              <div className="flex -space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <span className="text-white/40 text-sm">5.0 from 120+ reviews</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-[1.05] tracking-tight">
              Visa refused? Citizenship delayed?{" "}
              <span className="text-brand-red">We&rsquo;ll fight your corner.</span>
            </h1>
            <p className="mt-8 text-lg lg:text-xl text-white/50 leading-relaxed max-w-2xl">
              No call centres. No hidden costs. No surprises. Speak directly to your dedicated solicitor from day one.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-base px-8 h-13">
                <Link href="/v1/contact-us/">Free Immigration Consultation<ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
              <Button asChild variant="outline-light" size="lg" className="rounded-xl text-base h-13">
                <a href="tel:02033559823"><Phone className="h-4 w-4 mr-2" />0203 355 9823</a>
              </Button>
              <Button asChild variant="outline-light" size="lg" className="rounded-xl text-base h-13">
                <a href="https://wa.me/442033559823" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
            {[
              { icon: Star, value: "5,000+", label: "Cases Handled" },
              { icon: Award, value: "98%", label: "Success Rate" },
              { icon: Users, value: "9+", label: "Legal Professionals" },
              { icon: MapPin, value: "2", label: "UK Offices" },
            ].map((stat) => (
              <div key={stat.label} className="py-10 lg:py-12 text-center">
                <stat.icon className="h-5 w-5 text-brand-gold mx-auto mb-3" />
                <p className="text-2xl lg:text-3xl font-heading font-bold text-brand-navy">{stat.value}</p>
                <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-28 lg:py-36">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Our Expertise</p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">Legal Services You Can Trust</h2>
            <p className="mt-5 text-lg text-slate-400 leading-relaxed">Specialising in immigration, housing disrepair, and British citizenship law with a proven track record of results for clients nationwide.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link key={service.title} href={service.href} className="group block bg-white rounded-2xl ring-1 ring-slate-200 p-8 lg:p-10 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-brand-red/8 flex items-center justify-center mb-6">
                  <service.icon className="h-6 w-6 text-brand-red" />
                </div>
                <h3 className="text-xl font-heading font-bold text-brand-navy mb-2">{service.title}</h3>
                <p className="text-sm text-brand-gold font-semibold mb-4">{service.stats}</p>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2.5 mb-8">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-brand-navy/80">
                      <CheckCircle2 className="h-4 w-4 text-brand-gold shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center text-sm font-semibold text-brand-red group-hover:gap-2.5 gap-1.5 transition-all">
                  Learn More<ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-28 lg:py-36 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Why Choose Us</p>
              <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">Your Goals Become Our Mission</h2>
              <p className="mt-6 text-lg text-slate-500 leading-relaxed">At Abrahams Solicitors, we understand legal matters can be overwhelming. Our dedicated team provides clear, practical, and effective solutions tailored to your specific needs.</p>
              <div className="mt-10 space-y-5">
                {[
                  { title: "Direct Solicitor Access", desc: "Speak to your solicitor directly — never a call centre" },
                  { title: "Fixed, Transparent Fees", desc: "Know your costs upfront with no hidden charges" },
                  { title: "Specialist Focus", desc: "Immigration, housing disrepair, and citizenship law is all we do" },
                  { title: "Nationwide Coverage", desc: "Based in Yorkshire with London offices. Video consultations available nationwide — your solicitor is never more than a call away." },
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
                <Button asChild className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl">
                  <Link href="/v1/about-us/">Meet Our Team<ArrowRight className="h-4 w-4 ml-2" /></Link>
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-2xl ring-1 ring-slate-200 overflow-hidden">
              <div className="grid grid-cols-3 bg-brand-navy text-white text-sm font-semibold">
                <div className="p-5 col-span-1" />
                <div className="p-5 text-center">Abrahams</div>
                <div className="p-5 text-center text-white/60">Large Firms</div>
              </div>
              {comparisonPoints.map((point, i) => (
                <div key={point.feature} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                  <div className="p-4 pl-5 text-brand-navy/80">{point.feature}</div>
                  <div className="p-4 text-center"><CheckCircle2 className="h-5 w-5 text-brand-gold mx-auto" /></div>
                  <div className="p-4 text-center">
                    {point.them ? <CheckCircle2 className="h-5 w-5 text-slate-300 mx-auto" /> : <span className="text-slate-300">&mdash;</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-28 lg:py-36">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Our Team</p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">Meet Your Legal Team</h2>
            <p className="mt-5 text-lg text-slate-400 leading-relaxed">Experienced solicitors dedicated to achieving the best outcomes for every client.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Ahrika Ghalib", role: "Principal Solicitor", area: "Immigration Law" },
              { name: "Ansar Malik", role: "Senior Solicitor", area: "Housing Disrepair" },
              { name: "Adam Ejaz", role: "Solicitor", area: "Immigration & British Citizenship" },
            ].map((member) => (
              <div key={member.name} className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 hover:shadow-md transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-brand-navy flex items-center justify-center text-white font-heading text-xl font-bold mb-6">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-navy">{member.name}</h3>
                <p className="text-brand-red text-sm font-medium mt-1">{member.role}</p>
                <p className="text-xs text-slate-400 mt-3 uppercase tracking-wider font-medium">{member.area}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/v1/about-us/">View Full Team<ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 lg:py-36 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Client Reviews</p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">What Our Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.author} className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 lg:p-10">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />)}
                </div>
                <Quote className="h-8 w-8 text-brand-red/15 mb-4" />
                <p className="text-slate-600 text-[15px] leading-relaxed mb-8 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="border-t border-slate-100 pt-5">
                  <p className="font-semibold text-brand-navy text-sm">{t.author}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{t.service} Client</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 lg:py-36">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Common Questions</p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">Frequently Asked Questions</h2>
            <p className="mt-5 text-lg text-slate-400 leading-relaxed">Plain-English answers to the questions we hear most often.</p>
          </div>
          <div className="max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-white rounded-2xl ring-1 ring-slate-200 overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 p-6 lg:p-8 cursor-pointer list-none text-brand-navy font-semibold text-base lg:text-lg select-none hover:text-brand-red transition-colors">
                  {faq.question}
                  <span className="shrink-0 w-6 h-6 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold text-sm group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <div className="px-6 lg:px-8 pb-6 lg:pb-8 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-5">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-28 lg:py-36 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Our Locations</p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">Visit Our Offices</h2>
            <p className="mt-5 text-lg text-slate-400">London and Yorkshire offices serving clients nationwide.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { city: "London", address: "Suite 10, Atlas House, 1 King Street, London EC2V 8AU", phone: "0203 355 9823", transport: "Bank, Mansion House, Cannon Street stations" },
              { city: "Bradford", address: "2nd Floor, 6 Piccadilly, Bradford BD1 3LS", phone: "0203 355 9823", transport: "Bradford Interchange station" },
            ].map((office) => (
              <div key={office.city} className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 lg:p-10">
                <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-5">{office.city} Office</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-brand-gold/60 shrink-0 mt-0.5" />
                    <p className="text-brand-navy">{office.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-brand-gold/60 shrink-0" />
                    <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="text-brand-navy hover:text-brand-red transition-colors">{office.phone}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-brand-gold/60 shrink-0" />
                    <p className="text-slate-500 text-sm">Mon &ndash; Fri: 9:00am &ndash; 5:30pm</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-5">Nearest stations: {office.transport}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy py-28 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white leading-tight">Speak to Your Dedicated Solicitor Today</h2>
          <p className="mt-6 text-white/40 text-lg max-w-xl mx-auto leading-relaxed">Book a free consultation to discuss your case. We offer phone, video, and in-person appointments.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-base h-13 px-8">
              <Link href="/v1/contact-us/">Make an Appointment</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg" className="rounded-xl text-base h-13">
              <a href="tel:02033559823"><Phone className="h-4 w-4 mr-2" />0203 355 9823</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
