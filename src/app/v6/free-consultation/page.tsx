"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Clock, Shield, Headset, MessageCircle, CheckCircle2 } from "lucide-react";
import { pushFormSubmit } from "@/lib/tracking";
import { useSpamGuard } from "@/lib/spam-client";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { TrustBadges } from "@/components/v6/trust-badges";
import { submitEnquiry } from "@/lib/publishos";

const perks = [
  "30 minutes with a qualified solicitor — not sales staff",
  "Honest assessment of your chances and options",
  "A clear written quote if you decide to proceed",
  "No obligation, no pressure, no hidden costs",
];

export default function FreeConsultationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [caseText, setCaseText] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const spam = useSpamGuard();

  return (
    <>
      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Free Consultation</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl">Book a 30-minute call with a solicitor — free</h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl leading-relaxed">
            Phone, video or in-person. We&rsquo;ll listen to what&rsquo;s happened, explain your options in plain English, and give you a fixed-fee quote if you want to proceed.
          </p>
        </div>
      </section>

      <TrustBadges />

      <section className="py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-5">What&rsquo;s included</h2>
              <ul className="space-y-3 mb-8">
                {perks.map(p => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="space-y-3 pt-6 border-t border-slate-100">
                {[
                  { icon: Headset, text: "Direct solicitor access" },
                  { icon: Shield, text: "SRA regulated (firm #809071)" },
                  { icon: Clock, text: "Usually same-day response" },
                ].map(t => (
                  <div key={t.text} className="flex items-center gap-2.5 text-xs text-slate-500">
                    <t.icon className="h-4 w-4 text-brand-red" />{t.text}
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                <a href="tel:02034880512" className="flex items-center gap-2.5 text-sm font-semibold text-slate-900 hover:text-brand-red transition-colors">
                  <Phone className="h-4 w-4 text-brand-red" />Prefer to call? 020 3488 0512
                </a>
                <a href="https://wa.me/447476548311" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-slate-500 hover:text-brand-red transition-colors">
                  <MessageCircle className="h-4 w-4 text-brand-red" />WhatsApp us
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  pushFormSubmit({ email, phone });
                  await submitEnquiry({
                    source: "free-consultation",
                    name, email, phone,
                    service,
                    case: preferredTime ? `Preferred time: ${preferredTime}\n\n${caseText}` : caseText,
                  }, spam.payload());
                  window.location.href = "/v6/thank-you/";
                }}
                className="bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm p-6 lg:p-8 space-y-4"
              >
                <HoneypotInput value={spam.honeypot} onChange={spam.setHoneypot} />
                <h3 className="text-xl font-bold text-slate-900">Book your call</h3>
                <p className="text-sm text-slate-500 -mt-2">We aim to respond within one working day.</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <input value={name} onChange={e => setName(e.target.value)} required placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20" />
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20" />
                  <select value={service} onChange={e => setService(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20">
                    <option value="">Service Required</option>
                    <option value="immigration">Immigration</option>
                    <option value="housing">Housing</option>
                    <option value="citizenship">Citizenship</option>
                    <option value="personal-injury">Personal Injury</option>
                    <option value="other">Other</option>
                    <option value="existing-client">Existing Client</option>
                  </select>
                </div>
                <input value={preferredTime} onChange={e => setPreferredTime(e.target.value)} placeholder="Best time to call (e.g. weekday mornings)" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20" />
                <textarea value={caseText} onChange={e => setCaseText(e.target.value)} placeholder="Briefly describe your case" rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm resize-none focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20" />

                <Button type="submit" className="w-full bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-wide">
                  Book My Free Call
                </Button>
                <p className="text-xs text-slate-400 text-center">Your information is confidential and used only to book your call.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
