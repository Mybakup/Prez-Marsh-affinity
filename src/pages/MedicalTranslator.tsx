import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Languages, 
  Mic, 
  Volume2, 
  X,
  Globe2,
  MessageCircle,
  RefreshCw,
  Send,
  Copy,
  Check,
  History,
  Loader2
} from 'lucide-react';

const availableLanguages = [
  { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
  { code: 'en-US', name: 'English', flag: '🇬🇧' },
  { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
  { code: 'de-DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it-IT', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt-PT', name: 'Português', flag: '🇵🇹' },
  { code: 'ar-SA', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
  { code: 'ja-JP', name: '日本語', flag: '🇯🇵' },
  { code: 'ko-KR', name: '한국어', flag: '🇰🇷' }
];

// Common medical phrases for quick access
const quickPhrases = {
  'fr-FR': [
    "J'ai mal à la tête",
    "Je suis allergique à",
    "Où est l'hôpital le plus proche ?",
    "J'ai besoin d'un médecin"
  ],
  'en-US': [
    "I have a headache",
    "I'm allergic to",
    "Where is the nearest hospital?",
    "I need a doctor"
  ],
  'es-ES': [
    "Me duele la cabeza",
    "Soy alérgico a",
    "¿Dónde está el hospital más cercano?",
    "Necesito un médico"
  ]
};

interface Translation {
  text: string;
  translation: string;
  fromLang: string;
  toLang: string;
  timestamp: Date;
}

export default function MedicalTranslator() {
  const navigate = useNavigate();
  const [sourceLanguage, setSourceLanguage] = useState('fr-FR');
  const [targetLanguage, setTargetLanguage] = useState('en-US');
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState('');
  const [showLanguageSelector, setShowLanguageSelector] = useState<'source' | 'target' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<Translation[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [lastSpokenIndex, setLastSpokenIndex] = useState<number | null>(null);

  const handleStartListening = () => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      alert('La reconnaissance vocale n\'est pas supportée par votre navigateur');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = sourceLanguage;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setInputText(text);
      handleTranslate(text);
    };

    recognition.start();
  };

  const handleTranslate = async (text: string = inputText) => {
    if (!text.trim()) return;
    
    setIsProcessing(true);

    // Simulate API call with mock translation
    setTimeout(() => {
      const mockTranslations: Record<string, string> = {
        'fr-FR': {
          'en-US': 'This is a mock translation to English',
          'es-ES': 'Esta es una traducción simulada al español'
        },
        'en-US': {
          'fr-FR': 'Ceci est une traduction simulée en français',
          'es-ES': 'Esta es una traducción simulada al español'
        },
        'es-ES': {
          'fr-FR': 'Ceci est une traduction simulée en français',
          'en-US': 'This is a mock translation to English'
        }
      };

      const translatedText = mockTranslations[sourceLanguage]?.[targetLanguage] || text;
      
      setTranslation(translatedText);
      setHistory(prev => [{
        text,
        translation: translatedText,
        fromLang: sourceLanguage,
        toLang: targetLanguage,
        timestamp: new Date()
      }, ...prev]);
      
      setIsProcessing(false);
    }, 1000);
  };

  const speakText = (text: string, language: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const switchLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setInputText('');
    setTranslation('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-mybakup-blue" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-mybakup-blue">
              Traduction médicale
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2 rounded-full transition-colors ${
                showHistory ? 'bg-mybakup-coral/10 text-mybakup-coral' : 'hover:bg-gray-100'
              }`}
            >
              <History className="w-6 h-6" />
            </button>
            <div className="p-2 rounded-xl bg-[#FFE8E8]">
              <Languages className="w-6 h-6 text-mybakup-coral" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Language Selection */}
        <div className="bg-white rounded-xl p-4 flex items-center justify-between">
          <button
            onClick={() => setShowLanguageSelector('source')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl">
              {availableLanguages.find(l => l.code === sourceLanguage)?.flag}
            </span>
            <span className="font-medium text-mybakup-blue">
              {availableLanguages.find(l => l.code === sourceLanguage)?.name}
            </span>
          </button>

          <button
            onClick={switchLanguages}
            className="p-2 hover:bg-gray-100 rounded-full text-mybakup-coral"
          >
            <RefreshCw className="w-5 h-5" />
          </button>

          <button
            onClick={() => setShowLanguageSelector('target')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl">
              {availableLanguages.find(l => l.code === targetLanguage)?.flag}
            </span>
            <span className="font-medium text-mybakup-blue">
              {availableLanguages.find(l => l.code === targetLanguage)?.name}
            </span>
          </button>
        </div>

        {/* Quick Phrases */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-gray-500">Phrases rapides</h2>
          <div className="flex flex-wrap gap-2">
            {quickPhrases[sourceLanguage as keyof typeof quickPhrases]?.map((phrase, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputText(phrase);
                  handleTranslate(phrase);
                }}
                className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm hover:border-mybakup-coral transition-colors"
              >
                {phrase}
              </button>
            ))}
          </div>
        </div>

        {/* Translation Interface */}
        <div className="grid gap-4">
          {/* Input */}
          <div className="bg-white rounded-xl p-4 space-y-4">
            <div className="flex items-start gap-4">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Entrez votre texte ici..."
                className="flex-1 min-h-[100px] p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral resize-none"
              />
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => speakText(inputText, sourceLanguage)}
                  className="p-2 text-gray-400 hover:text-mybakup-coral rounded-full hover:bg-gray-100"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
                <button
                  onClick={handleStartListening}
                  className={`p-2 rounded-full transition-colors ${
                    isListening
                      ? 'bg-mybakup-coral text-white'
                      : 'text-gray-400 hover:text-mybakup-coral hover:bg-gray-100'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => handleTranslate()}
                disabled={!inputText.trim() || isProcessing}
                className="flex items-center gap-2 px-4 py-2 bg-mybakup-coral text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
              >
                {isProcessing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Traduire</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output */}
          {translation && (
            <div className="bg-white rounded-xl p-4 space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-1 p-3 rounded-lg bg-gray-50">
                  <p className="text-mybakup-blue">{translation}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => speakText(translation, targetLanguage)}
                    className="p-2 text-gray-400 hover:text-mybakup-coral rounded-full hover:bg-gray-100"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => copyToClipboard(translation, -1)}
                    className="p-2 text-gray-400 hover:text-mybakup-coral rounded-full hover:bg-gray-100"
                  >
                    {copiedIndex === -1 ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* History */}
        {showHistory && history.length > 0 && (
          <section className="bg-white rounded-xl p-4 space-y-4">
            <h2 className="font-semibold text-mybakup-blue flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Historique des traductions
            </h2>
            <div className="space-y-4">
              {history.map((entry, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {availableLanguages.find(l => l.code === entry.fromLang)?.flag}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span className="text-2xl">
                        {availableLanguages.find(l => l.code === entry.toLang)?.flag}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {entry.timestamp.toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-mybakup-blue">{entry.text}</p>
                      <button
                        onClick={() => speakText(entry.text, entry.fromLang)}
                        className="p-2 text-gray-400 hover:text-mybakup-coral rounded-full hover:bg-gray-100"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-gray-600">{entry.translation}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => speakText(entry.translation, entry.toLang)}
                          className="p-2 text-gray-400 hover:text-mybakup-coral rounded-full hover:bg-gray-100"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => copyToClipboard(entry.translation, index)}
                          className="p-2 text-gray-400 hover:text-mybakup-coral rounded-full hover:bg-gray-100"
                        >
                          {copiedIndex === index ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Language Selection Modal */}
      {showLanguageSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-mybakup-blue">
                  Choisir la langue
                </h2>
                <button
                  onClick={() => setShowLanguageSelector(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                {availableLanguages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      if (showLanguageSelector === 'source') {
                        setSourceLanguage(language.code);
                      } else {
                        setTargetLanguage(language.code);
                      }
                      setShowLanguageSelector(null);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl">{language.flag}</span>
                    <span className="font-medium text-gray-700">{language.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}