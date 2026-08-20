import type { Metadata } from "next";
import { ContentPage } from "@/components/layout/ContentPage";
import { Impact } from "@/components/home/Impact";

export const metadata: Metadata = {
  title: "Sustainability",
  description: "Honest sustainability numbers: certified compostability, plastic items replaced, and quality checks.",
};

export default function SustainabilityPage() {
  return (
    <>
      <ContentPage
        eyebrow="Honest sustainability"
        title="Numbers we can prove, not slogans."
        description="Every claim on this page is backed by a certificate that ships with your order — not a badge we designed ourselves."
      />
      <Impact />
    </>
  );
}
