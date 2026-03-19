import { setRequestLocale } from "next-intl/server";
import LancamentoIaLandingPageClient from "./LancamentoIaLandingPageClient";

export default async function LancamentoIaLandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LancamentoIaLandingPageClient />;
}