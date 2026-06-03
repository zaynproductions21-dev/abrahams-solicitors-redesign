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

// NOTE on lead attribution: the inner component currently submits leads
// with source: "immigration-solicitors-lp" regardless of which variant
// the visitor landed on. For clean A/B reporting in SalesHub /
// PublishOS we'd want this URL to tag leads as
// "immigration-solicitors-direct" instead. Deferred to a follow-up
// commit because changing it requires either (a) plumbing a prop
// through ImmigrationSolicitorsPageInner or (b) the inner reading
// usePathname() and varying source by URL. Both are clean but neither
// is a 5-minute change. For now the A/B is split via:
//   - GA4 dimension lp_variant (lives on every event)
//   - Google Ads landing-page report (URL-aware natively)
// which is sufficient for the 14-day CPA comparison. See spec at
// docs/abrahams-immigration-solicitors-ab-spec-2026-06-03.md.

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
