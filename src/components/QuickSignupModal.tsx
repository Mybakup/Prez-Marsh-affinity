import React, { useState } from 'react';
import { X, Apple, Chrome, Mail, ArrowRight, Loader2 } from 'lucide-react';

interface QuickSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'initial' | 'email-form';

export default function QuickSignupModal({ isOpen, onClose }: QuickSignupModalProps) {
  const [step, setStep] = useState<Step>('initial');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: ''
  });

  if (!isOpen) return null;

  const handleSocialSignup = async (provider: 'apple' | 'google') => {
    setLoading(true);
    // Simulate social auth
    setTimeout(() => {
      onClose();
      setLoading(false);
    }, 1500);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate email registration
    setTimeout(() => {
      onClose();
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-[#EDF5FF] w-full max-w-md rounded-3xl relative overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFE8E8] rounded-full transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#E8F4FF] rounded-full transform -translate-x-1/2 translate-y-1/2" />

        {/* Content */}
        <div className="relative p-6">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src="https://i.imgur.com/jxMQcJi.png" 
              alt="MyBakup" 
              className="h-8"
            />
          </div>

          {step === 'initial' ? (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-mybakup-blue">
                  Créez votre compte
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Rejoignez MyBakup pour accéder à tous nos services
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleSocialSignup('apple')}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl hover:bg-black/90 transition-colors"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Apple className="w-5 h-5" />
                      <span>Continuer avec Apple</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleSocialSignup('google')}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Chrome className="w-5 h-5" />
                      <span>Continuer avec Google</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setStep('email-form')}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>Continuer avec Email</span>
                </button>
              </div>

              <p className="text-xs text-center text-gray-500">
                En continuant, vous acceptez nos{' '}
                <a href="#" className="text-mybakup-coral hover:underline">
                  Conditions d'utilisation
                </a>{' '}
                et notre{' '}
                <a href="#" className="text-mybakup-coral hover:underline">
                  Politique de confidentialité
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-mybakup-blue">
                  Vos informations
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Remplissez ces informations pour continuer
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Âge
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="120"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-mybakup-coral text-white rounded-xl hover:bg-opacity-90 transition-colors"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Créer mon compte</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('initial')}
                className="w-full text-sm text-gray-600 hover:text-gray-900"
              >
                Retour
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}