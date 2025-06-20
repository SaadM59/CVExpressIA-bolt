import { NextRequest, NextResponse } from 'next/server';
import { purgeBlobStorage } from '@/lib/blob-storage';

export async function GET(request: NextRequest) {
  try {
    // Vérifier que c'est bien un appel de cron Vercel
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    
    // Purger les fichiers de plus de 24h
    const purgedCount = await purgeBlobStorage();
    
    console.log(`Purge RGPD: ${purgedCount} fichiers supprimés`);
    
    return NextResponse.json({
      success: true,
      purgedCount,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Erreur lors de la purge:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la purge' },
      { status: 500 }
    );
  }
}