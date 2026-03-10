"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { isValidLocale } from "@/lib/i18n";

export function SetHtmlLang() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  const locale = isValidLocale(segment) ? segment : "fr";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}
