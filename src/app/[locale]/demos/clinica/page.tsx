import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import ClinicaLandingPageClient from "./ClinicaLandingPageClient";

const siteUrl = "https://fgcode.dev";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Demos.clinica" });
  
  return {
    title: `${t("title")} | Demo Interativa`,
    description: t("hero_desc"),
    alternates: {
      canonical: `${siteUrl}/${locale}/demos/clinica`,
      languages: {
        'pt-BR': `${siteUrl}/pt/demos/clinica`,
        'en-US': `${siteUrl}/en/demos/clinica`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("hero_desc"),
      url: `${siteUrl}/${locale}/demos/clinica`,
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
    },
  };
}

export default async function ClinicaLandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ClinicaLandingPageClient />;
}