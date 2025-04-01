import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Navigation2, Info, Phone, Clock, ChevronDown } from 'lucide-react';

interface CountryData {
  name: string;
  flag: string;
  alerts: {
    title: string;
    description: string;
  }[];
  emergencyNumbers: {
    service: string;
    number: string;
  }[];
  embassy: {
    address: string;
    phone: string;
    website: string;
  };
  consultationProcess: string[];
  healthInfo: {
    beforeTravel: string[];
    risks: string[];
    rules: string[];
  };
}

const mockCountryData: CountryData = {
  name: "Espagne",
  flag: "🇪🇸",
  alerts: [
    {
      title: "Sécurité Nationale",
      description: "Le gouvernement espagnol a relevé la posture du plan Vigipirate au niveau Urgence attentat, nécessitant une vigilance renforcée pour les ressortissants français résidant ou de passage à l'étranger."
    },
    {
      title: "Menace Terroriste",
      description: "Le ministère de l'Intérieur espagnol évalue la menace terroriste comme élevée. Une vigilance accrue est recommandée dans les lieux très fréquentés."
    }
  ],
  emergencyNumbers: [
    { service: "Urgences", number: "112" },
    { service: "Police", number: "091" },
    { service: "Pompiers", number: "080" },
    { service: "Samu", number: "061" }
  ],
  embassy: {
    address: "Calle de Salustiano Olózaga 9, 28001, Recoletos, Madrid, Comunidad de Madrid, ESP",
    phone: "+34914238900",
    website: "https://es.ambafrance.org/"
  },
  consultationProcess: [
    "À l'Arrivée : Il est courant d'avoir à présenter une pièce d'identité et votre carte de santé (publique ou privée) à la réception. Ensuite, vous attendrez dans la salle d'attente jusqu'à ce que le médecin vous appelle.",
    "Pendant la Consultation : Le médecin parlera généralement espagnol, mais de nombreux praticiens parlent aussi anglais ou français.",
    "Après la Consultation : Une ordonnance vous sera remise si nécessaire, à présenter dans n'importe quelle pharmacie."
  ],
  healthInfo: {
    beforeTravel: [
      "Vérifier la validité de votre carte européenne d'assurance maladie",
      "Mettre à jour vos vaccinations classiques",
      "Souscrire une assurance voyage couvrant les frais médicaux",
      "Préparer une trousse de premiers secours"
    ],
    risks: [
      "Exposition prolongée au soleil en été",
      "Déshydratation dans les régions chaudes",
      "Risques liés aux activités nautiques",
      "Présence de moustiques dans certaines régions"
    ],
    rules: [
      "Ne pas approcher les animaux errants et les chiens (risque de morsure et de rage)",
      "Veiller à sa sécurité routière (port de la ceinture de sécurité, port du casque en deux roues)",
      "Boire suffisamment d'eau en période de chaleur",
      "Se protéger du soleil avec une crème solaire adaptée"
    ]
  }
};

