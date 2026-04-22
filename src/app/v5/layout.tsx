import { DM_Sans } from "next/font/google";
import { V5Header } from "@/components/v5/header";
import { V5Footer } from "@/components/v5/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-dm-sans",
});

export default function V5Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${dmSans.variable}`} style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
      <V5Header />
      <main className="flex-1">{children}</main>
      <V5Footer />
      <WhatsAppButton />
    </div>
  );
}
