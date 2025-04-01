import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Globe2, 
  DollarSign, 
  Calendar, 
  Settings, 
  Shield, 
  Star,
  ArrowRight
} from 'lucide-react';

const benefits = [
  {
    icon: Globe2,
    title: 'Augmentez votre visibilité gratuitement',
    description: 'Soyez facilement visibles auprès des voyageurs internationaux provenant d\'agence de voyages, d\'assurances, de groupe hôteliers…',
    color: 'bg-blue-50',
    textColor: 'text-blue-600'
  },
  {
    icon: DollarSign,
    title: 'Augmentez vos revenus',
    description: 'Sur Mybakup, vous avez la possibilité de majorer vos tarifs de consultation pour les voyageurs internationaux.',
    color: 'bg-green-50',
    textColor: 'text-green-600'
  },
  {
    icon: Calendar,
    title: 'Gérez vos rendez-vous efficacement',
    description: 'Vous êtes notifiés à chaque demande de rendez-vous et des rappels automatisés sont envoyés pour réduire les absences.',
    color: 'bg-purple-50',
    textColor: 'text-purple-600'
  },
  {
    icon: Settings,
    title: 'Simplifiez votre quotidien',
    description: 'Outils modernes pour gérer vos patients, paiements et réservations en toute sérénité.',
    color: 'bg-amber-50',
    textColor: 'text-amber-600'
  },
  {
    icon: Shield,
    title: 'Sécurité garantie',
    description: 'Données 100 % conformes aux normes HDS, RGPD et HIPAA pour protéger votre activité et vos patients.',
    color: 'bg-red-50',
    textColor: 'text-red-600'
  },
  {
    icon: Star,
    title: 'Améliorez votre réputation',
    description: 'Recevez des recommandations de voyageurs et gagnez en visibilité.',
    color: 'bg-indigo-50',
    textColor: 'text-indigo-600'
  }
];

export default function PractitionerBenefits() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/profile-choice')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-mybakup-blue" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-mybakup-blue">
              Professionnel de santé
            </h1>
          </div>
          <img 
            src="https://i.imgur.com/jxMQcJi.png" 
            alt="MyBakup" 
            className="h-8"
          />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-mybakup-blue mb-4">
            Pourquoi rejoindre MyBakup ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Développez votre activité et simplifiez votre gestion quotidienne avec notre plateforme dédiée aux professionnels de santé.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-200"
              >
                <div className={`w-12 h-12 ${benefit.color} ${benefit.textColor} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-mybakup-blue mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => navigate('/practitioner-type')}
            className="px-8 py-3 bg-mybakup-coral text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors flex items-center gap-2"
          >
            <span>Continuer</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => {}} // This would open a detailed benefits page
            className="text-mybakup-blue hover:text-mybakup-coral transition-colors"
          >
            En savoir plus
          </button>
        </div>
      </main>
    </div>
  );
}