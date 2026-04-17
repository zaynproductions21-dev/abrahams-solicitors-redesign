import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiteLayout } from "@/components/site-layout";
import {
  Phone,
  Star,
  Scale,
  Home,
  Shield,
  ArrowRight,
  MapPin,
  Users,
  CheckCircle2,
  Quote,
} from "lucide-react";

const services = [
  {
    icon: Scale,
    title: "Immigration Law",
    description:
      "Visa applications, British citizenship, asylum claims, partner visas, and appeals. Expert guidance through every step of the immigration process.",
    href: "/immigration/",
    features: ["Visa Applications", "British Citizenship", "Asylum Claims", "Appeals"],
  },
  {
    icon: Home,
    title: "Housing Disrepair",
    description:
      "Property condition claims against landlords for damp, heating failures, structural issues, and more. Get the compensation you deserve.",
    href: "/housing-disrepair/",
    features: ["Damp & Mould", "Heating Issues", "Structural Problems", "Compensation"],
  },
  {
    icon: Shield,
    title: "Personal Injury",
    description:
      "Work accidents, road traffic claims, and serious injuries. No win, no fee representation with a dedicated legal team on your side.",
    href: "/personal-injury/",
    features: ["Work Accidents", "Car Accidents", "Serious Injury", "No Win No Fee"],
  },
];

const testimonials = [
  {
    text: "Abrahams Solicitors handled my spouse visa application with incredible professionalism. They made a stressful process feel manageable and kept me informed at every stage.",
    author: "Sarah M.",
    service: "Immigration",
  },
  {
    text: "After months of living with damp and mould, Abrahams helped me get proper compensation from my landlord. They were thorough, responsive, and genuinely cared about my situation.",
    author: "James T.",
    service: "Housing Disrepair",
  },
  {
    text: "Following my workplace accident, Ansar and the team secured a settlement that covered all my medical costs and lost earnings. I couldn't recommend them more highly.",
    author: "Priya K.",
    service: "Personal Injury",
  },
];

const stats = [
  { value: "5,000+", label: "Cases Handled" },
  { value: "98%", label: "Success Rate" },
  { value: "5.0", label: "Google Rating" },
  { value: "2", label: "UK Offices" },
];

