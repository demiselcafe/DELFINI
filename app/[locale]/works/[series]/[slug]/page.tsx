import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSeriesBySlug } from "@/data/series";
import { getArtwork, artworks } from "@/data/artworks";
import type { Locale } from "@/lib/i18n";

interface Props {
  params: Promise<{ locale: Locale; series: string; slug: string }>;
}

export function generateStaticParams() {
  return artworks.flatMap((a) =>
    ["fr", "en"].map((locale) => ({ locale, series: a.seriesId, slug: a.slug }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, series: seriesSlug, slug } = await params;
  const artwork = getArtwork(seriesSlug, slug);
  const series = getSeriesBySlug(seriesSlug);
  if (!artwork || !series) return { title: "Œuvre" };
  return {
    title: `${artwork.title} — ${series.title}`,
    description: `${artwork.title}, ${artwork.year}. ${artwork.medium}, ${artwork.dimensions}.`,
  };
}

export default async function ArtworkPage({ params }: Props) {
  const { locale, series: seriesSlug, slug } = await params;
  const series = getSeriesBySlug(seriesSlug);
  const artwork = getArtwork(seriesSlug, slug);
  if (!series || !artwork) notFound();

  return (
    <div className="pt-[4.5rem] md:pt-24 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="mb-8">
          <Link
            href={`/${locale}/works/${series.slug}`}
            className="text-sm text-inkMuted hover:text-ink transition-colors"
          >
            ← {series.title}
          </Link>
        </nav>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-8">
            <div className="relative aspect-[3/4] max-h-[85vh] bg-black/5">
              <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                className="object-contain object-left-top"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
                unoptimized
              />
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col justify-start">
            <h1 className="font-serif text-2xl md:text-3xl text-ink">
              {artwork.title}
            </h1>
            <dl className="mt-6 space-y-2 text-sm text-inkMuted">
              {artwork.year && (
                <div>
                  <dt className="sr-only">Année</dt>
                  <dd>{artwork.year}</dd>
                </div>
              )}
              {artwork.medium && (
                <div>
                  <dt className="sr-only">Technique</dt>
                  <dd>{artwork.medium}</dd>
                </div>
              )}
              {artwork.dimensions && (
                <div>
                  <dt className="sr-only">Dimensions</dt>
                  <dd>{artwork.dimensions}</dd>
                </div>
              )}
            </dl>
            {(artwork.available === true || artwork.available === false) && (
              <p className="mt-4 text-sm text-inkMuted">
                {artwork.available ? "Available on request" : "—"}
              </p>
            )}
            <Link
              href={`/${locale}/contact?inquiry=artwork`}
              className="mt-6 inline-block border border-ink py-2.5 px-5 text-sm tracking-wide hover:bg-ink hover:text-paper transition-colors"
            >
              Inquire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
