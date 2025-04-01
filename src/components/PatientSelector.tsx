import React from 'react';
import { User, Check } from 'lucide-react';
import { Beneficiary } from '../contexts/AuthContext';

interface PatientSelectorProps {
  forSelf: boolean;
  setForSelf: (value: boolean) => void;
  onAddBeneficiary: () => void;
  selectedBeneficiary?: Beneficiary | null;
}

export default function PatientSelector({ 
  forSelf, 
  setForSelf, 
  onAddBeneficiary,
  selectedBeneficiary 
}: PatientSelectorProps) {
  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-[#47559E] mb-2">
          Choix du patient
        </h2>
        <p className="text-gray-600">
          Attention, les informations de santé que vous fournissez doivent être à jour.
        </p>
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-3">
          <input
            type="radio"
            checked={forSelf}
            onChange={() => setForSelf(true)}
            className="w-5 h-5 text-[#47559E]"
          />
          <span className="text-gray-900">Je prends rendez-vous pour moi</span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="radio"
            checked={!forSelf}
            onChange={() => {
              setForSelf(false);
              if (!selectedBeneficiary) {
                onAddBeneficiary();
              }
            }}
            className="w-5 h-5 text-[#47559E]"
          />
          <span className="text-gray-900">Je prends rendez-vous pour un bénéficiaire</span>
        </label>

        {!forSelf && selectedBeneficiary && (
          <div className="ml-8 mt-4">
            <div className="bg-green-50 rounded-xl p-4 flex items-start gap-3">
              <div className="p-1 bg-green-100 rounded-full">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-800">
                  Bénéficiaire sélectionné
                </p>
                <p className="text-sm text-green-700">
                  {selectedBeneficiary.firstName} {selectedBeneficiary.lastName}
                </p>
              </div>
            </div>
            <button
              onClick={onAddBeneficiary}
              className="mt-2 text-sm text-[#47559E] hover:underline"
            >
              Changer de bénéficiaire
            </button>
          </div>
        )}

        {!forSelf && !selectedBeneficiary && (
          <div className="ml-8">
            <button
              onClick={onAddBeneficiary}
              className="flex items-center gap-2 px-4 py-2 text-[#47559E] border border-[#47559E] rounded-lg hover:bg-[#47559E] hover:text-white transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Sélectionner un bénéficiaire</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}