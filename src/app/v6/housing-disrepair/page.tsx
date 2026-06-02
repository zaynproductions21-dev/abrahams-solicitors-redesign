/**
 * /housing-disrepair/ — Dedicated landing page for Google Ads on housing
 * disrepair queries.
 *
 * Previously this page rendered as a "use client" component with no
 * dedicated metadata — meaning Google saw the root-layout title
 * ("Immigration Solicitors London | Housing Law | Abrahams Solicitors")
 * and a generic immigration-focused meta description. The ad keyword
 * "housing disrepair solicitors" appeared nowhere in the title tag,
 * which is the single biggest reason Google rated landing-page-experience
 * BELOW AVERAGE.
 *
 * This file is the server-component shell exporting page-specific
 * metadata so Google treats the URL as a distinct, ad-keyword-aligned
 * page. All interactive content (HousingQualifier widget, ExitIntent
 * modal, FAQ accordion, JSON-LD blocks) lives in HousingDisrepairPageInner.
 *
 * Pass criteria:
 *  - Mobile LCP < 2.5s on PageSpeed Insights
 *  - QS on "housing disrepair solicitors" ≥ 5 within 28 days of recrawl
 *  - Ad relevance + landing page experience graded ≥ Average (was Below)
 *
 * No content removed from the original page — only the metadata wrapper
 * added and a sub-headline beneath the H1 carrying the literal ad keyword.
 */

import type { Metadata } from "next";
import HousingDisrepairPageInner from "./HousingDisrepairPageInner";

// Title intentionally drops the "London" qualifier — the housing-disrepair
// Google Ads campaigns target London AND Birmingham (with Manchester +
// Northern Cities pending). Hard-coding "London" in the title causes a
// message-match break for Birmingham searchers clicking Birmingham ads
// (QS penalty). City-specific URLs (/london/, /birmingham/) are a future
// task once volume justifies the split. Changed 2026-06-02 per QS audit.
export const metadata: Metadata = {
  title: "Housing Disrepair Solicitors | No Win No Fee Claims | Abrahams",
  description:
    "Housing disrepair solicitors covering London, Birmingham & nationwide. Damp, mould, leaks — claim against your landlord. No win, no fee. SRA-regulated firm #809071. Free case check.",
  alternates: {
    canonical: "https://www.abrahamssolicitors.co.uk/housing-disrepair/",
  },
  openGraph: {
    title: "Housing Disrepair Solicitors | No Win No Fee Claims | Abrahams",
    description:
      "No-win-no-fee housing disrepair claims for damp, mould, leaks, broken heating and unsafe conditions. London, Birmingham & nationwide. SRA-regulated. Free case check.",
    url: "https://www.abrahamssolicitors.co.uk/housing-disrepair/",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Housing Disrepair Solicitors | No Win No Fee | Abrahams",
    description:
      "No-win-no-fee housing disrepair claims. SRA-regulated. Free case check.",
  },
};

export default function HousingDisrepairPage() {
  return <HousingDisrepairPageInner />;
}
