"use client";

/**
 * Skeepers / Verified Reviews — embedded review widget.
 *
 * Currently renders the BRAND CAROUSEL widget (the only review-listing
 * widget configured in the Skeepers backoffice for this account). When a
 * dedicated List Brand widget is created in the Skeepers dashboard later,
 * swap SKEEPERS_WIDGET_TYPE → "list" and update SKEEPERS_WIDGET_UUID to
 * the new widget's id; everything else stays as-is.
 *
 * The widget is two parts: a target div with a Skeepers-specific class
 * and a script tag pointing at widgets.rr.skeepers.io with the merchant
 * UUID and the widget UUID baked into the URL. The script is lazy-loaded
 * so it does not compete with the page's LCP.
 *
 * To swap to a future List widget:
 *   1. In Skeepers backoffice: Display reviews → Integrate my widgets →
 *      List → Integrate, copy the new widget UUID from the script URL.
 *   2. Set SKEEPERS_WIDGET_TYPE = "list" and SKEEPERS_WIDGET_UUID to that
 *      uuid. Container class stays the same pattern.
 */

import Script from "next/script";

// ─── Skeepers configuration ────────────────────────────────────────────
const SKEEPERS_CONFIGURED = true;
const SKEEPERS_MERCHANT_UUID = "05e45d6a-f5da-d744-cde2-d610aceec3fd";
const SKEEPERS_WIDGET_TYPE: "carousel" | "list" = "carousel";
const SKEEPERS_WIDGET_UUID = "80426ae2-bd6f-4220-8249-afeed0b9de3c";
// Carousel-only — number of slides visible at once. Skeepers ignores
// this attribute on list widgets.
const SKEEPERS_SLIDES_COUNT = 4;

const SKEEPERS_SCRIPT_SRC =
  `https://widgets.rr.skeepers.io/${SKEEPERS_WIDGET_TYPE}/${SKEEPERS_MERCHANT_UUID}/${SKEEPERS_WIDGET_UUID}.js`;

export function SkeepersListWidget({ fallbackUrl }: { fallbackUrl: string }) {
  if (!SKEEPERS_CONFIGURED) {
    return (
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-8 sm:p-10 text-center">
        <h3 className="text-lg sm:text-xl font-black text-slate-900">
          Reviews are hosted on Verified Reviews
        </h3>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
          The full searchable list of every client review sits on our
          independent Verified Reviews listing.
        </p>
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg px-6 h-11 text-sm font-bold uppercase tracking-wide"
        >
          Open all reviews
        </a>
      </div>
    );
  }

  if (SKEEPERS_WIDGET_TYPE === "carousel") {
    return (
      <>
        <div
          className="skeepers_carousel_container"
          data-slides-count={SKEEPERS_SLIDES_COUNT}
        />
        <Script src={SKEEPERS_SCRIPT_SRC} strategy="lazyOnload" defer charSet="utf-8" />
      </>
    );
  }

  // SKEEPERS_WIDGET_TYPE === "list" — wired for the day Skeepers' List
  // Brand widget is created in the dashboard.
  return (
    <>
      <div id="netreviews_list_widget" />
      <Script src={SKEEPERS_SCRIPT_SRC} strategy="lazyOnload" defer charSet="utf-8" />
    </>
  );
}
