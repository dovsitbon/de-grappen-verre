# À compléter avant mise en ligne définitive

Chaque point est marqué `[À CONFIRMER]` (ou `[EXEMPLE À REMPLACER]`) sur le site.

## Contenu
- [ ] **Ardoise du jour** (`src/data/ardoise.json`) : l'ardoise actuelle est un EXEMPLE composé des plats cités dans les avis (foie gras maison, tartare pommes boulangères, thon sur piperade, pâtes fraîches). Mettre la vraie date, les vrais plats, les desserts, le vin du moment, puis `"exemple": false`.
- [ ] **Prix des formules du midi** entrée + plat / plat + dessert (`src/data/formules.json`).
- [ ] **Prix des incontournables** (tartare, foie gras, thon, pâtes fraîches, plats de saison, desserts) — ou décider de ne pas afficher de prix (`src/pages/index.astro`).
- [ ] **Carte des cocktails** et **liste des digestifs** (section Le bar).
- [ ] **Prénoms des patrons** (« Pat & Fab » cités par des clients) : confirmer avant de les afficher (section La maison).
- [ ] **Groupes / privatisation / traiteur** : capacité, conditions, tarifs.
- [ ] **Concerts** : `src/data/evenements.json` est vide (le site affiche « Prochaines dates bientôt »). Ajouter les vraies dates.
- [ ] Confirmer que les groupes « A Qui Le Tour » et « Afrorok » peuvent être cités comme déjà passés au bar.
- [ ] Confirmer qu'on peut dire « Transilien, gare de Groslay » sans préciser la ligne (ligne H à vérifier si on veut l'ajouter).

## Légal
- [ ] Raison sociale, forme juridique, capital, **SIRET**, RCS, n° TVA, directeur de la publication, e-mail de contact (`src/pages/mentions-legales.astro`).
- [ ] E-mail pour l'exercice des droits RGPD (`src/pages/confidentialite.astro`).

## Technique / SEO
- [ ] **Coordonnées GPS** exactes du restaurant (`src/data/site.json` → `geo`) pour le JSON-LD (non inventées, donc absentes pour l'instant).
- [ ] Domaine définitif : mettre à jour `astro.config.mjs` (`site`), `public/robots.txt`, `public/llms.txt`.
- [ ] Fourchette de prix (`priceRange`) à ajouter au JSON-LD une fois les prix connus.
- [ ] Lier le site depuis la fiche Google Business Profile, Facebook et Instagram.
- [ ] Photos : voir `PHOTOS_A_PRENDRE.md`, puis régénérer l'image de partage (`npm run og`) avec une vraie photo si souhaité.
