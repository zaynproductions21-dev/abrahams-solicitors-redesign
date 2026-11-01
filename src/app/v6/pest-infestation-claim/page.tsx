/**
 * /pest-infestation-claim/ — scenario sub-page for the
 * housing-disrepair family. Third-biggest scenario in the Abrahams
 * housing CRM (37 of 273 enquiries over 10 months mention rats,
 * mice, cockroaches, bedbugs or other infestation — slightly ahead
 * of broken heating).
 *
 * Indexable, FAQPage + LegalService schema, Sannah Khatoon as the
 * named author, 150-word verbatim answer. Legal framing differs
 * from the other scenarios — Section 9A Homes (Fitness) Act 2018
 * (unfit for habitation) is the primary route; Section 11 LTA 1985
 * sometimes applies (where the infestation enters through a defect
 * the landlord is responsible for); Environmental Protection Act
 * 1990 Section 80 (statutory nuisance via the local authority
 * environmental health team) is a parallel remedy.
 */

import type { Metadata } from "next";
import PestInfestationPageInner from "./PestInfestationPageInner";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/pest-infestation-claim/";

export const metadata: Metadata = {
  title: "Pest and vermin infestation in a rental — compensation claim | Abrahams",
  description:
    "Rats, mice, cockroaches or bedbugs the landlord has ignored? Specialist housing solicitors — unfit for habitation claims under the Homes (Fitness) Act 2018. Callback within the hour. SRA #809071.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Pest and vermin infestation — no win, no fee housing claim",
    description:
      "Compensation and enforced treatment for rats, mice, cockroaches and bedbugs in Council and Housing Association rentals.",
    url: PAGE_URL,
    type: "website",
    locale: "en_GB",
  },
};

export default function PestInfestationClaimPage() {
  return <PestInfestationPageInner />;
}
