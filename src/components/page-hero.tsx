import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";

interface PageHeroProps {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  showPhone?: boolean;
  badge?: string;
}

export function PageHero({
  title,
  description,
  ctaLabel = "Book a Consultation",
  ctaHref = "/contact-us/",
  showPhone = true,
  badge,
}: PageHeroProps) {
  return (
    <section className="relative bg-brand-navy overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-navy-light/60 via-transparent to-transparent" />
      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-20 lg:py-28">
        {badge && (
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-5">
            {badge}
          </p>
        )}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white tracking-tight max-w-3xl leading-[1.1]">
          {title}
        </h1>
        <p className="mt-6 text-lg text-white/50 max-w-2xl leading-relaxed">
          {description}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-base px-8 h-13"
          >
            <Link href={ctaHref}>
              {ctaLabel}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          {showPhone && (
            <Button
              asChild
              variant="outline-light"
              size="lg"
              className="rounded-xl text-base h-13"
            >
              <a href="tel:02033559823">
                <Phone className="h-4 w-4 mr-2" />
                0203 355 9823
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
