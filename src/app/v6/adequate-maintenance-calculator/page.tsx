/**
 * /adequate-maintenance-calculator/ — UK immigration adequate maintenance
 * calculator and explainer.
 *
 * What it is:
 *   The "adequate maintenance" test is the alternative to the £29,000
 *   financial requirement under Appendix FM. It applies when the UK
 *   sponsor receives certain qualifying benefits — PIP, DLA, Attendance
 *   Allowance, Carer's Allowance, AFIP, or War Disablement Pension. For
 *   those families, the £29k threshold does NOT apply; instead, the
 *   Home Office checks whether the household will be "adequately
 *   maintained" without recourse to public funds.
 *
 *   The test (from KA (Pakistan) [2006] / AM (Ethiopia) [2008]):
 *     Net weekly income − weekly housing costs  ≥  Income Support rate
 *                                                  for the household
 *
 * Why we built this:
 *   Sponsor disability is a common scenario at Abrahams — the families
 *   are panicked when they see the £29k figure and assume the case is
 *   hopeless. This calculator lets them check, in plain English, whether
 *   they can use the adequate maintenance route instead. If yes, the
 *   case is often very winnable. If marginal or no, they're routed to a
 *   solicitor consultation rather than left with a misleading verdict.
 *
 * Pattern mirrors /flr-visa-extension/ + the wizards: server-component
 * shell exports metadata; client component carries the interactive UI.
 */

import type { Metadata } from "next";
import AdequateMaintenanceCalculatorPageInner from "./AdequateMaintenanceCalculatorPageInner";

export const metadata: Metadata = {
  title: "Adequate Maintenance Calculator — Spouse Visa Alternative to £29,000 | Abrahams",
  description:
    "UK adequate maintenance calculator for spouse and partner visas. If your UK sponsor receives PIP, DLA, Carer's Allowance or other qualifying benefits, the £29,000 financial requirement may not apply. Check in 60 seconds. SRA-regulated.",
  alternates: {
    canonical: "https://www.abrahamssolicitors.co.uk/adequate-maintenance-calculator/",
  },
  openGraph: {
    title: "Adequate Maintenance Calculator | Abrahams Solicitors",
    description:
      "Free calculator — check whether the adequate maintenance route exempts your case from the £29,000 spouse visa income requirement.",
    url: "https://www.abrahamssolicitors.co.uk/adequate-maintenance-calculator/",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Adequate Maintenance Calculator — UK Spouse Visa | Abrahams",
    description:
      "Check if your case qualifies for the adequate maintenance route under Appendix FM. Free, 60 seconds.",
  },
};

export default function AdequateMaintenanceCalculatorPage() {
  return <AdequateMaintenanceCalculatorPageInner />;
}
