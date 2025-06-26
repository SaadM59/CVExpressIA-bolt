import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    console.log('API appelée'); // Debug
    
    const body = await request.json();
    console.log('Body reçu:', body); // Debug
    
    const { firstName, lastName, email, phone, position, experience } = body;
    
    // Test simple sans OpenAI d'abord
    const testCV = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <header style="text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #333; font-size: 2.5em;">${firstName} ${lastName}</h1>
          <p style="color: #666; font-size: 1.1em;">📧 ${email} | 📱 ${phone}</p>
        </header>
        
        <section style="margin-bottom: 30px;">
          <h2 style="color: #007bff; border-bottom: 1px solid #007bff; padding-bottom: 8px;">🎯 Profil Professionnel</h2>
          <p style="color: #555; background: #f8f9fa; padding: 20px; border-radius: 8px;">
            Professionnel expérimenté recherchant un poste de <strong>${position}</strong>. 
            Expertise technique et passion pour l'excellence.
          </p>
        </section>
        
        <section>
          <h2 style="color: #007bff; border-bottom: 1px solid #007bff; padding-bottom: 8px;">💼 Expérience</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745;">
            <p style="color: #555; margin: 0;">${experience}</p>
          </div>
        </section>
        
        <p style="text-align: center; margin-top: 30px; color: #6c757d; font-style: italic;">
          ✅ API FONCTIONNE - Test réussi !
        </p>
      </div>
    `;

    console.log('CV généré, envoi de la réponse'); // Debug
    
    return NextResponse.json({ 
      content: testCV,
      success: true 
    });
    
  } catch (error) {
    console.error('Erreur dans l\'API:', error); // Debug
    
    return NextResponse.json({ 
      error: 'Erreur serveur: ' + error.message 
    }, { status: 500 });
  }
}

// Export GET pour test direct de l'API
export async function GET() {
  return NextResponse.json({ 
    message: 'API generate-cv accessible',
    methods: ['POST'] 
  });
}
