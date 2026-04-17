import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/site-layout";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Refer a Friend | Abrahams Solicitors",
};

export default function ReferAFriendPage() {
  return (
    <SiteLayout>
      <PageHero
        title="Refer a Friend"
        description="Know someone who needs legal help? Refer them to Abrahams Solicitors."
        showPhone={false}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-muted-foreground leading-relaxed">
          Content coming soon. Please contact us for more information.
        </p>
        <div className="mt-8">
          <Button
            asChild
            className="bg-brand-red hover:bg-brand-red-dark text-white"
          >
            <Link href="/contact-us/">Contact Us</Link>
          </Button>
        </div>
      </div>
    </SiteLayout>
  );
}
