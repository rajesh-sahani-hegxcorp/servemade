import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES } from "@/data/industries";
import { ContentPage } from "@/components/layout/ContentPage";
import { slugify } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

function findIndustry(slug: string) {
  return INDUSTRIES.find((industry) => slugify(industry) === slug);
}

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: slugify(industry) }));
}

export function generateMetadata({ params }: Props): Metadata {
  const industry = findIndustry(params.slug);
  if (!industry) return {};
  return { title: industry, description: `Compostable packaging supply for ${industry.toLowerCase()}.` };
}

export default function IndustryPage({ params }: Props) {
  const industry = findIndustry(params.slug);
  if (!industry) notFound();

  return (
    <ContentPage
      eyebrow="Who we supply"
      title={industry}
      description={`Supply structured around how ${industry.toLowerCase()} actually reorder — clear MOQs, consistent lead times, and one contact for the whole catalogue.`}
      blue
    />
  );
}
