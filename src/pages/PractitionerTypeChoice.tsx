import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCog, Building2, UserCircle, ArrowLeft } from 'lucide-react';

export default function PractitionerTypeChoice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => navigate('/profile-choice')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-mybakup-blue" />
          </button>
          <h1 className="ml-4 text-xl font-semibold text-mybakup-blue">
            Type de praticien
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="grid gap-6">
          {/* Praticien indépendant */}
          <button
            onClick={() => navigate('/practitioner-signup')}
            className="bg-white rounded-xl p-6 text-left hover:shadow-md transition-all border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-[#FFE8E8]">
                <UserCog className="w-8 h-8 text-mybakup-coral" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-mybakup-blue mb-2">
                  Praticien indépendant
                </h2>
                <p className="text-gray-600">
                  Gérez votre activité en toute autonomie
                </p>
              </div>
            </div>
          </button>

          {/* Centre de soins */}
          <button
            onClick={() => navigate('/facility-registration')}
            className="bg-white rounded-xl p-6 text-left hover:shadow-md transition-all border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-[#EDF5FF]">
                <Building2 className="w-8 h-8 text-mybakup-blue" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-mybakup-blue mb-2">
                  Centre de soins
                </h2>
                <p className="text-gray-600">
                  Administrez votre établissement et votre équipe médicale
                </p>
              </div>
            </div>
          </button>

          {/* Secrétaire */}
          <button
            onClick={() => {
              // Navigation vers le dashboard secrétaire
              navigate('/profile');
            }}
            className="bg-white rounded-xl p-6 text-left hover:shadow-md transition-all border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-[#E8F4FF]">
                <UserCircle className="w-8 h-8 text-[#47559E]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-mybakup-blue mb-2">
                  Secrétaire
                </h2>
                <p className="text-gray-600">
                  Gérez les rendez-vous et l'agenda des praticiens
                </p>
              </div>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}