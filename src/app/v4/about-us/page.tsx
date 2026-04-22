import Link from "next/link";
import { Button } from "@/components/ui/button";
import { teamMembers } from "@/lib/navigation";
import { ArrowRight, CheckCircle2, Phone, MapPin, Clock } from "lucide-react";
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
      <section className="bg-brand-navy py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">About Us</p>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white leading-tight max-w-3xl">
            A Team Dedicated to Your Success
          </h1>
          <p className="mt-6 text-lg text-white/50 max-w-2xl leading-relaxed">
            Abrahams Solicitors provides expert legal representation in immigration, housing disrepair, and personal injury across the UK.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Our Values</p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl ring-1 ring-slate-200 p-8">
                <CheckCircle2 className="h-6 w-6 text-brand-gold mb-4" />
                <h3 className="font-heading font-bold text-brand-navy text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Our Team</p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">Meet Your Legal Team</h2>
            <p className="mt-5 text-lg text-slate-400 leading-relaxed">Experienced professionals dedicated to achieving the best outcome for every client.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.slug} className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 hover:shadow-md transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-brand-navy flex items-center justify-center text-white font-heading text-xl font-bold mb-6">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-navy">{member.name}</h3>
                <p className="text-brand-red text-sm font-medium mt-1">{member.role}</p>
                <p className="text-xs text-slate-400 mt-2 uppercase tracking-wider font-medium">{member.specialisation}</p>
                <p className="text-sm text-slate-500 mt-4 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Our Offices</p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">Visit Us</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { city: "London", address: "Suite 10, Atlas House, 1 King Street, London EC2V 8AU" },
              { city: "Bradford", address: "2nd Floor, 6 Piccadilly, Bradford BD1 3LS" },
            ].map((office) => (
              <div key={office.city} className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 lg:p-10">
                <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-5">{office.city} Office</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-brand-gold/60 shrink-0 mt-0.5" /><p className="text-brand-navy">{office.address}</p></div>
                  <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-brand-gold/60 shrink-0" /><a href="tel:02034880512" className="text-brand-navy hover:text-brand-red transition-colors">020 3488 0512</a></div>
                  <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-brand-gold/60 shrink-0" /><p className="text-slate-500 text-sm">Mon &ndash; Fri: 9:00am &ndash; 5:30pm</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy py-24 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white leading-tight">Ready to Discuss Your Case?</h2>
          <p className="mt-6 text-white/40 text-lg max-w-xl mx-auto">Contact us today for a free consultation.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-base h-13 px-8">
              <Link href="/v4/contact-us/">Book a Consultation</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg" className="rounded-xl text-base h-13">
              <a href="tel:02034880512"><Phone className="h-4 w-4 mr-2" />020 3488 0512</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
