export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, phone, position, experience } = req.body;

    // Prompt optimisé pour CV premium
    const prompt = `Tu es un expert RH senior. Créé un CV professionnel et impactant pour :
    - Nom: ${firstName} ${lastName}
    - Email: ${email}
    - Téléphone: ${phone}
    - Poste visé: ${position}
    - Expérience: ${experience}
    
    Génère un CV HTML moderne et professionnel avec sections optimisées.`;

    // Version temporaire pour test
    const cvContent = `
      <div style="font-family: Arial; max-width: 800px; margin: 0 auto; padding: 20px;">
        <h1>${firstName} ${lastName}</h1>
        <p>Email: ${email} | Téléphone: ${phone}</p>
        <h2>Profil Professionnel</h2>
        <p>Candidat motivé pour le poste de ${position}</p>
        <h2>Expérience</h2>
        <p>${experience}</p>
      </div>
    `;

    res.status(200).json({ content: cvContent });
  } catch (error) {
    res.status(500).json({ error: 'Erreur de génération' });
  }
}
