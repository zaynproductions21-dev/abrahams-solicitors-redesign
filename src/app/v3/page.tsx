import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Phone, Star, Scale, Home, Award, ArrowRight, CheckCircle2,
  MapPin, Clock, MessageCircle,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "V3 Creative Expressive | Abrahams Solicitors",
  description: "Design variation 3 — Creative Expressive. UK immigration, housing & citizenship solicitors.",
};

const services = [
  {
    num: "01", icon: Scale, title: "Immigration Law",
    price: "From £1,500",
    description: "Visa applications, ILR (permanent residency), asylum claims, partner visas, and appeals. Expert guidance through every step of the immigration process.",
    features: ["Spouse & Partner Visas", "ILR (Permanent Residency)", "Asylum Claims", "Visa Appeals"],
    href: "/v3/immigration/",
  },
  {
    num: "02", icon: Home, title: "Housing Disrepair",
    price: "No Win, No Fee",
    description: "Property condition claims against landlords for damp, heating failures, structural issues. No win, no fee representation.",
    features: ["Damp & Mould", "Heating Failures", "Structural Issues", "Compensation Claims"],
    href: "/v3/housing-disrepair/",
  },
  {
    num: "03", icon: Award, title: "British Citizenship",
    price: "From £1,200",
    description: "Supporting families through every route to British citizenship — from naturalisation to registration and dual citizenship. We make a momentous occasion feel as smooth as it should.",
    features: ["Naturalisation", "Registration", "Dual Citizenship", "Ceremonies"],
    href: "/v3/british-citizenship/",
  },
];

const whyUs = [
  { num: "01", title: "Direct Solicitor Access", desc: "Speak to your solicitor directly — never a call centre or receptionist." },
  { num: "02", title: "Fixed, Transparent Fees", desc: "Know your costs upfront. We quote before we start." },
  { num: "03", title: "Specialist Expertise", desc: "Immigration, housing, and citizenship law is our sole focus." },
  { num: "04", title: "Yorkshire Firm, Nationwide Heart", desc: "A Yorkshire firm with a nationwide heart. Video consultations available anywhere in the UK." },
];

const faqs = [
  {
    q: "How much does a spouse visa cost?",
    a: "We charge a fixed fee from £1,500 for spouse and partner visa applications. That covers everything — no surprise invoices once we've agreed the scope.",
  },
  {
    q: "What is ILR?",
    a: "ILR stands for Indefinite Leave to Remain — it is essentially permanent residency in the UK. Once granted, you can live and work here without any time restriction. We handle ILR applications from £1,200.",
  },
  {
    q: "Can you help with damp and mould in my home?",
    a: "Yes. If your landlord has failed to fix damp, mould, or other serious disrepair, you may be entitled to compensation. We take housing disrepair cases on a no win, no fee basis, so there is no financial risk to you.",
  },
  {
    q: "How do fixed fees work?",
    a: "We agree a clear, all-inclusive price before any work begins. You pay the amount quoted — nothing more. There are no hidden extras, no hourly billing surprises.",
  },
];

