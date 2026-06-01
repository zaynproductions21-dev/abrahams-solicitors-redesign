/**
 * /skilled-worker-wizard/ — UK Skilled Worker triage wizard.
 *
 * Server-component shell exporting metadata. The interactive wizard lives
 * in SkilledWorkerWizardPageInner.tsx (client component which cannot
 * itself export metadata, hence this split).
 *
 * Wizard spec: docs/skilled-worker-wizard-spec-v1.md — APPROVED v1.0 by
 * Imran Shah on 1 June 2026.
 *
 * Pattern matches /flr-visa-extension/, /uk-spouse-visa/, /housing-disrepair/
 * — page-specific metadata is essential for Google Ads landing-page-
 * experience scoring (an earlier mistake on /housing-disrepair/ inherited
 * the root-layout title and tanked QS until split).
 */

import type { Metadata } from "next";
import SkilledWorkerWizardPageInner from "./SkilledWorkerWizardPageInner";

export const metadata: Metadata = {
  title: "Skilled Worker Visa Triage Wizard | UK Sponsorship Help | Abrahams",
  description:
    "Free Skilled Worker visa triage wizard. Five plain-English questions, instant routing to the right next step — sponsor revoked, overstayer, switching, extension, ILR. SRA-regulated firm #809071. Reviewed by Imran Shah (SRA #509359).",
  alternates: {
    canonical: "https://www.abrahamssolicitors.co.uk/skilled-worker-wizard/",
  },
  openGraph: {
    title: "Skilled Worker Visa Triage Wizard | Abrahams Solicitors",
    description:
      "Free 5-question triage for UK Skilled Worker visa cases — sponsor licence revoked, 60-day grace period, overstayer, switching, ILR. SRA-regulated.",
    url: "https://www.abrahamssolicitors.co.uk/skilled-worker-wizard/",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Skilled Worker Visa Triage Wizard — Free | Abrahams",
    description:
      "5 questions, instant routing. SRA-regulated UK immigration solicitors.",
  },
};

export default function SkilledWorkerWizardPage() {
  return <SkilledWorkerWizardPageInner />;
}
