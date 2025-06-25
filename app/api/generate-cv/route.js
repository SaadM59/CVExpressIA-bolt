export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { firstName, lastName, email, phone, position, experience } = await request.json();

    const prompt = `Tu es un expert RH senior et consultant en recrutement. Génère un CV professionnel premium au format HTML pour :

**INFORMATIONS CANDIDAT :**
- Nom : ${firstName} ${lastName}
- Email : ${email}
- Téléphone : ${phone}
- Poste visé : ${position}
- Expérience brute : ${experience}

**INSTRUCTIONS CRITIQUES :**
1. Réécris l'expérience pour maximiser l'impact professionnel
2. Ajoute des métriques et résultats quantifiés crédibles
3. Utilise un vocabulaire technique adapté au secteur du poste visé
4. Optimise pour les ATS avec mots-clés pertinents
5. Crée un résumé professionnel percutant de 3 lignes
6. Ajoute 5-7 compétences techniques clés pour ce poste

**FORMAT REQUIS :**
- HTML moderne avec CSS inline
- Design professionnel et épuré
- Hiérarchie visuelle claire
- Couleurs sobres (bleu, gris, noir)
- Lisible et imprimable

Génère uniquement le HTML complet du CV, sans commentaires.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const cvContent = completion.choices[0].message.content;

    return NextResponse.json({ content: cvContent });
  } catch (error) {
    console.error('Erreur OpenAI:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de la génération du CV' 
    }, { status: 500 });
  }
}
