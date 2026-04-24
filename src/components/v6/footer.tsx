import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SraBadge } from "./sra-badge";

const immigrationLinks = [
  { label: "Spouse Visa Services", href: "/v6/uk-spouse-visa/" },
  { label: "British Citizenship", href: "/v6/british-citizenship/" },
  { label: "Visa Appeals & Reviews", href: "/v6/immigration/" },
  { label: "Asylum & Human Rights", href: "/v6/asylum-applications/" },
];

const otherLinks = [
  { label: "Housing Disrepair", href: "/v6/housing-disrepair/" },
  { label: "Workplace Accidents", href: "/v6/accidents-at-work/" },
  { label: "Road Traffic Claims", href: "/v6/car-accidents-claims/" },
  { label: "Serious Injury", href: "/v6/serious-injury-claims/" },
];

const quickLinks = [
  { label: "About Us", href: "/v6/about-us/" },
  { label: "Our Fees", href: "/v6/our-fees/" },
  { label: "Blog", href: "/v6/blog/" },
  { label: "Press Releases", href: "/v6/press-releases/" },
  { label: "Newsletter", href: "/v6/newsletter/" },
  { label: "FAQs", href: "/v6/faqs/" },
  { label: "Refer a Friend", href: "/v6/refer-a-friend/" },
  { label: "Careers", href: "/v6/careers/" },
  { label: "Free Consultation", href: "/v6/free-consultation/" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/v6/privacy-policy/" },
  { label: "Terms of Business", href: "/v6/terms-of-business/" },
  { label: "Cookie Policy", href: "/v6/cookie-policy/" },
  { label: "Website Legal Notice", href: "/v6/website-legal-notice/" },
];

export function V6Footer() {
  return (
    <footer className="bg-brand-navy text-white mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Link href="/v6/" className="flex items-center gap-2 mb-8">
              <Image src="/abrahams-logo.png" alt="Abrahams Solicitors" width={40} height={40} className="h-10 w-10 object-contain bg-white rounded-lg p-1" />
              <div className="leading-tight">
                <span className="block text-xl font-bold tracking-tight">Abrahams</span>
                <span className="block text-[10px] font-semibold text-brand-gold uppercase tracking-[0.2em]">Solicitors</span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              UK immigration and housing solicitors. Fixed fees, direct solicitor access, and a commitment to achieving the best outcomes for our clients.
            </p>
            <div className="mb-6">
              <SraBadge />
            </div>
            <div className="space-y-3 text-sm">
              <a href="tel:02034880512" className="flex items-center gap-3 text-white/70 hover:text-brand-gold transition-colors">
                <Phone className="h-4 w-4 shrink-0" />020 3488 0512
              </a>
              <a href="mailto:info@abrahamssolicitors.co.uk" className="flex items-center gap-3 text-white/70 hover:text-brand-gold transition-colors">
                <Mail className="h-4 w-4 shrink-0" />info@abrahamssolicitors.co.uk
              </a>
              <div className="flex items-start gap-3 text-white/70">
                <Clock className="h-4 w-4 shrink-0 mt-0.5" />Mon &ndash; Fri: 9:00am &ndash; 5:30pm
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-5">Immigration Law</h3>
                <ul className="space-y-2.5">
                  {immigrationLinks.map((link) => (
                    <li key={link.label}><Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">{link.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-5">Other Services</h3>
                <ul className="space-y-2.5">
                  {otherLinks.map((link) => (
                    <li key={link.label}><Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">{link.label}</Link></li>
                  ))}
                </ul>
                <h3 className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-5 mt-8">Quick Links</h3>
                <ul className="space-y-2.5">
                  {quickLinks.map((link) => (
                    <li key={link.label}><Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">{link.label}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-5">London Office</h3>
            <div className="flex items-start gap-3 text-sm text-white/50 mb-8">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-white/30" />
              <span>Suite 10, Atlas House,<br />1 King Street,<br />London EC2V 8AU</span>
            </div>
            <h3 className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-5">Bradford Office</h3>
            <div className="flex items-start gap-3 text-sm text-white/50">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-white/30" />
              <span>2nd Floor, 6 Piccadilly,<br />Bradford BD1 3LS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">&copy; {new Date().getFullYear()} Abrahams Solicitors. All rights reserved. Authorised and regulated by the Solicitors Regulation Authority.</p>
          <div className="flex items-center gap-5">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-white/30 hover:text-white/60 transition-colors">{link.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
