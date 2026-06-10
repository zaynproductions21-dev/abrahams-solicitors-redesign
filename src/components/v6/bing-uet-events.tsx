"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    uetq?: unknown[];
  }
}

/**
 * Push a UET conversion event. Safe to call before bat.js loads — uetq queues it.
 * event_action must exactly match the "Event Action" string in the Microsoft Ads
 * conversion goal (Conversions → Conversion goals → goal detail).
 */
function uetEvent(action: string) {
  if (typeof window === "undefined") return;
  window.uetq = window.uetq || [];
  window.uetq.push("event", action, {});
}

/**
 * BingUetEvents — document-level listener that fires UET conversion events.
 *
 * Event actions (must match Microsoft Ads conversion goal "Event Action" values):
 *   call_click   → tel: link tapped/clicked
 *   mail_click   → mailto: link clicked
 *   form_submit  → any <form> submitted (covers all lead-capture forms)
 *
 * Mounted once in the v6 layout (and immigration-solicitors-direct layout).
 * Uses capture phase (useCapture=true) so it fires even if child handlers
 * call stopPropagation().
 */
export function BingUetEvents() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null;
      if (!target) return;
      const href = target.getAttribute("href") || "";
      if (href.startsWith("tel:")) uetEvent("call_click");
      else if (href.startsWith("mailto:")) uetEvent("mail_click");
    }

    function handleSubmit() {
      uetEvent("form_submit");
    }

    document.addEventListener("click", handleClick, true);
    document.addEventListener("submit", handleSubmit, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("submit", handleSubmit, true);
    };
  }, []);

  return null;
}
