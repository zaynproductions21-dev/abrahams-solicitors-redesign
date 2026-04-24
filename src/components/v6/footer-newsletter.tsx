"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/publishos";
import { pushFormSubmit } from "@/lib/tracking";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    await subscribeToNewsletter(email, { firstName });
    pushFormSubmit({ email });
    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="flex items-start gap-2 text-sm text-brand-gold bg-white/5 rounded-lg p-3">
        <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
        <span>Subscribed — we&rsquo;ll be in touch with the next issue.</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2.5">
      <div className="flex items-center gap-2 text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-2">
        <Mail className="h-3.5 w-3.5" />
        Newsletter
      </div>
      <input
        type="text"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        placeholder="First name (optional)"
        className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/60"
      />
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        placeholder="Email address"
        className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/60"
      />
      <Button type="submit" disabled={submitting} className="w-full bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-10 text-xs font-bold uppercase tracking-wide">
        {submitting ? "..." : "Subscribe"}
      </Button>
      <p className="text-[10px] text-white/30 leading-relaxed">Monthly digest. Unsubscribe any time.</p>
    </form>
  );
}
