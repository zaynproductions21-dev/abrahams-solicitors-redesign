"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Briefcase, Mail, ArrowRight, Heart, TrendingUp, Users, Shield } from "lucide-react";

// To add a live role, drop it into this array.
const openRoles: { title: string; location: string; type: string; href: string }[] = [];

const values = [
  { icon: Heart, title: "Client-first", desc: "Every decision starts with what&rsquo;s right for the client." },
  { icon: TrendingUp, title: "Growing firm", desc: "Real cases, real responsibility, real career progression." },
  { icon: Users, title: "Small teams", desc: "Direct access to partners. No corporate sprawl." },
  { icon: Shield, title: "SRA-regulated", desc: "Proper training, supervision, and professional development." },
];

export default function CareersPage() {
  return (
    <>
      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Careers</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl">Work with us</h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl leading-relaxed">
            Abrahams Solicitors is an independent UK law firm specialising in immigration, housing, and personal injury. We&rsquo;re always interested in hearing from people who care about doing good legal work.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-red/8 flex items-center justify-center shrink-0">
                  <v.icon className="h-5 w-5 text-brand-red" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{v.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5" dangerouslySetInnerHTML={{ __html: v.desc }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-8">Open Roles</h2>

          {openRoles.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center">
              <Briefcase className="h-10 w-10 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-700 font-semibold text-lg">No live roles right now.</p>
              <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
                We&rsquo;re always open to speculative applications from experienced solicitors, paralegals and support staff. Send us your CV and we&rsquo;ll be in touch if something suitable comes up.
              </p>
              <Button asChild className="mt-6 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-11 px-6 font-bold uppercase tracking-wide">
                <a href="mailto:careers@abrahamssolicitors.co.uk?subject=Speculative%20Application"><Mail className="h-4 w-4 mr-2" />Send us your CV</a>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {openRoles.map(role => (
                <Link key={role.title} href={role.href} className="group block bg-white rounded-xl border border-slate-100 p-6 hover:shadow-lg hover:border-brand-red/20 transition-all">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-red transition-colors">{role.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">{role.location} · {role.type}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-brand-red group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Training contracts &amp; paralegals</h2>
          <p className="mt-3 text-base text-slate-500 leading-relaxed max-w-xl mx-auto">
            We take on a small number of paralegals and training contract candidates each year. If you&rsquo;re early-career and interested in immigration or housing law, please send your CV and a short covering email.
          </p>
          <Button asChild size="lg" className="mt-6 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 px-8 font-bold uppercase tracking-wide">
            <a href="mailto:careers@abrahamssolicitors.co.uk?subject=Paralegal%2FTraining%20Contract%20Application"><Mail className="h-4 w-4 mr-2" />careers@abrahamssolicitors.co.uk</a>
          </Button>
        </div>
      </section>
    </>
  );
}
