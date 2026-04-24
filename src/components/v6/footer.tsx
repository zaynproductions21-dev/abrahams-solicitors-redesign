import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SraBadge } from "./sra-badge";
import { FooterNewsletter } from "./footer-newsletter";

const SocialIcon = ({ name }: { name: "facebook" | "twitter" | "linkedin" | "instagram" | "youtube" }) => {
  const paths: Record<string, React.ReactNode> = {
    facebook: <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />,
    twitter: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
    linkedin: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
    instagram: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />,
    youtube: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />,
  };
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">{paths[name]}</svg>
  );
};

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

const socialLinks: { label: string; href: string; icon: "facebook" | "twitter" | "linkedin" | "instagram" | "youtube" }[] = [
  { label: "Facebook", href: "https://www.facebook.com/AbrahamsSolicitors/", icon: "facebook" },
  { label: "X (Twitter)", href: "https://x.com/Abrahamssolic", icon: "twitter" },
  { label: "Instagram", href: "https://www.instagram.com/AbrahamsSolicitors/", icon: "instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/brahamssolicitors", icon: "linkedin" },
  { label: "YouTube", href: "https://www.youtube.com/@AbrahamsSolicitors", icon: "youtube" },
];

const offices = [
  { city: "London", address: "Suite 10, Atlas House,\n1 King Street,\nLondon EC2V 8AU" },
  { city: "Bradford", address: "Unit 20, Listerhills Science Park,\nCampus Road, Bradford BD7 1HR" },
];

function VisaLogo() {
  return (
    <svg viewBox="0 0 48 32" className="h-8 w-12 rounded-md bg-white">
      <text x="24" y="22" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontStyle="italic" fontSize="13" fill="#1a1f71" letterSpacing="0.5">VISA</text>
    </svg>
  );
}
function MastercardLogo() {
  return (
    <svg viewBox="0 0 48 32" className="h-8 w-12 rounded-md bg-white">
      <circle cx="20" cy="16" r="8" fill="#eb001b" />
      <circle cx="28" cy="16" r="8" fill="#f79e1b" fillOpacity="0.9" />
      <path d="M24 10a8 8 0 0 0 0 12 8 8 0 0 0 0-12z" fill="#ff5f00" />
    </svg>
  );
}
function AmexLogo() {
  return (
    <svg viewBox="0 0 48 32" className="h-8 w-12 rounded-md">
      <rect width="48" height="32" rx="3" fill="#2e77bb" />
      <text x="24" y="20" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="9" fill="#fff" letterSpacing="0.3">AMEX</text>
    </svg>
  );
}
function ApplePayLogo() {
  return (
    <svg viewBox="0 0 48 32" className="h-8 w-12 rounded-md bg-white">
      <g transform="translate(7 9)" fill="#000">
        <path d="M5.05 1.84c.47-.56.77-1.33.7-2.09-.66.03-1.46.44-1.94 1.01-.42.5-.8 1.28-.7 2.03.73.05 1.47-.37 1.94-.95zm.7.96c-1.08-.06-2 .61-2.52.61-.52 0-1.3-.58-2.14-.56-1.1.01-2.12.64-2.68 1.63-1.15 1.99-.29 4.94.81 6.56.54.8 1.19 1.68 2.03 1.65.82-.03 1.12-.53 2.1-.53s1.26.53 2.13.51c.88-.02 1.44-.8 1.97-1.6.62-.91.88-1.8.89-1.84-.02-.02-1.71-.65-1.72-2.58-.02-1.61 1.32-2.38 1.38-2.42-.76-1.12-1.94-1.25-2.35-1.28z" />
        <text x="11" y="11" fontFamily="-apple-system, SF Pro Display, Helvetica" fontWeight="600" fontSize="8">Pay</text>
      </g>
    </svg>
  );
}
function GooglePayLogo() {
  return (
    <svg viewBox="0 0 48 32" className="h-8 w-12 rounded-md bg-white">
      <g transform="translate(5 10)">
        <path fill="#4285F4" d="M5.5 2.5v1.7h2.35c-.09.53-.39.97-.82 1.27v1.05h1.32c.77-.71 1.22-1.76 1.22-3 0-.29-.03-.57-.08-.83h-3.99z"/>
        <path fill="#34A853" d="M5.5 7.5c1.11 0 2.04-.37 2.72-1l-1.32-1.05c-.37.25-.83.39-1.4.39-1.07 0-1.98-.72-2.3-1.7h-1.36v1.08c.68 1.36 2.07 2.28 3.66 2.28z"/>
        <path fill="#FBBC04" d="M3.2 4.14c-.17-.52-.17-1.08 0-1.6v-1.08H1.84c-.58 1.14-.58 2.48 0 3.62l1.36-1.08z"/>
        <path fill="#EA4335" d="M5.5 1.34c.6 0 1.14.21 1.57.62l1.17-1.17c-.71-.66-1.63-1.06-2.74-1.06-1.6 0-2.98.92-3.66 2.26l1.36 1.06c.32-.98 1.23-1.71 2.3-1.71z"/>
        <text x="11" y="6.5" fontFamily="-apple-system, Roboto, Helvetica" fontWeight="500" fontSize="7" fill="#5f6368">Pay</text>
      </g>
    </svg>
  );
}

