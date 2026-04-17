import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site-layout";

export default function NotFound() {
  return (
    <SiteLayout>
      <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <h1 className="text-6xl font-bold text-brand-red mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-brand-navy mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved. Please check the URL or navigate back to our homepage.
        </p>
        <div className="flex gap-4">
          <Button
            asChild
            className="bg-brand-red hover:bg-brand-red-dark text-white"
          >
            <Link href="/">Go to Homepage</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact-us/">Contact Us</Link>
          </Button>
        </div>
      </div>
    </SiteLayout>
  );
}
