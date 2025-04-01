import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, Phone, Mail, Clock, Image as ImageIcon, Plus, Loader2 } from 'lucide-react';
import type { HealthcareFacility, FacilityType, WeekSchedule } from '../types/facility';
import { facilityTypes } from '../types/facility';
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

export default function FacilityRegistration() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<HealthcareFacility>>({
    type: 'clinic',
    specialties: [],
    schedule: defaultSchedule,
    photos: []
  });
  const [selectedSpecialties, setSelectedSpecialties] = useState<Set<string>>(new Set());
  const [mapCenter, setMapCenter] = useState<[number, number]>([48.8566, 2.3522]); // Paris
  const [showScheduleCopyOptions, setShowScheduleCopyOptions] = useState(false);
  const [selectedDay, setSelectedDay] = useState<keyof WeekSchedule | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/facility-staff');
    } catch (error) {
      console.error('Error registering facility:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSpecialtyToggle = (specialtyId: string) => {
    const newSpecialties = new Set(selectedSpecialties);
    if (newSpecialties.has(specialtyId)) {
      newSpecialties.delete(specialtyId);
    } else {
      newSpecialties.add(specialtyId);
    }
    setSelectedSpecialties(newSpecialties);
    setFormData(prev => ({
      ...prev,
      specialties: Array.from(newSpecialties)
    }));
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-mybakup-blue" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-mybakup-blue">
              Inscription d'un établissement
            </h1>
          </div>
          <div className="p-2 rounded-xl bg-[#EDF5FF]">
            <Building2 className="w-6 h-6 text-mybakup-blue" />
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom de l'établissement *
              </label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                placeholder="Ex: Clinique Saint-Louis"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type d'établissement *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as FacilityType }))}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
              >
                {facilityTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-semibold text-mybakup-blue flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Coordonnées
            </h2>

            <div className="space-y-4">
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
                  placeholder="+33 1 23 45 67 89"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                  placeholder="contact@etablissement.fr"
                />
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="bg-white rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-semibold text-mybakup-blue flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Localisation
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address?.street || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    address: { ...prev.address, street: e.target.value }
                  }))}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                  placeholder="123 rue de la Santé"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Code postal *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address?.postalCode || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, postalCode: e.target.value }
                    }))}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                    placeholder="75001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address?.city || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, city: e.target.value }
                    }))}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                    placeholder="Paris"
                  />
                </div>
              </div>

              {/* Map will be added here */}
              <div className="h-64 bg-gray-100 rounded-xl overflow-hidden">
                <iframe
                  src={`https://api.mapbox.com/styles/v1/julienbakala/ckoogz6w01ukr17o5ezqj1x89/static/${mapCenter[1]},${mapCenter[0]},13,0/800x400@2x?access_token=pk.eyJ1IjoianVsaWVuYmFrYWxhIiwiYSI6ImNrb29nZzZ3ODAydGoyb3N0azFqeXJ4NG0ifQ.u23hDthOruKzsnMlZ5UgbQ`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  title="Location Map"
                />
              </div>
            </div>
          </section>

          {/* Specialties */}
          <section className="bg-white rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-semibold text-mybakup-blue">
              Spécialités proposées
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {specialties.map((specialty) => (
                <button
                  key={specialty.id}
                  type="button"
                  onClick={() => handleSpecialtyToggle(specialty.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-colors ${
                    selectedSpecialties.has(specialty.id)
                      ? 'border-mybakup-coral bg-mybakup-coral/5'
                      : 'border-gray-200 hover:border-mybakup-coral'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-700">{specialty.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Opening Hours */}
          <section className="bg-white rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-semibold text-mybakup-blue flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Horaires d'ouverture
            </h2>

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

          {/* Photos */}
          <section className="bg-white rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-semibold text-mybakup-blue flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Photos
            </h2>

            <div className="space-y-4">
              {/* Logo upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo de l'établissement
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // Handle file upload
                      }
                    }}
                  />
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">
                      Cliquez ou déposez votre logo ici
                    </p>
                  </div>
                </div>
              </div>

              {/* Facility photos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photos de l'établissement
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      // Handle files upload
                    }}
                  />
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">
                      Ajoutez jusqu'à 5 photos de votre établissement
                    </p>
                  </div>
                </div>
              </div>
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
              'Inscrire l\'établissement'
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