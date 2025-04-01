import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  X,
  Gift,
  FileText,
  ExternalLink,
  CreditCard,
  Clock,
  Phone,
  Mail,
  Check,
  Shield,
  Heart,
  Stethoscope,
  Pill,
  Baby,
  Smile,
  Eye
} from 'lucide-react';

const benefits = [
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

const partnerBenefits = [
  {
    title: "Téléconsultation gratuite",
    description: "Accès illimité aux consultations médicales en ligne 24/7"
  },
  {
    title: "Réseau de soins privilégié",
    description: "Tarifs négociés auprès de 8000 professionnels de santé"
  },
  {
    title: "Assistance voyage mondiale",
    description: "Couverture santé et assistance rapatriement incluses"
  },
  {
    title: "Programme de prévention",
    description: "Coaching santé et bien-être personnalisé"
  }
];

interface MarshAffinityProps {
  onClose?: () => void;
}

export default function MarshAffinity({ onClose }: MarshAffinityProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4">
          <div className="py-4 flex items-center justify-between">
            <img 
              src="https://i.imgur.com/marsh-logo.png"
              alt="Marsh Affinity"
              className="h-8"
            />
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#EDF5FF] to-[#FFE8E8] rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-4">
                <Shield className="w-8 h-8 text-mybakup-blue" />
                <h2 className="text-2xl font-bold text-mybakup-blue">
                  Vos services Marsh Affinity
                </h2>
              </div>
              <p className="text-gray-600">
                Accédez à tous vos avantages et services en tant qu'assuré Marsh Affinity
              </p>
              <button
                onClick={() => window.open('https://www.marsh.com', '_blank')}
                className="flex items-center gap-2 text-mybakup-blue hover:text-mybakup-blue/80"
              >
                <span>Accéder à mon espace personnel</span>
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
            <div className="w-full md:w-auto flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400&h=300"
                alt="Health Insurance"
                className="w-full md:w-[300px] h-[150px] object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Avantages Partenaires */}
        <section className="bg-white rounded-xl p-6 space-y-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-mybakup-blue">
              Vos avantages partenaires
            </h2>
            <Gift className="w-5 h-5 text-mybakup-coral" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partnerBenefits.map((benefit, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl border border-gray-200 hover:border-mybakup-coral transition-colors"
              >
                <h3 className="font-medium text-mybakup-blue mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Remboursements et garanties */}
        <section className="bg-white rounded-xl p-6 space-y-4 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-mybakup-blue">
              Vos garanties santé
            </h2>
            <FileText className="w-5 h-5 text-mybakup-coral" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 border border-gray-200"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#EDF5FF] text-mybakup-blue">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-mybakup-blue">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {benefit.description}
                    </p>
                    <p className="text-sm font-medium text-mybakup-coral mt-2">
                      {benefit.limit}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500">
              BR : Base de Remboursement de la Sécurité sociale
            </p>
          </div>
        </section>

        {/* Contact et assistance */}
        <section className="bg-white rounded-xl p-6 space-y-4 border border-gray-200">
          <h2 className="text-xl font-semibold text-mybakup-blue mb-4">
            Contact et assistance
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-mybakup-coral" />
              <div>
                <p className="font-medium text-mybakup-blue">Service client</p>
                <a href="tel:0800123456" className="text-gray-600 hover:underline">
                  0 800 123 456
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-mybakup-coral" />
              <div>
                <p className="font-medium text-mybakup-blue">Email</p>
                <a href="mailto:contact@marsh.com" className="text-gray-600 hover:underline">
                  contact@marsh.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-mybakup-coral" />
              <div>
                <p className="font-medium text-mybakup-blue">Horaires</p>
                <p className="text-gray-600">Du lundi au vendredi de 8h30 à 18h30</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services en ligne */}
        <section className="bg-white rounded-xl p-6 space-y-4 border border-gray-200">
          <h2 className="text-xl font-semibold text-mybakup-blue mb-4">
            Services en ligne
          </h2>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-green-100">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-mybakup-blue">
                  Suivi des remboursements
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Consultez vos remboursements en temps réel
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-green-100">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-mybakup-blue">
                  Carte de tiers payant
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Téléchargez votre carte de tiers payant
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-green-100">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-mybakup-blue">
                  Devis en ligne
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Obtenez un devis pour vos soins
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => window.open('https://www.marsh.com/fr/services/affinity', '_blank')}
            className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-mybakup-coral text-white rounded-xl hover:bg-opacity-90 transition-colors"
          >
            <span>Accéder à mon espace</span>
            <ExternalLink className="w-5 h-5" />
          </button>
        </section>
      </main>
    </div>
  );
}