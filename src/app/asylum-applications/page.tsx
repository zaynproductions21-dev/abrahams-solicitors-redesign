import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/service-page-template";
import { immigrationPages } from "@/lib/services-data";

const page = immigrationPages.find((p) => p.slug === "asylum-applications")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
};

export default function AsylumApplicationsPage() {
  return <ServicePageTemplate page={page} />;
}
