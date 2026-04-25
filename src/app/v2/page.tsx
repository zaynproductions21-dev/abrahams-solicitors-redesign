import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Phone, Star, Scale, Home, Shield, ArrowRight, CheckCircle2,
  Quote, Users, Award, MapPin, Zap, MessageCircle, FileCheck, Handshake,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "V2 Bold Modern | Abrahams Solicitors",
  description: "Design variation 2 — Bold Modern. UK immigration & housing solicitors.",
};

const services = [
  {
    icon: Scale, title: "Immigration Law", stats: "98% Success Rate",
    price: "From £1,500",
    description: "Visa applications, ILR (permanent residency), asylum claims, appeals. Expert guidance through the entire immigration process.",
    features: ["Spouse & Partner Visas", "ILR (Permanent Residency)", "Asylum Claims", "Visa Appeals"],
    href: "/v2/immigration/",
  },
  {
    icon: Home, title: "Housing Disrepair", stats: "No Win, No Fee",
    price: "No Win, No Fee",
    description: "Property condition claims against negligent landlords. Damp, mould, heating failures, structural damage.",
    features: ["Damp & Mould", "Heating Failures", "Structural Issues", "Compensation"],
    href: "/v2/housing-disrepair/",
  },
  {
    icon: Shield, title: "British Citizenship", stats: "Expert Guidance",
    price: "From £1,200",
    description: "Supporting your journey to British citizenship with clear, fixed-fee advice at every stage.",
    features: ["Naturalisation", "Registration", "Dual Citizenship", "Ceremonies"],
    href: "/v2/immigration/",
  },
];

const testimonials = [
  { text: "Abrahams Solicitors handled my spouse visa application with incredible professionalism. They made a stressful process feel manageable and kept me informed at every stage.", author: "Sarah M.", service: "Immigration" },
  { text: "After months of living with damp and mould, Abrahams helped me get proper compensation from my landlord. They were thorough, responsive, and genuinely cared about my situation.", author: "James T.", service: "Housing" },
  { text: "Adam helped me through my British citizenship application after 12 years in the UK. Smooth and stress-free.", author: "Fatima A.", service: "British Citizenship" },
];

const faqs = [
  {
    question: "How much does a spouse visa application cost?",
    answer: "We charge a fixed fee from £1,500 for spouse visa applications. You'll know exactly what you're paying before we start — no hidden costs, no surprises. The fee covers the full application from start to finish.",
  },
  {
    question: "What is ILR and how do I apply?",
    answer: "ILR stands for Indefinite Leave to Remain — it is the UK's form of permanent residency. Once granted, you can live and work in the UK without time restrictions. We handle ILR applications from £1,200 and will assess your eligibility in a free consultation.",
  },
  {
    question: "Can you help with damp and mould in my rented home?",
    answer: "Yes. If your landlord has failed to address damp, mould, heating failures, or other serious disrepair, you may be entitled to compensation. We handle all housing disrepair claims on a No Win, No Fee basis — you pay nothing unless we win.",
  },
  {
    question: "How do your fixed fees work?",
    answer: "Before we begin any work, we give you a clear, written quote. That price is fixed — it will not increase as your case progresses. No hourly billing, no unexpected invoices. Straightforward pricing so you can focus on your case, not your costs.",
  },
];

const steps = [
  { num: "01", icon: MessageCircle, title: "Free Consultation", desc: "Speak to a solicitor about your case with no obligation." },
  { num: "02", icon: FileCheck, title: "Case Assessment", desc: "We review your situation and outline your options clearly." },
  { num: "03", icon: Zap, title: "Take Action", desc: "Your dedicated solicitor builds and progresses your case." },
  { num: "04", icon: Handshake, title: "Resolution", desc: "We fight for the best outcome and keep you informed throughout." },
];

