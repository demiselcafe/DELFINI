"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 bg-white">
      <h1 className="font-serif text-2xl text-ink">Erreur d&apos;affichage</h1>
      <p className="mt-2 text-sm text-inkMuted max-w-md">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 px-4 py-2 bg-ink text-white text-sm uppercase tracking-wider hover:bg-ink/90"
      >
        Réessayer
      </button>
    </div>
  );
}
