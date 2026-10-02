#!/usr/bin/env npx tsx
/**
 * Sync page copy from PublishOS KV into services-data.ts
 *
 * Usage: npx tsx scripts/sync-copy.ts
 *
 * This fetches the generated + humanised copy from PublishOS
 * and writes it into src/lib/services-data.ts so the site
 * renders the latest copy without API calls at runtime.
 *
 * Run this after generating/updating copy in PublishOS.
 */

const CLIENT_ID = "cl_mnxclw6q";
const API_BASE = "https://publishos-eosin.vercel.app";

async function main() {
  console.log("Fetching page copy from PublishOS...");
  const res = await fetch(`${API_BASE}/api/page-copy?clientId=${CLIENT_ID}`);
  const data = await res.json();
  const pages = data.pages || [];
  console.log(`Found ${pages.length} pages`);

  // Filter to service/landing pages only (not homepage, about, fees, contact)
  const staticPages = ["homepage", "about-us", "our-fees", "contact-us"];
  const servicePages = pages.filter((p: any) => !staticPages.includes(p.slug));

  // Also keep the team members from existing file
  const fs = require("fs");
  const existingFile = fs.existsSync("src/lib/services-data.ts") ? fs.readFileSync("src/lib/services-data.ts", "utf8") : "";
  const teamMatch = existingFile.match(/export const teamMembers[\s\S]*$/);
  const teamBlock = teamMatch ? teamMatch[0] : "";

  // Preserve the hand-maintained statutory metadata block (DEFAULT_LAST_REVIEWED
  // + SERVICE_METADATA — author bylines and GOV.UK/legislation links). It is not
  // sourced from KV, so without re-injecting it here every sync would strip it
  // and break the `src/app/v6/[slug]/page.tsx` import.
  const metaMatch = existingFile.match(/\/\*\* Default last-reviewed[\s\S]*?\n};\n/);
  const metaBlock = metaMatch ? metaMatch[0] : "";

  // Build the new file
  const lines: string[] = [
    `// Auto-generated from PublishOS page copy — last sync: ${new Date().toISOString()}`,
    `// Run: npx tsx scripts/sync-copy.ts`,
    ``,
    `export interface ServicePage {`,
    `  slug: string;`,
    `  title: string;`,
    `  metaTitle: string;`,
    `  metaDescription: string;`,
    `  heroTitle: string;`,
    `  heroDescription: string;`,
    `  badge?: string;`,
    `  sections: {`,
    `    title: string;`,
    `    content: string;`,
    `    items?: string[];`,
    `  }[];`,
    `  faqs?: { question: string; answer: string }[];`,
    `  parentService?: string;`,
    `  parentHref?: string;`,
    `}`,
    ``,
  ];

  // Group pages by type
  const immigrationPages: any[] = [];
  const housingPages: any[] = [];
  const locationPages: any[] = [];
  const otherPages: any[] = [];

  for (const p of servicePages) {
    const isLocation = /solicitors-(bradford|manchester|london|leeds|birmingham)/i.test(p.slug);
    const isHousing = /housing|disrepair/i.test(p.slug);
    const isImmigration = /visa|immigration|citizenship|ilr|sponsor|asylum|settlement|appeal/i.test(p.slug);

    const page = {
      slug: p.slug,
      title: cleanTitle(p.title),
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      heroTitle: p.h1,
      heroDescription: p.sections?.[0]?.body?.split("\n")[0]?.trim() || p.metaDescription,
      badge: isHousing ? "Housing Law" : isImmigration ? "Immigration Law" : isLocation ? "Local Office" : "",
      sections: (p.sections || []).slice(1).map((s: any) => ({
        title: s.heading,
        content: s.body,
      })),
      faqs: p.faq || [],
      parentService: isHousing ? "Housing Law" : isImmigration || isLocation ? "Immigration Law" : "",
      parentHref: isHousing ? "/housing-disrepair/" : isImmigration || isLocation ? "/immigration/" : "",
    };

    if (isLocation) locationPages.push(page);
    else if (isHousing) housingPages.push(page);
    else if (isImmigration) immigrationPages.push(page);
    else otherPages.push(page);
  }

  if (metaBlock) lines.push(metaBlock);
  lines.push(`export const immigrationPages: ServicePage[] = ${JSON.stringify(immigrationPages, null, 2)};`);
  lines.push(``);
  lines.push(`export const housingPages: ServicePage[] = ${JSON.stringify(housingPages, null, 2)};`);
  lines.push(`export const housingPage = housingPages[0] || { slug: "housing-disrepair", title: "Housing Disrepair", metaTitle: "", metaDescription: "", heroTitle: "", heroDescription: "", sections: [], faqs: [] };`);
  lines.push(``);
  lines.push(`export const locationPages: ServicePage[] = ${JSON.stringify(locationPages, null, 2)};`);
  lines.push(``);
  if (otherPages.length) {
    lines.push(`export const otherPages: ServicePage[] = ${JSON.stringify(otherPages, null, 2)};`);
    lines.push(``);
  }
  lines.push(`export const personalInjuryPages: ServicePage[] = [];`);
  lines.push(``);
  lines.push(`export function getServicePage(slug: string): ServicePage {`);
  lines.push(`  const found = [...immigrationPages, ...housingPages, ...locationPages${otherPages.length ? ", ...otherPages" : ""}, ...personalInjuryPages].find(p => p.slug === slug);`);
  lines.push(`  if (found) return found;`);
  lines.push(`  const title = slug.replace(/-/g, " ").replace(/\\b\\w/g, c => c.toUpperCase());`);
  lines.push(`  return { slug, title, metaTitle: title + " | Abrahams Solicitors", metaDescription: "Expert legal advice from Abrahams Solicitors. Fixed fees, direct solicitor access.", heroTitle: title, heroDescription: "Contact Abrahams Solicitors for expert legal advice.", badge: "Legal Services", sections: [{ title: "About This Service", content: "Please contact us to discuss your case. We offer a free initial consultation with no obligation." }], faqs: [] };`);
  lines.push(`}`);
  lines.push(``);

  // Add team members back
  if (teamBlock) {
    lines.push(teamBlock);
  }

  const output = lines.join("\n");
  fs.writeFileSync("src/lib/services-data.ts", output);
  console.log(`Written src/lib/services-data.ts with ${servicePages.length} service pages`);
  console.log(`  Immigration: ${immigrationPages.length}`);
  console.log(`  Housing: ${housingPages.length}`);
  console.log(`  Location: ${locationPages.length}`);
  console.log(`  Other: ${otherPages.length}`);

  // ── Navigation: REPORT ONLY, never overwrite ───────────────────────────
  //
  // This script used to regenerate src/lib/navigation.ts from KV. It must not:
  // the nav is a hand-curated information architecture and KV cannot describe
  // it. Three ways the generated version was worse than the file it replaced:
  //
  //  1. Labels came from each record's `title`, which is UPPERCASE in KV, so
  //     the dropdown rendered as "BRITISH CITIZENSHIP SOLICITORS" and
  //     "INDEFINITE LEAVE TO REMAIN" — losing both the Title Case convention
  //     and the "(ILR)" acronym.
  //  2. `locationChildren` was built and then never pushed into the output, so
  //     every location page silently dropped out of the nav while the closing
  //     log line still claimed it had written them.
  //  3. The bespoke city pages (/immigration-solicitor-bradford/ and the
  //     Essex/Manchester equivalents) and /immigration-solicitors/ have no KV
  //     record at all, so generation could only ever delete them.
  //
  // So: reconcile and report, and leave the editing to a human.
  console.log("\nNavigation (src/lib/navigation.ts) — report only, not rewritten:");
  const navSrc = fs.existsSync("src/lib/navigation.ts")
    ? fs.readFileSync("src/lib/navigation.ts", "utf8")
    : "";
  const navHrefs = new Set<string>(
    [...navSrc.matchAll(/href"?:\s*"([^"]+)"/g)].map((m: any) => m[1]),
  );
  const copySlugs: string[] = [...immigrationPages, ...housingPages, ...locationPages]
    .map((p: any) => `/${p.slug}/`);

  const missingFromNav = copySlugs.filter(h => !navHrefs.has(h));
  if (missingFromNav.length) {
    console.log("  Has copy but is not linked from the nav — consider adding:");
    for (const h of missingFromNav) console.log(`    + ${h}`);
  }
  const navWithoutCopy = [...navHrefs].filter(
    h => h.startsWith("/") && h !== "/" && !copySlugs.includes(h),
  );
  if (navWithoutCopy.length) {
    console.log("  In the nav with no KV copy record (bespoke pages — expected, listed to confirm):");
    for (const h of navWithoutCopy) console.log(`    \u00b7 ${h}`);
  }
  if (!missingFromNav.length && !navWithoutCopy.length) {
    console.log("  In sync — nothing to reconcile.");
  }
  console.log("  Edit src/lib/navigation.ts by hand. Title Case; UK, ILR and EU stay uppercase.");

}

function cleanTitle(t: string): string {
  return t.replace(/^(### \d+\.\s*)/i, "").replace(/`[^`]*`/, "").trim();
}

main().catch(console.error);
