import { NextResponse, type NextRequest } from "next/server";
import {
  HDR_HERO_COOKIE,
  HDR_HERO_VARIANTS,
  type HdrHeroVariant,
} from "@/app/v6/housing-disrepair/variants";

/**
 * Housing-disrepair hero A/B test — server-side cookie bucketing.
 *
 * Three arms (control / photo-grid / rights-block) decide which hero
 * fill block renders below the H1 on /housing-disrepair/. The split is
 * computed here (not client-side) so the first paint already has the
 * variant — no CLS, no flash, no SEO duplicate-content risk (canonical
 * URL is identical for all three).
 *
 * Precedence: ?v=<variant> URL param (wins — used by Google Ads
 * Experiments to pin a visitor to one arm) → ab_hdr_hero cookie →
 * random assignment. The cookie is written back on every hit so a
 * returning visitor stays in their bucket for 90 days.
 *
 * Paired with:
 *  - page.tsx: reads the cookie, passes variant to the inner client
 *  - HousingDisrepairPageInner.tsx: renders the variant block + fires
 *    PostHog $feature_flag_called with the server-set override
 *  - PostHog flag `housing-disrepair-hero-fill` (ID 339023) + experiment
 *    `Housing disrepair hero fill` (ID 108540) read the variant from
 *    those exposure events.
 */
const HDR_AB_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

function pickHdrVariant(request: NextRequest): HdrHeroVariant {
  // 1. URL override — Google Ads Experiments pins visitors to one arm
  //    via ?v=<variant>. Also lets us QA each variant without clearing
  //    cookies.
  const urlOverride = request.nextUrl.searchParams.get("v");
  if (
    urlOverride &&
    (HDR_HERO_VARIANTS as readonly string[]).includes(urlOverride)
  ) {
    return urlOverride as HdrHeroVariant;
  }
  // 2. Existing cookie — sticky across visits.
  const existing = request.cookies.get(HDR_HERO_COOKIE)?.value;
  if (existing && (HDR_HERO_VARIANTS as readonly string[]).includes(existing)) {
    return existing as HdrHeroVariant;
  }
  // 3. Fresh random assignment — ~33% per arm.
  return HDR_HERO_VARIANTS[Math.floor(Math.random() * HDR_HERO_VARIANTS.length)];
}

/**
 * Cutover proxy (Next.js 16 — formerly middleware.ts).
 * Runs on every incoming request to map clean URLs to the v6 file tree.
 *
 * The rebuilt site lives in `src/app/v6/*`, but visible URLs must be clean —
 * never `/v6/...`.
 *
 * Two behaviours:
 *
 *  1. Incoming request to a clean path (e.g. `/contact-us/`) → INTERNAL
 *     rewrite to `/v6/contact-us/` so the v6 page renders. Browser URL stays
 *     `/contact-us/`.
 *
 *  2. Incoming request to a `/v6/...` path → REDIRECT (308) to the same
 *     path without the prefix. Catches any internal Link or external
 *     bookmark that still points at `/v6/`.
 *
 * Skipped: `/api/*`, Next.js internals (`/_next/*`), and anything with a
 * file extension (so static assets, sitemap, robots, llms.txt etc all
 * serve as-is from the file system).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip: API routes, Next internals, static files, well-known files,
  // and App Router metadata file conventions (icon, apple-icon, opengraph-image,
  // twitter-image — these are served by Next from app/icon.tsx, app/apple-icon.tsx
  // etc, and the URLs have NO file extension so the `.` rule below misses them).
  //
  // Also skip /immigration-solicitors-direct/ — its file lives OUTSIDE the
  // /v6/ tree (at src/app/immigration-solicitors-direct/) so the proxy
  // must NOT prepend /v6/. The route uses its own minimal layout — no
  // V6Header / V6Footer — for the paid-traffic A/B per Council Track A.
  // Without this carve-out the proxy rewrites to /v6/immigration-solicitors-direct/
  // which doesn't exist → fallthrough to /v6/[slug]/ (the dynamic
  // services template) renders a wrong page.
  // Added 2026-06-03 after spotting x-matched-path: /v6/[slug] on the
  // live URL when it should have been /immigration-solicitors-direct.
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/ingest/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/llms.txt" ||
    pathname === "/icon" ||
    pathname.startsWith("/icon/") ||
    pathname === "/apple-icon" ||
    pathname.startsWith("/apple-icon/") ||
    pathname === "/opengraph-image" ||
    pathname.startsWith("/opengraph-image/") ||
    pathname === "/twitter-image" ||
    pathname.startsWith("/twitter-image/") ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/immigration-solicitors-direct" ||
    pathname === "/immigration-solicitors-direct/" ||
    pathname.startsWith("/immigration-solicitors-direct/") ||
    // Extension-at-end-of-path check — replaces the broader `.includes(".")`
    // rule that would misidentify a versioned URL like
    // /terms-of-business/tob-imm-v2.1/ (dot inside the slug, no file
    // extension) as a static asset and skip the /v6/* rewrite.
    //
    // Real file requests end in dot-letter-then-1-to-4-alphanum, e.g.
    // .ico, .txt, .xml, .js, .mjs, .css, .png, .webp, .woff, .woff2.
    // Requiring the FIRST character after the dot to be a letter
    // excludes "trailing dot then digit" patterns like the `.1` in
    // /terms-of-business/tob-imm-v2.1 (no-trailing-slash form), which
    // the earlier `[a-zA-Z0-9]+` pass mistook for an extension.
    /\.[a-zA-Z][a-zA-Z0-9]{1,4}$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Path 2: visitor is on a /v6/* URL → redirect to the clean equivalent.
  if (pathname.startsWith("/v6/") || pathname === "/v6") {
    const cleanPath =
      pathname === "/v6" || pathname === "/v6/"
        ? "/"
        : pathname.replace(/^\/v6/, "");
    const url = request.nextUrl.clone();
    url.pathname = cleanPath;
    return NextResponse.redirect(url, 308);
  }

  // Path 1: clean URL → internally rewrite to the /v6/* file that owns it.
  // The browser keeps the clean URL; Next renders the v6 page.
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/v6" : `/v6${pathname}`;
  const res = NextResponse.rewrite(url);

  // Housing-disrepair hero A/B test — pin the visitor to a variant so
  // the server component downstream (page.tsx) reads a stable value
  // from the cookie. See pickHdrVariant() for precedence rules.
  if (
    pathname === "/housing-disrepair" ||
    pathname === "/housing-disrepair/"
  ) {
    const variant = pickHdrVariant(request);
    res.cookies.set(HDR_HERO_COOKIE, variant, {
      maxAge: HDR_AB_MAX_AGE,
      sameSite: "lax",
      path: "/",
    });
  }

  return res;
}

export const config = {
  // Run on every request except clearly-static or framework paths. Final
  // regex skips: _next assets, the file-system favicon, anything with a
  // literal "." in the last segment (catches .css, .png, .ico, etc).
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
