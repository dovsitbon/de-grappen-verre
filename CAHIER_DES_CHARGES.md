# Prompt Claude Code : site « De Grapp'En Verre » (bistrot, Groslay)

Tu es un développeur front-end et directeur artistique senior. Crée le site vitrine complet de **De Grapp'En Verre**, bistrot de terroir tenu par un couple, face à la gare de Groslay. Objectif business : réservations (recommandées le soir), mettre en valeur l'ardoise du jour et les soirées concerts, et remplacer la page Facebook comme « site » principal.

## Fiche d'identité (informations vérifiées)
- **Nom** : De Grapp'En Verre (s'écrit aussi « De Grapp'en Verre »)
- **Type** : bistrot / auberge, cuisine française traditionnelle, **cuisine du terroir au gré des saisons, fait maison**, bar à vins et cocktails
- **Adresse** : 4 rue Charles de Gaulle, 95410 Groslay (au pied de la gare de Groslay, place de la Gare)
- **Téléphone** : 01 39 83 37 18
- **Horaires** : lundi et mardi : 12h00–14h00 · mercredi et jeudi : 12h00–14h00 et 19h30–21h00 · vendredi : 12h00–14h00 et 19h30–21h30 · samedi : 12h00–14h00 et 19h00–21h30 · dimanche : fermé
- **Note** : 4,6/5 sur ~145 avis Google ; référencé sur valdoise-tourisme.com et TripAdvisor
- **Tenu par** : un couple, prénoms cités par des clients « Pat & Fab » → `[À CONFIRMER]` avant de les afficher
- **Services** : salle + **petite terrasse / jardin fleuri**, bar, traiteur, réservation recommandée le soir, accueil en anglais possible
- **Événements** : soirées **café-concert** / concerts au bar (ex. groupes « A Qui Le Tour », « Afrorok » sur Facebook)
- **Paiements** : CB, sans contact, titres-restaurant (Pluxee, Chèque Déjeuner…)
- **Pratique** : stationnement facile, conseil client : se garer sur le parking de la gare le soir
- **Réseaux** : Facebook facebook.com/degrappenverre, Instagram @degrappenverre
- **Schema.org** : `Restaurant` (servesCuisine : French ; acceptsReservations : true) + `Event` pour les concerts si saisis

## Ce que disent les clients
Ardoise du jour, carte de bistrot de saison, produits frais, **tartare exceptionnel servi avec des pommes boulangères**, **foie gras maison**, thon cuit sur piperade et pâtes fraîches, desserts, vins sur l'ardoise, cocktails. Cadre « néo-rétro », plein de charme, « comme à la maison ». Formules entrée/plat ou plat/dessert (prix `[À CONFIRMER]`).

Extraits d'avis utilisables (« Avis Google ») :
- « Cette belle auberge située au pied de la gare de Groslay est tenue par un couple qui a pour préoccupation de bien recevoir et surtout de régaler ! »
- « Une carte de bistrot comme on aime, les produits sont de saison, une mention particulière pour le tartare. »
- « Restaurant style néo-rétro, comme le chef, à la fois prolixe et excellent dans son métier. Son foie gras est une merveille. »
- « Tout est frais et goûteux, de l'entrée au plat en passant par le vin ! La petite terrasse est charmante. »
- (EN) « Very good classic French food, fresh ingredients, friendly service, and cosy atmosphere. »

## Direction artistique
- Inspiration : **ardoise de bistrot, étiquettes de vin, nappes vichy, affiches de concert punaisées**. Néo-rétro, chaleureux, un peu canaille.
- Palette : vert bouteille, bordeaux/lie-de-vin, crème, noir ardoise.
- Typo : une serif rétro pour les titres (ex. Abril Fatface ou Rozha One) + une écriture « craie » **uniquement** pour l'ardoise du jour + une sans lisible.
- Idée signature : **l'ardoise du jour** affichée comme une vraie ardoise (éditable via `src/data/ardoise.json` : date, entrées, plats, desserts, vin du moment), et un jeu de mots visuel sur « grappe / verre ».

## Structure
1. **Accueil** : « Bistrot de saison, face à la gare de Groslay », statut ouvert/fermé, bouton Réserver (tel:).
2. **L'ardoise du jour** (éditable) + formules du midi.
3. **La carte / les incontournables** : tartare & pommes boulangères, foie gras maison, plats de saison, desserts, prix `[À CONFIRMER]`.
4. **Le bar** : vins à l'ardoise, cocktails, digestifs.
5. **Concerts & soirées** : liste d'événements depuis `src/data/evenements.json` (date, groupe, horaire), bloc « Suivez-nous sur Facebook/Instagram ».
6. **La maison** : le couple, le cadre néo-rétro, la terrasse fleurie (photos à prendre).
7. **Avis** (FR + 1 EN), note 4,6/5.
8. **Infos pratiques** : horaires détaillés (le soir seulement du mercredi au samedi → le dire clairement), parking de la gare, accès en Transilien (gare de Groslay), carte.
9. **Privatisation / groupes / traiteur** : contact téléphone.
10. Une version anglaise courte de la page d'accueil (`/en`) car le lieu reçoit des touristes anglophones.

---

## Règles communes (à respecter strictement)

