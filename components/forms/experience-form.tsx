'use client';

import { useState } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Plus, X } from 'lucide-react';
import { CVFormData } from '@/lib/validations';

interface ExperienceFormProps {
  form: UseFormReturn<CVFormData>;
  index: number;
}

export function ExperienceForm({ form, index }: ExperienceFormProps) {
  const [achievementInput, setAchievementInput] = useState('');
  
  const watchedAchievements = form.watch(`experiences.${index}.achievements`) || [];

  const addAchievement = () => {
    if (achievementInput.trim()) {
      const currentAchievements = form.getValues(`experiences.${index}.achievements`) || [];
      form.setValue(`experiences.${index}.achievements`, [...currentAchievements, achievementInput.trim()]);
      setAchievementInput('');
    }
  };

  const removeAchievement = (achievementToRemove: string) => {
    const currentAchievements = form.getValues(`experiences.${index}.achievements`) || [];
    form.setValue(
      `experiences.${index}.achievements`, 
      currentAchievements.filter(achievement => achievement !== achievementToRemove)
    );
  };

  const handleAchievementKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addAchievement();
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`experiences.${index}.position`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poste *</FormLabel>
              <FormControl>
                <Input placeholder="Développeur Frontend" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`experiences.${index}.company`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entreprise *</FormLabel>
              <FormControl>
                <Input placeholder="TechCorp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`experiences.${index}.location`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lieu *</FormLabel>
              <FormControl>
                <Input placeholder="Paris, France" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`experiences.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de début *</FormLabel>
              <FormControl>
                <Input type="month" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex items-center space-x-2">
        <FormField
          control={form.control}
          name={`experiences.${index}.current`}
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Poste actuel</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>

      {!form.watch(`experiences.${index}.current`) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={`experiences.${index}.endDate`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de fin</FormLabel>
                <FormControl>
                  <Input type="month" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      <FormField
        control={form.control}
        name={`experiences.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description du poste *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Décrivez vos missions principales, responsabilités et le contexte de travail..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Réalisations */}
      <div className="space-y-3">
        <FormLabel>Réalisations / Résultats (optionnel)</FormLabel>
        <div className="flex gap-2">
          <Input
            placeholder="ex: Amélioration des performances de 40%"
            value={achievementInput}
            onChange={(e) => setAchievementInput(e.target.value)}
            onKeyPress={handleAchievementKeyPress}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={addAchievement}
            disabled={!achievementInput.trim()}
            size="sm"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {watchedAchievements.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
            {watchedAchievements.map((achievement, achievementIndex) => (
              <Badge
                key={achievementIndex}
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                {achievement}
                <button
                  type="button"
                  onClick={() => removeAchievement(achievement)}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        <p className="text-sm text-gray-500">
          💡 Ajoutez des résultats chiffrés pour valoriser votre impact
        </p>
      </div>
    </div>
  );
}