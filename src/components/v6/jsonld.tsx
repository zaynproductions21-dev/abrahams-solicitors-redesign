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

const OFFICES = [
  {
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}#office-london`,
    name: "Abrahams Solicitors — London",
    telephone: TELEPHONE,
    email: "info@abrahamssolicitors.co.uk",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Suite 10, Atlas House, 1 King Street",
      addressLocality: "London",
      postalCode: "EC2V 8AU",
      addressCountry: "GB",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  },
  {
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}#office-bradford`,
    name: "Abrahams Solicitors — Bradford",
    telephone: TELEPHONE,
    email: "info@abrahamssolicitors.co.uk",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 20, Listerhills Science Park, Campus Road",
      addressLocality: "Bradford",
      postalCode: "BD7 1HR",
      addressCountry: "GB",
    },
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
          ratingValue: "4.95",
          reviewCount: "116",
          bestRating: "5",
          worstRating: "1",
        },
        sameAs: [
          "https://www.facebook.com/AbrahamsSolicitors/",
          "https://x.com/Abrahamssolic",
          "https://www.instagram.com/AbrahamsSolicitors/",
          "https://www.linkedin.com/company/brahamssolicitors",
          "https://www.youtube.com/@AbrahamsSolicitors",
        ],
        location: OFFICES,
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
  cover_image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: post.author || "Abrahams Solicitors" },
    publisher: { "@type": "Organization", name: "Abrahams Solicitors", logo: { "@type": "ImageObject", url: `${BASE_URL}/abrahams-logo.png` } },
    datePublished: post.published_at,
    image: post.cover_image || `${BASE_URL}/abrahams-logo.png`,
    mainEntityOfPage: `${BASE_URL}/v6/blog/${post.slug}/`,
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
    url: `${BASE_URL}/v6/${service.slug}/`,
  };
}
