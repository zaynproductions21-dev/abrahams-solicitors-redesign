import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { team } from "@/lib/team";

/**
 * Compact team strip — used on the homepage and on every service page.
 * No images per spec — just names, roles, SRA numbers, link to /our-team/.
 */
export function TeamStrip() {
  return (
    <section className="bg-white py-10 lg:py-14 border-y border-slate-100">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">
          <div>
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-2">Your Solicitor</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Three SRA-regulated solicitors. Direct access.</h2>
          </div>
          <Link href="/v6/our-team/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:underline shrink-0">
            Meet the team <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {team.map((s) => (
            <Link
              key={s.slug}
              href={`/v6/our-team/#${s.slug}`}
              className="group bg-slate-50/60 border border-slate-100 rounded-xl p-5 hover:border-brand-red/30 hover:bg-white transition-all"
            >
              <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-red transition-colors">{s.name}</h3>
              <p className="text-xs font-semibold text-brand-red uppercase tracking-wide mt-1">{s.role}</p>
              <p className="text-sm text-slate-500 leading-relaxed mt-3">{s.short}</p>
              <p className="text-[11px] text-slate-400 mt-4 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-red" />
                SRA #{s.sraNumber}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
