import React from 'react';
import { ArrowLeft, HelpCircle, Calendar, Clock, MapPin, User, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AppointmentDetailsProps {
  appointment: {
    id: string;
    date: string;
    time: string;
    doctor: {
      name: string;
      specialty: string;
      imageUrl: string;
    };
    patient: {
      name: string;
      gender: string;
      age: number;
      phone: string;
    };
    location: {
      type: string;
      address: string;
      city: string;
      country: string;
      phone: string;
    };
    price: number;
  };
}

export default function AppointmentDetails({ appointment }: AppointmentDetailsProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-[#47559E]" />
          </button>
          <h1 className="text-xl font-semibold text-[#47559E]">
            Détails du rendez-vous
          </h1>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <HelpCircle className="w-6 h-6 text-[#47559E]" />
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Date and Time */}
        <div className="bg-[#FFF8F8] rounded-xl p-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#47559E]" />
            <span className="text-[#47559E] font-medium">{appointment.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#47559E]" />
            <span className="text-[#47559E] font-medium">{appointment.time}</span>
          </div>
        </div>

        {/* Doctor Info */}
        <div className="bg-white rounded-xl p-6 space-y-4">
          <h2 className="text-xl text-[#47559E] font-semibold">
            Votre demande de rendez-vous
          </h2>
          
          <div className="flex items-center gap-4">
            <img
              src={appointment.doctor.imageUrl}
              alt={appointment.doctor.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-[#47559E]">
                {appointment.doctor.name}
              </h3>
              <p className="text-gray-600">{appointment.doctor.specialty}</p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#47559E]" />
            <h2 className="text-lg font-semibold text-[#47559E]">
              Lieu du rendez-vous
            </h2>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-[#47559E]">{appointment.location.type}</h3>
            <p className="text-gray-600">{appointment.location.address}</p>
            <p className="text-gray-600">{appointment.location.city}</p>
            <p className="text-gray-600">{appointment.location.country}</p>
            <a 
              href={`tel:${appointment.location.phone}`}
              className="text-[#47559E] block"
            >
              {appointment.location.phone}
            </a>
          </div>

          <div className="h-48 bg-gray-200 rounded-xl overflow-hidden">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=151.2053%2C-33.8688%2C151.2093%2C-33.8658&layer=mapnik"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              title="Location map"
            />
          </div>
        </div>

        {/* Patient Info */}
        <div className="bg-white rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#47559E]" />
            <h2 className="text-lg font-semibold text-[#47559E]">Patient</h2>
          </div>

          <div className="space-y-2">
            <p className="text-[#47559E] font-medium">{appointment.patient.name}</p>
            <p className="text-gray-600">{appointment.patient.gender}</p>
            <p className="text-gray-600">{appointment.patient.age} ans</p>
            <a 
              href={`tel:${appointment.patient.phone}`}
              className="text-[#47559E] block"
            >
              {appointment.patient.phone}
            </a>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#47559E]" />
            <h2 className="text-lg font-semibold text-[#47559E]">Paiement</h2>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Estimation des frais de consultation :</span>
            <span className="text-[#47559E] font-medium">{appointment.price}€</span>
          </div>

          <div className="flex justify-center">
            <img
              src="https://i.imgur.com/YJ1fRz6.png"
              alt="Payment methods"
              className="h-8"
            />
          </div>
        </div>

        {/* Cancel Button */}
        <button 
          className="w-full py-3 text-red-500 font-medium hover:underline"
          onClick={() => {
            // Handle cancellation
            if (window.confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) {
              navigate('/appointments');
            }
          }}
        >
          Annuler le rendez-vous
        </button>
      </main>
    </div>
  );
}