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

if (failures.length) {
  console.error("check-fees-currency: drift detected in src/app/v6/our-fees/page.tsx");
  for (const f of failures) console.error("  - " + f);
  console.error(`\nNext scheduled review of Home Office fee schedule: ${NEXT_REVIEW_DUE}`);
  process.exit(1);
}

console.log(`check-fees-currency: OK. All ${CURRENT.length} figures + effective date present, no superseded figures found.`);
console.log(`Next Home Office fee schedule review due: ${NEXT_REVIEW_DUE}.`);
