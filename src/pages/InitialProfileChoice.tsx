import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Stethoscope, ArrowRight } from 'lucide-react';

export default function InitialProfileChoice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDF5FF] via-white to-[#FFE8E8] relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-mybakup-coral/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mybakup-blue/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

      <main className="relative max-w-4xl mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Welcome Message */}
        <div className="text-center mb-8 flex-shrink-0">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-mybakup-blue to-mybakup-coral bg-clip-text text-transparent">
            Mybakup
          </h1>
          <p className="text-sm md:text-base text-gray-600/80 max-w-lg mx-auto">
            L'application qui connecte voyageurs et professionnels de santé partout dans le monde
          </p>
        </div>

        {/* Profile Choices */}
        <div className="flex-1 flex flex-col justify-center space-y-4 md:space-y-6 max-w-2xl mx-auto w-full">
          {/* Profil Voyageur */}
          <button
            onClick={() => navigate('/home')}
            className="group w-full bg-white/80 backdrop-blur-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-mybakup-coral/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-mybakup-coral/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative flex items-center gap-6">
              <div className="p-4 rounded-xl bg-[#FFE8E8] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <Plane className="w-7 h-7 text-mybakup-coral" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-mybakup-blue mb-1 group-hover:translate-x-2 transition-transform">
                  Profil Voyageur
                </h2>
                <p className="text-sm text-gray-600">
                  Accédez aux services de santé lors de vos déplacements
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-mybakup-coral opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
            </div>
          </button>

          {/* Profil Professionnel de santé */}
          <button
            onClick={() => navigate('/practitioner-type')}
            className="group w-full bg-white/80 backdrop-blur-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-mybakup-blue/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-mybakup-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative flex items-center gap-6">
              <div className="p-4 rounded-xl bg-[#EDF5FF] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <Stethoscope className="w-7 h-7 text-mybakup-blue" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-mybakup-blue mb-1 group-hover:translate-x-2 transition-transform">
                  Profil Professionnel de santé
                </h2>
                <p className="text-sm text-gray-600">
                  Gérez votre cabinet en toute simplicité
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-mybakup-blue opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
            </div>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-auto pt-8">
          <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <p className="text-sm text-center text-gray-600/80 mb-6">
              Déjà plus de 8 500 professionnels de santé et 20 000 voyageurs nous font confiance
            </p>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-xl bg-white/50 backdrop-blur-sm">
                <p className="text-2xl font-bold text-mybakup-blue">42+</p>
                <p className="text-xs text-gray-500">Pays couverts</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/50 backdrop-blur-sm">
                <p className="text-2xl font-bold text-mybakup-blue">930</p>
                <p className="text-xs text-gray-500">Villes</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/50 backdrop-blur-sm">
                <p className="text-2xl font-bold text-mybakup-blue">24/7</p>
                <p className="text-xs text-gray-500">Support</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/50 backdrop-blur-sm">
                <p className="text-2xl font-bold text-mybakup-blue">15+</p>
                <p className="text-xs text-gray-500">Langues</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}