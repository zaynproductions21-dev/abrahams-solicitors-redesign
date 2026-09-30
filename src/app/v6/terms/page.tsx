import { permanentRedirect } from "next/navigation";

// Explicit /terms route — beats the [slug] service-page catchall which
// used to render "Terms: From £240*, Free Terms Consultation, Ready to
// Discuss Your Terms Case?" for any visitor who clicked a "Terms" link
// from a footer, email, or Client Care Letter that shortened the URL.
//
// A slug that means "our Terms of Business" cannot silently become a
// "Terms case" sales pitch. Redirect straight to the real Terms page
// (which itself then redirects to the current versioned URL).
//
// PERMANENT (308) redirect per WEBSITE-BRIEF-terms-page.md item 3 —
// /terms is a permanent alias for /terms-of-business/, so search
// engines consolidate the link equity into the real page rather than
// keeping /terms alive as a distinct URL.

export default function TermsAlias() {
  permanentRedirect("/terms-of-business/");
}
