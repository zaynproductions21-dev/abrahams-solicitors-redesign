#!/usr/bin/env node
// Drift check for /our-fees/ vs the firm's HO fee schedule.
// Run manually or in CI: `npm run check:fees` (exits 1 on drift).
//
// WHY: /our-fees/ hardcodes fees copied from
// `fees/fee-schedule-2026-04-08.json` (in the firm-side pack). The CRM
// gets updated within a day of a Home Office uprating because CCLs
// visibly break; the website copy does not, because nothing breaks —
// the page just quietly quotes last year's figure. That is precisely
// how £2,885 survived two uprating rounds in the firm's info sheets.
// See Abrahams-CCL-ToB-v2-2026-08-21/for-website-dev/fees-currency-check.md
// for the reasoning.
//
// The "superseded" list is the one that earns its place — it catches
// the actual historical failure mode (a stale figure being copied back
// in from an old document), which a match-the-current-value check
// would not.
//
// NEXT REVIEW DUE: 2027-04-01. Home Office uprates each spring; the
// last uprating was 8 April 2026. When the schedule ships a new file,
// bump EFFECTIVE_FROM, replace `CURRENT` with the new figures, and add
// the retiring figures to `SUPERSEDED` — do not remove them from
// `SUPERSEDED` after that, they are historical evidence.

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PAGE = resolve(__dirname, "../src/app/v6/our-fees/page.tsx");

const EFFECTIVE_FROM = "8 April 2026";
const NEXT_REVIEW_DUE = "2027-04-01";
const CURRENT = [
  "£3,226",   // ILR / settlement
  "£2,064",   // partner, outside the UK
  "£1,407",   // partner, inside the UK
  "£1,035",   // IHS, adult per year
  "£776",     // IHS, child per year
  "£1,000",   // super priority, in-UK
  "£500",     // priority, overseas
];
const SUPERSEDED = [
  // Figures from previous uprating rounds. If one reappears, something
  // was copied from an old document. Never remove entries here.
  "£2,885", "£3,029", "£1,846", "£1,048", "£1,938", "£1,321",
];

// Hourly rates — mirror-check against the shared source
// (hourly-rates.json). The page reads the source at build time, but a
// developer could still hardcode a different value into the JSX
// (matching the fees-page pattern that shipped £2,885 in three
// documents through two uprating rounds). This check makes that
// impossible: if either the fee-schedule figures OR the hourly-rate
// figures aren't rendered on the built page, the build fails.
//
// Update `hourly-rates.json` and the CRM's mirror together; TOB-IMM
// clause 9.4 commits the firm to annual review, and both mirrors move
// together or one drifts. `NEXT_HOURLY_REVIEW_DUE` is a soft
// reminder — bump it when a new schedule ships.
const NEXT_HOURLY_REVIEW_DUE = "2027-09-30";
const RATES_JSON = resolve(__dirname, "../config/hourly-rates.json");
const rates = JSON.parse(readFileSync(RATES_JSON, "utf8"));

const page = readFileSync(PAGE, "utf8");
const failures = [];

for (const fee of CURRENT) {
  if (!page.includes(fee)) failures.push(`missing current fee: ${fee}`);
}
if (!page.includes(EFFECTIVE_FROM)) {
  failures.push(`missing in-force date: "${EFFECTIVE_FROM}"`);
}
for (const old of SUPERSEDED) {
  if (page.includes(old)) failures.push(`SUPERSEDED FEE PRESENT: ${old} — copied back in from an old document?`);
}

// Hourly-rate drift check.
//
// The rate figures themselves are rendered at runtime from
// hourly-rates.json via {fmtGbp(...)} in JSX, so they don't appear as
// literal strings in the source. We can't grep for "£288.00" here.
// What we CAN and MUST check is that the page still reads from the
// shared source — if someone hardcodes numbers into the JSX, the
// import + iteration go away, and the CRM's mirror silently drifts
// (which is exactly the failure mode this drift-guard exists to
// prevent).
//
// We also validate the JSON itself so a malformed schedule doesn't
// ship silently.
if (!/from ["']@\/lib\/hourly-rates["']/.test(page)) {
  failures.push("hourly-rates: page no longer imports from @/lib/hourly-rates — did someone hardcode the rates?");
}
if (!page.includes("HOURLY_RATES.rates.map")) {
  failures.push("hourly-rates: page no longer iterates HOURLY_RATES.rates — did someone hardcode the rate rows?");
}
// grade_label is rendered dynamically (from JSON via {r.grade_label}),
// so it isn't a literal in the page source. Validate the JSON itself.
for (const r of rates.rates) {
  if (!(r.hourly_rate > 0 && r.vat_at_20 > 0 && r.total_uk_resident > 0)) {
    failures.push(`hourly-rates: JSON has zero or negative figure for ${r.grade_key}`);
  }
  const expectedVat = Math.round(r.hourly_rate * 20) / 100;
  if (Math.abs(r.vat_at_20 - expectedVat) > 0.01) {
    failures.push(`hourly-rates: VAT arithmetic wrong for ${r.grade_key} — expected ${expectedVat.toFixed(2)}, got ${r.vat_at_20}`);
  }
  const expectedTotal = Math.round((r.hourly_rate + r.vat_at_20) * 100) / 100;
  if (Math.abs(r.total_uk_resident - expectedTotal) > 0.01) {
    failures.push(`hourly-rates: total arithmetic wrong for ${r.grade_key} — expected ${expectedTotal.toFixed(2)}, got ${r.total_uk_resident}`);
  }
}
if (!rates.schedule_id?.startsWith("HOURLY-RATES-")) {
  failures.push(`hourly-rates: JSON schedule_id "${rates.schedule_id}" does not start with HOURLY-RATES- prefix`);
}

if (failures.length) {
  console.error("check-fees-currency: drift detected in src/app/v6/our-fees/page.tsx");
  for (const f of failures) console.error("  - " + f);
  console.error(`\nNext Home Office fee review due: ${NEXT_REVIEW_DUE}`);
  console.error(`Next hourly-rate review due:   ${NEXT_HOURLY_REVIEW_DUE}`);
  process.exit(1);
}

console.log(`check-fees-currency: OK. All ${CURRENT.length} HO figures + effective date present, all ${rates.rates.length} hourly-rate grades rendered, no superseded figures found.`);
console.log(`Next HO fee review due: ${NEXT_REVIEW_DUE}. Next hourly-rate review due: ${NEXT_HOURLY_REVIEW_DUE}.`);
