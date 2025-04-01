import React from 'react';
import { Pill, Globe2, Stethoscope } from 'lucide-react';
import type { Medication } from '../types/medications';

interface MedicationCardProps {
  medication: Medication;
  matchType: 'genericFr' | 'genericEn' | 'brandNameEn';
}

export default function MedicationCard({ medication, matchType }: MedicationCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-200">
      <div className="space-y-4">
        {/* French Name */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#FFE8E8] text-mybakup-coral">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Nom français</p>
            <p className={`font-medium ${matchType === 'genericFr' ? 'text-mybakup-coral' : 'text-mybakup-blue'}`}>
              {medication.genericFr}
            </p>
          </div>
        </div>

        {/* English Generic Name */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#EDF5FF] text-mybakup-blue">
            <Globe2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Generic name (EN)</p>
            <p className={`font-medium ${matchType === 'genericEn' ? 'text-mybakup-coral' : 'text-mybakup-blue'}`}>
              {medication.genericEn}
            </p>
            <p className="text-sm text-gray-500 mt-1">Brand names: {medication.brandNameEn}</p>
          </div>
        </div>

        {/* Indication */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-green-50 text-green-600">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Main indication</p>
            <p className="text-mybakup-blue">{medication.indication}</p>
          </div>
        </div>
      </div>
    </div>
  );
}