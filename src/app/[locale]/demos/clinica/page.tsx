import { setRequestLocale } from "next-intl/server";
import ClinicaLandingPageClient from "./ClinicaLandingPageClient";

export default async function ClinicaLandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ClinicaLandingPageClient />;
}