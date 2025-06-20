import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not defined');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@cv-express-ia.com';
const FROM_NAME = process.env.SENDGRID_FROM_NAME || 'CV Express IA';

interface SendCVEmailParams {
  email: string;
  cvUrl: string;
  coverLetterUrl: string;
  candidateName: string;
}

export async function sendCVByEmail({
  email,
  cvUrl,
  coverLetterUrl,
  candidateName
}: SendCVEmailParams): Promise<void> {
  try {
    const msg = {
      to: email,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME
      },
      subject: 'Votre CV et lettre de motivation sont prêts ! 🎉',
      html: generateEmailTemplate({
        candidateName,
        cvUrl,
        coverLetterUrl
      }),
      text: `
Bonjour ${candidateName},

Votre CV et lettre de motivation optimisés par IA sont prêts !

Téléchargez vos documents :
- CV : ${cvUrl}
- Lettre de motivation : ${coverLetterUrl}

Ces liens expirent dans 24h pour protéger vos données (RGPD).

Bonne chance pour votre recherche d'emploi !

L'équipe CV Express IA
      `
    };

    await sgMail.send(msg);
    console.log(`Email envoyé avec succès à ${email}`);
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw new Error('Erreur lors de l\'envoi de l\'email');
  }
}

function generateEmailTemplate({
  candidateName,
  cvUrl,
  coverLetterUrl
}: {
  candidateName: string;
  cvUrl: string;
  coverLetterUrl: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vos documents sont prêts</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
  
  <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #2563eb; margin: 0; font-size: 28px;">CV Express IA</h1>
      <p style="color: #6b7280; margin: 10px 0 0 0;">Vos documents sont prêts ! 🎉</p>
    </div>

    <!-- Main Content -->
    <div style="margin-bottom: 40px;">
      <h2 style="color: #1f2937; font-size: 20px; margin-bottom: 20px;">
        Bonjour ${candidateName},
      </h2>
      
      <p style="margin-bottom: 20px; color: #4b5563;">
        Excellente nouvelle ! Votre CV et lettre de motivation optimisés par notre IA sont maintenant prêts.
      </p>
      
      <p style="margin-bottom: 30px; color: #4b5563;">
        Nos experts RH ont analysé votre profil et créé des documents professionnels personnalisés pour maximiser vos chances de décrocher le poste que vous visez.
      </p>
    </div>

    <!-- Download Buttons -->
    <div style="margin-bottom: 40px;">
      <h3 style="color: #1f2937; font-size: 18px; margin-bottom: 20px;">
        📁 Téléchargez vos documents :
      </h3>
      
      <div style="margin-bottom: 15px;">
        <a href="${cvUrl}" 
           style="display: inline-block; background-color: #2563eb; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin-right: 10px; margin-bottom: 10px;">
          📄 Télécharger mon CV
        </a>
      </div>
      
      <div>
        <a href="${coverLetterUrl}" 
           style="display: inline-block; background-color: #059669; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600;">
          ✉️ Télécharger ma lettre de motivation
        </a>
      </div>
    </div>

    <!-- RGPD Notice -->
    <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
      <h4 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">
        🔒 Protection de vos données (RGPD)
      </h4>
      <p style="color: #92400e; margin: 0; font-size: 14px;">
        Vos liens de téléchargement expirent automatiquement dans <strong>24 heures</strong> pour protéger vos données personnelles. Aucune information n'est conservée au-delà de cette période.
      </p>
    </div>

    <!-- Tips -->
    <div style="background-color: #eff6ff; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
      <h4 style="color: #1e40af; margin: 0 0 15px 0; font-size: 16px;">
        💡 Conseils pour maximiser vos chances :
      </h4>
      <ul style="color: #1e40af; margin: 0; padding-left: 20px;">
        <li>Personnalisez votre lettre pour chaque candidature</li>
        <li>Adaptez votre CV aux mots-clés de l'offre</li>
        <li>Relisez attentivement avant d'envoyer</li>
        <li>Préparez votre entretien en vous basant sur ces documents</li>
      </ul>
    </div>

    <!-- Footer -->
    <div style="text-align: center; border-top: 1px solid #e5e7eb; padding-top: 30px; color: #6b7280;">
      <p style="margin: 0 0 10px 0;">
        Bonne chance pour votre recherche d'emploi ! 🚀
      </p>
      <p style="margin: 0; font-size: 14px;">
        L'équipe <strong>CV Express IA</strong>
      </p>
    </div>
    
  </div>
  
</body>
</html>
  `;
}

export async function sendErrorNotification(email: string, error: string): Promise<void> {
  try {
    const msg = {
      to: email,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME
      },
      subject: 'Problème lors de la génération de votre CV',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #dc2626;">Oups, un problème est survenu</h2>
          <p>Nous rencontrons actuellement un problème technique lors de la génération de votre CV.</p>
          <p>Notre équipe technique a été notifiée et travaille sur une solution.</p>
          <p>Nous vous recontacterons dès que possible avec vos documents.</p>
          <p>Merci pour votre patience.</p>
          <p><strong>L'équipe CV Express IA</strong></p>
        </div>
      `
    };

    await sgMail.send(msg);
    
  } catch (emailError) {
    console.error('Erreur lors de l\'envoi de la notification d\'erreur:', emailError);
  }
}