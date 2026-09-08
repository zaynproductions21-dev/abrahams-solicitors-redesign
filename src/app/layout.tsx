import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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
    default: "Immigration Solicitors Bradford & London | Housing Law | Abrahams Solicitors",
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
      streetAddress: "Unit 20, Listerhills Science Park, Campus Road",
      addressLocality: "Bradford",
      postalCode: "BD7 1HR",
      addressCountry: "GB",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Suite 10, Atlas House, 1 King Street",
      addressLocality: "London",
      postalCode: "EC2V 8AU",
      addressCountry: "GB",
    },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:30",
  },
  // aggregateRating removed: no verifiable on-site review source backs a
  // ratingValue/reviewCount. Reinstate only with audited review data.
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
        {/* PostHog is initialised consent-gated + masked inside PostHogProvider. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Call Intelligence DNI: swaps the displayed phone number to a campaign
            tracking number for paid visitors (utm_campaign/gclid). No-ops for
            organic traffic and for campaigns whose number pool is empty. */}
        <script
          src="https://app.calltrace.co.uk/api/call-tracking/snippet?clientId=cl_mnxclw6q"
          async
        />
        <PostHogProvider>
          {children}
        </PostHogProvider>
        {/* CONSENT-GATED, unlike the own-brand sites. Abrahams runs a cookie
            banner and is a regulated firm, so this waits for the
            cookie_consent_granted dataLayer event before reporting anything.
            GoogleTagManager replays that event on every page load for visitors
            who already accepted, so returning users are covered without a
            second prompt. It stores nothing either way. */}
        {/*
            AI-engine referral beacon. Reports which assistant sent a visit to
            publishos /api/ai-referral. Stores NOTHING on the device - no cookie, no
            localStorage, no sessionStorage - so it carries no PECR consent duty. The
            reload guard reads Navigation Timing rather than writing a flag.
            Source of truth: publishos public/ai-referral.js. */}
        <script
          id="ai-referral"
          dangerouslySetInnerHTML={{ __html: `!function(){var C="cl_mnxclw6q",E="https://www.publishos.co.uk/api/ai-referral",H=[[/(^|\\.)chatgpt\\.com$/i,"ChatGPT"],[/(^|\\.)chat\\.openai\\.com$/i,"ChatGPT"],[/(^|\\.)openai\\.com$/i,"ChatGPT"],[/(^|\\.)perplexity\\.ai$/i,"Perplexity"],[/(^|\\.)gemini\\.google\\.com$/i,"Gemini"],[/(^|\\.)copilot\\.microsoft\\.com$/i,"Copilot"],[/(^|\\.)claude\\.ai$/i,"Claude"],[/(^|\\.)meta\\.ai$/i,"Meta AI"],[/(^|\\.)you\\.com$/i,"You.com"],[/(^|\\.)grok\\.com$/i,"Grok"]],P=[[/chatgpt|openai/i,"ChatGPT"],[/perplexity/i,"Perplexity"],[/gemini|bard/i,"Gemini"],[/copilot/i,"Copilot"],[/claude|anthropic/i,"Claude"],[/grok/i,"Grok"]];function d(){try{var p=new URLSearchParams(location.search),k=["utm_source","ref","source"];for(var i=0;i<k.length;i++){var v=p.get(k[i]);if(v)for(var j=0;j<P.length;j++)if(P[j][0].test(v))return P[j][1]}}catch(e){}if(document.referrer)try{var h=new URL(document.referrer).hostname;for(var n=0;n<H.length;n++)if(H[n][0].test(h))return H[n][1]}catch(e){}return null}function f(){try{var n=performance.getEntriesByType("navigation")[0];if(n&&n.type)return n.type==="navigate"}catch(e){}return true}function s(g){try{fetch(E,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({clientId:C,url:location.origin+location.pathname+location.search,referrer:document.referrer||""}),keepalive:!0,mode:"cors"})["catch"](function(){})}catch(e){}}var g=d();if(!g||!f())return;var sent=false;function go(){if(sent)return;sent=true;window.dataLayer.push({event:"ai_referral",ai_engine:g,ai_landing_path:location.pathname});s(g)}window.dataLayer=window.dataLayer||[];for(var q=0;q<window.dataLayer.length;q++){var e0=window.dataLayer[q];if(e0&&e0.event==="cookie_consent_granted"){go();break}}if(!sent){var op=window.dataLayer.push;window.dataLayer.push=function(){var r=op.apply(this,arguments);for(var z=0;z<arguments.length;z++){var a=arguments[z];if(a&&a.event==="cookie_consent_granted")go()}return r}}}();` }}
        />
      </body>
    </html>
  );
}
