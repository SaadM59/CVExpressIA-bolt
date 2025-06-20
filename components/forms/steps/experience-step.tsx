'use client';

import { useState } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import { CVFormData } from '@/lib/validations';
import { ExperienceForm } from '../experience-form';

interface ExperienceStepProps {
  form: UseFormReturn<CVFormData>;
}

export function ExperienceStep({ form }: ExperienceStepProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'experiences'
  });

  const addExperience = () => {
    append({
      id: crypto.randomUUID(),
      position: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Expériences professionnelles</h3>
          <Badge variant="secondary">{fields.length}</Badge>
        </div>
        <Button type="button" onClick={addExperience} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Ajouter une expérience
        </Button>
      </div>

      {fields.length === 0 && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-8 text-center">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Aucune expérience ajoutée
            </h4>
            <p className="text-gray-600 mb-4">
              Ajoutez vos expériences professionnelles pour créer un CV complet
            </p>
            <Button type="button" onClick={addExperience}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter ma première expérience
            </Button>
          </CardContent>
        </Card>
      )}

      {fields.map((field, index) => (
        <Card key={field.id} className="relative">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">
              Expérience {index + 1}
            </CardTitle>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ExperienceForm form={form} index={index} />
          </CardContent>
        </Card>
      ))}

      {fields.length > 0 && (
        <div className="text-center pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={addExperience}
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une autre expérience
          </Button>
        </div>
      )}
    </div>
  );
}