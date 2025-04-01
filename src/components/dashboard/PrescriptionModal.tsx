import React, { useState } from 'react';
import { X, Plus, Trash2, FileText, Loader2 } from 'lucide-react';
import type { AppointmentRequest } from '../../types/appointments';

interface PrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: AppointmentRequest;
}

interface Medication {
  name: string;
  dosage: string;
  duration: string;
  instructions: string;
}

export default function PrescriptionModal({ isOpen, onClose, appointment }: PrescriptionModalProps) {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const addMedication = () => {
    setMedications([
      ...medications,
      { name: '', dosage: '', duration: '', instructions: '' }
    ]);
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const updateMedication = (index: number, field: keyof Medication, value: string) => {
    setMedications(medications.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically send the prescription data to your backend
      console.log('Prescription data:', {
        appointmentId: appointment.id,
        patientId: appointment.patient.name,
        medications,
        notes,
        date: new Date().toISOString()
      });

      onClose();
    } catch (error) {
      console.error('Error saving prescription:', error);
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
              <FileText className="w-6 h-6 text-mybakup-blue" />
              <h2 className="text-xl font-semibold text-mybakup-blue">
                Nouvelle ordonnance
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <img
                  src={appointment.patient.imageUrl}
                  alt={appointment.patient.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-mybakup-blue">
                    {appointment.patient.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {appointment.patient.age} ans • {appointment.patient.gender}
                  </p>
                </div>
              </div>
            </div>

            {/* Medications */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-mybakup-blue">Médicaments</h3>
                <button
                  type="button"
                  onClick={addMedication}
                  className="flex items-center gap-2 text-mybakup-coral hover:text-mybakup-coral/80"
                >
                  <Plus className="w-5 h-5" />
                  <span>Ajouter</span>
                </button>
              </div>

              {medications.map((medication, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 space-y-4">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-mybakup-blue">
                      Médicament {index + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeMedication(index)}
                      className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={medication.name}
                      onChange={(e) => updateMedication(index, 'name', e.target.value)}
                      placeholder="Nom du médicament"
                      className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                    />
                    <input
                      type="text"
                      value={medication.dosage}
                      onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                      placeholder="Dosage"
                      className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                    />
                  </div>

                  <input
                    type="text"
                    value={medication.duration}
                    onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                    placeholder="Durée du traitement"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                  />

                  <textarea
                    value={medication.instructions}
                    onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                    placeholder="Instructions particulières"
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                  />
                </div>
              ))}
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <h3 className="font-semibold text-mybakup-blue">Notes complémentaires</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                placeholder="Ajoutez des notes ou recommandations supplémentaires..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading || medications.length === 0}
                className="flex-1 px-4 py-2 bg-mybakup-coral text-white rounded-xl hover:bg-opacity-90 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Valider et terminer'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}