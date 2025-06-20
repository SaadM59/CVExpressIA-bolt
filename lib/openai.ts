import OpenAI from 'openai';
import { CVFormData } from '@/types/cv';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not defined');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DEFAULT_MODEL = 'gpt-3.5-turbo-0125';
const MODEL = process.env.OPENAI_MODEL || DEFAULT_MODEL;

const DEFAULT_PROMPT = `Tu es un expert RH français spécialisé dans l'optimisation de CV. 
Génère un CV professionnel en français à partir des informations fournies. 
Utilise un langage clair, des mots-clés pertinents pour le poste visé, et structure le contenu de manière logique. 
Retourne uniquement le contenu du CV en format Markdown.`;

const CV_PROMPT = process.env.OPENAI_PROMPT_CV || DEFAULT_PROMPT;

export async function generateCVPreview(data: CVFormData): Promise<string> {
  const prompt = buildCVPrompt(data, true);
  
  try {
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: CV_PROMPT },
        { role: 'user', content: prompt }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });
    
    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Erreur OpenAI:', error);
    throw new Error('Erreur lors de la génération du CV');
  }
}

export async function generateCV(data: CVFormData): Promise<string> {
  const prompt = buildCVPrompt(data, false);
  
  try {
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: CV_PROMPT },
        { role: 'user', content: prompt }
      ],
      max_tokens: 3000,
      temperature: 0.7,
    });
    
    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Erreur OpenAI:', error);
    throw new Error('Erreur lors de la génération du CV');
  }
}

export async function generateCoverLetter(data: CVFormData): Promise<string> {
  const prompt = buildCoverLetterPrompt(data);
  
  const coverLetterPrompt = `Tu es un expert RH français spécialisé dans la rédaction de lettres de motivation. 
  Génère une lettre de motivation professionnelle en français qui complète parfaitement le CV fourni. 
  La lettre doit être personnalisée pour le poste visé et mettre en avant les compétences pertinentes. 
  Retourne uniquement le contenu de la lettre en format Markdown.`;
  
  try {
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: coverLetterPrompt },
        { role: 'user', content: prompt }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });
    
    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Erreur OpenAI:', error);
    throw new Error('Erreur lors de la génération de la lettre de motivation');
  }
}

function buildCVPrompt(data: CVFormData, isPreview: boolean): string {
  const { personalInfo, experiences, education, skills, targetJob, languages, interests } = data;
  
  return `
Génère un CV professionnel pour ce candidat qui postule pour le poste suivant :

**POSTE VISÉ :**
- Poste : ${targetJob.position}
- Entreprise : ${targetJob.company || 'Non spécifiée'}
- Secteur : ${targetJob.industry}
- Description du poste : ${targetJob.jobDescription}
- Compétences requises : ${targetJob.requiredSkills.join(', ')}

**INFORMATIONS PERSONNELLES :**
- Nom : ${personalInfo.firstName} ${personalInfo.lastName}
- Email : ${personalInfo.email}
- Téléphone : ${personalInfo.phone}
- Adresse : ${personalInfo.address}, ${personalInfo.postalCode} ${personalInfo.city}
${personalInfo.linkedIn ? `- LinkedIn : ${personalInfo.linkedIn}` : ''}
${personalInfo.website ? `- Site web : ${personalInfo.website}` : ''}

**EXPÉRIENCES PROFESSIONNELLES :**
${experiences.map((exp) => `
- ${exp.position} chez ${exp.company} (${exp.location})
  Période : ${exp.startDate} - ${exp.current ? 'Présent' : exp.endDate}
  Description : ${exp.description}
  ${exp.achievements.length > 0 ? `Réalisations : ${exp.achievements.join(', ')}` : ''}
`).join('')}

**FORMATION :**
${education.map((edu) => `
- ${edu.degree} - ${edu.institution} (${edu.location})
  Période : ${edu.startDate} - ${edu.current ? 'En cours' : edu.endDate}
  ${edu.description ? `Description : ${edu.description}` : ''}
`).join('')}

**COMPÉTENCES :**
${skills.map((skill) => `- ${skill.name} (${skill.level}) - ${skill.category}`).join('\n')}

${languages.length > 0 ? `
**LANGUES :**
${languages.map((lang) => `- ${lang.name} : ${lang.level}`).join('\n')}
` : ''}

${interests ? `
**CENTRES D'INTÉRÊT :**
${interests}
` : ''}

Instructions spéciales :
- Optimise le CV pour le poste "${targetJob.position}" dans le secteur "${targetJob.industry}"
- Utilise les mots-clés pertinents de la description de poste
- Mets en avant les compétences et expériences les plus pertinentes
- Structure de manière professionnelle et moderne
- ${isPreview ? 'Version prévisualisation courte' : 'Version complète et détaillée'}
- Format Markdown avec titres clairs et structure logique
`;
}

function buildCoverLetterPrompt(data: CVFormData): string {
  const { personalInfo, targetJob, experiences, skills } = data;
  
  return `
Génère une lettre de motivation pour ce candidat :

**CANDIDAT :**
- Nom : ${personalInfo.firstName} ${personalInfo.lastName}
- Expériences clés : ${experiences.slice(0, 2).map(exp => `${exp.position} chez ${exp.company}`).join(', ')}
- Compétences principales : ${skills.slice(0, 5).map(skill => skill.name).join(', ')}

**POSTE VISÉ :**
- Poste : ${targetJob.position}
- Entreprise : ${targetJob.company || '[Nom de l\'entreprise]'}
- Secteur : ${targetJob.industry}
- Description : ${targetJob.jobDescription}

Instructions :
- Lettre formelle et professionnelle
- Maximum 3 paragraphes + introduction/conclusion
- Personnalisée pour le poste et l'entreprise
- Met en avant la motivation et l'adéquation profil/poste
- Ton confiant mais respectueux
- Format Markdown
`;
}