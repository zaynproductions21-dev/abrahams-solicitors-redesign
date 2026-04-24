"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { getNewsletters, formatDate, type NewsletterIssue } from "@/lib/publishos";

function RichContent({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/);
  return (
    <div className="space-y-4 text-base text-slate-700 leading-relaxed">
      {blocks.map((block, i) => <p key={i} className="whitespace-pre-wrap">{block}</p>)}
    </div>
  );
}

export default function V6NewsletterIssuePage() {
  const { slug } = useParams<{ slug: string }>();
  const [issue, setIssue] = useState<NewsletterIssue | null | undefined>(undefined);

  useEffect(() => {
    getNewsletters().then(all => {
      const match = all.find(n => n.slug === slug && n.status === "published");
      setIssue(match ?? null);
    });
  }, [slug]);

  if (issue === undefined) return <div className="py-32 text-center text-slate-400">Loading...</div>;
  if (issue === null) {
    return (
      <div className="py-32 text-center">
        <p className="text-slate-500 mb-4">Issue not found.</p>
        <Link href="/v6/newsletter/" className="text-brand-red font-semibold hover:underline">Back to newsletter</Link>
      </div>
    );
  }

  return (
    <article>
      <section className="bg-slate-50 py-10 lg:py-14 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link href="/v6/newsletter/" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-brand-red transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to newsletter
          </Link>
          {issue.issue_number && (
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Issue #{issue.issue_number}</p>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-black text-slate-900 leading-[1.1] tracking-tight">
            {issue.title}
          </h1>
          <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
            <Calendar className="h-4 w-4" />{formatDate(issue.published_at)}
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <RichContent text={issue.content} />
        </div>
      </section>
    </article>
  );
}
