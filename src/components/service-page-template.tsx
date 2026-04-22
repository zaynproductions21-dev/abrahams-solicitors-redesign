import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site-layout";
import { PageHero } from "@/components/page-hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle2,
  ArrowRight,
  Phone,
  ChevronRight,
} from "lucide-react";
import type { ServicePage } from "@/lib/services-data";

export function ServicePageTemplate({ page }: { page: ServicePage }) {
  return (
    <SiteLayout>
      <PageHero
        title={page.heroTitle}
        description={page.heroDescription}
        badge={page.badge}
      />

      {/* Breadcrumb */}
      <div className="border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-1.5 text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            {page.parentService && page.parentHref && (
              <>
                <Link
                  href={page.parentHref}
                  className="hover:text-brand-red transition-colors"
                >
                  {page.parentService}
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
              </>
            )}
            <span className="text-brand-navy font-medium">{page.title}</span>
          </nav>
        </div>
      </div>

      {/* Content sections */}
      <div className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-14">
              {page.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-2xl lg:text-3xl font-heading font-bold text-brand-navy mb-5">
                    {section.title}
                  </h2>
                  <p className="text-slate-500 leading-relaxed mb-6">
                    {section.content}
                  </p>
                  {section.items && (
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-brand-navy/80"
                        >
                          <CheckCircle2 className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* FAQs */}
              {page.faqs && page.faqs.length > 0 && (
                <div>
                  <h2 className="text-2xl lg:text-3xl font-heading font-bold text-brand-navy mb-8">
                    Frequently Asked Questions
                  </h2>
                  <Accordion className="w-full">
                    {page.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={index}>
                        <AccordionTrigger className="text-left text-brand-navy hover:text-brand-red text-[15px]">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-500 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA card */}
              <div className="bg-brand-navy rounded-2xl p-8 sticky top-28">
                <h3 className="text-lg font-heading font-bold text-white mb-3">
                  Get Expert Legal Advice
                </h3>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">
                  Speak to one of our experienced solicitors about your case.
                  We offer a free initial consultation.
                </p>
                <div className="space-y-3">
                  <Button
                    asChild
                    className="w-full bg-brand-red hover:bg-brand-red-dark text-white rounded-xl"
                  >
                    <Link href="/contact-us/">
                      Book a Consultation
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline-light"
                    className="w-full rounded-xl"
                  >
                    <a href="tel:02034880512">
                      <Phone className="h-4 w-4 mr-2" />
                      020 3488 0512
                    </a>
                  </Button>
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  {[
                    "Free Initial Consultation",
                    "SRA Regulated Firm",
                    "London & Bradford Offices",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-white/60">
                      <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Related services */}
              {page.parentHref && (
                <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-6">
                  <h3 className="font-heading font-semibold text-brand-navy mb-4">
                    Related Services
                  </h3>
                  <Link
                    href={page.parentHref}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-red transition-colors"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                    {page.parentService}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="bg-brand-navy py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-4xl font-heading font-bold text-white">
            Ready to Discuss Your Case?
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Contact us today for a free consultation. Our experienced team is
            here to help.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl"
            >
              <Link href="/contact-us/">Make an Appointment</Link>
            </Button>
            <Button
              asChild
              variant="outline-light"
              size="lg"
              className="rounded-xl"
            >
              <a href="tel:02034880512">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
