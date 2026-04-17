import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { teamMembers } from "@/lib/navigation";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return teamMembers.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);

  if (!member) {
    return { title: "Team Member Not Found | Abrahams Solicitors" };
  }

  return {
    title: `${member.name} - ${member.role} | Abrahams Solicitors`,
    description: member.description,
  };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);

  if (!member) {
    notFound();
  }

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <SiteLayout>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/about-us/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-brand-navy mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Our Team
        </Link>

        <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start gap-6 mb-8">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white font-bold text-3xl">
            {initials}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-brand-navy">
              {member.name}
            </h1>
            <p className="text-lg text-muted-foreground mt-1">{member.role}</p>
            <Badge variant="secondary" className="mt-3">
              {member.specialisation}
            </Badge>
          </div>
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="text-muted-foreground leading-relaxed text-lg">
            {member.description}
          </p>
        </div>

        <div className="mt-12 rounded-lg bg-muted/50 p-8 text-center">
          <h2 className="text-xl font-semibold text-brand-navy mb-2">
            Need Legal Advice?
          </h2>
          <p className="text-muted-foreground mb-6">
            Contact us to book a consultation with {member.name.split(" ")[0]}{" "}
            or one of our other expert solicitors.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-brand-red hover:bg-brand-red-dark text-white"
          >
            <Link href="/contact-us/">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
