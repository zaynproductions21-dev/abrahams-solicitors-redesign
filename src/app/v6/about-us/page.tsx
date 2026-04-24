import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone, MapPin, Clock } from "lucide-react";
import { TrustBadges } from "@/components/v6/trust-badges";
import { OfficeMap } from "@/components/v6/office-map";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet the experienced legal team at Abrahams Solicitors. Immigration, housing, and personal injury specialists in London and Bradford.",
};

const values = [
  { title: "Client-First Approach", desc: "Every decision we make is guided by what is best for our clients." },
  { title: "Transparency", desc: "Fixed fees and honest advice — no hidden costs, no surprises." },
  { title: "Expertise", desc: "Deep specialism in immigration, housing, and personal injury law." },
  { title: "Accessibility", desc: "Direct solicitor access with offices in London and Bradford." },
];

export default function V1AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">About Us</p>
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            A Team Dedicated to Your Success
          </h1>
          <p className="mt-6 text-lg text-white/50 max-w-2xl leading-relaxed">
            Abrahams Solicitors provides expert legal representation in immigration, housing disrepair, and personal injury across the UK.
          </p>
        </div>
      </section>

      <TrustBadges />

      {/* Firm imagery slot */}
      <section className="py-0">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 -mt-2">
          <div className="rounded-3xl overflow-hidden aspect-[21/9] bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/placeholders/about-firm.svg"
              alt="Abrahams Solicitors — interior of the London office with solicitors meeting clients in a professional, welcoming environment"
              className="w-full h-full object-cover"
              data-image-slot="about-firm-hero"
              data-image-type="about"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Our Values</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-brand-navy leading-tight">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl ring-1 ring-slate-200 p-8">
                <CheckCircle2 className="h-6 w-6 text-brand-gold mb-4" />
                <h3 className="font-bold text-brand-navy text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Our Offices</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-brand-navy leading-tight">Visit Us</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { city: "London", address: "Suite 10, Atlas House, 1 King Street, London EC2V 8AU", tag: "" },
              { city: "Bradford", address: "Unit 20, Listerhills Science Park, Campus Road, Bradford BD7 1HR", tag: "New Office" },
            ].map((office) => (
              <div key={office.city} className="bg-white rounded-2xl ring-1 ring-slate-200 overflow-hidden">
                <div className="p-8 lg:p-10">
                  <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
                    {office.city} Office
                    {office.tag && <span className="text-[10px] font-semibold bg-brand-red/10 text-brand-red px-2 py-0.5 rounded normal-case tracking-normal">{office.tag}</span>}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-brand-gold/60 shrink-0 mt-0.5" /><p className="text-brand-navy">{office.address}</p></div>
                    <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-brand-gold/60 shrink-0" /><a href="tel:02033559823" className="text-brand-navy hover:text-brand-red transition-colors">0203 355 9823</a></div>
                    <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-brand-gold/60 shrink-0" /><p className="text-slate-500 text-sm">Mon &ndash; Fri: 9:00am &ndash; 5:30pm</p></div>
                  </div>
                </div>
                <OfficeMap city={office.city} address={office.address} className="rounded-none border-0 border-t border-slate-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">Ready to Discuss Your Case?</h2>
          <p className="mt-6 text-white/40 text-lg max-w-xl mx-auto">Contact us today for a free consultation.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-base h-13 px-8">
              <Link href="/v6/contact-us/">Book a Consultation</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg" className="rounded-xl text-base h-13">
              <a href="tel:02033559823"><Phone className="h-4 w-4 mr-2" />0203 355 9823</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
