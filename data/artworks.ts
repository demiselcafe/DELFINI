/**
 * Catalogue des œuvres par série
 * Modifier titres, années, techniques, dimensions, disponibilité et chemins d'images
 */
import type { SeriesId } from "./series";

export interface Artwork {
  slug: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  image: string;
  images?: string[];
  available?: boolean;
  seriesId: SeriesId;
}

// Placeholder : remplacer par les vrais chemins (ex: /images/works/cameroun/oeuvre-1.jpg)
const placeholder = "/images/placeholder.svg";

export const artworks: Artwork[] = [
  // ——— Cameroun ———
  {
    slug: "cameroun-1",
    title: "Sans titre",
    year: "2023",
    medium: "Huile sur toile",
    dimensions: "120 × 80 cm",
    image: placeholder,
    seriesId: "cameroun",
    available: true,
  },
  {
    slug: "cameroun-2",
    title: "Sans titre",
    year: "2023",
    medium: "Huile sur toile",
    dimensions: "100 × 100 cm",
    image: placeholder,
    seriesId: "cameroun",
    available: false,
  },
  {
    slug: "cameroun-3",
    title: "Sans titre",
    year: "2022",
    medium: "Huile sur toile",
    dimensions: "80 × 60 cm",
    image: placeholder,
    seriesId: "cameroun",
    available: true,
  },
  // ——— Marseille ———
  {
    slug: "marseille-1",
    title: "Sans titre",
    year: "2024",
    medium: "Huile sur toile",
    dimensions: "150 × 100 cm",
    image: placeholder,
    seriesId: "marseille",
    available: true,
  },
  {
    slug: "marseille-2",
    title: "Sans titre",
    year: "2023",
    medium: "Huile sur toile",
    dimensions: "100 × 80 cm",
    image: placeholder,
    seriesId: "marseille",
    available: true,
  },
  // ——— Impressions Nomades ———
  {
    slug: "impressions-1",
    title: "Sans titre",
    year: "2023",
    medium: "Huile sur toile",
    dimensions: "90 × 70 cm",
    image: placeholder,
    seriesId: "impressions-nomades",
    available: false,
  },
  {
    slug: "impressions-2",
    title: "Sans titre",
    year: "2022",
    medium: "Huile sur toile",
    dimensions: "70 × 50 cm",
    image: placeholder,
    seriesId: "impressions-nomades",
    available: true,
  },
  // ——— Commissions ———
  {
    slug: "commissions-1",
    title: "Sans titre",
    year: "2024",
    medium: "Huile sur toile",
    dimensions: "Variable",
    image: placeholder,
    seriesId: "commissions",
    available: true,
  },
];

export function getArtworksBySeries(seriesId: SeriesId): Artwork[] {
  return artworks.filter((a) => a.seriesId === seriesId);
}

export function getArtwork(seriesSlug: string, artworkSlug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === artworkSlug && a.seriesId === seriesSlug);
}

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}
