import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { RESOURCES } from "@/data/resources";

export function Resources() {
  return (
    <section id="resources" aria-labelledby="res-h" className="bg-surface-off px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto mb-10 max-w-xl text-center">
            <Tag blue>Learn before you buy</Tag>
            <h2 id="res-h" className="mt-3 text-3xl font-extrabold tracking-tight">
              Answers your team will actually use.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {RESOURCES.map((resource, i) => {
            const Icon = resource.icon;
            return (
              <Reveal key={resource.title} delay={i * 0.06}>
                <Link
                  href={resource.href}
                  className="block w-full rounded-3xl border border-line bg-white p-6 text-left shadow-card transition-all hover:-translate-y-1"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-green-light">
                    <Icon size={22} className="text-brand-green-dark" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 block text-lg font-extrabold">{resource.title}</h3>
                  <p className="mt-1 text-sm text-ink-2">{resource.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-green-dark">
                    {resource.cta} <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
