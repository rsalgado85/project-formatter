import type { MetadataRoute } from "next";

const BASE_URL = "https://formatter-hub.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/json-formatter",
    "/xml-formatter",
    "/yaml-converter",
    "/base64",
    "/base64-to-image",
    "/password-generator",
    "/password-checker",
    "/password-tools",
    "/about",
    "/donate",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));
}
