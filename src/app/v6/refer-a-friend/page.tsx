"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gift, CheckCircle2, ArrowRight } from "lucide-react";
import { pushFormSubmit } from "@/lib/tracking";
import { useSpamGuard } from "@/lib/spam-client";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { submitEnquiry } from "@/lib/publishos";

export default function ReferAFriendPage() {
  const [yourName, setYourName] = useState("");
  const [yourEmail, setYourEmail] = useState("");
  const [friendName, setFriendName] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [friendPhone, setFriendPhone] = useState("");
  const [caseType, setCaseType] = useState("");
  const [notes, setNotes] = useState("");
  const spam = useSpamGuard();

  return (
    <>
      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Refer a Friend</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl">Help someone you know get expert legal support</h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl leading-relaxed">
            Know someone who could use our help? Refer them below — we&rsquo;ll handle the rest. If they become a client we&rsquo;ll thank you properly.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {[
                  { title: "Free consultation for your friend", desc: "They get 30 minutes with a qualified solicitor — no charge, no obligation." },
                  { title: "Fixed-fee quotes upfront", desc: "No hourly billing surprises. Everyone knows the cost before work begins." },
                  { title: "We say thank you", desc: "If they retain us, we&rsquo;ll be in touch to thank you personally — usually with a gift." },
                ].map(it => (
                  <div key={it.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-red/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Gift className="h-4 w-4 text-brand-red" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{it.title}</p>
                      <p className="text-sm text-slate-500 mt-0.5" dangerouslySetInnerHTML={{ __html: it.desc }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  pushFormSubmit({ email: friendEmail, phone: friendPhone });
                  await submitEnquiry({
                    source: `referral-from:${yourName}(${yourEmail})`,
                    name: friendName,
                    email: friendEmail,
                    phone: friendPhone,
                    service: caseType,
                    case: notes,
                  }, spam.payload());
                  window.location.href = "/v6/thank-you/";
                }}
                className="bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm p-6 lg:p-8 space-y-5"
              >
                <HoneypotInput value={spam.honeypot} onChange={spam.setHoneypot} />
                <div>
                  <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Your Details</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input value={yourName} onChange={e => setYourName(e.target.value)} required placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20" />
                    <input value={yourEmail} onChange={e => setYourEmail(e.target.value)} type="email" required placeholder="Your Email" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20" />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Friend&rsquo;s Details</p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <input value={friendName} onChange={e => setFriendName(e.target.value)} required placeholder="Friend&rsquo;s Name" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20" />
                    <input value={friendEmail} onChange={e => setFriendEmail(e.target.value)} type="email" required placeholder="Friend&rsquo;s Email" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input value={friendPhone} onChange={e => setFriendPhone(e.target.value)} type="tel" placeholder="Friend&rsquo;s Phone" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20" />
                    <select value={caseType} onChange={e => setCaseType(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20 bg-white">
                      <option value="">Case Type</option>
                      <option value="immigration">Immigration</option>
                      <option value="housing-disrepair">Housing Disrepair</option>
                      <option value="personal-injury">Personal Injury</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Anything else we should know (optional)" rows={3} className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm resize-none focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20" />

                <p className="text-xs text-slate-400 flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-red shrink-0 mt-0.5" />
                  Please make sure your friend is happy to be contacted. We&rsquo;ll mention you referred them.
                </p>

                <Button type="submit" className="w-full bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-wide">
                  Send Referral <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50/60 border-t border-slate-100 py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Questions about referrals?</h2>
          <p className="mt-3 text-base text-slate-500">
            Give us a call — we&rsquo;ll walk you through how it works.
          </p>
          <Button asChild size="lg" className="mt-6 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 px-8 font-bold uppercase tracking-wide">
            <Link href="/v6/contact-us/">Contact Us</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
