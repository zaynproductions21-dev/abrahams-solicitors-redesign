"use client";

import Link from "next/link";
import { useState } from "react";
import { navigation, type NavItem } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Phone, Menu, ChevronDown } from "lucide-react";

function DesktopDropdown({ item }: { item: NavItem }) {
  const href = item.href === "/" ? "/v1/" : `/v1${item.href}`;
  return (
    <div className="relative group">
      <Link
        href={href}
        className="flex items-center gap-1 px-4 py-2 text-[13px] font-medium tracking-wide uppercase text-brand-navy/70 hover:text-brand-red transition-colors"
      >
        {item.label}
        {item.children && <ChevronDown className="h-3 w-3 opacity-40" />}
      </Link>
      {item.children && (
        <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-100 p-2 min-w-[280px] max-h-[70vh] overflow-y-auto">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={`/v1${child.href}`}
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

function MobileNavItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const href = item.href === "/" ? "/v1/" : `/v1${item.href}`;

  if (!item.children) {
    return (
      <Link
        href={href}
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
          <Link href={href} className="block px-8 py-2.5 text-sm text-brand-navy/70 hover:text-brand-red">
            Overview
          </Link>
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={`/v1${child.href}`}
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

export function V1Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/v1/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center text-white font-heading text-xl font-bold">
              A
            </div>
            <div className="leading-tight">
              <span className="block text-xl font-heading font-bold text-brand-navy tracking-tight">Abrahams</span>
              <span className="block text-[10px] font-semibold text-brand-gold uppercase tracking-[0.2em]">Solicitors</span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center">
            {navigation.map((item) => (
              <DesktopDropdown key={item.href} item={item} />
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-5">
            <a href="tel:02034880512" className="text-sm font-medium text-brand-navy/60 hover:text-brand-red transition-colors">
              020 3488 0512
            </a>
            <Button asChild size="sm" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl px-6 h-10 text-sm">
              <Link href="/v1/contact-us/">Free Consultation</Link>
            </Button>
          </div>

          <div className="flex xl:hidden items-center gap-2">
            <a href="tel:02034880512" className="inline-flex items-center justify-center rounded-xl p-2.5 text-brand-red hover:bg-brand-red/5 transition-colors" aria-label="Call us">
              <Phone className="h-5 w-5" />
            </a>
            <Sheet>
              <SheetTrigger className="inline-flex items-center justify-center rounded-xl p-2.5 text-brand-navy hover:bg-slate-50 transition-colors">
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[340px] p-0 overflow-y-auto">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="p-6 border-b border-slate-100">
                  <Link href="/v1/" className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-brand-red rounded-xl flex items-center justify-center text-white font-heading font-bold text-lg">A</div>
                    <div className="leading-tight">
                      <span className="block text-lg font-heading font-bold text-brand-navy">Abrahams</span>
                      <span className="block text-[10px] font-semibold text-brand-gold uppercase tracking-[0.2em]">Solicitors</span>
                    </div>
                  </Link>
                </div>
                <nav>
                  {navigation.map((item) => (
                    <MobileNavItem key={item.href} item={item} />
                  ))}
                </nav>
                <div className="p-6 space-y-3">
                  <Button asChild className="w-full bg-brand-red hover:bg-brand-red-dark text-white rounded-xl h-12">
                    <Link href="/v1/contact-us/">Free Consultation</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full rounded-xl h-12">
                    <a href="tel:02034880512"><Phone className="h-4 w-4 mr-2" />020 3488 0512</a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
