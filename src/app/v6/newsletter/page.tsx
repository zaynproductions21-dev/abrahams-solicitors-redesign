"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
import { getNewsletters, subscribeToNewsletter, formatDate, type NewsletterIssue } from "@/lib/publishos";
import { pushFormSubmit } from "@/lib/tracking";
import { useSpamGuard } from "@/lib/spam-client";
import { HoneypotInput } from "@/components/v6/honeypot-input";

export default function V6NewsletterPage() {
  const [issues, setIssues] = useState<NewsletterIssue[] | null>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const spam = useSpamGuard();

  useEffect(() => {
    getNewsletters().then(all => {
      const published = all
        .filter(n => n.status === "published")
        .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
      setIssues(published);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    const ok = await subscribeToNewsletter(email, { _hp: spam.honeypot, _t: spam.loadedAt });
    setSubmitting(false);
    if (ok) {
      pushFormSubmit({ email });
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <>
      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Stay Updated</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl">Newsletter</h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl leading-relaxed">
            UK immigration and housing law updates, case studies, and practical guidance — straight to your inbox.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-brand-red/8 flex items-center justify-center">
                <Mail className="h-5 w-5 text-brand-red" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Subscribe</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6">Monthly digest. No spam. Unsubscribe anytime.</p>

            {subscribed ? (
              <div className="flex items-start gap-3 bg-green-50 rounded-lg p-4">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900">You&rsquo;re in.</p>
                  <p className="text-sm text-green-700 mt-0.5">We&rsquo;ll send the next issue to your inbox.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <HoneypotInput value={spam.honeypot} onChange={spam.setHoneypot} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="flex-1 px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20"
                />
                <Button type="submit" disabled={submitting} className="bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 px-6 font-bold uppercase tracking-wide">
                  {submitting ? "..." : "Subscribe"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-8">Past Issues</h2>

          {issues === null ? (
            <p className="text-slate-400 text-center py-8">Loading archive...</p>
          ) : issues.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No issues published yet.</p>
          ) : (
            <div className="space-y-4">
              {issues.map(issue => (
                <Link
                  key={issue.id}
                  href={`/v6/newsletter/${issue.slug}/`}
                  className="group block bg-white rounded-xl border border-slate-100 p-6 hover:shadow-lg hover:border-brand-red/20 transition-all"
                >
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    {issue.issue_number && <span className="font-semibold text-brand-red">Issue #{issue.issue_number}</span>}
                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{formatDate(issue.published_at)}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-red transition-colors">
                    {issue.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">{issue.excerpt}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-red">
                    Read issue <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
