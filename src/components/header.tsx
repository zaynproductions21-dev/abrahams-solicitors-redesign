"use client";

import Link from "next/link";
import { useState } from "react";
import { navigation, type NavItem } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Phone, Menu, ChevronDown, MapPin } from "lucide-react";

function DesktopDropdown({ item }: { item: NavItem }) {
  return (
    <div className="relative group">
      <Link
        href={item.href}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-brand-navy hover:text-brand-red transition-colors"
      >
        {item.label}
        {item.children && <ChevronDown className="h-3.5 w-3.5" />}
      </Link>
      {item.children && (
        <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="bg-white rounded-lg shadow-lg border border-border p-2 min-w-[260px] max-h-[70vh] overflow-y-auto">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block px-3 py-2 text-sm text-brand-navy hover:bg-muted hover:text-brand-red rounded-md transition-colors"
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

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="block px-4 py-3 text-base font-medium text-brand-navy hover:text-brand-red border-b border-border"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-brand-navy hover:text-brand-red"
      >
        {item.label}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="bg-muted pb-2">
          <Link
            href={item.href}
            className="block px-6 py-2 text-sm text-brand-navy hover:text-brand-red"
          >
            Overview
          </Link>
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-6 py-2 text-sm text-brand-navy hover:text-brand-red"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      {/* Top bar */}
      <div className="bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-10 text-sm">
          <div className="flex items-center gap-4">
            <a
              href="tel:02034880512"
              className="flex items-center gap-1.5 hover:text-brand-gold transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              020 3488 0512
            </a>
            <span className="hidden sm:inline text-white/40">|</span>
            <div className="hidden sm:flex items-center gap-1.5 text-white/80">
              <MapPin className="h-3.5 w-3.5" />
              London &amp; Bradford
            </div>
          </div>
          <Link
            href="/contact-us/"
            className="hidden sm:inline text-brand-gold hover:text-brand-gold-light font-medium transition-colors"
          >
            Free Consultation
          </Link>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-brand-red rounded-lg flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div className="leading-tight">
                <span className="block text-lg font-bold text-brand-navy tracking-tight">
                  Abrahams
                </span>
                <span className="block text-[11px] font-medium text-brand-gold uppercase tracking-wider">
                  Solicitors
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center">
            {navigation.map((item) => (
              <DesktopDropdown key={item.href} item={item} />
            ))}
          </nav>

          {/* Desktop: phone + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:02034880512"
              className="flex items-center gap-1.5 text-sm font-semibold text-brand-navy hover:text-brand-red transition-colors"
            >
              <Phone className="h-4 w-4 text-brand-red" />
              020 3488 0512
            </a>
            <Button asChild size="sm" className="bg-brand-red hover:bg-brand-red-dark text-white">
              <Link href="/contact-us/">Make an Appointment</Link>
            </Button>
          </div>

          {/* Mobile: phone + burger */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="tel:02034880512"
              className="inline-flex items-center justify-center rounded-lg p-2 text-brand-red hover:bg-brand-red/10 transition-colors"
              aria-label="Call us"
            >
              <Phone className="h-5 w-5" />
            </a>
            <Sheet>
              <SheetTrigger className="inline-flex items-center justify-center rounded-lg p-2 text-brand-navy hover:bg-accent transition-colors">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] p-0 overflow-y-auto">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="p-4 border-b border-border">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    <span className="text-lg font-bold text-brand-navy">
                      Abrahams Solicitors
                    </span>
                  </Link>
                </div>
                <nav>
                  {navigation.map((item) => (
                    <MobileNavItem key={item.href} item={item} />
                  ))}
                </nav>
                <div className="p-4 space-y-3">
                  <Button
                    asChild
                    className="w-full bg-brand-red hover:bg-brand-red-dark text-white"
                  >
                    <Link href="/contact-us/">Make an Appointment</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href="tel:02034880512">
                      <Phone className="h-4 w-4 mr-2" />
                      020 3488 0512
                    </a>
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
