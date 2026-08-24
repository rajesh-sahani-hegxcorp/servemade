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
              key={category.name}
              href={category.href}
              className="group relative block w-full h-[310px] rounded-3xl border border-line bg-white p-5 text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg overflow-hidden flex flex-col justify-end"
            >
              {/* Image Container (animates from top-thumbnail to full-bleed background) */}
              <div className="absolute top-5 left-5 right-5 h-36 rounded-2xl overflow-hidden transition-all duration-500 ease-out group-hover:top-0 group-hover:left-0 group-hover:right-0 group-hover:h-full group-hover:rounded-none">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-[radial-gradient(90%_110%_at_50%_108%,#EAF5EF,white_72%)]">
                    <div className="transition-transform duration-500 ease-out group-hover:scale-110">
                      <ProductArt type={category.art} height={92} label={category.name} />
                    </div>
                  </div>
                )}
                {/* Subtle bottom gradient overlay on hover for text readability without darkening the whole photo */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {/* Text Content */}
              <div className="relative z-10 flex flex-col justify-end w-full transition-all duration-500 ease-in-out">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-extrabold truncate transition-colors duration-300 group-hover:text-white">
                      {category.name}
                    </h3>
                    <p className="text-sm text-ink-2 mt-1 line-clamp-2 transition-all duration-500 ease-in-out group-hover:max-h-0 group-hover:opacity-0 group-hover:mt-0 overflow-hidden">
                      {category.description}
                    </p>
                  </div>
                  <ChevronRight
                    size={18}
                    className="mt-1 text-brand-green flex-shrink-0 transition-all duration-300 group-hover:text-white group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
                {category.moq && (
                  <div className="border-t border-line mt-3 pt-3 text-xs font-bold text-ink-3 transition-all duration-500 ease-in-out group-hover:max-h-0 group-hover:opacity-0 group-hover:mt-0 group-hover:pt-0 group-hover:border-transparent overflow-hidden">
                    From <span className="text-brand-blue">{category.moq} pieces</span> · carton quantities on every product
                  </div>
                )}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
