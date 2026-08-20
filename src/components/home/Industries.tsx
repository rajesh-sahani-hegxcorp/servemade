import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { INDUSTRIES } from "@/data/industries";
import { slugify } from "@/lib/utils";

export function Industries() {
  return (
    <section id="industries" aria-labelledby="ind-h" className="bg-surface-off px-5 py-14">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Tag>Who we supply</Tag>
              <h2 id="ind-h" className="mt-3 text-3xl font-extrabold tracking-tight">
                Built around your business.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-ink-2">
              From single cafés to multi-country distributors — supply structured to your volume and reorder
              rhythm.
            </p>
          </div>
        </Reveal>

        <div className="flex snap-x gap-3 overflow-x-auto pb-2">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry}
              href={`/industries/${slugify(industry)}`}
              className="snap-start whitespace-nowrap rounded-full border-2 border-line bg-white px-6 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5 hover:border-brand-green"
            >
              {industry}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
