export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    
    return res.status(200).json({ 
      success: true,
      hasKey: !!apiKey,
      keyStart: apiKey ? apiKey.substring(0, 7) + '...' : 'MANQUANTE',
      message: 'API accessible avec Pages Router'
    });
  } catch (error) {
    return res.status(500).json({ 
      error: error.message 
    });
  }
}
