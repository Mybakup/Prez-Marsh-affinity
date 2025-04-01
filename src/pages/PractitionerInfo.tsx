import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Globe, MapPin, Loader2, GraduationCap, Clock, Image, Languages } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

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

interface FormData {
  description: string;
  qualifications: Array<{
    title: string;
    year: string;
  }>;
  medicalActs: Array<{
    name: string;
    price: string;
  }>;
  openingHours: Array<{
    day: string;
    isOpen: boolean;
    morning: {
      start: string;
      end: string;
    };
    afternoon: {
      start: string;
      end: string;
    };
  }>;
  languages: string[];
  profilePhoto: File | null;
  officePhotos: File[];
}

export default function PractitionerInfo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    description: '',
    qualifications: [],
    medicalActs: [],
    openingHours: [
      { day: 'Lundi', isOpen: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
      { day: 'Mardi', isOpen: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
      { day: 'Mercredi', isOpen: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
      { day: 'Jeudi', isOpen: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
      { day: 'Vendredi', isOpen: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
      { day: 'Samedi', isOpen: false, morning: { start: '', end: '' }, afternoon: { start: '', end: '' } },
      { day: 'Dimanche', isOpen: false, morning: { start: '', end: '' }, afternoon: { start: '', end: '' } }
    ],
    languages: [],
    profilePhoto: null,
    officePhotos: []
  });

  const onProfilePhotoDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        profilePhoto: acceptedFiles[0]
      }));
    }
  }, []);

  const onOfficePhotosDrop = useCallback((acceptedFiles: File[]) => {
    setFormData(prev => ({
      ...prev,
      officePhotos: [...prev.officePhotos, ...acceptedFiles].slice(0, 5)
    }));
  }, []);

  const { getRootProps: getProfileRootProps, getInputProps: getProfileInputProps } = useDropzone({
    onDrop: onProfilePhotoDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const { getRootProps: getOfficeRootProps, getInputProps: getOfficeInputProps } = useDropzone({
    onDrop: onOfficePhotosDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 5
  });

  const removeOfficePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      officePhotos: prev.officePhotos.filter((_, i) => i !== index)
    }));
  };

  const toggleLanguage = (code: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(code)
        ? prev.languages.filter(lang => lang !== code)
        : [...prev.languages, code]
    }));
  };

  const addQualification = () => {
    setFormData(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, { title: '', year: '' }]
    }));
  };

  const removeQualification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index)
    }));
  };

  const updateQualification = (index: number, field: 'title' | 'year', value: string) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.map((qual, i) => 
        i === index ? { ...qual, [field]: value } : qual
      )
    }));
  };

  const addMedicalAct = () => {
    setFormData(prev => ({
      ...prev,
      medicalActs: [...prev.medicalActs, { name: '', price: '' }]
    }));
  };

  const removeMedicalAct = (index: number) => {
    setFormData(prev => ({
      ...prev,
      medicalActs: prev.medicalActs.filter((_, i) => i !== index)
    }));
  };

  const updateMedicalAct = (index: number, field: 'name' | 'price', value: string) => {
    setFormData(prev => ({
      ...prev,
      medicalActs: prev.medicalActs.map((act, i) => 
        i === index ? { ...act, [field]: value } : act
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/practitioner-preview');
    } catch (error) {
      console.error('Error saving information:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/practitioner-signup')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-mybakup-blue" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-mybakup-blue">
              Mes informations
            </h1>
          </div>
          <img 
            src="https://i.imgur.com/jxMQcJi.png" 
            alt="MyBakup" 
            className="h-8"
          />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo de profil */}
          <section className="bg-white rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-mybakup-blue">
              Photo de profil
            </h2>
            <div {...getProfileRootProps()} className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-mybakup-coral transition-colors">
              <input {...getProfileInputProps()} />
              {formData.profilePhoto ? (
                <div className="relative w-32 h-32 mx-auto">
                  <img
                    src={URL.createObjectURL(formData.profilePhoto)}
                    alt="Profile preview"
                    className="w-full h-full rounded-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormData(prev => ({ ...prev, profilePhoto: null }));
                    }}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <Image className="w-12 h-12 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Cliquez ou déposez votre photo de profil ici
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Photos du cabinet */}
          <section className="bg-white rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-mybakup-blue">
              Photos du cabinet
            </h2>
            <div {...getOfficeRootProps()} className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-mybakup-coral transition-colors">
              <input {...getOfficeInputProps()} />
              <Image className="w-12 h-12 mx-auto text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Cliquez ou déposez jusqu'à 5 photos de votre cabinet
              </p>
            </div>
            {formData.officePhotos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {formData.officePhotos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Cabinet ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeOfficePhoto(index)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Langues parlées */}
          <section className="bg-white rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-mybakup-blue" />
              <h2 className="text-lg font-semibold text-mybakup-blue">
                Langues parlées
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableLanguages.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => toggleLanguage(language.code)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-colors ${
                    formData.languages.includes(language.code)
                      ? 'border-mybakup-coral bg-mybakup-coral/5'
                      : 'border-gray-200 hover:border-mybakup-coral'
                  }`}
                >
                  <span className="text-2xl">{language.flag}</span>
                  <span className="font-medium text-gray-700">{language.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Description professionnelle */}
          <section className="bg-white rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-mybakup-blue">
              Description professionnelle
            </h2>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
              rows={4}
              placeholder="Décrivez votre pratique, votre approche et votre expérience..."
            />
          </section>

          {/* Qualifications */}
          <section className="bg-white rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-mybakup-blue" />
                <h2 className="text-lg font-semibold text-mybakup-blue">
                  Qualifications et diplômes
                </h2>
              </div>
              <button
                type="button"
                onClick={addQualification}
                className="flex items-center gap-2 text-mybakup-coral hover:text-mybakup-coral/80"
              >
                <Plus className="w-5 h-5" />
                <span>Ajouter</span>
              </button>
            </div>

            <div className="space-y-4">
              {formData.qualifications.map((qual, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    type="text"
                    value={qual.title}
                    onChange={(e) => updateQualification(index, 'title', e.target.value)}
                    placeholder="Titre du diplôme"
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                  />
                  <input
                    type="text"
                    value={qual.year}
                    onChange={(e) => updateQualification(index, 'year', e.target.value)}
                    placeholder="Année"
                    className="w-32 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                  />
                  <button
                    type="button"
                    onClick={() => removeQualification(index)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Actes médicaux */}
          <section className="bg-white rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-mybakup-blue">
                Actes médicaux et tarifs
              </h2>
              <button
                type="button"
                onClick={addMedicalAct}
                className="flex items-center gap-2 text-mybakup-coral hover:text-mybakup-coral/80"
              >
                <Plus className="w-5 h-5" />
                <span>Ajouter</span>
              </button>
            </div>

            <div className="space-y-4">
              {formData.medicalActs.map((act, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    type="text"
                    value={act.name}
                    onChange={(e) => updateMedicalAct(index, 'name', e.target.value)}
                    placeholder="Nom de l'acte"
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                  />
                  <div className="relative">
                    <input
                      type="text"
                      value={act.price}
                      onChange={(e) => updateMedicalAct(index, 'price', e.target.value)}
                      placeholder="Prix"
                      className="w-32 px-4 py-2 pl-8 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMedicalAct(index)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Horaires d'ouverture */}
          <section className="bg-white rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-mybakup-blue" />
              <h2 className="text-lg font-semibold text-mybakup-blue">
                Horaires d'ouverture
              </h2>
            </div>

            <div className="space-y-6">
              {formData.openingHours.map((day, index) => (
                <div key={day.day} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={day.isOpen}
                        onChange={(e) => {
                          const newHours = [...formData.openingHours];
                          newHours[index].isOpen = e.target.checked;
                          setFormData(prev => ({ ...prev, openingHours: newHours }));
                        }}
                        className="w-4 h-4 text-mybakup-coral rounded"
                      />
                      <span className="font-medium">{day.day}</span>
                    </label>
                  </div>

                  {day.isOpen && (
                    <div className="ml-7 grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-600">Matin</label>
                        <div className="flex gap-2">
                          <input
                            type="time"
                            value={day.morning.start}
                            onChange={(e) => {
                              const newHours = [...formData.openingHours];
                              newHours[index].morning.start = e.target.value;
                              setFormData(prev => ({ ...prev, openingHours: newHours }));
                            }}
                            className="flex-1 px-2 py-1 rounded-lg border border-gray-200"
                          />
                          <span className="text-gray-500">-</span>
                          <input
                            type="time"
                            value={day.morning.end}
                            onChange={(e) => {
                              const newHours = [...formData.openingHours];
                              newHours[index].morning.end = e.target.value;
                              setFormData(prev => ({ ...prev, openingHours: newHours }));
                            }}
                            className="flex-1 px-2 py-1 rounded-lg border border-gray-200"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm text-gray-600">Après-midi</label>
                        <div className="flex gap-2">
                          <input
                            type="time"
                            value={day.afternoon.start}
                            onChange={(e) => {
                              const newHours = [...formData.openingHours];
                              newHours[index].afternoon.start = e.target.value;
                              setFormData(prev => ({ ...prev, openingHours: newHours }));
                            }}
                            className="flex-1 px-2 py-1 rounded-lg border border-gray-200"
                          />
                          <span className="text-gray-500">-</span>
                          <input
                            type="time"
                            value={day.afternoon.end}
                            onChange={(e) => {
                              const newHours = [...formData.openingHours];
                              newHours[index].afternoon.end = e.target.value;
                              setFormData(prev => ({ ...prev, openingHours: newHours }));
                            }}
                            className="flex-1 px-2 py-1 rounded-lg border border-gray-200"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-mybakup-coral text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Enregistrer mes informations'
            )}
          </button>
        </form>
      </main>
    </div>
  );
}