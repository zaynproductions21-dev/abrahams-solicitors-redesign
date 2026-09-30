import { redirect } from "next/navigation";

// URL versioning per WEBSITE-BRIEF-v2.3.md:
//
//   Client Care Letters reference the Terms the client actually agreed
//   to. If every letter points at one unversioned `/terms-of-business/`
//   URL, then the day v2.4 is published, every letter ever sent
//   silently starts pointing at Terms the client never saw. Versioning
//   the path keeps each client's letter pointing at the version that
//   binds them.
//
// The current live Terms are exposed at their own permanent path
// (`/terms-of-business/tob-imm-v2-1/`, and future versions at
// `/terms-of-business/tob-imm-v2-3/` etc). This root route is a
// redirect to whichever version is current — bump the target in one
// place when a new version publishes; the versioned page for the
// previous version stays live forever, so CCLs bound to it never
// silently re-point at a newer document.
//
// URL SLUGS USE DASHES, not dots. The template_version stamp inside
// each page still reads "v2.1" / "v2.3" as a version label, but the
// URL slug is `tob-imm-v2-1` because Next.js App Router treats dots
// inside directory names as route-convention markers (siblings of
// `(.)`, `(..)`, `(...)` intercepting routes) and 404s a page at a
// dotted path. Dashes are unambiguous.
//
// When TOB-IMM v2.3 arrives:
//   1. Add src/app/v6/terms-of-business/tob-imm-v2-3/page.tsx with the
//      new clause text (13.6 addendum + 13.8A + 13.8B). Directory name
//      uses a dash; the page's own version stamp says "v2.3".
//   2. Change CURRENT_TOB_PATH below to "/terms-of-business/tob-imm-v2-3/".
//   3. Leave tob-imm-v2-1/page.tsx untouched — clients whose CCL binds
//      them to v2.1 must still be able to reach it at that URL.
//   4. Update the CRM's Client Care Letter template to reference the
//      versioned URL going forward, not the unversioned root.

const CURRENT_TOB_PATH = "/terms-of-business/tob-imm-v2-3/";

export default function TermsOfBusinessIndex() {
  redirect(CURRENT_TOB_PATH);
}
