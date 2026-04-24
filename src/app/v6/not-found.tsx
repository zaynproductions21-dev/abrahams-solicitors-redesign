import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, Phone, Mail, ArrowRight } from "lucide-react";

export const metadata = { title: "Page not found" };

const popular = [
  { label: "UK Spouse Visa Solicitors", href: "/v6/uk-spouse-visa-solicitors/" },
  { label: "British Citizenship", href: "/v6/british-citizenship-solicitors/" },
  { label: "Indefinite Leave to Remain", href: "/v6/indefinite-leave-to-remain-ilr/" },
  { label: "Housing Disrepair Claims", href: "/v6/housing-disrepair-claims/" },
  { label: "Our Fees", href: "/v6/our-fees/" },
  { label: "Free Consultation", href: "/v6/free-consultation/" },
];

export default function NotFound() {
  return (
    <>
      <section className="py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Error 404</p>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">Page not found</h1>
          <p className="mt-5 text-base text-slate-500 leading-relaxed">
            The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. If you arrived here from an old link, our most popular pages are listed below — or give us a call and we&rsquo;ll help you find what you need.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 px-6 font-bold uppercase tracking-wide">
              <Link href="/v6/"><Home className="h-4 w-4 mr-2" />Back to home</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-lg h-12 px-6 border-slate-200 hover:border-brand-red hover:text-brand-red">
              <a href="tel:02033559823"><Phone className="h-4 w-4 mr-2" />0203 355 9823</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Search className="h-4 w-4 text-brand-red" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Popular pages</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {popular.map(p => (
              <Link
                key={p.href}
                href={p.href}
                className="group flex items-center justify-between gap-3 bg-white rounded-xl border border-slate-100 px-5 py-4 hover:border-brand-red/30 hover:shadow-sm transition-all"
              >
                <span className="text-sm font-semibold text-slate-900 group-hover:text-brand-red transition-colors">{p.label}</span>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-brand-red group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mt-8">
            Still stuck? Email <a href="mailto:info@abrahamssolicitors.co.uk" className="text-brand-red font-semibold hover:underline inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />info@abrahamssolicitors.co.uk</a>
          </p>
        </div>
      </section>
    </>
  );
}
