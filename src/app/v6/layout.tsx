import { Sora } from "next/font/google";
import { V6Header } from "@/components/v6/header";
import { V6Footer } from "@/components/v6/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export default function V6Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={sora.className}>
      <V6Header />
      <main className="flex-1">{children}</main>
      <V6Footer />
      <WhatsAppButton />
    </div>
  );
}
