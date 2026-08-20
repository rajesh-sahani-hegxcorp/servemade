"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/types";

export function ProductFAQ({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section aria-labelledby="faq-h" className="bg-surface-off px-5 py-12">
      <div className="mx-auto max-w-3xl">
        <h2 id="faq-h" className="text-center text-2xl font-extrabold tracking-tight">
          Quick answers
        </h2>
        <div className="mt-6 space-y-2.5">
          {faqs.map((faq, i) => {
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
