/**
 * Slides du carousel de la page d'accueil
 * Images libres de droits (Unsplash). Remplacer par vos propres chemins si besoin.
 */
export interface HomeSlide {
  id: string;
  image: string;
  caption?: string;
  /** Lien optionnel pour "More information" sur ce slide */
  moreInfoHref?: string;
}

export const homeSlides: HomeSlide[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1600&q=80",
    caption: "EXPOSITION EN COURS — GALERIE CONTEMPORAINE, PARIS. DU 15 JANVIER AU 30 MARS 2026.",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1600&q=80",
    caption: "SÉRIE PAYSAGES — RÉSIDENCE ARTISTIQUE, MARSEILLE. 2025.",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&q=80",
    caption: "ŒUVRES RÉCENTES — ATELIER. PEINTURE À L'HUILE SUR TOILE.",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1600&q=80",
    caption: "EXPOSITION COLLECTIVE — MUSÉE D'ART MODERNE. JUSQU'AU 15 MAI 2026.",
  },
];
