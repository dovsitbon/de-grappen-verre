# De Grapp'En Verre — site vitrine

Site statique Astro + Tailwind CSS 4. Aucun traceur, aucun formulaire.

## Lancer en local
```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # génère dist/
npm run preview    # sert dist/
npm run captures   # captures Playwright 390 px et 1440 px dans captures/ (après build, port 4406)
npm run og         # régénère public/og.png et public/apple-touch-icon.png
```

## Déployer
Vercel détecte Astro automatiquement (build `npm run build`, sortie `dist/`). Mettre à jour `site` dans `astro.config.mjs`, `public/robots.txt` et `public/llms.txt` si le domaine final change.

## Où changer quoi
| Quoi | Fichier |
|---|---|
| L'ardoise du jour (date, entrées, plats, desserts, vin) | `src/data/ardoise.json` (passer `"exemple": false` quand elle est réelle) |
| Concerts | `src/data/evenements.json` (`date` AAAA-MM-JJ, `heure` HH:MM, `groupe`, `style`, `tarif` facultatifs ; les dates passées disparaissent au build suivant) |
| Horaires (tableau, statut Ouvert/Fermé, JSON-LD) | `src/data/horaires.json` |
| Formules du midi et prix | `src/data/formules.json` |
| Nom, adresse, téléphone, réseaux, coordonnées GPS | `src/data/site.json` (`geo`: `{ "latitude": .., "longitude": .. }`) |
| Avis affichés | `src/data/avis.json` (uniquement de vrais avis) |
| Textes de l'accueil, incontournables, FAQ | `src/pages/index.astro` |
| Version anglaise | `src/pages/en/index.astro` |
| Photos | remplacer les blocs `photo-a-venir` de `src/pages/index.astro` par `<Image>` d'`astro:assets` (fichiers dans `src/assets/`) — voir `PHOTOS_A_PRENDRE.md` |
| Couleurs, polices | `src/styles/global.css` (`@theme`) |
| Mentions légales / confidentialité | `src/pages/mentions-legales.astro`, `src/pages/confidentialite.astro` |

Les éléments à compléter sont listés dans `A_COMPLETER.md` et marqués `[À CONFIRMER]` sur le site.
