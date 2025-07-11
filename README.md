# NexoraX - School Management Platform

**NexoraX** est une plateforme web moderne et puissante destinée à la **gestion complète des établissements scolaires**. Conçue pour les réalités du terrain, elle propose un système adapté aux administrateurs d'école, enseignants, parents et élèves. La plateforme est structurée en deux parties : un backend en **NestJS avec MySQL**, et un frontend en **Next.js avec TailwindCSS**.

---

## 🌟 Fonctionnalités Clés

### Backend (NestJS + MySQL)

* Multi-écoles : chaque école a ses données isolées
* Authentification JWT avec gestion multi-écoles par utilisateur
* Inscription d'une école + admin principal avec validation manuelle
* Génération automatique des rôles par défaut pour chaque école
* Table pivot `user_school_roles` permettant à un utilisateur d'appartenir à plusieurs écoles avec des rôles différents
* Système de permissions dynamique par rôle configurable par chaque école
* Modules clés : gestion des utilisateurs, écoles, rôles, permissions, classes, salles, notes, emplois du temps, finances, présences, calendrier scolaire, bulletins, etc.
* Export CSV / PDF de données
* API REST bien structurée et documentée avec Swagger

### Frontend (Next.js + TailwindCSS)

* Authentification avec choix de l’école active
* Interface adaptée à chaque type d’utilisateur (admin, enseignant, parent, élève...)
* Thème sombre / clair
* Multilingue : français / anglais
* Animations fluides (Transitions entre pages, formulaire à étapes...)
* Tableaux interactifs, vues calendrier, glisser-déposer, formulaires modernes
* Landing page professionnelle avec présentation de la plateforme

---

## 📁 Structure des Dossiers

### Backend

```
backend/
├── src/
│   ├── auth/
│   ├── users/
│   ├── schools/
│   ├── roles/
│   ├── permissions/
│   ├── classes/
│   ├── schedules/
│   ├── finances/
│   ├── presences/
│   ├── calendar/
│   └── common/
├── prisma/ (ou migrations SQL)
├── .env
└── main.ts
```

### Frontend

```
frontend/
├── pages/
├── components/
├── layouts/
├── styles/
├── locales/ (i18n)
├── public/
└── utils/
```

---

## ✅ Installation

### Prérequis

* Node.js >= 18.x
* MySQL 8+

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Modifier la config MySQL dans .env
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📖 Fonctionnement Général

* **Inscription école** : formulaire en plusieurs étapes. Crée une école + un admin, attend validation.
* **Rôles et permissions** : chaque école a ses propres rôles, avec autorisations dynamiques.
* **Utilisateurs** : un seul compte peut être lié à plusieurs écoles (ex : parent avec plusieurs enfants, enseignant multi-école).
* **Accès** : l’accès est restreint à une école à la fois, et filtré selon les rôles/permissions

---

## 🔧 Technologies Utilisées

### Backend

* NestJS
* TypeORM
* MySQL
* JWT / Guards personnalisés
* Swagger

### Frontend

* Next.js
* TailwindCSS
* i18next (internationalisation)
* Zustand (state global)
* React Hook Form
* Headless UI

---

## 🛡️ Sécurité & Déploiement

* Chaque école gère ses propres données et accès
* Système de validation manuelle des écoles pour éviter les fausses inscriptions
* Les données sensibles sont stockées en sécurité avec hash des mots de passe
* Peut être déployé sur Railway, Render, VPS, ou serveur d’école en local (version SaaS possible)

---

## 🚀 Roadmap (prochaines étapes)

* Ajout de la reconnaissance faciale pour la présence
* Messagerie interne
* Paiement Mobile Money (API tiers)
* Version offline / locale (Electron ou PWA)

---

## ✉️ Contribuer

Toute contribution est la bienvenue. Merci de suivre les bonnes pratiques NestJS / Next.js. Ouvrez une issue ou une pull request si vous souhaitez participer.

---

## 🌐 Créateurs

Projet développé par deux passionnés de technologie et d'éducation, avec pour but de proposer la plateforme scolaire la plus moderne et accessible d'Afrique.

---

> Pour toute question ou suggestion, contactez-nous ou ouvrez une issue.
