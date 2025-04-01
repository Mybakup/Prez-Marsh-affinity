import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Menu, 
  Calendar as CalendarIcon, 
  Settings, 
  CalendarClock,
  Lock,
  Video,
  ArrowLeft
} from 'lucide-react';
import QuickStats from '../components/dashboard/QuickStats';
import QuickActions from '../components/dashboard/QuickActions';
import TodayAppointments from '../components/dashboard/TodayAppointments';
import AppointmentRequests from '../components/dashboard/AppointmentRequests';
import UnavailabilityModal from '../components/dashboard/UnavailabilityModal';
import type { AppointmentRequest } from '../types/appointments';

const initialMockAppointments: AppointmentRequest[] = [
  {
    id: 'pending_1',
    patient: {
      name: 'Emma Wilson',
      age: 28,
      gender: 'Female',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300',
      languages: ['English', 'French']
    },
    proposedDate: new Date().toISOString().split('T')[0],
    proposedTime: '09:30',
    alternativeDates: ['2024-04-16', '2024-04-17'],
    type: 'Cabinet',
    status: 'pending',
    isFirstVisit: true,
    pathologyType: 'ponctuelle',
    contact: {
      phone: '+33 6 12 34 56 78',
      email: 'emma.wilson@email.com'
    },
    source: {
      type: 'hotel',
      name: 'Hôtel Ritz Paris'
    }
  },
  {
    id: 'pending_2',
    patient: {
      name: 'James Chen',
      age: 35,
      gender: 'Male',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
      languages: ['English', 'Mandarin']
    },
    proposedDate: '2024-04-15',
    proposedTime: '14:00',
    alternativeDates: ['2024-04-16', '2024-04-17'],
    type: 'Cabinet',
    status: 'pending',
    isFirstVisit: false,
    pathologyType: 'recurrente',
    contact: {
      phone: '+33 6 23 45 67 89',
      email: 'james.chen@email.com'
    },
    source: {
      type: 'insurance',
      name: 'Malakoff Humanis'
    }
  }
];

export default function PractitionerDashboard() {
  const navigate = useNavigate();
  const [showAppointmentDetails, setShowAppointmentDetails] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [todayAppointments, setTodayAppointments] = useState<AppointmentRequest[]>([]);
  const [showUnavailabilityModal, setShowUnavailabilityModal] = useState(false);
  const [pendingAppointments, setPendingAppointments] = useState<AppointmentRequest[]>(initialMockAppointments);
  const [isInterestedInTeleconsult, setIsInterestedInTeleconsult] = useState(false);

  const handleAcceptAppointment = (appointment: AppointmentRequest) => {
    const today = new Date().toISOString().split('T')[0];
    setPendingAppointments(prev => prev.filter(apt => apt.id !== appointment.id));
    
    if (appointment.proposedDate === today) {
      setTodayAppointments(prev => [...prev, {
        ...appointment,
        id: `today-${appointment.id}`,
        status: 'waiting'
      }]);
    }
  };

  const handleStartConsultation = (appointmentId: string) => {
    setTodayAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'in_progress' }
          : apt
      )
    );
  };

  const renderSourceBadge = (source: { type: 'hotel' | 'agency' | 'insurance', name: string }) => {
    const badges = {
      hotel: 'bg-blue-50 text-blue-600',
      agency: 'bg-green-50 text-green-600',
      insurance: 'bg-purple-50 text-purple-600'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs ${badges[source.type]}`}>
        {source.name}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/practitioner-preview')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-mybakup-blue" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-mybakup-blue">
              Tableau de bord
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell className="w-6 h-6 text-mybakup-blue" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-mybakup-coral rounded-full" />
            </button>
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Menu className="w-6 h-6 text-mybakup-blue" />
            </button>
          </div>
        </div>

        {/* Menu déroulant */}
        {showMenu && (
          <div className="absolute right-4 top-16 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
            <div className="p-2">
              <button
                onClick={() => {
                  setShowUnavailabilityModal(true);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CalendarIcon className="w-5 h-5 text-mybakup-coral" />
                <span className="text-gray-700">Gérer mes indisponibilités</span>
              </button>
              <button 
                onClick={() => navigate('/settings')}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Paramètres</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <QuickStats />

            {/* Today's Appointments */}
            <TodayAppointments 
              appointments={todayAppointments}
              onStartConsultation={handleStartConsultation}
              renderSourceBadge={renderSourceBadge}
            />

            {/* Appointment Requests */}
            <section className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-mybakup-blue flex items-center gap-2">
                    <CalendarClock className="w-5 h-5" />
                    Demandes de rendez-vous
                  </h2>
                  <span className="px-3 py-1 bg-mybakup-coral/10 text-mybakup-coral text-sm rounded-full">
                    {pendingAppointments.length} en attente
                  </span>
                </div>
              </div>

              <AppointmentRequests 
                appointments={pendingAppointments}
                showAppointmentDetails={showAppointmentDetails}
                setShowAppointmentDetails={setShowAppointmentDetails}
                onAcceptAppointment={handleAcceptAppointment}
                renderSourceBadge={renderSourceBadge}
              />
            </section>

            {/* Upcoming Features */}
            <section className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-mybakup-blue flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Fonctionnalités à venir
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      disabled
                      className="flex items-center gap-3 px-6 py-3 bg-gray-100 text-gray-400 rounded-xl cursor-not-allowed"
                    >
                      <Video className="w-5 h-5" />
                      <span>Téléconsultation</span>
                      <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-500 text-xs rounded-full">
                        Bientôt disponible
                      </span>
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setIsInterestedInTeleconsult(!isInterestedInTeleconsult);
                      if (!isInterestedInTeleconsult) {
                        window.alert("Merci de votre intérêt ! Nous vous contacterons dès que la téléconsultation sera disponible.");
                      }
                    }}
                    className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                      isInterestedInTeleconsult
                        ? 'bg-green-50 text-green-600'
                        : 'text-mybakup-coral hover:bg-mybakup-coral/5'
                    }`}
                  >
                    {isInterestedInTeleconsult ? 'Intéressé ✓' : 'Ça m\'intéresse'}
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <section className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-mybakup-blue">
                  Actions rapides
                </h2>
              </div>
              <div className="p-4">
                <QuickActions />
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Modal d'indisponibilités */}
      <UnavailabilityModal 
        isOpen={showUnavailabilityModal}
        onClose={() => setShowUnavailabilityModal(false)}
      />
    </div>
  );
}