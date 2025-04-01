import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, X, Globe2, Star } from 'lucide-react';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { mockDoctors } from '../data/mockDoctors';
import { specialties } from '../data/specialties';
import type { Doctor } from '../types';

const examples = {
  'fr-FR': [
    "Je cherche un généraliste qui parle français",
    "Un dentiste disponible demain",
    "Un pédiatre proche de moi qui parle anglais",
    "Un cardiologue dans le 8ème arrondissement"
  ],
  'en-US': [
    "I'm looking for a general practitioner who speaks English",
    "A dentist available tomorrow",
    "A pediatrician near me who speaks French",
    "A cardiologist in the 8th district"
  ],
  'es-ES': [
    "Busco un médico general que hable español",
    "Un dentista disponible mañana",
    "Un pediatra cerca de mí que hable francés",
    "Un cardiólogo en el distrito 8"
  ]
};

export default function VoiceCommand() {
  const navigate = useNavigate();
  const [currentExample, setCurrentExample] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [searchResults, setSearchResults] = useState<Doctor[]>([]);
  
  const { startListening, stopListening, isSupported, detectedLanguage } = useVoiceRecognition({
    onResult: (text) => {
      setTranscription(text);
      setIsListening(false);
      
      // Recherche intelligente basée sur la transcription
      const searchText = text.toLowerCase();
      
      // Recherche de la spécialité mentionnée
      const mentionedSpecialty = specialties.find(specialty => 
        searchText.includes(specialty.name.toLowerCase())
      );

      const results = mockDoctors.filter(doctor => {
        const matchesSpecialty = mentionedSpecialty ? 
          doctor.specialty.toLowerCase().includes(mentionedSpecialty.name.toLowerCase()) :
          true;

        const matchesLanguage = doctor.languages.some(lang => {
          const langLower = lang.toLowerCase();
          return searchText.includes(langLower) || 
                 (langLower === 'français' && searchText.includes('french')) ||
                 (langLower === 'english' && searchText.includes('anglais'));
        });
        
        return matchesSpecialty && (searchText.includes('langue') ? matchesLanguage : true);
      });
      
      setSearchResults(results);
    },
  });

  const languageExamples = examples[detectedLanguage as keyof typeof examples] || examples['fr-FR'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % languageExamples.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [languageExamples]);

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold text-mybakup-blue">
            Commande Vocale
          </h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        <div className="flex-1 overflow-auto">
          <div className="max-w-md mx-auto p-4 space-y-8">
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Globe2 className="w-4 h-4" />
                <span>Langue détectée : {detectedLanguage}</span>
              </div>
              <p className="text-gray-600">
                Appuyez sur le micro et dites par exemple :
              </p>
              <p className="text-lg font-medium text-mybakup-coral min-h-[2em]">
                "{languageExamples[currentExample]}"
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  if (isListening) {
                    stopListening();
                  } else {
                    startListening();
                    setTranscription('');
                    setSearchResults([]);
                  }
                  setIsListening(!isListening);
                }}
                disabled={!isSupported}
                className={`p-8 rounded-full transition-all shadow-lg transform hover:scale-105 ${
                  isListening
                    ? 'bg-mybakup-coral text-white'
                    : 'bg-mybakup-blue text-white'
                }`}
              >
                <Mic className="w-8 h-8" />
              </button>
            </div>

            {isListening && (
              <p className="text-gray-600 animate-pulse text-center">
                Je vous écoute...
              </p>
            )}

            {transcription && (
              <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-2">Votre commande :</p>
                <p className="text-mybakup-blue font-medium">{transcription}</p>
              </div>
            )}
          </div>

          {/* Résultats de recherche */}
          {searchResults.length > 0 && (
            <div className="px-4 pb-4">
              <h2 className="text-lg font-semibold text-mybakup-blue mb-4">
                {searchResults.length} praticien{searchResults.length > 1 ? 's' : ''} trouvé{searchResults.length > 1 ? 's' : ''}
              </h2>
              <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
                {searchResults.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="flex-shrink-0 w-72 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-mybakup-coral transition-all"
                  >
                    <div className="p-4">
                      <div className="flex items-center">
                        <img
                          src={doctor.imageUrl}
                          alt={doctor.name}
                          className="w-14 h-14 rounded-lg object-cover"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-mybakup-coral fill-current" />
                              <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
                            </div>
                            <span className="text-xs font-medium text-mybakup-coral">{doctor.distance}</span>
                          </div>
                          <h3 className="font-semibold text-mybakup-blue mt-1">{doctor.name}</h3>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Parle : {doctor.languages.join(', ')}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <span className="text-sm text-mybakup-coral font-medium">€{doctor.consultationPrice}</span>
                          <span className="text-xs text-gray-500 ml-1">/ visite</span>
                        </div>
                        <button 
                          onClick={() => navigate('/appointment', { state: { doctor } })}
                          className="px-4 py-2 bg-mybakup-coral text-white text-sm rounded-lg hover:bg-opacity-90 transition-colors"
                        >
                          Réserver
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}