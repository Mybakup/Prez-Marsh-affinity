import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  Globe, 
  Bell, 
  Gift,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';

const reservations = [
  {
    id: 'RES001',
    destination: 'Bali, Indonésie',
    dates: '15-30 Juin 2024',
    status: 'confirmed',
    alerts: [
      { type: 'info', message: 'Enregistrement en ligne disponible dans 48h' }
    ]
  },
  {
    id: 'RES002',
    destination: 'Tokyo, Japon',
    dates: '10-25 Septembre 2024',
    status: 'pending',
    alerts: [
      { type: 'warning', message: 'Confirmation de l\'hôtel en attente' }
    ]
  }
];

const alerts = [
  {
    type: 'info',
    message: 'Rappel : Votre prochain voyage à Bali approche',
    date: '2024-06-13'
  },
  {
    type: 'warning',
    message: 'Alerte météo : Typhon prévu à Tokyo pendant votre séjour',
    date: '2024-09-08'
  }
];

interface CarrefourVoyagesProps {
  onClose?: () => void;
}

export default function CarrefourVoyages({ onClose }: CarrefourVoyagesProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmé';
      case 'pending':
        return 'En attente';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4">
          <div className="py-4 flex items-center justify-between">
            <img 
              src="https://i.imgur.com/YwXqXR3.png"
              alt="Carrefour Voyages"
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
        {/* Informations Agence */}
        <section className="bg-white rounded-xl p-6 space-y-4 border border-gray-200">
          <h2 className="text-xl font-semibold text-[#0063D0]">
            Votre agence Carrefour Voyages
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#0063D0]" />
              <a href="mailto:contact@carrefour-voyages.fr" className="hover:underline">
                contact@carrefour-voyages.fr
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#0063D0]" />
              <a href="tel:+33142561789" className="hover:underline">
                01 42 56 17 89
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-[#0063D0]" />
              <a 
                href="https://voyages.carrefour.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                voyages.carrefour.fr
              </a>
            </div>
          </div>
        </section>

        {/* Réservations */}
        <section className="bg-white rounded-xl p-6 space-y-4 border border-gray-200">
          <h2 className="text-xl font-semibold text-[#0063D0] mb-4">
            Vos réservations
          </h2>

          <div className="space-y-4">
            {reservations.map((reservation) => (
              <div 
                key={reservation.id}
                className="border border-gray-200 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    {reservation.destination}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(reservation.status)}`}>
                    {getStatusText(reservation.status)}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{reservation.dates}</span>
                </div>

                {reservation.alerts.map((alert, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-2 rounded-lg"
                  >
                    <Bell className="w-4 h-4" />
                    <span>{alert.message}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Alertes */}
        <section className="bg-white rounded-xl p-6 space-y-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#0063D0]">
              Alertes et notifications
            </h2>
            <Bell className="w-5 h-5 text-[#0063D0]" />
          </div>

          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg flex items-start gap-3 ${
                  alert.type === 'warning' 
                    ? 'bg-yellow-50 text-yellow-800' 
                    : 'bg-blue-50 text-blue-800'
                }`}
              >
                {alert.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <Bell className="w-5 h-5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p>{alert.message}</p>
                  <p className="text-sm opacity-75 mt-1">
                    {new Date(alert.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Avantages */}
        <section className="bg-white rounded-xl p-6 space-y-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#0063D0]">
              Vos avantages
            </h2>
            <Gift className="w-5 h-5 text-[#0063D0]" />
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h3 className="font-medium">Programme de fidélité</h3>
              </div>
              <p className="text-gray-600">
                1500 points disponibles
              </p>
              <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-green-500 rounded-full" />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Plus que 500 points pour atteindre le statut Gold
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Gift className="w-5 h-5 text-[#ff3c00]" />
                <h3 className="font-medium">Code de réduction Mybakup</h3>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <span className="font-mono text-lg font-semibold">CARREFOUR2024</span>
                <p className="text-sm text-gray-600 mt-1">
                  -20% sur votre abonnement Mybakup
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}