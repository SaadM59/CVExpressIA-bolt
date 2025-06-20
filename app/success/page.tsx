'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Mail, Loader, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface GenerationStatus {
  status: 'generating' | 'completed' | 'error';
  downloadUrl?: string;
  message?: string;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<GenerationStatus>({ status: 'generating' });

  useEffect(() => {
    if (!sessionId) return;

    // Poll pour vérifier le statut de génération
    const pollStatus = async () => {
      try {
        const response = await fetch(`/api/status?session_id=${sessionId}`);
        const data = await response.json();
        
        if (data.status === 'completed' && data.downloadUrl) {
          setStatus({
            status: 'completed',
            downloadUrl: data.downloadUrl
          });
        } else if (data.status === 'error') {
          setStatus({
            status: 'error',
            message: data.message || 'Une erreur est survenue'
          });
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du statut:', error);
      }
    };

    // Poll toutes les 2 secondes pendant max 2 minutes
    const interval = setInterval(pollStatus, 2000);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (status.status === 'generating') {
        setStatus({
          status: 'error',
          message: 'La génération prend plus de temps que prévu. Vérifiez votre email.'
        });
      }
    }, 120000);

    pollStatus(); // Premier appel immédiat

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [sessionId, status.status]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-xl border-0 rounded-2xl bg-white">
        <CardContent className="p-8 text-center">
          {status.status === 'generating' && (
            <>
              <div className="mb-6">
                <Loader className="w-16 h-16 text-blue-500 mx-auto animate-spin" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Génération en cours...
              </h1>
              <p className="text-gray-600 mb-6">
                Notre IA travaille sur votre CV personnalisé. 
                Cela ne prendra que quelques secondes.
              </p>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-700 text-sm">
                  <Mail className="w-4 h-4" />
                  Vous recevrez aussi le lien par email
                </div>
              </div>
            </>
          )}

          {status.status === 'completed' && (
            <>
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Votre CV est prêt ! 🎉
              </h1>
              <p className="text-gray-600 mb-6">
                Votre CV et lettre de motivation optimisés par IA ont été générés avec succès.
              </p>
              
              {status.downloadUrl && (
                <Button 
                  asChild
                  size="lg" 
                  className="w-full mb-4 bg-blue-600 hover:bg-blue-700"
                >
                  <a href={status.downloadUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger mon CV
                  </a>
                </Button>
              )}

              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-green-700 text-sm">
                  <Mail className="w-4 h-4" />
                  Le lien de téléchargement a aussi été envoyé par email
                </div>
              </div>

              <Button variant="outline" asChild className="w-full">
                <Link href="/">
                  Retour à l'accueil
                </Link>
              </Button>
            </>
          )}

          {status.status === 'error' && (
            <>
              <div className="mb-6">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Oups, quelque chose s'est mal passé
              </h1>
              <p className="text-gray-600 mb-6">
                {status.message || 'Une erreur est survenue lors de la génération.'}
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-blue-700 text-sm">
                  <Mail className="w-4 h-4" />
                  Vérifiez votre email, le CV pourrait s'y trouver
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/generate">
                    Réessayer
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/">
                    Retour à l'accueil
                  </Link>
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}