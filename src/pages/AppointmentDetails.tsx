import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  Check,
  X,
  AlertCircle,
  Building2,
  Home
} from 'lucide-react';
import DelayNotificationModal from '../components/DelayNotificationModal';

// Mock appointment data - In a real app, this would come from an API
const mockAppointment = {
  id: '1',
  status: 'confirmed',
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
  date: '15 avril 2024',
  time: '14:30',
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
  price: 60,
  paymentStatus: 'pending',
  consultationType: 'Cabinet',
  notes: 'Première consultation pour un bilan général.'
};

export default function AppointmentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showDelayModal, setShowDelayModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-600 border-green-200';
      case 'pending':
        return 'bg-amber-100 text-amber-600 border-amber-200';
      case 'cancelled':
        return 'bg-red-100 text-red-600 border-red-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmé';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Check className="w-5 h-5" />;
      case 'cancelled':
        return <X className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const handleDelayConfirm = (delayMinutes: number) => {
    // Here you would typically make an API call to notify the practitioner
    alert(`Le praticien a été informé de votre retard de ${delayMinutes} minutes.`);
  };

  const openInGoogleMaps = () => {
    const { address, city, postalCode } = mockAppointment.location;
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
              Détails du rendez-vous
            </h1>
          </div>
          <div className={`px-4 py-2 rounded-full border ${getStatusColor(mockAppointment.status)} flex items-center gap-2`}>
            {getStatusIcon(mockAppointment.status)}
            <span>{getStatusText(mockAppointment.status)}</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Doctor Info */}
        <section className="bg-white rounded-xl p-6">
          <div className="flex items-center gap-4">
            <img
              src={mockAppointment.doctor.imageUrl}
              alt={mockAppointment.doctor.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div>
              <h2 className="font-semibold text-mybakup-blue">
                {mockAppointment.doctor.name}
              </h2>
              <p className="text-gray-600">{mockAppointment.doctor.specialty}</p>
            </div>
          </div>
        </section>

        {/* Patient Info */}
        <section className="bg-white rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-mybakup-blue flex items-center gap-2">
            <User className="w-5 h-5" />
            Patient
          </h3>
          <div className="space-y-2">
            <p className="text-mybakup-blue font-medium">{mockAppointment.patient.name}</p>
            <p className="text-gray-600">{mockAppointment.patient.age} ans • {mockAppointment.patient.gender}</p>
            <p className="text-gray-600">{mockAppointment.patient.phone}</p>
            <p className="text-gray-600">{mockAppointment.patient.email}</p>
          </div>
        </section>

        {/* Appointment Info */}
        <section className="bg-white rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-mybakup-blue">Informations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="text-mybakup-blue">{mockAppointment.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Heure</p>
                <p className="text-mybakup-blue">{mockAppointment.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {mockAppointment.consultationType === 'Cabinet' ? (
                <Building2 className="w-5 h-5 text-gray-400" />
              ) : (
                <Home className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <p className="text-sm text-gray-500">Type de consultation</p>
                <p className="text-mybakup-blue">{mockAppointment.consultationType}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Tarif consultation</p>
                <p className="text-mybakup-blue">{mockAppointment.price}€</p>
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
                {mockAppointment.location.address}
              </p>
              <p className="text-gray-600 hover:text-mybakup-coral">
                {mockAppointment.location.postalCode} {mockAppointment.location.city}
              </p>
            </button>
          </div>
          <div className="h-48 rounded-xl overflow-hidden mt-4">
            <iframe
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${mockAppointment.location.coordinates.longitude - 0.002}%2C${mockAppointment.location.coordinates.latitude - 0.002}%2C${mockAppointment.location.coordinates.longitude + 0.002}%2C${mockAppointment.location.coordinates.latitude + 0.002}&layer=mapnik&marker=${mockAppointment.location.coordinates.latitude}%2C${mockAppointment.location.coordinates.longitude}`}
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
              <a href={`tel:${mockAppointment.doctor.phone}`} className="text-mybakup-blue hover:underline">
                {mockAppointment.doctor.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <a href={`mailto:${mockAppointment.doctor.email}`} className="text-mybakup-blue hover:underline">
                {mockAppointment.doctor.email}
              </a>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="bg-white rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-mybakup-blue">Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
              <MessageCircle className="w-5 h-5 text-mybakup-coral" />
              <span className="text-gray-700">Message</span>
            </button>
            <button 
              onClick={() => setShowDelayModal(true)}
              className="flex items-center justify-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <AlertCircle className="w-5 h-5 text-mybakup-coral" />
              <span className="text-gray-700">Annoncer un retard</span>
            </button>
          </div>
        </section>

        {/* Notes */}
        <section className="bg-white rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-mybakup-blue">Notes</h3>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-gray-600">{mockAppointment.notes}</p>
          </div>
        </section>

        {/* Cancel Button */}
        {mockAppointment.status !== 'cancelled' && (
          <button 
            className="w-full py-3 text-red-500 font-medium hover:underline"
            onClick={() => {
              if (window.confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) {
                navigate('/appointments');
              }
            }}
          >
            Annuler le rendez-vous
          </button>
        )}
      </main>

      <DelayNotificationModal
        isOpen={showDelayModal}
        onClose={() => setShowDelayModal(false)}
        onConfirm={handleDelayConfirm}
      />
    </div>
  );
}