### 1. Avant de coder
- Liste les skills et plugins disponibles dans ta session et **utilise toutes celles qui s'appliquent** : design frontend (ex. `frontend-design`), tests navigateur / captures (Playwright, `webapp-testing`), images, déploiement, etc. Dis-moi lesquelles tu utilises.
- Propose-moi en 10 lignes max la direction artistique (palette en hex, 2 polices, ambiance, 1 idée de mise en page signature) **puis enchaîne sans attendre ma validation**.

### 2. Stack technique
- **Astro + Tailwind CSS**, site statique, zéro framework JS lourd côté client (îlots JS seulement si nécessaire).
- Polices auto-hébergées (`@fontsource`), pas d'appel Google Fonts.
- Images en AVIF/WebP via `astro:assets`, `loading="lazy"` sauf la première image.
- Déploiement prévu sur **Vercel** (ajoute la config si besoin). Si un accès Vercel est connecté dans ta session, fais un déploiement **preview** et donne-moi l'URL.
- Objectif Lighthouse : ≥ 95 sur les 4 scores, mobile.

### 3. Design qui NE FAIT PAS « site généré par IA » (priorité n°1)
Interdit :
- dégradés violet/bleu, « glassmorphism », blobs flous en fond, néons, ombres molles partout ;
- la grille « 3 cartes avec une icône + titre + 2 lignes » ;
- les emojis comme icônes, les icônes génériques type Heroicons/Lucide posées partout ;
- Inter/Poppins/Montserrat seules, tout centré, tout arrondi en `rounded-2xl` ;
- les phrases creuses : « Bienvenue chez… », « Découvrez… », « Plongez dans… », « Votre partenaire de confiance », « Une expérience unique », « Notre passion, votre satisfaction » ;
- les fausses stats (« +500 clients satisfaits »), les faux témoignages, les photos de banque d'images clichés (poignée de main, personnes en costume qui sourient).

À faire :
- une **identité propre au lieu** (voir la direction artistique plus haut), avec un ou deux partis pris forts : typographie éditoriale, mise en page asymétrique, détails réels (ardoise, ticket, plaque, carte routière, numéro de rue en très grand…) ;
- des textes **courts, concrets, à la voix du commerçant**, avec de vrais détails (horaires, plats, adresses, noms de rues, parkings) ;
- du rythme : alterner sections pleines et aérées, une grande typo, des espaces généreux ;
- des micro-interactions sobres (hover, apparition légère au scroll), rien de plus ;
- `prefers-reduced-motion` respecté.

### 4. Contenu : zéro invention
- Utilise **uniquement** les informations fournies dans ce prompt.
- Tout ce qui manque (prix, plats exacts, photos, nom du gérant, SIRET…) = un marqueur visible **`[À CONFIRMER]`** et une entrée dans le fichier `A_COMPLETER.md` à la racine.
- Avis clients : n'utilise **que** les extraits fournis, attribués « Avis Google ». Jamais d'avis inventé, jamais de nom inventé.

### 5. Photos
- **Ne télécharge pas et n'intègre pas** de photos Google Maps / Facebook / Instagram (droits d'auteur des clients et du commerce).
- Mets des emplacements propres (bloc couleur + légende du cliché attendu, pas de gris « placeholder ») et crée `PHOTOS_A_PRENDRE.md` : la liste précise des photos à faire (cadrage, lumière, format), pour que je les prenne moi-même chez le commerçant.

### 6. SEO local (indispensable)
- `<html lang="fr">`, title + meta description uniques, Open Graph, favicon.
- **JSON-LD schema.org** adapté (type indiqué plus haut) avec nom, adresse, téléphone, horaires `openingHoursSpecification`, géolocalisation, `sameAs` (réseaux sociaux).
- Nom / adresse / téléphone identiques partout (NAP), pied de page compris.
- Carte : iframe Google Maps chargée **au clic** (façade légère) pour ne pas plomber la perf.
- `sitemap.xml`, `robots.txt`, URLs propres, H1 unique, balises `alt` descriptives.
- Mots-clés locaux naturels : la ville + les communes voisines (Groslay, Montmorency, Saint-Brice-sous-Forêt, Sarcelles, Deuil-la-Barre, Montmagny, Domont, Ézanville).

### 7. Conversion et mobile
- Mobile d'abord. **Bouton d'appel fixe en bas d'écran sur mobile** (`tel:`), + bouton itinéraire (lien Google Maps).
- Horaires lisibles, avec indication « Ouvert maintenant / Fermé » calculée en JS léger (fuseau Europe/Paris).
- Accessibilité AA : contrastes, focus visibles, navigation clavier, tailles de cibles ≥ 44 px.

### 8. Légal
- Page **Mentions légales** (éditeur, hébergeur Vercel, SIRET `[À CONFIRMER]`) et **Politique de confidentialité**.
- Pas de traceur, donc pas de bandeau cookies. Si un formulaire existe : consentement RGPD + envoi via un service sans backend (ex. Formspree / Web3Forms, clé `[À CONFIRMER]`).

### 9. Livraison
1. `npm run build` sans erreur ni warning.
2. Captures Playwright **mobile (390 px) et desktop (1440 px)** de chaque page ; regarde-les toi-même et corrige ce qui fait « template » ou « IA » avant de me rendre la main.
3. Un `README.md` court : lancer en local, déployer, où changer textes / photos / horaires.
4. Les fichiers `A_COMPLETER.md` et `PHOTOS_A_PRENDRE.md`.
5. Un résumé final de 10 lignes max : ce qui est fait, ce qui manque.
