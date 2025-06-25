import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, position, experience } = body;

    const cvContent = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6;">
        <header style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #333; margin: 0; font-size: 2.5em;">${firstName} ${lastName}</h1>
          <p style="color: #666; margin: 10px 0; font-size: 1.1em;">📧 ${email} | 📱 ${phone}</p>
        </header>
        
        <section style="margin-bottom: 30px;">
          <h2 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">🎯 Profil Professionnel</h2>
          <p style="color: #555; font-size: 1.1em;">
            Professionnel expérimenté recherchant un poste de <strong>${position}</strong>. 
            Prêt à apporter une contribution significative grâce à mon expertise.
          </p>
        </section>
        
        <section>
          <h2 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">💼 Expérience</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #007bff;">
            <p style="color: #555; margin: 0;">${experience}</p>
          </div>
        </section>
      </div>
    `;

    return NextResponse.json({ content: cvContent });
  } catch (error) {
    console.error('Erreur API:', error);
    return NextResponse.json({ error: 'Erreur de génération' }, { status: 500 });
  }
}
