import { HomeHeroWithAdmin } from "@/components/HomeHeroWithAdmin";
import { mergeHomeSlides } from "@/lib/adminOverrides";
import type { Locale } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const slides = mergeHomeSlides();
  return (
    <div className="pt-24 md:pt-28">
      <HomeHeroWithAdmin locale={locale} slides={slides} />
    </div>
  );
}
