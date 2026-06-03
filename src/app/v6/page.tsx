"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrustBadges } from "@/components/v6/trust-badges";
import { TeamStrip } from "@/components/v6/team-strip";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { GclidField, MsclkidField } from "@/components/v6/gclid-field";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import { pushFormSubmit } from "@/lib/tracking";
import { SlotImage } from "@/components/slot-image";
import { useSpamGuard } from "@/lib/spam-client";
import { submitEnquiry } from "@/lib/publishos";
import {
  Phone, Star, Scale, Home, ArrowRight, MapPin,
  Clock, Award, MessageCircle, Mail,
  Shield, Headset, PoundSterling, Users, ChevronDown,
  Sparkles, Heart, AlertCircle,
} from "lucide-react";

// Quick-triage wizards surfaced on the homepage. Each card fires a
// `wizard_entry_card_clicked` GTM event with `surface: "home"` and the
// wizard slug so click-through can be filtered in GA4.
const TRIAGE_WIZARDS = [
  {
    icon: Heart,
    title: "UK Spouse Visa Wizard",
    description: "6 plain-English questions → which spouse visa route fits your situation, with the rule reference.",
    href: "/visa-wizard/",
    slug: "spouse-visa-wizard",
    eyebrow: "Immigration · Phase 1",
  },
  {
    icon: AlertCircle,
    title: "UK Visit Visa Refused?",
    description: "5 questions → PAP challenge, fresh application, or specialist consultation — sized to the 3-month JR window.",
    href: "/visit-visa-refusal/",
    slug: "visit-visa-refusal-wizard",
    eyebrow: "Immigration · Phase 2",
  },
  {
    icon: Home,
    title: "Housing Disrepair Claim?",
    description: "Find out in 60 seconds whether your landlord owes you compensation for damp, heating, or structural issues.",
    href: "/housing-disrepair/",
    slug: "housing-disrepair-qualifier",
    eyebrow: "Housing · No Win No Fee",
  },
  {
    icon: Shield,
    title: "Injured in an Accident?",
    description: "Free triage — work out whether you have a personal injury claim worth pursuing, before any solicitor call.",
    href: "/personal-injury/",
    slug: "personal-injury-qualifier",
    eyebrow: "Personal Injury · No Win No Fee",
  },
] as const;

