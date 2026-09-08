import Link from "next/link";
import { COMPANY_DESCRIPTION, FOOTER_COLUMNS } from "@/data/site";
import type { ProductCategory } from "@/types";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface FooterData {
  companyDescription?: string;
  columns?: FooterColumn[];
  legalLinks?: FooterLink[];
  socialLinks?: SocialLink[];
}

interface FooterProps {
  data?: FooterData | null;
  categories?: ProductCategory[];
}

export function Footer({ data, categories }: FooterProps) {
  const companyDescription =
    data?.companyDescription?.trim() || COMPANY_DESCRIPTION;

  // Auto-generate Products column from categories collection (with fallback to site.ts)
  const productsLinks: FooterLink[] =
    categories && categories.length > 0
      ? [
          ...categories.map((cat) => ({
            label: cat.name,
            href: cat.href,
          })),
          { label: "Custom & Private Label", href: "/custom-packaging" },
        ]
      : FOOTER_COLUMNS.find((col) => col.heading === "Products")?.links || [];

  const productsColumn: FooterColumn = {
    heading: "Products",
    links: productsLinks,
  };

  // Other columns (Company, Get started, etc.) from CMS or fallback from site.ts
  const defaultNonProductColumns = FOOTER_COLUMNS.filter(
    (col) => col.heading !== "Products"
  );

  const customColumns: FooterColumn[] =
    data?.columns && data.columns.length > 0
      ? data.columns
      : defaultNonProductColumns;

  const allColumns: FooterColumn[] = [productsColumn, ...customColumns];

  const legalLinks: FooterLink[] =
    data?.legalLinks && data.legalLinks.length > 0
      ? data.legalLinks
      : [
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
        ];

  const socialLinks: SocialLink[] = data?.socialLinks || [];

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
          <p className="mt-3 max-w-xs">{companyDescription}</p>

          {socialLinks.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-ink-3 transition-colors hover:text-white"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          )}
        </div>

        {allColumns.map((col) => (
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
        <span>© {new Date().getFullYear()} Serve Made</span>
        <span className="flex items-center gap-2">
          {legalLinks.map((link, idx) => (
            <span key={link.label}>
              {idx > 0 && " · "}
              <Link href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            </span>
          ))}
        </span>
      </div>
    </footer>
  );
}
