import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Check, X } from 'lucide-react';

type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

interface TabInfo {
  status: AppointmentStatus;
  label: string;
  icon: React.ReactNode;
  count: number;
  color: string;
}

const mockAppointments = [
  {
    id: '1',
    status: 'pending',
    doctor: {
      name: 'Dr Sarah Chen',
      specialty: 'Généraliste',
      imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300'
    },
    date: '15 avril 2024',
    time: '14:30',
    location: 'Cabinet',
    address: '123 Medical Center, Paris'
  },
  {
    id: '2',
    status: 'confirmed',
    doctor: {
      name: 'Dr Jean Dupont',
      specialty: 'Dentiste',
      imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300'
    },
    date: '18 avril 2024',
    time: '10:00',
    location: 'Cabinet',
    address: '45 Avenue Health, Paris'
  },
  {
    id: '3',
    status: 'cancelled',
    doctor: {
      name: 'Dr Maria Rodriguez',
      specialty: 'Pédiatre',
      imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300'
    },
    date: '20 avril 2024',
    time: '15:45',
    location: 'Cabinet',
    address: '78 Rue des Enfants, Paris'
  },
  {
    id: '4',
    status: 'pending',
    doctor: {
      name: 'Dr Emma Bennett',
      specialty: 'Psychiatre',
      imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=300&h=300'
    },
    date: '22 avril 2024',
    time: '11:15',
    location: 'Téléconsultation',
    address: 'En ligne'
  },
  {
    id: '5',
    status: 'confirmed',
    doctor: {
      name: 'Dr Thomas Weber',
      specialty: 'Cardiologue',
      imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300'
    },
    date: '25 avril 2024',
    time: '16:30',
    location: 'Cabinet',
    address: '156 Boulevard Haussmann, Paris'
  }
];

export default function Appointments() {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState<AppointmentStatus>('confirmed');

  const tabs: TabInfo[] = [
    { 
      status: 'pending', 
      label: 'En attente', 
      icon: <Clock className="w-5 h-5" />, 
      count: mockAppointments.filter(apt => apt.status === 'pending').length,
      color: 'bg-amber-500'
    },
    { 
      status: 'confirmed', 
      label: 'Confirmés', 
      icon: <Check className="w-5 h-5" />, 
      count: mockAppointments.filter(apt => apt.status === 'confirmed').length,
      color: 'bg-green-500'
    },
    { 
      status: 'cancelled', 
      label: 'Annulés', 
      icon: <X className="w-5 h-5" />, 
      count: mockAppointments.filter(apt => apt.status === 'cancelled').length,
      color: 'bg-red-500'
    }
  ];

  const filteredAppointments = mockAppointments.filter(
    appointment => appointment.status === activeStatus
  );

  const handleAppointmentClick = (appointment: typeof mockAppointments[0]) => {
    if (appointment.status === 'pending') {
      navigate(`/appointments/pending/${appointment.id}`);
    } else {
      navigate(`/appointments/${appointment.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-mybakup-blue" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-mybakup-blue">
              Mes rendez-vous
            </h1>
          </div>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Status Tabs */}
        <div className="flex justify-between mb-6 bg-white rounded-2xl p-2">
          {tabs.map((tab) => (
            <button
              key={tab.status}
              onClick={() => setActiveStatus(tab.status)}
              className={`flex-1 relative py-3 px-4 rounded-xl transition-colors ${
                activeStatus === tab.status
                  ? 'bg-mybakup-blue text-white'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </div>
              {tab.count > 0 && (
                <span className={`absolute -top-2 -right-2 w-6 h-6 ${tab.color} text-white text-sm rounded-full flex items-center justify-center`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              onClick={() => handleAppointmentClick(appointment)}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <img
                  src={appointment.doctor.imageUrl}
                  alt={appointment.doctor.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-mybakup-blue">
                        {appointment.doctor.name}
                      </h3>
                      <p className="text-gray-600">{appointment.doctor.specialty}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                      appointment.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {appointment.status === 'confirmed' ? 'Confirmé' :
                       appointment.status === 'pending' ? 'En attente' :
                       'Annulé'}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{appointment.location}</span>
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    {appointment.address}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {filteredAppointments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Aucun rendez-vous {
                  activeStatus === 'confirmed' ? 'confirmé' :
                  activeStatus === 'pending' ? 'en attente' :
                  'annulé'
                }
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}