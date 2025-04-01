import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  imageUrl: string;
  lastVisit: string;
  nextAppointment: string | null;
  totalVisits: number;
}

interface PatientListProps {
  patients: Patient[];
  selectedPatientId: string | null;
  onPatientSelect: (id: string) => void;
}

export default function PatientList({ 
  patients, 
  selectedPatientId, 
  onPatientSelect 
}: PatientListProps) {
  return (
    <div className="space-y-4">
      {patients.map((patient) => (
        <div
          key={patient.id}
          onClick={() => onPatientSelect(patient.id)}
          className={`bg-white rounded-xl p-4 border cursor-pointer transition-all ${
            selectedPatientId === patient.id
              ? 'border-mybakup-coral shadow-md'
              : 'border-gray-200 hover:border-mybakup-coral'
          }`}
        >
          <div className="flex items-center gap-3">
            <img
              src={patient.imageUrl}
              alt={patient.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium text-mybakup-blue">
                {patient.name}
              </h3>
              <p className="text-sm text-gray-600">
                {patient.age} ans • {patient.gender}
              </p>
              <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Dernière visite : {patient.lastVisit}</span>
                </div>
                {patient.nextAppointment && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Prochain RDV : {patient.nextAppointment}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}