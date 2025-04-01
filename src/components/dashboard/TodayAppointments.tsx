import React, { useState } from 'react';
import { Calendar, Clock, FileText, Check } from 'lucide-react';
import type { AppointmentRequest } from '../../types/appointments';
import PrescriptionModal from './PrescriptionModal';

interface TodayAppointmentsProps {
  appointments: AppointmentRequest[];
  onStartConsultation: (appointmentId: string) => void;
  renderSourceBadge: (source: { type: 'hotel' | 'agency' | 'insurance', name: string }) => React.ReactNode;
}

export default function TodayAppointments({ 
  appointments, 
  onStartConsultation,
  renderSourceBadge 
}: TodayAppointmentsProps) {
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRequest | null>(null);

  if (appointments.length === 0) return null;

  const handlePrescription = (appointment: AppointmentRequest) => {
    setSelectedAppointment(appointment);
    setShowPrescriptionModal(true);
  };

  return (
    <>
      <section className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-mybakup-blue flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Consultations du jour
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <div key={`today-${appointment.id}`} className="p-6">
              <div className="flex items-center justify-between">
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
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {appointment.proposedTime}
                      </span>
                      {renderSourceBadge(appointment.source)}
                    </div>
                  </div>
                </div>
                {appointment.status === 'waiting' && (
                  <button
                    onClick={() => onStartConsultation(appointment.id)}
                    className="px-4 py-2 bg-mybakup-coral text-white rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    Démarrer la consultation
                  </button>
                )}
                {appointment.status === 'in_progress' && (
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">
                      En cours
                    </span>
                    <button
                      onClick={() => handlePrescription(appointment)}
                      className="flex items-center gap-2 px-4 py-2 bg-mybakup-blue text-white rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Ordonnance</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {showPrescriptionModal && selectedAppointment && (
        <PrescriptionModal
          isOpen={showPrescriptionModal}
          onClose={() => setShowPrescriptionModal(false)}
          appointment={selectedAppointment}
        />
      )}
    </>
  );
}