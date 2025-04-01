import React, { useState } from 'react';
import { X, Star, ThumbsUp, ThumbsDown } from 'lucide-react';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorName: string;
  onSubmit: (ratings: {
    responseTime: number;
    careQuality: number;
    reception: number;
    languageLevel: number;
    recommended: boolean;
  }) => void;
}

export default function RatingModal({ isOpen, onClose, doctorName, onSubmit }: RatingModalProps) {
  const [ratings, setRatings] = useState({
    responseTime: 0,
    careQuality: 0,
    reception: 0,
    languageLevel: 0
  });
  const [recommended, setRecommended] = useState<boolean | null>(null);

  if (!isOpen) return null;

  const handleStarClick = (category: keyof typeof ratings, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [category]: rating
    }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...ratings,
      recommended: recommended === true
    });
    onClose();
  };

  const renderStars = (category: keyof typeof ratings) => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleStarClick(category, star)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                star <= ratings[category]
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-mybakup-blue">
              Noter {doctorName}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rapidité de prise en charge
              </label>
              {renderStars('responseTime')}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualité des soins
              </label>
              {renderStars('careQuality')}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Accueil
              </label>
              {renderStars('reception')}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveau de langue
              </label>
              {renderStars('languageLevel')}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Recommanderiez-vous ce praticien ?
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setRecommended(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    recommended === true
                      ? 'border-green-500 bg-green-50 text-green-600'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span>Oui</span>
                </button>
                <button
                  onClick={() => setRecommended(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    recommended === false
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <ThumbsDown className="w-5 h-5" />
                  <span>Non</span>
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!Object.values(ratings).every(r => r > 0) || recommended === null}
              className="w-full py-3 bg-mybakup-coral text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Envoyer mon avis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}