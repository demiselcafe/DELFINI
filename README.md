# Site artiste — Portfolio contemporain

Site minimaliste et professionnel pour un peintre : esprit galerie, pas de shop, pas de prix.

## Lancer le site

```bash
npm install
cp .env.example .env
# Éditer .env et définir ADMIN_PASSWORD pour le mode admin
npm run dev
```

Ouvrir [http://localhost:3004](http://localhost:3004).

## Mode administrateur

En bas à droite du site, un bouton **Admin** permet de se connecter (mot de passe défini dans `ADMIN_PASSWORD` ou `ADMIN_SECRET`). Une fois connecté :

- Un bouton **Paramétrage** apparaît : l’activer pour passer en mode édition.
- Une bannière « Mode paramétrage » s’affiche sous le header.
- Sur les pages **Home**, **About** et **Works**, des barres d’édition apparaissent **sous chaque zone d’image** avec un bouton **Choisir ou téléverser**.
- Cliquer dessus ouvre la **médiathèque** : choisir une image déjà en ligne ou **téléverser** une nouvelle depuis l’ordinateur. Les images sont stockées dans `public/uploads/` et les réglages dans `data/adminOverrides.json`.
- L’interface reste la même que le site public : vous naviguez normalement et modifiez les images à la volée en mode paramétrage.

**Architecture** : authentification par cookie de session (API `/api/auth/*`), stockage des fichiers dans `public/uploads/`, surcharge des images via `data/adminOverrides.json` (les données des fichiers `data/*.ts` restent la base ; les overrides remplacent uniquement les URLs d’images). Voir `.env.example` pour la configuration.

## Modifier le contenu (fichiers)

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
- Ou utiliser le **mode admin** pour téléverser et assigner des images sans toucher au code.
- Dans les fichiers `data/*.ts`, les chemins partent de la racine : `/images/hero.jpg`, `/uploads/xxx.jpg`, etc.

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
