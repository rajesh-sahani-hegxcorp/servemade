import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getAllCategories, findCategory, findProductsByCategory } from "@/lib/payload-data";
import { Tag } from "@/components/ui/Tag";
import { ProductArt } from "@/components/ui/ProductArt";
import { ProductCardGrid } from "@/components/product/ProductCardGrid";
import { LivePreviewListener } from "@/components/LivePreviewListener";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.filter((c) => c.href.startsWith("/categories/")).map((c) => ({
    slug: c.href.replace("/categories/", ""),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();
  const category = await findCategory(slug, { draft: isDraftMode });
  if (!category) return {};

  const title = category.meta?.title?.trim() || category.name;
  const description =
    category.meta?.description?.trim() || category.description?.trim() || category.name;

  return { title, description };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();
  const category = await findCategory(slug, { draft: isDraftMode });
  if (!category) notFound();

  const products = await findProductsByCategory(slug);

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      {isDraftMode && <LivePreviewListener />}
      <Tag blue>Product category</Tag>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{category.name}</h1>
      <p className="mt-3 max-w-xl text-ink-2">{category.description}</p>

      <div className="mt-6 grid place-items-center rounded-3xl border border-line bg-[radial-gradient(90%_110%_at_50%_108%,#EAF5EF,white_70%)] p-8 md:hidden">
        <ProductArt type={category.art} height={140} label={category.name} />
      </div>

      <p className="mt-6 text-sm font-bold text-ink-3">
        From <span className="text-brand-blue">{category.moq} pieces</span> · carton quantities on every product
      </p>

      <div className="mt-8">
        {products.length > 0 ? (
          <ProductCardGrid products={products} />
        ) : (
          <p className="rounded-2xl border border-line bg-surface-off p-6 text-sm text-ink-2">
            We&apos;re still adding individual product pages for this category —{" "}
            <a href="/quote" className="font-bold text-brand-green-dark underline">
              ask our team
            </a>{" "}
            for the full catalogue in the meantime.
          </p>
        )}
      </div>
    </section>
  );
}
