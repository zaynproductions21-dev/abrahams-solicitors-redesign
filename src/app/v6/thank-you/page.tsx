"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle2, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThankYouPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "enquiry_submitted" });
  }, []);

  return (
    <section className="min-h-[70vh] flex items-center py-16 lg:py-24">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-red/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-8 w-8 text-brand-red" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Thank you — we&rsquo;ve got your enquiry.</h1>
        <p className="mt-4 text-base text-slate-500 leading-relaxed">
          One of our solicitors will be in touch within one working day to arrange your free consultation. If your matter is urgent, call us directly on the number below.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide px-8 h-12">
            <a href="tel:02034880512"><Phone className="h-4 w-4 mr-2" />020 3488 0512</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-lg h-12 border-slate-200 hover:border-brand-red hover:text-brand-red">
            <Link href="/v6/">Back to home <ArrowRight className="h-4 w-4 ml-2" /></Link>
          </Button>
        </div>
        <p className="mt-10 text-xs text-slate-400">
          A confirmation email has been queued to the address you provided. Check your spam folder if you don&rsquo;t see it within a few minutes.
        </p>
      </div>
    </section>
  );
}
