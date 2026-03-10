"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { site } from "@/data/site";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/i18n";

const MAIN_LINKS = [
  { href: (prefix: string) => `${prefix}/`, label: "Home" },
  { href: (prefix: string) => `${prefix}/about`, label: "About" },
  { href: (prefix: string) => `${prefix}/works`, label: "Works" },
  { href: (prefix: string) => `${prefix}/projects`, label: "Projects" },
  { href: (prefix: string) => `${prefix}/exhibitions`, label: "Exhibitions" },
  { href: (prefix: string) => `${prefix}/contact`, label: "Contact" },
] as const;

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const prefix = `/${locale}`;

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === prefix || href === `${prefix}/`) return pathname === prefix || pathname === `${prefix}/`;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/5">
        {/* Ligne 1 : Nom centré + langue à droite */}
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14 md:h-16">
          <div className="w-12" aria-hidden />
          <Link
            href={`/${locale}/`}
            className="font-sans text-sm md:text-base font-normal tracking-[0.2em] uppercase text-ink hover:opacity-80 transition-opacity"
          >
            {site.artistName.toUpperCase()}
          </Link>
          <div className="flex items-center w-12 justify-end">
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
        {/* Ligne 2 : Hamburger centré sous le nom */}
        <div className="flex justify-center pb-2">
          <button
            type="button"
            className="p-2 text-ink hover:opacity-70 transition-opacity"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <span className="block w-5 h-px bg-current mb-1.5" />
            <span className="block w-5 h-px bg-current mb-1.5" />
            <span className="block w-5 h-px bg-current" />
          </button>
        </div>
      </header>

      {/* Menu compact : petit panneau sous le header, liens principaux uniquement */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 z-40 mt-[5.5rem] md:mt-[6rem] w-[min(90vw,280px)] bg-white border border-black/10 shadow-lg transition-all duration-200 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="py-3 px-4 flex flex-col">
          {MAIN_LINKS.map(({ href, label }) => (
            <Link
              key={label}
              href={href(prefix)}
              className={`py-2 px-2 text-xs tracking-[0.15em] uppercase transition-colors hover:text-ink ${
                isActive(href(prefix)) ? "text-ink font-medium" : "text-inkMuted"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          {site.instagram && (
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-2 text-xs tracking-[0.15em] uppercase text-inkMuted hover:text-ink transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Instagram
            </a>
          )}
        </nav>
      </div>
    </>
  );
}
