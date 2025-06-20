import puppeteer from 'puppeteer';
import { marked } from 'marked';

export async function generatePDF(markdownContent: string, type: 'cv' | 'cover-letter'): Promise<Buffer> {
  try {
    // Convertir Markdown en HTML
    const htmlContent = marked(markdownContent);
    
    // Template HTML avec styles
    const fullHtml = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${type === 'cv' ? 'CV' : 'Lettre de motivation'}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
          background: white;
        }
        h1 {
          color: #2563eb;
          border-bottom: 3px solid #2563eb;
          padding-bottom: 10px;
          margin-bottom: 30px;
          font-size: 28px;
        }
        h2 {
          color: #1e40af;
          margin-top: 30px;
          margin-bottom: 15px;
          font-size: 20px;
          border-left: 4px solid #3b82f6;
          padding-left: 15px;
        }
        h3 {
          color: #374151;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        ul {
          padding-left: 25px;
        }
        li {
          margin-bottom: 8px;
        }
        strong {
          color: #1f2937;
        }
        p {
          margin-bottom: 15px;
          text-align: justify;
        }
        .contact-info {
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
          border-left: 4px solid #3b82f6;
        }
        .contact-info p {
          margin: 5px 0;
        }
        @media print {
          body { padding: 20px; }
          h1 { page-break-after: avoid; }
          h2 { page-break-after: avoid; }
        }
      </style>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
    `;
    
    // Générer le PDF avec Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      }
    });
    
    await browser.close();
    
    return pdfBuffer;
    
  } catch (error) {
    console.error('Erreur lors de la génération PDF:', error);
    throw new Error('Erreur lors de la génération du PDF');
  }
}

// Fallback si Puppeteer ne fonctionne pas en production
export async function generateSimplePDF(content: string, type: string): Promise<Buffer> {
  // Implementation simple avec html-pdf ou jsPDF comme fallback
  // Pour le MVP, on peut retourner un buffer HTML simple
  const htmlBuffer = Buffer.from(`
    <html>
      <head><title>${type}</title></head>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <pre>${content}</pre>
      </body>
    </html>
  `);
  
  return htmlBuffer;
}