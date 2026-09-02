import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const staticRoutes = ["", "/collection/intervalo", "/category/aneis", "/category/brincos", "/category/colares", "/category/pulseiras", "/search"];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() })),
    ...getProducts().map((product) => ({ url: `${base}/product/${product.slug}`, lastModified: new Date() })),
  ];
}
