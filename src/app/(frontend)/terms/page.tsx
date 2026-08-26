import type { Metadata } from "next";
import { ContentPage } from "@/components/layout/ContentPage";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Terms of service"
      description="Placeholder — replace with your actual terms before launch."
    />
  );
}
