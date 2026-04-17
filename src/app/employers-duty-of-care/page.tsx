import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/service-page-template";
import { personalInjuryPages } from "@/lib/services-data";

const page = personalInjuryPages.find((p) => p.slug === "employers-duty-of-care")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
};

export default function EmployersDutyOfCarePage() {
  return <ServicePageTemplate page={page} />;
}
