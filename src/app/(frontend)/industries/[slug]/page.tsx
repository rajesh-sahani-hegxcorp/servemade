import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES } from "@/data/industries";
import { ContentPage } from "@/components/layout/ContentPage";
import { slugify } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

function findIndustry(slug: string) {
  return INDUSTRIES.find((industry) => slugify(industry) === slug);
}

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: slugify(industry) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = findIndustry(slug);
  if (!industry) return {};
  return { title: industry, description: `Compostable packaging supply for ${industry.toLowerCase()}.` };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = findIndustry(slug);
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
