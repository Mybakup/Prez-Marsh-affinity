import React, { useState } from 'react';
import { X, Calendar, Clock, Loader2 } from 'lucide-react';
import type { AppointmentRequest } from '../../types/appointments';

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: AppointmentRequest;
}

interface TimeSlot {
  date: string;
  slots: string[];
}

// Exemple de créneaux disponibles
const availableSlots: TimeSlot[] = [
  {
    date: '2024-04-15',
    slots: ['09:00', '10:30', '14:00', '15:30', '16:30']
  },
  {
    date: '2024-04-16',
    slots: ['09:30', '11:00', '14:30', '16:00']
  },
  {
    date: '2024-04-17',
    slots: ['10:00', '11:30', '14:00', '15:00', '16:30']
  }
];

export default function RescheduleModal({ isOpen, onClose, appointment }: RescheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSlotSelect = (slot: string) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter(s => s !== slot));
    } else if (selectedSlots.length < 3) {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedDate || selectedSlots.length === 0) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically send the new slots to your backend
      console.log('Rescheduling data:', {
        appointmentId: appointment.id,
        patientId: appointment.patient.name,
        proposedDate: selectedDate,
        proposedSlots: selectedSlots
      });

      onClose();
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-mybakup-blue" />
              <h2 className="text-xl font-semibold text-mybakup-blue">
                Proposer de nouveaux créneaux
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Patient Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
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

          {/* Available Dates */}
          <div className="space-y-6">
            {availableSlots.map((timeSlot) => (
              <div key={timeSlot.date} className="space-y-3">
                <button
                  onClick={() => setSelectedDate(timeSlot.date)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${
                    selectedDate === timeSlot.date
                      ? 'border-mybakup-blue bg-mybakup-blue/5'
                      : 'border-gray-200 hover:border-mybakup-blue'
                  }`}
                >
                  <span className="font-medium text-mybakup-blue">
                    {formatDate(timeSlot.date)}
                  </span>
                </button>

                {selectedDate === timeSlot.date && (
                  <div className="grid grid-cols-3 gap-2 pl-4">
                    {timeSlot.slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => handleSlotSelect(slot)}
                        className={`p-2 rounded-lg border text-center transition-colors ${
                          selectedSlots.includes(slot)
                            ? 'border-mybakup-coral bg-mybakup-coral/5 text-mybakup-coral'
                            : 'border-gray-200 hover:border-mybakup-coral text-gray-600'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || !selectedDate || selectedSlots.length === 0}
              className="flex-1 px-4 py-2 bg-mybakup-coral text-white rounded-xl hover:bg-opacity-90 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Proposer ces créneaux'
              )}
            </button>
          </div>

          {selectedSlots.length > 0 && (
            <p className="mt-4 text-sm text-gray-500 text-center">
              {selectedSlots.length} créneau{selectedSlots.length > 1 ? 'x' : ''} sélectionné{selectedSlots.length > 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}