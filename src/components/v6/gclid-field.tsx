"use client";

import { useEffect, useState } from "react";
import { getStoredGclid, getStoredUtms } from "@/lib/gclid";

/**
 * Hidden form field that auto-populates with the captured Google Click ID.
 *
 * Drop one inside any <form> on a v6 page. We pipe the GCLID through the
 * /api/lead route to SalesHub directly — and Google's reference script
 * (support.google.com/google-ads/answer/7012522) reads it from a hidden
 * input with the literal id `gclid_field`, so this satisfies both paths.
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

/**
 * Hidden form field that auto-populates with the captured Microsoft Click ID
 * (Bing Ads). Symmetric to GclidField — same drop-in pattern, used for Bing
 * offline conversion uploads.
 */
export function MsclkidField({ id = "msclkid_field" }: { id?: string }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const { msclkid } = getStoredGclid();
    setValue(msclkid || "");
  }, []);

  return (
    <input
      type="hidden"
      id={id}
      name="msclkid_field"
      value={value}
      readOnly
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
    />
  );
}

/**
 * Hidden form fields for the 5 UTM parameters — source/medium/campaign/
 * content/term. Google Ads' tracking template appends all 5 on every
 * ad click; SalesHub reads them to attribute leads to specific
 * campaigns / ad groups / keywords.
 *
 * One drop-in component that emits all 5 hidden inputs at once; use
 * <UtmFields /> alongside <GclidField /> and <MsclkidField /> in any form.
 */
export function UtmFields() {
  const [values, setValues] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
  });

  useEffect(() => {
    const u = getStoredUtms();
    setValues({
      utm_source: u.utm_source || "",
      utm_medium: u.utm_medium || "",
      utm_campaign: u.utm_campaign || "",
      utm_content: u.utm_content || "",
      utm_term: u.utm_term || "",
    });
  }, []);

  return (
    <>
      {(Object.keys(values) as Array<keyof typeof values>).map((key) => (
        <input
          key={key}
          type="hidden"
          id={`${key}_field`}
          name={key}
          value={values[key]}
          readOnly
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      ))}
    </>
  );
}
