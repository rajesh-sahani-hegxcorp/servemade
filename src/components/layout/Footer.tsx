import Link from "next/link";
import { COMPANY_DESCRIPTION, FOOTER_COLUMNS } from "@/data/site";

const BUILD_MONTH = "August 2026"; // bump manually, or wire to a CMS "last updated" field

export function Footer() {
  return (
    <footer className="bg-ink px-5 pb-6 pt-12 text-sm text-white">
      <div className="mx-auto grid max-w-6xl gap-8 pb-8 text-[#C4CBD0] md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-xl font-extrabold text-white">
            <svg width="26" height="26" viewBox="0 0 30 30" role="img" aria-label="Serve Made logo">
              <rect width="30" height="30" rx="9" fill="#2E8B57" />
              <path d="M9 21c0-6.5 4-10.5 12-12-1.5 8.5-5.5 12-12 12Z" fill="#fff" />
            </svg>
            Serve Made
          </div>
          {/* GEO: same entity description as the Organization JSON-LD, in crawlable prose. */}
          <p className="mt-3 max-w-xs">{COMPANY_DESCRIPTION}</p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h5 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-3">{col.heading}</h5>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 border-t border-white/15 pt-5 text-xs text-ink-3">
        <span>© {new Date().getFullYear()} Serve Made · Page updated: {BUILD_MONTH}</span>
        <span>
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          {" · "}
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
        </span>
      </div>
    </footer>
  );
}
