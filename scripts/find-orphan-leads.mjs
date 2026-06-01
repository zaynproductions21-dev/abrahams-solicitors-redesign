#!/usr/bin/env node
/**
 * One-time orphan-lead finder.
 *
 * What this does
 * --------------
 * 1. Pulls the PublishOS backup mirror (both `abrahams_enquiries` and
 *    `abrahams_housing_enquiries` collections).
 * 2. Reads a SalesHub Cloud CSV export from a path you pass in.
 * 3. Diffs by normalised email (lowercase, trimmed) and reports every
 *    mirror row whose email DOES NOT appear in the SalesHub export.
 *
 * Those rows are "orphans" — leads that hit /api/lead and were captured
 * to the mirror, but never made it into your CRM. Caused by the same
 * silent-failure mode as the Daniel Moreschi incident on 2026-06-01.
 *
 * What you do first
 * -----------------
 *   1. Open SalesHub Cloud → Leads (or Enquiries).
 *   2. Export everything as CSV. Use the broadest filter you can — "All
 *      time, all sources, all stages" — so the comparison set is the
 *      full population of leads SalesHub ever received.
 *   3. Save the file somewhere local — default below assumes:
 *        ~/Downloads/saleshub-leads-export.csv
 *
 * What you run
 * ------------
 *   node scripts/find-orphan-leads.mjs
 *
 * Or with an explicit path:
 *   node scripts/find-orphan-leads.mjs ~/Downloads/saleshub-leads-export.csv
 *
 * Output
 * ------
 *   - Counts of mirror rows, SalesHub rows, and orphans
 *   - A CSV of orphans saved next to the input file:
 *       ~/Downloads/abrahams-orphan-leads-YYYY-MM-DD.csv
 *   - A printed table of the first 20 orphans for quick eyeballing
 *
 * Notes
 * -----
 * Email is the join key. If SalesHub has a lead under a different email
 * than the one the visitor entered (typos, alternate addresses), the
 * diff will flag it as an orphan even though it really isn't. Spot-check
 * before acting on the output.
 */

import { readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";

const MIRROR_IMMIGRATION_URL = "https://publishos-eosin.vercel.app/api/db/abrahams_enquiries";
const MIRROR_HOUSING_URL = "https://publishos-eosin.vercel.app/api/db/abrahams_housing_enquiries";

const DEFAULT_SALESHUB_CSV = path.join(homedir(), "Downloads", "saleshub-leads-export.csv");

function normaliseEmail(s) {
  return (s ?? "").toString().trim().toLowerCase();
}

/** Minimal RFC-4180 CSV parser: handles quoted fields, escaped quotes, commas inside fields. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ",") {
        row.push(field);
        field = "";
      } else if (c === "\n") {
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else if (c === "\r") {
        // skip — handled by \n
      } else {
        field += c;
      }
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

async function fetchMirror(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) return [];
  return data;
}

function extractEmailColumn(header) {
  const lower = header.map((h) => h.toLowerCase().trim());
  const candidates = ["email", "email address", "e-mail", "lead email", "primary email", "contact email"];
  for (const c of candidates) {
    const idx = lower.indexOf(c);
    if (idx >= 0) return idx;
  }
  // Fallback: any column with "email" in the name
  return lower.findIndex((h) => h.includes("email"));
}

async function main() {
  const csvPath = process.argv[2] || DEFAULT_SALESHUB_CSV;
  console.log(`\nReading SalesHub export from: ${csvPath}`);

  let csvText;
  try {
    csvText = await readFile(csvPath, "utf8");
  } catch (e) {
    console.error(`\n❌ Could not read SalesHub CSV at ${csvPath}`);
    console.error(`   Export your SalesHub leads to that path (or pass a path as the first arg).`);
    console.error(`   See the top of this script for the exact steps.\n`);
    console.error(`   Error: ${e.message}`);
    process.exit(1);
  }

  const rows = parseCsv(csvText).filter((r) => r.some((c) => c.trim() !== ""));
  if (rows.length < 2) {
    console.error(`\n❌ SalesHub CSV at ${csvPath} has no data rows (only a header or empty).\n`);
    process.exit(1);
  }
  const header = rows[0];
  const emailColIdx = extractEmailColumn(header);
  if (emailColIdx < 0) {
    console.error(`\n❌ Could not find an 'Email' column in the SalesHub CSV.`);
    console.error(`   Columns found: ${header.join(", ")}\n`);
    process.exit(1);
  }
  console.log(`   Detected email column: "${header[emailColIdx]}" (index ${emailColIdx})`);

  const saleshubEmails = new Set();
  for (let i = 1; i < rows.length; i++) {
    const email = normaliseEmail(rows[i][emailColIdx]);
    if (email) saleshubEmails.add(email);
  }
  console.log(`   SalesHub emails found: ${saleshubEmails.size}`);

  console.log(`\nFetching PublishOS mirror collections…`);
  const [imm, hou] = await Promise.all([
    fetchMirror(MIRROR_IMMIGRATION_URL),
    fetchMirror(MIRROR_HOUSING_URL),
  ]);
  console.log(`   abrahams_enquiries (immigration):       ${imm.length}`);
  console.log(`   abrahams_housing_enquiries (housing):   ${hou.length}`);

  const all = [
    ...imm.map((r) => ({ ...r, _collection: "immigration" })),
    ...hou.map((r) => ({ ...r, _collection: "housing" })),
  ];

  // Skip obvious test rows so the orphan list is signal-only.
  const testPatterns = [
    /test/i,
    /example\.com$/,
    /smoke/i,
    /diagnostic/i,
    /probe/i,
    /^mok123@/i,
    /^mokdivert@/i,
    /icallmarketing2020/i,
  ];
  const isTest = (r) => {
    const blob = JSON.stringify(r).toLowerCase();
    return testPatterns.some((p) => p.test(r.email || "") || p.test(blob));
  };

  const real = all.filter((r) => r.email && !isTest(r));
  const orphans = real.filter((r) => !saleshubEmails.has(normaliseEmail(r.email)));

  console.log(`\nDiff:`);
  console.log(`   Mirror rows (excluding tests):  ${real.length}`);
  console.log(`   Mirror emails matched in SalesHub: ${real.length - orphans.length}`);
  console.log(`   ORPHANS (in mirror, not in SalesHub): ${orphans.length}\n`);

  if (orphans.length === 0) {
    console.log(`✅ Zero orphans found. Every real lead in the mirror has a matching SalesHub record.\n`);
    return;
  }

  // Sort newest first so the recently-lost leads are the easiest to triage.
  orphans.sort((a, b) => (b.submitted_at || "").localeCompare(a.submitted_at || ""));

  // Pretty-print first 20 to console
  console.log(`First ${Math.min(20, orphans.length)} orphans (newest first):\n`);
  const padR = (s, n) => String(s ?? "").slice(0, n).padEnd(n);
  console.log(
    `  ${padR("submitted_at", 25)} ${padR("name", 24)} ${padR("email", 36)} ${padR("source", 22)}`,
  );
  console.log(`  ${"-".repeat(110)}`);
  for (const r of orphans.slice(0, 20)) {
    const name = [r.firstName, r.lastName].filter(Boolean).join(" ") || r.name || "";
    console.log(
      `  ${padR(r.submitted_at, 25)} ${padR(name, 24)} ${padR(r.email, 36)} ${padR(r.source, 22)}`,
    );
  }
  if (orphans.length > 20) {
    console.log(`\n  …and ${orphans.length - 20} more. Full list in the CSV below.`);
  }

  // Write a CSV of orphans
  const dateStr = new Date().toISOString().slice(0, 10);
  const outPath = path.join(homedir(), "Downloads", `abrahams-orphan-leads-${dateStr}.csv`);
  const esc = (v) => {
    const s = (v ?? "").toString().replace(/\r?\n/g, " ");
    return s.includes(",") || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csvLines = ["submitted_at,collection,mirror_id,email,phone,name,source,serviceLine,pageUrl,saleshub_synced,saleshub_status,saleshub_error"];
  for (const r of orphans) {
    const name = [r.firstName, r.lastName].filter(Boolean).join(" ") || r.name || "";
    csvLines.push([
      esc(r.submitted_at),
      esc(r._collection),
      esc(r.id),
      esc(r.email),
      esc(r.phone),
      esc(name),
      esc(r.source),
      esc(r.serviceLine || r.service),
      esc(r.pageUrl),
      esc(r.saleshub_synced),
      esc(r.saleshub_status),
      esc(r.saleshub_error),
    ].join(","));
  }
  await writeFile(outPath, csvLines.join("\n"));
  console.log(`\n📄 Full orphan list written to: ${outPath}`);

  console.log(`\nNext steps:`);
  console.log(`  • Open the CSV and verify the orphans aren't false-positives (typos, alternate emails).`);
  console.log(`  • For each genuine orphan, replay via /api/lead with source="<prev>-recovery" or paste into SalesHub manually.`);
  console.log(`  • From today onwards, every new mirror row carries a saleshub_synced flag — orphans become trivial to detect.\n`);
}

main().catch((e) => {
  console.error(`\n❌ Fatal: ${e.message}\n`);
  process.exit(1);
});
