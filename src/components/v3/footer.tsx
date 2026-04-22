import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const serviceLinks = [
  { label: "Immigration Law", href: "/v3/immigration/" },
  { label: "Spouse Visa", href: "/v3/uk-spouse-visa/" },
  { label: "British Citizenship", href: "/v3/british-citizenship/" },
  { label: "Housing Disrepair", href: "/v3/housing-disrepair/" },
  { label: "Personal Injury", href: "/v3/personal-injury/" },
];

const companyLinks = [
  { label: "About Us", href: "/v3/about-us/" },
  { label: "Our Fees", href: "/v3/our-fees/" },
  { label: "Contact Us", href: "/v3/contact-us/" },
];

export function V3Footer() {
  return (
    <footer className="bg-brand-navy text-white mt-auto relative overflow-hidden">
      {/* Decorative watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] font-heading font-bold text-white/[0.02] select-none pointer-events-none">
        A
      </div>

      {/* Gold divider */}
      <div className="h-px bg-brand-gold/30" />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — Brand + Contact */}
          <div>
            <Link href="/v3/" className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-heading text-xl font-bold ring-2 ring-brand-gold bg-white/5">A</div>
              <div className="leading-tight">
                <span className="block text-xl font-heading font-bold tracking-tight">Abrahams</span>
                <span className="block text-[10px] font-semibold text-brand-gold uppercase tracking-[0.2em]">Solicitors</span>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-sm font-heading italic">
              &ldquo;Expert legal representation built on transparency, dedication, and results.&rdquo;
            </p>

            <div className="h-px bg-brand-gold/20 mb-8" />

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.2em] mb-4">London Office</p>
                <div className="flex items-start gap-3 text-sm text-white/50">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-brand-gold/40" />
                  <span>Suite 10, Atlas House,<br />1 King Street,<br />London EC2V 8AU</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.2em] mb-4">Bradford Office</p>
                <div className="flex items-start gap-3 text-sm text-white/50">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-brand-gold/40" />
                  <span>2nd Floor, 6 Piccadilly,<br />Bradford BD1 3LS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Links + Contact */}
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.2em] mb-5">Practice Areas</p>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}><Link href={link.href} className="text-sm text-white/40 hover:text-brand-gold transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.2em] mb-5">Firm</p>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}><Link href={link.href} className="text-sm text-white/40 hover:text-brand-gold transition-colors">{link.label}</Link></li>
                ))}
              </ul>

              <div className="h-px bg-brand-gold/20 my-8" />

              <div className="space-y-3 text-sm">
                <a href="tel:02034880512" className="flex items-center gap-3 text-white/50 hover:text-brand-gold transition-colors">
                  <Phone className="h-4 w-4 text-brand-gold/40" />020 3488 0512
                </a>
                <a href="mailto:info@abrahamssolicitors.co.uk" className="flex items-center gap-3 text-white/50 hover:text-brand-gold transition-colors">
                  <Mail className="h-4 w-4 text-brand-gold/40" />info@abrahamssolicitors.co.uk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-brand-gold/10" />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-6 text-center">
        <p className="text-xs text-white/20">&copy; {new Date().getFullYear()} Abrahams Solicitors. Authorised and regulated by the Solicitors Regulation Authority.</p>
      </div>
    </footer>
  );
}
