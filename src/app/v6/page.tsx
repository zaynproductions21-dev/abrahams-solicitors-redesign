"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Phone, Star, Scale, Home, ArrowRight, MapPin,
  Clock, Award, MessageCircle, Mail,
  Shield, Headset, PoundSterling, Users, ChevronDown,
} from "lucide-react";

const services = [
  {
    icon: Scale, title: "Immigration Law",
    description: "Visa applications, ILR (permanent residency), asylum claims, partner visas, and appeals. Expert guidance at every step.",
    href: "/v6/immigration/", price: "From £240*",
  },
  {
    icon: Home, title: "Housing Disrepair",
    description: "Claims against landlords for damp, heating failures, and structural issues. You pay nothing unless we win.",
    href: "/v6/housing-disrepair/", price: "No Win, No Fee",
  },
  {
    icon: Award, title: "British Citizenship",
    description: "Naturalisation, registration, dual citizenship. We guide you through every step of securing your right to stay.",
    href: "/v6/british-citizenship/", price: "From £240*",
  },
];

const testimonials = [
  { text: "Abrahams handled my spouse visa with incredible professionalism. They made a stressful process feel manageable and kept me informed at every stage.", author: "Sarah M.", role: "Immigration Client", rating: 5 },
  { text: "After months of damp and mould, Abrahams helped me get proper compensation from my landlord. Thorough, responsive, and they genuinely cared.", author: "James T.", role: "Housing Client", rating: 5 },
  { text: "Adam helped me through my British citizenship application after 12 years in the UK. The whole process was smooth and stress-free.", author: "Fatima A.", role: "Citizenship Client", rating: 5 },
  { text: "From the first call I felt reassured. My solicitor explained everything in plain English and the fixed fee meant no nasty surprises.", author: "Mohammed R.", role: "Immigration Client", rating: 5 },
  { text: "They took on my housing case on no win no fee and won me over £4,000 in compensation. I wish I had contacted them sooner.", author: "Lisa D.", role: "Housing Client", rating: 5 },
  { text: "Professional, empathetic, and efficient. My ILR application was approved first time. Could not recommend them enough.", author: "Priya K.", role: "Immigration Client", rating: 5 },
];

const faqs = [
  { q: "How much does a spouse visa application cost?", a: "We offer fixed fees from £240 for spouse and partner visa applications. This covers the full legal service — preparing your application, reviewing documents, and submitting to the Home Office. No hidden costs." },
  { q: "What is ILR and how do I apply?", a: "ILR stands for Indefinite Leave to Remain — the UK's form of permanent residency. Once granted, you can live and work in the UK without restrictions. Our fixed fee starts from £1,200." },
  { q: "Can you help with damp and mould in my rented home?", a: "Yes. If your landlord has failed to repair damp, mould, or heating problems, you may be entitled to compensation. We handle all housing disrepair claims on a No Win, No Fee basis." },
  { q: "How do your fixed fees work?", a: "Before we begin, we give you a clear written quote. No hidden charges. For housing disrepair we work on No Win, No Fee. For immigration, fixed fees are agreed upfront." },
];

