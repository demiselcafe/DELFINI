import { HomeHeroWithAdmin } from "@/components/HomeHeroWithAdmin";
import { FALLBACK_HERO_URL } from "@/data/homeSlides";
import { mergeHomeSlides } from "@/lib/adminOverrides";
import type { Locale } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  let slides = mergeHomeSlides();
  if (process.env.VERCEL && slides[0]?.image?.startsWith("/")) {
    slides = [{ ...slides[0], image: FALLBACK_HERO_URL }, ...slides.slice(1)];
  }
  return (
    <div className="pt-24 md:pt-28">
      <HomeHeroWithAdmin locale={locale} slides={slides} />
    </div>
  );
}
