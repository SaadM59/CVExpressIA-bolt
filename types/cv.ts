export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  linkedIn?: string;
  website?: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  category: 'Technique' | 'Logiciel' | 'Langue' | 'Soft Skills';
}

export interface TargetJob {
  position: string;
  company?: string;
  jobDescription: string;
  requiredSkills: string[];
  industry: string;
}

export interface CVFormData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  targetJob: TargetJob;
  languages: Array<{
    id: string;
    name: string;
    level: string;
  }>;
  interests?: string;
  references?: string;
}

export interface GeneratedCV {
  content: string;
  coverLetter: string;
  fileName: string;
  downloadUrl?: string;
}

export interface PaymentSession {
  sessionId: string;
  clientSecret: string;
  url: string;
}

export interface TestimonialData {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}