import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  const [promoCode, setPromoCode] = useState('');

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const features = [
    'Prise de rendez-vous en ligne',
    'Coordonnées et localisations précises des praticiens',
    'Géolocalisation, filtre de langue',
    'Fiche praticien (horaires, coûts, qualification)'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-[#EDF5FF] w-full max-w-md rounded-3xl relative overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#FFE8E8] rounded-full transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#E8F4FF] rounded-full transform -translate-x-1/2 translate-y-1/2" />

        {/* Content */}
        <div className="relative p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo */}
          <div className="flex justify-center">
            <img 
              src="https://i.imgur.com/jxMQcJi.png" 
              alt="MyBakup" 
              className="h-6 sm:h-8"
            />
          </div>

          {/* Title */}
          <div className="text-center">
            <h2 className="text-lg sm:text-xl font-semibold text-mybakup-blue">
              Accédez à toutes les fonctionnalités
            </h2>
          </div>

          {/* Premium plan */}
          <div className="bg-white rounded-xl p-4 sm:p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-semibold text-mybakup-blue">Premium</h3>
              <div className="text-right">
                <span className="text-lg sm:text-xl font-bold text-mybakup-blue">15,90 €</span>
                <span className="text-sm text-gray-500">/ mois</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">La santé avant tout et partout</p>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Promo code */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600">
              Code promo
            </label>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Entrez votre code promo"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral text-sm"
            />
          </div>

          {/* Continue button */}
          <button className="w-full py-3 bg-mybakup-coral text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors text-sm sm:text-base">
            Commencer maintenant
          </button>

          {/* Terms */}
          <p className="text-xs text-center text-gray-500 px-4">
            En continuant, vous acceptez nos{' '}
            <a href="#" className="text-mybakup-coral hover:underline">conditions d'utilisation</a>
            {' '}et notre{' '}
            <a href="#" className="text-mybakup-coral hover:underline">politique de confidentialité</a>
          </p>
        </div>
      </div>
    </div>
  );
}