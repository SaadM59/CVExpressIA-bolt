export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    
    return NextResponse.json({ 
      success: true,
      hasKey: !!apiKey,
      keyStart: apiKey ? apiKey.substring(0, 7) + '...' : 'MANQUANTE',
      allEnvKeys: Object.keys(process.env).filter(key => key.includes('OPENAI'))
    });
  } catch (error) {
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 });
  }
}
