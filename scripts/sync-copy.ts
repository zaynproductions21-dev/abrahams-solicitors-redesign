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

  // ── Auto-generate navigation.ts from pages with copy ──
  console.log("\nGenerating navigation.ts from pages with copy...");

  const immigrationChildren = immigrationPages.map((p: any) => ({
    label: cleanTitle(p.title),
    href: `/${p.slug}/`,
  }));

  const housingChildren = housingPages.map((p: any) => ({
    label: cleanTitle(p.title),
    href: `/${p.slug}/`,
  }));

  const locationChildren = locationPages.map((p: any) => ({
    label: cleanTitle(p.title),
    href: `/${p.slug}/`,
  }));

  const navLines = [
    `// Auto-generated from PublishOS page copy — last sync: ${new Date().toISOString()}`,
    `// Run: npx tsx scripts/sync-copy.ts`,
    ``,
    `export type NavItem = {`,
    `  label: string;`,
    `  href: string;`,
    `  children?: NavItem[];`,
    `};`,
    ``,
    `export const navigation: NavItem[] = [`,
    `  { label: "Home", href: "/" },`,
    `  {`,
    `    label: "Immigration Law",`,
    `    href: "/immigration/",`,
    `    children: ${JSON.stringify(immigrationChildren, null, 6).split("\n").map((l, i) => i === 0 ? l : "    " + l).join("\n")},`,
    `  },`,
  ];

  if (housingChildren.length > 0) {
    navLines.push(`  {`);
    navLines.push(`    label: "Housing Law",`);
    navLines.push(`    href: "/${housingPages[0]?.slug || "housing-disrepair"}/",`);
    navLines.push(`    children: ${JSON.stringify(housingChildren, null, 6).split("\n").map((l, i) => i === 0 ? l : "    " + l).join("\n")},`);
    navLines.push(`  },`);
  }

  navLines.push(`  { label: "About Us", href: "/about-us/" },`);
  navLines.push(`  { label: "Our Fees", href: "/our-fees/" },`);
  navLines.push(`  { label: "Contact", href: "/contact-us/" },`);
  navLines.push(`];`);
  navLines.push(``);

  // Preserve team members from existing navigation.ts
  const existingNav = fs.existsSync("src/lib/navigation.ts") ? fs.readFileSync("src/lib/navigation.ts", "utf8") : "";
  const teamMembersMatch = existingNav.match(/export const teamMembers[\s\S]*$/);
  if (teamMembersMatch) {
    navLines.push(teamMembersMatch[0]);
  }

  fs.writeFileSync("src/lib/navigation.ts", navLines.join("\n"));
  console.log(`Written src/lib/navigation.ts with ${immigrationChildren.length} immigration + ${housingChildren.length} housing + ${locationChildren.length} location nav items`);
}

function cleanTitle(t: string): string {
  return t.replace(/^(### \d+\.\s*)/i, "").replace(/`[^`]*`/, "").trim();
}

main().catch(console.error);
