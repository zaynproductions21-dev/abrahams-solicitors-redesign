"use client";

import { useEffect, useState } from "react";
import { getStoredGclid } from "@/lib/gclid";

/**
 * Hidden form field that auto-populates with the captured Google Click ID.
 *
 * Drop one inside any <form> on a v6 page. We pipe the GCLID through the
 * /api/lead route to SalesHub directly — and Google's reference script
 * (support.google.com/google-ads/answer/7012522) reads it from a hidden
 * input with the literal id `gclid_field`, so this satisfies both paths.
 *
 * Field name is the SalesHub custom-field key; the `id` is what Google's
 * script targets. Keeping both as `gclid_field` is the universal default.
 */
export function GclidField({ id = "gclid_field" }: { id?: string }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const { gclid, gbraid, wbraid } = getStoredGclid();
    setValue(gclid || gbraid || wbraid || "");
  }, []);

  return (
    <input
      type="hidden"
      id={id}
      name="gclid_field"
      value={value}
      readOnly
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
    />
  );
}
