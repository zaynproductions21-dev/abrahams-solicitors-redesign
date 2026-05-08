import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      // ---- Legacy WordPress blog posts → new blog slugs ---------------
      { source: "/rising-complaints-about-damp-mould/", destination: "/blog/rising-complaints-about-damp-mould/", permanent: true },
      { source: "/upper-tribunal-safeguards-rights-of-parents-to-british-children-in-landmark-akeju-ruling/", destination: "/blog/upper-tribunal-safeguards-parents-akeju-ruling/", permanent: true },
      { source: "/upper-tribunal-sets-precedent-on-procedural-fairness-overturns-deportation-for-ignored-medical-evidence/", destination: "/blog/deportation-order-quashed-procedural-unfairness/", permanent: true },
      { source: "/94500-awarded-in-neurodiversity-discrimination-tribunal/", destination: "/blog/94500-neurodiversity-discrimination-tribunal/", permanent: true },
      { source: "/high-court-intervenes-in-international-child-abduction-orders-return-of-british-children-from-pakistan/", destination: "/blog/high-court-orders-return-abducted-children/", permanent: true },
      { source: "/senior-nhs-consultant-awarded-180000-in-high-stakes-defamation-battle/", destination: "/blog/nhs-consultant-180000-defamation/", permanent: true },
      { source: "/historic-joint-enterprise-conviction-quashed-in-wake-of-jogee-legal-revolution/", destination: "/blog/joint-enterprise-conviction-jogee/", permanent: true },

      // ---- Old practice-area URLs whose slug changed ------------------
      { source: "/immigration-law/", destination: "/immigration/", permanent: true },
      { source: "/housing-disrepair/", destination: "/housing-disrepair-claims/", permanent: true },

      // Core pages and unchanged practice-area slugs are served directly
      // by the proxy + v6 file tree — no redirect entry needed for those
      // (an identity redirect like "/about-us/" → "/about-us/" causes an
      // infinite redirect loop).
    ];
  },
};

export default nextConfig;
