import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { TESTIMONIALS } from "@/data/testimonials";

export interface TestimonialsProps {
  testimonials?: Array<{
    quote?: string | null;
    authorName?: string | null;
    authorTitle?: string | null;
    authorPhoto?: any;
    id?: string | null;
  }> | null;
}

export function Testimonials({ testimonials }: TestimonialsProps = {}) {
  const customTestimonials = testimonials
    ?.filter((t) => Boolean(t && t.quote && t.quote.trim().length > 0))
    .map((t) => ({
      quote: t.quote || "",
      who: t.authorName || "Anonymous",
      org: t.authorTitle || "",
    }));

  const displayTestimonials =
    customTestimonials && customTestimonials.length > 0
      ? customTestimonials
      : TESTIMONIALS;

  return (
    <section aria-labelledby="test-h" className="mx-auto max-w-6xl px-5 py-16">
      <Reveal>
        <div className="mb-8">
          <Tag>Partnerships, not transactions</Tag>
          <h2 id="test-h" className="mt-3 text-3xl font-extrabold tracking-tight">
            Buyers stay for the reliability.
          </h2>
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2">
        {displayTestimonials.map((testimonial, i) => (
          <Reveal key={`${testimonial.who}-${i}`} delay={i * 0.07}>
            <figure className="rounded-3xl border border-line bg-white p-7 shadow-card">
              <div className="flex gap-1" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={15} fill="#2E8B57" stroke="none" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-3 text-lg font-semibold leading-snug">&quot;{testimonial.quote}&quot;</blockquote>
              <figcaption className="mt-4 text-sm font-bold">
                {testimonial.who}{testimonial.org ? <span className="font-medium text-ink-3"> · {testimonial.org}</span> : null}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <p className="mt-3 text-xs text-ink-3">
        Representative feedback for review — replace with named, verifiable references before launch.
      </p>
    </section>
  );
}
