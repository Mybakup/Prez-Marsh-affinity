import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Globe2, 
  Clock, 
  MapPin, 
  CreditCard, 
  GraduationCap, 
  Stethoscope, 
  Shield,
  Check,
  Edit
} from 'lucide-react';

export default function PractitionerPreview() {
  const navigate = useNavigate();

  const mockDoctor = {
    name: 'Dr. Sarah Chen',
    specialty: 'Médecin généraliste',
    languages: ['Français', 'Anglais', 'Mandarin'],
    address: '123 Medical Center, Paris',
    availability: ['Lundi - Vendredi', '9:00 - 18:00'],
    rating: 'Nouveau',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
    distance: '1.2 km',
    phone: '+33 1 23 45 67 89',
    consultationPrice: 60,
    medicalActs: [
      { name: 'Consultation générale', price: 60 },
      { name: 'Bilan annuel', price: 120 },
      { name: 'Vaccination', price: 40 }
    ],
    paymentMethods: ['Carte bancaire', 'Espèces', 'Carte Vitale'],
    openingHours: [
      { day: 'Lundi', hours: '9:00 - 17:00' },
      { day: 'Mardi', hours: '9:00 - 17:00' },
      { day: 'Mercredi', hours: '9:00 - 12:00' },
      { day: 'Jeudi', hours: '9:00 - 17:00' },
      { day: 'Vendredi', hours: '9:00 - 16:00' }
    ],
    education: [
      'Doctorat en Médecine - Université Paris Descartes, 2010',
      'Internat en Médecine Générale - Hôpital Saint-Louis, 2013'
    ],
    experience: [
      '10+ ans en Médecine Générale',
      'Ancien Chef de Service - Hôpital Saint-Louis'
    ],
    insurance: ['CPAM', 'MGEN', 'Harmonie Mutuelle'],
    description: "Spécialisée en médecine générale avec une approche holistique de la santé. Je m'engage à fournir des soins personnalisés et à prendre le temps nécessaire pour comprendre les besoins de chaque patient."
  };

  return (
    <div className="min-h-screen bg-[#EDF5FF]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/practitioner-info')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-mybakup-blue" />
          </button>
          <h1 className="text-xl font-semibold text-mybakup-blue">
            Prévisualisation de votre profil
          </h1>
          <button
            onClick={() => navigate('/practitioner-info')}
            className="flex items-center gap-2 text-mybakup-coral hover:text-mybakup-coral/80"
          >
            <Edit className="w-5 h-5" />
            <span className="text-sm">Modifier</span>
          </button>
        </div>
      </header>

      {/* Preview Banner */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
            <Check className="w-5 h-5" />
            <span className="font-medium">Voici comment votre profil apparaîtra aux voyageurs</span>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center gap-6">
              <img
                src={mockDoctor.imageUrl}
                alt={mockDoctor.name}
                className="w-24 h-24 rounded-xl object-cover"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-semibold text-mybakup-blue">
                    {mockDoctor.name}
                  </h2>
                  <span className="px-2 py-1 bg-mybakup-coral/10 text-mybakup-coral text-sm rounded-full">
                    {mockDoctor.rating}
                  </span>
                </div>
                <p className="text-gray-600">{mockDoctor.specialty}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{mockDoctor.distance}</span>
                </div>
              </div>
            </div>

            <p className="mt-6 text-gray-600">
              {mockDoctor.description}
            </p>
          </div>

          {/* Languages */}
          <section className="bg-white rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe2 className="w-5 h-5 text-mybakup-coral" />
              <h3 className="font-semibold text-mybakup-blue">Langues parlées</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {mockDoctor.languages.map((lang) => (
                <span 
                  key={lang}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                >
                  {lang}
                </span>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="bg-white rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Stethoscope className="w-5 h-5 text-mybakup-coral" />
              <h3 className="font-semibold text-mybakup-blue">Expérience</h3>
            </div>
            <div className="space-y-2">
              {mockDoctor.experience.map((exp, index) => (
                <p key={index} className="text-gray-600">{exp}</p>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="bg-white rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-mybakup-coral" />
              <h3 className="font-semibold text-mybakup-blue">Formation</h3>
            </div>
            <div className="space-y-2">
              {mockDoctor.education.map((edu, index) => (
                <p key={index} className="text-gray-600">{edu}</p>
              ))}
            </div>
          </section>

          {/* Consultation Fees */}
          <section className="bg-white rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-mybakup-coral" />
              <h3 className="font-semibold text-mybakup-blue">Tarifs</h3>
            </div>
            <div className="space-y-3">
              {mockDoctor.medicalActs.map((act) => (
                <div key={act.name} className="flex justify-between items-center">
                  <span className="text-gray-600">{act.name}</span>
                  <span className="font-medium text-mybakup-blue">€{act.price}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Payment Methods */}
          <section className="bg-white rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-mybakup-coral" />
              <h3 className="font-semibold text-mybakup-blue">Moyens de paiement</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {mockDoctor.paymentMethods.map((method) => (
                <span 
                  key={method}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                >
                  {method}
                </span>
              ))}
            </div>
          </section>

          {/* Insurance */}
          <section className="bg-white rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-mybakup-coral" />
              <h3 className="font-semibold text-mybakup-blue">Assurances acceptées</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {mockDoctor.insurance.map((ins) => (
                <span 
                  key={ins}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                >
                  {ins}
                </span>
              ))}
            </div>
          </section>

          {/* Opening Hours */}
          <section className="bg-white rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-mybakup-coral" />
              <h3 className="font-semibold text-mybakup-blue">Horaires d'ouverture</h3>
            </div>
            <div className="space-y-2">
              {mockDoctor.openingHours.map(({ day, hours }) => (
                <div key={day} className="flex justify-between">
                  <span className="text-gray-600">{day}</span>
                  <span className="font-medium text-mybakup-blue">{hours}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-4">
          <button
            onClick={() => navigate('/practitioner-dashboard')}
            className="w-full py-3 bg-mybakup-coral text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors"
          >
            Accéder à mon tableau de bord
          </button>
          <button
            onClick={() => navigate('/practitioner-info')}
            className="w-full py-3 border border-mybakup-coral text-mybakup-coral rounded-xl font-medium hover:bg-mybakup-coral/5 transition-colors"
          >
            Modifier mes informations
          </button>
        </div>
      </main>
    </div>
  );
}