"use client";

import { useAdmin } from "@/contexts/AdminContext";
import { HeroCarousel } from "@/components/HeroCarousel";
import { EditImageBar } from "@/components/EditImageBar";
import type { Locale } from "@/lib/i18n";
import type { HomeSlide } from "@/data/homeSlides";

interface HomeHeroWithAdminProps {
  locale: Locale;
  slides: HomeSlide[];
}

async function saveHomeSlideImage(index: number, url: string) {
  const res = await fetch("/api/admin/overrides");
  const current = await res.json();
  const slides = current.homeSlides ?? [];
  while (slides.length <= index) slides.push({});
  const next = [...slides];
  next[index] = { ...next[index], image: url };
  await fetch("/api/admin/overrides", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...current, homeSlides: next }),
  });
}

export function HomeHeroWithAdmin({ locale, slides }: HomeHeroWithAdminProps) {
  const { isAdmin, isEditMode } = useAdmin();

  return (
    <section className="relative w-full bg-white">
      <HeroCarousel locale={locale} slides={slides} />
      {isAdmin && isEditMode && (
        <div className="max-w-3xl mx-auto px-6 pb-4 space-y-2">
          {slides.map((s, i) => (
            <EditImageBar
              key={s.id}
              label={`Slide ${i + 1}`}
              slot={`home-${i}`}
              currentUrl={s.image}
              onSave={async (url) => saveHomeSlideImage(i, url)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
