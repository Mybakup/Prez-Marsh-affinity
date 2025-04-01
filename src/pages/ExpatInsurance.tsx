import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Shield,
  Check,
  Globe2,
  Plane,
  Heart,
  Stethoscope,
  Pill,
  Baby,
  Smile,
  Eye,
  Phone,
  Clock,
  CreditCard,
  ArrowRight
} from 'lucide-react';

interface Coverage {
  icon: React.ReactNode;
  title: string;
  description: string;
  limit: string;
}

const coverages: Coverage[] = [
  {
    icon: <Stethoscope className="w-5 h-5" />,
    title: 'Frais médicaux',
    description: 'Prise en charge des soins courants et hospitalisation',
    limit: 'Jusqu\'à 1 000 000€'
  },
  {
    icon: <Pill className="w-5 h-5" />,
    title: 'Pharmacie',
    description: 'Médicaments prescrits et vaccins',
    limit: '100% des frais réels'
  },
  {
    icon: <Baby className="w-5 h-5" />,
    title: 'Maternité',
    description: 'Suivi de grossesse et accouchement',
    limit: 'Jusqu\'à 12 000€'
  },
  {
    icon: <Smile className="w-5 h-5" />,
    title: 'Dentaire',
    description: 'Soins, prothèses et implants',
    limit: 'Jusqu\'à 2 000€/an'
  },
  {
    icon: <Eye className="w-5 h-5" />,
    title: 'Optique',
    description: 'Montures, verres et lentilles',
    limit: 'Jusqu\'à 600€/an'
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: 'Prévention',
    description: 'Bilans de santé et dépistages',
    limit: '100% des frais réels'
  }
];

const features = [
  {
    icon: <Globe2 className="w-5 h-5" />,
    title: 'Couverture mondiale',
    description: 'Protection dans plus de 190 pays'
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: 'Assistance 24/7',
    description: 'Support multilingue disponible à tout moment'
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Tiers payant',
    description: 'Pas d\'avance de frais avec nos partenaires'
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: 'Remboursements rapides',
    description: 'Sous 48h après réception du dossier'
  }
];

export default function ExpatInsurance() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/insurance')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-mybakup-blue" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-mybakup-blue">
              Assurance Expatrié
            </h1>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1614680376408-16e874e1a25f?auto=format&fit=crop&q=80&w=100&h=100"
            alt="APRIL International"
            className="h-8 w-8 object-contain"
          />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#EDF5FF] to-[#FFE8E8] rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-4">
                <Shield className="w-8 h-8 text-mybakup-blue" />
                <h2 className="text-2xl font-bold text-mybakup-blue">
                  APRIL International Expat
                </h2>
              </div>
              <p className="text-gray-600">
                Une couverture santé complète pour votre expatriation, adaptée à vos besoins et à ceux de votre famille.
              </p>
              <button
                onClick={() => window.open('https://fr.april-international.com', '_blank')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-mybakup-coral text-white rounded-xl hover:bg-opacity-90 transition-colors"
              >
                <span>En savoir plus</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="w-full md:w-auto flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=400&h=300"
                alt="Moving abroad"
                className="w-full md:w-[300px] h-[150px] object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Coverage Grid */}
        <section>
          <h2 className="text-xl font-semibold text-mybakup-blue mb-6">
            Garanties incluses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coverages.map((coverage, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#EDF5FF] text-mybakup-blue">
                    {coverage.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-mybakup-blue">
                      {coverage.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {coverage.description}
                    </p>
                    <p className="text-sm font-medium text-mybakup-coral mt-2">
                      {coverage.limit}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-xl font-semibold text-mybakup-blue mb-6">
            Les plus APRIL International
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-200"
              >
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
            ))}
          </div>
        </section>

        {/* Additional Benefits */}
        <section className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-mybakup-blue mb-6">
            Services inclus
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-green-100">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-mybakup-blue">
                  Application mobile dédiée
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Gérez vos remboursements et accédez à votre carte de tiers-payant
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-green-100">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-mybakup-blue">
                  Téléconsultation 24/7
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Consultez un médecin en ligne à tout moment
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-green-100">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-mybakup-blue">
                  Second avis médical
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Obtenez l'avis d'un expert pour les cas complexes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-xl p-6 border border-gray-200 text-center">
          <h2 className="text-xl font-semibold text-mybakup-blue mb-4">
            Prêt à partir sereinement ?
          </h2>
          <p className="text-gray-600 mb-6">
            Obtenez un devis personnalisé en quelques minutes
          </p>
          <button
            onClick={() => window.open('https://fr.april-international.com/devis', '_blank')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-mybakup-coral text-white rounded-xl hover:bg-opacity-90 transition-colors"
          >
            <span>Obtenir un devis</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </section>
      </main>
    </div>
  );
}