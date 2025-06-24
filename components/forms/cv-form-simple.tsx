'use client';

import { useState } from 'react';

interface CVFormSimpleProps {
  onPreview: (data: any) => Promise<void>;
  isGenerating: boolean;
}

export function CVFormSimple({ onPreview, isGenerating }: CVFormSimpleProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    company: '',
    experience: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onPreview(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Prénom"
          value={formData.firstName}
          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          className="p-3 border rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Nom"
          value={formData.lastName}
          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          className="p-3 border rounded-lg"
          required
        />
      </div>
      
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        className="w-full p-3 border rounded-lg"
        required
      />
      
      <input
        type="tel"
        placeholder="Téléphone"
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
        className="w-full p-3 border rounded-lg"
        required
      />
      
      <input
        type="text"
        placeholder="Poste visé"
        value={formData.position}
        onChange={(e) => setFormData({...formData, position: e.target.value})}
        className="w-full p-3 border rounded-lg"
        required
      />
      
      <textarea
        placeholder="Décrivez votre expérience professionnelle"
        value={formData.experience}
        onChange={(e) => setFormData({...formData, experience: e.target.value})}
        className="w-full p-3 border rounded-lg h-32"
        required
      />
      
      <button
        type="submit"
        disabled={isGenerating}
        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isGenerating ? 'Génération...' : 'Générer mon CV'}
      </button>
    </form>
  );
}
