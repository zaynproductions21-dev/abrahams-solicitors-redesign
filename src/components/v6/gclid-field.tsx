"use client";

import { useEffect, useState } from "react";
import { getStoredGclid } from "@/lib/gclid";

/**
 * Hidden form field that auto-populates with the captured Google Click ID.
 *
 * Drop one inside any <form> on a v6 page. We also pipe the GCLID through
 * the /api/lead route to SalesHub directly — but Google's tech support
 * recipe expects a literal hidden input on the form, so this satisfies
 * both paths.
 *
 * The input id matches the field name SalesHub will store the GCLID
 * against, making the GTM tag config straightforward.
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
      name="gclid"
      value={value}
      readOnly
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
    />
  );
}
