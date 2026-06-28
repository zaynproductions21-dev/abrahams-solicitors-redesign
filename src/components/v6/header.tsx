"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { navigation, type NavItem } from "@/lib/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import { HeaderSearch } from "@/components/v6/header-search";
import { Phone, Menu, ChevronDown, ArrowRight } from "lucide-react";

/**
 * Per-page nav filtering. Some pages need a leaner site nav to avoid
 * "generalist drift" — the visible nav items must match the page's
 * paid-traffic intent. The largest example: a £150/day Google Ads
 * visitor lands on /immigration-solicitors/ and seeing "Housing" in the
 * top nav signals "this firm isn't an immigration specialist", hurting
 * trust + bouncing them out before they call.
 *
 * Council 2026-06-03 (Track C) — Outsider advisor explicit; First
 * Principles + Contrarian implicit. Filter rules below scoped narrowly
 * by exact path match so other pages' nav is unaffected.
 */
function filterNavigationForPath(items: NavItem[], pathname: string | null): NavItem[] {
  if (!pathname) return items;
  // /immigration-solicitors/ — drop the top-level "Housing" item to
  // present as an immigration specialist. Housing is still reachable
  // via the footer (full site nav lives there).
  if (pathname === "/immigration-solicitors" || pathname === "/immigration-solicitors/") {
    return items.filter((i) => i.label !== "Housing");
  }
  return items;
}

function DesktopDropdown({ item }: { item: NavItem }) {
  return (
    <div className="relative group">
      <Link
        href={item.href}
        className="flex items-center gap-1 px-3 py-2 text-[13px] font-semibold tracking-wide uppercase text-brand-navy hover:text-brand-red transition-colors whitespace-nowrap"
      >
        {item.label}
        {item.children && <ChevronDown className="h-3 w-3 opacity-50" />}
      </Link>
      {item.children && (
        <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-100 p-2 min-w-[280px] max-h-[70vh] overflow-y-auto">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block px-4 py-2.5 text-sm text-brand-navy/70 hover:bg-slate-50 hover:text-brand-red rounded-xl transition-colors"
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileNavItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        className="block px-6 py-3.5 text-[15px] font-medium text-brand-navy hover:text-brand-red border-b border-slate-100"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-slate-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-6 py-3.5 text-[15px] font-medium text-brand-navy hover:text-brand-red"
      >
        {item.label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="bg-slate-50/60 pb-2">
          <Link href={item.href} onClick={onNavigate} className="block px-8 py-2.5 text-sm text-brand-navy/70 hover:text-brand-red">
            Overview
          </Link>
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onNavigate}
              className="block px-8 py-2.5 text-sm text-brand-navy/70 hover:text-brand-red"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function V6Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const filteredNavigation = filterNavigationForPath(navigation, pathname);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="md:sticky md:top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-brand-navy">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 py-2.5">
            <span className="text-xs font-medium text-white/80 tracking-wide">
              Free Immigration Consultation — Book Now
            </span>
            <Link
              href="/contact-us/"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-red hover:text-brand-red/80 transition-colors"
            >
              Get started <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/abrahams-logo.png"
                alt="Abrahams Solicitors"
                width={48}
                height={48}
                priority
                className="h-10 w-10 object-contain rounded-lg border border-slate-200 p-0.5"
              />
              <div className="leading-tight">
                <span className="block text-xl font-bold text-brand-navy tracking-tight">Abrahams</span>
                <span className="block text-[10px] font-semibold text-brand-gold uppercase tracking-[0.2em]">Solicitors</span>
              </div>
            </Link>

            <nav className="hidden xl:flex items-center mx-8">
              {filteredNavigation.map((item) => (
                <DesktopDropdown key={item.href} item={item} />
              ))}
            </nav>

            <div className="hidden xl:flex items-center gap-3">
              <HeaderSearch />
              <DynamicCallLink className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg px-5 h-10 text-sm font-semibold whitespace-nowrap">
                <Phone className="h-4 w-4 shrink-0" />
                <DynamicPhoneText />
              </DynamicCallLink>
            </div>

            <div className="flex xl:hidden items-center gap-2">
              <HeaderSearch />
              <DynamicCallLink className="inline-flex items-center justify-center rounded-xl p-2.5 text-brand-red hover:bg-brand-red/5 transition-colors" ariaLabel="Call us">
                <Phone className="h-5 w-5" />
              </DynamicCallLink>
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger aria-label="Open navigation menu" className="inline-flex items-center justify-center rounded-xl p-2.5 text-brand-navy hover:bg-slate-50 transition-colors">
                  <Menu className="h-5 w-5" />
                </SheetTrigger>
                <SheetContent side="right" className="w-[340px] p-0 overflow-y-auto">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="p-6 border-b border-slate-100">
                    <Link href="/" onClick={closeMobile} className="flex items-center gap-2">
                      <Image
                        src="/abrahams-logo.png"
                        alt="Abrahams Solicitors"
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain rounded-lg border border-slate-200 p-0.5"
                      />
                      <div className="leading-tight">
                        <span className="block text-lg font-bold text-brand-navy">Abrahams</span>
                        <span className="block text-[10px] font-semibold text-brand-gold uppercase tracking-[0.2em]">Solicitors</span>
                      </div>
                    </Link>
                  </div>
                  <nav>
                    {filteredNavigation.map((item) => (
                      <MobileNavItem key={item.href} item={item} onNavigate={closeMobile} />
                    ))}
                  </nav>
                  <div className="p-6">
                    <DynamicCallLink className="w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-semibold">
                      <Phone className="h-4 w-4" />
                      <DynamicPhoneText />
                    </DynamicCallLink>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
