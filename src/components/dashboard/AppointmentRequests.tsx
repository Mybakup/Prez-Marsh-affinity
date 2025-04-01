import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, Phone, Mail, Check, X } from 'lucide-react';
import type { AppointmentRequest } from '../../types/appointments';
import RescheduleModal from './RescheduleModal';

interface AppointmentRequestsProps {
  appointments: AppointmentRequest[];
  showAppointmentDetails: string | null;
  setShowAppointmentDetails: (id: string | null) => void;
  onAcceptAppointment: (appointment: AppointmentRequest) => void;
  renderSourceBadge: (source: { type: 'hotel' | 'agency' | 'insurance', name: string }) => React.ReactNode;
}

export default function AppointmentRequests({
  appointments,
  showAppointmentDetails,
  setShowAppointmentDetails,
  onAcceptAppointment,
  renderSourceBadge
}: AppointmentRequestsProps) {
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRequest | null>(null);

  const handleReschedule = (appointment: AppointmentRequest) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  return (
    <>
      <div className="divide-y divide-gray-200">
        {appointments.map((appointment) => (
          <div key={`request-${appointment.id}`} className="p-6">
            <div className="flex items-start gap-4">
              <img
                src={appointment.patient.imageUrl}
                alt={appointment.patient.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-mybakup-blue">
                      {appointment.patient.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {appointment.patient.age} ans • {appointment.patient.gender}
                    </p>
                    {renderSourceBadge(appointment.source)}
                  </div>
                  <button
                    onClick={() => setShowAppointmentDetails(
                      showAppointmentDetails === appointment.id ? null : appointment.id
                    )}
                    className="text-mybakup-blue hover:text-mybakup-coral transition-colors"
                  >
                    <ChevronRight 
                      className={`w-5 h-5 transition-transform ${
                        showAppointmentDetails === appointment.id ? 'rotate-90' : ''
                      }`} 
                    />
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{appointment.proposedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{appointment.proposedTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{appointment.type}</span>
                  </div>
                  {appointment.isFirstVisit && (
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs">
                      Première visite
                    </span>
                  )}
                </div>

                {showAppointmentDetails === appointment.id && (
                  <div className="mt-4 space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a 
                          href={`tel:${appointment.contact.phone}`}
                          className="text-mybakup-blue hover:underline"
                        >
                          {appointment.contact.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <a 
                          href={`mailto:${appointment.contact.email}`}
                          className="text-mybakup-blue hover:underline"
                        >
                          {appointment.contact.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => onAcceptAppointment(appointment)}
                        className="flex-1 py-2 bg-mybakup-coral text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Accepter</span>
                      </button>
                      <button
                        onClick={() => handleReschedule(appointment)}
                        className="flex-1 py-2 border border-mybakup-blue text-mybakup-blue rounded-lg hover:bg-mybakup-blue/5 transition-colors"
                      >
                        Proposer un autre horaire
                      </button>
                      <button
                        className="py-2 px-4 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showRescheduleModal && selectedAppointment && (
        <RescheduleModal
          isOpen={showRescheduleModal}
          onClose={() => {
            setShowRescheduleModal(false);
            setSelectedAppointment(null);
          }}
          appointment={selectedAppointment}
        />
      )}
    </>
  );
}