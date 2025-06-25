export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, phone, position, experience } = req.body;

    const cvContent = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <h1>${firstName} ${lastName}</h1>
        <p>📧 ${email} | 📱 ${phone}</p>
        <h2>Poste: ${position}</h2>
        <p>${experience}</p>
      </div>
    `;

    res.status(200).json({ content: cvContent });
  } catch (error) {
    res.status(500).json({ error: 'Erreur de génération' });
  }
}
