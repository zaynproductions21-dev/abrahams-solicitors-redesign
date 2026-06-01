import type { MetadataRoute } from "next";
import { immigrationPages, personalInjuryPages } from "@/lib/services-data";

// Sitemap for the production site. URLs are served at the apex —
// the proxy rewrites clean paths to the /v6/* file tree internally,
// but the public URLs never expose the /v6 prefix.
const baseUrl = "https://www.abrahamssolicitors.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const p = (path: string) => `${baseUrl}${path}`;

  const staticPages: MetadataRoute.Sitemap = [
    { url: p("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: p("/about-us/"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: p("/contact-us/"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: p("/our-fees/"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: p("/free-consultation/"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: p("/uk-spouse-visa-from-us/"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: p("/faqs/"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: p("/blog/"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: p("/press-releases/"), lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: p("/newsletter/"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: p("/refer-a-friend/"), lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: p("/careers/"), lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: p("/privacy-policy/"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: p("/terms-of-business/"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: p("/website-legal-notice/"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: p("/cookie-policy/"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const immigrationRoutes: MetadataRoute.Sitemap = immigrationPages.map((page) => ({
    url: p(`/${page.slug}/`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: page.slug === "immigration" ? 0.9 : 0.7,
  }));

  const piRoutes: MetadataRoute.Sitemap = personalInjuryPages.map((page) => ({
    url: p(`/${page.slug}/`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: page.slug === "personal-injury" ? 0.9 : 0.7,
  }));

  // Bespoke standalone landing pages + wizards. These don't go through the
  // [slug] template (each has its own file in src/app/v6/*) and so don't
  // appear in immigrationPages from services-data.ts. Without explicit
  // sitemap entries, Google's crawl is slower and these pages miss the
  // "submitted by site owner" signal that helps with indexation latency.
  //
  // Add new bespoke pages here whenever a new wizard / calculator / LP
  // ships outside the [slug] template.
  const bespokeRoutes: MetadataRoute.Sitemap = [
    { url: p("/emergency-immigration-solicitor/"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: p("/emergency-immigration-faq/"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: p("/adequate-maintenance-calculator/"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: p("/flr-visa-extension/"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: p("/skilled-worker-wizard/"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: p("/ilr-wizard/"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: p("/citizenship-wizard/"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: p("/visa-wizard/"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: p("/visit-visa-refusal/"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: p("/housing-disrepair/"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  return [...staticPages, ...immigrationRoutes, ...piRoutes, ...bespokeRoutes];
}
