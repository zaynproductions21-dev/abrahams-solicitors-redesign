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

export default async function V3ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  return (
    <>
      {/* Hero — Editorial */}
      <section className="bg-brand-navy pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 text-[400px] font-heading font-bold text-white/[0.02] leading-none select-none">A</div>
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8">
          {page.badge && (
            <div className="relative inline-block mb-8">
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-brand-gold" />
              <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.3em] px-2">{page.badge}</p>
            </div>
          )}
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-[0.95] max-w-4xl">{page.heroTitle}</h1>
          <div className="w-16 h-px bg-brand-gold mt-8 mb-6" />
          <p className="text-lg text-white/40 max-w-2xl leading-relaxed">{page.heroDescription}</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b border-brand-gold/20 bg-[#faf9f6]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-1.5 text-sm text-slate-400">
            <Link href="/v3/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            {page.parentService && page.parentHref && (
              <>
                <Link href={`/v3${page.parentHref}`} className="hover:text-brand-gold transition-colors">{page.parentService}</Link>
                <ChevronRight className="h-3.5 w-3.5" />
              </>
            )}
            <span className="text-brand-navy font-medium">{page.title}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="py-20 lg:py-28 bg-[#faf9f6]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-14">
              {page.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-2xl lg:text-3xl font-heading font-bold text-brand-navy mb-2">{section.title}</h2>
                  <div className="w-10 h-px bg-brand-gold mb-5" />
                  <p className="text-slate-500 leading-relaxed mb-6">{section.content}</p>
                  {section.items && (
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-brand-navy/80">
                          <CheckCircle2 className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />{item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {page.faqs && page.faqs.length > 0 && (
                <div>
                  <h2 className="text-2xl lg:text-3xl font-heading font-bold text-brand-navy mb-2">Frequently Asked Questions</h2>
                  <div className="w-10 h-px bg-brand-gold mb-8" />
                  <Accordion className="w-full">
                    {page.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={index}>
                        <AccordionTrigger className="text-left text-brand-navy hover:text-brand-gold text-[15px]">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-slate-500 leading-relaxed">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>

            {/* Sidebar — Gold-bordered */}
            <div className="space-y-6">
              <div className="relative sticky top-28">
                <div className="absolute -top-3 -left-3 w-5 h-5 border-t-2 border-l-2 border-brand-gold" />
                <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b-2 border-r-2 border-brand-gold" />
                <div className="bg-white rounded-xl p-8 ring-1 ring-brand-gold/20">
                  <h3 className="text-lg font-heading font-bold text-brand-navy mb-3">Get Expert Advice</h3>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">Speak to an experienced solicitor about your case.</p>
                  <div className="space-y-3">
                    <Button asChild className="w-full bg-brand-navy hover:bg-brand-navy-light text-white rounded-xl">
                      <Link href="/v3/contact-us/">Begin Consultation<ArrowRight className="h-4 w-4 ml-2" /></Link>
                    </Button>
                    <Button asChild className="w-full bg-transparent hover:bg-brand-gold/10 text-brand-gold border-2 border-brand-gold rounded-xl">
                      <a href="tel:02034880512"><Phone className="h-4 w-4 mr-2" />020 3488 0512</a>
                    </Button>
                  </div>
                  <div className="mt-6 pt-6 border-t border-brand-gold/20 space-y-3">
                    {["Free Consultation", "SRA Regulated", "London & Bradford"].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-slate-500">
                        <CheckCircle2 className="h-4 w-4 text-brand-gold" />{item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.3em] mb-4">Next Step</p>
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy">Ready to Discuss Your Case?</h2>
          <div className="w-12 h-px bg-brand-gold mx-auto mt-6 mb-8" />
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild className="bg-brand-navy hover:bg-brand-navy-light text-white rounded-xl h-13 px-8">
              <Link href="/v3/contact-us/">Book an Appointment</Link>
            </Button>
            <Button asChild className="bg-transparent hover:bg-brand-gold/10 text-brand-gold border-2 border-brand-gold rounded-xl h-13 px-8">
              <a href="tel:02034880512"><Phone className="h-4 w-4 mr-2" />Call Now</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
