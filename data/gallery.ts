/**
 * Galerie homepage — photos (œuvres, atelier, expos).
 * Remplacer par d'autres images depuis le profil Instagram si besoin.
 */
export interface GalleryImage {
  id: string;
  image: string;
  alt?: string;
}

export const galleryImages: GalleryImage[] = [
  { id: "1", image: "/images/matthieu-hero.png", alt: "Matthieu Delfini avec une toile, scène de baignade" },
  { id: "2", image: "/images/matthieu-hero.png", alt: "Matthieu Delfini — peinture à l'huile" },
  { id: "3", image: "/images/matthieu-hero.png", alt: "Œuvre — scène de baignade, falaises" },
  { id: "4", image: "/images/matthieu-hero.png", alt: "Détail peinture" },
  { id: "5", image: "/images/matthieu-hero.png", alt: "Atelier / œuvre" },
  { id: "6", image: "/images/matthieu-hero.png", alt: "Matthieu Delfini, peintre" },
];
