/**
 * / — homepage server shell.
 *
 * This was a "use client" page with no metadata of its own, so its title,
 * description and canonical all came from the root layout's inherited values.
 * That inheritance was the problem: `alternates: { canonical: "/" }` on the
 * root layout is handed to EVERY descendant page that doesn't set its own, and
 * most of this site's pages are client components that can't set one. The
 * live result was 48 URLs emitting <link rel="canonical" href="<homepage>">.
 *
 * Moving the homepage's metadata here lets the root layout drop that
 * canonical, so pages without an explicit one self-canonicalise instead of
 * pointing at the homepage. The values below are byte-identical to what the
 * homepage was already serving — this is deliberately not a content change.
 */
import type { Metadata } from "next";
import HomePageInner from "./HomePageInner";

export const metadata: Metadata = {
  title: {
    absolute: "Immigration Solicitors Bradford & London | Housing Law | Abrahams Solicitors",
  },
  description:
    "UK immigration & housing solicitors. Fixed fees, direct solicitor access nationwide. Spouse visas, citizenship, disrepair claims. Free consultation.",
  alternates: { canonical: "https://www.abrahamssolicitors.co.uk/" },
};

export default function V6HomePage() {
  return <HomePageInner />;
}
