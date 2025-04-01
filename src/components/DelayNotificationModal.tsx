import React, { useState } from 'react';
import { X, Clock } from 'lucide-react';

interface DelayNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (delayMinutes: number) => void;
}

const delayOptions = [15, 30, 45, 60];

export default function DelayNotificationModal({ 
  isOpen, 
  onClose, 
  onConfirm 
}: DelayNotificationModalProps) {
  const [selectedDelay, setSelectedDelay] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedDelay) {
      onConfirm(selectedDelay);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-mybakup-blue" />
              <h2 className="text-lg font-semibold text-mybakup-blue">
                Annoncer un retard
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-gray-600 mb-4">
            Sélectionnez votre temps de retard estimé :
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {delayOptions.map((minutes) => (
              <button
                key={minutes}
                onClick={() => setSelectedDelay(minutes)}
                className={`p-4 rounded-xl border-2 transition-colors ${
                  selectedDelay === minutes
                    ? 'border-mybakup-coral bg-mybakup-coral/5 text-mybakup-coral'
                    : 'border-gray-200 hover:border-mybakup-coral'
                }`}
              >
                {minutes} minutes
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedDelay}
              className="flex-1 px-4 py-2 bg-mybakup-coral text-white rounded-xl hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}