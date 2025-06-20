# CV Express IA 🚀

MVP de génération de CV et lettre de motivation optimisés par IA pour jeunes diplômés et candidats en reconversion.

**Promesse :** Obtiens ton CV + Lettre de motivation optimisés par IA en 5 minutes pour 9,99€.

## 🛠 Stack Technique

- **Framework :** Next.js 13+ (App Router)
- **Styling :** Tailwind CSS + shadcn/ui
- **Validation :** React Hook Form + Zod
- **Paiement :** Stripe Checkout
- **IA :** OpenAI GPT-3.5-turbo
- **PDF :** Puppeteer
- **Storage :** Vercel Blob (avec expiration 24h)
- **Email :** SendGrid
- **Base de données :** Aucune (RGPD compliant)

## 🚀 Démarrage rapide

### 1. Installation

```bash
git clone <your-repo>
cd cv-express-ia
npm install
```

### 2. Variables d'environnement

Copier `.env.example` vers `.env.local` et remplir :

```bash
cp .env.example .env.local
```

### 3. Configuration Stripe (développement)

```bash
# Terminal 1 - Serveur Next.js
npm run dev

# Terminal 2 - Stripe CLI pour webhooks
stripe listen --forward-to localhost:3000/api/webhook
# Copier le webhook secret affiché dans .env.local
```

### 4. Test local

```bash
npm run test
npm run lint
npm run build
```

## 📦 Déploiement Vercel

### 1. Déploiement

```bash
# Via Vercel CLI
vercel --prod

# Ou push sur main avec auto-deployment
git push origin main
```

### 2. Configuration des variables

Dans Vercel Dashboard > Settings > Environment Variables, ajouter :

```
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
SENDGRID_API_KEY=SG....
BLOB_READ_WRITE_TOKEN=vercel_blob_...
OPENAI_PROMPT_CV=Tu es un expert RH français...
OPENAI_MODEL=gpt-3.5-turbo-0125
```

### 3. Webhook Stripe production

Dans Stripe Dashboard > Webhooks, créer un endpoint :
- URL : `https://your-domain.vercel.app/api/webhook`
- Événements : `checkout.session.completed`

### 4. Cron Vercel (purge RGPD)

Dans `vercel.json`, le cron est configuré pour s'exécuter toutes les heures.

## 🧪 Tests

```bash
npm run test          # Tests unitaires
npm run test:watch    # Mode watch
npm run test:coverage # Coverage
```

## 📁 Structure du projet

```
cv-express-ia/
├── app/
│   ├── api/
│   │   ├── preview/route.ts
│   │   ├── generate-final/route.ts
│   │   ├── webhook/route.ts
│   │   └── cron-purge/route.ts
│   ├── generate/
│   │   └── page.tsx
│   ├── success/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── forms/
│   ├── sections/
│   └── ui/
├── lib/
│   ├── stripe.ts
│   ├── openai.ts
│   ├── sendgrid.ts
│   ├── pdf.ts
│   └── validations.ts
├── types/
│   └── cv.ts
└── tests/
    └── *.test.ts
```

## 🔒 RGPD & Sécurité

- **Aucune donnée stockée** au-delà de 24h
- **Purge automatique** des fichiers via Cron Vercel
- **Liens signés** Vercel Blob avec expiration
- **Validation stricte** des données utilisateur
- **Pas de base de données** = pas de risque de fuite

## 📧 Templates email

Templates SendGrid configurés dans `lib/sendgrid.ts` :
- Email de confirmation avec lien de téléchargement
- Notifications d'erreur (optionnel)

## 🎨 Design System

- **Couleurs :** Palette personnalisée avec CSS variables
- **Composants :** shadcn/ui + composants custom
- **Responsive :** Mobile-first avec breakpoints Tailwind
- **Animations :** Framer Motion pour les transitions

## 🐛 Debug

```bash
# Logs Stripe webhook
stripe logs --live

# Logs Vercel
vercel logs your-deployment-url

# Tests API locaux
curl -X POST http://localhost:3000/api/preview \
  -H "Content-Type: application/json" \
  -d @test-data.json
```

## 📝 Données d'exemple

Fichier `test-data.json` pour tester les APIs :

```json
{
  "personalInfo": {
    "firstName": "Marie",
    "lastName": "Dupont",
    "email": "marie.dupont@email.com",
    "phone": "06 12 34 56 78",
    "address": "123 rue de la République",
    "city": "Lyon",
    "postalCode": "69001",
    "linkedIn": "https://linkedin.com/in/marie-dupont",
    "website": ""
  },
  "experiences": [
    {
      "id": "exp1",
      "position": "Développeuse Frontend",
      "company": "TechCorp",
      "location": "Lyon",
      "startDate": "2023-01",
      "endDate": "",
      "current": true,
      "description": "Développement d'applications React avec TypeScript. Collaboration étroite avec l'équipe UX/UI pour créer des interfaces utilisateur intuitives.",
      "achievements": [
        "Amélioration des performances de 40%",
        "Migration vers TypeScript"
      ]
    },
    {
      "id": "exp2",
      "position": "Stagiaire Développement Web",
      "company": "WebAgency",
      "location": "Lyon",
      "startDate": "2022-06",
      "endDate": "2022-12",
      "current": false,
      "description": "Stage de 6 mois en développement web. Participation à la création de sites e-commerce et applications web.",
      "achievements": [
        "Développement de 3 sites e-commerce",
        "Formation équipe aux bonnes pratiques"
      ]
    }
  ],
  "education": [
    {
      "id": "edu1",
      "degree": "Master Informatique",
      "institution": "Université Lyon 1",
      "location": "Lyon",
      "startDate": "2021-09",
      "endDate": "2023-06",
      "current": false,
      "description": "Spécialisation développement web et mobile"
    }
  ],
  "skills": [
    {
      "id": "skill1",
      "name": "React",
      "level": "Avancé",
      "category": "Technique"
    },
    {
      "id": "skill2",
      "name": "TypeScript",
      "level": "Intermédiaire",
      "category": "Technique"
    },
    {
      "id": "skill3",
      "name": "Node.js",
      "level": "Intermédiaire",
      "category": "Technique"
    },
    {
      "id": "skill4",
      "name": "Communication",
      "level": "Avancé",
      "category": "Soft Skills"
    },
    {
      "id": "skill5",
      "name": "Gestion de projet",
      "level": "Intermédiaire",
      "category": "Soft Skills"
    }
  ],
  "targetJob": {
    "position": "Développeuse Full-Stack",
    "company": "Startup Tech",
    "jobDescription": "Nous recherchons un développeur full-stack passionné pour rejoindre notre équipe. Vous travaillerez sur des projets innovants en React, Node.js et participerez à l'architecture de nos applications.",
    "requiredSkills": ["React", "Node.js", "TypeScript", "MongoDB"],
    "industry": "Technologie"
  },
  "languages": [
    {
      "id": "lang1",
      "name": "Français",
      "level": "Natif"
    },
    {
      "id": "lang2",
      "name": "Anglais",
      "level": "Professionnel"
    }
  ],
  "interests": "Veille technologique, contribution open source, randonnée",
  "references": "Disponibles sur demande"
}
```

## 📝 Licence

MIT - Voir `LICENSE`