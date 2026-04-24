// Migrates the 7 legacy blog posts from the live WordPress site into the
// PublishOS Redis-backed collection `abrahams_blog` so the new v6 /blog page
// lists them. Run once:
//
//   node scripts/migrate-blog.mjs
//
// Safe to re-run — existing records with the same slug are replaced, not duplicated.

import { randomUUID } from "node:crypto";

const API = "https://publishos-eosin.vercel.app/api/db/abrahams_blog";

const posts = [
  {
    slug: "rising-complaints-about-damp-mould",
    title: "Rising Complaints About Damp, Mould, and Unsafe Homes",
    excerpt: "Tenants across England are reporting damp and mould conditions in record numbers. Here's what you can claim.",
    author: "Abrahams Solicitors",
    category: "Housing Disrepair",
    published_at: "2025-06-30",
    liveUrl: "https://abrahamssolicitors.co.uk/rising-complaints-about-damp-mould/",
  },
  {
    slug: "upper-tribunal-safeguards-parents-akeju-ruling",
    title: "Upper Tribunal Strengthens Article 8 Protections for Parents of British Children",
    excerpt: "The Akeju ruling is a significant win for non-British parents with children born in the UK.",
    author: "Abrahams Solicitors",
    category: "Immigration Law",
    published_at: "2024-06-15",
    liveUrl: "https://abrahamssolicitors.co.uk/upper-tribunal-safeguards-rights-of-parents-to-british-children-in-landmark-akeju-ruling/",
  },
  {
    slug: "deportation-order-quashed-procedural-unfairness",
    title: "Deportation Order Quashed After Tribunal Finds Procedural Unfairness",
    excerpt: "Ignored medical evidence led to a deportation being overturned on procedural fairness grounds.",
    author: "Abrahams Solicitors",
    category: "Immigration Law",
    published_at: "2023-03-15",
    liveUrl: "https://abrahamssolicitors.co.uk/upper-tribunal-sets-precedent-on-procedural-fairness-overturns-deportation-for-ignored-medical-evidence/",
  },
  {
    slug: "94500-neurodiversity-discrimination-tribunal",
    title: "£94,500 Awarded in Neurodiversity Discrimination Tribunal",
    excerpt: "A landmark employment case: how an autistic employee proved disability discrimination.",
    author: "Abrahams Solicitors",
    category: "Employment Law",
    published_at: "2022-11-28",
    liveUrl: "https://abrahamssolicitors.co.uk/94500-awarded-in-neurodiversity-discrimination-tribunal/",
  },
  {
    slug: "high-court-orders-return-abducted-children",
    title: "High Court Orders Return of Abducted Children from Pakistan",
    excerpt: "International child abduction — how the 1980 Hague Convention worked in this case.",
    author: "Abrahams Solicitors",
    category: "Family Law",
    published_at: "2021-03-25",
    liveUrl: "https://abrahamssolicitors.co.uk/high-court-intervenes-in-international-child-abduction-orders-return-of-british-children-from-pakistan/",
  },
  {
    slug: "nhs-consultant-180000-defamation",
    title: "NHS Consultant Awarded £180,000 in Defamation Case",
    excerpt: "A senior NHS consultant wins substantial damages after online defamation campaign.",
    author: "Abrahams Solicitors",
    category: "Civil Litigation",
    published_at: "2019-02-18",
    liveUrl: "https://abrahamssolicitors.co.uk/senior-nhs-consultant-awarded-180000-in-high-stakes-defamation-battle/",
  },
  {
    slug: "joint-enterprise-conviction-jogee",
    title: "Joint Enterprise Conviction Overturned Following Jogee Guidance",
    excerpt: "How R v Jogee (2016) re-wrote the rules on secondary liability — and what it means for old convictions.",
    author: "Abrahams Solicitors",
    category: "Criminal Law",
    published_at: "2017-10-07",
    liveUrl: "https://abrahamssolicitors.co.uk/historic-joint-enterprise-conviction-quashed-in-wake-of-jogee-legal-revolution/",
  },
];

async function fetchBody(url) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 abrahams-migration" } });
    const html = await res.text();
    // Strip scripts/styles, pull the first <article> or main content block, tag-strip.
    const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) || html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    let body = articleMatch ? articleMatch[1] : "";
    body = body.replace(/<script[\s\S]*?<\/script>/gi, "");
    body = body.replace(/<style[\s\S]*?<\/style>/gi, "");
    body = body.replace(/<nav[\s\S]*?<\/nav>/gi, "");
    body = body.replace(/<aside[\s\S]*?<\/aside>/gi, "");
    body = body.replace(/<figure[\s\S]*?<\/figure>/gi, "");
    // Convert paragraphs to double newlines, strip remaining tags.
    body = body.replace(/<\/p>/gi, "\n\n").replace(/<br\s*\/?>/gi, "\n");
    body = body.replace(/<[^>]+>/g, "");
    body = body.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#8217;/g, "’").replace(/&#8216;/g, "‘").replace(/&#8220;/g, "“").replace(/&#8221;/g, "”").replace(/&#8211;/g, "–").replace(/&#8212;/g, "—");
    body = body.split("\n").map(l => l.trim()).filter(Boolean).join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
    return body || `Full article available at ${url}`;
  } catch (e) {
    return `Full article available at ${url}`;
  }
}

async function main() {
  console.log("Fetching existing abrahams_blog collection...");
  const existingRes = await fetch(API);
  const existing = existingRes.ok ? await existingRes.json() : [];
  console.log(`  Found ${existing.length} existing posts.`);

  const bySlug = new Map(existing.map(p => [p.slug, p]));

  for (const p of posts) {
    console.log(`Fetching ${p.liveUrl}...`);
    const content = await fetchBody(p.liveUrl);
    const existing = bySlug.get(p.slug);
    bySlug.set(p.slug, {
      id: existing?.id ?? randomUUID(),
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content,
      author: p.author,
      category: p.category,
      published_at: p.published_at,
      status: "published",
    });
  }

  const merged = [...bySlug.values()];
  console.log(`Posting ${merged.length} posts back...`);
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(merged),
  });
  console.log(res.ok ? "Done." : `Failed: ${res.status}`);
}

main();
