import type { Metadata } from "next";
import { Tag } from "@/components/ui/Tag";
import { QuoteForm } from "@/components/quote/QuoteForm";

export const metadata: Metadata = {
  title: "Request Samples",
  description: "Request physical samples of Verdano's certified compostable food packaging before you order.",
};

export default function SamplesPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <Tag blue>Request samples</Tag>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
        See and feel it before you commit.
      </h1>
      <p className="mt-3 max-w-xl text-ink-2">
        We&apos;ll send a physical sample pack of anything in your quote list, or a general starter set if
        you&apos;re still exploring.
      </p>
      <div className="mt-8">
        <QuoteForm source="samples-page" heading="Your sample request is on its way to our team" submitLabel="Request samples" />
      </div>
    </section>
  );
}
