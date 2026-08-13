/**
 * /immigration-solicitors/ — Twin paid-traffic LP for the £150/day
 * Google Ads "Immigration Lawyers / Immigration Solicitors" campaign.
 *
 * Built 1 June 2026 after the LLM Council (4 of 5 advisors REJECTED the
 * existing /immigration/ as a paid LP because wizards cannibalise the
 * form/phone primary CTAs on commercial-intent traffic). Council
 * transcript saved at:
 *   publishos/docs/abrahams-immigration-lp-council-2026-06-01.md
 *
 * Strategy: split the URL by intent.
 *   - /immigration/ stays as the SEO hub with all 7 wizards intact.
 *   - /immigration-solicitors/ (this URL) is the conversion-focused twin
 *     LP for paid traffic. NO wizards. Hero is solicitor proof + call +
 *     form + reviews + fees. Designed for late-funnel "I want to hire a
 *     solicitor" intent.
 *
 * Once live, the user re-points the Solicitors ad-group final URL in
 * Google Ads from /immigration/ to this URL. CVR lift target: 15-30%
 * (council estimate). CPC reduction target: ~20% from QS lift via
 * message-match between ad keyword and page H1.
 *
 * Pattern matches /flr-visa-extension/, /emergency-immigration-solicitor/
 * — server-component shell exports page-specific metadata; client inner
 * carries the interactive UI.
 *
 * Perf: JSON-LD schema is generated here (server) so the schema
 * generators + FAQ array aren't shipped as client JavaScript. The client
 * inner reads FAQS from ./data (which the server also imports below).
 */

import type { Metadata } from "next";
import ImmigrationSolicitorsPageInner from "./ImmigrationSolicitorsPageInner";
import {
  JsonLd,
  faqPageSchema,
  breadcrumbSchema,
  speakableSchema,
  personSchema,
  legalServiceWithCatalogSchema,
} from "@/components/v6/jsonld";
import { team } from "@/lib/team";
import { FAQS } from "./data";

const AUTHOR = team.find((t) => t.slug === "imran-shah")!;

export const metadata: Metadata = {
  title: "UK Immigration Solicitors — SRA-Regulated, 4.9★ from 97 Reviews | Abrahams",
  description:
    "UK immigration solicitors. SRA-regulated firm #809071. Direct solicitor access — no call centres. Fixed fees from £750. 4.9★ from 97 verified reviews. Free 30-min consultation with named solicitor.",
  alternates: {
    canonical: "https://www.abrahamssolicitors.co.uk/immigration-solicitors/",
  },
  openGraph: {
    title: "UK Immigration Solicitors — SRA-Regulated | Abrahams",
    description:
      "Direct solicitor access for UK visas, spouse visas, FLR(M), ILR, citizenship, refusals and appeals. Fixed fees from £750. Free 30-min consultation.",
    url: "https://www.abrahamssolicitors.co.uk/immigration-solicitors/",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "UK Immigration Solicitors — SRA-Regulated | Abrahams",
    description:
      "Direct solicitor access. Fixed fees from £750. Free 30-min consultation. SRA #809071.",
  },
};

export default function ImmigrationSolicitorsPage() {
  return (
    <>
      <JsonLd
        data={legalServiceWithCatalogSchema({
          name: "UK Immigration Solicitors — Abrahams Solicitors",
          description:
            "SRA-regulated immigration solicitors. Spouse visas, FLR(M) extensions, ILR, British citizenship, refusal appeals, Skilled Worker sponsorship, judicial review. Fixed fees from £750. Direct solicitor access — no call centres. Firm #809071.",
          slug: "immigration-solicitors",
          author: { name: AUTHOR.name, sraUrl: AUTHOR.sraUrl },
          catalog: [
            { name: "Spouse / partner visa applications and extensions", description: "Appendix FM entry clearance, FLR(M) 30-month extensions, and indefinite leave after 5 years on the partner route." },
            { name: "Indefinite Leave to Remain (ILR / settlement)", description: "5-year and 10-year long-residence routes, refugee/HP settlement, EUSS Settled Status." },
            { name: "British citizenship by naturalisation", description: "Standard 5-year route, spouse-route 3-year, and discretion cases." },
            { name: "Visa refusal appeals and judicial review", description: "First-tier and Upper Tribunal appeals, Pre-Action Protocol letters, JR in the Administrative Court." },
            { name: "Skilled Worker sponsorship and ILR", description: "Switching, extension, 60-day grace period after sponsor revocation, and 5-year settlement." },
            { name: "Sponsor licence applications and compliance", description: "A-rating applications, governance reviews, and compliance audits." },
          ],
        })}
      />
      <JsonLd
        data={personSchema({
          name: AUTHOR.name,
          jobTitle: AUTHOR.role,
          sraNumber: AUTHOR.sraNumber,
          sraUrl: AUTHOR.sraUrl,
          bio: AUTHOR.short,
          slug: AUTHOR.slug,
        })}
      />
      <JsonLd data={faqPageSchema([...FAQS])} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
          { name: "Immigration", url: "https://www.abrahamssolicitors.co.uk/immigration/" },
          { name: "Immigration Solicitors" },
        ])}
      />
      <JsonLd data={speakableSchema(["#hero-lead", ".speakable-faq-answer"])} />
      <ImmigrationSolicitorsPageInner />
    </>
  );
}
