import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/site-layout";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { teamMembers } from "@/lib/navigation";
import { Users, Scale, Shield, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "About Abrahams Solicitors | London Immigration & Housing Law",
  description:
    "Meet our expert legal team. London-based solicitors specialising in immigration and housing law. Ahrika Ghalib, Ansar Malik & team.",
};

const values = [
  {
    icon: Users,
    title: "Client First",
    description:
      "Every decision we make is guided by our clients' best interests. We listen, understand, and tailor our advice to your unique circumstances.",
  },
  {
    icon: Scale,
    title: "Expertise",
    description:
      "Our solicitors are specialists in their fields, bringing deep knowledge and years of experience to every case we handle.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We operate with the highest ethical standards, providing honest advice even when it is not what you might want to hear.",
  },
  {
    icon: Trophy,
    title: "Results",
    description:
      "We are committed to achieving the best possible outcomes for our clients, with a strong track record of successful cases.",
  },
];

export default function AboutUsPage() {
  return (
    <SiteLayout>
      <PageHero
        title="About Abrahams Solicitors"
        description="A trusted London-based law firm specialising in immigration, housing, and personal injury law. We are committed to providing expert legal advice and achieving the best outcomes for our clients."
      />

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-brand-navy mb-6">Our Story</h2>
        <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Abrahams Solicitors was founded with a clear mission: to provide
            accessible, high-quality legal services to individuals and families
            across the UK. Based in London with offices in Bradford, we have
            grown into a multi-disciplinary practice with expertise in
            immigration, housing disrepair, and personal injury law.
          </p>
          <p>
            Our team of dedicated solicitors and legal professionals bring
            together a wealth of experience and a shared commitment to justice.
            We understand that legal matters can be stressful and life-changing,
            which is why we take the time to listen to each client and provide
            clear, practical advice tailored to their situation.
          </p>
          <p>
            Over the years we have helped thousands of clients navigate complex
            legal challenges, from securing immigration status to obtaining
            compensation for substandard housing conditions and personal
            injuries. We are proud of our reputation for professionalism,
            integrity, and results.
          </p>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-muted/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy/10">
                    <value.icon className="h-6 w-6 text-brand-navy" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-navy mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => {
            const initials = member.name
              .split(" ")
              .map((n) => n[0])
              .join("");
            return (
              <Link
                key={member.slug}
                href={`/our-team/${member.slug}/`}
                className="group"
              >
                <Card className="h-full transition-shadow group-hover:shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white font-bold text-lg">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-brand-navy group-hover:underline">
                          {member.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {member.role}
                        </p>
                        <Badge variant="secondary" className="mt-2">
                          {member.specialisation}
                        </Badge>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Accreditations */}
      <section className="bg-muted/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-brand-navy mb-4">
            Accreditations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Abrahams Solicitors is authorised and regulated by the Solicitors
            Regulation Authority (SRA). We adhere to the highest professional
            standards and are committed to maintaining the trust our clients
            place in us.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-brand-navy mb-4">
          Ready to Discuss Your Case?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Get in touch with our team today for a free initial consultation. We
          are here to help you navigate your legal challenges.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-brand-red hover:bg-brand-red-dark text-white"
        >
          <Link href="/contact-us/">Contact Us Today</Link>
        </Button>
      </section>
    </SiteLayout>
  );
}
