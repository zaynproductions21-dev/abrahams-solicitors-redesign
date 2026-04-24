// Server-safe spam utilities. No React imports here — this file is
// imported from the /api/lead route handler.

// Minimum milliseconds between page load and form submission.
// Humans almost always take longer than 2s to fill a form.
export const MIN_SUBMIT_MS = 2000;

export function isSpamSubmission(body: { _hp?: unknown; _t?: unknown }): boolean {
  if (typeof body._hp === "string" && body._hp.trim().length > 0) return true;
  const t = typeof body._t === "number" ? body._t : typeof body._t === "string" ? Number(body._t) : 0;
  if (!t || Number.isNaN(t)) return true;
  if (Date.now() - t < MIN_SUBMIT_MS) return true;
  return false;
}
