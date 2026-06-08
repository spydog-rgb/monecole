# 🏫 MonEcole — Guide de déploiement complet

Application éducative pour Jade (6e) et Hugo (CE2) — Programme EN 2025 — IA Claude intégrée

---

## 🚀 Déploiement en 4 étapes (gratuit)

### Étape 1 — Firebase (base de données + connexion)

1. Allez sur **https://console.firebase.google.com**
2. Cliquez **"Créer un projet"** → donnez un nom (ex : monecole-famille)
3. Dans **Authentication** → Connexion par email/mot de passe → Activer
4. Dans **Firestore Database** → Créer → Mode Production
5. Copiez les règles Firestore (voir section ci-dessous)
6. Dans **Paramètres du projet** → Ajouter une application Web
7. Copiez la configuration Firebase

### Étape 2 — Clé API Anthropic (IA Claude)

1. Allez sur **https://console.anthropic.com**
2. Créez un compte → API Keys → Créer une clé
3. Copiez la clé (commence par `sk-ant-...`)

### Étape 3 — Configuration locale

```bash
# Clonez ou téléchargez le projet
cd monecole

# Installez les dépendances
npm install

# Créez le fichier de configuration
cp .env.local.example .env.local

# Éditez .env.local avec vos clés Firebase + Anthropic
nano .env.local
```

### Étape 4 — Déploiement sur Vercel (gratuit)

```bash
# Option A : Vercel CLI
npm install -g vercel
vercel

# Option B : Interface web
# 1. Poussez le code sur GitHub
# 2. Allez sur vercel.com → Import Project
# 3. Ajoutez les variables d'environnement (.env.local)
# 4. Deploy !
```

---

## 🔥 Règles Firestore (sécurité)

Copiez ces règles dans Firebase → Firestore → Règles :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Famille : accès uniquement au propriétaire
    match /families/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }

    // Résultats : accès uniquement à la famille propriétaire
    match /results/{docId} {
      allow read, write: if request.auth != null
        && resource.data.familyId == request.auth.uid;
      allow create: if request.auth != null
        && request.resource.data.familyId == request.auth.uid;
    }

    // Devoirs : accès uniquement à la famille propriétaire
    match /devoirs/{docId} {
      allow read, write, delete: if request.auth != null
        && resource.data.familyId == request.auth.uid;
      allow create: if request.auth != null
        && request.resource.data.familyId == request.auth.uid;
    }
  }
}
```

---

## 📁 Structure du projet

```
monecole/
├── src/
│   ├── pages/
│   │   ├── index.js          ← Connexion / Inscription
│   │   ├── home.js           ← Accueil famille
│   │   ├── parent.js         ← Tableau de bord parent
│   │   └── child/[id].js     ← Espace enfant (exercices + IA)
│   ├── components/
│   │   └── Layout.js         ← Navigation globale
│   ├── lib/
│   │   ├── firebase.js       ← Connexion Firebase
│   │   ├── db.js             ← Helpers base de données
│   │   ├── AuthContext.js    ← Gestion authentification
│   │   └── questions.js      ← Toutes les questions (EN 2025)
│   └── styles/
│       └── globals.css       ← Styles globaux
├── .env.local.example        ← Template variables d'environnement
├── .gitignore
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## ✨ Fonctionnalités

### Espace enfant
- ✅ QCM par matière (programme EN 2025 officiel)
- ✅ Module anglais vocal avec synthèse vocale (texte-to-speech)
- ✅ Assistant IA Claude sécurisé (questions scolaires uniquement)
- ✅ Affichage des devoirs assignés par les parents
- ✅ Historique des résultats

### Espace parent
- ✅ Tableau de bord avec graphiques de progression (Recharts)
- ✅ Ajout / gestion des enfants (nom, niveau, couleur)
- ✅ Création et suivi des devoirs
- ✅ Programme EN 2025 par niveau (Jade 6e / Hugo CE2)
- ✅ Alertes sur les points faibles

### Technique
- ✅ Next.js 14 (React + SSR)
- ✅ Firebase Auth + Firestore (sauvegarde en temps réel)
- ✅ API Anthropic Claude claude-sonnet-4-20250514 (IA sécurisée)
- ✅ Tailwind CSS (responsive mobile/desktop)
- ✅ Recharts (graphiques)
- ✅ Déployable sur Vercel gratuitement

---

## 💰 Coûts estimés

| Service | Gratuit jusqu'à | Coût ensuite |
|---------|----------------|-------------|
| Firebase | 50 000 lectures/jour | ~5-10 €/mois |
| Vercel | 100 Go bandwidth | ~20 €/mois |
| Anthropic API | — | ~0,01 €/100 questions |
| **Total** | **Usage familial = gratuit** | ~5-30 €/mois si croissance |

---

## 🔒 Sécurité enfants

- Système prompt IA strict : questions scolaires uniquement
- Pas de contenu adulte, violent ou inapproprié
- Pas de pub, pas de tracking
- Données stockées en Europe (Firebase EU)
- Authentification par email/mot de passe parent
- Règles Firestore : chaque famille n'accède qu'à ses données

---

## 🛠️ Développement local

```bash
npm install
cp .env.local.example .env.local
# Éditez .env.local
npm run dev
# → http://localhost:3000
```

---

## 📞 Ajouter d'autres enfants

Dans l'espace parent → Enfants → Ajouter un enfant.
Indiquez le niveau scolaire exact pour que l'application adapte
automatiquement le programme et les exercices.

---

*Fait avec ❤️ · Programme Éducation Nationale France 2025*
