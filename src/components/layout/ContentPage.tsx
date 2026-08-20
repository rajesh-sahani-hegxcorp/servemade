import Link from "next/link";
import type { ReactNode } from "react";
import { Tag } from "@/components/ui/Tag";

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  blue?: boolean;
}

/** A plain content page: eyebrow tag, H1, intro paragraph, optional body, quote CTA. */
export function ContentPage({ eyebrow, title, description, children, blue }: Props) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <Tag blue={blue}>{eyebrow}</Tag>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h1>
      <p className="mt-3 max-w-xl text-ink-2">{description}</p>
      {children && <div className="mt-8">{children}</div>}
      <div className="mt-10 rounded-3xl border border-line bg-surface-off p-6">
        <p className="text-sm font-semibold text-ink-2">Have a spec in mind already?</p>
        <Link
          href="/quote"
          className="mt-3 inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3 text-sm font-bold text-white shadow-cta transition-transform hover:-translate-y-0.5"
        >
          Get a quote
        </Link>
      </div>
    </section>
  );
}
