"use client";

import Image from "next/image";
import { galleryImages } from "@/data/gallery";
import { site } from "@/data/site";

export function HomeGallery() {
  return (
    <section className="bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <h2 className="text-xs md:text-sm font-normal tracking-[0.25em] uppercase text-ink/80 mb-8 text-center">
          Galerie
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-ink/5"
            >
              <Image
                src={item.image}
                alt={item.alt ?? ""}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-ink text-white px-6 py-3 text-xs md:text-sm font-normal tracking-[0.2em] uppercase hover:bg-ink/90 transition-colors"
          >
            Voir tout sur Instagram — {site.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
