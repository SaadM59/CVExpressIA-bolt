import { NextRequest, NextResponse } from 'next/server';
import { cvFormSchema } from '@/lib/validations';
import { generateCVPreview } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation des données
    const validatedData = cvFormSchema.parse(body);
    
    // Génération du CV avec OpenAI
    const cvContent = await generateCVPreview(validatedData);
    
    // Retourner le contenu flouté pour la prévisualisation
    const blurredContent = blurContent(cvContent);
    
    return NextResponse.json({
      success: true,
      content: blurredContent,
      message: 'Prévisualisation générée avec succès'
    });
    
  } catch (error) {
    console.error('Erreur lors de la génération de la prévisualisation:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Données invalides', details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

function blurContent(content: string): string {
  // Flouter ~50% du contenu pour la prévisualisation
  const lines = content.split('\n');
  const totalLines = lines.length;
  const linesToBlur = Math.floor(totalLines * 0.5);
  
  // Indices aléatoires des lignes à flouter
  const indicesToBlur = new Set<number>();
  while (indicesToBlur.size < linesToBlur) {
    indicesToBlur.add(Math.floor(Math.random() * totalLines));
  }
  
  return lines.map((line, index) => {
    if (indicesToBlur.has(index) && line.trim().length > 0) {
      // Remplacer par des caractères flous mais gardant la longueur
      return line.replace(/[a-zA-Z0-9]/g, '█');
    }
    return line;
  }).join('\n');
}