export default function TravelGuide() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isSectionExpanded = (sectionId: string) => {
    return expandedSections.includes(sectionId);
  };

  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      setIsSearching(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Here you would typically use a geocoding service
          setIsSearching(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsSearching(false);
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-[#424e6f]" />
          </button>
          <h1 className="ml-4 text-xl font-semibold text-[#424e6f]">
            Fiche pratique
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Search Section */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une ville ou un pays"
            className="w-full h-12 pl-10 pr-24 bg-white border border-gray-200 rounded-xl text-[#424e6f] focus:outline-none focus:border-[#ff3c00]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              onClick={handleGetLocation}
              className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <MapPin className="w-4 h-4" />
            </button>
            <button
              className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <Navigation2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Country Info */}
        <div className="space-y-6">
          {/* Country Header */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">{mockCountryData.flag}</span>
            <h2 className="text-2xl font-semibold text-[#424e6f]">
              {mockCountryData.name}
            </h2>
          </div>

          {/* Alerts */}
          <section>
            <h2 className="text-xl font-semibold text-[#424e6f] mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Actualités
            </h2>
            <div className="bg-white rounded-xl p-4 space-y-4">
              {mockCountryData.alerts.map((alert, index) => (
                <div key={index} className="space-y-1">
                  <h3 className="font-medium text-[#424e6f]">{alert.title}</h3>
                  <p className="text-gray-600">{alert.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Emergency Numbers */}
          <section>
            <h2 className="text-xl font-semibold text-[#424e6f] mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Numéros utiles
            </h2>
            <div className="bg-white rounded-xl p-4">
              <div className="space-y-2">
                {mockCountryData.emergencyNumbers.map((emergency, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-600">{emergency.service}</span>
                    <span className="font-medium text-[#424e6f]">{emergency.number}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Embassy Info */}
          <section>
            <h2 className="text-xl font-semibold text-[#424e6f] mb-4">
              Représentation française
            </h2>
            <div className="bg-white rounded-xl p-4 space-y-3">
              <h3 className="font-medium text-[#424e6f]">Ambassade</h3>
              <p className="text-gray-600">{mockCountryData.embassy.address}</p>
              <a 
                href={`tel:${mockCountryData.embassy.phone}`}
                className="text-[#ff3c00] block"
              >
                {mockCountryData.embassy.phone}
              </a>
              <a 
                href={mockCountryData.embassy.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#424e6f] block hover:underline"
              >
                {mockCountryData.embassy.website}
              </a>
            </div>
          </section>

          {/* Consultation Process */}
          <section>
            <h2 className="text-xl font-semibold text-[#424e6f] mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Déroulement d'une consultation
            </h2>
            <div className="bg-white rounded-xl p-4 space-y-4">
              {mockCountryData.consultationProcess.map((step, index) => (
                <p key={index} className="text-gray-600">{step}</p>
              ))}
            </div>
          </section>

          {/* Health Information */}
          <section>
            <h2 className="text-xl font-semibold text-[#424e6f] mb-4">
              Informations sanitaires
            </h2>
            <div className="space-y-4">
              <div 
                className="bg-white rounded-xl overflow-hidden"
                onClick={() => toggleSection('before-travel')}
              >
                <div className="p-4 flex items-center justify-between cursor-pointer">
                  <h3 className="font-medium text-[#424e6f]">AVANT LE DÉPART</h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#424e6f] transition-transform ${
                      isSectionExpanded('before-travel') ? 'transform rotate-180' : ''
                    }`} 
                  />
                </div>
                {isSectionExpanded('before-travel') && (
                  <div className="px-4 pb-4">
                    <ul className="space-y-2">
                      {mockCountryData.healthInfo.beforeTravel.map((item, index) => (
                        <li key={index} className="text-gray-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-[#ff3c00] rounded-full mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div 
                className="bg-white rounded-xl overflow-hidden"
                onClick={() => toggleSection('health-risks')}
              >
                <div className="p-4 flex items-center justify-between cursor-pointer">
                  <h3 className="font-medium text-[#424e6f]">RISQUES SANITAIRES</h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#424e6f] transition-transform ${
                      isSectionExpanded('health-risks') ? 'transform rotate-180' : ''
                    }`} 
                  />
                </div>
                {isSectionExpanded('health-risks') && (
                  <div className="px-4 pb-4">
                    <ul className="space-y-2">
                      {mockCountryData.healthInfo.risks.map((risk, index) => (
                        <li key={index} className="text-gray-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-[#ff3c00] rounded-full mt-2 flex-shrink-0" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div 
                className="bg-white rounded-xl overflow-hidden"
                onClick={() => toggleSection('simple-rules')}
              >
                <div className="p-4 flex items-center justify-between cursor-pointer">
                  <h3 className="font-medium text-[#424e6f]">QUELQUES RÈGLES SIMPLES</h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#424e6f] transition-transform ${
                      isSectionExpanded('simple-rules') ? 'transform rotate-180' : ''
                    }`} 
                  />
                </div>
                {isSectionExpanded('simple-rules') && (
                  <div className="px-4 pb-4">
                    <ul className="space-y-2">
                      {mockCountryData.healthInfo.rules.map((rule, index) => (
                        <li key={index} className="text-gray-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-[#ff3c00] rounded-full mt-2 flex-shrink-0" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}