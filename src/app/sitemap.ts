import type { MetadataRoute } from "next";
import { immigrationPages, personalInjuryPages } from "@/lib/services-data";
import { teamMembers } from "@/lib/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://abrahamssolicitors.co.uk";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about-us/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact-us/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/our-fees/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/housing-disrepair/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/refer-a-friend/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/careers/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/privacy-policy/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-of-business/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/website-legal-notice/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/cookie-policy/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const immigrationRoutes: MetadataRoute.Sitemap = immigrationPages.map((page) => ({
    url: `${baseUrl}/${page.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: page.slug === "immigration" ? 0.9 : 0.7,
  }));

  const piRoutes: MetadataRoute.Sitemap = personalInjuryPages.map((page) => ({
    url: `${baseUrl}/${page.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: page.slug === "personal-injury" ? 0.9 : 0.7,
  }));

  const teamRoutes: MetadataRoute.Sitemap = teamMembers.map((member) => ({
    url: `${baseUrl}/our-team/${member.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...immigrationRoutes, ...piRoutes, ...teamRoutes];
}
