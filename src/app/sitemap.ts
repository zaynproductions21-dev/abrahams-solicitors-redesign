import type { MetadataRoute } from "next";
import { immigrationPages, personalInjuryPages } from "@/lib/services-data";

// Sitemap targets the v6 redesign. Swap the `baseUrl` once the production
// domain points at Vercel and drop the `/v6` prefix (or move v6 pages to `/`).
const baseUrl = "https://abrahams-redesign-zayn-productions.vercel.app";
const PREFIX = "/v6";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const p = (path: string) => `${baseUrl}${PREFIX}${path}`;

  const staticPages: MetadataRoute.Sitemap = [
    { url: p("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: p("/about-us/"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: p("/contact-us/"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: p("/our-fees/"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: p("/free-consultation/"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
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

  return [...staticPages, ...immigrationRoutes, ...piRoutes];
}
