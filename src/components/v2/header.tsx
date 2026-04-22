"use client";

import Link from "next/link";
import { useState } from "react";
import { navigation, type NavItem } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Phone, Menu, ChevronDown, ArrowRight } from "lucide-react";

function DesktopDropdown({ item }: { item: NavItem }) {
  const href = item.href === "/" ? "/v2/" : `/v2${item.href}`;
  return (
    <div className="relative group">
      <Link
        href={href}
        className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-brand-navy hover:text-brand-red transition-colors"
      >
        {item.label}
        {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-50" />}
      </Link>
      {item.children && (
        <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="bg-white rounded-3xl shadow-2xl ring-1 ring-slate-100 p-3 min-w-[300px] max-h-[70vh] overflow-y-auto">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={`/v2${child.href}`}
                className="block px-4 py-3 text-sm font-medium text-brand-navy/80 hover:bg-brand-red/5 hover:text-brand-red rounded-2xl transition-colors"
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
  const href = item.href === "/" ? "/v2/" : `/v2${item.href}`;

  if (!item.children) {
    return (
      <Link href={href} className="block px-6 py-4 text-base font-semibold text-brand-navy hover:text-brand-red border-b border-slate-100">
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-slate-100">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full px-6 py-4 text-base font-semibold text-brand-navy hover:text-brand-red">
        {item.label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="bg-slate-50/60 pb-2">
          {item.children.map((child) => (
            <Link key={child.href} href={`/v2${child.href}`} className="block px-8 py-2.5 text-sm font-medium text-brand-navy/70 hover:text-brand-red">
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function V2Header() {
  return (
    <>
      {/* Red accent line */}
      <div className="h-1 bg-brand-red" />
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/v2/" className="flex items-center gap-3 shrink-0">
              <div className="w-11 h-11 bg-brand-red rounded-2xl flex items-center justify-center text-white font-heading text-2xl font-bold shadow-lg shadow-brand-red/20">
                A
              </div>
              <div className="leading-tight">
                <span className="block text-xl font-heading font-bold text-brand-navy tracking-tight">Abrahams</span>
                <span className="block text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">Solicitors</span>
              </div>
            </Link>

            <nav className="hidden xl:flex items-center">
              {navigation.map((item) => (
                <DesktopDropdown key={item.href} item={item} />
              ))}
            </nav>

            <div className="hidden xl:flex items-center gap-5">
              <a href="tel:02034880512" className="text-sm font-bold text-brand-navy hover:text-brand-red transition-colors">
                020 3488 0512
              </a>
              <Button asChild className="bg-brand-red hover:bg-brand-red-dark text-white rounded-2xl px-8 h-12 text-sm font-bold shadow-lg shadow-brand-red/20">
                <Link href="/v2/contact-us/">Free Consultation<ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
            </div>

            <div className="flex xl:hidden items-center gap-2">
              <a href="tel:02034880512" className="inline-flex items-center justify-center rounded-2xl p-2.5 text-brand-red" aria-label="Call us">
                <Phone className="h-5 w-5" />
              </a>
              <Sheet>
                <SheetTrigger className="inline-flex items-center justify-center rounded-2xl p-2.5 text-brand-navy hover:bg-slate-50">
                  <Menu className="h-6 w-6" />
                </SheetTrigger>
                <SheetContent side="right" className="w-[360px] p-0 overflow-y-auto">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="p-6 border-b border-slate-100 bg-brand-navy">
                    <Link href="/v2/" className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-red rounded-2xl flex items-center justify-center text-white font-heading font-bold text-xl">A</div>
                      <div className="leading-tight">
                        <span className="block text-lg font-heading font-bold text-white">Abrahams</span>
                        <span className="block text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">Solicitors</span>
                      </div>
                    </Link>
                  </div>
                  <nav>{navigation.map((item) => <MobileNavItem key={item.href} item={item} />)}</nav>
                  <div className="p-6 space-y-3">
                    <Button asChild className="w-full bg-brand-red hover:bg-brand-red-dark text-white rounded-2xl h-14 text-base font-bold">
                      <Link href="/v2/contact-us/">Free Consultation</Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