const PAYMENT_LOGOS = [
  { label: "Visa", Logo: VisaLogo },
  { label: "Mastercard", Logo: MastercardLogo },
  { label: "American Express", Logo: AmexLogo },
  { label: "Apple Pay", Logo: ApplePayLogo },
  { label: "Google Pay", Logo: GooglePayLogo },
];

export function V6Footer() {
  return (
    <footer className="bg-brand-navy text-white mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand + SRA + contact */}
          <div className="lg:col-span-4">
            <Link href="/v6/" className="flex items-center gap-2 mb-6">
              <Image src="/abrahams-logo.png" alt="Abrahams Solicitors" width={40} height={40} className="h-10 w-10 object-contain bg-white rounded-lg p-1 border border-white/10" />
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
            <div className="space-y-2.5 text-sm">
              <a href="tel:02034880512" className="flex items-center gap-3 text-white/70 hover:text-brand-gold transition-colors">
                <Phone className="h-4 w-4 shrink-0" />020 3488 0512
              </a>
              <a href="mailto:info@abrahamssolicitors.co.uk" className="flex items-center gap-3 text-white/70 hover:text-brand-gold transition-colors">
                <Mail className="h-4 w-4 shrink-0" />info@abrahamssolicitors.co.uk
              </a>
              <div className="flex items-start gap-3 text-white/70">
                <Clock className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <p>Mon &ndash; Fri: 9:00am &ndash; 5:00pm</p>
                  <p className="text-xs text-brand-gold mt-0.5">New enquiries: 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services + Quick links */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Immigration</h3>
                <ul className="space-y-2">
                  {immigrationLinks.map(l => (
                    <li key={l.label}><Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">{l.label}</Link></li>
                  ))}
                </ul>
                <h3 className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4 mt-6">Other Services</h3>
                <ul className="space-y-2">
                  {otherLinks.map(l => (
                    <li key={l.label}><Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">{l.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {quickLinks.map(l => (
                    <li key={l.label}><Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">{l.label}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Offices + newsletter */}
          <div className="lg:col-span-4 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {offices.map(office => (
                <div key={office.city}>
                  <h3 className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-3">{office.city}</h3>
                  <div className="flex items-start gap-2.5 text-sm text-white/50 mb-2">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-white/30" />
                    <span className="whitespace-pre-line">{office.address}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-white/40">
                    <Clock className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span>Mon – Fri · 9am – 5pm</span>
                  </div>
                </div>
              ))}
            </div>

            <FooterNewsletter />
          </div>
        </div>

        {/* Social + payment methods row */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            {socialLinks.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-gold hover:border-brand-gold/40 transition-colors"
              >
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40">We Accept</span>
            <div className="flex items-center gap-1.5">
              {PAYMENT_LOGOS.map(({ label, Logo }) => (
                <span key={label} aria-label={label} title={label}><Logo /></span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">&copy; {new Date().getFullYear()} Abrahams Solicitors. All rights reserved. Authorised and regulated by the SRA (firm #809071).</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legalLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-xs text-white/30 hover:text-white/60 transition-colors">{link.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