export default function V2HomePage() {
  return (
    <>
      {/* Hero — Full viewport, bold */}
      <section className="relative bg-brand-navy overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light/80 to-brand-navy" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='g' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='20' cy='20' r='1' fill='%23fff'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23g)' width='40' height='40'/%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-24">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-8">
            <div className="flex -space-x-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />)}
            </div>
            <span className="text-white/60 text-sm font-medium">5.0 from 120+ reviews</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-white leading-[1.02] tracking-tight max-w-5xl">
            Your visa was refused. Here&apos;s what happens next.
          </h1>
          <p className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-brand-red leading-tight">
            Direct Access. Fixed Fees.
          </p>
          <p className="mt-8 text-xl text-white/40 leading-relaxed max-w-2xl">
            No call centres. No hidden costs. Speak directly to your dedicated solicitor from day one.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Button asChild className="bg-brand-red hover:bg-brand-red-dark text-white rounded-2xl text-base px-10 h-14 font-bold shadow-lg shadow-brand-red/25">
              <Link href="/v2/contact-us/">Free Consultation<ArrowRight className="h-5 w-5 ml-2" /></Link>
            </Button>
            <Button asChild variant="outline-light" className="rounded-2xl text-base h-14 px-8 font-bold border-2">
              <a href="tel:02033559823"><Phone className="h-5 w-5 mr-2" />0203 355 9823</a>
            </Button>
            <Button asChild variant="outline-light" className="rounded-2xl text-base h-14 px-8 font-bold border-2">
              <a href="https://wa.me/442033559823" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Bar — Red bg, huge numbers */}
      <section className="bg-brand-red">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 lg:py-16">
            {[
              { icon: Star, value: "5,000+", label: "Cases Handled" },
              { icon: Award, value: "98%", label: "Success Rate" },
              { icon: Users, value: "9+", label: "Legal Professionals" },
              { icon: MapPin, value: "2", label: "UK Offices" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white">{stat.value}</p>
                <p className="text-white/70 text-sm font-medium mt-2 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services — Bold cards */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <div className="w-16 h-1 bg-brand-red mb-6" />
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-brand-navy leading-tight">Our Legal Expertise</h2>
            <p className="mt-5 text-lg text-slate-400 max-w-2xl">Specialist solicitors delivering results across three core practice areas.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link key={service.title} href={service.href} className="group block bg-white rounded-3xl border-l-4 border-brand-red shadow-lg p-8 lg:p-10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-brand-red flex items-center justify-center mb-6 shadow-lg shadow-brand-red/20">
                  <service.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-brand-navy mb-1">{service.title}</h3>
                <p className="text-2xl font-heading font-bold text-brand-red mb-2">{service.price}</p>
                <span className="inline-block bg-brand-gold/10 text-brand-gold text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">{service.stats}</span>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2.5 mb-8">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm font-medium text-brand-navy/80">
                      <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center text-sm font-bold text-brand-red group-hover:gap-3 gap-2 transition-all">
                  Learn More<ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us — Navy bg, glassmorphic cards */}
      <section className="py-24 lg:py-32 bg-brand-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white leading-tight">Why Clients Choose Us</h2>
            <p className="mt-5 text-lg text-white/40 max-w-2xl mx-auto">Four reasons Abrahams Solicitors delivers what others can&apos;t.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: Phone, title: "Direct Solicitor Access", desc: "Speak to your solicitor directly. No call centres, no gatekeepers, no delays." },
              { icon: CheckCircle2, title: "Fixed, Transparent Fees", desc: "Know your costs upfront. We quote a fixed fee before we start — no surprises." },
              { icon: Scale, title: "Specialist Expertise", desc: "Immigration and housing law is all we do. Deep specialism means better outcomes." },
              { icon: MapPin, title: "Nationwide Coverage", desc: "Based in Yorkshire with London offices. Video consultations available nationwide." },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-10 ring-1 ring-white/10 hover:bg-white/10 transition-colors">
                <item.icon className="h-12 w-12 text-brand-gold mb-6" />
                <h3 className="text-xl font-heading font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-16 h-1 bg-brand-red mx-auto mb-6" />
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-brand-navy">How We Work</h2>
            <p className="mt-5 text-lg text-slate-400 max-w-xl mx-auto">Four simple steps to getting the legal help you need.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="relative text-center">
                <span className="text-7xl font-heading font-bold text-brand-red/10">{step.num}</span>
                <div className="w-14 h-14 rounded-2xl bg-brand-red/10 flex items-center justify-center mx-auto -mt-6 mb-4">
                  <step.icon className="h-7 w-7 text-brand-red" />
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-navy mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — Dark section */}
      <section className="py-24 lg:py-32 bg-brand-navy-light">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white">Client Success Stories</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.author} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-10 ring-1 ring-white/10">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />)}
                </div>
                <Quote className="h-10 w-10 text-brand-red/30 mb-4" />
                <p className="text-white/70 text-lg leading-relaxed mb-8 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-red/20 ring-2 ring-brand-red flex items-center justify-center text-white font-bold text-sm">
                    {t.author.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{t.author}</p>
                    <p className="text-xs text-white/40">{t.service} Client</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — details/summary accordion (server component safe) */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <div className="w-16 h-1 bg-brand-red mb-6" />
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-brand-navy leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-5 text-lg text-slate-400 max-w-2xl">
              Plain answers to the questions we hear most often.
            </p>
          </div>
          <div className="max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm open:shadow-md transition-shadow duration-300"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-8 py-6 font-heading font-bold text-brand-navy text-lg select-none">
                  {faq.question}
                  <span className="shrink-0 w-8 h-8 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red font-bold text-xl leading-none group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <div className="px-8 pb-6 text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Red bg */}
      <section className="bg-brand-red py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white leading-tight">Ready to Take the First Step?</h2>
          <p className="mt-6 text-white/70 text-lg max-w-xl mx-auto">Book a free consultation today. Phone, video, or in-person appointments available.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild className="bg-white text-brand-red hover:bg-white/90 rounded-2xl text-base h-14 px-10 font-bold shadow-lg">
              <Link href="/v2/contact-us/">Make an Appointment</Link>
            </Button>
            <Button asChild variant="outline-light" className="rounded-2xl text-base h-14 px-8 font-bold border-2">
              <a href="tel:02033559823"><Phone className="h-5 w-5 mr-2" />0203 355 9823</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
