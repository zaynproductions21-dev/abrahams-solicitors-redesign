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

      // ---- Renamed practice-area + booking pages ----------------------
      { source: "/immigration-law/", destination: "/immigration/", permanent: true },
      { source: "/housing-disrepair/", destination: "/housing-disrepair-claims/", permanent: true },
      { source: "/british-citizenship/", destination: "/british-citizenship-solicitors/", permanent: true },
      { source: "/make-an-appointment/", destination: "/free-consultation/", permanent: true },

      // ---- Immigration sub-pages with no direct v6 equivalent ---------
      // /uk-dependent-child-visa/ and /uk-dependent-parent-visa/ now have
      // bespoke landing pages — they're served by the v6 file tree directly,
      // no redirect needed.
      { source: "/uk-private-life-visa-ilr/", destination: "/indefinite-leave-to-remain-ilr/", permanent: true },

      // ---- Personal Injury pages ---------------------------------------
      // /personal-injury/ is now a bespoke hub page. All 14 sub-pages from
      // the legacy site (which don't have dedicated v6 equivalents) redirect
      // there for topical relevance + SEO.
      // Note: /personal-injury/ itself is NOT redirected — that's the hub.
      { source: "/accidents-at-work/", destination: "/personal-injury/", permanent: true },
      { source: "/employers-duty-of-care/", destination: "/personal-injury/", permanent: true },
      { source: "/back-injury-claims/", destination: "/personal-injury/", permanent: true },
      { source: "/slips-and-trips/", destination: "/personal-injury/", permanent: true },
      { source: "/fall-from-height-claims/", destination: "/personal-injury/", permanent: true },
      { source: "/car-accidents-claims/", destination: "/personal-injury/", permanent: true },
      { source: "/motorcycle-accident-claims/", destination: "/personal-injury/", permanent: true },
      { source: "/passenger-claims/", destination: "/personal-injury/", permanent: true },
      { source: "/pedestrian-claims/", destination: "/personal-injury/", permanent: true },
      { source: "/serious-injury-claims/", destination: "/personal-injury/", permanent: true },
      { source: "/fatal-accident-claims/", destination: "/personal-injury/", permanent: true },
      { source: "/head-and-brain-injury/", destination: "/personal-injury/", permanent: true },
      { source: "/loss-of-sight-claims/", destination: "/personal-injury/", permanent: true },
      { source: "/spinal-injury-claims/", destination: "/personal-injury/", permanent: true },

      // Core pages and unchanged practice-area slugs are served directly
      // by the proxy + v6 file tree — no redirect entry needed for those
      // (an identity redirect like "/about-us/" → "/about-us/" causes an
      // infinite redirect loop).
    ];
  },
};

export default nextConfig;
