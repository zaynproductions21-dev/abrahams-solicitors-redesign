"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { getBlogPosts, formatDate, type BlogPost } from "@/lib/publishos";
import { JsonLd, blogPostSchema } from "@/components/v6/jsonld";

function RichContent({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/);
  return (
    <div className="space-y-4 text-base text-slate-700 leading-relaxed">
      {blocks.map((block, i) => <p key={i} className="whitespace-pre-wrap">{block}</p>)}
    </div>
  );
}

export default function V6BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    getBlogPosts().then(all => {
      const match = all.find(p => p.slug === slug && p.status === "published");
      setPost(match ?? null);
    });
  }, [slug]);

  if (post === undefined) {
    return <div className="py-32 text-center text-slate-400">Loading...</div>;
  }
  if (post === null) {
    return (
      <div className="py-32 text-center">
        <p className="text-slate-500 mb-4">Post not found.</p>
        <Link href="/v6/blog/" className="text-brand-red font-semibold hover:underline">Back to blog</Link>
      </div>
    );
  }

  return (
    <article>
      <JsonLd data={blogPostSchema(post)} />
      <section className="bg-slate-50 py-10 lg:py-14 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link href="/v6/blog/" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-brand-red transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>
          {post.category && (
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">{post.category}</p>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-black text-slate-900 leading-[1.1] tracking-tight">
            {post.title}
          </h1>
          <div className="mt-5 flex items-center gap-5 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formatDate(post.published_at)}</span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto -mt-0 lg:-mt-6 px-6 lg:px-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.cover_image || `https://placehold.co/1600x900/dc2626/ffffff/png?text=${encodeURIComponent(post.title.slice(0, 40))}&font=playfair-display`}
          alt={`${post.title} — hero cover image for Abrahams Solicitors blog post${post.category ? ` (${post.category})` : ""}`}
          className="w-full aspect-[16/9] object-cover rounded-2xl shadow-xl"
          data-image-slot={`blog-post-cover-${post.slug}`}
          data-image-type="blog-cover"
          width={1600}
          height={900}
          loading="eager"
        />
      </div>

      <section className="py-10 lg:py-14">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <RichContent text={post.content} />
        </div>
      </section>
    </article>
  );
}
