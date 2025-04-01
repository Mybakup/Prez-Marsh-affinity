import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, Phone, Mail, Check, X, Loader2, User } from 'lucide-react';
import type { AppointmentRequest } from '../../types/appointments';
import type { HealthcareProfessional } from '../../types/facility';
import RescheduleModal from '../dashboard/RescheduleModal';

interface AppointmentRequestsProps {
  appointments: AppointmentRequest[];
  professionals: HealthcareProfessional[];
  showAppointmentDetails: string | null;
  setShowAppointmentDetails: (id: string | null) => void;
  onAcceptAppointment: (appointment: AppointmentRequest) => void;
  onRejectAppointment: (appointment: AppointmentRequest) => void;
  renderSourceBadge: (source: { type: 'hotel' | 'agency' | 'insurance', name: string }) => React.ReactNode;
  professionalId?: string;
}

export default function AppointmentRequests({
  appointments,
  professionals,
  showAppointmentDetails,
  setShowAppointmentDetails,
  onAcceptAppointment,
  onRejectAppointment,
  renderSourceBadge,
  professionalId
}: AppointmentRequestsProps) {
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRequest | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const handleReschedule = (appointment: AppointmentRequest) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  const handleAccept = async (appointment: AppointmentRequest) => {
    setLoading(appointment.id);
    try {
      await onAcceptAppointment(appointment);
    } finally {
      setLoading(null);
    }
  };

  const handleReject = async (appointment: AppointmentRequest) => {
    setLoading(appointment.id);
    try {
      await onRejectAppointment(appointment);
    } finally {
      setLoading(null);
    }
  };

  // Filter appointments by professional if professionalId is provided
  const filteredAppointments = professionalId 
    ? appointments.filter(apt => apt.professionalId === professionalId)
    : appointments;

  const getProfessionalInfo = (professionalId: string | undefined) => {
    if (!professionalId) return null;
    return professionals.find(p => p.id === professionalId);
  };

  return (
    <>
      <div className="divide-y divide-gray-200">
        {filteredAppointments.map((appointment) => {
          const professional = getProfessionalInfo(appointment.professionalId);
          
          return (
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
                      <div className="flex items-center gap-2 mt-1">
                        {renderSourceBadge(appointment.source)}
                        {professional && (
                          <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-full">
                            <User className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-600">
                              Pour {professional.firstName} {professional.lastName}
                            </span>
                          </div>
                        )}
                      </div>
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
                          onClick={() => handleAccept(appointment)}
                          disabled={loading === appointment.id}
                          className="flex-1 py-2 bg-mybakup-coral text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {loading === appointment.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Accepter</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleReschedule(appointment)}
                          disabled={loading === appointment.id}
                          className="flex-1 py-2 border border-mybakup-blue text-mybakup-blue rounded-lg hover:bg-mybakup-blue/5 transition-colors disabled:opacity-50"
                        >
                          Proposer un autre horaire
                        </button>
                        <button
                          onClick={() => handleReject(appointment)}
                          disabled={loading === appointment.id}
                          className="py-2 px-4 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center disabled:opacity-50"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
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