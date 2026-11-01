/**
 * /removal-directions-urgent/ — scenario sub-page for the Emergency
 * Immigration router. Covers the "I have been served a letter"
 * cases: removal directions, refusal with a short appeal deadline,
 * imminent removal date.
 *
 * Indexable per the SEO advisor. 150-word verbatim answer under H1,
 * named author (Imran Shah), FAQPage + LegalService schema. Statute
 * citations inline — s.10 Immigration and Asylum Act 1999, Pre-Action
 * Protocol for Judicial Review, administrative review time limits.
 *
 * Copy per council: bounded service claims ("challenge the decision",
 * "serve representations") not "stop your removal" / "reverse the
 * refusal". Service act, not result.
 */

import type { Metadata } from "next";
import RemovalDirectionsPageInner from "./RemovalDirectionsPageInner";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/removal-directions-urgent/";

export const metadata: Metadata = {
  title: "Removal directions or refusal letter? Same-day legal advice | Abrahams",
  description:
    "Removal directions, refusal letter, or deadline looming? Specialist immigration solicitors assess challenge routes — administrative review, appeal, judicial review. Callback within the hour. SRA #809071.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Removal directions or refusal letter? Same-day legal advice",
    description:
      "Letter with a deadline? A specialist solicitor on the phone within the hour. Admin review, appeal, judicial review assessed on your facts.",
    url: PAGE_URL,
    type: "website",
    locale: "en_GB",
  },
};

export default function RemovalDirectionsUrgentPage() {
  return <RemovalDirectionsPageInner />;
}
