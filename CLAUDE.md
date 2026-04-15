# CLAUDE.md — Projet Prestigia

Ce fichier guide Claude Code dans le développement du site web **Prestigia**.

---

## 1. Contexte du projet

**Prestigia** est un business center premium offrant des services haut de gamme aux entrepreneurs et porteurs de projets.

- **Adresse** : Lozenberg 21, 1932 Zaventem (Belgique)
- **Secteur** : Business center — domiciliation, gestion administrative, salles de réunions, espaces coworking, accompagnement marketing
- **Cible** : Entrepreneurs, porteurs de projets, dirigeants de PME
- **Positionnement** : Luxe minimaliste, inspiration cabinets de conseil et banques privées

### Activités principales
1. Domiciliation d'entreprises
2. Espaces coworking
3. Salles de réunions
4. Gestion administrative
5. Accompagnement marketing

---

## 2. Stack technique

- **Framework** : Next.js (App Router, React Server Components)
- **Styling** : Tailwind CSS
- **Animations** : Motion (framer-motion) + GSAP (ScrollTrigger)
- **Langage** : TypeScript
- **Déploiement cible** : Vercel

### Conventions
- Composants React en **PascalCase**, fichiers en `.tsx`
- Hooks personnalisés préfixés `use`
- Styles via Tailwind uniquement (pas de CSS modules sauf cas particulier)
- Images optimisées via `next/image`
- Fonts via `next/font` (auto-optimisation)

---

## 3. Identité visuelle

### Palette de couleurs
| Usage | Couleur | Hex |
|---|---|---|
| Principale (fond sombre, texte fort) | Bleu profond | `#0B1A2E` |
| Fond clair / sections neutres | Ivoire clair | `#F5F0E4` |
| Accent premium (CTA, highlights) | Or | `#C9A84C` |
| Texte sur fond sombre | Blanc cassé | `#FAF7F0` |
| Texte secondaire | Gris chaud | `#8A8578` |

**Configurer dans `tailwind.config.ts`** sous `theme.extend.colors` :
```ts
colors: {
  navy: '#0B1A2E',
  ivory: '#F5F0E4',
  gold: '#C9A84C',
  cream: '#FAF7F0',
  warmgray: '#8A8578',
}
```

### Typographie
- **Titres** : serif élégante (ex. *Playfair Display*, *Cormorant Garamond*, ou *Fraunces*)
- **Corps** : sans-serif neutre et lisible (ex. *Inter*, *Manrope*, ou *Satoshi*)
- Poids titres : 400–500 (jamais gras lourd, rester élégant)
- Interlignage généreux : `leading-relaxed` ou `leading-loose` sur les blocs texte
- Tracking serré sur titres : `tracking-tight`

### Direction artistique
- **Luxe minimaliste** : beaucoup d'espace blanc, respiration, pas de surcharge
- **Grilles aérées** : marges larges, padding généreux (`py-24`, `py-32` sur sections)
- **Contraste maîtrisé** : bleu profond + ivoire + touches d'or uniquement
- **Photographie** : intérieurs sophistiqués, teintes chaudes, ambiance feutrée
- **Pas d'emojis, pas de couleurs criardes, pas de gradients agressifs**

---

## 4. Animations (CRITIQUE)

Les animations doivent rester **subtiles, fluides et premium**. Jamais brusques.

### Principes
- **Durées** : 600–1200ms pour entrées de section, 200–400ms pour micro-interactions
- **Easing** : courbes douces — `[0.22, 1, 0.36, 1]` (easeOutExpo), jamais `linear` ni bounce
- **Délais échelonnés** (stagger) sur listes de cartes : 80–120ms entre items

### Patterns à utiliser
- **Fade-in + slide-up** au scroll (opacité 0 → 1, `translateY(24px) → 0`)
- **Parallax léger** sur images hero (intensité faible, max 15% de décalage)
- **Reveal de texte** ligne par ligne sur titres (GSAP SplitText ou motion custom)
- **Hover cartes** : légère élévation (`translateY(-4px)`) + apparition ombre douce
- **Boutons** : transition background/color sur 300ms, underline animé sur liens
- **Curseur personnalisé** optionnel sur zones premium (pas obligatoire)

