/**
 * /uk-spouse-visa-from-us/ — built 2026-05-20 per LLM Council pre-build review.
 *
 * Server component shell. Exports per-page metadata so this URL is treated as
 * a distinct page (US-targeted) rather than inheriting the homepage canonical.
 *
 * Sister page to /uk-spouse-visa/ — same architecture, US-specific copy.
 * Targeted by a £25/day Microsoft Advertising (Bing) campaign for Americans
 * applying for UK spouse or fiancé visas from the US.
 *
 * Council-prescribed blocker fixes baked into the inner component:
 *   1. Cat F savings figure £88,500 (~$112K) — NOT $90K (SRA Principle 7 risk)
 *   2. No US client testimonials unless real-with-permission (removed for v1)
 *   3. Income callout reframed: "we tell you what UKVI accepts as evidence" —
 *      NOT "we calculate your US income" (UK firm cannot opine on US tax/income)
 *   4. Immigration Health Surcharge (£3,105+) called out in total-cost section
 *   5. Pricing leads with USD equivalent, GBP in parentheses (Outsider input)
 *   6. "Why £900?" anchor explaining UK regulated fee market
 *   7. Inline glossary on first mention of SRA, UKVI, ILR, VAC
 *   8. Soft alternative for non-qualifiers ("Don't qualify yet?")
 *   9. Timezone CTA leads with EST overlap, not literal earliest hour
 *
 * Success metrics (per council risk callout, define before launch):
 *   - Day 14 target: ≥2 form submissions OR CPL < £60
 *   - Day 30 kill threshold: 0 submissions across full month
 *
 * See: docs/council-report-2026-05-20-us-spouse-lp.html
 */

import type { Metadata } from "next";
import SpouseVisaFromUSPageInner from "./SpouseVisaFromUSPageInner";

export const metadata: Metadata = {
  title: "UK Spouse Visa for Americans — Fixed Fee from £900 | Abrahams Solicitors",
  description:
    "UK partner visa solicitors for Americans applying from the US. Fixed-scope fees from £900. SRA-regulated firm #809071. Free 15-min scoping call with a UK-qualified solicitor.",
  alternates: {
    canonical: "https://www.abrahamssolicitors.co.uk/uk-spouse-visa-from-us/",
  },
  openGraph: {
    title: "UK Spouse Visa for Americans — Fixed Fee from £900 | Abrahams",
    description:
      "Fixed-fee UK partner visa applications for Americans. SRA-regulated UK firm. Free 15-min scoping call with a named solicitor.",
    url: "https://www.abrahamssolicitors.co.uk/uk-spouse-visa-from-us/",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "UK Spouse Visa for Americans — From £900 | Abrahams",
    description:
      "Fixed-scope UK partner visa fees from £900. SRA-regulated UK firm. Free consultation.",
  },
};

export default function UkSpouseVisaFromUSPage() {
  return <SpouseVisaFromUSPageInner />;
}
