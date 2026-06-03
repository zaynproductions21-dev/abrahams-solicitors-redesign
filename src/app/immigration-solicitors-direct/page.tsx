/**
 * /immigration-solicitors-direct/ — minimal-nav variant of
 * /immigration-solicitors/ for paid-traffic A/B testing.
 *
 * Content body is identical: same H1, same refusal-state strip (now
 * bolstered per Track C), same reviews block, same fixed-fee table,
 * same FAQs, same form. Difference is the wrapping layout — this
 * route uses src/app/immigration-solicitors-direct/layout.tsx which
 * strips V6Header (full site nav) and V6Footer (service hub).
 *
 * SEO posture: this is a PAID-ONLY URL. We don't want Google to index
 * it as a near-duplicate of /immigration-solicitors/ (canonical tag
 * pointing at the parent + noindex robots meta below ensure that).
 * Sitemap intentionally excludes this URL.
 *
 * Built 2026-06-03 per Council Track A.
 */

import type { Metadata } from "next";
import ImmigrationSolicitorsPageInner from "@/app/v6/immigration-solicitors/ImmigrationSolicitorsPageInner";

export const metadata: Metadata = {
  title: "UK Immigration Solicitors — Direct Access | Abrahams",
  description:
    "UK immigration solicitors — direct solicitor access, no call centres. SRA-regulated firm #809071. Fixed fees from £750. 4.9★ from 97 verified reviews. Free 30-min consultation.",
  // Robots: paid-only LP. We don't want Google indexing it (would
  // duplicate /immigration-solicitors/) but Google Ads still needs to
  // crawl it for QS scoring + landing-page experience grading.
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      // Allow Google to render the page for QS landing-page-experience
      // scoring even though we ask for no index. This is the documented
      // posture for paid-only LPs per Google Ads QS guidelines.
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Canonical points at the parent /immigration-solicitors/ so any
  // accidental discovery of this URL doesn't dilute SEO equity from
  // the canonical paid-and-organic page.
  alternates: {
    canonical: "https://www.abrahamssolicitors.co.uk/immigration-solicitors/",
  },
  openGraph: {
    title: "UK Immigration Solicitors — Direct Access | Abrahams",
    description:
      "Direct solicitor access for UK visas, spouse visas, FLR(M), ILR, citizenship, refusals and appeals. Fixed fees from £750. Free 30-min consultation.",
    url: "https://www.abrahamssolicitors.co.uk/immigration-solicitors-direct/",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "UK Immigration Solicitors — Direct Access | Abrahams",
    description:
      "Direct solicitor access. Fixed fees from £750. Free 30-min consultation. SRA #809071.",
  },
};

export default function ImmigrationSolicitorsDirectPage() {
  return <ImmigrationSolicitorsPageInner />;
}
