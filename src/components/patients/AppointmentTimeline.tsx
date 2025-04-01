import React from 'react';
import { FileText, Clock, Calendar, AlertCircle } from 'lucide-react';

interface Appointment {
  id: string;
  date: string;
  time: string;
  type: string;
  notes: string;
  prescription: boolean;
  followUp: boolean;
}

interface AppointmentTimelineProps {
  appointments: Appointment[];
}

export default function AppointmentTimeline({ appointments }: AppointmentTimelineProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-mybakup-blue mb-6">
        Historique des consultations
      </h3>

      <div className="space-y-6">
        {appointments.map((appointment, index) => (
          <div key={appointment.id} className="relative">
            {/* Timeline line */}
            {index !== appointments.length - 1 && (
              <div className="absolute left-6 top-12 bottom-0 w-px bg-gray-200" />
            )}

            <div className="flex gap-4">
              {/* Timeline dot */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                appointment.type === 'Urgence' 
                  ? 'bg-red-100 text-red-600'
                  : 'bg-blue-100 text-blue-600'
              }`}>
                {appointment.type === 'Urgence' ? (
                  <AlertCircle className="w-6 h-6" />
                ) : (
                  <Clock className="w-6 h-6" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-mybakup-blue">
                      {appointment.type}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {appointment.prescription && (
                      <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        Ordonnance
                      </span>
                    )}
                    {appointment.followUp && (
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                        Suivi
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">{appointment.notes}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}