import { describe, it, expect } from 'vitest';
import { cvFormSchema } from '@/lib/validations';

describe('CV Form Validation', () => {
  const validFormData = {
    personalInfo: {
      firstName: 'Marie',
      lastName: 'Dupont',
      email: 'marie.dupont@email.com',
      phone: '0612345678',
      address: '123 rue de la République',
      city: 'Lyon',
      postalCode: '69001',
      linkedIn: 'https://linkedin.com/in/marie-dupont',
      website: ''
    },
    experiences: [{
      id: 'exp1',
      position: 'Développeuse Frontend',
      company: 'TechCorp',
      location: 'Lyon',
      startDate: '2023-01',
      endDate: '',
      current: true,
      description: 'Développement d\'applications React avec TypeScript.',
      achievements: ['Amélioration des performances de 40%']
    }],
    education: [{
      id: 'edu1',
      degree: 'Master Informatique',
      institution: 'Université Lyon 1',
      location: 'Lyon',
      startDate: '2021-09',
      endDate: '2023-06',
      current: false,
      description: 'Spécialisation développement web'
    }],
    skills: [
      { id: 'skill1', name: 'React', level: 'Avancé', category: 'Technique' },
      { id: 'skill2', name: 'TypeScript', level: 'Intermédiaire', category: 'Technique' },
      { id: 'skill3', name: 'Communication', level: 'Avancé', category: 'Soft Skills' }
    ],
    targetJob: {
      position: 'Développeuse Full-Stack',
      company: 'Startup Tech',
      jobDescription: 'Nous recherchons un développeur full-stack passionné.',
      requiredSkills: ['React', 'Node.js'],
      industry: 'Technologie'
    },
    languages: [
      { id: 'lang1', name: 'Français', level: 'Natif' }
    ],
    interests: 'Veille technologique',
    references: 'Disponibles sur demande'
  };

  it('should validate correct form data', () => {
    const result = cvFormSchema.safeParse(validFormData);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email', () => {
    const invalidData = {
      ...validFormData,
      personalInfo: {
        ...validFormData.personalInfo,
        email: 'invalid-email'
      }
    };
    
    const result = cvFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject invalid postal code', () => {
    const invalidData = {
      ...validFormData,
      personalInfo: {
        ...validFormData.personalInfo,
        postalCode: '123'
      }
    };
    
    const result = cvFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should require at least one experience', () => {
    const invalidData = {
      ...validFormData,
      experiences: []
    };
    
    const result = cvFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should require at least 3 skills', () => {
    const invalidData = {
      ...validFormData,
      skills: [
        { id: 'skill1', name: 'React', level: 'Avancé', category: 'Technique' }
      ]
    };
    
    const result = cvFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});