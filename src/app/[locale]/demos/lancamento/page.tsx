import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import LancamentoIaLandingPageClient from "./LancamentoIaLandingPageClient";

const siteUrl = "https://fgcode.dev";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Demos.lancamento" });
  
  return {
    title: `${t("title")} | Demo Interativa`,
    description: t("hero_desc"),
    alternates: {
      canonical: `${siteUrl}/${locale}/demos/lancamento`,
      languages: {
        'pt-BR': `${siteUrl}/pt/demos/lancamento`,
        'en-US': `${siteUrl}/en/demos/lancamento`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("hero_desc"),
      url: `${siteUrl}/${locale}/demos/lancamento`,
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
    },
  };
}

export default async function LancamentoIaLandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LancamentoIaLandingPageClient />;
}