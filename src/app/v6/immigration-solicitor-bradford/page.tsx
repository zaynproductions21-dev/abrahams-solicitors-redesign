import type { Metadata } from "next";
import ImmigrationSolicitorBradfordPageInner from "./ImmigrationSolicitorBradfordPageInner";

export const metadata: Metadata = {
  title: "Immigration Solicitor Bradford — SRA Regulated, Fixed Fees | Abrahams",
  description:
    "Immigration solicitors in Bradford, West Yorkshire. SRA-regulated firm #809071. Direct solicitor access — no call centres. Fixed fees from £750. Bradford office open Mon–Fri. Free 30-min consultation.",
  alternates: {
    canonical: "https://www.abrahamssolicitors.co.uk/immigration-solicitor-bradford/",
  },
  openGraph: {
    title: "Immigration Solicitor Bradford — SRA Regulated | Abrahams",
    description:
      "Bradford-based immigration solicitors. Fixed fees, direct solicitor access. Spouse visas, ILR, citizenship, appeals. Bradford office: Listerhills Science Park, BD7 1HR.",
    url: "https://www.abrahamssolicitors.co.uk/immigration-solicitor-bradford/",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Immigration Solicitor Bradford | Abrahams Solicitors",
    description:
      "SRA-regulated immigration solicitors in Bradford. Fixed fees from £750. Free 30-min consultation. Call 0333 339 6004.",
  },
};

export default function ImmigrationSolicitorBradfordPage() {
  return <ImmigrationSolicitorBradfordPageInner />;
}
