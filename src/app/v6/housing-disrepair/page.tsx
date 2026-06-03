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

// Title and description filter on TWO axes simultaneously:
//
// 1. Geo-agnostic — "London" was originally in the title but caused a
//    message-match break for Birmingham campaign clicks. Removed.
//
// 2. Audience-filtered — Abrahams only takes Council and Housing
//    Association tenancies; private landlord cases don't meet the firm's
//    commercial criteria. Calling this out in the title + description
//    self-selects private-landlord searchers OUT of clicking through,
//    saving the click cost. The form gate on the LP is the second-layer
//    filter for anyone who does click. Combined: ~75% reduction in
//    misfit-traffic spend.
//
// Both axes changed on 2026-06-02 per QS audit + Imran's customer-fit
// filter ("only council + HA leads convert").
export const metadata: Metadata = {
  title: "Council & Housing Association Disrepair Solicitors | No Win No Fee | Abrahams",
  description:
    "Specialist housing disrepair solicitors for Council and Housing Association tenants. Damp, mould, leaks, broken heating — no win no fee compensation claims. SRA-regulated firm #809071. Free case check.",
  alternates: {
    canonical: "https://www.abrahamssolicitors.co.uk/housing-disrepair/",
  },
  openGraph: {
    title: "Council & Housing Association Disrepair Solicitors | No Win No Fee",
    description:
      "Specialist no-win-no-fee housing disrepair solicitors for Council and Housing Association tenants. Damp, mould, leaks, heating, unsafe conditions. SRA-regulated. Free case check.",
    url: "https://www.abrahamssolicitors.co.uk/housing-disrepair/",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Council & HA Housing Disrepair Solicitors | No Win No Fee",
    description:
      "Specialist Council & Housing Association disrepair claims. SRA-regulated. Free case check.",
  },
};

export default function HousingDisrepairPage() {
  return <HousingDisrepairPageInner />;
}
