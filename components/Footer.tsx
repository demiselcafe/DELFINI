import Link from "next/link";
import { site } from "@/data/site";
import type { Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="font-serif text-lg text-ink">
            {site.artistName}
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-inkMuted">
            <Link href={`/${locale}/contact`} className="hover:text-ink transition-colors">
              Contact
            </Link>
            {site.instagram && (
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink transition-colors"
              >
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
