import { setRequestLocale } from "next-intl/server";
import GestaoLandingPageClient from "./GestaoLandingPageClient";

export default async function GestaoLandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GestaoLandingPageClient />;
}