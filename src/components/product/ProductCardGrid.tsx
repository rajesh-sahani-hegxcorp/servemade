import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductArt } from "@/components/ui/ProductArt";
import type { Product } from "@/types";
import type { ProductArtType } from "@/types";

function cardArt(product: Product): ProductArtType {
  return product.gallery.type === "static" ? product.gallery.art : "cup";
}

export function ProductCardGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {products.map((product) => (
        <Link
          key={product.slug}
          href={`/products/${product.slug}`}
          className="block rounded-3xl border border-line bg-white text-left shadow-card transition-all hover:-translate-y-1"
        >
          <div className="grid h-36 place-items-center rounded-t-3xl bg-[radial-gradient(90%_110%_at_50%_108%,#EAF5EF,white_72%)]">
            <ProductArt type={cardArt(product)} height={100} label={product.name} />
          </div>
          <div className="p-5">
            <h3 className="text-lg font-extrabold">{product.name}</h3>
            {product.sizes && product.sizes.length > 0 && (
              <p className="mt-1 text-xs font-semibold text-brand-green-dark">
                Available: {product.sizes.map((s) => s.label).join(", ")}
              </p>
            )}
            <p className="mt-1 text-sm text-ink-2">{product.tagline}</p>
            <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-xs font-bold">
              <span className="text-ink-3">
                Min. order{" "}
                <span className="text-brand-blue">
                  {product.moqPieces ? `${product.moqPieces.toLocaleString()} ${product.moqUnit}` : "TBD"}
                </span>
              </span>
              <span className="flex items-center gap-1 text-brand-green-dark">
                View <ArrowRight size={12} aria-hidden="true" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
