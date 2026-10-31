/**
 * Housing-disrepair hero A/B test — variant tuple + type.
 *
 * Lives in its own plain-TS module (no "use client") so both the
 * server component (page.tsx — reads the cookie) and the client inner
 * (HousingDisrepairPageInner.tsx — renders the fill block) can
 * import these values. If they lived in the client inner the server
 * import would become a client reference and page.tsx would 500 at
 * runtime trying to .includes() on it — which is exactly how this
 * split got refactored out.
 */
export const HDR_HERO_VARIANTS = ["control", "photo-grid", "rights-block"] as const;
export type HdrHeroVariant = (typeof HDR_HERO_VARIANTS)[number];
export const HDR_HERO_COOKIE = "ab_hdr_hero";
