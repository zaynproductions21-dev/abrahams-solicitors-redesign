import { NextResponse, type NextRequest } from "next/server";

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
    pathname.includes(".")
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
  return NextResponse.rewrite(url);
}

export const config = {
  // Run on every request except clearly-static or framework paths. Final
  // regex skips: _next assets, the file-system favicon, anything with a
  // literal "." in the last segment (catches .css, .png, .ico, etc).
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
