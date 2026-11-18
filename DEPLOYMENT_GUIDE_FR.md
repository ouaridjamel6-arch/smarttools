# GUIDE DE DÉPLOIEMENT GRATUIT DE SMARTTOOLS
## Publication Étape par Étape sur GitHub & Cloudflare Pages (100% Gratuit)

Ce guide s'adresse au propriétaire du projet SMARTTOOLS. Il explique en français simple, pas à pas et sans jargon complexe, comment publier votre site sur Internet gratuitement, sans payer d'hébergement, grâce à **GitHub** et **Cloudflare Pages**.

---

## Sommaire
1. [Étape 1 : Créer un compte GitHub](#étape-1--créer-un-compte-github)
2. [Étape 2 : Créer un dépôt sur GitHub](#étape-2--créer-un-dépôt-sur-github)
3. [Étape 3 : Envoyer le projet SMARTTOOLS sur GitHub](#étape-3--envoyer-le-projet-smarttools-sur-github)
4. [Étape 4 : Créer un compte Cloudflare](#étape-4--créer-un-compte-cloudflare)
5. [Étape 5 : Connecter GitHub à Cloudflare Pages](#étape-5--connecter-github-à-cloudflare-pages)
6. [Étape 6 : Lancer la compilation et publier le site](#étape-6--lancer-la-compilation-et-publier-le-site)
7. [Étape 7 : Récupérer votre adresse web publique](#étape-7--récupérer-votre-adresse-web-publique)
8. [Étape 8 : Vérifier que le site fonctionne parfaitement](#étape-8--vérifier-que-le-site-fonctionne-parfaitement)
9. [Étape 9 : Connecter Google Search Console](#étape-9--connecter-google-search-console)
10. [Étape 10 : Préparer la monétisation Google AdSense](#étape-10--préparer-la-monétisation-google-adsense)

---

## Étape 1 : Créer un compte GitHub

GitHub est la plateforme qui va héberger le code source de SMARTTOOLS de façon sécurisée et privée.

1. Rendez-vous sur le site officiel : **[https://github.com](https://github.com)**.
2. Cliquez sur le bouton vert en haut à droite : **"Sign up"** (S'inscrire).
3. Entrez votre adresse e-mail, puis créez un mot de passe sécurisé.
4. Choisissez un nom d'utilisateur (par exemple : `votre-nom` ou `smarttools-team`).
5. Complétez la petite vérification de sécurité (puzzle visuel).
6. GitHub vous envoie un code de vérification à 8 chiffres par e-mail : ouvrez votre boîte de réception et saisissez ce code.
7. Choisissez le plan **Free** (Gratuit à vie). Votre compte est immédiatement actif.

---

## Étape 2 : Créer un dépôt (Repository) sur GitHub

Un dépôt est le dossier distant qui recevra les fichiers du projet.

1. Une fois connecté sur GitHub, cliquez sur l'icône **"+"** en haut à droite de l'écran, puis sélectionnez **"New repository"** (Nouveau dépôt).
2. Remplissez les champs suivants :
   - **Repository name** (Nom du dépôt) : tapez `smarttools`.
   - **Description** (facultatif) : tapez `Fast, Private, Client-Side Online Utilities & Growth Center`.
   - **Visibilité** :
     - Sélectionnez **Public** si vous souhaitez que votre code soit visible de tous.
     - Ou sélectionnez **Private** (Privé) si vous voulez être la seule personne à voir le code. *Cloudflare Pages fonctionne parfaitement avec les dépôts privés gratuits.*
   - **Important** : Ne cochez **PAS** les cases *"Add a README file"*, *"Add .gitignore"* ou *"Choose a license"* car nous avons déjà créé ces fichiers dans votre projet.
3. Cliquez sur le bouton vert en bas : **"Create repository"** (Créer le dépôt).
4. GitHub affiche alors une page avec l'adresse URL de votre dépôt, sous la forme :
   `https://github.com/votre-nom/smarttools.git`.
   *Gardez cette page ouverte ou copiez cette adresse.*

---

## Étape 3 : Envoyer le projet SMARTTOOLS sur GitHub

Le projet sur votre ordinateur est déjà initialisé avec Git. Il suffit de le relier à votre nouveau dépôt GitHub.

1. Ouvrez votre terminal (PowerShell sous Windows ou le terminal de votre éditeur).
2. Déplacez-vous dans le dossier de SMARTTOOLS :
   ```powershell
   cd "C:\Users\OUARI DJAMEL\.gemini\antigravity\scratch\smarttools"
   ```
3. Renommez la branche principale en `main` (standard moderne) :
   ```powershell
   git branch -M main
   ```
4. Reliez votre projet local à votre dépôt GitHub (remplacez l'URL par la vôtre) :
   ```powershell
   git remote add origin https://github.com/votre-nom/smarttools.git
   ```
5. Envoyez les fichiers sur GitHub :
   ```powershell
   git push -u origin main
   ```
6. Si GitHub vous demande de vous identifier :
   - Connectez-vous avec votre navigateur lorsque la fenêtre s'ouvre, ou saisissez votre nom d'utilisateur et un **Personal Access Token** (créé dans GitHub > Settings > Developer Settings > Personal access tokens).
7. Dès que la commande se termine, rafraîchissez la page de votre dépôt sur GitHub : l'ensemble des fichiers du projet (`src/`, `public/`, `README.md`, etc.) s'affiche !

---

## Étape 4 : Créer un compte Cloudflare

Cloudflare Pages est l'un des hébergeurs de sites statiques les plus rapides au monde, avec un réseau de diffusion mondial (CDN) et une formule **100% gratuite** (bande passante illimitée).

1. Rendez-vous sur **[https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)**.
2. Entrez votre adresse e-mail et choisissez un mot de passe.
3. Cliquez sur **"Create Account"** (Créer un compte).
4. Ouvrez votre boîte e-mail et cliquez sur le lien de confirmation envoyé par Cloudflare.

---

## Étape 5 : Connecter GitHub à Cloudflare Pages

1. Dans le tableau de bord Cloudflare, regardez le menu de gauche.
2. Cliquez sur **"Workers & Pages"** (Workers et Pages).
3. Cliquez sur le bouton bleu **"Create application"** (Créer une application).
4. Dans les onglets du haut, cliquez sur **"Pages"**.
5. Cliquez sur le bouton **"Connect to Git"** (Connecter à Git).
6. Cliquez sur **"Connect GitHub"** : une fenêtre s'ouvre pour autoriser Cloudflare à lire vos dépôts GitHub.
   - Vous pouvez choisir d'autoriser l'accès à *"All repositories"* ou uniquement à `smarttools`.
   - Cliquez sur **"Install & Authorize"**.
7. De retour sur Cloudflare, vous voyez la liste de vos projets : sélectionnez `smarttools` et cliquez sur **"Begin setup"** (Commencer la configuration).

---

## Étape 6 : Lancer la compilation et publier le site

Cloudflare vous présente un formulaire de configuration :

1. **Project name** : laissez `smarttools` (ou choisissez le nom de votre choix).
2. **Production branch** : laissez `main`.
3. **Framework preset** : dans le menu déroulant, sélectionnez **Vite**.
4. **Build command** : vérifiez qu'il est écrit `npm run build`.
5. **Build output directory** : vérifiez qu'il est écrit `dist`.
6. **Environment variables (Variables d'environnement)** :
   - Cliquez sur **"Add variable"** si besoin pour fixer la version de Node :
     - Nom de variable : `NODE_VERSION`
     - Valeur : `20`
   *(Le fichier `.node-version` présent dans le projet le configure déjà automatiquement).*
7. Cliquez sur le bouton bleu tout en bas : **"Save and Deploy"** (Enregistrer et déployer).
8. Cloudflare lance la compilation. Vous voyez les lignes de code défiler en direct :
   - Installation des dépendances...
   - Exécution de `npm run build`...
   - Génération de `sitemap.xml` et `robots.txt`...
   - Téléversement des fichiers sur le CDN mondial.
9. Au bout de 40 à 60 secondes, Cloudflare affiche un écran vert : **"Success! Your project is deployed."** (Succès ! Votre projet est déployé).

---

## Étape 7 : Récupérer votre adresse web publique

1. Dès la fin du déploiement, Cloudflare vous affiche votre adresse publique gratuite, sous la forme :
   `https://smarttools.pages.dev` (ou `https://nom-de-votre-projet.pages.dev`).
2. Cliquez sur ce lien : votre site SMARTTOOLS est officiellement en ligne, accessible depuis n'importe quel ordinateur ou smartphone dans le monde entier, avec un certificat de sécurité **HTTPS / SSL gratuit** activé automatiquement !

### Ajouter un nom de domaine personnalisé (Optionnel) :
Si vous possédez votre propre nom de domaine (par exemple `monsmarttools.com`) :
1. Dans Cloudflare Pages, cliquez sur votre projet `smarttools`.
2. Allez dans l'onglet **"Custom domains"** (Domaines personnalisés).
3. Cliquez sur **"Set up a custom domain"** et suivez les instructions simples pour pointer votre domaine vers Cloudflare.

---

## Étape 8 : Vérifier que le site fonctionne parfaitement

Effectuez les vérifications de routine suivantes directement sur votre nouvelle adresse `https://votresite.pages.dev` :

1. **Test des 8 outils** :
   - Ouvrez le générateur de QR code, testez un lien et téléchargez l'image PNG.
   - Ouvrez le compresseur d'images et glissez une photo pour vérifier la réduction de poids.
   - Ouvrez le formateur JSON et collez du code pour tester le formatage.
2. **Test des langues** :
   - Cliquez sur **"عربي"** dans le menu supérieur : vérifiez que tout s'affiche de droite à gauche (**RTL**).
   - Cliquez sur **"FR"** puis **"EN"** pour vérifier les traductions.
3. **Test du rafraîchissement des pages (Routage SPA)** :
   - Naviguez vers `https://votresite.pages.dev/tool/image-compressor`.
   - Appuyez sur la touche `F5` (ou rafraîchissez le navigateur) : la page doit se recharger instantanément sans afficher d'erreur 404 (grâce au fichier `_redirects` inclus).
4. **Accès au Growth Center** :
   - Rendez-vous sur `https://votresite.pages.dev/growth-center`.
   - L'écran de sécurité s'affiche : entrez votre code PIN personnel pour accéder à votre tableau de bord marketing.

---

## Étape 9 : Connecter Google Search Console

Pour que Google commence à référencer vos outils gratuitement :

1. Rendez-vous sur **[https://search.google.com/search-console](https://search.google.com/search-console)** et connectez-vous avec votre compte Google.
2. Cliquez sur **"Ajouter une propriété"** en haut à gauche.
3. Choisissez l'option **"Préfixe de l'URL"** et collez votre adresse complète : `https://votresite.pages.dev` (ou votre domaine personnalisé).
4. Cliquez sur **"Continuer"**.
5. Google vous propose plusieurs méthodes de validation :
   - La méthode la plus simple est la **balise HTML** : copiez la ligne `<meta name="google-site-verification" content="..." />`.
   - Si vous utilisez Cloudflare avec un nom de domaine propre, choisissez la méthode **Enregistrement DNS** (TXT) que vous ajoutez en 1 clic dans l'onglet DNS de Cloudflare.
6. Une fois validé, cliquez sur **"Sitemaps"** dans le menu de gauche de Google Search Console.
7. Dans le champ "Ajouter un sitemap", tapez simplement :
   `sitemap.xml`
8. Cliquez sur **"Envoyer"**.
9. Google confirmera la réception du sitemap contenant l'ensemble de vos outils en anglais, français et arabe.

---

## Étape 10 : Préparer la monétisation Google AdSense

Pour monétiser légalement votre audience internationale une fois que le site reçoit des visiteurs réguliers :

1. **Conditions préalables d'AdSense** : Google exige généralement un nom de domaine personnalisé propre (par exemple `smarttools.com` plutôt que le sous-domaine `.pages.dev`) et un site actif depuis quelques semaines avec du trafic régulier.
2. **Vérification des pages légales** : Votre site dispose déjà de toutes les pages obligatoires exigées par Google :
   - `/privacy` (Politique de Confidentialité).
   - `/terms` (Conditions d'Utilisation).
   - `/about` (À propos).
   - `/contact` (Contact).
3. **Créer votre compte AdSense** :
   - Rendez-vous sur **[https://adsense.google.com](https://adsense.google.com)**.
   - Cliquez sur **"Commencer"** et entrez l'URL de votre site.
4. **Récupérer votre identifiant éditeur** :
   - Votre identifiant ressemble à : `pub-1234567890123456`.
5. **Activer AdSense dans SMARTTOOLS** :
   - Rendez-vous sur votre Growth Center (`/growth-center`) &rarr; onglet **Settings**.
   - Collez votre identifiant dans le champ **"Google AdSense Publisher ID"**.
   - Cochez la case **"Enable AdSense Responsive Placeholders"**.
   - Cliquez sur le bouton **"ads.txt"** pour télécharger votre fichier de conformité officiel et placez-le dans votre dossier public.
   - Cliquez sur **"Save All Settings"**.

---

## Félicitations !
Votre machine de croissance SMARTTOOLS est prête à être déployée mondialement sans dépenser le moindre centime d'hébergement.
