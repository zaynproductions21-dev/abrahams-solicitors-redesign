/**
 * /immigration-solicitors/ — Twin paid-traffic LP for the £150/day
 * Google Ads "Immigration Lawyers / Immigration Solicitors" campaign.
 *
 * Built 1 June 2026 after the LLM Council (4 of 5 advisors REJECTED the
 * existing /immigration/ as a paid LP because wizards cannibalise the
 * form/phone primary CTAs on commercial-intent traffic). Council
 * transcript saved at:
 *   publishos/docs/abrahams-immigration-lp-council-2026-06-01.md
 *
 * Strategy: split the URL by intent.
 *   - /immigration/ stays as the SEO hub with all 7 wizards intact.
 *   - /immigration-solicitors/ (this URL) is the conversion-focused twin
 *     LP for paid traffic. NO wizards. Hero is solicitor proof + call +
 *     form + reviews + fees. Designed for late-funnel "I want to hire a
 *     solicitor" intent.
 *
 * Once live, the user re-points the Solicitors ad-group final URL in
 * Google Ads from /immigration/ to this URL. CVR lift target: 15-30%
 * (council estimate). CPC reduction target: ~20% from QS lift via
 * message-match between ad keyword and page H1.
 *
 * Pattern matches /flr-visa-extension/, /emergency-immigration-solicitor/
 * — server-component shell exports page-specific metadata; client inner
 * carries the interactive UI.
 */

import type { Metadata } from "next";
import ImmigrationSolicitorsPageInner from "./ImmigrationSolicitorsPageInner";

export const metadata: Metadata = {
  title: "UK Immigration Solicitors — SRA-Regulated, 4.9★ from 97 Reviews | Abrahams",
  description:
    "UK immigration solicitors. SRA-regulated firm #809071. Direct solicitor access — no call centres. Fixed fees from £750. 4.9★ from 97 verified reviews. Free 30-min consultation with named solicitor.",
  alternates: {
    canonical: "https://www.abrahamssolicitors.co.uk/immigration-solicitors/",
  },
  openGraph: {
    title: "UK Immigration Solicitors — SRA-Regulated | Abrahams",
    description:
      "Direct solicitor access for UK visas, spouse visas, FLR(M), ILR, citizenship, refusals and appeals. Fixed fees from £750. Free 30-min consultation.",
    url: "https://www.abrahamssolicitors.co.uk/immigration-solicitors/",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "UK Immigration Solicitors — SRA-Regulated | Abrahams",
    description:
      "Direct solicitor access. Fixed fees from £750. Free 30-min consultation. SRA #809071.",
  },
};

export default function ImmigrationSolicitorsPage() {
  return <ImmigrationSolicitorsPageInner />;
}
