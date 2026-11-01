/**
 * /leaks-and-water-damage/ — scenario sub-page for the
 * housing-disrepair family. Second-biggest scenario in Abrahams'
 * housing CRM (43 of 273 enquiries mention leaks, roof damage,
 * burst pipes or water-damaged ceilings over 10 months).
 *
 * Indexable, FAQPage + LegalService schema, Sannah Khatoon as the
 * named author, 150-word verbatim answer under a question-shaped H1.
 * Statute citations inline: Section 11 LTA 1985 (plumbing and roof
 * installations), Pre-Action Protocol for Housing Conditions Claims,
 * special damages for ruined belongings and increased utility bills.
 */

import type { Metadata } from "next";
import LeaksAndWaterDamagePageInner from "./LeaksAndWaterDamagePageInner";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/leaks-and-water-damage/";

export const metadata: Metadata = {
  title: "Leaks and water damage in a rental — compensation claim | Abrahams Solicitors",
  description:
    "Roof leak, burst pipe, damaged ceiling? Specialist housing disrepair solicitors — compensation plus enforced repairs under Section 11 Landlord and Tenant Act 1985. Callback within the hour. SRA #809071.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Leaks and water damage — no win, no fee housing claim",
    description:
      "Compensation and enforced repairs for leaks, burst pipes and water-damaged ceilings in Council and Housing Association rentals.",
    url: PAGE_URL,
    type: "website",
    locale: "en_GB",
  },
};

export default function LeaksAndWaterDamagePage() {
  return <LeaksAndWaterDamagePageInner />;
}
