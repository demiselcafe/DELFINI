import { about } from "@/data/about";
import { mergeAboutPortrait } from "@/lib/adminOverrides";
import { AboutPortraitWithAdmin } from "@/components/AboutPortraitWithAdmin";

export const metadata = {
  title: "About",
  description: "Biographie et démarche artistique.",
};

export default function AboutPage() {
  const portrait = mergeAboutPortrait();
  return (
    <div className="pt-[4.5rem] md:pt-24 pb-20 md:pb-28">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-12 md:mb-16">
          <h1 className="font-serif text-display-sm text-ink">About</h1>
        </header>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <AboutPortraitWithAdmin portrait={portrait} />
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
