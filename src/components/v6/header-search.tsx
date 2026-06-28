"use client";

/**
 * Header search — magnifying-glass button that opens a centred overlay
 * with a search input and live page suggestions. ⌘K / Ctrl+K toggles.
 *
 * Search runs entirely client-side over src/lib/search-index.ts; no network
 * round-trip. Top 6 matches are shown, ranked by title-prefix > title-
 * substring > other. Arrow keys navigate, Enter activates, Esc closes.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { searchPages, type SearchEntry } from "@/lib/search-index";

export function HeaderSearch({
  variant = "icon",
}: {
  variant?: "icon" | "iconLight";
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [results, setResults] = useState<SearchEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // ⌘K / Ctrl+K toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus input when opened; reset state when closed; lock body scroll so
  // the page underneath doesn't scroll when the user scrolls the result list.
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    setQuery("");
    setResults([]);
    setSelectedIdx(0);
  }, [open]);

  // Re-run search whenever the query changes
  useEffect(() => {
    setResults(searchPages(query));
    setSelectedIdx(0);
  }, [query]);

  const go = useCallback(
    (entry: SearchEntry) => {
      setOpen(false);
      router.push(entry.href);
    },
    [router]
  );

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, Math.max(0, results.length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" && results[selectedIdx]) {
      e.preventDefault();
      go(results[selectedIdx]);
    }
  };

  const btnClass =
    variant === "iconLight"
      ? "inline-flex items-center justify-center rounded-xl p-2.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
      : "inline-flex items-center justify-center rounded-xl p-2.5 text-brand-navy hover:bg-slate-50 transition-colors";

  return (
    <>
      <button
        type="button"
        aria-label="Search pages"
        onClick={() => setOpen(true)}
        className={btnClass}
      >
        <Search className="h-5 w-5" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search pages"
          className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-8 bg-slate-900/50 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="w-full max-w-2xl mt-12 sm:mt-24 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            {/* Input row */}
            <div className="flex items-center gap-3 px-4 sm:px-5 py-3 border-b border-slate-100">
              <Search className="h-5 w-5 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search pages — try 'spouse visa', 'fees', 'reviews'..."
                className="flex-1 min-w-0 text-base sm:text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="hidden sm:inline text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                ESC
              </kbd>
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center h-8 w-8 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results / empty / hint */}
            {query && results.length === 0 && (
              <div className="px-5 py-8 text-center text-sm text-slate-500">
                No pages match <strong className="text-slate-700">&ldquo;{query}&rdquo;</strong>.
                Try a shorter phrase, or{" "}
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    router.push("/contact-us/");
                  }}
                  className="text-brand-red font-semibold hover:underline"
                >
                  contact us directly
                </button>
                .
              </div>
            )}

            {!query && (
              <div className="px-5 py-4 text-xs text-slate-400">
                Start typing to find any page.{" "}
                <kbd className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">↑</kbd>{" "}
                <kbd className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">↓</kbd>{" "}
                to navigate,{" "}
                <kbd className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">⏎</kbd>{" "}
                to open.
              </div>
            )}

            {results.length > 0 && (
              <ul className="max-h-[60vh] overflow-y-auto">
                {results.map((r, i) => {
                  const isActive = i === selectedIdx;
                  return (
                    <li key={r.href}>
                      <button
                        type="button"
                        onClick={() => go(r)}
                        onMouseEnter={() => setSelectedIdx(i)}
                        className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                          isActive ? "bg-brand-red/5" : "hover:bg-slate-50"
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-slate-900 truncate">{r.title}</p>
                            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
                              {r.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 truncate">{r.description}</p>
                        </div>
                        <ArrowRight
                          className={`h-4 w-4 shrink-0 transition-colors ${
                            isActive ? "text-brand-red" : "text-slate-300"
                          }`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
