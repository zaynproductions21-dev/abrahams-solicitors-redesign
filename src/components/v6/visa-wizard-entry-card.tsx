"use client";

/**
 * Pattern B from the Council placement decision — an entry-point card linking
 * to /visa-wizard/. Embedded on the immigration hub and the partner-visa
 * cluster pages where a full inline wizard would be too much.
 *
 * The card itself fires a `wizard_entry_card_clicked` GTM event so we can
 * measure click-through rate per surface (immigration hub vs each cluster
 * page) before deciding which surfaces deserve a full Pattern A embed.
 */

import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function VisaWizardEntryCard({
  /** Identifier for the surface this card is shown on (e.g. "immigration",
   * "uk-fiance-visa"). Forwarded to GTM so click-through can be filtered. */
  surface,
  /** Optional headline override — defaults to a generic spouse-visa-cluster
   * line. Hub pages can pass a broader headline. */
  headline,
  /** Optional subhead override. */
  subhead,
}: {
  surface: string;
  headline?: string;
  subhead?: string;
}) {
  return (
    <section className="py-8 lg:py-10 bg-slate-50/40">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
        <Link
          href="/visa-wizard/"
          onClick={() => {
            if (typeof window === "undefined") return;
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: "wizard_entry_card_clicked",
              surface,
            });
          }}
          className="group block rounded-2xl bg-gradient-to-br from-brand-navy to-slate-900 text-white p-6 sm:p-8 lg:p-10 ring-1 ring-white/10 hover:ring-white/20 transition-shadow"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-brand-red flex items-center justify-center shrink-0">
              <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-1">Free 60-second wizard</p>
              <h3 className="text-xl sm:text-2xl font-black leading-tight tracking-tight">
                {headline ?? "Not sure which UK visa route fits you?"}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-white/70 leading-relaxed max-w-xl">
                {subhead ?? "Six plain-English questions, instant route recommendation with the rule reference. No call follows automatically — we only contact you if you specifically ask."}
              </p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/60">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-gold" />
                SRA-regulated firm #809071 &middot; Reviewed by Imran Shah, SRA #509359
              </p>
            </div>
            <div className="inline-flex items-center gap-2 bg-brand-red group-hover:bg-brand-red-dark text-white rounded-lg px-5 h-12 text-sm font-bold uppercase tracking-wide shrink-0 transition-colors">
              Start the wizard
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
