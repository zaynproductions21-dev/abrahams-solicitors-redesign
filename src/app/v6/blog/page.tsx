"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Calendar, User } from "lucide-react";
import { getBlogPosts, formatDate, type BlogPost } from "@/lib/publishos";

export default function V6BlogPage() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    getBlogPosts().then(all => {
      const published = all
        .filter(p => p.status === "published")
        .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
      setPosts(published);
    });
  }, []);

  return (
    <>
      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Insights</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl">Legal Blog &amp; Guides</h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl leading-relaxed">
            Plain-English guidance on UK immigration, housing, and citizenship law from our solicitors.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          {posts === null ? (
            <p className="text-slate-400 text-center py-12">Loading posts...</p>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">No blog posts yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <Link
                  key={post.id}
                  href={`/v6/blog/${post.slug}/`}
                  className="group bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-lg hover:border-brand-red/20 transition-all"
                >
                  <div className="aspect-[16/9] bg-slate-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.cover_image || "/placeholders/blog-cover.svg"}
                      alt={`${post.title} — editorial cover image for Abrahams Solicitors blog post${post.category ? ` in the ${post.category} category` : ""}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      data-image-slot={`blog-cover-${post.slug}`}
                      data-image-type="blog-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    {post.category && (
                      <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">{post.category}</p>
                    )}
                    <h2 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-brand-red transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm text-slate-500 leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="mt-5 flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{post.author}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{formatDate(post.published_at)}</span>
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-red">
                      Read more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
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
