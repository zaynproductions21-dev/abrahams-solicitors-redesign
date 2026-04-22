import { V3Header } from "@/components/v3/header";
import { V3Footer } from "@/components/v3/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#faf9f6]">
      <V3Header />
      <main className="flex-1">{children}</main>
      <V3Footer />
      <WhatsAppButton />
    </div>
  );
}
