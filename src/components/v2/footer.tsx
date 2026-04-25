import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const serviceLinks = [
  { label: "Immigration Law", href: "/v2/immigration/" },
  { label: "Spouse Visa", href: "/v2/uk-spouse-visa/" },
  { label: "British Citizenship", href: "/v2/british-citizenship/" },
  { label: "Housing Disrepair", href: "/v2/housing-disrepair/" },
  { label: "Personal Injury", href: "/v2/personal-injury/" },
  { label: "Serious Injury", href: "/v2/serious-injury-claims/" },
];

const companyLinks = [
  { label: "About Us", href: "/v2/about-us/" },
  { label: "Our Fees", href: "/v2/our-fees/" },
  { label: "Contact Us", href: "/v2/contact-us/" },
];

export function V2Footer() {
  return (
    <footer className="bg-brand-navy text-white mt-auto">
      {/* Red gradient strip */}
      <div className="h-1.5 bg-gradient-to-r from-brand-red via-brand-red-light to-brand-gold" />

      {/* Newsletter row */}
      <div className="border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-heading font-bold">Get Legal Updates</h3>
              <p className="text-white/40 text-sm mt-1">Stay informed about immigration and housing law changes.</p>
            </div>
            <div className="flex gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-80 h-12 rounded-2xl bg-white/10 border border-white/20 px-5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-red"
              />
              <Button className="bg-brand-red hover:bg-brand-red-dark text-white rounded-2xl h-12 px-6 font-bold shadow-lg shadow-brand-red/20">
                Subscribe<ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/v2/" className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-brand-red rounded-2xl flex items-center justify-center text-white font-heading text-2xl font-bold">A</div>
              <div className="leading-tight">
                <span className="block text-xl font-heading font-bold">Abrahams</span>
                <span className="block text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">Solicitors</span>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">UK immigration and housing solicitors. Fixed fees, direct solicitor access nationwide.</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-brand-gold uppercase tracking-[0.15em] mb-6">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}><Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors font-medium">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-brand-gold uppercase tracking-[0.15em] mb-6">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}><Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors font-medium">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-brand-gold uppercase tracking-[0.15em] mb-6">Contact</h3>
            <div className="space-y-4 text-sm">
              <a href="tel:02033559823" className="flex items-center gap-3 text-white/60 hover:text-brand-gold transition-colors font-medium">
                <Phone className="h-4 w-4" />0203 355 9823
              </a>
              <a href="mailto:info@abrahamssolicitors.co.uk" className="flex items-center gap-3 text-white/60 hover:text-brand-gold transition-colors font-medium">
                <Mail className="h-4 w-4" />info@abrahamssolicitors.co.uk
              </a>
              <div className="flex items-start gap-3 text-white/60">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>London EC2V 8AU<br />Bradford BD1 3LS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-6 text-center">
          <p className="text-xs text-white/25">&copy; {new Date().getFullYear()} Abrahams Solicitors. Authorised and regulated by the SRA.</p>
        </div>
      </div>
    </footer>
  );
}
