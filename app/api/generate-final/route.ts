import { NextRequest, NextResponse } from 'next/server';
import { generateCV, generateCoverLetter } from '@/lib/openai';
import { generatePDF } from '@/lib/pdf';
import { uploadToBlobStorage } from '@/lib/blob-storage';
import { sendCVByEmail } from '@/lib/sendgrid';
import { cvFormSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formData, email, sessionId } = body;
    
    // Validation des données
    const validatedData = cvFormSchema.parse(formData);
    
    // Génération du CV et de la lettre de motivation
    const [cvContent, coverLetter] = await Promise.all([
      generateCV(validatedData),
      generateCoverLetter(validatedData)
    ]);
    
    // Génération des PDFs
    const [cvPdf, coverLetterPdf] = await Promise.all([
      generatePDF(cvContent, 'cv'),
      generatePDF(coverLetter, 'cover-letter')
    ]);
    
    // Upload vers Vercel Blob avec expiration 24h
    const [cvUrl, coverLetterUrl] = await Promise.all([
      uploadToBlobStorage(cvPdf, `cv-${sessionId}.pdf`),
      uploadToBlobStorage(coverLetterPdf, `lettre-motivation-${sessionId}.pdf`)
    ]);
    
    // Envoi par email
    await sendCVByEmail({
      email,
      cvUrl,
      coverLetterUrl,
      candidateName: `${validatedData.personalInfo.firstName} ${validatedData.personalInfo.lastName}`
    });
    
    return NextResponse.json({
      success: true,
      cvUrl,
      coverLetterUrl,
      message: 'CV et lettre de motivation générés avec succès'
    });
    
  } catch (error) {
    console.error('Erreur lors de la génération finale:', error);
    
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la génération des documents' },
      { status: 500 }
    );
  }
}