### Outils
- **Motion (framer-motion)** : `motion.div`, `AnimatePresence`, `useInView` pour déclenchements au scroll
- **GSAP + ScrollTrigger** : pour timelines complexes, parallax, pinning de sections
- Respecter `prefers-reduced-motion` → désactiver animations non essentielles

---

## 5. Arborescence des pages

```
/                   → Accueil
/centres            → Présentation des centres (localisations, visites)
/services           → Détail des 5 services
/reserver           → Formulaire / tunnel de réservation
/contact            → Coordonnées + formulaire
/espace-client      → Login / dashboard client (phase 2 ou placeholder)
```

### Accueil — sections attendues
1. **Hero** : titre fort, sous-titre, 2 CTA (Découvrir / Être contacté), image d'ambiance sombre
2. **Services d'Élite** : grille 3×2 des 5 services avec cartes premium
3. **Témoignages** : carrousel ou grille sobre (3 témoignages)
4. **CTA contact** : formulaire compact sur fond navy
5. **Footer** : navigation, infos légales, adresse

### Structure de fichiers suggérée
```
app/
  layout.tsx
  page.tsx                  (accueil)
  centres/page.tsx
  services/page.tsx
  reserver/page.tsx
  contact/page.tsx
  espace-client/page.tsx
components/
  ui/                       (Button, Card, Input primitifs)
  sections/                 (Hero, Services, Testimonials, CTA, Footer)
  animations/               (FadeIn, SlideUp, Parallax wrappers)
lib/
  animations.ts             (presets motion/gsap)
  utils.ts
public/
  images/
```

---

## 6. Composants récurrents

- **Button** : 3 variantes — `primary` (fond or, texte navy), `secondary` (outline ivoire), `ghost` (texte seul souligné au hover)
- **Card** : coins légèrement arrondis (`rounded-sm` ou `rounded-md`, pas plus), bordure fine ou ombre très douce
- **Section** : wrapper avec `py-24 md:py-32`, `max-w-7xl mx-auto px-6`
- **Titre de section** : petit label doré en `uppercase tracking-widest` au-dessus du titre principal

---

## 7. Accessibilité & performance

- **A11y** : contrastes WCAG AA minimum, focus visible, navigation clavier, alt texts sur images
- **SEO** : métadonnées complètes par page (`generateMetadata`), Open Graph, JSON-LD LocalBusiness
- **Performance** : Lighthouse ≥ 90 sur toutes les métriques, images `next/image` avec `priority` sur hero uniquement
- **Responsive** : mobile-first, breakpoints Tailwind standards (`sm`, `md`, `lg`, `xl`)

---

## 8. Ton de la copy

- **Français soutenu** mais pas guindé
- Vocabulaire : *excellence, prestige, sur-mesure, accompagnement, sérénité, ambition*
- Phrases courtes, affirmatives
- Éviter : superlatifs creux, jargon marketing, points d'exclamation
- Exemples de titres : « L'Excellence au Service de votre Entreprise », « Un cadre à la hauteur de vos ambitions »

---

## 9. À éviter absolument

- Animations rapides, rebonds, effets « pop »
- Dégradés multicolores, néons, ombres portées fortes
- Emojis dans l'UI finale
- Coins très arrondis (`rounded-full` réservé aux avatars/pastilles)
- Stock photos génériques « corporate shake hands »
- Popups intrusives, chat bots envahissants

---

## 10. Instructions de travail pour Claude

- **Toujours lire** les fichiers existants avant de modifier
- **Respecter la palette** et la typographie strictement — ne pas introduire de nouvelles couleurs sans validation
- **Chaque section** doit inclure au minimum une animation d'entrée au scroll (fade-in + slide-up)
- **Mobile first** : tester chaque composant en 375px avant desktop
- **Pas de dépendances supplémentaires** sans raison forte (Motion + GSAP couvrent déjà tout)
- Demander confirmation avant : installation de nouvelles libs, changement de structure majeure, ajout de pages non listées
