import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  UserPlus,
  Plus,
  Trash2,
  Globe2,
  Clock,
  Image as ImageIcon,
  Loader2,
  Languages
} from 'lucide-react';
import type { HealthcareProfessional, WeekSchedule } from '../types/facility';
import { specialties } from '../data/specialties';

const defaultSchedule: WeekSchedule = {
  monday: { isOpen: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
  tuesday: { isOpen: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
  wednesday: { isOpen: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
  thursday: { isOpen: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
  friday: { isOpen: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
  saturday: { isOpen: false },
  sunday: { isOpen: false }
};

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

export default function FacilityStaffManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showScheduleCopyOptions, setShowScheduleCopyOptions] = useState(false);
  const [selectedDay, setSelectedDay] = useState<keyof WeekSchedule | null>(null);
  const [formData, setFormData] = useState<Partial<HealthcareProfessional>>({
    schedule: defaultSchedule,
    languages: []
  });

  // Initialize form with professional data if editing
  useEffect(() => {
    const professional = location.state?.professional;
    if (professional) {
      setFormData(professional);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/facility-dashboard');
    } catch (error) {
      console.error('Error saving professional:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleChange = (
    day: keyof WeekSchedule,
    period: 'morning' | 'afternoon',
    field: 'start' | 'end',
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: {
          ...prev.schedule?.[day],
          [period]: {
            ...prev.schedule?.[day]?.[period],
            [field]: value
          }
        }
      }
    }));
  };

  const copySchedule = (fromDay: keyof WeekSchedule, toDay: keyof WeekSchedule) => {
    setFormData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [toDay]: { ...prev.schedule?.[fromDay] }
      }
    }));
  };

  const copyToWeekdays = (fromDay: keyof WeekSchedule) => {
    const weekdays: (keyof WeekSchedule)[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const newSchedule = { ...formData.schedule };
    weekdays.forEach(day => {
      if (day !== fromDay) {
        newSchedule[day] = { ...formData.schedule?.[fromDay] };
      }
    });
    setFormData(prev => ({ ...prev, schedule: newSchedule }));
  };

  const dayNames: Record<keyof WeekSchedule, string> = {
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    sunday: 'Dimanche'
  };

  const handleLanguageToggle = (code: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages?.includes(code)
        ? prev.languages.filter(lang => lang !== code)
        : [...(prev.languages || []), code]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/facility-dashboard')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-mybakup-blue" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-mybakup-blue">
              {location.state?.professional ? 'Modifier le praticien' : 'Ajouter un praticien'}
            </h1>
          </div>
          <div className="p-2 rounded-xl bg-[#EDF5FF]">
            <UserPlus className="w-6 h-6 text-mybakup-blue" />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <section className="bg-white rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-semibold text-mybakup-blue">
              Informations générales
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre professionnel *
              </label>
              <select
                required
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
              >
                <option value="">Sélectionnez un titre</option>
                <option value="Médecin">Médecin</option>
                <option value="Infirmier">Infirmier</option>
                <option value="Dentiste">Dentiste</option>
                <option value="Kinésithérapeute">Kinésithérapeute</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Spécialité *
              </label>
              <select
                required
                value={formData.specialty || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
              >
                <option value="">Sélectionnez une spécialité</option>
                {specialties.map(specialty => (
                  <option key={specialty.id} value={specialty.name}>
                    {specialty.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Numéro RPPS *
              </label>
              <input
                type="text"
                required
                value={formData.registrationNumber || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, registrationNumber: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                placeholder="Ex: RPPS123456789"
              />
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-semibold text-mybakup-blue">
              Coordonnées
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email professionnel *
              </label>
              <input
                type="email"
                required
                value={formData.email || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone *
              </label>
              <input
                type="tel"
                required
                value={formData.phone || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
              />
            </div>
          </section>

          {/* Languages */}
          <section className="bg-white rounded-xl p-6 space-y-6">
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
                  onClick={() => handleLanguageToggle(language.name)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-colors ${
                    formData.languages?.includes(language.name)
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

          {/* Description */}
          <section className="bg-white rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-semibold text-mybakup-blue">
              Description professionnelle
            </h2>

            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
              placeholder="Décrivez votre pratique, votre approche et votre expérience..."
            />
          </section>

          {/* Profile Photo */}
          <section className="bg-white rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-semibold text-mybakup-blue flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Photo de profil
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
              {formData.imageUrl ? (
                <div className="relative inline-block">
                  <img
                    src={formData.imageUrl}
                    alt="Profile preview"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, imageUrl: undefined }))}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // Handle file upload
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData(prev => ({
                            ...prev,
                            imageUrl: reader.result as string
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <Plus className="w-12 h-12 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Cliquez ou déposez une photo ici
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Schedule */}
          <section className="bg-white rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-mybakup-blue" />
              <h2 className="text-lg font-semibold text-mybakup-blue">
                Horaires de consultation
              </h2>
            </div>

            <div className="space-y-6">
              {Object.entries(formData.schedule || {}).map(([day, hours]) => (
                <div key={day} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={hours.isOpen}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            schedule: {
                              ...prev.schedule,
                              [day]: { ...hours, isOpen: e.target.checked }
                            }
                          }));
                        }}
                        className="w-4 h-4 text-mybakup-coral rounded"
                      />
                      <span className="font-medium">{dayNames[day as keyof WeekSchedule]}</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDay(day as keyof WeekSchedule);
                        setShowScheduleCopyOptions(true);
                      }}
                      className="text-sm text-mybakup-coral hover:text-mybakup-coral/80"
                    >
                      Copier ces horaires
                    </button>
                  </div>

                  {hours.isOpen && (
                    <div className="ml-6 grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-600">Matin</label>
                        <div className="flex gap-2">
                          <input
                            type="time"
                            value={hours.morning?.start || ''}
                            onChange={(e) => handleScheduleChange(
                              day as keyof WeekSchedule,
                              'morning',
                              'start',
                              e.target.value
                            )}
                            className="flex-1 px-2 py-1 rounded-lg border border-gray-200"
                          />
                          <span className="text-gray-500">-</span>
                          <input
                            type="time"
                            value={hours.morning?.end || ''}
                            onChange={(e) => handleScheduleChange(
                              day as keyof WeekSchedule,
                              'morning',
                              'end',
                              e.target.value
                            )}
                            className="flex-1 px-2 py-1 rounded-lg border border-gray-200"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm text-gray-600">Après-midi</label>
                        <div className="flex gap-2">
                          <input
                            type="time"
                            value={hours.afternoon?.start || ''}
                            onChange={(e) => handleScheduleChange(
                              day as keyof WeekSchedule,
                              'afternoon',
                              'start',
                              e.target.value
                            )}
                            className="flex-1 px-2 py-1 rounded-lg border border-gray-200"
                          />
                          <span className="text-gray-500">-</span>
                          <input
                            type="time"
                            value={hours.afternoon?.end || ''}
                            onChange={(e) => handleScheduleChange(
                              day as keyof WeekSchedule,
                              'afternoon',
                              'end',
                              e.target.value
                            )}
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
              location.state?.professional ? 'Enregistrer les modifications' : 'Ajouter le praticien'
            )}
          </button>
        </form>
      </main>

      {/* Schedule Copy Modal */}
      {showScheduleCopyOptions && selectedDay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-mybakup-blue mb-4">
              Copier les horaires
            </h3>
            <div className="space-y-4">
              <button
                onClick={() => {
                  copyToWeekdays(selectedDay);
                  setShowScheduleCopyOptions(false);
                }}
                className="w-full p-3 text-left hover:bg-gray-50 rounded-lg"
              >
                Copier vers les jours ouvrés
              </button>
              <button
                onClick={() => setShowScheduleCopyOptions(false)}
                className="w-full p-3 text-mybakup-coral hover:bg-red-50 rounded-lg"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}