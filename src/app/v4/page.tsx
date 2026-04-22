import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Phone, Star, Scale, Home, ArrowRight, MapPin,
  Clock, Award, MessageCircle,
  Shield, FileCheck, Headset, PoundSterling,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "V4 Clean Minimal | Abrahams Solicitors",
  description: "Design variation 4 — Clean Minimal (Panda7 style). UK immigration & housing solicitors.",
};

const services = [
  {
    icon: Scale, title: "Immigration Law",
    description: "Visa applications, ILR (permanent residency), asylum claims, partner visas, and appeals. Expert guidance through every step.",
    href: "/v4/immigration/", price: "From £1,500",
  },
  {
    icon: Home, title: "Housing Disrepair",
    description: "Claims against landlords for damp, heating failures, and structural issues. You pay nothing unless we win your case.",
    href: "/v4/housing-disrepair/", price: "No Win, No Fee",
  },
  {
    icon: Award, title: "British Citizenship",
    description: "From naturalisation to registration, we guide you through every step of securing your right to call the UK home.",
    href: "/v4/british-citizenship/", price: "From £1,200",
  },
];

const testimonials = [
  { text: "Abrahams Solicitors handled my spouse visa application with incredible professionalism. They made a stressful process feel manageable and kept me informed at every stage.", author: "Sarah M.", service: "Immigration", rating: 5 },
  { text: "After months of living with damp and mould, Abrahams helped me get proper compensation from my landlord. They were thorough, responsive, and genuinely cared about my situation.", author: "James T.", service: "Housing Disrepair", rating: 5 },
  { text: "Adam helped me through my British citizenship application after living in the UK for 12 years. The whole process was smooth and stress-free.", author: "Fatima A.", service: "British Citizenship", rating: 5 },
];

const faqs = [
  {
    question: "How much does a spouse visa application cost?",
    answer: "We offer a fixed fee from £1,500 for spouse and partner visa applications. This covers the full legal service — preparing your application, reviewing documents, and submitting to the Home Office. There are no hidden costs. Home Office fees and the Immigration Health Surcharge are payable separately to the government.",
  },
  {
    question: "What is ILR and how do I apply?",
    answer: "ILR stands for Indefinite Leave to Remain — the UK's form of permanent residency. Once granted, you can live and work in the UK without any visa restrictions. Most applicants qualify after five years of continuous lawful residence. Our fixed fee for ILR starts from £1,200.",
  },
  {
    question: "Can you help with damp and mould in my rented home?",
    answer: "Yes. If your landlord has failed to repair damp, mould, heating problems, or structural issues despite being notified, you may be entitled to compensation. We handle all housing disrepair claims on a No Win, No Fee basis — you pay nothing unless your claim succeeds.",
  },
  {
    question: "How do your fixed fees work?",
    answer: "Before we begin any work, we give you a clear, written quote covering everything. No hidden charges, no unexpected invoices. For housing disrepair we work on a No Win, No Fee basis. For immigration and citizenship, fixed fees are agreed upfront.",
  },
];

