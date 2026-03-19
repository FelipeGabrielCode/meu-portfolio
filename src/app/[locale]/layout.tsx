import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Providers from "@/app/providers";
import { locales } from "@/i18n/routing";

const siteUrl = "https://fgcode.dev";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    pt: "Felipe Gabriel | Desenvolvedor Full Stack & DevOps",
    en: "Felipe Gabriel | Full Stack Developer & DevOps"
  };
  
  const descriptions = {
    pt: "Portfólio profissional de Felipe Gabriel - Desenvolvedor Full Stack especializado em Next.js, React, Node.js, DevOps e automações inteligentes.",
    en: "Felipe Gabriel's professional portfolio - Full Stack Developer specialized in Next.js, React, Node.js, DevOps and intelligent automations."
  };
  
  return {
    title: titles[locale as keyof typeof titles] || titles.pt,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.pt,
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        'pt-BR': `${siteUrl}/pt`,
        'en-US': `${siteUrl}/en`,
        'en': `${siteUrl}/en`,
      },
    },
    openGraph: {
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      url: `${siteUrl}/${locale}`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers>{children}</Providers>
    </NextIntlClientProvider>
  );
}

