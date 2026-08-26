import type { Metadata } from "next";
import { Tag } from "@/components/ui/Tag";
import { QuoteForm } from "@/components/quote/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Get FOB, CIF or DDP pricing on certified compostable packaging within one business day.",
};

export default function QuotePage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <Tag>Request a quote</Tag>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
        Tell us what you serve — we&apos;ll send exact pricing.
      </h1>
      <p className="mt-3 max-w-xl text-ink-2">
        Every request goes to our sales team directly. Expect FOB, CIF or DDP pricing, MOQs and lead
        times back within one business day.
      </p>
      <div className="mt-8">
        <QuoteForm source="quote-page" heading="Your request is with our sales team" submitLabel="Send request" />
      </div>
    </section>
  );
}
