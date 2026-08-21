import type { Metadata } from "next";
import { PRODUCTS } from "@/data/products";
import { Tag } from "@/components/ui/Tag";
import { ProductCatalogueExplorer } from "@/components/product/ProductCatalogueExplorer";

export const metadata: Metadata = {
  title: "All Products",
  description: "Certified compostable food packaging — plates, cups, takeaway boxes, bags, cutlery and straws.",
};

export default function ProductsIndexPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <Tag>Full catalogue</Tag>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Every product, one supplier.</h1>
      <p className="mt-3 max-w-xl text-ink-2">
        Browse our complete range of certified compostable packaging for cafés, QSR, catering, and export. Filter
        by category or search live across all 42 product families below.
      </p>

      <ProductCatalogueExplorer products={PRODUCTS} />
    </section>
  );
}
