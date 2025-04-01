import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Globe2, 
  Plane,
  Shield,
  Check,
  Clock,
  Phone,
  MapPin,
  CreditCard,
  ChevronRight,
  Users
} from 'lucide-react';

interface InsuranceOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

interface InsuranceFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const insuranceOptions: InsuranceOption[] = [
  {
    id: 'expat',
    title: 'Assurance Expatrié',
    description: 'Protection complète pour votre vie à l\'étranger',
    icon: <Globe2 className="w-6 h-6 text-mybakup-blue" />,
    path: '/insurance/expat'
  },
  {
    id: 'travel',
    title: 'Assurance Voyage',
    description: 'Couverture pour vos déplacements temporaires',
    icon: <Plane className="w-6 h-6 text-mybakup-coral" />,
    path: '/insurance/travel'
  }
];

const features: InsuranceFeature[] = [
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Protection mondiale',
    description: 'Couverture dans plus de 190 pays'
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Assistance 24/7',
    description: 'Support multilingue disponible à tout moment'
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: 'Téléconsultation',
    description: 'Accès illimité aux médecins en ligne'
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: 'Réseau international',
    description: 'Accès à plus de 1 million de professionnels de santé'
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: 'Tiers payant',
    description: 'Pas d\'avance de frais avec nos partenaires'
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Couverture famille',
    description: 'Protection pour toute la famille'
  }
];

const partners = [
  {
    name: 'AXA International',
    logo: 'https://images.unsplash.com/photo-1614680376739-414d95ff43df?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    name: 'Allianz Care',
    logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    name: 'APRIL International',
    logo: 'https://images.unsplash.com/photo-1614680376408-16e874e1a25f?auto=format&fit=crop&q=80&w=100&h=100'
  }
];

export default function Insurance() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-mybakup-blue" />
          </button>
          <h1 className="ml-4 text-xl font-semibold text-mybakup-blue">
            Mon assurance
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#EDF5FF] to-[#FFE8E8] rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-mybakup-blue mb-4">
            Votre santé n'a pas de frontières
          </h2>
          <p className="text-gray-600 mb-6">
            Découvrez nos solutions d'assurance adaptées à votre mobilité internationale
          </p>
          <div className="flex flex-wrap gap-4">
            {insuranceOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setSelectedOption(option.id);
                  navigate(option.path);
                }}
                className="flex-1 min-w-[200px] bg-white rounded-xl p-6 hover:shadow-md transition-all border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gray-50">
                    {option.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-mybakup-blue">
                      {option.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {option.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section>
          <h2 className="text-xl font-semibold text-mybakup-blue mb-6">
            Nos garanties essentielles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:border-mybakup-coral transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#EDF5FF] text-mybakup-blue">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-mybakup-blue">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-mybakup-blue mb-6">
            Pourquoi nous choisir ?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-green-100">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-mybakup-blue">
                  Expertise internationale
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Plus de 20 ans d'expérience dans l'assurance internationale
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-green-100">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-mybakup-blue">
                  Devis personnalisé
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Solutions adaptées à votre situation et votre budget
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-green-100">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-mybakup-blue">
                  Gestion simplifiée
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Application mobile pour gérer vos remboursements facilement
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section>
          <h2 className="text-xl font-semibold text-mybakup-blue mb-6">
            Nos partenaires assureurs
          </h2>
          <div className="flex flex-wrap gap-6 items-center justify-center">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-16 h-16 object-contain"
                />
                <p className="text-sm text-center text-gray-600 mt-2">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}