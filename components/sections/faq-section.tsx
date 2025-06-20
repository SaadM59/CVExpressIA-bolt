'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';

const faqs = [
  {
    id: '1',
    question: 'Comment fonctionne la génération de CV par IA ?',
    answer: 'Notre IA analyse vos informations personnelles, expériences et le poste visé pour créer un CV optimisé. Elle utilise les meilleures pratiques RH françaises et adapte le contenu aux mots-clés pertinents pour votre secteur.'
  },
  {
    id: '2',
    question: 'Mes données sont-elles sécurisées ?',
    answer: 'Absolument ! Nous respectons le RGPD. Vos données sont chiffrées pendant le traitement et automatiquement supprimées après 24h. Aucune information personnelle n\'est conservée de manière permanente.'
  },
  {
    id: '3',
    question: 'Que se passe-t-il après le paiement ?',
    answer: 'Après validation du paiement, notre IA génère immédiatement votre CV et lettre de motivation. Vous recevez les documents par email avec des liens de téléchargement valables 24h.'
  },
  {
    id: '4',
    question: 'Le CV généré est-il vraiment personnalisé ?',
    answer: 'Oui ! Chaque CV est unique et adapté à votre profil et au poste visé. L\'IA analyse la description de poste pour intégrer les mots-clés pertinents et optimiser vos chances de passer les filtres ATS.'
  },
  {
    id: '5',
    question: 'Puis-je modifier le CV après génération ?',
    answer: 'Vous recevez votre CV en format PDF prêt à l\'emploi, ainsi qu\'une version texte modifiable. Vous pouvez ensuite l\'adapter selon vos besoins spécifiques.'
  },
  {
    id: '6',
    question: 'Y a-t-il une garantie ?',
    answer: 'Oui ! Nous offrons une garantie satisfaction de 30 jours. Si le CV généré ne répond pas à vos attentes, nous vous remboursons intégralement.'
  },
  {
    id: '7',
    question: 'Combien de temps faut-il pour recevoir mon CV ?',
    answer: 'La génération prend moins de 30 secondes après validation du paiement. Vous recevez immédiatement vos documents par email.'
  },
  {
    id: '8',
    question: 'Le service fonctionne-t-il pour tous les secteurs ?',
    answer: 'Oui ! Notre IA est entraînée sur les standards RH de tous les secteurs en France : tech, finance, commerce, santé, éducation, etc. Elle adapte le CV selon votre domaine d\'activité.'
  }
];

export function FAQSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Questions fréquentes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Tout ce que vous devez savoir sur CV Express IA
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-white rounded-2xl shadow-sm border-0 px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600 transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}