import { ReactNode } from "react";

export function LegalPage({
  eyebrow,
  title,
  lastUpdated,
  children,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">{eyebrow}</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl">{title}</h1>
          <p className="mt-4 text-sm text-white/50">Last updated: {lastUpdated}</p>
        </div>
      </section>
      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="prose prose-slate max-w-none [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-10 [&_h2]:mb-3 [&_h2:first-child]:mt-0 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:text-base [&_p]:text-slate-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:text-base [&_ul]:text-slate-600 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_ul]:mb-4 [&_a]:text-brand-red [&_a]:font-semibold [&_a:hover]:underline">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
