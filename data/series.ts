/**
 * Séries d'œuvres — modifier titres, slugs, textes et images ici
 * Slug = identifiant URL (ex: cameroun → /works/cameroun)
 */
export type SeriesId = "cameroun" | "marseille" | "impressions-nomades" | "commissions";

export interface Series {
  id: SeriesId;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  image: string;
  order: number;
}

export const seriesList: Series[] = [
  {
    id: "cameroun",
    slug: "cameroun",
    title: "Cameroun",
    excerpt: "Une exploration des paysages et des visages du Cameroun.",
    description: "Cette série rassemble des œuvres nées de séjours au Cameroun. Les toiles capturent la lumière, les couleurs et les atmosphères d’un territoire qui nourrit une pratique du voyage et du regard.",
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&q=80",
    order: 1,
  },
  {
    id: "marseille",
    slug: "marseille",
    title: "Marseille",
    excerpt: "Marseille comme motif et territoire de peinture.",
    description: "Marseille constitue un foyer de la pratique : le port, la ville, la Méditerranée et les corps qui l’habitent deviennent le support d’une peinture à la fois figurative et sensible.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    order: 2,
  },
  {
    id: "impressions-nomades",
    slug: "impressions-nomades",
    title: "Impressions Nomades",
    excerpt: "Fragments de voyages et de déplacements.",
    description: "Impressions Nomades regroupe des œuvres issues de différents déplacements. Chaque pièce fixe un moment, un lieu ou une sensation, dans une approche qui mêle observation et mémoire.",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
    order: 3,
  },
  {
    id: "commissions",
    slug: "commissions",
    title: "Commissions",
    excerpt: "Œuvres réalisées sur commande.",
    description: "Cette section présente des œuvres réalisées dans le cadre de commandes ou de projets spécifiques, tout en conservant la même exigence formelle et narrative que le reste du travail.",
    image: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800&q=80",
    order: 4,
  },
];

export function getSeriesBySlug(slug: string): Series | undefined {
  return seriesList.find((s) => s.slug === slug);
}
