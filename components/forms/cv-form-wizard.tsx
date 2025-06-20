'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Eye, Loader } from 'lucide-react';
import { cvFormSchema, CVFormData } from '@/lib/validations';
import { PersonalInfoStep } from './steps/personal-info-step';
import { ExperienceStep } from './steps/experience-step';
import { EducationSkillsStep } from './steps/education-skills-step';
import { TargetJobStep } from './steps/target-job-step';

interface CVFormWizardProps {
  onPreview: (data: CVFormData) => Promise<void>;
  isGenerating: boolean;
}

const steps = [
  { id: 1, title: 'Informations personnelles', description: 'Vos coordonnées et informations de contact' },
  { id: 2, title: 'Expériences professionnelles', description: 'Votre parcours professionnel' },
  { id: 3, title: 'Formation & Compétences', description: 'Vos diplômes et compétences' },
  { id: 4, title: 'Poste visé', description: 'Le poste pour lequel vous postulez' }
];

export function CVFormWizard({ onPreview, isGenerating }: CVFormWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  
  const form = useForm<CVFormData>({
    resolver: zodResolver(cvFormSchema),
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        linkedIn: '',
        website: ''
      },
      experiences: [],
      education: [],
      skills: [],
      targetJob: {
        position: '',
        company: '',
        jobDescription: '',
        requiredSkills: [],
        industry: ''
      },
      languages: [],
      interests: '',
      references: ''
    }
  });

  const nextStep = async () => {
    const isValid = await form.trigger();
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePreview = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      await onPreview(form.getValues());
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-sm">
            Étape {currentStep} sur {steps.length}
          </Badge>
          <div className="text-sm text-gray-500">
            {Math.round(progress)}% complété
          </div>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {steps[currentStep - 1].title}
          </h2>
          <p className="text-gray-600">
            {steps[currentStep - 1].description}
          </p>
        </div>
      </div>

      {/* Form Steps */}
      <div className="min-h-[500px]">
        {currentStep === 1 && (
          <PersonalInfoStep form={form} />
        )}
        {currentStep === 2 && (
          <ExperienceStep form={form} />
        )}
        {currentStep === 3 && (
          <EducationSkillsStep form={form} />
        )}
        {currentStep === 4 && (
          <TargetJobStep form={form} />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Précédent
        </Button>

        <div className="flex gap-3">
          {currentStep < steps.length ? (
            <Button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2"
            >
              Suivant
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handlePreview}
              disabled={isGenerating}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              {isGenerating ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Génération...
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Prévisualiser mon CV
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}