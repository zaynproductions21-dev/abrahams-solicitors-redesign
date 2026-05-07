"use client";

import { useEffect } from "react";
import { captureGclidFromUrl } from "@/lib/gclid";

/**
 * Mount once at the v6 layout level. On every navigation that lands
 * with ?gclid=... (or ?gbraid= / ?wbraid=) we persist the value to a
 * cookie + localStorage for 90 days so subsequent form submissions
 * can attach it to the lead.
 */
export function GclidCapture() {
  useEffect(() => {
    captureGclidFromUrl();
  }, []);
  return null;
}
