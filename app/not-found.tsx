import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      <h1 className="font-serif text-2xl text-ink">Page non trouvée</h1>
      <p className="mt-2 text-sm text-inkMuted">Cette page n’existe pas.</p>
      <Link
        href="/fr"
        className="mt-8 text-sm text-ink underline hover:no-underline"
      >
        Retour à l’accueil
      </Link>
    </div>
  );
}
