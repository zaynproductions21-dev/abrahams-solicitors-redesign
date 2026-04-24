// Google Ads Enhanced Conversions / GA4 form submission tracking.
// Fires dataLayer event `ec_form_submit` with unhashed email + E.164 phone.

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// Normalise a free-text phone input to E.164.
// Returns null if we can't confidently produce a valid E.164 number.
export function toE164(raw: string, defaultCountry: "+44" = "+44"): string | null {
  if (!raw) return null;
  const digits = raw.replace(/[^\d+]/g, "");
  let candidate = digits;
  if (candidate.startsWith("00")) candidate = "+" + candidate.slice(2);
  if (!candidate.startsWith("+")) {
    if (candidate.startsWith("44") && candidate.length >= 11) {
      candidate = "+" + candidate;
    } else if (candidate.startsWith("0")) {
      candidate = defaultCountry + candidate.slice(1);
    } else {
      candidate = defaultCountry + candidate;
    }
  }
  const body = candidate.slice(1);
  if (!/^\d{10,15}$/.test(body)) return null;
  return candidate;
}

export function pushFormSubmit({
  email,
  phone,
}: {
  email?: string;
  phone?: string;
}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const user_data: Record<string, string> = {};
  if (email) user_data.email = email.trim();
  if (phone) {
    const normalised = toE164(phone);
    if (normalised) user_data.phone_number = normalised;
  }
  window.dataLayer.push({ event: "ec_form_submit", user_data });
}
