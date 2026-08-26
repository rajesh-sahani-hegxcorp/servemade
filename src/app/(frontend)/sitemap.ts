import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/data/categories";
import { INDUSTRIES } from "@/data/industries";
import { RESOURCES } from "@/data/resources";
import { PRODUCTS } from "@/data/products";
import { siteUrl, slugify } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: siteUrl("/products"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: siteUrl("/quote"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: siteUrl("/samples"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: siteUrl("/custom-packaging"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: siteUrl("/why-serve-made"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: siteUrl("/sustainability"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: siteUrl("/resources"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: siteUrl(c.href),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: siteUrl(`/products/${p.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const industryRoutes: MetadataRoute.Sitemap = INDUSTRIES.map((industry) => ({
    url: siteUrl(`/industries/${slugify(industry)}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const resourceRoutes: MetadataRoute.Sitemap = RESOURCES.map((r) => ({
    url: siteUrl(r.href),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...industryRoutes, ...resourceRoutes];
}
