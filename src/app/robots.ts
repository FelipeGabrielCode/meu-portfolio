import type { MetadataRoute } from "next";

const siteUrl = "https://fgcode.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",        // Rotas de API internas
        "/_next/",      // Arquivos internos do Next.js
        "/private/",    // Qualquer rota privada
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
