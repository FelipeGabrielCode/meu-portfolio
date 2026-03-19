import type { MetadataRoute } from "next";

const siteUrl = "https://fgcode.dev";
const locales = ["pt", "en"];

// Rotas principais do site
const routes = [
  "", // Home
  "/demos/gestao",
  "/demos/clinica",
  "/demos/agencia",
  "/demos/lancamento",
  "/demos/escritorio",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Gerar entradas para cada combinação de locale e rota
  for (const locale of locales) {
    for (const route of routes) {
      const url = `${siteUrl}/${locale}${route}`;
      const isHome = route === "";
      
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: isHome ? "daily" : "weekly",
        priority: isHome ? 1.0 : 0.8,
        alternates: {
          languages: {
            "pt-BR": `${siteUrl}/pt${route}`,
            "en-US": `${siteUrl}/en${route}`,
            en: `${siteUrl}/en${route}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}
