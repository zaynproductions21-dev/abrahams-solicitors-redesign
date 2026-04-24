"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import { getPressReleases, formatDate, type PressRelease } from "@/lib/publishos";

export default function V6PressReleasesPage() {
  const [releases, setReleases] = useState<PressRelease[] | null>(null);

  useEffect(() => {
    getPressReleases().then(all => {
      const published = all
        .filter(r => r.status === "published")
        .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
      setReleases(published);
    });
  }, []);

  return (
    <>
      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">News</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl">Press Releases</h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl leading-relaxed">
            Announcements and updates from Abrahams Solicitors.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {releases === null ? (
            <p className="text-slate-400 text-center py-12">Loading releases...</p>
          ) : releases.length === 0 ? (
            <div className="text-center py-16">
              <Newspaper className="h-10 w-10 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">No press releases yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {releases.map(r => (
                <Link
                  key={r.id}
                  href={`/v6/press-releases/${r.slug}/`}
                  className="group block bg-white rounded-xl border border-slate-100 p-6 lg:p-7 hover:shadow-lg hover:border-brand-red/20 transition-all"
                >
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{formatDate(r.published_at)}</span>
                    {r.source && <span className="text-slate-300">•</span>}
                    {r.source && <span>{r.source}</span>}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-brand-red transition-colors">
                    {r.title}
                  </h2>
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed">{r.excerpt}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-red">
                    Read release <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
