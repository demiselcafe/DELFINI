import Link from "next/link";
import Image from "next/image";
import { seriesList } from "@/data/series";
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
            <Link
              key={series.id}
              href={`/${locale}/works/${series.slug}`}
              className="group block"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-black/5">
                <Image
                  src={series.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h2 className="mt-4 font-serif text-xl md:text-2xl text-ink group-hover:opacity-80">
                {series.title}
              </h2>
              {series.excerpt && (
                <p className="mt-2 text-sm text-inkMuted leading-relaxed line-clamp-2">
                  {series.excerpt}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
