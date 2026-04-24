"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateGtmConsent } from "./google-tag-manager";

const COOKIE_KEY = "abrahams-cookie-consent-v1";

type Consent = "accepted" | "rejected";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(COOKIE_KEY);
      if (!stored) setVisible(true);
    } catch {}
  }, []);

  const record = (decision: Consent) => {
    try {
      window.localStorage.setItem(COOKIE_KEY, JSON.stringify({ decision, at: new Date().toISOString() }));
    } catch {}
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: decision === "accepted" ? "cookie_consent_granted" : "cookie_consent_denied" });
    updateGtmConsent(decision);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-[100] bg-white rounded-2xl shadow-2xl ring-1 ring-slate-200 p-5 sm:p-6">
      <button
        onClick={() => record("rejected")}
        aria-label="Close"
        className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
      <h3 className="text-sm font-bold text-slate-900 mb-1.5 pr-6">We use cookies</h3>
      <p className="text-xs text-slate-500 leading-relaxed mb-4">
        We use essential cookies to run the site and analytics cookies to improve it. See our{" "}
        <Link href="/v6/cookie-policy/" className="text-brand-red font-semibold hover:underline">Cookie Policy</Link>.
      </p>
      <div className="flex gap-2">
        <Button onClick={() => record("accepted")} className="flex-1 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-9 text-xs font-bold uppercase tracking-wide">
          Accept
        </Button>
        <Button onClick={() => record("rejected")} variant="outline" className="flex-1 rounded-lg h-9 text-xs font-semibold border-slate-200 text-slate-700 hover:border-brand-red hover:text-brand-red">
          Decline
        </Button>
      </div>
    </div>
  );
}
