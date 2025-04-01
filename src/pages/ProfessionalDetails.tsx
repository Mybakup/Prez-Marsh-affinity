import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, GraduationCap, Clock, Euro, Copy, Check, Loader2 } from 'lucide-react';

interface MedicalAct {
  name: string;
  price: number;
}

interface WorkingHours {
  open: string;
  close: string;
}

interface DaySchedule {
  isOpen: boolean;
  morning?: WorkingHours;
  afternoon?: WorkingHours;
}

type WeekSchedule = {
  [key in 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday']: DaySchedule;
};

export default function ProfessionalDetails() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [qualifications, setQualifications] = useState<{ title: string; year: string }[]>([]);
  const [medicalActs, setMedicalActs] = useState<MedicalAct[]>([]);
  const [schedule, setSchedule] = useState<WeekSchedule>({
    monday: { isOpen: true, morning: { open: '09:00', close: '12:00' }, afternoon: { open: '14:00', close: '18:00' } },
    tuesday: { isOpen: true, morning: { open: '09:00', close: '12:00' }, afternoon: { open: '14:00', close: '18:00' } },
    wednesday: { isOpen: true, morning: { open: '09:00', close: '12:00' } },
    thursday: { isOpen: true, morning: { open: '09:00', close: '12:00' }, afternoon: { open: '14:00', close: '18:00' } },
    friday: { isOpen: true, morning: { open: '09:00', close: '12:00' }, afternoon: { open: '14:00', close: '18:00' } },
    saturday: { isOpen: false },
    sunday: { isOpen: false }
  });
  const [showCopyOptions, setShowCopyOptions] = useState(false);
  const [selectedDay, setSelectedDay] = useState<keyof WeekSchedule | null>(null);

  const addQualification = () => {
    setQualifications([...qualifications, { title: '', year: '' }]);
  };

  const removeQualification = (index: number) => {
    setQualifications(qualifications.filter((_, i) => i !== index));
  };

  const updateQualification = (index: number, field: 'title' | 'year', value: string) => {
    setQualifications(qualifications.map((qual, i) => 
      i === index ? { ...qual, [field]: value } : qual
    ));
  };

  const addMedicalAct = () => {
    setMedicalActs([...medicalActs, { name: '', price: 0 }]);
  };

  const removeMedicalAct = (index: number) => {
    setMedicalActs(medicalActs.filter((_, i) => i !== index));
  };

  const updateMedicalAct = (index: number, field: 'name' | 'price', value: string | number) => {
    setMedicalActs(medicalActs.map((act, i) => 
      i === index ? { ...act, [field]: value } : act
    ));
  };

  const copyHours = (fromDay: keyof WeekSchedule, toDay: keyof WeekSchedule) => {
    setSchedule(prev => ({
      ...prev,
      [toDay]: { ...prev[fromDay] }
    }));
  };

  const copyToWeekdays = (fromDay: keyof WeekSchedule) => {
    const weekdays: (keyof WeekSchedule)[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const newSchedule = { ...schedule };
    weekdays.forEach(day => {
      if (day !== fromDay) {
        newSchedule[day] = { ...schedule[fromDay] };
      }
    });
    setSchedule(newSchedule);
  };

  const copyToAllDays = (fromDay: keyof WeekSchedule) => {
    const allDays: (keyof WeekSchedule)[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const newSchedule = { ...schedule };
    allDays.forEach(day => {
      if (day !== fromDay) {
        newSchedule[day] = { ...schedule[fromDay] };
      }
    });
    setSchedule(newSchedule);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/profile');
    } catch (error) {
      console.error('Error saving details:', error);
    } finally {
      setLoading(false);
    }
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
              onClick={() => navigate('/practitioner-info')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-mybakup-blue" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-mybakup-blue">
              Informations professionnelles
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
          {/* Description professionnelle */}
          <section className="bg-white rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-mybakup-blue">
              Description professionnelle
            </h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
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
              {qualifications.map((qual, index) => (
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
              <div className="flex items-center gap-2">
                <Euro className="w-5 h-5 text-mybakup-blue" />
                <h2 className="text-lg font-semibold text-mybakup-blue">
                  Actes médicaux et tarifs
                </h2>
              </div>
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
              {medicalActs.map((act, index) => (
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
                      type="number"
                      value={act.price}
                      onChange={(e) => updateMedicalAct(index, 'price', parseFloat(e.target.value))}
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-mybakup-blue" />
                <h2 className="text-lg font-semibold text-mybakup-blue">
                  Horaires d'ouverture
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              {(Object.keys(schedule) as Array<keyof WeekSchedule>).map((day) => (
                <div key={day} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={schedule[day].isOpen}
                        onChange={(e) => setSchedule(prev => ({
                          ...prev,
                          [day]: { ...prev[day], isOpen: e.target.checked }
                        }))}
                        className="w-4 h-4 text-mybakup-coral rounded"
                      />
                      <span className="font-medium">{dayNames[day]}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDay(day);
                          setShowCopyOptions(true);
                        }}
                        className="p-2 text-gray-400 hover:text-mybakup-coral rounded-full hover:bg-gray-100"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {schedule[day].isOpen && (
                    <div className="ml-6 grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-600">Matin</label>
                        <div className="flex gap-2">
                          <input
                            type="time"
                            value={schedule[day].morning?.open || ''}
                            onChange={(e) => setSchedule(prev => ({
                              ...prev,
                              [day]: {
                                ...prev[day],
                                morning: { ...prev[day].morning!, open: e.target.value }
                              }
                            }))}
                            className="px-2 py-1 rounded-lg border border-gray-200"
                          />
                          <span className="text-gray-500">-</span>
                          <input
                            type="time"
                            value={schedule[day].morning?.close || ''}
                            onChange={(e) => setSchedule(prev => ({
                              ...prev,
                              [day]: {
                                ...prev[day],
                                morning: { ...prev[day].morning!, close: e.target.value }
                              }
                            }))}
                            className="px-2 py-1 rounded-lg border border-gray-200"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm text-gray-600">Après-midi</label>
                        <div className="flex gap-2">
                          <input
                            type="time"
                            value={schedule[day].afternoon?.open || ''}
                            onChange={(e) => setSchedule(prev => ({
                              ...prev,
                              [day]: {
                                ...prev[day],
                                afternoon: { ...prev[day].afternoon!, open: e.target.value }
                              }
                            }))}
                            className="px-2 py-1 rounded-lg border border-gray-200"
                          />
                          <span className="text-gray-500">-</span>
                          <input
                            type="time"
                            value={schedule[day].afternoon?.close || ''}
                            onChange={(e) => setSchedule(prev => ({
                              ...prev,
                              [day]: {
                                ...prev[day],
                                afternoon: { ...prev[day].afternoon!, close: e.target.value }
                              }
                            }))}
                            className="px-2 py-1 rounded-lg border border-gray-200"
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
            className="w-full py-3 bg-mybakup-coral text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Enregistrer'
            )}
          </button>
        </form>
      </main>

      {/* Copy Hours Modal */}
      {showCopyOptions && selectedDay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-mybakup-blue mb-4">
              Copier les horaires
            </h3>
            <div className="space-y-4">
              <button
                onClick={() => copyToWeekdays(selectedDay)}
                className="w-full p-3 text-left hover:bg-gray-50 rounded-lg"
              >
                Copier vers les jours ouvrés
              </button>
              <button
                onClick={() => copyToAllDays(selectedDay)}
                className="w-full p-3 text-left hover:bg-gray-50 rounded-lg"
              >
                Copier vers toute la semaine
              </button>
              <button
                onClick={() => setShowCopyOptions(false)}
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