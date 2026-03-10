/**
 * Slides du carousel de la page d'accueil
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
    image: "/images/matthieu-hero.png",
    caption: "MATTHIEU DELFINI — PEINTRE. ŒUVRES À L'HUILE, PAYSAGES ET FIGURES.",
    moreInfoHref: "https://www.instagram.com/matthieudelfini/",
  },
];
