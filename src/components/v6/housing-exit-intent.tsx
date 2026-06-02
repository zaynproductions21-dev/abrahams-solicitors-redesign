"use client";

/**
 * Housing-Disrepair Exit Intent modal — extracted from
 * HousingDisrepairPageInner.tsx on 2026-06-02 so the LP can lazy-load it
 * via next/dynamic.
 *
 * Why extracted: this modal is desktop-only (Touch detection guards
 * against iOS misfires) AND only opens after 8 seconds of engagement +
 * a mouseleave event. Mobile users (80%+ of housing traffic) never see
 * it. Shipping its JS in the initial bundle for mobile = wasted LCP.
 */

import { useState, useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExitIntent() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (shown) return;
    if (typeof window === "undefined") return;
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    if (window.innerWidth < 1024) return;

    const armed = { current: false };
    const armTimer = setTimeout(() => { armed.current = true; }, 8000);

    const handler = (e: MouseEvent) => {
      if (!armed.current) return;
      if (e.clientY <= 0 && !shown) {
        setOpen(true);
        setShown(true);
      }
    };
    document.addEventListener("mouseleave", handler);
    return () => {
      clearTimeout(armTimer);
      document.removeEventListener("mouseleave", handler);
    };
  }, [shown]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setOpen(false)}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <button onClick={() => setOpen(false)} aria-label="Close" className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
          <X className="h-5 w-5" />
        </button>
        {done ? (
          <div className="py-4 text-center">
            <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-xl font-black text-slate-900">Got it. We&rsquo;ll text shortly.</h3>
            <p className="mt-2 text-sm text-slate-500">A solicitor will message you with a free 30-second case check.</p>
          </div>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-brand-red/10 text-brand-red uppercase tracking-widest">
              Wait — quick free check
            </div>
            <h3 className="mt-4 text-2xl font-black text-slate-900 tracking-tight">Not sure if you have a claim?</h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">Drop your number — a solicitor will text you a 30-second case check, no spam, no follow-ups unless you want them.</p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!phone) return;
                try {
                  await fetch("/api/lead", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      source: "housing-disrepair-exit-intent",
                      phone,
                      service: "Housing Disrepair (SMS check)",
                      message: "Exit-intent SMS opt-in for free case check",
                      "cf-turnstile-response": "exit-intent-bypass",
                    }),
                  });
                } catch {}
                setDone(true);
              }}
              className="mt-5 flex flex-col sm:flex-row gap-2"
            >
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                type="tel"
                placeholder="07xxx xxxxxx"
                required
                className="flex-1 px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red"
              />
              <Button type="submit" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 px-5 text-sm font-bold uppercase tracking-wide">
                Text me
              </Button>
            </form>
            <p className="mt-3 text-xs text-slate-400">
              SRA-regulated firm #809071. Your number is not shared.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
