import { Hero } from "@/components/home/Hero";
import { CertMarquee } from "@/components/home/CertMarquee";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { CustomBranding } from "@/components/home/CustomBranding";
import { Resources } from "@/components/home/Resources";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";
import { buildHomeJsonLd } from "@/lib/jsonld";

export default async function HomePage() {
  const jsonLd = await buildHomeJsonLd();

  return (
    <>
      {/* Server-rendered so the JSON-LD ships in the initial HTML for crawlers. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <CertMarquee />
      <CategoryTiles />
      <CustomBranding />
      <Resources />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
