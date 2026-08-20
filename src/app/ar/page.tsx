import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "النسخة العربية",
  description: "النسخة العربية من موقع فيرداونو قيد الإنشاء.",
};

// Placeholder for the Arabic locale referenced by hreflang in layout.tsx and
// the header language switch. Replace with a full /ar route group (or
// next-intl / i18n routing) when Arabic content is ready.
export default function ArabicStubPage() {
  return (
    <section dir="rtl" className="mx-auto max-w-2xl px-5 py-20 text-center">
      <h1 className="text-3xl font-extrabold">النسخة العربية قادمة قريبًا</h1>
      <p className="mt-3 text-ink-2">نعمل حاليًا على إطلاق موقعنا باللغة العربية. تواصل معنا عبر واتساب في الوقت الحالي.</p>
    </section>
  );
}
