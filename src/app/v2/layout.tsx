import { V2Header } from "@/components/v2/header";
import { V2Footer } from "@/components/v2/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <V2Header />
      <main className="flex-1">{children}</main>
      <V2Footer />
      <WhatsAppButton />
    </>
  );
}
