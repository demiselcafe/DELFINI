import { HeroCarousel } from "@/components/HeroCarousel";
import { HomeGallery } from "@/components/HomeGallery";
import type { Locale } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return (
    <div className="pt-24 md:pt-28">
      <HeroCarousel locale={locale} />
      <HomeGallery />
    </div>
  );
}