const services = [
  {
    icon: Scale, title: "Immigration Law",
    description: "Visa applications, ILR (permanent residency), asylum claims, partner visas, and appeals. Expert guidance at every step.",
    href: "/immigration/", price: "From £240*",
  },
  {
    icon: Home, title: "Housing Disrepair",
    description: "Claims against landlords for damp, heating failures, and structural issues. You pay nothing unless we win.",
    href: "/housing-disrepair/", price: "No Win, No Fee",
  },
  {
    icon: Award, title: "British Citizenship",
    description: "Naturalisation, registration, dual citizenship. We guide you through every step of securing your right to stay.",
    href: "/british-citizenship/", price: "From £240*",
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
  const spam = useSpamGuard();

  const inputClass = "w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20 transition-colors";

  return (
    <div className={`rounded-2xl p-6 sm:p-7 ${dark ? "bg-white shadow-2xl" : "bg-white shadow-xl border border-slate-100"}`}>
      <h3 className="text-xl font-bold text-slate-900 mb-1">Book Free Consultation</h3>
      <p className="text-sm text-slate-400 mb-5">Speak to a solicitor today — no obligation.</p>
      <form onSubmit={async (e) => { e.preventDefault(); pushFormSubmit({ email, phone }); await submitEnquiry({ source: 'homepage', name, email, phone, service, case: caseDescription }, spam.payload()); window.location.href = `/thank-you/`; }} className="space-y-3">
        <HoneypotInput value={spam.honeypot} onChange={spam.setHoneypot} />
        <GclidField />
        <MsclkidField />
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" required className={inputClass} />
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email Address" required className={inputClass} />
        <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Phone Number" className={inputClass} />
        {/* Chevron caret added via inline background-image SVG. `appearance-none`
            strips the native iOS Safari dropdown arrow — without our own
            chevron users can't tell this is a dropdown. Mobile QA Tier 3. */}
        <select
          value={service}
          onChange={e => setService(e.target.value)}
          required
          aria-label="Service required"
          className={`${inputClass} appearance-none bg-white bg-no-repeat bg-[length:1rem] bg-[right_0.75rem_center] pr-9`}
          style={{ backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\")" }}
        >
          <option value="">Service Required</option>
          <option value="immigration">Immigration</option>
          <option value="housing">Housing</option>
          <option value="citizenship">Citizenship</option>
          <option value="personal-injury">Personal Injury</option>
          <option value="other">Other</option>
          <option value="existing-client">Existing Client</option>
        </select>
        <textarea value={caseDescription} onChange={e => setCaseDescription(e.target.value)} placeholder="Briefly describe your case" rows={3} className={`${inputClass} resize-none`} />
        <Button type="submit" className="w-full bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-wide">
          Get Started
        </Button>
      </form>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-5 pt-4 border-t border-slate-100">
        <a href="mailto:info@abrahamssolicitors.co.uk" className="flex items-center gap-2 text-xs text-slate-400 hover:text-brand-red transition-colors underline underline-offset-2 decoration-slate-200 hover:decoration-brand-red/60">
          <Mail className="h-3.5 w-3.5 shrink-0" />info@abrahamssolicitors.co.uk
        </a>
        <DynamicCallLink className="flex items-center gap-2 text-xs text-slate-400 hover:text-brand-red transition-colors">
          <Phone className="h-3.5 w-3.5 shrink-0" />
          <DynamicPhoneText />
        </DynamicCallLink>
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

        {/* Hero image — desktop only, behind the consultation form.
            Hardcoded to /hero-london.jpg so the bot's generated
            /public/generated/home-hero.webp does NOT replace this photo. */}
        <div className="absolute inset-y-0 right-0 w-[55%] hidden lg:block pointer-events-none overflow-hidden">
          <Image
            src="/hero-london.jpg"
            alt="Solicitor at the London office of Abrahams Solicitors with the City of London skyline in the background"
            className="w-full h-full object-cover object-center"
            width={1536}
            height={1024}
            priority
            sizes="(min-width: 1024px) 55vw, 0px"
            fetchPriority="high"
          />
          {/* Soft fade on the left edge so the headline text stays legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" aria-hidden="true" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: headline */}
            <div className="animate-hero-fade">
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
                <DynamicCallLink className="inline-flex items-center justify-center rounded-lg text-sm font-semibold h-12 px-6 border border-slate-200 text-slate-700 hover:border-brand-red hover:text-brand-red bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  <DynamicPhoneText />
                </DynamicCallLink>
              </div>
            </div>

            {/* Right: consultation form */}
            <div className="relative">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust badges ─── SRA, Google Reviews, ReviewSolicitors */}
      <TrustBadges />

      {/* ─── Features row ─── clean icons like Porto "Online 24/7" */}
      <section className="border-y border-slate-100 py-8 bg-slate-50/50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: Headset, title: "Direct Solicitor Access", desc: "Speak to your lawyer directly" },
              { icon: PoundSterling, title: "Fixed Fees", desc: "Clear pricing, no surprises" },
              { icon: Shield, title: "SRA Regulated", desc: "Solicitors Regulation Authority" },
              { icon: Users, title: "Nationwide Coverage", desc: "London & Yorkshire offices, video consultations UK-wide" },
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

      {/* ─── Quick triage tools ─── 4 wizards / qualifiers in a 2×2 grid */}
      <section id="triage" className="py-14 lg:py-20 bg-gradient-to-b from-white to-slate-50/60">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-10 lg:mb-12">
            <p className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red uppercase tracking-widest mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              Free triage tools
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
              Find your next step in 60 seconds
            </h2>
            <p className="mt-4 text-base text-slate-500 leading-relaxed">
              Skip the form-and-wait. Each tool below routes you to the right legal next step based on a handful of plain-English questions — written and reviewed by our solicitors, with the rule reference for every result. No call follows automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {TRIAGE_WIZARDS.map((w) => (
              <Link
                key={w.slug}
                href={w.href}
                onClick={() => {
                  if (typeof window === "undefined") return;
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: "wizard_entry_card_clicked",
                    surface: "home",
                    wizard: w.slug,
                  });
                }}
                className="group rounded-2xl border-2 border-slate-200 bg-white hover:border-brand-red hover:shadow-lg transition-all p-6 lg:p-7 flex flex-col"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 group-hover:bg-brand-red group-hover:text-white text-brand-red flex items-center justify-center shrink-0 transition-colors">
                    <w.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{w.eyebrow}</p>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight tracking-tight">
                      {w.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-500 leading-relaxed flex-1">
                  {w.description}
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-red group-hover:gap-2.5 transition-all">
                  Start the wizard
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
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
              <div className={`bg-slate-50 rounded-2xl aspect-[4/3] overflow-hidden relative ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                <SlotImage
                  slot={`home-service-${i + 1}`}
                  fallbackSrc={`https://placehold.co/1200x900/f1f5f9/dc2626/png?text=${encodeURIComponent(service.title)}&font=playfair-display`}
                  alt={`${service.title} — professional editorial photograph representing ${service.title.toLowerCase()} solicitor services at Abrahams Solicitors UK`}
                  className="w-full h-full object-cover"
                  type="service"
                  width={1200}
                  height={900}
                />
              </div>
            </div>
          ))}
          <p className="text-xs text-slate-400 text-center pt-4">*Fixed fee price subject to our free case assessment. See <Link href="/our-fees/" className="text-brand-red hover:underline">our fees</Link> for details.</p>
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
                <Link href="/contact-us/">Ask Us Anything</Link>
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

      <TeamStrip />

      {/* ─── Locations ─── */}
      <section className="border-t border-slate-100 py-14 lg:py-20 bg-slate-50/60">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight text-center mb-10">Our Offices</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { city: "London", address: "Suite 10, Atlas House, 1 King Street, London EC2V 8AU", phone: "0203 355 9823", transport: "Bank, Mansion House, Cannon Street", tag: "" },
              { city: "Bradford", address: "Unit 20, Listerhills Science Park, Campus Road, Bradford BD7 1HR", phone: "0333 339 6004", transport: "Bradford Interchange", tag: "New Office" },
            ].map((office) => (
              <div key={office.city} className="bg-white rounded-xl border border-slate-100 p-6">
                <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-4 flex items-center gap-2">
                  {office.city} Office{office.city === "London" && <sup className="text-brand-red">*</sup>}
                  {office.tag && <span className="text-[10px] font-semibold bg-brand-red/10 text-brand-red px-2 py-0.5 rounded normal-case tracking-normal">{office.tag}</span>}
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3"><MapPin className="h-4 w-4 text-slate-300 shrink-0 mt-0.5" /><p className="text-sm text-slate-900">{office.address}</p></div>
                  <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-slate-300 shrink-0" />{office.city === "London" ? (
                    <DynamicCallLink className="text-sm text-slate-900 hover:text-brand-red transition-colors">
                      <DynamicPhoneText />
                    </DynamicCallLink>
                  ) : (
                    <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="text-sm text-slate-900 hover:text-brand-red transition-colors">{office.phone}</a>
                  )}</div>
                  <div className="flex items-center gap-3"><Clock className="h-4 w-4 text-slate-300 shrink-0" /><p className="text-sm text-slate-400">Mon &ndash; Fri: 9:00am &ndash; 5:00pm</p></div>
                  {office.city === "London" && <p className="text-xs text-slate-400 italic pt-1">*Strictly by appointment only</p>}
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
                <DynamicCallLink className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Phone className="h-5 w-5" />
                  <span className="text-lg font-bold"><DynamicPhoneText /></span>
                </DynamicCallLink>
              </div>
              <div className="mt-3 flex items-center gap-4">
                <a href="https://wa.me/447476548311" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
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
