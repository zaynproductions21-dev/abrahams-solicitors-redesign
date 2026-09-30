import { redirect } from "next/navigation";

// Explicit /terms route — beats the [slug] service-page catchall which
// was rendering "Terms: From £240*, Free Terms Consultation, Ready to
// Discuss Your Terms Case?" for any visitor who clicked a "Terms" link
// from a footer, email, or Client Care Letter that shortened the URL.
//
// A slug that means "our Terms of Business" cannot silently become a
// "Terms case" sales pitch. Redirect straight to the real terms page
// (which itself then redirects to the current versioned URL).
//
// If Google has indexed /terms as a service page, the 308 here tells
// crawlers to consolidate into /terms-of-business/.

export default function TermsAlias() {
  redirect("/terms-of-business/");
}
