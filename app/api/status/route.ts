import { NextRequest, NextResponse } from 'next/server';
import { retrieveSession } from '@/lib/stripe';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID manquant' },
        { status: 400 }
      );
    }
    
    // Récupérer les infos de la session Stripe
    const session = await retrieveSession(sessionId);
    
    if (session.payment_status !== 'paid') {
      return NextResponse.json({
        status: 'error',
        message: 'Paiement non confirmé'
      });
    }
    
    // Vérifiez si les fichiers sont disponibles dans le metadata
    // Cette logique dépendra de votre implémentation de stockage
    const downloadUrl = session.metadata?.downloadUrl;
    
    if (downloadUrl) {
      return NextResponse.json({
        status: 'completed',
        downloadUrl
      });
    }
    
    return NextResponse.json({
      status: 'generating'
    });
    
  } catch (error) {
    console.error('Erreur lors de la vérification du statut:', error);
    return NextResponse.json(
      { status: 'error', message: 'Erreur lors de la vérification' },
      { status: 500 }
    );
  }
}