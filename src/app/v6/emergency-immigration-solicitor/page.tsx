/**
 * /emergency-immigration-solicitor/ — 24/7 emergency immigration help page.
 *
 * Targets SEO and high-intent direct traffic on queries like:
 *   "emergency immigration solicitor", "24 hour immigration help uk",
 *   "urgent visa help", "deportation solicitor uk", "detention solicitor",
 *   "out of hours immigration solicitor", "visa expired help", "dawn raid
 *   solicitor"
 *
 * Built off the LLM Council mandates from the ILUK emergency-page review
 * (saved at publishos/docs/iluk-emergency-page-council-*-2026-05-20.*).
 * The council settled the structural decisions for ANY emergency-immigration
 * page; this Abrahams build applies them directly:
 *
 *   - No placeholder credentials (SRA #, named solicitor in real)
 *   - No unsubstantiated conversion stats published on the live page
 *   - 24/7 promise framed honestly ("answered within 30 mins by on-call
 *     solicitor — Mon-Sun including bank holidays") not "qualified team
 *     member picks up instantly" (SRA Standard 8.1 risk if it's actually
 *     a virtual reception)
 *   - Phone number = primary tap-to-dial button; callback form secondary
 *   - Sticky mobile call bar visible at every scroll
 *   - Plain English first, statute citations in brackets / collapsed footers
 *   - Drop Morton Hall (closed as IRC 2021)
 *   - "Stay calm, be polite, don't obstruct" added to right-to-silence
 *     section per SRA-risk concern
 *   - DDAS reframed as triage-not-representation, not lead cannibalisation
 *   - OISC / Citizens Advice rebuttal: they can't file emergency injunctions
 *   - Article 3 paragraph leads with "we have done this before", not
 *     torture-risk legalese
 *
 * Scope deliberately broader than the ILUK preview:
 *   - Expired visas / overstayer (Para 39E framing)
 *   - Detention (port, removal centre, dawn raid)
 *   - Refused visas (recent refusal, missed appeal deadline, urgent
 *     injunction)
 *   - Out-of-hours promise + what happens when you call
 *
 * Named solicitor: Imran Shah (SRA #509359, admitted 2012).
 */

import type { Metadata } from "next";
import EmergencyImmigrationSolicitorPageInner from "./EmergencyImmigrationSolicitorPageInner";

export const metadata: Metadata = {
  title: "Emergency Immigration Solicitor — 24/7 UK Help | Abrahams",
  description:
    "24-hour emergency immigration solicitors. Expired visas, detention, removal directions, refused visas, dawn raids. SRA-regulated firm #809071. First call free. Out-of-hours including bank holidays.",
  alternates: {
    canonical: "https://www.abrahamssolicitors.co.uk/emergency-immigration-solicitor/",
  },
  openGraph: {
    title: "Emergency Immigration Solicitor — 24/7 UK Help | Abrahams",
    description:
      "Out-of-hours immigration solicitors for urgent UK cases — expired visas, detention, refused visas, dawn raids. SRA-regulated. First call free.",
    url: "https://www.abrahamssolicitors.co.uk/emergency-immigration-solicitor/",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Emergency Immigration Solicitor — 24/7 UK Help | Abrahams",
    description:
      "Urgent UK immigration help, including out-of-hours. SRA-regulated. First call free.",
  },
};

export default function EmergencyImmigrationSolicitorPage() {
  return <EmergencyImmigrationSolicitorPageInner />;
}
