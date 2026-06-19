import type { Metadata } from "next";
import ImmigrationSolicitorEssexPageInner from "./ImmigrationSolicitorEssexPageInner";

export const metadata: Metadata = {
  title: "Immigration Solicitor Essex — SRA Regulated, Fixed Fees | Abrahams",
  description:
    "Immigration solicitors serving Essex. SRA-regulated firm #809071. Direct solicitor access — no call centres. Fixed fees from £750. London office. Free 30-min consultation.",
  alternates: {
    canonical: "https://www.abrahamssolicitors.co.uk/immigration-solicitor-essex/",
  },
  openGraph: {
    title: "Immigration Solicitor Essex — SRA Regulated | Abrahams",
    description:
      "Essex immigration solicitors. Fixed fees, direct solicitor access. Spouse visas, ILR, citizenship, appeals. London office: Suite 10, Atlas House, 1 King Street, EC2V 8AU.",
    url: "https://www.abrahamssolicitors.co.uk/immigration-solicitor-essex/",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Immigration Solicitor Essex | Abrahams Solicitors",
    description:
      "SRA-regulated immigration solicitors serving Essex. Fixed fees from £750. Free 30-min consultation. Call 0333 339 6004.",
  },
};

export default function ImmigrationSolicitorEssexPage() {
  return <ImmigrationSolicitorEssexPageInner />;
}
