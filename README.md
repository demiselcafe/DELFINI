# Site artiste — Portfolio contemporain

Site minimaliste et professionnel pour un peintre : esprit galerie, pas de shop, pas de prix.

## Lancer le site

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3004](http://localhost:3004).

## Modifier le contenu

Tout le contenu éditable se trouve dans le dossier **`data/`**. Aucune compétence technique n’est nécessaire pour modifier les textes et chemins d’images.

| Fichier | Contenu |
|--------|--------|
| `data/site.ts` | Nom de l’artiste, email, Instagram, sous-titre |
| `data/series.ts` | Titres des séries, textes, images de couverture |
| `data/artworks.ts` | Titre, année, technique, dimensions, image, disponibilité de chaque œuvre |
| `data/projects.ts` | Projets (fresques, in situ, plafond peint) |
| `data/exhibitions.ts` | Expositions à venir et passées |
| `data/about.ts` | Bio courte, bio longue, démarche, CV (sélection), image portrait |

### Images

- Placer les images dans **`public/images/`** (ex. `public/images/hero.jpg` pour la page d’accueil).
- Dans les fichiers `data/*.ts`, indiquer le chemin à partir de la racine du site : `/images/hero.jpg`, `/images/series/cameroun.jpg`, etc.

### Page d’accueil

- Image hero : définir dans `app/page.tsx` le `src` de l’image (par défaut `/images/placeholder.svg`). Pour une vraie photo, mettre par ex. `hero.jpg` dans `public/images/` et utiliser `src="/images/hero.jpg"`.

## Structure du site

- **Home** — Grande image + nom
- **Works** — Liste des 4 séries (Cameroun, Marseille, Impressions Nomades, Commissions) → chaque série a sa page avec grille d’œuvres → chaque œuvre a sa fiche (titre, année, technique, dimensions, « Inquire »)
- **Projects** — Projets muraux / in situ / plafond peint
- **About** — Portrait, bio, démarche, CV
- **Exhibitions** — À venir / passées
- **Contact** — Email, Instagram, texte sur les commissions

## Build production

```bash
npm run build
npm start
```

## Technologies

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Polices : Cormorant Garamond (titres), DM Sans (texte)
