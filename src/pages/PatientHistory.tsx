import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Calendar, Clock, MapPin, User, Phone, Mail, FileText, Star } from 'lucide-react';
import PatientList from '../components/patients/PatientList';
import PatientFilters from '../components/patients/PatientFilters';
import AppointmentTimeline from '../components/patients/AppointmentTimeline';
import { formatDate } from '../utils/dateUtils';

// Mock data
const mockPatients = [
  {
    id: '1',
    name: 'Emma Wilson',
    age: 28,
    gender: 'Female',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300',
    phone: '+33 6 12 34 56 78',
    email: 'emma.wilson@email.com',
    lastVisit: '2024-03-15',
    nextAppointment: '2024-04-20',
    totalVisits: 5,
    conditions: ['Hypertension', 'Asthma'],
    appointments: [
      {
        id: 'apt1',
        date: '2024-03-15',
        time: '14:30',
        type: 'Consultation',
        notes: 'Regular check-up, blood pressure stable',
        prescription: true,
        followUp: true
      },
      {
        id: 'apt2',
        date: '2024-02-01',
        time: '10:00',
        type: 'Urgence',
        notes: 'Crise d\'asthme légère',
        prescription: true,
        followUp: false
      }
    ]
  },
  {
    id: '2',
    name: 'James Chen',
    age: 35,
    gender: 'Male',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
    phone: '+33 6 23 45 67 89',
    email: 'james.chen@email.com',
    lastVisit: '2024-03-20',
    nextAppointment: '2024-04-15',
    totalVisits: 3,
    conditions: ['Diabète type 2'],
    appointments: [
      {
        id: 'apt3',
        date: '2024-03-20',
        time: '09:30',
        type: 'Consultation',
        notes: 'Suivi diabète, HbA1c en amélioration',
        prescription: true,
        followUp: true
      }
    ]
  }
];

export default function PatientHistory() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const patient = selectedPatient 
    ? mockPatients.find(p => p.id === selectedPatient)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/practitioner-dashboard')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-mybakup-blue" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-mybakup-blue">
              Historique des patients
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Patient List */}
          <div className="lg:col-span-1 space-y-4">
            {/* Search and Filter */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un patient..."
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50"
              >
                <Filter className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Filters */}
            {showFilters && <PatientFilters />}

            {/* Patient List */}
            <PatientList
              patients={mockPatients}
              selectedPatientId={selectedPatient}
              onPatientSelect={setSelectedPatient}
            />
          </div>

          {/* Right Column - Patient Details & Timeline */}
          <div className="lg:col-span-2">
            {patient ? (
              <div className="space-y-6">
                {/* Patient Info Card */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-start gap-4">
                    <img
                      src={patient.imageUrl}
                      alt={patient.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-xl font-semibold text-mybakup-blue">
                            {patient.name}
                          </h2>
                          <p className="text-gray-600">
                            {patient.age} ans • {patient.gender}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total des visites</p>
                          <p className="text-xl font-semibold text-mybakup-coral">
                            {patient.totalVisits}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <a href={`tel:${patient.phone}`} className="text-mybakup-blue hover:underline">
                            {patient.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <a href={`mailto:${patient.email}`} className="text-mybakup-blue hover:underline">
                            {patient.email}
                          </a>
                        </div>
                      </div>

                      {patient.conditions.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-500 mb-2">Conditions médicales :</p>
                          <div className="flex flex-wrap gap-2">
                            {patient.conditions.map((condition, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm"
                              >
                                {condition}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Appointment Timeline */}
                <AppointmentTimeline appointments={patient.appointments} />
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
                <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Sélectionnez un patient
                </h3>
                <p className="text-gray-500">
                  Choisissez un patient dans la liste pour voir son historique complet
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}