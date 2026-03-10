/**
 * Projets (fresques, in situ, plafond peint, etc.)
 * Ton : interventions artistiques, pas "prestations"
 */
export interface Project {
  slug: string;
  title: string;
  year: string;
  location: string;
  description: string;
  images: string[];
}

export const projects: Project[] = [
  {
    slug: "plafond-voyage-la-samaritaine",
    title: "Plafond peint — Restaurant Voyage, La Samaritaine",
    year: "2021",
    location: "La Samaritaine, Paris",
    description: "Commande pour le plafond du restaurant Voyage à La Samaritaine. Une peinture in situ qui dialogue avec l’architecture et la lumière du lieu, conçue comme une œuvre à part entière et non comme un simple décor.",
    images: ["/images/placeholder.svg", "/images/placeholder.svg"],
  },
  {
    slug: "murals-1",
    title: "Peintures murales",
    year: "2022–2024",
    location: "Divers",
    description: "Réalisations murales pour des espaces privés et semi-publics. Chaque projet est pensé en fonction du lieu, de la lumière et du rapport au corps du spectateur.",
    images: ["/images/placeholder.svg"],
  },
  {
    slug: "in-situ",
    title: "Œuvres in situ",
    year: "En cours",
    location: "—",
    description: "Projets d’interventions picturales spécifiques à des architectures ou des contextes donnés. Pour toute proposition, merci de prendre contact.",
    images: ["/images/placeholder.svg"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
