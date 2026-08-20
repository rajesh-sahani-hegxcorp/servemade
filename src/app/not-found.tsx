import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-wide text-ink-3">404</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight">That page went out with the compost.</h1>
      <p className="mt-3 text-ink-2">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3 text-sm font-bold text-white shadow-cta transition-transform hover:-translate-y-0.5"
      >
        Back to home
      </Link>
    </section>
  );
}
