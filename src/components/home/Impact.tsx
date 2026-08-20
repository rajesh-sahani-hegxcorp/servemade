import { Recycle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { IMPACT } from "@/data/impact";

export function Impact() {
  return (
    <section id="sustainability" aria-labelledby="impact-h" className="bg-brand-blue-dark px-5 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10 max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-bold">
              <Recycle size={14} aria-hidden="true" /> Honest sustainability
            </span>
            <h2 id="impact-h" className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Numbers we can prove, not slogans.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT.map((stat) => (
            <div key={stat.label} className="rounded-3xl bg-white/[0.08] p-6">
              <div className="text-4xl font-extrabold tracking-tight">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm text-[#BCD2E4]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
