import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Stethoscope, ArrowLeft } from 'lucide-react';

export default function ProfileChoice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => navigate('/profile')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-mybakup-blue" />
          </button>
          <h1 className="ml-4 text-xl font-semibold text-mybakup-blue">
            Choisir un profil
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="grid gap-6">
          {/* Profil Voyageur */}
          <button
            onClick={() => {
              navigate('/home');
            }}
            className="bg-white rounded-xl p-6 text-left hover:shadow-md transition-all border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-[#FFE8E8]">
                <Plane className="w-8 h-8 text-mybakup-coral" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-mybakup-blue mb-2">
                  Profil Voyageur
                </h2>
                <p className="text-gray-600">
                  Accédez aux services de santé lors de vos déplacements et voyages
                </p>
              </div>
            </div>
          </button>

          {/* Profil Professionnel de santé */}
          <button
            onClick={() => {
              navigate('/practitioner-type');
            }}
            className="bg-white rounded-xl p-6 text-left hover:shadow-md transition-all border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-[#EDF5FF]">
                <Stethoscope className="w-8 h-8 text-mybakup-blue" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-mybakup-blue mb-2">
                  Profil Professionnel de santé
                </h2>
                <p className="text-gray-600">
                  Gérez votre cabinet et vos patients en toute simplicité
                </p>
              </div>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}