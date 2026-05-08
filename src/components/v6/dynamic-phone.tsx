"use client";

import { useEffect, useState, type ReactNode, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { getTrafficSource, type TrafficSource } from "@/lib/gclid";
import { PHONE_NUMBERS, type PhoneNumber, type PhoneVariant } from "@/lib/phone-numbers";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Returns the phone variant a given pathname + source combination maps to. */
function pickVariant(pathname: string | null, source: TrafficSource): PhoneVariant {
  if (pathname && pathname.includes("/housing-disrepair")) return "housing";
  if (source === "google") return "google";
  if (source === "bing") return "bing";
  return "default";
}

/**
 * Hook returning the phone number to display for the current page + traffic
 * source. SSR-safe: returns the default number on the server and during the
 * first client render, then swaps to the correct one after hydration.
 */
export function useDisplayPhone(): { number: PhoneNumber; variant: PhoneVariant; source: TrafficSource } {
  const pathname = usePathname();
  const [state, setState] = useState<{ number: PhoneNumber; variant: PhoneVariant; source: TrafficSource }>({
    number: PHONE_NUMBERS.default,
    variant: "default",
    source: "direct",
  });

  useEffect(() => {
    const source = getTrafficSource();
    const variant = pickVariant(pathname, source);
    setState({ number: PHONE_NUMBERS[variant], variant, source });
  }, [pathname]);

  return state;
}

/** Pushes a `phone_click` event to the GTM dataLayer for attribution. */
function trackPhoneClick(number: PhoneNumber, variant: PhoneVariant, source: TrafficSource) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "phone_click",
    phone_number: number.e164,
    phone_displayed: number.display,
    phone_variant: variant,
    traffic_source: source,
  });
}

/**
 * Renders the display string of the current phone number. Use inside text
 * blocks where you need the number rendered as plain text without a link.
 */
export function DynamicPhoneText({ className }: { className?: string }) {
  const { number } = useDisplayPhone();
  // suppressHydrationWarning: server renders default, client may swap.
  return (
    <span className={className} suppressHydrationWarning>
      {number.display}
    </span>
  );
}

/**
 * Anchor element that calls the right number for the visitor's source +
 * page, fires GTM tracking on click, and accepts arbitrary children for
 * styling alongside icons.
 *
 * If `showText` is true (default), the display number is rendered as the
 * link's primary content. Pass children to override entirely (for cases
 * where the icon + text are bespoke).
 */
export function DynamicCallLink({
  className,
  style,
  children,
  showText = true,
  showIcon = false,
  iconClassName,
  ariaLabel,
}: {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  showText?: boolean;
  showIcon?: boolean;
  iconClassName?: string;
  ariaLabel?: string;
}) {
  const { number, variant, source } = useDisplayPhone();
  return (
    <a
      href={`tel:${number.tel}`}
      onClick={() => trackPhoneClick(number, variant, source)}
      className={className}
      style={style}
      aria-label={ariaLabel ?? `Call ${number.display}`}
      suppressHydrationWarning
    >
      {children ?? (
        <>
          {showIcon && <span className={iconClassName} aria-hidden="true">📞</span>}
          {showText && <span suppressHydrationWarning>{number.display}</span>}
        </>
      )}
    </a>
  );
}
