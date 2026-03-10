import {
  upcomingExhibitions,
  pastExhibitions,
} from "@/data/exhibitions";

export const metadata = {
  title: "Exhibitions",
  description: "Expositions à venir et passées.",
};

export default function ExhibitionsPage() {
  return (
    <div className="pt-[4.5rem] md:pt-24 pb-20 md:pb-28">
      <div className="max-w-2xl mx-auto px-6">
        <header className="mb-12 md:mb-16">
          <h1 className="font-serif text-display-sm text-ink">Exhibitions</h1>
        </header>

        <div className="space-y-12">
          {upcomingExhibitions.length > 0 && (
            <section>
              <h2 className="font-serif text-lg text-ink mb-6">
                Upcoming
              </h2>
              <ul className="space-y-6 border-t border-black/10 pt-6">
                {upcomingExhibitions.map((ex) => (
                  <li key={ex.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                    <span className="font-medium text-ink">{ex.title}</span>
                    <span className="text-inkMuted text-sm">
                      {ex.venue}, {ex.location} · {ex.date}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2 className="font-serif text-lg text-ink mb-6">
              Past
            </h2>
            <ul className="space-y-6 border-t border-black/10 pt-6">
              {pastExhibitions.map((ex) => (
                <li key={ex.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                  <span className="font-medium text-ink">{ex.title}</span>
                  <span className="text-inkMuted text-sm">
                    {ex.venue}, {ex.location} · {ex.date}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
