// Shared source of truth for the firm's hourly rates.
//
// The RAW figures live in `config/hourly-rates.json` — the same path
// the CRM uses. Both repos are mirrors; a coordinated commit touching
// `config/hourly-rates.json` in each is unambiguously the annual
// review under TOB-IMM clause 9.4. Both consumers import the JSON;
// neither hardcodes the numbers, because two hardcoded copies would
// drift and the one that drifts is the one nobody looks at (the
// DocsCheck ILR-fee incident the firm cites).
//
// The CRM side has an equivalent validator at `shared/hourly-rates.ts`
// (see the CRM Claude's implementation); this file plays the same
// role on the website.
//
// When the firm revises rates:
//   1. File a NEW schedule_id at the top of config/hourly-rates.json
//      (do not edit the existing one — CCLs enclose a specific
//      schedule and must remain bound to what they enclosed).
//   2. Land the identical change in BOTH repos in the same review
//      window — the CRM's config/hourly-rates.json + this repo's
//      config/hourly-rates.json. Diff the two after the update to
//      prove there is no residual delta.
//   3. Run `npm run check:fees` on this repo to prove /our-fees/
//      still renders the shared source (import + iteration checks)
//      and the arithmetic is right.

import raw from "../../config/hourly-rates.json";

export type HourlyRateRow = {
  grade_key: "solicitor_over_8" | "solicitor_over_4" | "paralegal_caseworker";
  grade_label: string;
  hourly_rate: number;
  vat_at_20: number;
  total_uk_resident: number;
};

export type HourlyRateSchedule = {
  schedule_id: string;
  version: string;
  effective_from: string;
  next_review_due: string;
  unit_of_time_recording: string;
  rates: HourlyRateRow[];
};

export const HOURLY_RATES = raw as HourlyRateSchedule;

// Format helpers so the page renders "£288.00" / "£57.60" consistently.
export function fmtGbp(n: number): string {
  return "£" + n.toFixed(2);
}
