import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone, MapPin, Clock, ShieldCheck, ExternalLink } from "lucide-react";
import { TrustBadges } from "@/components/v6/trust-badges";
import { OfficeMap } from "@/components/v6/office-map";
import { SlotImage } from "@/components/slot-image";
import { team } from "@/lib/team";
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
            <SlotImage
              slot="about-firm-hero"
              fallbackSrc="https://placehold.co/2100x900/e2e8f0/0b1e4a/png?text=Abrahams+Solicitors+Office&font=playfair-display"
              alt="Abrahams Solicitors — interior of the London office with solicitors meeting clients in a professional, welcoming environment"
              className="w-full h-full object-cover"
              type="about"
              width={2100}
              height={900}
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

      {/* Meet the Team */}
      <section className="py-12 lg:py-16 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Meet the Team</p>
          <h2 className="text-3xl lg:text-4xl font-black text-brand-navy leading-tight tracking-tight">Three solicitors. Direct access. No call centres.</h2>
          <div className="mt-6 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              At Abrahams Solicitors, our team focuses on delivering clear, professional and effective legal support across immigration, litigation and housing matters. Most clients come to us during stressful and uncertain periods — facing a Home Office decision that could split a family, a landlord ignoring damp and mould, or a legal dispute that needs careful handling. Our job is to give straightforward advice and strong case preparation from the first call.
            </p>
            <p>
              Each of our solicitors is SRA-regulated and works directly on your file. You speak to the person handling your case — no junior pass-offs, no call centres.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {team.map((s) => (
              <article key={s.slug} className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8">
                <header className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{s.name}</h3>
                  <p className="mt-1 text-brand-red text-xs font-semibold uppercase tracking-widest">{s.role}</p>
                </header>
                <div className="flex flex-wrap gap-2 mb-4">
                  {s.specialisms.map((sp) => (
                    <span key={sp} className="text-[11px] font-semibold bg-slate-50 text-slate-600 px-2.5 py-1 rounded-full border border-slate-100">{sp}</span>
                  ))}
                </div>
                <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                  {s.long.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <ShieldCheck className="h-3.5 w-3.5 text-brand-red" />
                    <span>SRA #{s.sraNumber} · admitted {s.admittedYear}</span>
                  </div>
                  <a
                    href={s.sraUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-brand-red font-semibold hover:underline"
                  >
                    Verify on SRA register
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/v6/our-team/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:underline">
              View full team page →
            </Link>
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
              { city: "London", address: "Suite 10, Atlas House, 1 King Street, London EC2V 8AU", phone: "0203 355 9823", tag: "" },
              { city: "Bradford", address: "Unit 20, Listerhills Science Park, Campus Road, Bradford BD7 1HR", phone: "0333 339 6004", tag: "New Office" },
            ].map((office) => (
              <div key={office.city} className="bg-white rounded-2xl ring-1 ring-slate-200 overflow-hidden">
                <div className="p-8 lg:p-10">
                  <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
                    {office.city} Office
                    {office.tag && <span className="text-[10px] font-semibold bg-brand-red/10 text-brand-red px-2 py-0.5 rounded normal-case tracking-normal">{office.tag}</span>}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-brand-gold/60 shrink-0 mt-0.5" /><p className="text-brand-navy">{office.address}</p></div>
                    <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-brand-gold/60 shrink-0" /><a href={`tel:${office.phone.replace(/\s/g, "")}`} className="text-brand-navy hover:text-brand-red transition-colors">{office.phone}</a></div>
                    <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-brand-gold/60 shrink-0" /><p className="text-slate-500 text-sm">Mon &ndash; Fri: 9:00am &ndash; 5:00pm</p></div>
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
