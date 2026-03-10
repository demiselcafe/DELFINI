/**
 * Expositions — à venir et passées
 * Modifier les entrées ici pour mettre à jour la page Expositions
 */
export interface Exhibition {
  id: string;
  title: string;
  venue: string;
  location: string;
  date: string;
  year: string;
  isUpcoming: boolean;
  url?: string;
}

export const exhibitions: Exhibition[] = [
  {
    id: "upcoming-1",
    title: "Exposition à venir",
    venue: "Galerie X",
    location: "Paris",
    date: "À annoncer",
    year: "2025",
    isUpcoming: true,
  },
  {
    id: "past-1",
    title: "Solo show",
    venue: "Espace d’art Y",
    location: "Marseille",
    date: "Septembre – Novembre 2023",
    year: "2023",
    isUpcoming: false,
  },
  {
    id: "past-2",
    title: "Group show",
    venue: "Centre d’art Z",
    location: "Lyon",
    date: "Mars 2023",
    year: "2023",
    isUpcoming: false,
  },
  {
    id: "past-3",
    title: "Salon de peinture",
    venue: "Lieu culturel",
    location: "Paris",
    date: "2022",
    year: "2022",
    isUpcoming: false,
  },
];

export const upcomingExhibitions = exhibitions.filter((e) => e.isUpcoming);
export const pastExhibitions = exhibitions.filter((e) => !e.isUpcoming).sort((a, b) => Number(b.year) - Number(a.year));
