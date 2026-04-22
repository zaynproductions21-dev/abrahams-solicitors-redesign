import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/service-page-template";
import { getServicePage } from "@/lib/services-data";

const page = getServicePage("accidents-at-work")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
};

export default function Page() {
  return <ServicePageTemplate page={page} />;
}
