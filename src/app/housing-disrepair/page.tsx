import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/service-page-template";
import { housingPage } from "@/lib/services-data";

export const metadata: Metadata = {
  title: housingPage.metaTitle,
  description: housingPage.metaDescription,
};

export default function HousingDisrepairPage() {
  return <ServicePageTemplate page={housingPage} />;
}
