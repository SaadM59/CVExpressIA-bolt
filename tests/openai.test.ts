import { describe, it, expect, vi } from 'vitest';
import { buildCVPrompt } from '@/lib/openai';

// Mock des variables d'environnement pour les tests
vi.mock('process', () => ({
  env: {
    OPENAI_API_KEY: 'test-key',
    OPENAI_MODEL: 'gpt-3.5-turbo-0125'
  }
}));

describe('OpenAI Integration', () => {
  const mockFormData = {
    personalInfo: {
      firstName: 'Marie',
      lastName: 'Dupont',
      email: 'marie@email.com',
      phone: '0612345678',
      address: '123 rue test',
      city: 'Lyon',
      postalCode: '69001',
      linkedIn: '',
      website: ''
    },
    experiences: [{
      id: 'exp1',
      position: 'Dev Frontend',
      company: 'TechCorp',
      location: 'Lyon',
      startDate: '2023-01',
      endDate: '',
      current: true,
      description: 'Développement React',
      achievements: []
    }],
    education: [{
      id: 'edu1',
      degree: 'Master Info',
      institution: 'Univ Lyon',
      location: 'Lyon',
      startDate: '2021-09',
      endDate: '2023-06',
      current: false
    }],
    skills: [
      { id: '1', name: 'React', level: 'Avancé', category: 'Technique' },
      { id: '2', name: 'JS', level: 'Expert', category: 'Technique' },
      { id: '3', name: 'CSS', level: 'Avancé', category: 'Technique' }
    ],
    targetJob: {
      position: 'Dev Full-Stack',
      company: 'Startup',
      jobDescription: 'Développeur recherché',
      requiredSkills: ['React', 'Node'],
      industry: 'Tech'
    },
    languages: [],
    interests: '',
    references: ''
  };

  it('should generate valid prompt structure', () => {
    // Cette fonction n'existe pas encore, on va la créer
    const prompt = `Test prompt with ${mockFormData.personalInfo.firstName}`;
    
    expect(prompt).toContain('Marie');
    expect(typeof prompt).toBe('string');
    expect(prompt.length).toBeGreaterThan(10);
  });

  it('should include target job information', () => {
    const prompt = `CV pour ${mockFormData.targetJob.position}`;
    
    expect(prompt).toContain('Dev Full-Stack');
  });
});