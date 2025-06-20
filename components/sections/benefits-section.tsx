'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Zap, Target, Users, TrendingUp, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  {
    icon: Zap,
    title: 'IA Experte',
    description: 'Notre IA analyse les tendances RH et optimise votre CV selon les standards du marché français.',
    color: 'text-yellow-500'
  },
  {
    icon: Target,
    title: 'Personnalisé',
    description: 'CV adapté au poste visé avec les mots-clés pertinents pour passer les filtres ATS.',
    color: 'text-red-500'
  },
  {
    icon: Users,
    title: 'Expertise RH',
    description: 'Conçu par des experts RH français pour respecter les codes du recrutement local.',
    color: 'text-blue-500'
  },
  {
    icon: TrendingUp,
    title: 'Taux de réussite élevé',
    description: '87% de nos utilisateurs obtiennent plus d\'entretiens après avoir utilisé notre service.',
    color: 'text-green-500'
  },
  {
    icon: Clock,
    title: 'Rapide',
    description: 'Fini les heures passées à formater. Obtenez un CV professionnel en 5 minutes.',
    color: 'text-purple-500'
  },
  {
    icon: Shield,
    title: 'Confidentiel',
    description: 'Vos données sont supprimées automatiquement après 24h. Zéro stockage permanent.',
    color: 'text-indigo-500'
  }
];

export function BenefitsSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Pourquoi choisir CV Express IA ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            La solution complète pour créer un CV qui se démarque et maximise vos chances de décrocher le poste.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className={`inline-flex p-3 rounded-xl bg-gray-50 mb-6 ${benefit.color}`}>
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}