export default function V4HomePage() {
  return (
    <>
      {/* ─── Hero ─── Clean white, Panda7-style */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-brand-navy leading-[1.1] tracking-tight">
                Immigration &amp; Housing Solicitors for{" "}
                <span className="text-brand-red italic">Your Case</span>
              </h1>
              <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-lg">
                Let Abrahams find the right legal solution for you. Fixed fees, direct solicitor access, and a free initial consultation.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-full text-sm font-semibold px-8 h-12 uppercase tracking-wide">
                  <Link href="/v4/contact-us/">Book Free Consultation</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full text-sm font-semibold h-12 border-slate-200 text-brand-navy hover:border-brand-red hover:text-brand-red">
                  <a href="tel:02034880512"><Phone className="h-4 w-4 mr-2" />020 3488 0512</a>
                </Button>
              </div>
            </div>

            {/* Right: pricing preview cards */}
            <div className="space-y-4">
              {[
                { icon: Scale, label: "Spouse Visa Application", price: "From £1,500", tag: "Fixed Fee" },
                { icon: Home, label: "Housing Disrepair Claim", price: "No Win, No Fee", tag: "Free Assessment" },
                { icon: Award, label: "British Citizenship", price: "From £1,200", tag: "Fixed Fee" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between bg-white rounded-xl border border-slate-200 p-5 hover:border-brand-red/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-red/5 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-brand-red" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-navy">{item.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.tag}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-brand-red">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-slate-100" />

      {/* ─── Testimonials ─── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-navy text-center mb-14">
            Why Clients Choose Abrahams
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.author} className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-brand-red/8 flex items-center justify-center text-brand-red font-bold text-sm">
                    {t.author.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">{t.author}</p>
                    <p className="text-xs text-slate-400">{t.service} Client</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-red text-brand-red" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features row ─── */}
      <section className="border-t border-slate-100 py-20 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-navy text-center mb-4">
            Direct Access. Fixed Fees.
          </h2>
          <p className="text-slate-400 text-center text-base max-w-xl mx-auto mb-14">
            No call centres. No hourly billing surprises. Just straightforward legal support from qualified solicitors.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { icon: Headset, title: "Direct solicitor access", desc: "Speak to your lawyer, not a receptionist" },
              { icon: Shield, title: "SRA regulated", desc: "Fully regulated by the Solicitors Regulation Authority" },
              { icon: PoundSterling, title: "Fixed fees", desc: "Clear pricing agreed before we start" },
              { icon: FileCheck, title: "Free consultation", desc: "Discuss your case at no cost or obligation" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-brand-red" />
                </div>
                <h3 className="text-sm font-semibold text-brand-navy mb-1">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section className="bg-slate-50/60 py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-navy text-center mb-4">
            Our Legal Services
          </h2>
          <p className="text-slate-400 text-center text-base max-w-lg mx-auto mb-14">
            Specialising in immigration, housing, and citizenship law with a proven track record nationwide.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-xl border border-slate-200 p-8 text-center hover:border-brand-red/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-brand-red/5 flex items-center justify-center mx-auto mb-5">
                  <service.icon className="h-6 w-6 text-brand-red" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-2">{service.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{service.description}</p>
                <p className="text-sm font-bold text-brand-red mb-6">{service.price}</p>
                <Button asChild variant="outline" size="sm" className="rounded-full text-xs font-semibold uppercase tracking-wide border-brand-red text-brand-red hover:bg-brand-red hover:text-white">
                  <Link href={service.href}>Book Free Consultation</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-navy text-center mb-4">
            How It Works
          </h2>
          <p className="text-slate-400 text-center text-base max-w-lg mx-auto mb-14">
            Three simple steps to getting the legal support you need.
          </p>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { num: "1", title: "Tell us what happened", desc: "Book a free consultation online, by phone, or on WhatsApp. We will listen and understand your situation." },
              { num: "2", title: "We explain your options", desc: "Your solicitor will outline the best course of action with clear, fixed pricing — no surprises." },
              { num: "3", title: "We handle everything", desc: "From paperwork to representation, your dedicated solicitor manages your case from start to finish." },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 rounded-full border-2 border-brand-red text-brand-red font-bold text-lg flex items-center justify-center mx-auto mb-5">
                  {step.num}
                </div>
                <h3 className="text-base font-semibold text-brand-navy mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="border-t border-slate-100 py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-navy text-center mb-14">
            Common Questions
          </h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border border-slate-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none text-brand-navy font-semibold text-sm select-none hover:text-brand-red transition-colors">
                  {faq.question}
                  <span className="shrink-0 w-5 h-5 rounded-full border border-brand-red/30 flex items-center justify-center text-brand-red text-xs font-bold group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="px-5 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team ─── */}
      <section className="bg-slate-50/60 py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-navy text-center mb-14">Meet Your Legal Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Ahrika Ghalib", role: "Principal Solicitor", area: "Immigration Law" },
              { name: "Ansar Malik", role: "Senior Solicitor", area: "Housing Disrepair" },
              { name: "Adam Ejaz", role: "Solicitor", area: "Immigration & Citizenship" },
            ].map((m) => (
              <div key={m.name} className="bg-white rounded-xl border border-slate-200 p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-sm mx-auto mb-4">
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="text-base font-semibold text-brand-navy">{m.name}</h3>
                <p className="text-brand-red text-xs font-medium mt-1">{m.role}</p>
                <p className="text-xs text-slate-400 mt-2">{m.area}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="sm" className="rounded-full text-xs font-semibold uppercase tracking-wide">
              <Link href="/v4/about-us/">View Full Team<ArrowRight className="h-3.5 w-3.5 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Locations ─── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-navy text-center mb-14">Our Offices</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { city: "London", address: "Suite 10, Atlas House, 1 King Street, London EC2V 8AU", phone: "020 3488 0512", transport: "Bank, Mansion House, Cannon Street" },
              { city: "Bradford", address: "2nd Floor, 6 Piccadilly, Bradford BD1 3LS", phone: "020 3488 0512", transport: "Bradford Interchange" },
            ].map((office) => (
              <div key={office.city} className="bg-white rounded-xl border border-slate-200 p-6">
                <p className="text-xs font-semibold text-brand-red uppercase tracking-wider mb-4">{office.city} Office</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3"><MapPin className="h-4 w-4 text-slate-300 shrink-0 mt-0.5" /><p className="text-sm text-brand-navy">{office.address}</p></div>
                  <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-slate-300 shrink-0" /><a href={`tel:${office.phone.replace(/\s/g, "")}`} className="text-sm text-brand-navy hover:text-brand-red transition-colors">{office.phone}</a></div>
                  <div className="flex items-center gap-3"><Clock className="h-4 w-4 text-slate-300 shrink-0" /><p className="text-sm text-slate-400">Mon &ndash; Fri: 9:00am &ndash; 5:30pm</p></div>
                </div>
                <p className="text-xs text-slate-300 mt-4">Nearest: {office.transport}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mt-8">Based in Yorkshire with London offices. Video consultations available nationwide.</p>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="border-t border-slate-100 py-20 lg:py-24">
        <div className="max-w-xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-navy">Ready to discuss your case?</h2>
          <p className="mt-4 text-slate-400 text-base">Book a free consultation with one of our solicitors today.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-full text-sm font-semibold uppercase tracking-wide px-8 h-12">
              <Link href="/v4/contact-us/">Book Free Consultation</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-sm font-semibold h-12 border-slate-200 text-brand-navy hover:border-brand-red hover:text-brand-red">
              <a href="https://wa.me/442034880512" target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4 mr-2" />WhatsApp Us</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
