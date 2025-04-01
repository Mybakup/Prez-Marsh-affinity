import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  CreditCard,
  MessageCircle,
  Building2,
  Home,
  AlertCircle,
  History
} from 'lucide-react';

// Mock appointment data - In a real app, this would come from an API
const mockPendingAppointment = {
  id: '1',
  status: 'pending',
  doctor: {
    name: 'Dr Sarah Chen',
    specialty: 'Généraliste',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
    phone: '+33 1 23 45 67 89',
    email: 'dr.chen@medical.com',
    coordinates: {
      latitude: 48.8566,
      longitude: 2.3522
    }
  },
  proposedDates: [
    { date: '15 avril 2024', time: '14:30' },
    { date: '16 avril 2024', time: '10:00' },
    { date: '16 avril 2024', time: '15:30' }
  ],
  location: {
    type: 'Cabinet',
    address: '123 Medical Center',
    city: 'Paris',
    postalCode: '75008',
    coordinates: {
      latitude: 48.8566,
      longitude: 2.3522
    }
  },
  patient: {
    name: 'John Doe',
    phone: '+33 6 12 34 56 78',
    email: 'john.doe@email.com',
    age: 35,
    gender: 'Homme'
  },
  estimatedPrice: 60,
  consultationType: 'Cabinet',
  notes: 'Première consultation pour un bilan général.',
  requestDate: '12 avril 2024'
};

export default function PendingAppointmentDetails() {
  const navigate = useNavigate();

  const openInGoogleMaps = () => {
    const { address, city, postalCode } = mockPendingAppointment.location;
    const query = encodeURIComponent(`${address}, ${postalCode} ${city}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/appointments')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-mybakup-blue" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-mybakup-blue">
              Demande de rendez-vous
            </h1>
          </div>
          <div className="px-4 py-2 rounded-full border bg-amber-100 text-amber-600 border-amber-200 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>En attente de réponse</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Request Status Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-800 font-medium">Demande en cours de traitement</p>
            <p className="text-amber-600 text-sm mt-1">
              Le praticien n'a pas encore répondu à votre demande. Vous serez notifié dès qu'une réponse sera disponible.
            </p>
          </div>
        </div>

        {/* Doctor Info */}
        <section className="bg-white rounded-xl p-6">
          <div className="flex items-center gap-4">
            <img
              src={mockPendingAppointment.doctor.imageUrl}
              alt={mockPendingAppointment.doctor.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div>
              <h2 className="font-semibold text-mybakup-blue">
                {mockPendingAppointment.doctor.name}
              </h2>
              <p className="text-gray-600">{mockPendingAppointment.doctor.specialty}</p>
            </div>
          </div>
        </section>

        {/* Proposed Dates */}
        <section className="bg-white rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <History className="w-5 h-5 text-mybakup-blue" />
            <h3 className="font-semibold text-mybakup-blue">Créneaux proposés</h3>
          </div>
          <div className="space-y-3">
            {mockPendingAppointment.proposedDates.map((slot, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-mybakup-blue">{slot.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-mybakup-blue">{slot.time}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Demande envoyée le {mockPendingAppointment.requestDate}
          </p>
        </section>

        {/* Patient Info */}
        <section className="bg-white rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-mybakup-blue flex items-center gap-2">
            <User className="w-5 h-5" />
            Patient
          </h3>
          <div className="space-y-2">
            <p className="text-mybakup-blue font-medium">{mockPendingAppointment.patient.name}</p>
            <p className="text-gray-600">{mockPendingAppointment.patient.age} ans • {mockPendingAppointment.patient.gender}</p>
            <p className="text-gray-600">{mockPendingAppointment.patient.phone}</p>
            <p className="text-gray-600">{mockPendingAppointment.patient.email}</p>
          </div>
        </section>

        {/* Consultation Info */}
        <section className="bg-white rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-mybakup-blue">Informations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              {mockPendingAppointment.consultationType === 'Cabinet' ? (
                <Building2 className="w-5 h-5 text-gray-400" />
              ) : (
                <Home className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <p className="text-sm text-gray-500">Type de consultation</p>
                <p className="text-mybakup-blue">{mockPendingAppointment.consultationType}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Tarif estimé</p>
                <p className="text-mybakup-blue">{mockPendingAppointment.estimatedPrice}€</p>
              </div>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="bg-white rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-mybakup-blue flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Localisation
          </h3>
          <div className="space-y-2">
            <button
              onClick={openInGoogleMaps}
              className="text-left hover:text-mybakup-coral transition-colors"
            >
              <p className="text-mybakup-blue hover:underline">
                {mockPendingAppointment.location.address}
              </p>
              <p className="text-gray-600 hover:text-mybakup-coral">
                {mockPendingAppointment.location.postalCode} {mockPendingAppointment.location.city}
              </p>
            </button>
          </div>
          <div className="h-48 rounded-xl overflow-hidden mt-4">
            <iframe
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${mockPendingAppointment.location.coordinates.longitude - 0.002}%2C${mockPendingAppointment.location.coordinates.latitude - 0.002}%2C${mockPendingAppointment.location.coordinates.longitude + 0.002}%2C${mockPendingAppointment.location.coordinates.latitude + 0.002}&layer=mapnik&marker=${mockPendingAppointment.location.coordinates.latitude}%2C${mockPendingAppointment.location.coordinates.longitude}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              title="Location map"
            />
          </div>
        </section>

        {/* Contact Info */}
        <section className="bg-white rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-mybakup-blue">Contact</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <a href={`tel:${mockPendingAppointment.doctor.phone}`} className="text-mybakup-blue hover:underline">
                {mockPendingAppointment.doctor.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <a href={`mailto:${mockPendingAppointment.doctor.email}`} className="text-mybakup-blue hover:underline">
                {mockPendingAppointment.doctor.email}
              </a>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="bg-white rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-mybakup-blue">Actions</h3>
          <div className="grid grid-cols-1 gap-4">
            <button className="flex items-center justify-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
              <MessageCircle className="w-5 h-5 text-mybakup-coral" />
              <span className="text-gray-700">Envoyer un message</span>
            </button>
          </div>
        </section>

        {/* Notes */}
        <section className="bg-white rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-mybakup-blue">Notes</h3>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-gray-600">{mockPendingAppointment.notes}</p>
          </div>
        </section>

        {/* Cancel Button */}
        <button 
          className="w-full py-3 text-red-500 font-medium hover:underline"
          onClick={() => {
            if (window.confirm('Êtes-vous sûr de vouloir annuler cette demande de rendez-vous ?')) {
              navigate('/appointments');
            }
          }}
        >
          Annuler la demande
        </button>
      </main>
    </div>
  );
}