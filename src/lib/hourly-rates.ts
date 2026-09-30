// Shared source of truth for the firm's hourly rates.
//
// The RAW figures live in `hourly-rates.json` at the repo root, which is
// mirrored to the CRM at the same path. Both consumers must import the
// JSON, not hardcode the numbers — TOB-IMM clause 9.4 commits the firm
// to an annual review, and two hardcoded copies will drift, with the
// one that drifts being the one nobody looks at (per the DocsCheck
// fee-uprating incident the firm cites).
//
// When the firm revises rates:
//   1. File a NEW schedule_id at the top of hourly-rates.json (do not
//      edit the existing one — CCLs enclose a specific schedule and
//      must remain bound to what they enclosed).
//   2. Update BOTH mirrors — this file's JSON + the CRM's copy —
//      in the same review.
//   3. Run `npm run check:fees` to prove the /our-fees/ page renders
//      the new values.

import raw from "../../hourly-rates.json";

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
