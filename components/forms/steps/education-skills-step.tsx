'use client';

import { useState } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Form } from '@/components/ui/form';
import { Plus, Trash2, GraduationCap, Brain, Globe, Heart } from 'lucide-react';
import { CVFormData } from '@/lib/validations';

interface EducationSkillsStepProps {
  form: UseFormReturn<CVFormData>;
}

export function EducationSkillsStep({ form }: EducationSkillsStepProps) {
  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control: form.control,
    name: 'education'
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control: form.control,
    name: 'skills'
  });

  const { fields: languageFields, append: appendLanguage, remove: removeLanguage } = useFieldArray({
    control: form.control,
    name: 'languages'
  });

  const addEducation = () => {
    appendEducation({
      id: crypto.randomUUID(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
  };

  const addSkill = () => {
    appendSkill({
      id: crypto.randomUUID(),
      name: '',
      level: 'Intermédiaire',
      category: 'Technique'
    });
  };

  const addLanguage = () => {
    appendLanguage({
      id: crypto.randomUUID(),
      name: '',
      level: ''
    });
  };

  return (
    <Form {...form}>
      <div className="space-y-8">
        {/* Formation */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Formation</h3>
              <Badge variant="secondary">{educationFields.length}</Badge>
            </div>
            <Button type="button" onClick={addEducation} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Ajouter une formation
            </Button>
          </div>

          {educationFields.length === 0 && (
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-8 text-center">
                <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Aucune formation ajoutée
                </h4>
                <p className="text-gray-600 mb-4">
                  Ajoutez vos diplômes et formations pour valoriser votre parcours
                </p>
                <Button type="button" onClick={addEducation}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter ma première formation
                </Button>
              </CardContent>
            </Card>
          )}

          {educationFields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Formation {index + 1}</CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`education.${index}.degree`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diplôme *</FormLabel>
                        <FormControl>
                          <Input placeholder="Master Informatique" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`education.${index}.institution`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Établissement *</FormLabel>
                        <FormControl>
                          <Input placeholder="Université Lyon 1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`education.${index}.location`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lieu *</FormLabel>
                        <FormControl>
                          <Input placeholder="Lyon, France" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`education.${index}.startDate`}
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
                    name={`education.${index}.current`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Formation en cours</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {!form.watch(`education.${index}.current`) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`education.${index}.endDate`}
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
                  name={`education.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (optionnel)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Spécialisation, mention, projets remarquables..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Compétences */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold">Compétences</h3>
              <Badge variant="secondary">{skillFields.length}</Badge>
            </div>
            <Button type="button" onClick={addSkill} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Ajouter une compétence
            </Button>
          </div>

          {skillFields.length === 0 && (
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-8 text-center">
                <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Aucune compétence ajoutée
                </h4>
                <p className="text-gray-600 mb-4">
                  Listez vos compétences techniques et soft skills
                </p>
                <Button type="button" onClick={addSkill}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter ma première compétence
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillFields.map((field, index) => (
              <Card key={field.id} className="relative">
                <CardContent className="p-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(index)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>

                  <div className="space-y-3 pr-8">
                    <FormField
                      control={form.control}
                      name={`skills.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Compétence *</FormLabel>
                          <FormControl>
                            <Input placeholder="React, Leadership, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <FormField
                        control={form.control}
                        name={`skills.${index}.level`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Niveau</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Débutant">Débutant</SelectItem>
                                <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                                <SelectItem value="Avancé">Avancé</SelectItem>
                                <SelectItem value="Expert">Expert</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`skills.${index}.category`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Catégorie</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Technique">Technique</SelectItem>
                                <SelectItem value="Logiciel">Logiciel</SelectItem>
                                <SelectItem value="Langue">Langue</SelectItem>
                                <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Langues */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold">Langues (optionnel)</h3>
              <Badge variant="secondary">{languageFields.length}</Badge>
            </div>
            <Button type="button" onClick={addLanguage} variant="outline" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Ajouter une langue
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {languageFields.map((field, index) => (
              <Card key={field.id} className="relative">
                <CardContent className="p-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLanguage(index)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>

                  <div className="space-y-3 pr-8">
                    <FormField
                      control={form.control}
                      name={`languages.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Langue</FormLabel>
                          <FormControl>
                            <Input placeholder="Anglais, Espagnol..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`languages.${index}.level`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Niveau</FormLabel>
                          <FormControl>
                            <Input placeholder="Natif, Courant, Intermédiaire..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Centres d'intérêt */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-600" />
            <h3 className="text-lg font-semibold">Centres d'intérêt (optionnel)</h3>
          </div>

          <FormField
            control={form.control}
            name="interests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Décrivez vos centres d'intérêt</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Veille technologique, sport, musique, voyages..."
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Form>
  );
}