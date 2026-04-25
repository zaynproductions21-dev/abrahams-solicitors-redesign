"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

const SHOW_AT = 240; // px scrolled before the bar appears

/**
 * Mobile-only sticky bottom Call CTA. Slides up once the visitor
 * has scrolled past the hero, slides down when they go back to the top.
 * Reserves a right strip so it doesn't collide with the chat bubble.
 */
export function StickyCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AT);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`md:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-200 shadow-[0_-4px_18px_rgba(15,23,42,0.08)] pr-[68px] transition-transform duration-300 ease-out ${visible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="p-2">
        <a
          href="tel:02033559823"
          className="flex items-center justify-center gap-2.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-wide active:scale-[0.98] transition-transform"
          tabIndex={visible ? 0 : -1}
        >
          <Phone className="h-4 w-4 shrink-0 fill-white" />
          <span>Call 0203 355 9823</span>
        </a>
      </div>
    </div>
  );
}
