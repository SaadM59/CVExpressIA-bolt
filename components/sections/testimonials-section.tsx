'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: '1',
    name: 'Marie Dubois',
    role: 'Développeuse Web',
    company: 'Tech Startup',
    content: "Incroyable ! J'ai obtenu 3 entretiens la semaine suivante. Le CV généré était parfaitement adapté aux offres que je visais.",
    rating: 5,
    avatar: 'MD'
  },
  {
    id: '2',
    name: 'Thomas Martin',
    role: 'Commercial',
    company: 'Grande Distribution',
    content: "En reconversion professionnelle, j'avais du mal à valoriser mon parcours. L'IA a su mettre en avant mes compétences transférables.",
    rating: 5,
    avatar: 'TM'
  },
  {
    id: '3',
    name: 'Sarah Chen',
    role: 'Designer UX',
    company: 'Agence Digitale',
    content: "Le design du CV est moderne et professionnel. Mes recruteurs m'ont complimenté sur la présentation. Mission accomplie !",
    rating: 5,
    avatar: 'SC'
  },
  {
    id: '4',
    name: 'Pierre Lefebvre',
    role: 'Jeune Diplômé',
    company: 'École de Commerce',
    content: "Parfait pour un premier CV ! L'IA a su valoriser mes stages et projets étudiants. J'ai décroché mon premier CDI.",
    rating: 5,
    avatar: 'PL'
  },
  {
    id: '5',
    name: 'Amélie Rousseau',
    role: 'Chef de Projet',
    company: 'Consulting',
    content: "Service rapide et efficace. En 5 minutes j'avais un CV professionnel adapté au poste. Je recommande vivement !",
    rating: 5,
    avatar: 'AR'
  },
  {
    id: '6',
    name: 'Lucas Bernard',
    role: 'Data Analyst',
    company: 'Fintech',
    content: "L'optimisation ATS a fait la différence. Mon CV passe maintenant les filtres automatiques et arrive chez les RH.",
    rating: 5,
    avatar: 'LB'
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Ils ont décroché leur job grâce à nous
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Découvrez les témoignages de candidats qui ont transformé leur recherche d'emploi.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <div key={i} className="w-4 h-4 text-yellow-400">⭐</div>
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="" alt={testimonial.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role} • {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}