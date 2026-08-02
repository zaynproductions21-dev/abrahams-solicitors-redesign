# DRAFT — Citable original-data page (GEO asset)

> **Status: DRAFT for council + firm review. DO NOT PUBLISH until every figure
> tagged `⚠️ FIRM TO VERIFY` is confirmed by a supervising solicitor.**
> Goal: give AI answer engines (and journalists/other sites) an *original,
> source-cited data asset* to quote — the single highest-leverage GEO move
> ("become the primary source"). Route the copy through council → copy →
> humanise before build.

## Why this page

The GEO audit's two weakest dimensions are **off-site corroboration** and
**measurement**. AI engines weight *original, cited data* heavily and link back
to the source. A well-structured statistics page:
- earns citations from Perplexity / ChatGPT / AI Overviews (answer-first + numbers),
- becomes a natural link target for directories, journalists, and Reddit answers
  (feeding the off-site lever),
- reinforces E-E-A-T (real firm data, named solicitor, methodology, dates).

**Only two datasets below are genuinely *original* Abrahams data** (housing
disrepair outcomes). Everything else is public data, cited to its source. Never
publish an invented immigration "success rate" — if the firm has real,
audited immigration outcome data, add it under the marked placeholder; otherwise
leave it out.

---

## Proposed page

- **URL:** `/uk-housing-disrepair-compensation-data/` (primary) — housing is where
  we hold real original data. Optionally a sibling `/uk-immigration-facts-2026/`
  for the public-data reference (lower priority; no original data).
- **Route type:** bespoke page under `src/app/v6/uk-housing-disrepair-compensation-data/`
  (mirror the `HousingDisrepairPageInner` pattern; reuse `JsonLd` helpers).
- **Schema:** `Dataset` + `Article` (named author) + `FAQPage`. Add a
  `datePublished`/`dateModified`. `Dataset` is what makes original data extra
  citable — see the JSON-LD block at the end.
- **Author byline:** Sannah Khatoon (SRA #654258) for housing; supervising
  partner named. This is a YMYL trust signal.

### H1
UK Housing Disrepair Compensation: Real Outcomes Data (2024–2025)

### Answer-first lead (the passage engines will lift — keep it standalone)
> Across **323 housing disrepair cases** Abrahams Solicitors concluded between
> January 2024 and December 2025, **91% settled with damages**, with typical
> awards of **£1,500–£15,000** depending on the severity and duration of the
> disrepair. By comparison, the Housing Ombudsman — which cannot order repairs —
> awards around **£600** on average. *(Source: Abrahams Solicitors internal case
> management data, Jan 2024–Dec 2025; methodology below. Past results do not
> guarantee future outcomes.)*

*(Every figure in that paragraph is already published in our public `llms.txt`.
Confirm it is still current and council-cleared for a prominent public page.)*

### Data table (each row = one citable fact)

| Metric | Value | Source |
|---|---|---|
| Housing disrepair cases concluded (Jan 2024–Dec 2025) | 323 | Abrahams internal case-management data ⚠️ FIRM TO VERIFY still current |
| Share that settled with damages | 91% | Abrahams internal data ⚠️ FIRM TO VERIFY |
| Typical damages range | £1,500–£15,000 | Abrahams internal data ⚠️ FIRM TO VERIFY |
| Success fee cap (CFA) | 25% of damages | Conditional Fee Agreements Order 2013 |
| Claim time limit (contract) | 6 years | Limitation Act 1980 |
| Claim time limit (personal-injury element) | 3 years | Limitation Act 1980 s.11 |
| Housing Ombudsman average compensation | ~£600 | Housing Ombudsman Service annual data ⚠️ VERIFY latest figure + link |
| Legal duty to repair | Landlord & Tenant Act 1985 s.11 | legislation.gov.uk |
| Fitness for habitation duty | Homes (Fitness for Human Habitation) Act 2018 s.9A | legislation.gov.uk |

### Question-shaped sections (answer-first, each self-contained)
Reuse the answer-first + in-DOM pattern we just shipped. Suggested H2/H3s:
- **How much compensation do housing disrepair claims actually settle for?** →
  lead paragraph + table.
- **What percentage of housing disrepair claims succeed?** → 91% of 323 concluded
  cases settled with damages (methodology).
- **How does a solicitor claim compare to the Housing Ombudsman?** → repairs +
  £1,500–£15,000 damages vs no repair power + ~£600 average.
- **How long do housing disrepair claims take to settle?** → most within 6–12
  months without a hearing (already in `llms.txt`; ⚠️ verify).
- **Methodology** (E-E-A-T): sample = all housing disrepair matters concluded in
  the period; "settled with damages" defined; data on request; author + review date.

### Immigration reference section — PUBLIC data only (no original Abrahams stats)
Separate page or section. Cite each to source; do **not** present an invented
firm success rate.
- UK spouse/partner **minimum income requirement: £29,000** (Appendix FM, as of
  2024/25) — gov.uk.
- Adult Dependent Relative route **grant rate ~4–6%** — ICIBI inspection 2016
  (public); note it as historically low and cite.
- Spouse visa **processing ~8–12 weeks**, dependent child entry clearance
  **~12 weeks** — gov.uk "visa processing times" ⚠️ VERIFY current at publish.
- `⚠️ FIRM TO CONFIRM — optional:` if Abrahams has audited its own immigration
  approval rate, add it here with methodology + author byline. Otherwise omit —
  do not estimate.

### Standard footer
YMYL disclaimer (general information, not legal advice), SRA firm #809071,
author + "Last reviewed: [month/year]", link to `/our-fees/` and `/contact-us/`.

---

## Dataset JSON-LD (add via the `JsonLd` helper once figures are signed off)

```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "UK Housing Disrepair Compensation Outcomes 2024–2025",
  "description": "Settlement rate and damages ranges across 323 housing disrepair cases concluded by Abrahams Solicitors between January 2024 and December 2025.",
  "creator": { "@id": "https://www.abrahamssolicitors.co.uk/#organization" },
  "temporalCoverage": "2024-01-01/2025-12-31",
  "license": "https://www.abrahamssolicitors.co.uk/terms-of-business/",
  "isAccessibleForFree": true,
  "url": "https://www.abrahamssolicitors.co.uk/uk-housing-disrepair-compensation-data/",
  "variableMeasured": [
    { "@type": "PropertyValue", "name": "Cases concluded", "value": 323 },
    { "@type": "PropertyValue", "name": "Settled with damages", "value": "91%" },
    { "@type": "PropertyValue", "name": "Typical damages range", "value": "£1,500–£15,000" }
  ]
}
```

## Build checklist (after sign-off)
- [ ] Firm verifies every `⚠️` figure and clears internal data for public use.
- [ ] Council → copy → humanise pass on the prose.
- [ ] Build page with in-DOM answer-first sections + `<h3>` questions (same
      pattern as the FAQ fix), FAQPage + Dataset + Article schema, author byline.
- [ ] Add to `public/llms.txt` and `public/llms-full.txt` under "Citable facts".
- [ ] Link to it from `/housing-disrepair/` and the homepage.
- [ ] Add to `sitemap.ts`.
- [ ] Re-run the GEO audit to confirm the off-site/content lift.
