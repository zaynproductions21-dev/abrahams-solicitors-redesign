/**
 * /immigration-detention/ — scenario sub-page for the Emergency
 * Immigration router. Covers:
 *   - Someone held at a UK Immigration Removal Centre (IRC)
 *   - Someone held at a port of entry
 *   - Someone picked up by Immigration Enforcement
 *   - Dawn raids
 *
 * Owns the heavy organic / E-E-A-T moat per the SEO advisor — Hardial
 * Singh principles are cited inline with gov.uk links, named author
 * (Imran Shah, SRA #509359), FAQPage + LegalService schema.
 *
 * Copy per council: bounded service claims ("make a bail application",
 * "challenge detention") not outcome verbs ("get them released",
 * "stop the removal"). Nothing that implies a guaranteed result.
 */

import type { Metadata } from "next";
import DetentionPageInner from "./DetentionPageInner";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/immigration-detention/";

export const metadata: Metadata = {
  title: "UK immigration detention solicitor — same-day bail applications | Abrahams",
  description:
    "Someone held at a UK Immigration Removal Centre, port, or by Immigration Enforcement? A specialist immigration solicitor will call you back today. Hardial Singh assessment, bail applications, judicial review. SRA #809071.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "UK immigration detention solicitor — same-day bail applications",
    description:
      "Someone held at a removal centre or port? A specialist on the phone within the hour, day or night. Bail, Hardial Singh, judicial review.",
    url: PAGE_URL,
    type: "website",
    locale: "en_GB",
  },
};

export default function ImmigrationDetentionPage() {
  return <DetentionPageInner />;
}
