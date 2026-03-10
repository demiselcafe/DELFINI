"use client";

import Link from "next/link";
import Image from "next/image";
import { useAdmin } from "@/contexts/AdminContext";
import { EditImageBar } from "@/components/EditImageBar";
import type { Locale } from "@/lib/i18n";

interface SeriesCardWithAdminProps {
  locale: Locale;
  series: { id: string; slug: string; title: string; excerpt: string; image: string };
}

async function saveSeriesImage(seriesId: string, url: string) {
  const res = await fetch("/api/admin/overrides");
  const current = await res.json();
  const seriesImages = { ...(current.seriesImages ?? {}), [seriesId]: url };
  await fetch("/api/admin/overrides", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...current, seriesImages }),
  });
}

export function SeriesCardWithAdmin({ locale, series }: SeriesCardWithAdminProps) {
  const { isAdmin, isEditMode } = useAdmin();

  return (
    <div className="group block">
      <Link href={`/${locale}/works/${series.slug}`} className="block">
        <div className="aspect-[4/3] relative overflow-hidden bg-black/5">
          <Image
            src={series.image}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized={series.image.startsWith("/uploads/")}
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
      {isAdmin && isEditMode && (
        <EditImageBar
          label={series.title}
          slot={`series-${series.id}`}
          currentUrl={series.image}
          onSave={async (url) => saveSeriesImage(series.id, url)}
        />
      )}
    </div>
  );
}
