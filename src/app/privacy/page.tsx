import type { Metadata } from "next";
import { ContentPage } from "@/components/layout/ContentPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Privacy policy"
      description="Placeholder — replace with your actual privacy policy before launch. Data submitted through the quote and sample forms is stored in the QuoteRequest table (see prisma/schema.prisma) and used only to respond to your request."
    />
  );
}
