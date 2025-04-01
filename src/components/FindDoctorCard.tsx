import React from 'react';
import { MapPin, Search } from 'lucide-react';

interface FindDoctorCardProps {
  onClick: () => void;
}

export default function FindDoctorCard({ onClick }: FindDoctorCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#FFE8E8]">
            <MapPin className="w-6 h-6 text-mybakup-coral" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-mybakup-blue">Trouver un médecin</h2>
            <p className="text-sm text-gray-500">Recherchez des professionnels de santé près de chez vous</p>
          </div>
        </div>
        <div className="text-mybakup-coral">
          <Search className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}