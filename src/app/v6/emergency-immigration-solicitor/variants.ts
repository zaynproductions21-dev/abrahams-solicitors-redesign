/**
 * Emergency-immigration hero A/B test — variant tuple + cookie name.
 *
 * Lives in its own plain-TS module (no "use client") so both the
 * server component page.tsx (reads the cookie) and the client inner
 * (renders the hero) can import without triggering the client-reference
 * trap that bit PR #38 on the housing-disrepair A/B.
 *
 * Pattern mirrors src/app/v6/housing-disrepair/variants.ts exactly.
 */
export const EMERG_HERO_VARIANTS = ["control", "router"] as const;
export type EmergHeroVariant = (typeof EMERG_HERO_VARIANTS)[number];
export const EMERG_HERO_COOKIE = "ab_emerg_hero";
