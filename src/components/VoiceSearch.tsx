import React, { useState } from 'react';
import { Mic, MicOff, Loader2, AlertCircle } from 'lucide-react';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';

interface VoiceSearchProps {
  onResult: (text: string) => void;
}

export default function VoiceSearch({ onResult }: VoiceSearchProps) {
  const [error, setError] = useState<string | null>(null);
  const { isListening, startListening, stopListening, isSupported } = useVoiceRecognition({
    onResult: (text) => {
      setError(null);
      onResult(text);
    },
    onError: (error) => {
      setError(error);
    },
  });

  if (!isSupported) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-700">
              Voice recognition is not supported in your browser. Please try using a modern browser like Chrome.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center justify-center">
        <button
          onClick={isListening ? stopListening : startListening}
          className={`p-6 rounded-full transition-all shadow-lg transform hover:scale-105 ${
            isListening
              ? 'bg-mybakup-coral hover:bg-opacity-90'
              : 'bg-mybakup-blue hover:bg-opacity-90'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isListening ? 'focus:ring-mybakup-coral' : 'focus:ring-mybakup-blue'
          }`}
          disabled={!!error}
        >
          {isListening ? (
            <MicOff className="w-8 h-8 text-white" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
        </button>

        {isListening && (
          <div className="absolute -bottom-16">
            <div className="flex items-center space-x-2">
              <Loader2 className="w-5 h-5 text-mybakup-coral animate-spin" />
              <span className="text-gray-600">Listening...</span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-700 text-center">{error}</p>
        </div>
      )}

      {!isListening && !error && (
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Tap the microphone and speak your request
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Example: "I need a dentist who speaks English"
          </p>
        </div>
      )}
    </div>
  );
}