"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, CheckCircle2, ArrowRight } from "lucide-react";

export default function V3ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 text-[400px] font-heading font-bold text-white/[0.02] leading-none select-none">A</div>
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="relative inline-block mb-8">
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-brand-gold" />
            <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.3em] px-2">Contact</p>
          </div>
          <h1 className="text-5xl lg:text-7xl font-heading font-bold text-white leading-[0.95]">
            <span className="block">Let&apos;s</span>
            <span className="block text-brand-gold">Begin</span>
          </h1>
          <p className="mt-8 text-lg text-white/40 max-w-xl leading-relaxed">Book a free, no-obligation consultation. We offer phone, video, and in-person appointments.</p>
        </div>
      </section>

      {/* Form + Details */}
      <section className="py-24 lg:py-32 bg-[#faf9f6]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left — Details */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.3em] mb-6">Get in Touch</p>
                <div className="space-y-5">
                  <a href="tel:02033559823" className="flex items-center gap-3 text-brand-navy hover:text-brand-gold transition-colors font-medium">
                    <Phone className="h-5 w-5 text-brand-gold/60" />0203 355 9823
                  </a>
                  <a href="mailto:info@abrahamssolicitors.co.uk" className="flex items-center gap-3 text-brand-navy hover:text-brand-gold transition-colors text-sm font-medium">
                    <Mail className="h-5 w-5 text-brand-gold/60" />info@abrahamssolicitors.co.uk
                  </a>
                  <div className="flex items-center gap-3 text-slate-500">
                    <Clock className="h-5 w-5 text-brand-gold/60" /><span className="text-sm">Mon-Fri: 9:00am-5:30pm</span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-brand-gold/20" />

              {[
                { city: "London", address: "Suite 10, Atlas House, 1 King Street, London EC2V 8AU" },
                { city: "Bradford", address: "2nd Floor, 6 Piccadilly, Bradford BD1 3LS" },
              ].map((office) => (
                <div key={office.city}>
                  <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.2em] mb-3">{office.city} Office</p>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-brand-gold/60 shrink-0 mt-0.5" />
                    <p className="text-sm text-brand-navy font-heading">{office.address}</p>
                  </div>
                </div>
              ))}

              <div className="h-px bg-brand-gold/20" />

              <div>
                <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.2em] mb-4">What to Expect</p>
                <div className="space-y-2.5">
                  {["No obligation assessment", "Phone, video, or in-person", "Confidential and professional", "Response within 24 hours"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-500">
                      <CheckCircle2 className="h-4 w-4 text-brand-gold shrink-0" />{item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="relative bg-white rounded-xl p-12 text-center">
                  <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-brand-gold" />
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-brand-gold" />
                  <CheckCircle2 className="h-12 w-12 text-brand-gold mx-auto mb-4" />
                  <h2 className="text-2xl font-heading font-bold text-brand-navy mb-2">Message Sent</h2>
                  <p className="text-slate-500">We&apos;ll be in touch within 24 hours.</p>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-brand-gold" />
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-brand-gold" />
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-white rounded-xl p-8 lg:p-10 space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[10px] uppercase tracking-[0.15em] font-semibold text-brand-navy/60">Full Name</Label>
                        <Input id="name" placeholder="Your full name" required className="rounded-xl focus:ring-brand-gold focus:border-brand-gold" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.15em] font-semibold text-brand-navy/60">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" required className="rounded-xl focus:ring-brand-gold" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[10px] uppercase tracking-[0.15em] font-semibold text-brand-navy/60">Phone</Label>
                        <Input id="phone" type="tel" placeholder="07xxx xxxxxx" className="rounded-xl focus:ring-brand-gold" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service" className="text-[10px] uppercase tracking-[0.15em] font-semibold text-brand-navy/60">Service</Label>
                        <select id="service" className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold">
                          <option value="">Select a service</option>
                          <option value="immigration">Immigration Law</option>
                          <option value="housing">Housing Disrepair</option>
                          <option value="personal-injury">Personal Injury</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[10px] uppercase tracking-[0.15em] font-semibold text-brand-navy/60">Message</Label>
                      <Textarea id="message" placeholder="Tell us about your case..." rows={5} required className="rounded-xl focus:ring-brand-gold" />
                    </div>
                    <Button type="submit" className="w-full bg-brand-navy hover:bg-brand-navy-light text-white rounded-xl h-12 text-base font-semibold">
                      Send Message<ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <p className="text-xs text-slate-400 text-center">We aim to respond within 24 hours. Your information is kept confidential.</p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
