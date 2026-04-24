"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { getPressReleases, formatDate, type PressRelease } from "@/lib/publishos";

function RichContent({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/);
  return (
    <div className="space-y-4 text-base text-slate-700 leading-relaxed">
      {blocks.map((block, i) => <p key={i} className="whitespace-pre-wrap">{block}</p>)}
    </div>
  );
}

export default function V6PressReleasePage() {
  const { slug } = useParams<{ slug: string }>();
  const [release, setRelease] = useState<PressRelease | null | undefined>(undefined);

  useEffect(() => {
    getPressReleases().then(all => {
      const match = all.find(r => r.slug === slug && r.status === "published");
      setRelease(match ?? null);
    });
  }, [slug]);

  if (release === undefined) {
    return <div className="py-32 text-center text-slate-400">Loading...</div>;
  }
  if (release === null) {
    return (
      <div className="py-32 text-center">
        <p className="text-slate-500 mb-4">Release not found.</p>
        <Link href="/v6/press-releases/" className="text-brand-red font-semibold hover:underline">Back to press releases</Link>
      </div>
    );
  }

  return (
    <article>
      <section className="bg-slate-50 py-10 lg:py-14 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link href="/v6/press-releases/" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-brand-red transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to press releases
          </Link>
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Press Release</p>
          <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-black text-slate-900 leading-[1.1] tracking-tight">
            {release.title}
          </h1>
          <div className="mt-5 flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formatDate(release.published_at)}</span>
            {release.source && <span className="text-slate-300">•</span>}
            {release.source && <span>{release.source}</span>}
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <RichContent text={release.content} />
        </div>
      </section>
    </article>
  );
}
