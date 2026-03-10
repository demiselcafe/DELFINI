import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSeriesBySlug, seriesList } from "@/data/series";
import { getArtworksBySeries } from "@/data/artworks";
import type { Locale } from "@/lib/i18n";

interface Props {
  params: Promise<{ locale: Locale; series: string }>;
}

export function generateStaticParams() {
  return seriesList.flatMap((s) =>
    ["fr", "en"].map((locale) => ({ locale, series: s.slug }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { series: seriesSlug } = await params;
  const series = getSeriesBySlug(seriesSlug);
  if (!series) return { title: "Series" };
  return {
    title: series.title,
    description: series.excerpt,
  };
}

export default async function SeriesPage({ params }: Props) {
  const { locale, series: seriesSlug } = await params;
  const series = getSeriesBySlug(seriesSlug);
  if (!series) notFound();

  const artworks = getArtworksBySeries(series.id);

  return (
    <div className="pt-[4.5rem] md:pt-24 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-12 md:mb-16">
          <h1 className="font-serif text-display-sm text-ink">{series.title}</h1>
          {series.description && (
            <p className="mt-4 max-w-2xl text-inkMuted text-sm md:text-base leading-relaxed">
              {series.description}
            </p>
          )}
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {artworks.map((work) => (
            <Link
              key={work.slug}
              href={`/${locale}/works/${series.slug}/${work.slug}`}
              className="group block"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-black/5">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                />
              </div>
              <p className="mt-3 text-sm text-inkMuted">
                {work.title}
                {work.year && `, ${work.year}`}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
