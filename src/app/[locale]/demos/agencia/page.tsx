import { setRequestLocale } from "next-intl/server";
import AgenciaLandingPageClient from "./AgenciaLandingPageClient";

export default async function AgenciaLandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AgenciaLandingPageClient />;
}