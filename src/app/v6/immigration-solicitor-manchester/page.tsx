import type { Metadata } from "next";
import ImmigrationSolicitorManchesterPageInner from "./ImmigrationSolicitorManchesterPageInner";

export const metadata: Metadata = {
  title: "Immigration Solicitor Manchester — SRA Regulated, Fixed Fees | Abrahams",
  description:
    "Immigration solicitors serving Manchester and Greater Manchester. SRA-regulated firm #809071. Direct solicitor access — no call centres. Fixed fees from £750. Free 30-min consultation.",
  alternates: {
    canonical: "https://www.abrahamssolicitors.co.uk/immigration-solicitor-manchester/",
  },
  openGraph: {
    title: "Immigration Solicitor Manchester — SRA Regulated | Abrahams",
    description:
      "Immigration solicitors serving Manchester and Greater Manchester. Fixed fees, direct solicitor access. Spouse visas, ILR, citizenship, appeals. Bradford office: Listerhills Science Park, BD7 1HR.",
    url: "https://www.abrahamssolicitors.co.uk/immigration-solicitor-manchester/",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Immigration Solicitor Manchester | Abrahams Solicitors",
    description:
      "SRA-regulated immigration solicitors serving Manchester. Fixed fees from £750. Free 30-min consultation. Call 0333 339 6004.",
  },
};

export default function ImmigrationSolicitorManchesterPage() {
  return <ImmigrationSolicitorManchesterPageInner />;
}
