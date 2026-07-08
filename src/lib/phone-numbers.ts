// Phone number config for the v6 site.
//
// Every variant renders the firm's real sales group line at SSR time.
// Per-campaign tracking numbers are swapped in client-side by the CallTrace
// DNI snippet (see layout.tsx): paid visitors (utm_campaign/gclid present)
// get a pool number matching their campaign; organic visitors keep the
// real line. The snippet matches this exact number, so all variants must
// stay on it for the swap to find its target.

export type PhoneVariant = "default" | "google" | "bing" | "housing";

export type PhoneNumber = {
  /** Pretty-printed for display, e.g. "0203 355 9823". */
  display: string;
  /** Tel: link target, no spaces, no plus. */
  tel: string;
  /** E.164, e.g. "+442033559823" — for schema, GTM, CRM. */
  e164: string;
};

// Public advertised line — what organic/SEO/direct/social/email visitors see
// (and call). Paid visitors get this swapped to a campaign tracking number by
// the CallTrace snippet, which targets this number and the sales group line.
export const PHONE_NUMBERS: Record<PhoneVariant, PhoneNumber> = {
  default: { display: "0203 355 9823", tel: "02033559823", e164: "+442033559823" },
  google:  { display: "0203 355 9823", tel: "02033559823", e164: "+442033559823" },
  bing:    { display: "0203 355 9823", tel: "02033559823", e164: "+442033559823" },
  housing: { display: "0203 355 9823", tel: "02033559823", e164: "+442033559823" },
};

/** Bradford office direct dial — static, not part of DNI. */
export const BRADFORD_OFFICE_PHONE: PhoneNumber = {
  display: "0333 339 6004",
  tel: "03333396004",
  e164: "+443333396004",
};
