'use client';

import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Form } from '@/components/ui/form';
import { Target, Building, FileText, Lightbulb, Plus, X } from 'lucide-react';
import { CVFormData } from '@/lib/validations';

interface TargetJobStepProps {
  form: UseFormReturn<CVFormData>;
}

export function TargetJobStep({ form }: TargetJobStepProps) {
  const [skillInput, setSkillInput] = useState('');
  const watchedSkills = form.watch('targetJob.requiredSkills') || [];

  const addSkill = () => {
    if (skillInput.trim() && !watchedSkills.includes(skillInput.trim())) {
      const currentSkills = form.getValues('targetJob.requiredSkills') || [];
      form.setValue('targetJob.requiredSkills', [...currentSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const currentSkills = form.getValues('targetJob.requiredSkills') || [];
    form.setValue('targetJob.requiredSkills', currentSkills.filter(skill => skill !== skillToRemove));
  };

  const handleSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const industriesSuggestions = [
    'Technologie / IT',
    'Finance / Banque',
    'Marketing / Communication',
    'Santé',
    'Éducation',
    'Industrie',
    'Commerce / Retail',
    'Conseil',
    'Média / Culture',
    'Transport / Logistique',
    'Immobilier',
    'Énergie',
    'Autre'
  ];

  return (
    <Form {...form}>
      <div className="space-y-8">
        {/* Introduction */}
        <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-200">
          <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Dernière étape : définissez votre objectif
          </h3>
          <p className="text-gray-600">
            Ces informations permettront à notre IA d'optimiser votre CV pour le poste que vous visez.
          </p>
        </div>

        {/* Poste et entreprise */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="targetJob.position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    Poste visé *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="ex: Développeur Full-Stack" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetJob.company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-green-600" />
                    Entreprise cible (optionnel)
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="ex: Google, Startup Tech..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="targetJob.industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secteur d'activité *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="ex: Technologie, Finance, Marketing..."
                    list="industries"
                    {...field} 
                  />
                </FormControl>
                <datalist id="industries">
                  {industriesSuggestions.map((industry) => (
                    <option key={industry} value={industry} />
                  ))}
                </datalist>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description du poste */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="targetJob.jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" />
                  Description du poste *
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Copiez-collez la description de l'offre d'emploi ou décrivez le poste que vous visez. Plus c'est détaillé, mieux notre IA pourra optimiser votre CV avec les bons mots-clés."
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <div className="text-sm text-gray-500">
                  💡 Conseil : Une description détaillée permet une meilleure optimisation ATS
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Compétences requises */}
        <div className="space-y-4">
          <div className="space-y-2">
            <FormLabel className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-orange-600" />
              Compétences requises *
            </FormLabel>
            <p className="text-sm text-gray-600">
              Listez les compétences clés mentionnées dans l'offre d'emploi
            </p>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Tapez une compétence et appuyez sur Entrée"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={handleSkillKeyPress}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={addSkill}
              disabled={!skillInput.trim()}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Ajouter
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[60px] p-4 border-2 border-dashed border-gray-300 rounded-lg">
            {watchedSkills.length === 0 ? (
              <p className="text-gray-500 text-sm w-full text-center py-4">
                Aucune compétence ajoutée. Ajoutez au moins une compétence requise.
              </p>
            ) : (
              watchedSkills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))
            )}
          </div>

          {watchedSkills.length === 0 && (
            <p className="text-sm text-red-600">
              Au moins une compétence requise est nécessaire
            </p>
          )}
        </div>

        {/* Conseils */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Conseils pour optimiser votre CV
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Plus la description est précise, mieux l'IA adaptera votre CV</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Utilisez les mots-clés exacts de l'offre d'emploi</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Notre IA optimisera automatiquement pour les systèmes ATS</span>
            </li>
          </ul>
        </div>
      </div>
    </Form>
  );
}