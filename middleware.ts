import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["fr", "en"] as const;
const DEFAULT_LOCALE = "fr";

function getLocale(pathname: string): string | null {
  const segment = pathname.split("/")[1];
  if (LOCALES.includes(segment as "fr" | "en")) return segment;
  return null;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Déjà une locale valide en premier segment → laisser passer
  const locale = getLocale(pathname);
  if (locale) {
    return NextResponse.next();
  }

  // Pas de locale : rediriger vers la même path avec la locale par défaut (déduite de l’URL / préférence)
  // On utilise DEFAULT_LOCALE ; on pourrait plus tard utiliser Accept-Language
  const newPath = pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(new URL(newPath, request.url));
}

export const config = {
  matcher: ["/((?!_next|images|favicon|api).*)"],
};
