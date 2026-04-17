import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/service-page-template";
import { personalInjuryPages } from "@/lib/services-data";

const page = personalInjuryPages.find((p) => p.slug === "slips-and-trips")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
};

export default function SlipsAndTripsPage() {
  return <ServicePageTemplate page={page} />;
}
