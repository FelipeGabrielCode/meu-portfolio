import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import HomePageClient from "./page-client";

const siteUrl = "https://fgcode.dev";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  
  return {
    title: t("home.title"),
    description: t("home.description"),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        'pt-BR': `${siteUrl}/pt`,
        'en-US': `${siteUrl}/en`,
        'en': `${siteUrl}/en`,
      },
    },
    openGraph: {
      title: t("home.ogTitle"),
      description: t("home.ogDescription"),
      url: `${siteUrl}/${locale}`,
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomePageClient />;
}

