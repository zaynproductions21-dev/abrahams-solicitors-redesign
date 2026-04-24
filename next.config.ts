import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      // ---- Legacy WordPress blog posts → new /v6/blog/<slug>/ ---------
      { source: "/rising-complaints-about-damp-mould/", destination: "/v6/blog/rising-complaints-about-damp-mould/", permanent: true },
      { source: "/upper-tribunal-safeguards-rights-of-parents-to-british-children-in-landmark-akeju-ruling/", destination: "/v6/blog/upper-tribunal-safeguards-parents-akeju-ruling/", permanent: true },
      { source: "/upper-tribunal-sets-precedent-on-procedural-fairness-overturns-deportation-for-ignored-medical-evidence/", destination: "/v6/blog/deportation-order-quashed-procedural-unfairness/", permanent: true },
      { source: "/94500-awarded-in-neurodiversity-discrimination-tribunal/", destination: "/v6/blog/94500-neurodiversity-discrimination-tribunal/", permanent: true },
      { source: "/high-court-intervenes-in-international-child-abduction-orders-return-of-british-children-from-pakistan/", destination: "/v6/blog/high-court-orders-return-abducted-children/", permanent: true },
      { source: "/senior-nhs-consultant-awarded-180000-in-high-stakes-defamation-battle/", destination: "/v6/blog/nhs-consultant-180000-defamation/", permanent: true },
      { source: "/historic-joint-enterprise-conviction-quashed-in-wake-of-jogee-legal-revolution/", destination: "/v6/blog/joint-enterprise-conviction-jogee/", permanent: true },

      // ---- Old practice-area URLs → new /v6/<slug>/ -------------------
      { source: "/immigration-law/", destination: "/v6/immigration/", permanent: true },
      { source: "/housing-disrepair/", destination: "/v6/housing-disrepair-claims/", permanent: true },
      { source: "/personal-injury/", destination: "/v6/personal-injury/", permanent: true },
      { source: "/accidents-at-work/", destination: "/v6/accidents-at-work/", permanent: true },
      { source: "/car-accidents-claims/", destination: "/v6/car-accidents-claims/", permanent: true },
      { source: "/serious-injury-claims/", destination: "/v6/serious-injury-claims/", permanent: true },

      // ---- Core pages ------------------------------------------------
      { source: "/about-us/", destination: "/v6/about-us/", permanent: true },
      { source: "/our-fees/", destination: "/v6/our-fees/", permanent: true },
      { source: "/contact-us/", destination: "/v6/contact-us/", permanent: true },
      { source: "/blog/", destination: "/v6/blog/", permanent: true },
      { source: "/refer-a-friend/", destination: "/v6/refer-a-friend/", permanent: true },
      { source: "/careers/", destination: "/v6/careers/", permanent: true },
      { source: "/free-consultation/", destination: "/v6/free-consultation/", permanent: true },
      { source: "/privacy-policy/", destination: "/v6/privacy-policy/", permanent: true },
      { source: "/terms-of-business/", destination: "/v6/terms-of-business/", permanent: true },
      { source: "/cookie-policy/", destination: "/v6/cookie-policy/", permanent: true },
      { source: "/website-legal-notice/", destination: "/v6/website-legal-notice/", permanent: true },
    ];
  },
};

export default nextConfig;