export default function V3HomePage() {
  return (
    <>
      {/* Hero — Editorial split */}
      <section className="relative bg-brand-navy overflow-hidden min-h-[90vh] flex items-center">
        {/* Decorative watermark */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 text-[500px] font-heading font-bold text-white/[0.02] select-none pointer-events-none leading-none">
          A
        </div>
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-32 lg:py-40">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-3">
              {/* Corner brackets */}
              <div className="relative inline-block mb-8">
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-brand-gold" />
                <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.3em] px-2">Immigration &amp; Housing Solicitors</p>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-white leading-[0.95] tracking-tight">
                <span className="block">We help</span>
                <span className="block">families</span>
                <span className="block text-brand-gold">stay together.</span>
              </h1>
              <p className="mt-6 text-2xl sm:text-3xl font-heading font-semibold text-white/70 leading-snug">
                And tenants live safely.
              </p>
              <p className="mt-6 text-lg text-white/40 leading-relaxed max-w-lg">
                No call centres. No hidden costs. Speak directly to your dedicated solicitor from day one.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button asChild className="bg-transparent hover:bg-brand-gold/10 text-brand-gold border-2 border-brand-gold rounded-xl text-base px-8 h-13 font-semibold">
                  <Link href="/v3/contact-us/">Begin Your Consultation<ArrowRight className="h-4 w-4 ml-2" /></Link>
                </Button>
                <a
                  href="https://wa.me/442033559823"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-brand-gold transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />WhatsApp Us
                </a>
                <a href="tel:02033559823" className="text-white/50 hover:text-brand-gold transition-colors text-sm font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4" />0203 355 9823
                </a>
              </div>
            </div>

            {/* Right — Stats card overlapping */}
            <div className="lg:col-span-2 hidden lg:block">
              <div className="relative">
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-brand-gold" />
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-brand-gold" />
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 ring-1 ring-brand-gold/20">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />)}
                    <span className="text-white/40 text-sm ml-2">5.0</span>
                  </div>
                  <div className="space-y-6">
                    {[
                      { value: "5,000+", label: "Cases Handled" },
                      { value: "98%", label: "Success Rate" },
                      { value: "9+", label: "Legal Professionals" },
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-baseline justify-between border-b border-white/10 pb-4 last:border-0">
                        <span className="text-3xl font-heading font-bold text-brand-gold">{stat.value}</span>
                        <span className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Strip */}
      <section className="border-y border-brand-gold/20 bg-[#faf9f6]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-5 text-xs font-semibold text-brand-navy/50 uppercase tracking-[0.15em]">
            <span>SRA Regulated</span>
            <span className="text-brand-gold">|</span>
            <span>5,000+ Cases</span>
            <span className="text-brand-gold">|</span>
            <span>Est. London &amp; Bradford</span>
            <span className="text-brand-gold">|</span>
            <span>120+ Five-Star Reviews</span>
          </div>
        </div>
      </section>

      {/* Services — Asymmetric rows */}
      <section className="py-28 lg:py-36 bg-[#faf9f6]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="mb-20">
            <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.3em] mb-4">Practice Areas</p>
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-brand-navy leading-tight">What We Do</h2>
          </div>
          <div className="space-y-16">
            {services.map((service, i) => (
              <Link key={service.title} href={service.href} className={`group grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                <div className={`relative ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  {/* Large background number */}
                  <span className="absolute -top-8 -left-4 text-[120px] font-heading font-bold text-brand-gold/[0.07] leading-none select-none">{service.num}</span>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-6">
                      <service.icon className="h-6 w-6 text-brand-gold" />
                    </div>
                    <h3 className="text-3xl font-heading font-bold text-brand-navy mb-2 group-hover:text-brand-gold transition-colors">{service.title}</h3>
                    <p className="text-brand-gold font-semibold text-sm mb-4">{service.price}</p>
                    <div className="w-12 h-px bg-brand-gold mb-6" />
                    <p className="text-slate-500 leading-relaxed mb-6">{service.description}</p>
                    <ul className="space-y-2.5 mb-8">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-brand-navy/70">
                          <CheckCircle2 className="h-4 w-4 text-brand-gold shrink-0" />{f}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center text-sm font-semibold text-brand-gold group-hover:gap-2.5 gap-1.5 transition-all">
                      Explore<ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="relative">
                    <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-brand-gold" />
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-brand-gold" />
                    <div className="bg-brand-navy/5 rounded-xl aspect-[4/3] flex items-center justify-center">
                      <span className="text-6xl font-heading font-bold text-brand-navy/10">{service.num}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pull Quote — Full-width dark (citizenship testimonial) */}
      <section className="bg-brand-navy py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 text-[200px] font-heading font-bold text-brand-gold/[0.05] leading-none select-none">&ldquo;</div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-xl lg:text-2xl xl:text-3xl text-white/80 leading-relaxed italic font-heading">
            &ldquo;Adam helped me with my British citizenship after 12 years in the UK. So smooth and reassuring.&rdquo;
          </p>
          <div className="mt-8">
            <div className="w-12 h-px bg-brand-gold mx-auto mb-4" />
            <p className="text-brand-gold font-semibold">Fatima A.</p>
            <p className="text-white/30 text-sm mt-1">Citizenship Client</p>
          </div>
        </div>
      </section>

      {/* Team — Editorial grid */}
      <section className="py-28 lg:py-36 bg-[#faf9f6]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="mb-20">
            <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.3em] mb-4">Our People</p>
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-brand-navy leading-tight">The People Behind<br />Your Case</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Ahrika Ghalib", role: "Principal Solicitor", area: "Immigration Law", featured: true },
              { name: "Ansar Malik", role: "Senior Solicitor", area: "Housing Law", featured: true },
              { name: "Adam Ejaz", role: "Solicitor", area: "Immigration & Citizenship", featured: false },
            ].map((member) => (
              <div key={member.name} className={`relative bg-white rounded-xl p-8 hover:shadow-lg transition-all duration-300 ${member.featured ? "sm:col-span-1 lg:col-span-1" : ""}`}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-gold" />
                <div className="w-16 h-16 rounded-full bg-brand-navy flex items-center justify-center text-white font-heading text-xl font-bold mb-6 ring-2 ring-brand-gold ring-offset-2 ring-offset-white">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-navy">{member.name}</h3>
                <p className="text-brand-gold text-sm font-medium mt-1">{member.role}</p>
                <p className="text-[10px] text-slate-400 mt-3 uppercase tracking-[0.2em] font-semibold">{member.area}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild className="bg-transparent hover:bg-brand-gold/10 text-brand-gold border-2 border-brand-gold rounded-xl">
              <Link href="/v3/about-us/">View Full Team<ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us — Offset grid */}
      <section className="py-28 lg:py-36 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.3em] mb-4">Our Promise</p>
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-brand-navy">Why Abrahams</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {whyUs.map((item, i) => (
              <div key={item.num} className={`relative bg-[#faf9f6] rounded-xl p-8 ${i % 2 === 1 ? "sm:mt-8" : ""}`}>
                <div className="absolute -top-3 -left-3 w-5 h-5 border-t-2 border-l-2 border-brand-gold" />
                <span className="text-4xl font-heading font-bold text-brand-gold/20">{item.num}</span>
                <h3 className="text-xl font-heading font-bold text-brand-navy mt-2 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 lg:py-36 bg-[#faf9f6]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.3em] mb-4">Common Questions</p>
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-brand-navy leading-tight">FAQ</h2>
          </div>
          <div className="max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group relative bg-white rounded-xl ring-1 ring-brand-gold/20 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-gold/40 group-open:bg-brand-gold transition-colors" />
                <summary className="flex items-center justify-between gap-4 px-8 py-6 cursor-pointer list-none font-heading font-bold text-brand-navy text-lg hover:text-brand-gold transition-colors">
                  {faq.q}
                  <span className="shrink-0 w-6 h-6 rounded-full border-2 border-brand-gold/40 group-open:border-brand-gold flex items-center justify-center text-brand-gold/60 group-open:text-brand-gold transition-colors text-sm font-bold leading-none select-none">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">−</span>
                  </span>
                </summary>
                <div className="px-8 pb-6 text-slate-500 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-28 lg:py-36 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.3em] mb-4">Our Offices</p>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-brand-navy">Visit Us</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              { city: "London", address: "Suite 10, Atlas House, 1 King Street, London EC2V 8AU", transport: "Bank, Mansion House" },
              { city: "Bradford", address: "2nd Floor, 6 Piccadilly, Bradford BD1 3LS", transport: "Bradford Interchange" },
            ].map((office) => (
              <div key={office.city} className="relative bg-[#faf9f6] rounded-xl p-8">
                <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-brand-gold" />
                <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-brand-gold" />
                <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.2em] mb-4">{office.city} Office</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-brand-gold/60 shrink-0 mt-0.5" />
                    <p className="text-brand-navy font-heading">{office.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-brand-gold/60 shrink-0" />
                    <a href="tel:02033559823" className="text-brand-navy hover:text-brand-gold transition-colors">0203 355 9823</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-brand-gold/60 shrink-0" />
                    <p className="text-slate-500 text-sm">Mon &ndash; Fri: 9:00am &ndash; 5:30pm</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Warm, inverted */}
      <section className="py-28 lg:py-32 bg-brand-navy">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.3em] mb-4">Take the First Step</p>
          <h2 className="text-4xl lg:text-6xl font-heading font-bold text-white leading-tight">Begin Your<br />Consultation</h2>
          <div className="w-12 h-px bg-brand-gold mx-auto mt-6 mb-8" />
          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Book a free, no-obligation consultation to discuss your case with an experienced solicitor.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy rounded-xl text-base h-13 px-8 font-semibold">
              <Link href="/v3/contact-us/">Book an Appointment</Link>
            </Button>
            <Button asChild className="bg-transparent hover:bg-white/10 text-white border-2 border-white/30 rounded-xl text-base h-13 px-8 font-semibold">
              <a href="https://wa.me/442033559823" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />WhatsApp Us
              </a>
            </Button>
            <Button asChild className="bg-transparent hover:bg-brand-gold/10 text-brand-gold border-2 border-brand-gold/50 rounded-xl text-base h-13 px-8 font-semibold">
              <a href="tel:02033559823"><Phone className="h-4 w-4 mr-2" />0203 355 9823</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
