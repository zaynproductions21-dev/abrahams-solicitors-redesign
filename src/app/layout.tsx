import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Immigration & Housing Solicitors London | Abrahams Solicitors",
    template: "%s | Abrahams Solicitors",
  },
  description:
    "Expert immigration and housing law solicitors in London. 5-star rated legal team specialising in visa applications, housing disrepair claims.",
  metadataBase: new URL("https://abrahamssolicitors.co.uk"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Abrahams Solicitors",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Abrahams Solicitors",
  description:
    "Expert immigration and housing law solicitors in London and Bradford.",
  url: "https://abrahamssolicitors.co.uk",
  telephone: "+442034880512",
  email: "info@abrahamssolicitors.co.uk",
  priceRange: "$$",
  areaServed: [
    { "@type": "City", name: "London" },
    { "@type": "City", name: "Bradford" },
  ],
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Suite 10, Atlas House, 1 King Street",
      addressLocality: "London",
      postalCode: "EC2V 8AU",
      addressCountry: "GB",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "2nd Floor, 6 Piccadilly",
      addressLocality: "Bradford",
      postalCode: "BD1 3LS",
      addressCountry: "GB",
    },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:30",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "120",
    bestRating: "5",
    worstRating: "1",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Legal Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Immigration Law",
          description:
            "Visa applications, British citizenship, asylum claims, and appeals.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Housing Disrepair",
          description:
            "Property condition claims and compensation for tenants.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Personal Injury",
          description:
            "Work accidents, road traffic claims, and serious injuries.",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