function ConsultationForm({ dark = false }: { dark?: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [caseDescription, setCaseDescription] = useState("");

  const inputClass = "w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20 transition-colors";

  return (
    <div className={`rounded-2xl p-6 sm:p-7 ${dark ? "bg-white shadow-2xl" : "bg-white shadow-xl border border-slate-100"}`}>
      <h3 className="text-xl font-bold text-slate-900 mb-1">Book Free Consultation</h3>
      <p className="text-sm text-slate-400 mb-5">Speak to a solicitor today — no obligation.</p>
      <form onSubmit={(e) => { e.preventDefault(); window.location.href = `/v6/contact-us/?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&service=${encodeURIComponent(service)}&case=${encodeURIComponent(caseDescription)}`; }} className="space-y-3">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" required className={inputClass} />
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email Address" required className={inputClass} />
        <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Phone Number" className={inputClass} />
        <select value={service} onChange={e => setService(e.target.value)} required className={`${inputClass} appearance-none bg-white`}>
          <option value="">Service Required</option>
          <option value="spouse-visa">Spouse Visa</option>
          <option value="british-citizenship">British Citizenship</option>
          <option value="visa-extension">Visa Extension</option>
          <option value="ilr">ILR Application</option>
          <option value="asylum">Asylum Application</option>
          <option value="visit-visa">Visit Visa</option>
          <option value="housing-disrepair">Housing Disrepair</option>
          <option value="personal-injury">Personal Injury</option>
          <option value="other">Other</option>
        </select>
        <textarea value={caseDescription} onChange={e => setCaseDescription(e.target.value)} placeholder="Briefly describe your case" rows={3} className={`${inputClass} resize-none`} />
        <Button type="submit" className="w-full bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-wide">
          Get Started
        </Button>
      </form>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-5 pt-4 border-t border-slate-100">
        <a href="mailto:info@abrahamssolicitors.co.uk" className="flex items-center gap-2 text-xs text-slate-400 hover:text-brand-red transition-colors">
          <Mail className="h-3.5 w-3.5 shrink-0" />info@abrahamssolicitors.co.uk
        </a>
        <a href="tel:02034880512" className="flex items-center gap-2 text-xs text-slate-400 hover:text-brand-red transition-colors">
          <Phone className="h-3.5 w-3.5 shrink-0" />020 3488 0512
        </a>
      </div>
    </div>
  );
}

export default function V6HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ─── Hero with Form ─── Porto-style split: bold heading left, form right */}
      <section className="relative bg-white overflow-hidden">
        {/* Ghost background text — hidden on mobile */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 hidden lg:block text-[14rem] font-black text-slate-100/60 leading-none tracking-tight select-none pointer-events-none whitespace-nowrap" aria-hidden="true">
          IMMIGRATION<br />LAW
        </div>
        {/* Orange/red diagonal accent */}
        <div className="absolute top-20 right-[30%] w-64 h-64 bg-brand-red/5 rounded-full blur-3xl" />

        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: headline */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-[2.75rem] font-black text-slate-900 leading-[1.1] tracking-tight">
                Expert Legal Support for{" "}
                <span className="text-brand-red">Immigration, Housing</span>{" "}
                &amp; Citizenship.
              </h1>
              <p className="mt-4 text-lg text-slate-500 leading-relaxed max-w-md">
                Fixed fees. Direct solicitor access. No call centres. We handle your case from start to finish.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide px-8 h-12">
                  <Link href="#services">Our Services</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-lg text-sm font-semibold h-12 border-slate-200 text-slate-700 hover:border-brand-red hover:text-brand-red">
                  <a href="tel:02034880512"><Phone className="h-4 w-4 mr-2" />020 3488 0512</a>
                </Button>
              </div>
            </div>

            {/* Right: consultation form */}
            <div className="relative">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features row ─── clean icons like Porto "Online 24/7" */}
      <section className="border-y border-slate-100 py-8 bg-slate-50/50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: Headset, title: "Direct Solicitor Access", desc: "Speak to your lawyer directly" },
              { icon: PoundSterling, title: "Fixed Fees", desc: "Clear pricing, no surprises" },
              { icon: Shield, title: "SRA Regulated", desc: "Solicitors Regulation Authority" },
              { icon: Users, title: "Nationwide Coverage", desc: "Yorkshire base, video consultations UK-wide" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-red/8 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-brand-red" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services ─── alternating left/right Porto-style */}
      <section id="services" className="py-14 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 space-y-14 lg:space-y-20">
          {services.map((service, i) => (
            <div key={service.title} className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
              <div className={i % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">{service.price}</p>
                <h2 className="text-2xl sm:text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">{service.title}</h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">{service.description}</p>
                <Button asChild className="mt-6 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide">
                  <Link href={service.href}>Learn More<ArrowRight className="h-4 w-4 ml-2" /></Link>
                </Button>
              </div>
              <div className={`bg-slate-50 rounded-2xl aspect-[4/3] flex items-center justify-center ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                <service.icon className="h-20 w-20 text-brand-red/15" />
              </div>
            </div>
          ))}
          <p className="text-xs text-slate-400 text-center pt-4">*Consultation fees. Full service fees vary by case — see <Link href="/v6/our-fees/" className="text-brand-red hover:underline">our fees</Link>.</p>
        </div>
      </section>

      {/* ─── Testimonials Grid ─── Porto-style 3-column cards with stars */}
      <section className="py-14 lg:py-20 bg-slate-50/60">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Clients We&rsquo;ve Helped</h2>
            <p className="mt-3 text-base text-slate-400">Real cases. Real results. Real reviews.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="bg-white rounded-xl border border-slate-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-brand-red/8 flex items-center justify-center text-brand-red font-bold text-xs">
                    {t.author.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{t.author}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-brand-red text-brand-red" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ Accordion ─── */}
      <section className="py-14 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: heading */}
            <div>
              <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Common Questions</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">Frequently Asked Questions</h2>
              <p className="mt-4 text-base text-slate-500 leading-relaxed">Plain-English answers to the questions we hear most often about immigration, housing, and fees.</p>
              <Button asChild className="mt-6 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide">
                <Link href="/v6/contact-us/">Ask Us Anything</Link>
              </Button>
            </div>
            {/* Right: accordion */}
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex items-center justify-between gap-4 w-full p-5 text-left text-sm font-bold text-slate-900 hover:text-brand-red transition-colors">
                    {faq.q}
                    <ChevronDown className={`h-4 w-4 shrink-0 text-brand-red transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Locations ─── */}
      <section className="border-t border-slate-100 py-14 lg:py-20 bg-slate-50/60">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight text-center mb-10">Our Offices</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { city: "London", address: "Suite 10, Atlas House, 1 King Street, London EC2V 8AU", phone: "020 3488 0512", transport: "Bank, Mansion House, Cannon Street" },
              { city: "Bradford", address: "2nd Floor, 6 Piccadilly, Bradford BD1 3LS", phone: "020 3488 0512", transport: "Bradford Interchange" },
            ].map((office) => (
              <div key={office.city} className="bg-white rounded-xl border border-slate-100 p-6">
                <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-4">{office.city} Office</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3"><MapPin className="h-4 w-4 text-slate-300 shrink-0 mt-0.5" /><p className="text-sm text-slate-900">{office.address}</p></div>
                  <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-slate-300 shrink-0" /><a href={`tel:${office.phone.replace(/\s/g, "")}`} className="text-sm text-slate-900 hover:text-brand-red transition-colors">{office.phone}</a></div>
                  <div className="flex items-center gap-3"><Clock className="h-4 w-4 text-slate-300 shrink-0" /><p className="text-sm text-slate-400">Mon &ndash; Fri: 9:00am &ndash; 5:30pm</p></div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mt-8">Based in Yorkshire with London offices. Video consultations available nationwide.</p>
        </div>
      </section>

      {/* ─── Pre-footer CTA with form (Porto-style repeat) ─── */}
      <section className="bg-brand-navy py-14 lg:py-18">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
                Ready to Discuss Your Case?
              </h2>
              <p className="mt-4 text-white/50 text-base leading-relaxed">
                Book a free consultation with one of our specialist solicitors. We offer phone, video, and in-person appointments nationwide.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <a href="tel:02034880512" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Phone className="h-5 w-5" />
                  <span className="text-lg font-bold">020 3488 0512</span>
                </a>
              </div>
              <div className="mt-3 flex items-center gap-4">
                <a href="https://wa.me/442034880512" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
                  <MessageCircle className="h-4 w-4" />WhatsApp Us
                </a>
              </div>
            </div>
            <ConsultationForm dark />
          </div>
        </div>
      </section>
    </>
  );
}
