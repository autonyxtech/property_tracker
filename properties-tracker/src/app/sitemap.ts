import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl.origin;
  return ["", "/properties/", "/services/", "/contact/"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route ? "monthly" : "weekly",
    priority: route ? 0.75 : 1,
  }));
}
