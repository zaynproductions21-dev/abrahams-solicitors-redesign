import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const serviceLinks = [
  { label: "Immigration Services", href: "/immigration/" },
  { label: "Housing Disrepair", href: "/housing-disrepair/" },
  { label: "Personal Injury", href: "/personal-injury/" },
  { label: "Accidents at Work", href: "/accidents-at-work/" },
  { label: "Serious Injury Claims", href: "/serious-injury-claims/" },
  { label: "Car Accident Claims", href: "/car-accidents-claims/" },
];

const companyLinks = [
  { label: "About Us", href: "/about-us/" },
  { label: "Our Fees", href: "/our-fees/" },
  { label: "Blog", href: "/blog/" },
  { label: "Careers", href: "/careers/" },
  { label: "Refer a Friend", href: "/refer-a-friend/" },
  { label: "Contact Us", href: "/contact-us/" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms of Business", href: "/terms-of-business/" },
  { label: "Website Legal Notice", href: "/website-legal-notice/" },
  { label: "Cookie Policy", href: "/cookie-policy/" },
];

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & contact */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 bg-brand-red rounded-lg flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div className="leading-tight">
                <span className="block text-lg font-bold tracking-tight">Abrahams</span>
                <span className="block text-[11px] font-medium text-brand-gold uppercase tracking-wider">
                  Solicitors
                </span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Expert immigration and housing law solicitors serving London and
              Bradford. We make our clients&apos; goals and challenges our own.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href="tel:02034880512"
                className="flex items-center gap-2 text-white/80 hover:text-brand-gold transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                020 3488 0512
              </a>
              <a
                href="mailto:info@abrahamssolicitors.co.uk"
                className="flex items-center gap-2 text-white/80 hover:text-brand-gold transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                info@abrahamssolicitors.co.uk
              </a>
              <div className="flex items-start gap-2 text-white/80">
                <Clock className="h-4 w-4 shrink-0 mt-0.5" />
                Mon - Fri: 9:00am - 5:30pm
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-brand-gold mb-4">Our Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-brand-gold mb-4">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-semibold text-brand-gold mb-4">Our Offices</h3>
            <div className="space-y-5">
              <div>
                <p className="font-medium text-sm mb-1">London Office</p>
                <div className="flex items-start gap-2 text-sm text-white/70">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>
                    Suite 10, Atlas House,
                    <br />1 King Street, London EC2V 8AU
                  </span>
                </div>
              </div>
              <div>
                <p className="font-medium text-sm mb-1">Bradford Office</p>
                <div className="flex items-start gap-2 text-sm text-white/70">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>
                    2nd Floor, 6 Piccadilly,
                    <br />Bradford BD1 3LS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} Abrahams Solicitors. All rights
            reserved. Authorised and regulated by the Solicitors Regulation
            Authority.
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/50 hover:text-white/80 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
