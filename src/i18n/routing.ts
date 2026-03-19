import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

import { defaultLocale, locales } from "../../i18n/routing";
export { locales, defaultLocale } from "../../i18n/routing";
export type { Locale } from "../../i18n/routing";

// Gera helpers (Link/useRouter/usePathname) já com prefixo de idioma.
const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export const { Link, usePathname, useRouter } = createNavigation(routing);

