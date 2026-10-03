// London is a meeting and consultation space used by appointment, not a
// practising office: the client confirmed no case work is done there, and the
// SRA register for firm 809071 records only the Bradford office. It therefore
// appears below as a `location` Place on the organisation rather than a second
// LocalBusiness branch with opening hours. Address taken from the firm's London
// Google Business Profile as directed; Google records the street line as
// "Unit 2c 9, 15 Elthorne Rd" and the lost hyphen is restored here.
//
// No sameAs to that profile: it rates 1.0 from one review against Bradford's
// 4.7 from 60, and that is the client's call to make first.
const LONDON_MEETING_PLACE = {
  "@type": "Place",
  name: "Abrahams Solicitors — London (meetings by appointment)",
  description:
    "Meeting and consultation space used by appointment only. Not a practising office; no case work is carried out here.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Unit 2c, 9-15 Elthorne Road, Archway",
    addressLocality: "London",
    postalCode: "N19 4AJ",
    addressCountry: "GB",
  },
};

import { team } from "@/lib/team";

// Utility: render a JSON-LD <script> tag. Use it inside layouts or pages.

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ---- Site-wide graph ---------------------------------------------------

const BASE_URL = "https://www.abrahamssolicitors.co.uk";
const TELEPHONE = "+442033559823";
// Bradford office direct dial — this is the number on the Google Business
// Profile for BD7 1HR, so the office node must carry it rather than the London
// line, or the NAP in our own markup contradicts our own GBP.
const BRADFORD_TELEPHONE = "+443333396004";
// Bradford Google Business Profile (cid from the live listing) + BD7 1HR
// centroid, so the office node and the GBP resolve to one local entity.
const BRADFORD_GBP_URL = "https://www.google.com/maps?cid=15089368944767082385";

const OFFICES = [
// London is a meeting and consultation space used by appointment, not a
// practising office — the client confirmed no case work is done there, and
// the SRA register for firm 809071 records only the Bradford office. The
// previously published 'Suite 10, Atlas House, 1 King Street, EC2V 8AU' was
// confirmed to be the wrong address. Publishing no London PostalAddress is
// correct until the exact current address is confirmed: a wrong or garbled
// NAP actively harms local signals, whereas its absence is merely neutral.
  {
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}#office-bradford`,
    name: "Abrahams Solicitors — Bradford",
    telephone: BRADFORD_TELEPHONE,
    email: "info@abrahamssolicitors.co.uk",
    url: `${BASE_URL}/immigration-solicitor-bradford/`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 20, Listerhills Science Park, Campus Road",
      addressLocality: "Bradford",
      addressRegion: "West Yorkshire",
      postalCode: "BD7 1HR",
      addressCountry: "GB",
    },
    geo: { "@type": "GeoCoordinates", latitude: 53.792899, longitude: -1.769853 },
    hasMap: BRADFORD_GBP_URL,
    sameAs: [BRADFORD_GBP_URL],
    areaServed: [
      { "@type": "City", name: "Bradford" },
      { "@type": "AdministrativeArea", name: "West Yorkshire" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  },
];

export function organisationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LegalService", "Attorney"],
        "@id": `${BASE_URL}#organization`,
        name: "Abrahams Solicitors",
        alternateName: "Abrahams (Yorkshire) Limited",
        url: BASE_URL,
        logo: `${BASE_URL}/abrahams-logo.png`,
        image: `${BASE_URL}/abrahams-logo.png`,
        description: "UK immigration, housing disrepair, and personal injury solicitors. Fixed fees, direct solicitor access, SRA regulated (firm #809071).",
        telephone: TELEPHONE,
        email: "info@abrahamssolicitors.co.uk",
        areaServed: { "@type": "Country", name: "United Kingdom" },
        founder: { "@type": "Person", name: "Abrahams Solicitors" },
        knowsAbout: [
          "Immigration Law",
          "Housing Disrepair",
          "British Citizenship",
          "ILR Applications",
          "Spouse Visas",
          "Personal Injury",
        ],
        identifier: { "@type": "PropertyValue", name: "SRA", value: "809071" },
        priceRange: "££",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          bestRating: "5",
          worstRating: "1",
          reviewCount: "97",
          ratingCount: "97",
        },
        sameAs: [
          BRADFORD_GBP_URL,
          "https://www.facebook.com/AbrahamsSolicitors/",
          "https://x.com/Abrahamssolic",
          "https://www.instagram.com/AbrahamsSolicitors/",
          "https://www.linkedin.com/company/brahamssolicitors",
          "https://www.youtube.com/@AbrahamsSolicitors",
        ],
        location: [...OFFICES, LONDON_MEETING_PLACE],
      },
      ...OFFICES,
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}#website`,
        url: BASE_URL,
        name: "Abrahams Solicitors",
        publisher: { "@id": `${BASE_URL}#organization` },
      },
    ],
  };
}

