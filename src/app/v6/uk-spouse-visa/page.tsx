/**
 * /uk-spouse-visa/ — REBUILT 2026-05-20 per LLM Council spec.
 *
 * SERVER COMPONENT SHELL — exports page-specific metadata (canonical, title,
 * description, OG) so this URL is treated as a distinct page rather than
 * inheriting the homepage metadata from the root layout. Without this, Google
 * was treating /uk-spouse-visa/ as a duplicate of the homepage and would not
 * accumulate independent ranking signals — blocking the QS recovery the LP
 * rebuild was supposed to deliver.
 *
 * All interactive content (state, form, FAQ accordion, JSON-LD blocks) lives
 * in SpouseVisaPageInner.tsx — a client component (which cannot itself export
 * metadata, hence this split).
 *
 * Council-mandated changes vs the old [slug]-template version:
 *  1. SRA-safe pricing (drops the asterisk-with-caveat that destroys trust)
 *  2. Inline 4-field form ABOVE the fold on mobile (was a button that scrolled)
 *  3. Eligibility-answering 3-bullet check in hero (answers "do I qualify?")
 *  4. Trust block promoted INTO hero (was lower-down)
 *  5. Single primary CTA above fold — phone in header, no competing buttons
 *
 * SLA: 24 hours — Mon-Fri intake, weekend submissions land Monday.
 * Pricing: From £900 fixed scope, with full quote-in-writing scoping call.
 *
 * Pass criteria (track over 21-28 days):
 *  - Mobile LCP < 2.5s on PageSpeed Insights
 *  - QS on `spouse visa uk` ≥ 5 within 28 days of recrawl
 *  - Form completion rate ≥ 2× the [slug]-template baseline
 *  - Bounce rate down ≥ 15%
 *
 * See: docs/abrahams-spouse-visa-lp-spec-2026-05-20.md
 */

import type { Metadata } from "next";
import SpouseVisaPageInner from "./SpouseVisaPageInner";

export const metadata: Metadata = {
  title: "UK Spouse Visa Solicitors — From £900 Fixed Scope | Abrahams",
  description:
    "UK spouse visa solicitors. Fixed-scope fees from £900. Reply within 24 hours, Mon-Fri. SRA-regulated firm #809071. Free 15-min scoping call with a named solicitor before you commit.",
  alternates: {
    canonical: "https://www.abrahamssolicitors.co.uk/uk-spouse-visa/",
  },
  openGraph: {
    title: "UK Spouse Visa Solicitors — From £900 Fixed Scope | Abrahams",
    description:
      "Fixed-scope spouse visa fees from £900. SRA-regulated firm. Reply within 24 hours. Direct access to a named solicitor.",
    url: "https://www.abrahamssolicitors.co.uk/uk-spouse-visa/",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "UK Spouse Visa Solicitors — From £900 | Abrahams",
    description:
      "Fixed-scope spouse visa fees from £900. SRA-regulated. Reply within 24 hours.",
  },
};

export default function UkSpouseVisaPage() {
  return <SpouseVisaPageInner />;
}
