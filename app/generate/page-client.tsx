'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react';
// import { CVFormWizard } from '@/components/forms/cv-form-wizard';
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

  const handlePreview = async (data: CVFormData) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération du CV');
      }

      const result = await response.json();
      setPreviewData(result.content);
      setFormData(data);
      setShowPreview(true);
    } catch (error) {
      console.error('Erreur:', error);
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
          <CVFormWizard 
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

      {/* Preview Modal */}
    {/*  {showPreview && formData && (
        <PreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          previewContent={previewData}
          formData={formData}
        />
      )} */}
    </div>
  );
}
