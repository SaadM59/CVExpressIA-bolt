'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react';
import { CVFormSimple } from '@/components/forms/cv-form-simple';
import { PreviewModal } from '@/components/forms/preview-modal';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Shield, Clock, Award } from 'lucide-react';
import Link from 'next/link';
import { CVFormData } from '@/types/cv';

export default function GeneratePage() {
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<string>('');
  const [formData, setFormData] = useState<CVFormData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePreview = async (data: any) => {
    setIsGenerating(true);
    
    try {
      // Simulation temporaire - génération côté client
      const cvContent = `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; border: 1px solid #ddd; border-radius: 10px; background: white;">
          <header style="text-align: center; border-bottom: 3px solid #007bff; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="color: #333; margin: 0; font-size: 2.8em; font-weight: bold;">${data.firstName} ${data.lastName}</h1>
            <p style="color: #666; margin: 15px 0; font-size: 1.2em;">
              📧 ${data.email} | 📱 ${data.phone}
            </p>
          </header>
          
          <section style="margin-bottom: 35px;">
            <h2 style="color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 8px; margin-bottom: 15px;">🎯 Profil Professionnel</h2>
            <p style="color: #555; font-size: 1.1em; line-height: 1.7; text-align: justify; background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 5px solid #007bff;">
              <strong>Professionnel expérimenté et motivé</strong>, recherchant un poste de <strong style="color: #007bff;">${data.position}</strong>. 
              Passionné par l'excellence et prêt à apporter une contribution significative à votre équipe grâce à mon expertise technique et mes compétences relationnelles.
            </p>
          </section>
          
          <section style="margin-bottom: 35px;">
            <h2 style="color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 8px; margin-bottom: 15px;">💼 Expérience Professionnelle</h2>
            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px; border-radius: 12px; border-left: 5px solid #28a745; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <p style="color: #555; margin: 0; font-size: 1.1em; line-height: 1.7; text-align: justify;">${data.experience}</p>
            </div>
          </section>
          
          <section style="margin-bottom: 30px;">
            <h2 style="color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 8px; margin-bottom: 15px;">🎓 Compétences Clés</h2>
            <div style="background: #fff3cd; padding: 20px; border-radius: 8px; border: 1px solid #ffc107;">
              <p style="color: #856404; margin: 0; font-weight: 500;">
                ✅ Leadership et travail d'équipe<br>
                ✅ Résolution de problèmes complexes<br>
                ✅ Adaptabilité et apprentissage continu<br>
                ✅ Communication efficace
              </p>
            </div>
          </section>
          
          <footer style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #dee2e6;">
            <p style="color: #6c757d; font-style: italic; font-size: 0.9em;">CV généré par CV Express IA - ${new Date().toLocaleDateString('fr-FR')}</p>
          </footer>
        </div>
      `;

      // Simulation d'une latence API réaliste
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPreviewData(cvContent);
      setFormData(data);
      setShowPreview(true);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la génération du CV');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="gap-1">
                <Shield className="w-3 h-3" />
                RGPD Compliant
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Clock className="w-3 h-3" />
                5 minutes
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Créez votre CV optimisé par IA
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Remplissez le formulaire ci-dessous et notre IA générera un CV professionnel 
            personnalisé pour le poste que vous visez.
          </p>
        </div>

        <Card className="shadow-xl border-0 rounded-2xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <CVFormSimple 
              onPreview={handlePreview}
              isGenerating={isGenerating}
            />
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              Vos données supprimées après 24h
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-500" />
              CV optimisé par des experts RH
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              Génération en moins de 30 secondes
            </div>
          </div>
        </div>
      </div>

{/* Preview Modal Simple */}
{showPreview && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">Aperçu de votre CV</h2>
        <button 
          onClick={() => setShowPreview(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      <div className="p-6">
        <div dangerouslySetInnerHTML={{ __html: previewData }}></div>
        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Payer et télécharger (9,99€)
          </button>
        </div>
      </div>
    </div>
  </div>
)}

