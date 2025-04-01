import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Globe2, Phone, Clock, MapPin, CreditCard, 
  GraduationCap, Stethoscope, Shield, X,
  ArrowLeft, Languages, Check
} from 'lucide-react';
import type { Doctor } from '../types';

interface DoctorProfileProps {
  doctor: Doctor;
  onClose: () => void;
}

type Language = 'fr' | 'en' | 'es' | 'de';

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

const languageOptions: LanguageOption[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

export default function DoctorProfile({ doctor, onClose }: DoctorProfileProps) {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [translationLanguage, setTranslationLanguage] = useState<Language>('fr');
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [activeSection, setActiveSection] = useState<'education' | 'experience' | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!doctor.officePictures) return;
    
    const swipeThreshold = 50;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        setCurrentImageIndex((prev) => 
          prev === doctor.officePictures!.length - 1 ? 0 : prev + 1
        );
      } else {
        setCurrentImageIndex((prev) => 
          prev === 0 ? doctor.officePictures!.length - 1 : prev - 1
        );
      }
    }
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${doctor.phone}`;
  };

  const handleBookingClick = () => {
    navigate('/appointment', { state: { doctor } });
  };

  const handleLanguageSelect = (language: Language) => {
    setTranslationLanguage(language);
    setShowLanguagePopup(false);
    setActiveSection(null);
  };

  const TranslateButton = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      className="flex items-center gap-1 text-sm text-mybakup-coral hover:text-mybakup-coral/80 transition-colors"
    >
      <Languages className="w-4 h-4" />
      <span>Translate</span>
    </button>
  );

  return (
    <div className="fixed inset-0 bg-[#EDF5FF] z-50 overflow-y-auto overflow-x-hidden">
      {/* Language Selection Popup */}
      {showLanguagePopup && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-mybakup-blue">
                  Choisir la langue
                </h3>
                <button
                  onClick={() => {
                    setShowLanguagePopup(false);
                    setActiveSection(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="font-medium text-gray-700">{lang.name}</span>
                    </div>
                    {translationLanguage === lang.code && (
                      <Check className="w-5 h-5 text-mybakup-coral" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header with background shapes */}
      <div className="relative h-48">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFE8E8] rounded-full transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#E8F4FF] rounded-full transform -translate-x-1/2 translate-y-1/2" />
        
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-mybakup-blue flex items-center"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span>Retour</span>
        </button>
      </div>

      {/* Doctor info */}
      <div className="px-6 -mt-24 mb-6">
        <div className="flex flex-col items-center">
          <img
            src={doctor.imageUrl}
            alt={doctor.name}
            className="w-40 h-40 rounded-2xl border-4 border-white shadow-lg object-cover"
          />
          <h1 className="text-2xl font-bold mt-4 text-mybakup-blue">{doctor.name}</h1>
          <p className="text-gray-600">{doctor.specialty}</p>
          <div className="flex items-center mt-2">
            <MapPin className="w-4 h-4 text-gray-400 mr-1" />
            <span className="text-gray-600">{doctor.distance}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={handleBookingClick}
            className="w-full py-3 bg-[#47559E] text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors"
          >
            Demander un rendez-vous
          </button>
          <button
            onClick={handlePhoneClick}
            className="w-full py-3 border border-gray-200 rounded-xl font-medium text-mybakup-blue bg-white hover:bg-gray-50 transition-colors"
          >
            Appeler ce praticien
          </button>
        </div>
      </div>

      {/* Content sections */}
      <div className="px-6 space-y-6 pb-6">
        {/* Languages */}
        <section>
          <div className="flex items-center mb-4">
            <Globe2 className="w-5 h-5 text-mybakup-coral mr-2" />
            <h3 className="font-semibold text-mybakup-blue">Langues parlées</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {doctor.languages.map((lang) => (
              <span key={lang} className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">
                {lang}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Stethoscope className="w-5 h-5 text-mybakup-coral mr-2" />
              <h3 className="font-semibold text-mybakup-blue">Expérience</h3>
            </div>
            <TranslateButton onClick={() => {
              setActiveSection('experience');
              setShowLanguagePopup(true);
            }} />
          </div>
          <div className="bg-white rounded-xl p-4 space-y-2">
            {doctor.experience.map((exp, index) => (
              <div key={index} className="text-gray-600">
                {exp}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <GraduationCap className="w-5 h-5 text-mybakup-coral mr-2" />
              <h3 className="font-semibold text-mybakup-blue">Formation</h3>
            </div>
            <TranslateButton onClick={() => {
              setActiveSection('education');
              setShowLanguagePopup(true);
            }} />
          </div>
          <div className="bg-white rounded-xl p-4 space-y-2">
            {doctor.education.map((edu, index) => (
              <div key={index} className="text-gray-600">
                {edu}
              </div>
            ))}
          </div>
        </section>

        {/* Consultation Fees */}
        <section>
          <div className="flex items-center mb-4">
            <CreditCard className="w-5 h-5 text-mybakup-coral mr-2" />
            <h3 className="font-semibold text-mybakup-blue">Tarifs</h3>
          </div>
          <div className="bg-white rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Consultation</span>
              <span className="font-medium text-mybakup-blue">€{doctor.consultationPrice}</span>
            </div>
            {doctor.medicalActs.map((act) => (
              <div key={act.name} className="flex justify-between items-center">
                <span className="text-gray-600">{act.name}</span>
                <span className="font-medium text-mybakup-blue">€{act.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Payment Methods */}
        <section>
          <div className="flex items-center mb-4">
            <CreditCard className="w-5 h-5 text-mybakup-coral mr-2" />
            <h3 className="font-semibold text-mybakup-blue">Moyens de paiement</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {doctor.paymentMethods.map((method) => (
              <span key={method} className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">
                {method}
              </span>
            ))}
          </div>
        </section>

        {/* Insurance */}
        <section>
          <div className="flex items-center mb-4">
            <Shield className="w-5 h-5 text-mybakup-coral mr-2" />
            <h3 className="font-semibold text-mybakup-blue">Assurances acceptées</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {doctor.insurance.map((ins) => (
              <span key={ins} className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">
                {ins}
              </span>
            ))}
          </div>
        </section>

        {/* Office Pictures */}
        {doctor.officePictures && doctor.officePictures.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-mybakup-coral mr-2" />
                <h3 className="font-semibold text-mybakup-blue">Photos du cabinet</h3>
              </div>
              <div className="flex gap-1">
                {doctor.officePictures.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx === currentImageIndex ? 'bg-mybakup-coral' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div 
              className="relative bg-white rounded-xl overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={doctor.officePictures[currentImageIndex]}
                alt={`Cabinet de ${doctor.name}`}
                className="w-full h-48 object-cover"
              />
            </div>
          </section>
        )}

        {/* Opening Hours */}
        <section>
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 text-mybakup-coral mr-2" />
            <h3 className="font-semibold text-mybakup-blue">Horaires d'ouverture</h3>
          </div>
          <div className="bg-white rounded-xl p-4 space-y-2">
            {doctor.openingHours.map(({ day, hours }) => (
              <div key={day} className="flex justify-between">
                <span className="text-gray-600">{day}</span>
                <span className="font-medium text-mybakup-blue">{hours}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}