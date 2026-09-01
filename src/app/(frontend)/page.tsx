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
import { getHomepage } from "@/lib/payload-data";

export default async function HomePage() {
  const { isEnabled: isDraftMode } = await draftMode();
  const [jsonLd, homepageData] = await Promise.all([
    buildHomeJsonLd(),
    getHomepage({ draft: isDraftMode }),
  ]);

  return (
    <>
      {isDraftMode && <LivePreviewListener />}
      {/* Server-rendered so the JSON-LD ships in the initial HTML for crawlers. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero
        heading={homepageData?.hero?.heading}
        subheading={homepageData?.hero?.subheading}
      />
      <CertMarquee />
      <CategoryTiles />
      <CustomBranding />
      <Resources />
      <Testimonials />
      <FAQ />
      <CTA
        heading={homepageData?.ctaSection?.heading}
        text={homepageData?.ctaSection?.text}
        buttonText={homepageData?.ctaSection?.buttonText}
        buttonLink={homepageData?.ctaSection?.buttonLink}
      />
    </>
  );
}
