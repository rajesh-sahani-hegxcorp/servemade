import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Product } from "@/types";

export function ProductBreadcrumb({ product }: { product: Product }) {
  return (
    <nav className="flex flex-wrap items-center gap-2 pt-5 text-sm font-semibold text-ink-3" aria-label="Breadcrumb">
      <Link href="/" className="text-ink-2 hover:underline">
        Home
      </Link>
      <ChevronRight size={14} aria-hidden="true" />
      <Link href="/products" className="text-ink-2 hover:underline">
        Products
      </Link>
      <ChevronRight size={14} aria-hidden="true" />
      <Link href={`/categories/${product.categorySlug}`} className="text-ink-2 hover:underline">
        {product.categoryName}
      </Link>
      <ChevronRight size={14} aria-hidden="true" />
      <b className="text-ink" aria-current="page">
        {product.name}
      </b>
    </nav>
  );
}
