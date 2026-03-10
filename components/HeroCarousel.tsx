"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { HomeSlide } from "@/data/homeSlides";

const AUTOPLAY_MS = 6000;

interface HeroCarouselProps {
  locale: Locale;
  slides: HomeSlide[];
}

export function HeroCarousel({ locale, slides }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  const goTo = useCallback(
    (i: number) => {
      setIndex((i + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    const t = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [index, goTo]);

  return (
    <section className="relative w-full bg-white">
      {/* Image hero plein écran */}
      <div className="relative aspect-[4/5] md:aspect-[3/2] lg:min-h-[85vh] w-full">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100 z-0" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={s.image}
              alt=""
              fill
              className="object-cover object-center"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Indicateurs dots — masqués s'il n'y a qu'un slide */}
      {slides.length > 1 && (
      <div className="flex justify-center gap-2 py-4">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className="w-2 h-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            style={{
              backgroundColor: i === index ? "#1a1a1a" : "rgba(0,0,0,0.2)",
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
      )}

      {/* Légende + bouton More information */}
      <div className="max-w-3xl mx-auto px-6 pb-12 text-center">
        {slide.caption && (
          <p className="text-sm md:text-base text-ink/90 tracking-wide mb-6 uppercase">
            {slide.caption}
          </p>
        )}
        {slide.moreInfoHref?.startsWith("http") ? (
          <a
            href={slide.moreInfoHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-ink text-white px-6 py-3 text-xs md:text-sm font-normal tracking-[0.2em] uppercase hover:bg-ink/90 transition-colors"
          >
            Voir sur Instagram
          </a>
        ) : (
          <Link
            href={slide.moreInfoHref || `/${locale}/about`}
            className="inline-block bg-ink text-white px-6 py-3 text-xs md:text-sm font-normal tracking-[0.2em] uppercase hover:bg-ink/90 transition-colors"
          >
            More information
          </Link>
        )}
      </div>
    </section>
  );
}
