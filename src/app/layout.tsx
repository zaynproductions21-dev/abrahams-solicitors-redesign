import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { PostHogProvider } from "@/components/posthog-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Immigration Solicitors London | Housing Law | Abrahams Solicitors",
    template: "%s | Abrahams Solicitors",
  },
  description:
    "UK immigration & housing solicitors. Fixed fees, direct solicitor access nationwide. Spouse visas, citizenship, disrepair claims. Free consultation.",
  metadataBase: new URL("https://abrahamssolicitors.co.uk"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Abrahams Solicitors",
    images: [
      {
        url: "/abrahams-logo.png",
        width: 1024,
        height: 1024,
        alt: "Abrahams Solicitors — UK Immigration & Housing Law",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Abrahamssolic",
    creator: "@Abrahamssolic",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Abrahams Solicitors",
  description:
    "Expert immigration and housing law solicitors in London and Bradford.",
  url: "https://abrahamssolicitors.co.uk",
  telephone: "+442033559823",
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
      streetAddress: "Unit 20, Listerhills Science Park, Campus Road",
      addressLocality: "Bradford",
      postalCode: "BD7 1HR",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Script id="posthog-init" strategy="afterInteractive">{`
          !function(t,e){var o,n,p,r;e.__SV||(window.posthog&&window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag isFeatureEnabled on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys identify setPersonProperties group reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty debug opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init('phc_rJmyyFtKADpwEYUz9ufrd9cREaaoDq37ZeUrAyek5fnM',{api_host:'https://eu.i.posthog.com',capture_pageview:true,capture_pageleave:true,autocapture:true,person_profiles:'identified_only'});
          posthog.register({site:'abrahams',site_name:'Abrahams Solicitors',site_domain:'abrahamssolicitors.co.uk'});
        `}</Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
