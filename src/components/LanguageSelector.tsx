import React from 'react';
import { Globe2 } from 'lucide-react';

const languages = [
  { code: 'fr', name: 'Français', active: true },
  { code: 'en', name: 'English', active: false },
  { code: 'es', name: 'Español', active: false },
  { code: 'de', name: 'Deutsch', active: false }
];

export default function LanguageSelector() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-xl bg-[#E8F4FF]">
          <Globe2 className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-mybakup-blue">Langues préférées</h2>
          <p className="text-sm text-gray-500">Sélectionnez vos langues pour une meilleure expérience</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              lang.active
                ? 'bg-mybakup-coral text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
}