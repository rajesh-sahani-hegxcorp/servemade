import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Hero } from "@/components/home/Hero";
import { CertMarquee } from "@/components/home/CertMarquee";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { CustomBranding } from "@/components/home/CustomBranding";
import { Resources } from "@/components/home/Resources";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";
import { buildHomeJsonLd } from "@/lib/jsonld";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import { getHomepage, resolveHomepageCategories } from "@/lib/payload-data";

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: isDraftMode } = await draftMode();
  const homepageData = await getHomepage({ draft: isDraftMode });

  const title =
    homepageData?.meta?.title?.trim() ||
    "Serve Made — Certified Sustainable Food Packaging, Exported from India";
  const description =
    homepageData?.meta?.description?.trim() ||
    "B2B supplier of compostable plates, cups, takeaway boxes and cutlery. Clear MOQs from 10k pieces, FDA/EU/FSC® certified, quotes within one business day. India → GCC in 5–9 days.";

  return {
    title,
    description,
  };
}

export default async function HomePage() {
  const { isEnabled: isDraftMode } = await draftMode();
  const [jsonLd, homepageData] = await Promise.all([
    buildHomeJsonLd(),
    getHomepage({ draft: isDraftMode }),
  ]);

  const categories = await resolveHomepageCategories(
    homepageData?.categoryShowcase?.featuredCategories
  );

  return (
    <>
      {isDraftMode && <LivePreviewListener />}
      {/* Server-rendered so the JSON-LD ships in the initial HTML for crawlers. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero
        heading={homepageData?.hero?.heading}
        subheading={homepageData?.hero?.subheading}
      />
      <CertMarquee certifications={homepageData?.certifications} />
      <CategoryTiles
        tag={homepageData?.categoryShowcase?.tag}
        heading={homepageData?.categoryShowcase?.heading}
        categories={categories}
      />
      <CustomBranding
        tag={homepageData?.customBranding?.tag}
        heading={homepageData?.customBranding?.heading}
        description={homepageData?.customBranding?.description}
        bullets={homepageData?.customBranding?.bullets}
        ctaText={homepageData?.customBranding?.ctaText}
        ctaLink={homepageData?.customBranding?.ctaLink}
        image={homepageData?.customBranding?.image}
      />
      <Resources resources={homepageData?.resources} />
      <Testimonials testimonials={homepageData?.testimonials} />
      <FAQ faqs={homepageData?.faqs} />
      <CTA
        heading={homepageData?.ctaSection?.heading}
        text={homepageData?.ctaSection?.text}
        buttonText={homepageData?.ctaSection?.buttonText}
        buttonLink={homepageData?.ctaSection?.buttonLink}
      />
    </>
  );
}
