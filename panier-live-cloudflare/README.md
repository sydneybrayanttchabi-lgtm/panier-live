# Panier Live

Application de gestion de tournois de basketball (1v1 à 5v5), planification de
sessions entre amis, messagerie, et suivi de score en direct.

## Structure

- `index.html`, `App.js`, `storagePolyfill.js`, `manifest.webmanifest`, `sw.js`,
  `icons/` — le site statique (aucun bundler requis : React, ReactDOM et
  lucide-react sont chargés depuis un CDN via une import map dans `index.html`).
- `functions/api/storage.js` — fonction Cloudflare Pages qui sert de backend de
  stockage partagé (utilisateurs, tournois, sessions, messages), sauvegardé
  dans une base Workers KV.
- `wrangler.toml` — nom du binding KV attendu par la fonction (`PANIER_KV`).

## Déploiement sur Cloudflare Pages

**1. Créer la base KV (une seule fois)**
Dashboard Cloudflare → Workers & Pages → KV → "Create a namespace" → nommez-la
par ex. `panier-live-data`.

**2. Créer le projet Pages**
Deux façons possibles :
- *Avec GitHub (recommandé)* : Workers & Pages → "Create application" → Pages
  → "Connect to Git" → sélectionnez le dépôt. Laissez le "Build command" vide
  et le "Build output directory" sur `/` (racine) — c'est un site statique,
  aucune commande de build n'est nécessaire.
- *Sans GitHub* : "Create application" → Pages → "Upload assets" → glissez-
  déposez tout le contenu de ce dossier.

**3. Relier la base KV au projet**
Dans le projet Pages → Settings → Functions → "KV namespace bindings" → "Add
binding" → variable name : `PANIER_KV` → sélectionnez la base créée à l'étape 1.
(Si vous déployez avec la CLI `wrangler`, remplissez plutôt l'`id` dans
`wrangler.toml`.)

**4. Redéployer**
Après avoir ajouté le binding, redéclenchez un déploiement (bouton "Retry
deployment", ou un nouveau commit si le dépôt GitHub est relié) pour que la
fonction ait accès à la base.

Le site sera en ligne sur `https://<nom-du-projet>.pages.dev`.
