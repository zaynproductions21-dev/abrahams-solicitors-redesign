import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, ArrowRight, Phone, ChevronRight } from "lucide-react";
import { getServicePage, immigrationPages, personalInjuryPages, housingPage } from "@/lib/services-data";
import type { Metadata } from "next";

const allSlugs = [
  ...immigrationPages.map((p) => p.slug),
  ...personalInjuryPages.map((p) => p.slug),
  housingPage.slug,
];

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  return { title: page.metaTitle, description: page.metaDescription };
}

export default async function V2ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  return (
    <>
      {/* Hero — Bold */}
      <section className="relative bg-brand-navy py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8">
          {page.badge && (
            <span className="inline-block bg-brand-red text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6">{page.badge}</span>
          )}
          <h1 className="text-4xl lg:text-5xl xl:text-7xl font-heading font-bold text-white leading-tight max-w-4xl">{page.heroTitle}</h1>
          <div className="w-16 h-1 bg-brand-red mt-6 mb-6" />
          <p className="text-lg text-white/40 max-w-2xl leading-relaxed">{page.heroDescription}</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-1.5 text-sm text-slate-400 font-medium">
            <Link href="/v2/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            {page.parentService && page.parentHref && (
              <>
                <Link href={`/v2${page.parentHref}`} className="hover:text-brand-red transition-colors">{page.parentService}</Link>
                <ChevronRight className="h-3.5 w-3.5" />
              </>
            )}
            <span className="text-brand-navy">{page.title}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-14">
              {page.sections.map((section, index) => (
                <div key={index}>
                  <div className="w-12 h-1 bg-brand-red mb-4" />
                  <h2 className="text-2xl lg:text-4xl font-heading font-bold text-brand-navy mb-5">{section.title}</h2>
                  <p className="text-slate-500 leading-relaxed mb-6 text-base">{section.content}</p>
                  {section.items && (
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm font-medium text-brand-navy/80">
                          <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />{item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {page.faqs && page.faqs.length > 0 && (
                <div>
                  <div className="w-12 h-1 bg-brand-red mb-4" />
                  <h2 className="text-2xl lg:text-4xl font-heading font-bold text-brand-navy mb-8">FAQs</h2>
                  <Accordion className="w-full">
                    {page.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={index}>
                        <AccordionTrigger className="text-left text-brand-navy hover:text-brand-red font-semibold text-base">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-slate-500 leading-relaxed text-base">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-brand-navy rounded-3xl p-8 sticky top-28 shadow-lg">
                <h3 className="text-xl font-heading font-bold text-white mb-3">Get Expert Legal Advice</h3>
                <p className="text-white/40 text-sm mb-6 leading-relaxed">Free initial consultation with an experienced solicitor.</p>
                <div className="space-y-3">
                  <Button asChild className="w-full bg-brand-red hover:bg-brand-red-dark text-white rounded-2xl h-12 font-bold shadow-lg shadow-brand-red/20">
                    <Link href="/v2/contact-us/">Book a Consultation<ArrowRight className="h-4 w-4 ml-2" /></Link>
                  </Button>
                  <Button asChild variant="outline-light" className="w-full rounded-2xl h-12 font-bold border-2">
                    <a href="tel:02033559823"><Phone className="h-4 w-4 mr-2" />0203 355 9823</a>
                  </Button>
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  {["Free Consultation", "SRA Regulated", "London & Bradford"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-white/50 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-brand-gold" />{item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-brand-red py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white">Ready to Discuss Your Case?</h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">Free consultation. No obligation.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild className="bg-white text-brand-red hover:bg-white/90 rounded-2xl h-14 px-10 font-bold shadow-lg">
              <Link href="/v2/contact-us/">Make an Appointment</Link>
            </Button>
            <Button asChild variant="outline-light" className="rounded-2xl h-14 px-8 font-bold border-2">
              <a href="tel:02033559823"><Phone className="h-4 w-4 mr-2" />Call Now</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
