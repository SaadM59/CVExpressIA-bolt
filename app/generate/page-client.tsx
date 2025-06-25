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
      // Appel vers l'API OpenAI GPT-4
      const response = await fetch('/api/generate-cv', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          position: data.position,
          experience: data.experience
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la génération du CV');
      }

      const result = await response.json();
      
      if (!result.content) {
        throw new Error('Contenu du CV non généré');
      }

      setPreviewData(result.content);
      setFormData(data);
      setShowPreview(true);
      
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
      
      // Message d'erreur plus informatif pour l'utilisateur
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Une erreur inattendue s\'est produite';
      
      alert(`Erreur: ${errorMessage}. Veuillez réessayer.`);
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
            Remplissez le formulaire ci-dessous et notre IA GPT-4 générera un CV professionnel 
            personnalisé et optimisé pour le poste que vous visez.
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
              CV optimisé par GPT-4 et experts RH
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              Génération IA en 15 secondes
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && formData && (
        <PreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          previewContent={previewData}
          formData={formData}
        />
      )}
    </div>
  );
}
