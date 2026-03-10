import { getSeriesWithMergedImages } from "@/lib/adminOverrides";
import { SeriesCardWithAdmin } from "@/components/SeriesCardWithAdmin";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  return {
    title: "Works",
    description: "Séries d'œuvres — Cameroun, Marseille, Impressions Nomades, Commissions.",
  };
}

export default async function WorksPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const seriesList = getSeriesWithMergedImages();

  return (
    <div className="pt-[4.5rem] md:pt-24 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-12 md:mb-16">
          <h1 className="font-serif text-display-sm text-ink">Works</h1>
          <p className="mt-4 max-w-xl text-inkMuted text-sm md:text-base leading-relaxed">
            Le travail se déploie en séries liées à des territoires et des thèmes.
          </p>
        </header>

        <div className="grid gap-8 md:gap-12 md:grid-cols-2">
          {seriesList.map((series) => (
            <SeriesCardWithAdmin key={series.id} locale={locale} series={series} />
          ))}
        </div>
      </div>
    </div>
  );
}
