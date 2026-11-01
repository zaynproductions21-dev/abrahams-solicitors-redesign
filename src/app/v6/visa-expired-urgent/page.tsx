/**
 * /visa-expired-urgent/ — scenario sub-page for the Emergency
 * Immigration router. Built off the LLM Council verdict of
 * 2026-11-01 which found that 20% of the parent LP's leads AND 2 of
 * 3 won cases came from visa-expired/overstayer intent.
 *
 * Indexable (NOT noindex) per the SEO advisor's mandate — organic
 * is Abrahams' primary revenue line. Carries a 150-word verbatim-
 * liftable answer block under the H1 for AI Overviews, FAQPage +
 * LegalService schema, speakable targets, named author (Imran Shah,
 * SRA #509359), and inline statute citation (section 3C Immigration
 * Act 1971; Para 39E Immigration Rules).
 *
 * Copy avoids "we obtain your visa" / "stop your removal" per the
 * universal council copy guardrail (Google government-docs policy +
 * SRA Code Standard 8). Service claims are bounded to the service
 * act, never the result.
 */

import type { Metadata } from "next";
import VisaExpiredPageInner from "./VisaExpiredPageInner";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/visa-expired-urgent/";

export const metadata: Metadata = {
  title: "My UK visa has expired — same-day legal advice | Abrahams Solicitors",
  description:
    "Expired UK visa or overstayed? A specialist immigration solicitor will call you back today. Para 39E and section 3C routes assessed — no judgement, no up-front fee. SRA #809071.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "My UK visa has expired — same-day legal advice",
    description:
      "Overstayed? Facing the end of your leave? Specialist immigration solicitors who deal with section 3C and Para 39E routes every week. Callback within the hour.",
    url: PAGE_URL,
    type: "website",
    locale: "en_GB",
  },
};

export default function VisaExpiredUrgentPage() {
  return <VisaExpiredPageInner />;
}
