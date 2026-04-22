import { V4Header } from "@/components/v4/header";
import { V4Footer } from "@/components/v4/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function V4Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <V4Header />
      <main className="flex-1">{children}</main>
      <V4Footer />
      <WhatsAppButton />
    </>
  );
}
