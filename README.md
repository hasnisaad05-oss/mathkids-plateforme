# 🚀 MathKids - Plateforme Pédagogique d'Apprentissage des Mathématiques

Une application web moderne, colorée, 100% responsive et sans aucune dépendance lourde (purement **HTML5, CSS3 et JavaScript vanilla**) conçue pour apprendre les mathématiques aux enfants de manière amusante et efficace.

---

## 🌟 Fonctionnalités Principales

### 1. 📖 Mini-Leçons Magiques & Illustrées
- **Nombres et comptage** : Unités, dizaines, décompositions et comparaisons.
- **Addition (+)** : Réunir des quantités, manipulations visuelles et compléments à 10.
- **Soustraction (-)** : Retirer, trouver la différence, compte à rebours.
- **Multiplication (×)** : Additions répétées, grilles de paquets, astuces pour les tables.
- **Division (÷)** : Le pouvoir du partage équitable, notion de reste.
- **Énigmes & Problèmes** : Méthode en 4 étapes pour comprendre et résoudre un problème concret.

### 2. 🎯 Atelier d'Entraînement Interactif
- **3 niveaux de difficulté progressifs** :
  - 🌱 **Facile** (CP / CE1 - 6 à 7 ans)
  - ⭐ **Moyen** (CE2 / CM1 - 8 à 9 ans)
  - 🔥 **Difficile** (CM2 / 6e - 10 à 11 ans)
- Sélection de l'opération en 1 clic : `+`, `−`, `×`, `÷`, ou `Énigmes`.
- Boutons larges optimisés pour les doigts des enfants sur smartphone et tablette.
- Retour immédiat : sons de succès ou encouragement, série de victoires (flammes).

### 3. 🏆 Le Grand Défi Quiz
- Séries de questions variées avec barre de progression en temps réel.
- **Correction pédagogique instantanée** expliquant le pourquoi de la réponse.
- Écran festif de résultats avec pourcentage de réussite et confettis.

### 4. ⭐ Système de Gamification & Motivation
- **Points d'expérience (XP)** et **Étoiles** cumulables.
- **Niveaux de joueur** : Apprenti Calculateur ➔ Aventurier ➔ Explorateur ➔ Maître ➔ Grand Génie.
- **8 Badges de réussite à débloquer** (Première Étoile, As de l'Addition, Ninja du Moins, Série Enflammée, etc.).
- Modale festive animée à chaque badge débloqué.
- Sauvegarde automatique dans le navigateur (`localStorage`).

### 5. 🔊 Expérience Sensorielle Ludique
- **Sons synthétisés en temps réel** via l'API standard Web Audio (aucun fichier MP3 externe à charger).
- Bouton pour activer / désactiver le son en un clic.
- Animation de feux d'artifice de confettis en Canvas HTML5 natif.

---

## 📱 Design & Responsive Mobile-First

- **Mobile First** : Barre de navigation basse toujours accessible au pouce sur smartphone.
- **Tablette & Ordinateur** : En-tête étendu et grille aérée.
- **Typographie ronde & lisible** : Police *Fredoka* adaptée aux jeunes lecteurs.
- **Palette de couleurs stimulante** : Contrastes étudiés, couleurs douces et valorisantes.

---

## 📁 Structure du Projet

```text
/Users/mvpro/saas/
├── index.html          # Structure de l'application et navigation
├── css/
│   └── style.css       # Styles modernes, variables CSS, responsive et animations
├── js/
│   ├── audio.js        # Synthétiseur sonore Web Audio API
│   ├── data.js         # Données pédagogiques (cours, quiz, badges, énigmes)
│   └── app.js          # Moteur de l'application, gestion d'état et interactions
└── README.md           # Documentation du projet
```

---

## 🚀 Comment Lancer la Plateforme

Aucun serveur lourd ou installation nécessaire ! Il suffit d'ouvrir le fichier :

```bash
open /Users/mvpro/saas/index.html
```

Ou en double-cliquant directement sur `index.html` depuis le Finder ou l'explorateur de fichiers.

