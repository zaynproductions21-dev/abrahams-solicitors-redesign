/**
 * /emergency-immigration-faq/ — Long-tail FAQ companion to the
 * /emergency-immigration-solicitor/ landing page.
 *
 * The emergency page surfaces 5 inline FAQs. This companion page carries
 * the rest — ~25 questions organised across 6 categories (detention,
 * dawn raids, removal & injunctions, expired visas, refusals & appeals,
 * process & cost). Plus a final FAQPage schema with every Q so AI search
 * (Google AI Overviews, Perplexity, ChatGPT) can cite us as the source
 * for long-tail emergency-immigration queries.
 *
 * Server-component shell exports page-specific metadata; the interactive
 * UI lives in EmergencyFaqPageInner.tsx (client component for the
 * accordion state).
 *
 * Built 1 June 2026 as the deferred v1.1 companion to the emergency LP.
 */

import type { Metadata } from "next";
import EmergencyFaqPageInner from "./EmergencyFaqPageInner";

export const metadata: Metadata = {
  title: "Emergency Immigration FAQ — Detention, Removal, Dawn Raids | Abrahams",
  description:
    "Plain-English answers to UK immigration emergency questions: detention rights, removal directions, dawn raids, expired visas, refused visas, appeals, injunctions, legal aid, costs. Reviewed by Imran Shah (SRA #509359).",
  alternates: {
    canonical: "https://www.abrahamssolicitors.co.uk/emergency-immigration-faq/",
  },
  openGraph: {
    title: "Emergency Immigration FAQ — UK | Abrahams Solicitors",
    description:
      "Plain-English answers to UK immigration emergencies: detention, removal, dawn raids, refusals, appeals. SRA-regulated.",
    url: "https://www.abrahamssolicitors.co.uk/emergency-immigration-faq/",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Emergency Immigration FAQ — UK | Abrahams",
    description: "Plain-English answers on detention, removal, dawn raids, refusals.",
  },
};

export default function EmergencyFaqPage() {
  return <EmergencyFaqPageInner />;
}
