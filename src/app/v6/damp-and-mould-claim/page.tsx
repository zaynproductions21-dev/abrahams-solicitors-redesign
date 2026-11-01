/**
 * /damp-and-mould-claim/ — scenario sub-page for the housing-disrepair
 * family. Damp + mould is the dominant scenario in the firm's housing
 * CRM (106 of 273 enquiries over 10 months mention it — ~40% of all
 * problem-field text), and it carries the strongest statutory + case-
 * law backing after Awaab Ishak's death in Rochdale and the
 * subsequent "Awaab's Law" amendment in the Social Housing
 * (Regulation) Act 2023.
 *
 * Indexable, FAQPage + LegalService schema with Sannah Khatoon as the
 * named author (SRA #654258), 150-word verbatim answer under a
 * question-shaped H1 for AI Overviews / Perplexity / ChatGPT lift.
 * Statute citations inline: Section 11 LTA 1985, Section 9A Homes
 * (Fitness for Human Habitation) Act 2018, Awaab's Law (Social
 * Housing Regulation Act 2023), Pre-Action Protocol for Housing
 * Conditions Claims.
 */

import type { Metadata } from "next";
import DampAndMouldPageInner from "./DampAndMouldPageInner";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/damp-and-mould-claim/";

export const metadata: Metadata = {
  title: "Damp and mould compensation — no win, no fee claim | Abrahams Solicitors",
  description:
    "Council or housing association ignoring damp and mould? Specialist housing solicitors — compensation and repairs enforced under Section 11 LTA 1985 and Awaab's Law. Callback within the hour. SRA #809071.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Damp and mould compensation — no win, no fee",
    description:
      "Specialist housing disrepair solicitors for Council and Housing Association tenants dealing with damp and mould. Typical settlements £1,500–£15,000.",
    url: PAGE_URL,
    type: "website",
    locale: "en_GB",
  },
};

export default function DampAndMouldClaimPage() {
  return <DampAndMouldPageInner />;
}
