# La Maison Rose de Wallerand

Site vitrine statique pour La Maison Rose de Wallerand.

Architecture retenue:

- HTML / CSS / JS simples
- contenu stages et evenements gere par Decap CMS
- depot GitHub comme source unique
- deploiement sur Vercel
- aucune base de donnees
- aucun paiement interne
- liens d'inscription et d'adhesion rediriges vers HelloAsso

## Structure

```text
/
  admin/
    index.html
    config.yml
  api/
    decap/
      auth.js
      callback.js
  assets/
    data/
      stages.json
      evenements.json
    site.css
    site.js
    uploads/
  content/
    stages/
    evenements/
  partials/
    header.html
    footer.html
  scripts/
    build-content.mjs
  index.html
  stages.html
  evenements.html
  adherer.html
  association.html
  contact.html
  le-lieu.html
  wallerand.html
```

## Comment le contenu fonctionne

1. Le client ajoute un stage ou un evenement dans `/admin`
2. Decap CMS cree ou modifie un fichier Markdown dans `content/stages` ou `content/evenements`
3. A chaque deploiement, Vercel lance `npm run build`
4. Le script `scripts/build-content.mjs` transforme ces fichiers en:
   - `assets/data/stages.json`
   - `assets/data/evenements.json`
5. Les pages `stages.html` et `evenements.html` lisent ces JSON automatiquement

Cette approche garde un site simple, sans framework lourd.

## Local

### Lancer un serveur local

```bash
npm run build
npm run dev
```

Puis ouvrir:

- `http://localhost:8000/`
- `http://localhost:8000/admin/`

Note:

- le site public fonctionne localement
- la connexion GitHub de Decap CMS est surtout pensee pour Vercel
- pour un vrai test complet du CMS, le plus simple est de deployer d'abord sur Vercel

## GitHub

Depuis le dossier du projet:

```bash
git add .
git commit -m "Set up static site with Decap CMS and Vercel"
git push origin main
```

## Vercel

### 1. Importer le repo

Dans Vercel:

1. New Project
2. Import Git Repository
3. Choisir `lamaisonrosedewallerand/lamaisonrose-site`

### 2. Reglages du projet

Les fichiers du repo contiennent deja:

- `package.json`
- `vercel.json`

Vercel utilisera donc:

- Build Command: `npm run build`
- Output Directory: `.`

### 3. Variables d'environnement

Pour que `/admin` fonctionne avec GitHub sur Vercel, ajouter dans les variables du
projet:

- `GITHUB_OAUTH_CLIENT_ID`
- `GITHUB_OAUTH_CLIENT_SECRET`
- `GITHUB_OAUTH_SCOPE`

Valeur conseillee pour `GITHUB_OAUTH_SCOPE`:

- `public_repo` si le repo reste public
- `repo` si le repo devient prive

## GitHub OAuth App

Decap CMS a besoin d'une application OAuth GitHub pour connecter l'editeur.

### Creer l'application

Dans GitHub:

1. Aller dans Settings
2. Developer settings
3. OAuth Apps
4. New OAuth App

### Remplir les champs

Si ton domaine Vercel final est par exemple:

`https://lamaisonrose-site.vercel.app`

mettre:

- Homepage URL: `https://lamaisonrose-site.vercel.app`
- Authorization callback URL: `https://lamaisonrose-site.vercel.app/api/decap/callback`

Ensuite:

1. Recuperer le Client ID
2. Generer le Client Secret
3. Les coller dans les variables d'environnement Vercel
4. Redeloyer

## HelloAsso

Le site ne gere pas:

- les paiements
- les adhesions
- les inscrits
- les comptes utilisateurs

Le site affiche seulement:

- les informations du stage ou de l'evenement
- un bouton vers HelloAsso si un lien est renseigne

## Domaine OVH plus tard

Quand le site fonctionne deja sur Vercel:

1. Ouvrir le projet dans Vercel
2. Aller dans `Settings > Domains`
3. Ajouter le domaine OVH
4. Vercel indiquera les DNS a mettre chez OVH
5. Ajouter ensuite aussi le `www` si souhaite
6. Attendre la verification SSL automatique

En general:

- domaine racine: enregistrement `A`
- sous-domaine `www`: enregistrement `CNAME`

Verifie toujours les valeurs exactes donnees par Vercel au moment du branchement.

## Ce qui est deja pret

- pages statiques principales
- `admin/` propre
- collections Decap CMS pour stages et evenements
- contenus d'exemple dans `content/`
- build automatique Markdown -> JSON
- rendu automatique sur `stages.html` et `evenements.html`
- pont OAuth GitHub minimal pour Vercel

## Ce qui peut venir ensuite

- rendre aussi certains textes de pages modifiables via Decap CMS
- ajouter une collection `artistes`
- remplacer les liens HelloAsso d'exemple par les vrais
- ajouter les vraies images dans `assets/uploads`
