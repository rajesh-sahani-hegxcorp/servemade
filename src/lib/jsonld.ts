import { getAllCategories } from "@/lib/payload-data";
import { FAQS } from "@/data/faqs";
import { siteUrl } from "@/lib/utils";
import type { Product } from "@/types";

const ORG_ID = () => `${siteUrl()}/#org`;

/** Organization entity shared by every JSON-LD graph on the site (GEO). */
function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID(),
    name: "Serve Made",
    url: siteUrl(),
    logo: siteUrl("/logo.png"),
    description:
      "Serve Made is an India-based B2B exporter of certified compostable food packaging — bagasse tableware, paper cups, takeaway boxes, bags, cutlery and straws — serving importers, distributors and food-service groups across the GCC and beyond.",
    address: { "@type": "PostalAddress", addressCountry: "IN", addressLocality: "Mumbai" },
    areaServed: ["AE", "SA", "QA", "OM", "BH", "KW"],
    contactPoint: { "@type": "ContactPoint", contactType: "sales", availableLanguage: ["en", "ar"] },
    sameAs: ["https://www.linkedin.com/company/serve-made-example"],
  };
}

/**
 * Builds the JSON-LD graph injected on the homepage: Organization, WebSite +
 * SearchAction (AEO — lets assistants deep-link the pack finder), an
 * ItemList of categories, and FAQPage (must stay word-for-word identical to
 * the on-page FAQ — both this and <FAQ> import from data/faqs.ts).
 */
export async function buildHomeJsonLd() {
  const categories = await getAllCategories();

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteUrl(),
    name: "Serve Made",
    publisher: { "@id": ORG_ID() },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${siteUrl()}/finder?q={query}` },
      "query-input": "required name=query",
    },
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Serve Made product categories",
    itemListElement: categories.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: siteUrl(c.href),
    })),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return [buildOrganizationJsonLd(), website, itemList, faqPage];
}

/**
 * Builds the JSON-LD graph for one /products/[slug] page: Product (with
 * MOQ/carton/HS-code/lead-time as additionalProperty, so answer engines can
 * quote them directly — AEO), BreadcrumbList (must match the on-page
 * breadcrumb hrefs exactly), and FAQPage (parity with the on-page FAQ).
 */
export function buildProductJsonLd(product: Product) {
  const url = siteUrl(`/products/${product.slug}`);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description: product.summary,
    brand: { "@type": "Brand", name: "Serve Made" },
    manufacturer: { "@id": ORG_ID() },
    category: product.categoryName,
    material: product.material,
    countryOfOrigin: "IN",
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Importers, distributors, cafés, food-service groups",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Minimum order quantity",
        value: product.moqPieces ? `${product.moqPieces.toLocaleString()} ${product.moqUnit}` : "TBD",
      },
      ...(product.cartonPack ? [{ "@type": "PropertyValue", name: "Carton pack", value: product.cartonPack }] : []),
      ...(product.cartonVolume ? [{ "@type": "PropertyValue", name: "Carton volume", value: product.cartonVolume }] : []),
      ...(product.hsCode ? [{ "@type": "PropertyValue", name: "HS code", value: product.hsCode }] : []),
      { "@type": "PropertyValue", name: "Production lead time", value: product.leadTime },
      { "@type": "PropertyValue", name: "Shipping terms", value: "FOB, CIF, DDP" },
      { "@type": "PropertyValue", name: "Ships from", value: product.shipsFrom },
    ],
    hasCertification: product.certifications.map((c) => ({ "@type": "Certification", name: c.name })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Products", item: siteUrl("/products") },
      { "@type": "ListItem", position: 3, name: product.categoryName, item: siteUrl(`/categories/${product.categorySlug}`) },
      { "@type": "ListItem", position: 4, name: product.name, item: url },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return [productLd, breadcrumbLd, faqLd];
}
