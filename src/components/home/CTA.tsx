import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  return (
    <section aria-label="Get started" className="mx-auto max-w-6xl px-5 py-16">
      <Reveal>
        <div className="rounded-3xl bg-gradient-to-br from-brand-green-dark to-brand-green px-8 py-12 text-center text-white">
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">Ready when you are.</h2>
          <p className="mx-auto mt-3 max-w-md text-[#DFF0E6]">
            Start with a free quote or a sample pack — no commitment, pricing back within one business day.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 font-bold text-brand-green-dark transition-transform hover:-translate-y-0.5"
            >
              Get my free quote
            </Link>
            <Link
              href="/samples"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/50 px-7 py-4 font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              Request samples
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
