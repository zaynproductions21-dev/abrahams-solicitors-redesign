import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/service-page-template";
import { immigrationPages } from "@/lib/services-data";

const page = immigrationPages.find((p) => p.slug === "uk-dependent-parent-visa")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
};

export default function UkDependentParentVisaPage() {
  return <ServicePageTemplate page={page} />;
}
