"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n";

const labels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
};

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();

  // pathname est du type /fr/... ou /en/... (sans domaine)
  const pathWithoutLocale = pathname.replace(/^\/(fr|en)/, "") || "/";

  return (
    <div className="flex items-center gap-1 text-sm">
      {LOCALES.map((locale) => (
        <span key={locale} className="flex items-center gap-1">
          {locale === currentLocale ? (
            <span className="font-medium text-ink" aria-current="true">
              {labels[locale]}
            </span>
          ) : (
            <Link
              href={`/${locale}${pathWithoutLocale}`}
              className="text-inkMuted hover:text-ink transition-colors"
            >
              {labels[locale]}
            </Link>
          )}
          {locale !== LOCALES[LOCALES.length - 1] && (
            <span className="text-inkMuted/60" aria-hidden>
              |
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
