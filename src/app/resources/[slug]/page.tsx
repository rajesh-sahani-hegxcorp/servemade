import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RESOURCES } from "@/data/resources";
import { ContentPage } from "@/components/layout/ContentPage";

interface Props {
  params: Promise<{ slug: string }>;
}

function findResource(slug: string) {
  return RESOURCES.find((r) => r.href === `/resources/${slug}`);
}

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.href.replace("/resources/", "") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = findResource(slug);
  if (!resource) return {};
  return { title: resource.title, description: resource.description };
}

export default async function ResourceDetailPage({ params }: Props) {
  const { slug } = await params;
  const resource = findResource(slug);
  if (!resource) notFound();

  return (
    <ContentPage eyebrow="Resource" title={resource.title} description={resource.description}>
      <p className="text-sm text-ink-3">
        Full content for this guide is being written — check back soon, or{" "}
        <a href="/quote" className="font-bold text-brand-green-dark underline">
          ask our team directly
        </a>
        .
      </p>
    </ContentPage>
  );
}
