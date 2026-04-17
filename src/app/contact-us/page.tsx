import type { Metadata } from "next";
import { SiteLayout } from "@/components/site-layout";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Abrahams Solicitors | London & Bradford Offices",
  description:
    "Contact our London and Bradford offices. Free legal consultations for immigration, housing, and personal injury matters. Call today.",
};

const offices = [
  {
    name: "London Office",
    address: "Suite 7, 2 Leytonstone Road, Stratford, London E15 1SE",
    phone: "020 3488 0512",
    email: "info@abrahams-solicitors.co.uk",
    hours: "Mon - Fri: 9:00 AM - 5:30 PM",
  },
  {
    name: "Bradford Office",
    address: "1st Floor, 6 Eldon Place, Bradford BD1 3AZ",
    phone: "01onal 274 0000",
    email: "bradford@abrahams-solicitors.co.uk",
    hours: "Mon - Fri: 9:00 AM - 5:30 PM",
  },
];

export default function ContactUsPage() {
  return (
    <SiteLayout>
      <PageHero
        title="Contact Us"
        description="Get in touch with our legal team for expert advice on immigration, housing, and personal injury matters. We offer free initial consultations."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-brand-navy mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your full name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Your phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Service Type</Label>
                <select
                  id="service"
                  name="service"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select a service</option>
                  <option value="immigration">Immigration</option>
                  <option value="housing">Housing Disrepair</option>
                  <option value="personal-injury">Personal Injury</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your legal matter..."
                  rows={5}
                  required
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-brand-red hover:bg-brand-red-dark text-white w-full sm:w-auto"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Office Cards */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-brand-navy mb-6">
              Our Offices
            </h2>
            {offices.map((office) => (
              <Card key={office.name}>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="text-lg font-semibold text-brand-navy">
                    {office.name}
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 shrink-0 text-brand-navy" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 shrink-0 text-brand-navy" />
                      <a
                        href={`tel:${office.phone.replace(/\s/g, "")}`}
                        className="hover:text-brand-navy transition-colors"
                      >
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 shrink-0 text-brand-navy" />
                      <a
                        href={`mailto:${office.email}`}
                        className="hover:text-brand-navy transition-colors"
                      >
                        {office.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 shrink-0 text-brand-navy" />
                      <span>{office.hours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
