import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

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
    <section className="relative bg-brand-navy text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-navy-light/50 via-transparent to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {badge && (
          <span className="inline-block bg-brand-gold/20 text-brand-gold text-sm font-medium px-3 py-1 rounded-full mb-4">
            {badge}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl leading-tight">
          {title}
        </h1>
        <p className="mt-4 text-lg text-white/80 max-w-2xl leading-relaxed">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-brand-red hover:bg-brand-red-dark text-white text-base px-8"
          >
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
          {showPhone && (
            <Button
              asChild
              variant="outline-light"
              size="lg"
              className="text-base"
            >
              <a href="tel:02034880512">
                <Phone className="h-4 w-4 mr-2" />
                020 3488 0512
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
