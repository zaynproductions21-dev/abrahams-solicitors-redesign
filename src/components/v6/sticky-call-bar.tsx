"use client";

import { useEffect, useState } from "react";
import { Phone, ClipboardCheck } from "lucide-react";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";

const SHOW_AT = 240; // px scrolled before the bar appears

/**
 * Mobile-only sticky bottom CTA. Slides up once the visitor has scrolled
 * past the hero, slides down when they go back to the top. Reserves a
 * right strip so it doesn't collide with the chat bubble.
 *
 * Renders a Call button by default. If the current page has a wizard
 * anchor (#qualifier, #wizard, #free-check), also renders a secondary
 * "Free check" button that scrolls to it — adds the low-friction
 * alternative for tenants who don't want to ring at 9pm.
 *
 * The Call number is the source-aware DNI number.
 */
export function StickyCallBar() {
  const [visible, setVisible] = useState(false);
  const [wizardAnchor, setWizardAnchor] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AT);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const candidate = ["qualifier", "wizard", "free-check"].find(id =>
      document.getElementById(id),
    );
    // One-time DOM detection on mount; setState is the right tool here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWizardAnchor(candidate ? `#${candidate}` : null);
  }, []);

  return (
    <div
      inert={!visible}
      className={`md:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-200 shadow-[0_-4px_18px_rgba(15,23,42,0.08)] pr-[68px] transition-transform duration-300 ease-out ${visible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className={`p-2 ${wizardAnchor ? "grid grid-cols-2 gap-2" : ""}`}>
        <DynamicCallLink
          className="flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-wide active:scale-[0.98] transition-transform"
        >
          <Phone className="h-4 w-4 shrink-0 fill-white" />
          <span>{wizardAnchor ? "Call" : <>Call <DynamicPhoneText /></>}</span>
        </DynamicCallLink>
        {wizardAnchor && (
          <a
            href={wizardAnchor}
            className="flex items-center justify-center gap-2 bg-white border-2 border-brand-red text-brand-red rounded-lg h-12 text-sm font-bold uppercase tracking-wide active:scale-[0.98] transition-transform"
          >
            <ClipboardCheck className="h-4 w-4 shrink-0" />
            <span>Free check</span>
          </a>
        )}
      </div>
    </div>
  );
}
