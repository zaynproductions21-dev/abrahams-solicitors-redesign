"use client";

/**
 * Skeepers / Verified Reviews — embedded review widget.
 *
 * Renders the BRAND LIST widget on /reviews/, which is the new web-component
 * style widget Skeepers introduced in mid-2026 (announcement email June 2026).
 * Older widgets (Carousel, Badge) still use the legacy per-widget script
 * pattern and live in trust-badges.tsx / the home page.
 *
 * The new pattern is two parts:
 *   - a universal loader script (widgets.rr.skeepers.io/widgets/loader.js)
 *   - a custom HTML element <skp-brand-widget-list ...> wired to a specific
 *     widget by solution-instance-id + widget-id.
 *
 * Configuration values come from the merchant's Skeepers backoffice
 * (Display reviews → Integrate my widgets → List → Integrate).
 *
 * Performance: loader script uses strategy="lazyOnload" so it does not
 * compete with the page's LCP — the widget is below the fold.
 */

import { createElement } from "react";
import Script from "next/script";

// ─── Skeepers configuration ────────────────────────────────────────────
const SKEEPERS_CONFIGURED = true;
const SKEEPERS_LOADER_SRC = "https://widgets.rr.skeepers.io/widgets/loader.js";
const SKEEPERS_SOLUTION_INSTANCE_ID = "8ce6baa6-3144-4df7-81d4-db35b7a9b71b";
const SKEEPERS_WIDGET_ID = "95379c50-00f3-45f9-a585-0d9ae73ea027";

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

  // Use createElement to render the Skeepers custom element. JSX would
  // need a global module augmentation for the unknown <skp-...> tag;
  // createElement is type-safe without that ceremony.
  return (
    <>
      {createElement("skp-brand-widget-list", {
        "solution-instance-id": SKEEPERS_SOLUTION_INSTANCE_ID,
        "widget-id": SKEEPERS_WIDGET_ID,
      })}
      <Script src={SKEEPERS_LOADER_SRC} strategy="lazyOnload" />
    </>
  );
}
