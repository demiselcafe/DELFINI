import Image from "next/image";
import { about } from "@/data/about";

export const metadata = {
  title: "About",
  description: "Biographie et démarche artistique.",
};

export default function AboutPage() {
  return (
    <div className="pt-[4.5rem] md:pt-24 pb-20 md:pb-28">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-12 md:mb-16">
          <h1 className="font-serif text-display-sm text-ink">About</h1>
        </header>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <div className="relative aspect-[3/4] max-w-md bg-black/5">
              <Image
                src={about.portrait}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
          <div className="md:col-span-7 space-y-8">
            <p className="text-ink text-base md:text-lg leading-relaxed">
              {about.bioShort}
            </p>
            <div className="prose prose-sm max-w-none text-inkMuted leading-relaxed">
              <p className="whitespace-pre-line">{about.bioLong}</p>
            </div>
            <div className="border-t border-black/10 pt-8">
              <h2 className="font-serif text-lg text-ink mb-4">Démarche</h2>
              <p className="text-inkMuted text-sm md:text-base leading-relaxed whitespace-pre-line">
                {about.statement}
              </p>
            </div>
            {about.cvHighlights?.length > 0 && (
              <div className="border-t border-black/10 pt-8">
                <h2 className="font-serif text-lg text-ink mb-4">CV (sélection)</h2>
                <ul className="space-y-2 text-sm text-inkMuted">
                  {about.cvHighlights.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
