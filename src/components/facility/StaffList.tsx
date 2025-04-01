import React from 'react';
import { Edit2, ChevronRight, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { HealthcareProfessional } from '../../types/facility';

interface StaffListProps {
  professionals: HealthcareProfessional[];
  selectedProfessional: string | null;
  setSelectedProfessional: (id: string | null) => void;
}

export default function StaffList({ 
  professionals,
  selectedProfessional,
  setSelectedProfessional
}: StaffListProps) {
  const navigate = useNavigate();

  return (
    <div className="divide-y divide-gray-200">
      {professionals.map((professional) => (
        <div
          key={professional.id}
          className={`p-4 transition-colors ${
            selectedProfessional === professional.id
              ? 'bg-mybakup-coral/5'
              : 'hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <img
              src={professional.imageUrl || 'https://via.placeholder.com/100'}
              alt={`${professional.firstName} ${professional.lastName}`}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium text-mybakup-blue">
                {professional.firstName} {professional.lastName}
              </h3>
              <p className="text-sm text-gray-600">
                {professional.specialty}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/facility-staff', { state: { professional } })}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Edit2 className="w-4 h-4 text-gray-400 hover:text-mybakup-coral" />
              </button>
              <button
                onClick={() => setSelectedProfessional(
                  selectedProfessional === professional.id ? null : professional.id
                )}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                  selectedProfessional === professional.id ? 'rotate-90' : ''
                }`} />
              </button>
            </div>
          </div>

          {selectedProfessional === professional.id && (
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Lun-Ven: 9h-18h</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Cabinet principal</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <a 
                  href={`tel:${professional.phone}`}
                  className="text-mybakup-blue hover:underline"
                >
                  {professional.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <a 
                  href={`mailto:${professional.email}`}
                  className="text-mybakup-blue hover:underline"
                >
                  {professional.email}
                </a>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}