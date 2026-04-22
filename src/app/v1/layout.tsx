import { V1Header } from "@/components/v1/header";
import { V1Footer } from "@/components/v1/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function V1Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <V1Header />
      <main className="flex-1">{children}</main>
      <V1Footer />
      <WhatsAppButton />
    </>
  );
}
