/**
 * /flr-visa-extension/ — Dedicated Google Ads landing page for FLR(M) /
 * Further Leave to Remain (Marriage / Civil Partnership) queries.
 *
 * Why this exists:
 *   Ads previously landed on /immigration/ which Google rates BELOW AVERAGE
 *   for landing page experience — inflating CPC 3–5x. This page is a focused
 *   conversion surface for the search terms "flr visa", "flr m", "spouse
 *   visa extension uk", "partner visa extension uk".
 *
 * Server-component shell — exports page-specific metadata so the URL is
 * treated as a distinct page and accumulates its own QS signals rather
 * than inheriting the homepage / immigration-hub metadata. All interactive
 * content lives in <FlrVisaExtensionPageInner /> (client component which
 * cannot itself export metadata, hence this split).
 *
 * Pass criteria (track over 21-28 days):
 *   - Mobile LCP < 2.5s on PageSpeed Insights
 *   - QS on "flr visa", "flr m", "spouse visa extension" ≥ 5 within 28 days
 *   - Form completion rate ≥ 2x the /immigration/ baseline
 *   - Bounce rate down ≥ 15% vs /immigration/
 */

import type { Metadata } from "next";
import FlrVisaExtensionPageInner from "./FlrVisaExtensionPageInner";

export const metadata: Metadata = {
  title: "FLR(M) Visa Extension Solicitors | Fixed Fee | Abrahams",
  description:
    "FLR(M) visa extension solicitors. Fixed fees from £900. Speak to a named solicitor directly — no call centres. SRA regulated #809071. Free 15-min scoping call.",
  alternates: {
    canonical: "https://www.abrahamssolicitors.co.uk/flr-visa-extension/",
  },
  openGraph: {
    title: "FLR(M) Visa Extension Solicitors | Fixed Fee | Abrahams",
    description:
      "Fixed-fee FLR(M) extensions from £900. SRA-regulated firm. Free 15-min scoping call with a named solicitor before you commit.",
    url: "https://www.abrahamssolicitors.co.uk/flr-visa-extension/",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "FLR(M) Visa Extension Solicitors | From £900 | Abrahams",
    description:
      "Fixed-fee FLR(M) extensions from £900. SRA-regulated. Free 15-min scoping call.",
  },
};

export default function FlrVisaExtensionPage() {
  return <FlrVisaExtensionPageInner />;
}
