import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import EscritorioLandingPageClient from "./EscritorioLandingPageClient";

const siteUrl = "https://fgcode.dev";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Demos.escritorio" });
  
  return {
    title: `${t("title")} | Demo Interativa`,
    description: t("hero_desc"),
    alternates: {
      canonical: `${siteUrl}/${locale}/demos/escritorio`,
      languages: {
        'pt-BR': `${siteUrl}/pt/demos/escritorio`,
        'en-US': `${siteUrl}/en/demos/escritorio`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("hero_desc"),
      url: `${siteUrl}/${locale}/demos/escritorio`,
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
    },
  };
}

export default async function EscritorioLandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <EscritorioLandingPageClient />;
}