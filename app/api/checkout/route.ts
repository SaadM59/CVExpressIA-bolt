import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
import { cvFormSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, formData } = body;
    
    // Validation des données
    const validatedData = cvFormSchema.parse(formData);
    
    // Créer une session Stripe Checkout
    const session = await createCheckoutSession(email, {
      formData: JSON.stringify(validatedData),
      candidateName: `${validatedData.personalInfo.firstName} ${validatedData.personalInfo.lastName}`
    });
    
    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id
    });
    
  } catch (error) {
    console.error('Erreur lors de la création de la session Checkout:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Données de formulaire invalides' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    );
  }
}