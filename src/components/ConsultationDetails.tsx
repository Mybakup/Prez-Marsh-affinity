import React from 'react';

interface ConsultationDetailsProps {
  pathologyType: 'ponctuelle' | 'recurrente';
  setPathologyType: (type: 'ponctuelle' | 'recurrente') => void;
  isFirstVisit: boolean;
  setIsFirstVisit: (value: boolean) => void;
}

export default function ConsultationDetails({
  pathologyType,
  setPathologyType,
  isFirstVisit,
  setIsFirstVisit
}: ConsultationDetailsProps) {
  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-[#47559E] mb-4">
          Détails de la consultation
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg text-[#47559E] mb-3">Ma pathologie est :</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={pathologyType === 'ponctuelle'}
                onChange={() => setPathologyType('ponctuelle')}
                className="w-5 h-5 text-[#47559E]"
              />
              <span className="text-gray-900">Ponctuelle</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={pathologyType === 'recurrente'}
                onChange={() => setPathologyType('recurrente')}
                className="w-5 h-5 text-[#47559E]"
              />
              <span className="text-gray-900">Récurrente</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-lg text-[#47559E] mb-3">
            Avez vous déjà consulté ce praticien ?
          </h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={!isFirstVisit}
                onChange={() => setIsFirstVisit(false)}
                className="w-5 h-5 text-[#47559E]"
              />
              <span className="text-gray-900">Oui</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={isFirstVisit}
                onChange={() => setIsFirstVisit(true)}
                className="w-5 h-5 text-[#47559E]"
              />
              <span className="text-gray-900">Non</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}