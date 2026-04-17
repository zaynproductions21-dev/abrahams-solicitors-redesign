import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/site-layout";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Home, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Fees | Abrahams Solicitors",
  description:
    "Transparent fee structure for immigration, housing disrepair, and personal injury legal services. Fixed fees, no win no fee, and legal aid options.",
};

const services = [
  {
    icon: Plane,
    title: "Immigration",
    badge: "Fixed Fees",
    description:
      "We offer transparent fixed fees for most immigration services so you know exactly what your case will cost from the outset. Our fees cover the full service including initial consultation, document preparation, application submission, and ongoing correspondence with the Home Office.",
    items: [
      "Visa applications from fixed fees",
      "Appeals and administrative reviews",
      "Citizenship applications",
      "No hidden charges",
    ],
  },
  {
    icon: Home,
    title: "Housing Disrepair",
    badge: "No Win No Fee / Legal Aid",
    description:
      "Housing disrepair claims are typically funded on a no win no fee basis or through legal aid, meaning you will not have to pay anything upfront. If your claim is unsuccessful, you will not owe us a penny.",
    items: [
      "No upfront costs",
      "Legal aid where eligible",
      "No win no fee agreements",
      "Free initial assessment",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Personal Injury",
    badge: "No Win No Fee",
    description:
      "All personal injury claims are handled on a no win no fee (Conditional Fee Agreement) basis. You pay nothing unless we successfully recover compensation for you. We take the financial risk so you can focus on your recovery.",
    items: [
      "100% no win no fee",
      "No upfront payments",
      "Free case assessment",
      "Maximum compensation pursued",
    ],
  },
];

export default function OurFeesPage() {
  return (
    <SiteLayout>
      <PageHero
        title="Our Fees"
        description="We believe in transparent pricing with no hidden charges. Our fee structure is designed to make quality legal representation accessible to everyone."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-navy mb-4">
            Transparent Fee Structure
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            At Abrahams Solicitors we are committed to providing clear and
            upfront information about our fees. We understand that legal costs
            can be a concern, which is why we offer a range of funding options
            including fixed fees, no win no fee, and legal aid where available.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col">
              <CardContent className="pt-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy/10">
                    <service.icon className="h-5 w-5 text-brand-navy" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-navy">
                    {service.title}
                  </h3>
                </div>
                <Badge variant="secondary" className="w-fit mb-4">
                  {service.badge}
                </Badge>
                <p className="text-sm text-muted-foreground mb-4">
                  {service.description}
                </p>
                <ul className="mt-auto space-y-2">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <span className="mr-2 text-brand-navy">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-brand-navy mb-4">
            Get a Free Quote
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Contact us today for a free, no-obligation discussion about your
            case and a clear breakdown of the costs involved.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-brand-red hover:bg-brand-red-dark text-white"
          >
            <Link href="/contact-us/">Contact Us for a Quote</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
