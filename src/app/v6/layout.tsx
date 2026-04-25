import { Poppins } from "next/font/google";
import { V6Header } from "@/components/v6/header";
import { V6Footer } from "@/components/v6/footer";
import { CookieConsent } from "@/components/v6/cookie-consent";
import { ChatWidgets } from "@/components/v6/chat-widgets";
import { StickyCallBar } from "@/components/v6/sticky-call-bar";
import { GoogleTagManager } from "@/components/v6/google-tag-manager";
import { JsonLd, organisationSchema } from "@/components/v6/jsonld";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export default function V6Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={poppins.className}>
      <GoogleTagManager />
      <JsonLd data={organisationSchema()} />
      <style>{`
        .${poppins.className} h1,
        .${poppins.className} h2,
        .${poppins.className} h3,
        .${poppins.className} h4,
        .${poppins.className} h5,
        .${poppins.className} h6,
        .${poppins.className} p,
        .${poppins.className} a,
        .${poppins.className} span,
        .${poppins.className} button,
        .${poppins.className} input,
        .${poppins.className} label {
          font-family: ${poppins.style.fontFamily} !important;
        }
      `}</style>
      <V6Header />
      <main className="flex-1">{children}</main>
      <V6Footer />
      <StickyCallBar />
      <ChatWidgets />
      <CookieConsent />
    </div>
  );
}
