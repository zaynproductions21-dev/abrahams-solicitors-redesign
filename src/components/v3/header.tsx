"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { navigation, type NavItem } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Phone, Menu, ChevronDown } from "lucide-react";

function DesktopDropdown({ item, scrolled }: { item: NavItem; scrolled: boolean }) {
  const href = item.href === "/" ? "/v3/" : `/v3${item.href}`;
  return (
    <div className="relative group">
      <Link
        href={href}
        className={`flex items-center gap-1 px-4 py-2 text-[13px] font-medium tracking-wide transition-colors relative ${
          scrolled ? "text-brand-navy/70 hover:text-brand-gold" : "text-white/70 hover:text-brand-gold"
        }`}
      >
        {item.label}
        {item.children && <ChevronDown className="h-3 w-3 opacity-40" />}
        <span className="absolute bottom-0 left-4 right-4 h-px bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </Link>
      {item.children && (
        <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="bg-white rounded-xl shadow-xl ring-1 ring-brand-gold/20 p-2 min-w-[280px] max-h-[70vh] overflow-y-auto">
            {item.children.map((child) => (
              <Link key={child.href} href={`/v3${child.href}`} className="block px-4 py-2.5 text-sm text-brand-navy/70 hover:text-brand-gold hover:bg-brand-gold/5 rounded-lg transition-colors">
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
  const href = item.href === "/" ? "/v3/" : `/v3${item.href}`;

  if (!item.children) {
    return (
      <Link href={href} className="block px-6 py-3.5 text-[15px] font-medium text-brand-navy hover:text-brand-gold border-b border-brand-gold/10">
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-brand-gold/10">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full px-6 py-3.5 text-[15px] font-medium text-brand-navy hover:text-brand-gold">
        {item.label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="bg-[#faf9f6] pb-2">
          {item.children.map((child) => (
            <Link key={child.href} href={`/v3${child.href}`} className="block px-8 py-2.5 text-sm text-brand-navy/70 hover:text-brand-gold">
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function V3Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/v3/" className="flex items-center gap-3 shrink-0">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-heading text-xl font-bold transition-colors ring-2 ring-brand-gold ${
              scrolled ? "bg-brand-navy text-white" : "bg-white/10 text-white backdrop-blur-sm"
            }`}>
              A
            </div>
            <div className="leading-tight">
              <span className={`block text-xl font-heading font-bold tracking-tight transition-colors ${scrolled ? "text-brand-navy" : "text-white"}`}>Abrahams</span>
              <span className="block text-[10px] font-semibold text-brand-gold uppercase tracking-[0.2em]">Solicitors</span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center">
            {navigation.map((item) => <DesktopDropdown key={item.href} item={item} scrolled={scrolled} />)}
          </nav>

          <div className="hidden xl:flex items-center gap-5">
            <a href="tel:02033559823" className={`text-sm font-medium transition-colors ${scrolled ? "text-brand-navy/60 hover:text-brand-gold" : "text-white/60 hover:text-brand-gold"}`}>
              0203 355 9823
            </a>
            <Button asChild size="sm" className="bg-transparent hover:bg-brand-gold/10 text-brand-gold border-2 border-brand-gold rounded-xl px-6 h-10 text-sm font-semibold">
              <Link href="/v3/contact-us/">Begin Consultation</Link>
            </Button>
          </div>

          <div className="flex xl:hidden items-center gap-2">
            <a href="tel:02033559823" className={`inline-flex items-center justify-center rounded-xl p-2.5 transition-colors ${scrolled ? "text-brand-gold" : "text-brand-gold"}`} aria-label="Call us">
              <Phone className="h-5 w-5" />
            </a>
            <Sheet>
              <SheetTrigger className={`inline-flex items-center justify-center rounded-xl p-2.5 transition-colors ${scrolled ? "text-brand-navy" : "text-white"}`}>
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[340px] p-0 overflow-y-auto bg-[#faf9f6]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="p-6 border-b border-brand-gold/20">
                  <Link href="/v3/" className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-brand-navy rounded-lg flex items-center justify-center text-white font-heading font-bold text-lg ring-2 ring-brand-gold">A</div>
                    <div className="leading-tight">
                      <span className="block text-lg font-heading font-bold text-brand-navy">Abrahams</span>
                      <span className="block text-[10px] font-semibold text-brand-gold uppercase tracking-[0.2em]">Solicitors</span>
                    </div>
                  </Link>
                </div>
                <nav>{navigation.map((item) => <MobileNavItem key={item.href} item={item} />)}</nav>
                <div className="p-6 space-y-3">
                  <Button asChild className="w-full bg-brand-navy hover:bg-brand-navy-light text-white rounded-xl h-12">
                    <Link href="/v3/contact-us/">Begin Consultation</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      {/* Thin gold line */}
      <div className={`h-px transition-colors ${scrolled ? "bg-brand-gold/20" : "bg-white/10"}`} />
    </header>
  );
}
