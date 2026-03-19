import { setRequestLocale } from "next-intl/server";
import EscritorioLandingPageClient from "./EscritorioLandingPageClient";

export default async function EscritorioLandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <EscritorioLandingPageClient />;
}