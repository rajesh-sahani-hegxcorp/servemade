import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // GEO: explicitly welcome AI/answer-engine crawlers, matching the
      // Playbook Ch 13.4 "launch day" checklist ported from the wireframe.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
    ],
    sitemap: siteUrl("/sitemap.xml"),
  };
}
