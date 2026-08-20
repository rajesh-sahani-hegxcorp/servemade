/**
 * Small, dependency-free utility functions shared across components.
 * Keep this file framework-agnostic — no React imports, no JSX.
 */

/** Merge conditional class name fragments, dropping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** "Custom & Private Label" -> "custom-private-label" */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Basic email shape check used as a fast client-side pre-check before the API's real validation. */
export function isLikelyEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function siteUrl(path = ""): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.servemade.example";
  return `${base}${path}`;
}
