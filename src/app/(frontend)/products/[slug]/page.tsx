import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import Link from "next/link";
import { getAllProducts, findProduct, resolveRelatedProducts } from "@/lib/payload-data";
import { buildProductJsonLd } from "@/lib/jsonld";
import { siteUrl } from "@/lib/utils";
import { ProductBreadcrumb } from "@/components/product/ProductBreadcrumb";
import { ProductConfigurator } from "@/components/product/ProductConfigurator";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductFAQ } from "@/components/product/ProductFAQ";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { LivePreviewListener } from "@/components/LivePreviewListener";

interface Props {
  params: Promise<{ slug: string }>;
}

// Pre-renders every product in the catalogue at build time from Payload.
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();
  const product = await findProduct(slug, { draft: isDraftMode });
  if (!product) return {};

  const url = siteUrl(`/products/${product.slug}`);

  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.tagline,
    alternates: {
      canonical: url,
      languages: { en: url, ar: siteUrl(`/ar/products/${product.slug}`) },
    },
    openGraph: {
      title: `${product.name} | Serve Made`,
      description: product.tagline,
      type: "website",
      images: [{ url: `/og/${product.slug}.png`, width: 1200, height: 630, alt: product.name }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();
  const product = await findProduct(slug, { draft: isDraftMode });
  if (!product) notFound();

  const related = await resolveRelatedProducts(product);
  const jsonLd = buildProductJsonLd(product);

  return (
    <div className="pb-20 md:pb-0">
      {isDraftMode && <LivePreviewListener />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-6xl px-5">
        <ProductBreadcrumb product={product} />
      </div>

      {/* Interactive size/quantity/shipping/branding configurator + gallery */}
      <Suspense fallback={null}>
        <ProductConfigurator product={product} />
      </Suspense>

      {/* Overview / Specifications / Order quantities / Certifications */}
      <ProductTabs product={product} />

      <ProductFAQ faqs={product.faqs} />

      <RelatedProducts products={related} />

      <div className="mx-auto max-w-6xl px-5 pb-14">
        <div className="rounded-3xl bg-gradient-to-br from-brand-green-dark to-brand-green px-8 py-11 text-center text-white">
          <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            Not sure which size or quantity is right?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#DFF0E6]">
            Tell us about your business — we&apos;ll recommend the right setup and send samples.
          </p>
          <Link
            href="/quote"
            className="mt-5 inline-flex rounded-full bg-white px-7 py-4 font-bold text-brand-green-dark transition-transform hover:-translate-y-0.5"
          >
            Talk to our team
          </Link>
        </div>
      </div>
    </div>
  );
}
