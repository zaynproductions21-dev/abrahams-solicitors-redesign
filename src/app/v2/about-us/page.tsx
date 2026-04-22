import Link from "next/link";
import { Button } from "@/components/ui/button";
import { teamMembers } from "@/lib/navigation";
import { ArrowRight, Phone, MapPin, Star, Users, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Bold Modern",
  description: "Meet the Abrahams Solicitors team. Expert immigration, housing, and personal injury lawyers in London and Bradford.",
};

const values = [
  { icon: Phone, title: "Direct Access", desc: "Speak to your solicitor directly — no call centres." },
  { icon: Star, title: "Excellence", desc: "98% success rate across all practice areas." },
  { icon: Users, title: "Client-First", desc: "Every decision guided by your best outcome." },
  { icon: Award, title: "Transparency", desc: "Fixed fees, honest advice, no hidden charges." },
];

export default function V2AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-navy py-24 lg:py-36 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="w-16 h-1 bg-brand-red mb-6" />
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-tight max-w-3xl">About Abrahams Solicitors</h1>
          <p className="mt-6 text-xl text-white/40 max-w-2xl leading-relaxed">A specialist legal practice built on expertise, transparency, and results.</p>
        </div>
      </section>

      {/* Stats row */}
      <section className="bg-brand-red">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-10">
            {[
              { value: "5,000+", label: "Cases Handled" },
              { value: "98%", label: "Success Rate" },
              { value: "9+", label: "Team Members" },
              { value: "2", label: "UK Offices" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl lg:text-5xl font-heading font-bold text-white">{s.value}</p>
                <p className="text-white/70 text-sm mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <div className="w-16 h-1 bg-brand-red mb-6" />
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-brand-navy">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-brand-red flex items-center justify-center mb-6 shadow-lg shadow-brand-red/20">
                  <v.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-navy mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <div className="w-16 h-1 bg-brand-red mb-6" />
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-brand-navy">Meet the Team</h2>
            <p className="mt-5 text-lg text-slate-400 max-w-2xl">Experienced legal professionals dedicated to your success.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.slug} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="h-2 bg-brand-red" />
                <div className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-brand-navy flex items-center justify-center text-white font-heading text-xl font-bold mb-6 shadow-lg">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-brand-navy group-hover:text-brand-red transition-colors">{member.name}</h3>
                  <p className="text-brand-red text-sm font-bold mt-1">{member.role}</p>
                  <span className="inline-block bg-brand-gold/10 text-brand-gold text-xs font-bold px-3 py-1 rounded-full mt-3 uppercase tracking-wider">{member.specialisation}</span>
                  <p className="text-sm text-slate-500 mt-4 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-red py-24 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">Ready to Work With Us?</h2>
          <p className="mt-6 text-white/70 text-lg">Book a free consultation today.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild className="bg-white text-brand-red hover:bg-white/90 rounded-2xl text-base h-14 px-10 font-bold shadow-lg">
              <Link href="/v2/contact-us/">Book a Consultation</Link>
            </Button>
            <Button asChild variant="outline-light" className="rounded-2xl text-base h-14 px-8 font-bold border-2">
              <a href="tel:02034880512"><Phone className="h-5 w-5 mr-2" />020 3488 0512</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
