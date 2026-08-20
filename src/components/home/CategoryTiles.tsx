import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { ProductArt } from "@/components/ui/ProductArt";
import { CATEGORIES } from "@/data/categories";

export function CategoryTiles() {
  return (
    <section id="products" aria-labelledby="cats-h" className="mx-auto max-w-6xl px-5 py-16">
      <Reveal>
        <div className="mx-auto mb-10 max-w-xl text-center">
          <Tag blue>Shop by product</Tag>
          <h2 id="cats-h" className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            Everything for the table, the counter and the courier bag.
          </h2>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category, i) => (
          <Reveal key={category.name} delay={i * 0.05}>
            <Link
              href={category.href}
              className="group block w-full rounded-3xl border border-line bg-white p-5 text-left shadow-card transition-all hover:-translate-y-1"
            >
              <div className="grid h-32 place-items-center rounded-2xl bg-[radial-gradient(90%_110%_at_50%_108%,#EAF5EF,white_72%)]">
                <div className="transition-transform group-hover:scale-110">
                  <ProductArt type={category.art} height={92} label={category.name} />
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-extrabold">{category.name}</h3>
                  <p className="text-sm text-ink-2">{category.description}</p>
                </div>
                <ChevronRight
                  size={18}
                  className="mt-1 text-brand-green transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 border-t border-line pt-3 text-xs font-bold text-ink-3">
                From <span className="text-brand-blue">{category.moq} pieces</span> · carton quantities on every product
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
