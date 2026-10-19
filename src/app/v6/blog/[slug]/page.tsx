/**
 * Blog post page.
 *
 * This was a client component that fetched the post in `useEffect`, which meant
 * the article body never reached the HTML a crawler received, and the page
 * inherited the root layout's metadata — so every post shared the homepage
 * title and had no canonical of its own. It is now server-rendered with
 * per-post metadata, and the body is parsed into real headings so passages can
 * be ranked and cited individually.
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, ShieldCheck, User } from "lucide-react";
import { getPublishedBlogPosts, formatDate, type BlogPost } from "@/lib/publishos";
import { JsonLd, blogPostSchema, breadcrumbSchema, speakableSchema } from "@/components/v6/jsonld";
import { ArticleBody } from "@/components/v6/article-body";
import { SlotImage } from "@/components/slot-image";
import { team } from "@/lib/team";

const BASE_URL = "https://www.abrahamssolicitors.co.uk";

/** Prerender every published post; a slug that isn't one 404s. */
export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.map(post => ({ slug: post.slug }));
}

async function findPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getPublishedBlogPosts();
  return posts.find(p => p.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPost(slug);

  if (!post) {
    return { title: "Post not found", robots: { index: false, follow: false } };
  }

  const url = `${BASE_URL}/blog/${post.slug}/`;
  // The excerpt is the post's own summary, so it is preferred over a generated
  // description; the cap keeps it inside what a SERP will actually render.
  const description = (post.excerpt || post.title).slice(0, 158);

  return {
    // The root layout supplies the "| Abrahams Solicitors" suffix via its
    // title template, so the post title must not repeat it.
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      url,
      siteName: "Abrahams Solicitors",
      locale: "en_GB",
      type: "article",
      publishedTime: post.published_at,
      modifiedTime: post.updated_at || post.published_at,
      authors: [post.author],
      ...(post.cover_image ? { images: [post.cover_image] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      ...(post.cover_image ? { images: [post.cover_image] } : {}),
    },
  };
}

export default async function V6BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await findPost(slug);

  if (!post) notFound();

  // A byline only carries weight if it resolves to a real, checkable person.
  // Where it matches one of the firm's SRA-registered solicitors the page links
  // to the public register; where it doesn't it stays an organisation byline
  // rather than implying a named author.
  const author = team.find(t => t.name === post.author);
  const reviewer = post.reviewed_by ? team.find(t => t.name === post.reviewed_by) : undefined;

  return (
    <article>
      <JsonLd data={blogPostSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${BASE_URL}/` },
          { name: "Blog", url: `${BASE_URL}/blog/` },
          { name: post.title, url: `${BASE_URL}/blog/${post.slug}/` },
        ])}
      />
      {/* The standalone short answer is the passage an answer engine lifts. */}
      <JsonLd data={speakableSchema([".speakable-answer"])} />

      <section className="bg-slate-50 py-10 lg:py-14 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-brand-red transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>
          {post.category && (
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">{post.category}</p>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-black text-slate-900 leading-[1.1] tracking-tight">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {author ? (
                <>
                  <a
                    href={author.sraUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="font-semibold text-slate-700 underline underline-offset-2 hover:text-brand-red"
                  >
                    {author.name}
                  </a>
                  <span className="text-slate-400">
                    · {author.role} · SRA {author.sraNumber}
                  </span>
                </>
              ) : (
                post.author
              )}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.published_at)}
            </span>
          </div>

          {reviewer && (
            <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
              <ShieldCheck className="h-4 w-4 text-brand-red" />
              Law checked by{" "}
              <a
                href={reviewer.sraUrl}
                rel="noopener noreferrer"
                target="_blank"
                className="font-semibold text-slate-700 underline underline-offset-2 hover:text-brand-red"
              >
                {reviewer.name}
              </a>
              {post.reviewed_at && <span className="text-slate-400">· {formatDate(post.reviewed_at)}</span>}
            </p>
          )}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <SlotImage
          slot={`blog-post-cover-${post.slug}`}
          fallbackSrc={post.cover_image || "/placeholders/blog-cover.svg"}
          alt={`${post.title} — hero cover image for Abrahams Solicitors blog post${post.category ? ` (${post.category})` : ""}`}
          className="w-full aspect-[16/9] object-cover rounded-2xl shadow-xl"
          type="blog-cover"
          width={1600}
          height={900}
          loading="eager"
        />
      </div>

      <section className="py-10 lg:py-14">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <ArticleBody text={post.content} />
        </div>
      </section>
    </article>
  );
}
