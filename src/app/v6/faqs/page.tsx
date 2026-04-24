"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustBadges } from "@/components/v6/trust-badges";
import { getFaqs, type FaqItem } from "@/lib/publishos";

export default function V6FaqsPage() {
  const [faqs, setFaqs] = useState<FaqItem[] | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    getFaqs().then(all => {
      const published = all
        .filter(f => f.status === "published")
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      setFaqs(published);
    });
  }, []);

  const grouped = useMemo(() => {
    if (!faqs) return {} as Record<string, FaqItem[]>;
    return faqs.reduce((acc, f) => {
      const cat = f.category || "General";
      (acc[cat] ||= []).push(f);
      return acc;
    }, {} as Record<string, FaqItem[]>);
  }, [faqs]);

  return (
    <>
      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Help</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl leading-relaxed">
            Plain-English answers to the questions we hear most often about immigration, housing, fees, and process.
          </p>
        </div>
      </section>

      <TrustBadges />

      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {faqs === null ? (
            <p className="text-slate-400 text-center py-12">Loading...</p>
          ) : faqs.length === 0 ? (
            <div className="text-center py-16">
              <HelpCircle className="h-10 w-10 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">No FAQs published yet.</p>
              <Button asChild className="mt-6 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg">
                <Link href="/v6/contact-us/">Ask a question</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-5">{category}</h2>
                  <div className="space-y-3">
                    {items.map(faq => {
                      const open = openId === faq.id;
                      return (
                        <div key={faq.id} className="border border-slate-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => setOpenId(open ? null : faq.id)}
                            className="flex items-center justify-between gap-4 w-full p-5 text-left text-sm font-bold text-slate-900 hover:text-brand-red transition-colors"
                          >
                            {faq.question}
                            <ChevronDown className={`h-4 w-4 shrink-0 text-brand-red transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                          </button>
                          {open && (
                            <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 whitespace-pre-wrap">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-slate-50/60 border-t border-slate-100 py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Still have questions?</h2>
          <p className="mt-3 text-base text-slate-500 leading-relaxed max-w-xl mx-auto">
            Book a free consultation with one of our specialist solicitors.
          </p>
          <Button asChild size="lg" className="mt-6 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 px-8 font-bold uppercase tracking-wide">
            <Link href="/v6/contact-us/">Contact Us</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
