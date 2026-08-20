import { ProductCardGrid } from "@/components/product/ProductCardGrid";
import type { Product } from "@/types";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="rel-h" className="mx-auto max-w-6xl px-5 py-14">
      <div className="mx-auto mb-8 max-w-xl text-center">
        <span className="inline-flex rounded-full bg-brand-green-light px-4 py-1 text-sm font-bold text-brand-green-dark">
          Complete the set
        </span>
        <h2 id="rel-h" className="mt-3 text-3xl font-extrabold tracking-tight">
          Pairs perfectly with these
        </h2>
        <p className="mt-2 text-sm text-ink-2">Most buyers add these to the same container — one shipment, one contact.</p>
      </div>
      <ProductCardGrid products={products} />
    </section>
  );
}
