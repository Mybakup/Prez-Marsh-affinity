import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function AppointmentConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { patientName } = location.state || { patientName: 'le patient' };

  return (
    <div className="min-h-screen bg-[#EDF5FF] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-6 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-[#47559E]">
            Demande envoyée avec succès !
          </h1>
          <p className="text-gray-600">
            La demande de rendez-vous pour {patientName} a été envoyée. Le praticien vous contactera dans les plus brefs délais pour confirmer votre rendez-vous.
          </p>
        </div>

        <button
          onClick={() => navigate('/appointments')}
          className="w-full py-3 bg-[#47559E] text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors"
        >
          Voir mon rendez-vous
        </button>
      </div>
    </div>
  );
}