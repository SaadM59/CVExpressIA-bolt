'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, CreditCard, Loader, Lock, Shield, Clock, Zap } from 'lucide-react';
import { CVFormData } from '@/lib/validations';
import { createCheckoutSession } from '@/lib/stripe';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  previewContent: string;
  formData: CVFormData;
}

export function PreviewModal({ isOpen, onClose, previewContent, formData }: PreviewModalProps) {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.personalInfo.email,
          formData: formData
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la session de paiement');
      }

      const { url } = await response.json();
      window.location.href = url;
      
    } catch (error) {
      console.error('Erreur paiement:', error);
      alert('Erreur lors du paiement. Veuillez réessayer.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Eye className="w-5 h-5 text-blue-600" />
              Prévisualisation de votre CV
            </DialogTitle>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              Version floutée
            </Badge>
          </div>
        </DialogHeader>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          {/* Prévisualisation */}
          <div className="lg:col-span-2 flex flex-col min-h-0">
            <Card className="flex-1 flex flex-col min-h-0">
              <CardContent className="flex-1 p-0 min-h-0">
                <ScrollArea className="h-full p-6">
                  <div className="prose prose-sm max-w-none">
                    <div 
                      className="cv-preview"
                      dangerouslySetInnerHTML={{ __html: previewContent }}
                    />
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Panel de paiement */}
          <div className="lg:col-span-1 flex flex-col">
            <Card className="flex-1">
              <CardContent className="p-6 space-y-6">
                {/* Prix */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">9,99€</div>
                  <div className="text-sm text-gray-500">Paiement unique</div>
                </div>

                {/* Ce que vous obtenez */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Ce que vous obtenez :</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      CV professionnel complet
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Lettre de motivation personnalisée
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Optimisation ATS automatique
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Téléchargement PDF immédiat
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Envoi par email sécurisé
                    </li>
                  </ul>
                </div>

                {/* Garanties */}
                <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 text-sm">Garanties :</h4>
                  <div className="space-y-2 text-xs text-blue-800">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3" />
                      <span>RGPD compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>Données supprimées sous 24h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3 h-3" />
                      <span>Génération en moins de 30s</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-3 h-3" />
                      <span>Paiement sécurisé Stripe</span>
                    </div>
                  </div>
                </div>

                {/* Bouton de paiement */}
                <Button
                  onClick={handlePayment}
                  disabled={isProcessingPayment}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
                  size="lg"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Redirection...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Payer et télécharger
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Satisfait ou remboursé sous 30 jours
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
