// Dynamic Number Insertion config for the v6 site.
//
// Each visitor sees one of these numbers depending on where they came
// from. The call-tracking platform on the receiving end uses the
// dialled number to attribute the call back to the ad source.
//
// Default — direct, organic, social, email, referral.
// Google  — visitor arrived with ?gclid= (Google Ads click).
// Bing    — visitor arrived with ?msclkid= (Microsoft/Bing Ads click).
// Housing — fixed override on /v6/housing-disrepair/ regardless
//           of source (we don't run paid for housing disrepair).

export type PhoneVariant = "default" | "google" | "bing" | "housing";

export type PhoneNumber = {
  /** Pretty-printed for display, e.g. "0203 355 9823". */
  display: string;
  /** Tel: link target, no spaces, no plus. */
  tel: string;
  /** E.164, e.g. "+442033559823" — for schema, GTM, CRM. */
  e164: string;
};

export const PHONE_NUMBERS: Record<PhoneVariant, PhoneNumber> = {
  default: { display: "0203 355 9823", tel: "02033559823", e164: "+442033559823" },
  google:  { display: "0203 051 7887", tel: "02030517887", e164: "+442030517887" },
  bing:    { display: "0203 051 7760", tel: "02030517760", e164: "+442030517760" },
  housing: { display: "0203 051 7823", tel: "02030517823", e164: "+442030517823" },
};

/** Bradford office direct dial — static, not part of DNI. */
export const BRADFORD_OFFICE_PHONE: PhoneNumber = {
  display: "0333 339 6004",
  tel: "03333396004",
  e164: "+443333396004",
};
