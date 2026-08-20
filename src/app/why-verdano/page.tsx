import type { Metadata } from "next";
import { ContentPage } from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "Why Verdano",
  description: "Certified compostable packaging, clear MOQs, and quotes back within one business day.",
};

export default function WhyVerdanoPage() {
  return (
    <ContentPage
      eyebrow="Why us"
      title="One supplier, every certification handled."
      description="FDA and EU food-contact compliance, FSC certified paper, EN 13432 compostability and ISO 9001 facilities — certificates ship with every order, no chasing required."
      blue
    />
  );
}
