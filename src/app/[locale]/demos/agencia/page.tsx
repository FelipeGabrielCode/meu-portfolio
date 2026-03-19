import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import AgenciaLandingPageClient from "./AgenciaLandingPageClient";

const siteUrl = "https://fgcode.dev";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Demos.agencia" });
  
  return {
    title: `${t("title")} | Demo Interativa`,
    description: t("hero_desc"),
    alternates: {
      canonical: `${siteUrl}/${locale}/demos/agencia`,
      languages: {
        'pt-BR': `${siteUrl}/pt/demos/agencia`,
        'en-US': `${siteUrl}/en/demos/agencia`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("hero_desc"),
      url: `${siteUrl}/${locale}/demos/agencia`,
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
    },
  };
}

export default async function AgenciaLandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AgenciaLandingPageClient />;
}