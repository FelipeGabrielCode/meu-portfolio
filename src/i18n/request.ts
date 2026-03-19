import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // 1. Lemos o requestLocale (que agora é uma Promise no Next.js 15)
  let locale = await requestLocale;

  // 2. Se não vier idioma ou for inválido, forçamos o padrão (pt)
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // 3. Agora sim, ele vai buscar o en.json quando a URL for /en
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});