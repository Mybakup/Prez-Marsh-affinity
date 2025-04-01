import React, { useState } from 'react';
import { X, Plus, Calendar, Clock, Trash2, Loader2 } from 'lucide-react';

interface UnavailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Unavailability {
  id: string;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  isFullDay: boolean;
  reason: string;
}

export default function UnavailabilityModal({ isOpen, onClose }: UnavailabilityModalProps) {
  const [unavailabilities, setUnavailabilities] = useState<Unavailability[]>([]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const addUnavailability = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setUnavailabilities([
      ...unavailabilities,
      {
        id: newId,
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        isFullDay: true,
        reason: ''
      }
    ]);
  };

  const removeUnavailability = (id: string) => {
    setUnavailabilities(unavailabilities.filter(u => u.id !== id));
  };

  const updateUnavailability = (id: string, field: keyof Unavailability, value: string | boolean) => {
    setUnavailabilities(unavailabilities.map(u => 
      u.id === id ? { ...u, [field]: value } : u
    ));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically send the unavailabilities to your backend
      console.log('Saving unavailabilities:', unavailabilities);
      
      onClose();
    } catch (error) {
      console.error('Error saving unavailabilities:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-mybakup-blue" />
              <h2 className="text-xl font-semibold text-mybakup-blue">
                Gérer mes indisponibilités
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Liste des indisponibilités */}
            <div className="space-y-4">
              {unavailabilities.map((unavailability) => (
                <div 
                  key={unavailability.id}
                  className="bg-gray-50 rounded-xl p-4 space-y-4"
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium text-mybakup-blue">
                      Période d'indisponibilité
                    </h3>
                    <button
                      onClick={() => removeUnavailability(unavailability.id)}
                      className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Date de début
                      </label>
                      <input
                        type="date"
                        value={unavailability.startDate}
                        onChange={(e) => updateUnavailability(unavailability.id, 'startDate', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Date de fin
                      </label>
                      <input
                        type="date"
                        value={unavailability.endDate}
                        onChange={(e) => updateUnavailability(unavailability.id, 'endDate', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={unavailability.isFullDay}
                      onChange={(e) => updateUnavailability(unavailability.id, 'isFullDay', e.target.checked)}
                      className="rounded text-mybakup-coral focus:ring-mybakup-coral"
                    />
                    <span className="text-sm text-gray-600">Journée(s) complète(s)</span>
                  </label>

                  {!unavailability.isFullDay && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Heure de début
                        </label>
                        <input
                          type="time"
                          value={unavailability.startTime}
                          onChange={(e) => updateUnavailability(unavailability.id, 'startTime', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Heure de fin
                        </label>
                        <input
                          type="time"
                          value={unavailability.endTime}
                          onChange={(e) => updateUnavailability(unavailability.id, 'endTime', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Motif (optionnel)
                    </label>
                    <input
                      type="text"
                      value={unavailability.reason}
                      onChange={(e) => updateUnavailability(unavailability.id, 'reason', e.target.value)}
                      placeholder="Ex: Congés, Formation..."
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bouton Ajouter */}
            <button
              onClick={addUnavailability}
              className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-mybakup-coral hover:text-mybakup-coral transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Ajouter une période d'indisponibilité</span>
            </button>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || unavailabilities.length === 0}
                className="flex-1 px-4 py-2 bg-mybakup-coral text-white rounded-xl hover:bg-opacity-90 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Enregistrer'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}