export default function HomePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-navy-light/50 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Text content — left side */}
            <div>
              <Badge className="bg-brand-gold/20 text-brand-gold border-brand-gold/30 mb-6 text-sm">
                <Star className="h-3.5 w-3.5 mr-1 fill-brand-gold" />
                5-Star Rated Solicitors
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold tracking-tight leading-[1.1]">
                When Everything Depends on the Right Lawyer —{" "}
                <span className="text-brand-red">Choose Experience</span>
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-white/80 leading-relaxed">
                At Abrahams Solicitors, we&apos;re here to solve legal problems so
                you can focus on what matters most. Expert immigration, housing,
                and personal injury solicitors in London and Bradford.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-red hover:bg-brand-red-dark text-white text-base px-8 h-12"
                >
                  <Link href="/contact-us/">
                    Get a Free Consultation
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline-light"
                  size="lg"
                  className="text-base h-12"
                >
                  <a href="tel:02034880512">
                    <Phone className="h-4 w-4 mr-2" />
                    020 3488 0512
                  </a>
                </Button>
              </div>
            </div>

            {/* Image — right side, hidden on mobile */}
            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/hero-team.svg"
                  alt="Abrahams Solicitors legal team in a professional meeting"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 0vw, 50vw"
                />
                {/* Overlay gradient so it blends with navy background */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-brand-navy/30" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-red/10 rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5 text-brand-red fill-brand-red" />
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-navy">5,000+ Cases</p>
                  <p className="text-xs text-muted-foreground">Successfully Handled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
            {stats.map((stat) => (
              <div key={stat.label} className="py-8 text-center">
                <p className="text-2xl lg:text-3xl font-bold text-brand-red">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="outline" className="mb-4">
              Our Expertise
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy">
              Legal Services You Can Trust
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Specialising in immigration, housing, and personal injury law with
              a proven track record of results.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => (
              <Card
                key={service.title}
                className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-white"
              >
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-brand-red/10 flex items-center justify-center mb-5">
                    <service.icon className="h-6 w-6 text-brand-red" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-navy mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-brand-navy"
                      >
                        <CheckCircle2 className="h-4 w-4 text-brand-gold shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={service.href}
                    className="inline-flex items-center text-sm font-semibold text-brand-red group-hover:gap-2 gap-1 transition-all"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About / Why choose us */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                About Us
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy leading-tight">
                We Make Our Clients&apos; Goals and Challenges Our Own
              </h2>
              <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                At Abrahams Solicitors, we understand that legal matters can be
                overwhelming. That&apos;s why our dedicated team of solicitors
                work tirelessly to provide clear, practical, and effective legal
                solutions tailored to your specific needs.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Regulated by the Solicitors Regulation Authority",
                  "Transparent fees with no hidden costs",
                  "Multilingual team serving diverse communities",
                  "Offices in London and Bradford for convenience",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                    <p className="text-brand-navy">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Button
                  asChild
                  className="bg-brand-red hover:bg-brand-red-dark text-white"
                >
                  <Link href="/about-us/">
                    Meet Our Team
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="bg-muted rounded-2xl p-8 lg:p-12">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <Users className="h-8 w-8 text-brand-red mx-auto mb-3" />
                  <p className="text-2xl font-bold text-brand-navy">9+</p>
                  <p className="text-sm text-muted-foreground">Legal Professionals</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <Star className="h-8 w-8 text-brand-gold mx-auto mb-3" />
                  <p className="text-2xl font-bold text-brand-navy">5.0</p>
                  <p className="text-sm text-muted-foreground">Google Rating</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <Scale className="h-8 w-8 text-brand-navy mx-auto mb-3" />
                  <p className="text-2xl font-bold text-brand-navy">3</p>
                  <p className="text-sm text-muted-foreground">Practice Areas</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <MapPin className="h-8 w-8 text-brand-red mx-auto mb-3" />
                  <p className="text-2xl font-bold text-brand-navy">2</p>
                  <p className="text-sm text-muted-foreground">UK Offices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team preview */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="outline" className="mb-4">
              Our Team
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy">
              Meet Your Legal Team
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Experienced solicitors dedicated to achieving the best outcomes
              for our clients.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Ahrika Ghalib",
                role: "Principal Solicitor",
                specialisation: "Immigration Law",
                href: "/our-team/ahrika-ghalib/",
              },
              {
                name: "Ansar Malik",
                role: "Senior Solicitor",
                specialisation: "Housing & Personal Injury",
                href: "/our-team/ansar-malik/",
              },
              {
                name: "Adam Ejaz",
                role: "Solicitor",
                specialisation: "Immigration Law",
                href: "/our-team/adam-ejaz/",
              },
            ].map((member) => (
              <Link key={member.name} href={member.href}>
                <Card className="group hover:shadow-lg transition-all duration-300 bg-white h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-full bg-brand-navy flex items-center justify-center text-white text-xl font-bold mb-5">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <h3 className="text-lg font-semibold text-brand-navy group-hover:text-brand-red transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-brand-red text-sm font-medium mt-1">
                      {member.role}
                    </p>
                    <Badge variant="secondary" className="mt-3 text-xs">
                      {member.specialisation}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link href="/about-us/">
                View Full Team
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="outline" className="mb-4">
              Client Reviews
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.author} className="bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-brand-gold text-brand-gold"
                      />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-brand-red/20 mb-3" />
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {testimonial.text}
                  </p>
                  <div>
                    <p className="font-semibold text-brand-navy text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.service} Client
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="outline" className="mb-4">
              Our Locations
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy">
              Visit Our Offices
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                city: "London",
                address: "Suite 10, Atlas House, 1 King Street, London EC2V 8AU",
                phone: "020 3488 0512",
              },
              {
                city: "Bradford",
                address: "2nd Floor, 6 Piccadilly, Bradford BD1 3LS",
                phone: "020 3488 0512",
              },
            ].map((office) => (
              <Card key={office.city} className="bg-white">
                <CardContent className="p-8">
                  <Badge className="bg-brand-red/10 text-brand-red border-brand-red/20 mb-4">
                    {office.city} Office
                  </Badge>
                  <div className="space-y-3 mt-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                      <p className="text-brand-navy">{office.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-brand-gold shrink-0" />
                      <a
                        href={`tel:${office.phone.replace(/\s/g, "")}`}
                        className="text-brand-navy hover:text-brand-red transition-colors"
                      >
                        {office.phone}
                      </a>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="mt-6 w-full">
                    <Link href="/contact-us/">Get Directions</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-red text-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Get a Free Phone Consultation
          </h2>
          <p className="mt-4 text-white/80 text-lg max-w-2xl mx-auto">
            Speak to one of our experienced solicitors about your case. We offer
            a free initial consultation to understand your needs and explain how
            we can help.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-brand-red hover:bg-white/90 text-base h-12 px-8"
            >
              <Link href="/contact-us/">Make an Appointment</Link>
            </Button>
            <Button
              asChild
              variant="outline-light"
              size="lg"
              className="text-base h-12"
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
