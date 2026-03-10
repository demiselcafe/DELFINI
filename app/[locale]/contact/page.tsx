import { site } from "@/data/site";

export const metadata = {
  title: "Contact",
  description: "Contact et demandes de renseignements.",
};

export default function ContactPage() {
  return (
    <div className="pt-[4.5rem] md:pt-24 pb-20 md:pb-28">
      <div className="max-w-xl mx-auto px-6">
        <header className="mb-12 md:mb-16">
          <h1 className="font-serif text-display-sm text-ink">Contact</h1>
          <p className="mt-4 text-inkMuted text-sm md:text-base leading-relaxed">
            Pour toute demande d'information sur les œuvres, les expositions ou les projets, merci de nous contacter.
          </p>
        </header>

        <div className="space-y-8 border-t border-black/10 pt-8">
          <div>
            <p className="text-xs uppercase tracking-wider text-inkMuted mb-1">Email</p>
            <a
              href={`mailto:${site.email}`}
              className="text-ink hover:opacity-80 transition-opacity"
            >
              {site.email}
            </a>
          </div>
          {site.instagram && (
            <div>
              <p className="text-xs uppercase tracking-wider text-inkMuted mb-1">Instagram</p>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:opacity-80 transition-opacity"
              >
                {site.instagramHandle || site.instagram}
              </a>
            </div>
          )}
        </div>

        <section className="mt-16 pt-12 border-t border-black/10">
          <h2 className="font-serif text-lg text-ink mb-4">Commissions</h2>
          <p className="text-inkMuted text-sm md:text-base leading-relaxed">
            The artist occasionally accepts commissioned works. For inquiries regarding commissions, please get in touch.
          </p>
        </section>
      </div>
    </div>
  );
}
