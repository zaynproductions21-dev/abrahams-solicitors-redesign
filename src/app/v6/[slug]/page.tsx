/**
 * /v6/[slug]/ — server shell for the 22 KV-synced service pages.
 *
 * Why this file exists at all: the whole route used to BE the client
 * component below ("use client" + useParams). A client component cannot
 * export metadata in the App Router, so all 19 service URLs served by this
 * route inherited the root layout's metadata — including
 * `alternates: { canonical: "/" }`. Live, that meant /british-citizenship-
 * solicitors/, /sponsor-licence-applications/, /visa-refusal-appeal/,
 * /asylum-applications/, /uk-fiance-visa/ and the rest all returned 200
 * while emitting the homepage's <title>, the homepage's description and
 * <link rel="canonical" href="https://abrahamssolicitors.co.uk/"> — each
 * page telling Google it was a duplicate of the homepage and should be
 * discarded. The only commercial pages with correct self-canonicals were
 * the bespoke file-tree ones (/uk-spouse-visa/, /housing-disrepair/), and
 * those are precisely the two that rank.
 *
 * metaTitle and metaDescription already existed for every record in
 * services-data.ts (KV-synced) — they were simply never emitted. So this
 * shell adds no new copy: it renders data that was already there.
 *
 * Keep this file a Server Component. All interactivity lives in
 * ServicePageInner.tsx.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageInner from "./ServicePageInner";
import {
  getServicePage, immigrationPages, housingPages, locationPages, personalInjuryPages,
} from "@/lib/services-data";

const BASE_URL = "https://www.abrahamssolicitors.co.uk";

/** Prerender every allowlisted service slug. */
export function generateStaticParams() {
  return [...immigrationPages, ...housingPages, ...locationPages, ...personalInjuryPages]
    .map(p => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return { title: "Page not found" };

  const url = `${BASE_URL}/${slug}/`;
  return {
    // `absolute` bypasses the root layout's "%s | Abrahams Solicitors"
    // template. The authored metaTitles are already 52–67 characters, so
    // appending the 22-character brand suffix would push every one of them
    // past the length Google renders.
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      type: "website",
      locale: "en_GB",
      siteName: "Abrahams Solicitors",
    },
    twitter: {
      card: "summary",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function V6ServicePage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!getServicePage(slug)) notFound();
  return <ServicePageInner slug={slug} />;
}
