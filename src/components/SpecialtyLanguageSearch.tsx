import React, { useState, useRef, useEffect } from 'react';
import { Search, Languages, ChevronDown } from 'lucide-react';
import { specialties, Specialty } from '../data/specialties';

interface SpecialtyLanguageSearchProps {
  onSpecialtySelect: (specialty: Specialty) => void;
  onLanguageSelect: (language: string) => void;
}

const availableLanguages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' }
];

export default function SpecialtyLanguageSearch({ onSpecialtySelect, onLanguageSelect }: SpecialtyLanguageSearchProps) {
  const [activeField, setActiveField] = useState<'specialty' | 'language' | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveField(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const popularSpecialties = specialties.filter(s => s.popular);
  const otherSpecialties = specialties.filter(s => !s.popular);

  const handleSpecialtySelect = (specialty: Specialty) => {
    setSelectedSpecialty(specialty.name);
    onSpecialtySelect(specialty);
    setActiveField(null);
  };

  const handleLanguageSelect = (language: { code: string; name: string; flag: string }) => {
    setSelectedLanguage(language.name);
    onLanguageSelect(language.code);
    setActiveField(null);
  };

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <div className="flex divide-x divide-gray-200">
        {/* Specialty Field */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setActiveField(activeField === 'specialty' ? null : 'specialty')}
            className="w-full h-12 px-4 bg-white border border-gray-200 rounded-l-xl text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
          >
            <span className={selectedSpecialty ? 'text-mybakup-blue' : 'text-gray-400'}>
              {selectedSpecialty || 'Spécialité médicale'}
            </span>
            <div className="flex items-center">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                activeField === 'specialty' ? 'transform rotate-180' : ''
              }`} />
            </div>
          </button>

          {/* Specialty Dropdown */}
          {activeField === 'specialty' && (
            <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto">
              {popularSpecialties.length > 0 && (
                <>
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                    Les plus consultés
                  </div>
                  {popularSpecialties.map((specialty) => (
                    <button
                      key={specialty.id}
                      type="button"
                      onClick={() => handleSpecialtySelect(specialty)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-mybakup-blue"
                    >
                      {specialty.name}
                    </button>
                  ))}
                </>
              )}
              
              {otherSpecialties.length > 0 && (
                <>
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                    Toutes les spécialités
                  </div>
                  {otherSpecialties.map((specialty) => (
                    <button
                      key={specialty.id}
                      type="button"
                      onClick={() => handleSpecialtySelect(specialty)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-mybakup-blue"
                    >
                      {specialty.name}
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        {/* Language Field */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setActiveField(activeField === 'language' ? null : 'language')}
            className="w-full h-12 px-4 bg-white border border-gray-200 rounded-r-xl text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
          >
            <span className={selectedLanguage ? 'text-mybakup-blue' : 'text-gray-400'}>
              {selectedLanguage || 'Langue parlée'}
            </span>
            <div className="flex items-center">
              <Languages className="w-4 h-4 text-gray-400 mr-2" />
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                activeField === 'language' ? 'transform rotate-180' : ''
              }`} />
            </div>
          </button>

          {/* Language Dropdown */}
          {activeField === 'language' && (
            <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto">
              {availableLanguages.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => handleLanguageSelect(language)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                >
                  <span className="text-2xl">{language.flag}</span>
                  <span className="text-mybakup-blue">{language.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}