// ---- Per-page helpers --------------------------------------------------

export function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function blogPostSchema(post: {
  title: string;
  slug: string;
  excerpt: string;
  author?: string;
  published_at: string;
  updated_at?: string;
  cover_image?: string;
}) {
  // Where the byline matches one of the firm's SRA-registered solicitors, emit
  // a Person author carrying the SRA number and a link to the public register,
  // rather than a generic Organization. Named, verifiable authorship is the
  // signal answer engines and YMYL quality raters actually look for; falling
  // back to the Organization keeps guest or firm-authored posts honest.
  const solicitor = team.find(t => t.name === post.author);
  const author = solicitor
    ? {
        "@type": "Person",
        name: solicitor.name,
        jobTitle: solicitor.role,
        url: solicitor.sraUrl,
        identifier: { "@type": "PropertyValue", name: "SRA", value: solicitor.sraNumber },
        worksFor: { "@id": `${BASE_URL}#organization` },
      }
    : { "@type": "Organization", name: post.author || "Abrahams Solicitors" };

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author,
    publisher: { "@type": "Organization", name: "Abrahams Solicitors", logo: { "@type": "ImageObject", url: `${BASE_URL}/abrahams-logo.png` } },
    datePublished: post.published_at,
    // Falls back to the publish date: a post never edited was last modified
    // when it was published, so this stays accurate rather than invented.
    dateModified: post.updated_at || post.published_at,
    image: post.cover_image || `${BASE_URL}/abrahams-logo.png`,
    mainEntityOfPage: `${BASE_URL}/blog/${post.slug}/`,
  };
}

export function serviceSchema(service: { name: string; description: string; slug: string; priceLabel: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: { "@id": `${BASE_URL}#organization` },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      description: service.priceLabel,
      availability: "https://schema.org/InStock",
    },
    url: `${BASE_URL}/${service.slug}/`,
  };
}

// Speakable: marks selectors that voice assistants / AI summarisers should read aloud.
export function speakableSchema(cssSelectors: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
}

// Author/byline schema for E-E-A-T signals on solicitor-authored pages.
export function personSchema(p: {
  name: string;
  jobTitle: string;
  sraNumber: string;
  sraUrl: string;
  bio?: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.jobTitle,
    worksFor: { "@id": `${BASE_URL}#organization` },
    identifier: { "@type": "PropertyValue", name: "SRA", value: p.sraNumber },
    url: `${BASE_URL}/our-team/#${p.slug}`,
    sameAs: [p.sraUrl],
    ...(p.bio ? { description: p.bio } : {}),
  };
}

// Detailed LegalService schema with hasOfferCatalog — for landing pages that list specific
// disrepair claim types so AI search engines can summarise the offer set.
export function legalServiceWithCatalogSchema(args: {
  name: string;
  description: string;
  slug: string;
  catalog: { name: string; description: string }[];
  author?: { name: string; sraUrl: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: args.name,
    description: args.description,
    provider: { "@id": `${BASE_URL}#organization` },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    url: `${BASE_URL}/${args.slug}/`,
    ...(args.author
      ? { author: { "@type": "Person", name: args.author.name, sameAs: [args.author.sraUrl] } }
      : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: args.name,
      itemListElement: args.catalog.map((item, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: item.name,
          description: item.description,
        },
      })),
    },
  };
}
