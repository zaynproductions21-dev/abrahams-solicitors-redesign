"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { MessageSquarePlus } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { useSpamGuard } from "@/lib/spam-client";
import { submitEnquiry } from "@/lib/publishos";
import { pushFormSubmit } from "@/lib/tracking";

/**
 * QuickEnquiry — a four-field enquiry form in a bottom sheet, opened from the
 * mobile sticky bar.
 *
 * WHY THIS EXISTS. PR #61 moved the hero form below the fold on mobile and
 * organic web-form enquiries fell 52% (z = -3.00), while the channels it did
 * not touch held: WhatsApp -13%, live chat +42%, neither significant. The
 * lesson in that split is that POSITION-DEPENDENT calls to action break when a
 * layout moves and persistent ones do not. This one is reachable at any scroll
 * depth on any mobile page, including the ~80 pages that never carried a hero
 * form, so a future layout change cannot quietly switch it off.
 *
 * WHY IT LIVES IN THE STICKY BAR rather than being a new floating button: the
 * bar already solves scroll-reveal, z-index and the 68px gap that keeps it
 * clear of the chat bubble. A third floating element would compete with the
 * Call button and that bubble for the same corner of a phone screen.
 *
 * WHY IT IS NOT GREEN. #25D366 is WhatsApp's colour and is already used for
 * WhatsApp calls to action on this site; a green enquiry button reads as
 * "message us on WhatsApp" and would misdirect people into a different
 * channel — the one organic channel currently holding steady. It uses the
 * bar's existing secondary treatment instead: white with a red border.
 *
 * THE THREE THINGS IT MUST NOT DROP. The site's forms are not a shared
 * component (the homepage defines its own ConsultationForm; the landing pages
 * use HeroForm), so this re-implements their submit path deliberately and in
 * full:
 *   1. pushFormSubmit() feeds the dataLayer for Google Ads enhanced
 *      conversions. Omitting it would fix conversion while breaking conversion
 *      TRACKING — the failure mode that made the original drop hard to see.
 *   2. submitEnquiry() carries a distinct `source` so this route can be
 *      measured on its own, AND a `service` so the lead routes to the right
 *      team. Without `service` the API falls back to
 *      `serviceLine: body.serviceLine ?? body.service ?? ""`, SalesHub
 *      receives "Website enquiry", and the lead never appears in the
 *      service-filtered CRM views. The first test submission did exactly
 *      that — it reached the lead mirror with an empty serviceLine and was
 *      invisible to the immigration queue.
 *   3. useSpamGuard() + HoneypotInput. A new unprotected endpoint reachable
 *      from every page is a spam magnet.
 *
 * Copy is framed as legal services, not outcomes ("speak to a solicitor", not
 * "get your visa"), per the Google "government documents" policy guardrail and
 * SRA Code Rule 8.6 that the rest of the mobile copy already follows.
 */
/**
 * The sheet is mounted site-wide, so the service line has to come from the
 * page rather than from a field — asking a visitor to classify their own
 * matter is friction, and getting it wrong sends the lead to the wrong team.
 * The API routes to housing when this contains "housing", so the housing
 * scenario pages must resolve to it explicitly.
 */
function serviceForPath(pathname: string | null): string {
  const p = (pathname || "").toLowerCase();
  if (
    p.includes("housing") ||
    p.includes("damp-and-mould") ||
    p.includes("leaks-and-water") ||
    p.includes("pest-infestation") ||
    p.includes("disrepair")
  ) {
    return "housing disrepair";
  }
  if (p.includes("personal-injury") || p.includes("accident")) return "personal injury";
  return "immigration";
}

export function QuickEnquiry({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const spam = useSpamGuard();

  const field =
    "w-full rounded-lg border border-slate-300 px-3 h-11 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={
          className ||
          "flex items-center justify-center gap-2 bg-white border-2 border-brand-red text-brand-red rounded-lg h-12 w-full text-sm font-bold uppercase tracking-wide active:scale-[0.98] transition-transform"
        }
      >
        <MessageSquarePlus className="h-4 w-4 shrink-0" />
        <span>Enquire</span>
      </SheetTrigger>

      <SheetContent side="bottom" className="rounded-t-2xl px-5 pb-6 pt-5">
        <SheetHeader className="p-0 mb-4">
          <SheetTitle className="text-lg font-black text-slate-900 tracking-tight">
            Speak to a solicitor
          </SheetTitle>
          <SheetDescription className="text-sm text-slate-600">
            Send us the short version and we&rsquo;ll come back to you. Free first
            30 minutes, and you deal with a named solicitor.
          </SheetDescription>
        </SheetHeader>

        <form
          className="space-y-3"
          onSubmit={async e => {
            e.preventDefault();
            if (busy) return;
            setBusy(true);
            // Same order as the other forms: dataLayer first so the conversion
            // fires even if the navigation below races the network call.
            pushFormSubmit({ email, phone });
            await submitEnquiry(
              {
                source: "quick-enquiry-mobile",
                service: serviceForPath(pathname),
                name,
                email,
                phone,
                case: query,
              },
              spam.payload(),
            );
            window.location.href = `/thank-you/`;
          }}
        >
          <HoneypotInput value={spam.honeypot} onChange={spam.setHoneypot} />

          <input
            className={field}
            placeholder="Your name"
            autoComplete="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            className={field}
            type="tel"
            inputMode="tel"
            placeholder="Phone number"
            autoComplete="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
          <input
            className={field}
            type="email"
            inputMode="email"
            placeholder="Email address"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <textarea
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
            rows={3}
            placeholder="What do you need help with?"
            value={query}
            onChange={e => setQuery(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={busy}
            className="w-full h-12 rounded-lg bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white text-sm font-bold uppercase tracking-wide active:scale-[0.98] transition-transform"
          >
            {busy ? "Sending…" : "Send enquiry"}
          </button>

          <p className="text-center text-[11px] text-slate-400 leading-relaxed">
            SRA-regulated firm 809071. We&rsquo;ll only use your details to reply
            to this enquiry.
          </p>
        </form>
      </SheetContent>
    </Sheet>
  );
}
