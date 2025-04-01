import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mic, 
  X, 
  Globe2, 
  Star, 
  MapPin, 
  Volume2,
  Languages,
  Calendar,
  Clock,
  CreditCard
} from 'lucide-react';
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

const availableLanguages = [
  { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
  { code: 'en-US', name: 'English', flag: '🇬🇧' },
  { code: 'es-ES', name: 'Español', flag: '🇪🇸' }
];

export default function VoiceCommandV2() {
  const navigate = useNavigate();
  const [currentExample, setCurrentExample] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [searchResults, setSearchResults] = useState<Doctor[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('fr-FR');
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [voiceResponse, setVoiceResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const processSearchResults = (text: string) => {
    setIsProcessing(true);
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

    // Générer et lire la réponse vocale
    if (results.length > 0) {
      const response = generateVoiceResponse(results, selectedLanguage);
      setVoiceResponse(response);
      speakResponse(response, selectedLanguage);
    }
    
    setIsProcessing(false);
  };
  
  const { startListening, stopListening, isSupported } = useVoiceRecognition({
    onResult: (text) => {
      setTranscription(text);
      setIsListening(false);
      processSearchResults(text);
    },
    onInterimResult: (text) => {
      setTranscription(text);
    },
    onEnd: () => {
      setIsListening(false);
    }
  });

  const languageExamples = examples[selectedLanguage as keyof typeof examples] || examples['fr-FR'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % languageExamples.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [languageExamples]);

  const generateVoiceResponse = (results: Doctor[], language: string) => {
    const doctor = results[0];
    const responses = {
      'fr-FR': `J'ai trouvé ${results.length} praticien${results.length > 1 ? 's' : ''}. ${doctor.name}, ${doctor.specialty}, situé${doctor.distance}. La consultation coûte ${doctor.consultationPrice}€.`,
      'en-US': `I found ${results.length} practitioner${results.length > 1 ? 's' : ''}. ${doctor.name}, ${doctor.specialty}, located ${doctor.distance}. Consultation fee is ${doctor.consultationPrice}€.`,
      'es-ES': `He encontrado ${results.length} médico${results.length > 1 ? 's' : ''}. ${doctor.name}, ${doctor.specialty}, ubicado a ${doctor.distance}. La consulta cuesta ${doctor.consultationPrice}€.`
    };
    return responses[language as keyof typeof responses] || responses['fr-FR'];
  };

  const speakResponse = (text: string, language: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
  };

  const handleStartListening = () => {
    setTranscription('');
    setSearchResults([]);
    setVoiceResponse('');
    setIsListening(true);
    startListening();
  };

  const handleStopListening = () => {
    stopListening();
    setIsListening(false);
  };

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
            Assistant Vocal
          </h1>
          <button
            onClick={() => setShowLanguageSelector(!showLanguageSelector)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Languages className="w-6 h-6 text-mybakup-blue" />
          </button>
        </div>

        {showLanguageSelector && (
          <div className="absolute top-16 right-4 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
            <div className="p-2">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLanguage(lang.code);
                    setShowLanguageSelector(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-medium text-gray-700">{lang.name}</span>
                  {selectedLanguage === lang.code && (
                    <span className="ml-auto text-mybakup-coral">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto">
          <div className="max-w-md mx-auto p-4 space-y-8">
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Globe2 className="w-4 h-4" />
                <span>Langue : {availableLanguages.find(l => l.code === selectedLanguage)?.name}</span>
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
                onClick={isListening ? handleStopListening : handleStartListening}
                disabled={!isSupported}
                className={`p-8 rounded-full transition-all shadow-lg transform hover:scale-105 ${
                  isListening
                    ? 'bg-mybakup-coral text-white animate-pulse'
                    : 'bg-mybakup-blue text-white'
                }`}
              >
                <Mic className="w-8 h-8" />
              </button>
            </div>

            {isListening && (
              <div className="flex items-center justify-center gap-2 text-gray-600 animate-pulse">
                <Volume2 className="w-5 h-5" />
                <span>Je vous écoute...</span>
              </div>
            )}

            {isProcessing && (
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-mybakup-coral border-t-transparent" />
                <span>Traitement en cours...</span>
              </div>
            )}

            {transcription && (
              <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-2">Votre demande :</p>
                <p className="text-mybakup-blue font-medium">{transcription}</p>
              </div>
            )}

            {voiceResponse && (
              <div className="p-4 bg-mybakup-coral/10 rounded-xl">
                <p className="text-sm text-mybakup-coral mb-2">Réponse vocale :</p>
                <p className="text-mybakup-blue">{voiceResponse}</p>
              </div>
            )}
          </div>

          {/* Résultats de recherche */}
          {searchResults.length > 0 && (
            <div className="px-4 pb-4">
              <h2 className="text-lg font-semibold text-mybakup-blue mb-4">
                {searchResults.length} praticien{searchResults.length > 1 ? 's' : ''} trouvé{searchResults.length > 1 ? 's' : ''}
              </h2>
              <div className="space-y-4">
                {searchResults.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-mybakup-coral transition-all"
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <img
                          src={doctor.imageUrl}
                          alt={doctor.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-mybakup-blue">{doctor.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-mybakup-coral fill-current" />
                              <span className="text-sm text-gray-600">{doctor.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                              <MapPin className="w-3 h-3" />
                              {doctor.distance}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                              <Calendar className="w-3 h-3" />
                              {doctor.availability[0]}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              {doctor.openingHours[0].hours}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                              <CreditCard className="w-3 h-3" />
                              {doctor.consultationPrice}€
                            </span>
                          </div>
                          <div className="mt-2">
                            <p className="text-xs text-gray-500">
                              Langues : {doctor.languages.join(', ')}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button 
                          onClick={() => navigate('/appointment', { state: { doctor } })}
                          className="px-4 py-2 bg-mybakup-coral text-white text-sm rounded-lg hover:bg-opacity-90 transition-colors"
                        >
                          Prendre rendez-vous
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