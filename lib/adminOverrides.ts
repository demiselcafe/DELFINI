import path from "path";
import fs from "fs";
import { homeSlides } from "@/data/homeSlides";
import { about } from "@/data/about";
import { seriesList } from "@/data/series";
import type { HomeSlide } from "@/data/homeSlides";

const OVERRIDES_PATH = path.join(process.cwd(), "data", "adminOverrides.json");

export interface AdminOverrides {
  homeSlides?: Partial<HomeSlide>[];
  aboutPortrait?: string;
  seriesImages?: Record<string, string>;
}

const defaults: AdminOverrides = {};

function readOverrides(): AdminOverrides {
  try {
    const raw = fs.readFileSync(OVERRIDES_PATH, "utf-8");
    return { ...defaults, ...JSON.parse(raw) } as AdminOverrides;
  } catch {
    return { ...defaults };
  }
}

function writeOverrides(data: AdminOverrides): void {
  const dir = path.dirname(OVERRIDES_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(OVERRIDES_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function getOverrides(): AdminOverrides {
  return readOverrides();
}

export function setOverrides(updates: Partial<AdminOverrides>): AdminOverrides {
  const current = readOverrides();
  const next: AdminOverrides = {
    ...current,
    ...updates,
  };
  writeOverrides(next);
  return next;
}

export function mergeHomeSlides(): HomeSlide[] {
  const overrides = readOverrides();
  const base = homeSlides;
  if (!overrides.homeSlides?.length) return base;
  return base.map((slide, i) => {
    const o = overrides.homeSlides?.[i];
    if (!o) return slide;
    return { ...slide, ...o };
  });
}

export function mergeAboutPortrait(): string {
  const overrides = readOverrides();
  return overrides.aboutPortrait ?? about.portrait;
}

export function mergeSeriesImages(): Record<string, string> {
  const overrides = readOverrides();
  const out: Record<string, string> = {};
  for (const s of seriesList) {
    out[s.id] = overrides.seriesImages?.[s.id] ?? s.image;
  }
  return out;
}

export function getSeriesWithMergedImages() {
  const images = mergeSeriesImages();
  return seriesList.map((s) => ({ ...s, image: images[s.id] ?? s.image }));
}
