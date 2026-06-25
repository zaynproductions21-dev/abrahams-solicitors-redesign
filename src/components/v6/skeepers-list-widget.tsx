"use client";

/**
 * Skeepers / Verified Reviews — list brand widget.
 *
 * The widget renders client-side from a script + a target div, both provided
 * by Skeepers in the "List Brand Widget" section of the merchant dashboard.
 *
 * To connect:
 * 1. Log in to https://my.skeepers.io/
 * 2. Reviews → Brand → Widgets → List Brand Widget → "Get the code"
 * 3. Copy the two values it gives you (the script src URL and the target
 *    div's id / data-* attributes) into the constants below.
 * 4. Set SKEEPERS_CONFIGURED to true.
 *
 * Until that's done, the component renders a clear fallback CTA that links
 * to the public Verified Reviews listing, so the /reviews/ page is useful
 * from day one.
 *
 * Performance: the script is loaded with strategy="lazyOnload" so it does
 * not compete with the page's LCP. The reviews are below the fold.
 */

import Script from "next/script";
import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";

// ─── Skeepers configuration ────────────────────────────────────────────
// Replace the placeholders with the values Skeepers gives you, then flip
// SKEEPERS_CONFIGURED to true. No other change in the file is required.
const SKEEPERS_CONFIGURED = false;
const SKEEPERS_SCRIPT_SRC = "https://cl.avis-verifies.com/uk/widget6/PASTE-MERCHANT-ID-HERE.js";
const SKEEPERS_TARGET_ID = "netreviews_list_widget";
// If your Skeepers snippet uses extra data-* attributes on the target div,
// add them here.
const SKEEPERS_TARGET_ATTRS: Record<string, string> = {
  // "data-aw-merchant-id": "...",
};

export function SkeepersListWidget({ fallbackUrl }: { fallbackUrl: string }) {
  if (!SKEEPERS_CONFIGURED) {
    return (
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-8 sm:p-10 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-red/5 mb-4">
          <Star className="h-7 w-7 fill-brand-red text-brand-red" />
        </div>
        <h3 className="text-lg sm:text-xl font-black text-slate-900">
          Reviews are hosted on Verified Reviews
        </h3>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
          The full searchable list of every client review, with dates, services,
          and our responses, sits on our independent Verified Reviews listing.
        </p>
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg px-6 h-11 text-sm font-bold uppercase tracking-wide"
        >
          Open all reviews <ExternalLink className="h-4 w-4" />
        </a>
        <p className="mt-4 text-[11px] text-slate-400">
          The in-page list view goes live as soon as the Skeepers widget is connected.
        </p>
        <p className="mt-3 text-[11px] text-slate-400">
          Need to make a complaint instead? See our{" "}
          <Link href="/complaints/" className="underline-offset-2 hover:underline">
            complaints procedure
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <>
      <div id={SKEEPERS_TARGET_ID} {...SKEEPERS_TARGET_ATTRS} />
      <Script src={SKEEPERS_SCRIPT_SRC} strategy="lazyOnload" />
    </>
  );
}
