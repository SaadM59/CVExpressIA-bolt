import { z } from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  address: z.string().min(5, 'Adresse trop courte'),
  city: z.string().min(2, 'Ville requise'),
  postalCode: z.string().regex(/^\d{5}$/, 'Code postal invalide (5 chiffres)'),
  linkedIn: z.string().url('URL LinkedIn invalide').optional().or(z.literal('')),
  website: z.string().url('URL du site web invalide').optional().or(z.literal(''))
});

export const experienceSchema = z.object({
  id: z.string(),
  position: z.string().min(2, 'Poste requis'),
  company: z.string().min(2, 'Entreprise requise'),
  location: z.string().min(2, 'Lieu requis'),
  startDate: z.string().min(1, 'Date de début requise'),
  endDate: z.string().optional(),
  current: z.boolean(),
  description: z.string().min(10, 'Description trop courte (minimum 10 caractères)'),
  achievements: z.array(z.string()).default([])
});

export const educationSchema = z.object({
  id: z.string(),
  degree: z.string().min(2, 'Diplôme requis'),
  institution: z.string().min(2, 'Établissement requis'),
  location: z.string().min(2, 'Lieu requis'),
  startDate: z.string().min(1, 'Date de début requise'),
  endDate: z.string().optional(),
  current: z.boolean(),
  description: z.string().optional()
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nom de la compétence requis'),
  level: z.enum(['Débutant', 'Intermédiaire', 'Avancé', 'Expert']),
  category: z.enum(['Technique', 'Logiciel', 'Langue', 'Soft Skills'])
});

export const targetJobSchema = z.object({
  position: z.string().min(2, 'Poste cible requis'),
  company: z.string().optional(),
  jobDescription: z.string().min(20, 'Description du poste requise (minimum 20 caractères)'),
  requiredSkills: z.array(z.string()).min(1, 'Au moins une compétence requise'),
  industry: z.string().min(2, 'Secteur d\'activité requis')
});

export const languageSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nom de la langue requis'),
  level: z.string().min(1, 'Niveau requis')
});

export const cvFormSchema = z.object({
  personalInfo: personalInfoSchema,
  experiences: z.array(experienceSchema).min(1, 'Au moins une expérience requise'),
  education: z.array(educationSchema).min(1, 'Au moins une formation requise'),
  skills: z.array(skillSchema).min(3, 'Au moins 3 compétences requises'),
  targetJob: targetJobSchema,
  languages: z.array(languageSchema).default([]),
  interests: z.string().optional(),
  references: z.string().optional()
});

export type CVFormData = z.infer<typeof cvFormSchema>;
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type TargetJob = z.infer<typeof targetJobSchema>;
export type Language = z.infer<typeof languageSchema>;