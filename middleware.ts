import { NextResponse, type NextRequest } from "next/server";

/**
 * Cutover middleware. Runs on every incoming request to map clean URLs
 * to the v6 file tree.
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
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip: API routes, Next internals, static files, well-known files.
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/llms.txt" ||
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
