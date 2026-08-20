"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { FAQS } from "@/data/faqs";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section aria-labelledby="faq-h" className="bg-surface-off px-5 py-16">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="mb-8 text-center">
            <Tag blue>Common questions</Tag>
            <h2 id="faq-h" className="mt-3 text-3xl font-extrabold tracking-tight">
              Quick answers, up front.
            </h2>
          </div>
        </Reveal>

        <div className="space-y-2.5">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border border-line bg-white ${isOpen ? "shadow-card" : ""}`}
              >
                <button
                  className="flex w-full items-center gap-3 px-5 py-4 text-left font-bold"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  {faq.question}
                  <span
                    className="ml-auto grid h-7 w-7 flex-none place-items-center rounded-full bg-brand-green-light text-brand-green-dark transition-transform"
                    style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                  >
                    <ChevronDown size={15} aria-hidden="true" />
                  </span>
                </button>
                {isOpen && <p className="px-5 pb-4 text-sm text-ink-2">{faq.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
