import { Badge } from '@/components/ui/badge';
import { Shield, Mail, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-blue-400">
              CV Express IA
            </h3>
            <p className="text-gray-400 leading-relaxed">
              La solution IA pour créer un CV professionnel optimisé 
              en 5 minutes et décrocher le job de vos rêves.
            </p>
          </div>

          {/* Trust */}
          <div>
            <h4 className="font-semibold mb-4">Sécurité & Confidentialité</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-green-400" />
                RGPD compliant
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4 text-blue-400" />
                Données supprimées après 24h
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-purple-400" />
                Support réactif
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div>Email: support@cv-express-ia.com</div>
              <div>Réponse sous 24h</div>
              <Badge variant="secondary" className="mt-4">
                🇫🇷 Service français
              </Badge>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div>
              © 2024 CV Express IA. Tous droits réservés.
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Mentions légales
              </a>
              <a href="#" className="hover:text-white transition-colors">
                CGV
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}