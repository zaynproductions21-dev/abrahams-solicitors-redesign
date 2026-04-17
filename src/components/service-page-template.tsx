import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      <div className="bg-muted/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
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
      <div className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {page.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-bold text-brand-navy mb-4">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {section.content}
                  </p>
                  {section.items && (
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-brand-navy"
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
                  <h2 className="text-2xl font-bold text-brand-navy mb-6">
                    Frequently Asked Questions
                  </h2>
                  <Accordion className="w-full">
                    {page.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={index}>
                        <AccordionTrigger className="text-left text-brand-navy hover:text-brand-red">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
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
              <Card className="bg-brand-navy text-white sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">
                    Get Expert Legal Advice
                  </h3>
                  <p className="text-white/70 text-sm mb-6 leading-relaxed">
                    Speak to one of our experienced solicitors about your case.
                    We offer a free initial consultation.
                  </p>
                  <div className="space-y-3">
                    <Button
                      asChild
                      className="w-full bg-brand-red hover:bg-brand-red-dark text-white"
                    >
                      <Link href="/contact-us/">
                        Book a Consultation
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline-light"
                      className="w-full"
                    >
                      <a href="tel:02034880512">
                        <Phone className="h-4 w-4 mr-2" />
                        020 3488 0512
                      </a>
                    </Button>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/20 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                      Free Initial Consultation
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                      SRA Regulated Firm
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                      London &amp; Bradford Offices
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related services */}
              {page.parentHref && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-brand-navy mb-3">
                      Related Services
                    </h3>
                    <div className="space-y-2">
                      <Link
                        href={page.parentHref}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-red transition-colors"
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                        {page.parentService}
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Badge */}
              {page.badge && (
                <div className="text-center">
                  <Badge
                    variant="outline"
                    className="text-sm px-4 py-2 border-brand-gold text-brand-gold"
                  >
                    {page.badge} Specialists
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="bg-brand-red text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold">
            Ready to Discuss Your Case?
          </h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">
            Contact us today for a free consultation. Our experienced team is
            here to help.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-brand-red hover:bg-white/90"
            >
              <Link href="/contact-us/">Make an Appointment</Link>
            </Button>
            <Button
              asChild
              variant="outline-light"
              size="lg"
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
