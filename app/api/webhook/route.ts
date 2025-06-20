import { NextRequest, NextResponse } from 'next/server';
import { stripe, constructWebhookEvent } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get('stripe-signature') as string;
  
  let event;
  
  try {
    event = constructWebhookEvent(body, signature);
  } catch (error) {
    console.error('Erreur de signature webhook:', error);
    return NextResponse.json({ error: 'Signature invalide' }, { status: 400 });
  }
  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    try {
      // Déclencher la génération du CV final
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/generate-final`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData: JSON.parse(session.metadata?.formData || '{}'),
          email: session.customer_email,
          sessionId: session.id
        })
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la génération du CV');
      }
      
      console.log(`CV généré avec succès pour la session ${session.id}`);
      
    } catch (error) {
      console.error('Erreur lors du traitement du webhook:', error);
      // Ne pas retourner d'erreur pour éviter que Stripe reessaie indéfiniment
    }
  }
  
  return NextResponse.json({ received: true });
}