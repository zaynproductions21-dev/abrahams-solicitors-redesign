"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { pushFormSubmit } from "@/lib/tracking";
import { useSpamGuard } from "@/lib/spam-client";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { TrustBadges } from "@/components/v6/trust-badges";
import { submitEnquiry } from "@/lib/publishos";

export default function V1ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const spam = useSpamGuard();

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Contact Us</p>
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">Get in Touch</h1>
          <p className="mt-6 text-lg text-white/50 max-w-2xl leading-relaxed">
            Book a free consultation to discuss your case. We offer phone, video, and in-person appointments.
          </p>
        </div>
      </section>

      <TrustBadges />

      {/* Form + Details */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <form
                onSubmit={async (e) => { e.preventDefault(); pushFormSubmit({ email, phone }); await submitEnquiry({ source: 'contact-us', name, email, phone, service, case: message }, spam.payload()); window.location.href = '/v6/thank-you/'; }}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 lg:p-10 space-y-6"
              >
                <HoneypotInput value={spam.honeypot} onChange={spam.setHoneypot} />
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" required className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required className="rounded-xl" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="07xxx xxxxxx" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Service Required</Label>
                    <select id="service" value={service} onChange={e => setService(e.target.value)} className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option value="">Select a service</option>
                      <option value="immigration">Immigration Law</option>
                      <option value="housing">Housing Disrepair</option>
                      <option value="personal-injury">Personal Injury</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea id="message" value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell us about your case..." rows={5} required className="rounded-xl" />
                </div>
                <Button type="submit" className="w-full bg-brand-red hover:bg-brand-red-dark text-white rounded-xl h-12 text-base">
                  Send Message
                </Button>
                <p className="text-xs text-slate-400 text-center">We aim to respond within 24 hours. Your information is kept confidential.</p>
              </form>
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-brand-navy rounded-2xl p-8">
                <h3 className="text-lg font-bold text-white mb-6">Contact Details</h3>
                <div className="space-y-5">
                  <a href="tel:02034880512" className="flex items-center gap-3 text-white/70 hover:text-brand-gold transition-colors text-sm">
                    <Phone className="h-5 w-5 shrink-0" />020 3488 0512
                  </a>
                  <a href="mailto:info@abrahamssolicitors.co.uk" className="flex items-center gap-3 text-white/70 hover:text-brand-gold transition-colors text-sm">
                    <Mail className="h-5 w-5 shrink-0" />info@abrahamssolicitors.co.uk
                  </a>
                  <div className="flex items-center gap-3 text-white/70 text-sm">
                    <Clock className="h-5 w-5 shrink-0" />Mon &ndash; Fri: 9:00am &ndash; 5:30pm
                  </div>
                </div>
              </div>

              {[
                { city: "London", address: "Suite 10, Atlas House, 1 King Street, London EC2V 8AU" },
                { city: "Bradford", address: "Unit 20, Listerhills Science Park, Campus Road, Bradford BD7 1HR" },
              ].map((office) => (
                <div key={office.city} className="bg-white rounded-2xl ring-1 ring-slate-200 p-6">
                  <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-3">{office.city} Office</p>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-brand-gold/60 shrink-0 mt-0.5" />
                    <p className="text-sm text-brand-navy">{office.address}</p>
                  </div>
                </div>
              ))}

              <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-6">
                <h3 className="font-semibold text-brand-navy mb-3">Free Consultation</h3>
                <div className="space-y-2">
                  {["No obligation assessment", "Phone, video, or in-person", "Confidential and professional"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-500">
                      <CheckCircle2 className="h-4 w-4 text-brand-gold shrink-0" />{item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
