"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

interface Props {
  children: ReactNode;
  /** Tailwind/tw-animate-css animation classes applied once intersecting. */
  animation?: string;
  /** Pixel margin around viewport to trigger early. Default: -10% bottom. */
  rootMargin?: string;
  /** Render a div or other tag. */
  as?: "div" | "section";
  className?: string;
}

function subscribeReducedMotion(cb: () => void) {
  const m = window.matchMedia("(prefers-reduced-motion: reduce)");
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}
function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Single-fire intersection-observed wrapper. Honours `prefers-reduced-motion`
 * by skipping the observer entirely and rendering fully visible immediately.
 */
export function RevealOnScroll({
  children,
  animation = "animate-in fade-in-0 slide-in-from-bottom-2 duration-200",
  rootMargin = "0px 0px -10% 0px",
  as = "div",
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [intersected, setIntersected] = useState(false);
  const reduce = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false
  );

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIntersected(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin, threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, reduce]);

  const visible = reduce || intersected;
  const Tag = as;
  const cls = visible ? `${animation} ${className}` : `opacity-0 ${className}`;
  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={cls.trim()}>
      {children}
    </Tag>
  );
}
