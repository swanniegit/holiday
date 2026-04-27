import type { MetadataRoute } from "next";

const BASE = "https://32onherold-holidays.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                        lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/destinations`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/packages`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/testimonials`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`,           lastModified: new Date(), changeFrequency: "yearly",  priority: 0.8 },
    { url: `${BASE}/disclaimer`,        lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];
}
