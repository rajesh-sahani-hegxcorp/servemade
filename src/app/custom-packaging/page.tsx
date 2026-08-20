import type { Metadata } from "next";
import { ContentPage } from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "Custom & Private Label Packaging",
  description: "Full-wrap custom printing on compostable packaging, from artwork proof to loading dock.",
};

export default function CustomPackagingPage() {
  return (
    <ContentPage
      eyebrow="Custom & private label"
      title="Your brand, from logo to loading dock."
      description="Send a logo — our design team handles artwork, proofs and print setup, then we manufacture, inspect and ship under your name."
    />
  );
}
