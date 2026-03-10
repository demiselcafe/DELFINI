import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SetHtmlLang } from "@/components/SetHtmlLang";
import { AdminProvider } from "@/contexts/AdminContext";
import { AdminBanner } from "@/components/AdminBanner";
import { AdminBannerSpacer } from "@/components/AdminBannerSpacer";
import { LoginWidget } from "@/components/LoginWidget";
import { site } from "@/data/site";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: `${site.artistName} — Peintre`,
  description: "Site de l'artiste peintre. Œuvres, séries, projets in situ et expositions.",
  openGraph: {
    title: `${site.artistName} — Peintre`,
    type: "website",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <>
      <SetHtmlLang />
      <AdminProvider>
        <Header locale={locale} />
        <AdminBanner />
        <main className="flex-1">
          <AdminBannerSpacer />
          {children}
        </main>
        <Footer locale={locale} />
        <LoginWidget />
      </AdminProvider>
    </>
  );
}
