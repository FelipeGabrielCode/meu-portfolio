import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import GestaoLandingPageClient from "./GestaoLandingPageClient";

const siteUrl = "https://fgcode.dev";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Demos.gestao" });
  
  return {
    title: `${t("title")} | Demo Interativa`,
    description: t("hero_desc"),
    alternates: {
      canonical: `${siteUrl}/${locale}/demos/gestao`,
      languages: {
        'pt-BR': `${siteUrl}/pt/demos/gestao`,
        'en-US': `${siteUrl}/en/demos/gestao`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("hero_desc"),
      url: `${siteUrl}/${locale}/demos/gestao`,
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
    },
  };
}

export default async function GestaoLandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GestaoLandingPageClient />;
}