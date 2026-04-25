"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, CheckCircle2, ArrowRight } from "lucide-react";

export default function V2ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-navy py-24 lg:py-36 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="w-16 h-1 bg-brand-red mb-6" />
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-tight">Let&apos;s Talk</h1>
          <p className="mt-6 text-xl text-white/40 max-w-2xl">Book a free consultation. Phone, video, or in-person.</p>
        </div>
      </section>

      {/* Form + Details */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                  <CheckCircle2 className="h-16 w-16 text-brand-red mx-auto mb-6" />
                  <h2 className="text-3xl font-heading font-bold text-brand-navy mb-3">Message Sent!</h2>
                  <p className="text-slate-500 text-lg">We&apos;ll be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-white rounded-3xl shadow-lg p-8 lg:p-10 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-bold">Full Name</Label>
                      <Input id="name" placeholder="Your full name" required className="rounded-2xl h-14 text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-bold">Email Address</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required className="rounded-2xl h-14 text-base" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-bold">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="07xxx xxxxxx" className="rounded-2xl h-14 text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service" className="font-bold">Service Required</Label>
                      <select id="service" className="flex h-14 w-full rounded-2xl border border-input bg-background px-4 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        <option value="">Select a service</option>
                        <option value="immigration">Immigration Law</option>
                        <option value="housing">Housing Disrepair</option>
                        <option value="personal-injury">Personal Injury</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-bold">Your Message</Label>
                    <Textarea id="message" placeholder="Tell us about your case..." rows={5} required className="rounded-2xl text-base" />
                  </div>
                  <Button type="submit" className="w-full bg-brand-red hover:bg-brand-red-dark text-white rounded-2xl h-14 text-base font-bold shadow-lg shadow-brand-red/20">
                    Send Message<ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-brand-navy rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-heading font-bold text-white mb-6">Contact Details</h3>
                <div className="space-y-5">
                  <a href="tel:02033559823" className="flex items-center gap-3 text-white/70 hover:text-brand-gold transition-colors font-medium">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center"><Phone className="h-5 w-5" /></div>0203 355 9823
                  </a>
                  <a href="mailto:info@abrahamssolicitors.co.uk" className="flex items-center gap-3 text-white/70 hover:text-brand-gold transition-colors font-medium text-sm">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center"><Mail className="h-5 w-5" /></div>info@abrahamssolicitors.co.uk
                  </a>
                  <div className="flex items-center gap-3 text-white/70 font-medium">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center"><Clock className="h-5 w-5" /></div>Mon-Fri: 9am-5:30pm
                  </div>
                </div>
              </div>

              {[
                { city: "London", address: "Suite 10, Atlas House, 1 King Street, London EC2V 8AU" },
                { city: "Bradford", address: "2nd Floor, 6 Piccadilly, Bradford BD1 3LS" },
              ].map((office) => (
                <div key={office.city} className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-brand-red">
                  <p className="text-sm font-bold text-brand-red uppercase tracking-wider mb-2">{office.city} Office</p>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                    <p className="text-sm text-brand-navy font-medium">{office.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
