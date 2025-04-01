import React, { useState } from 'react';
import { MapPin, Star, Globe2, ArrowRight } from 'lucide-react';
import type { Doctor } from '../types';
import DoctorProfile from './DoctorProfile';

const featuredDoctor: Doctor = {
  id: '1',
  name: 'Dr. Sarah Chen',
  specialty: 'General Practitioner',
  languages: ['English', 'Mandarin', 'French'],
  address: '123 Medical Center, Paris',
  availability: ['Tomorrow at 10:00', 'Thursday at 14:00'],
  rating: 4.8,
  imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
  distance: '1.2 km',
  phone: '+33 1 23 45 67 89',
  consultationPrice: 60,
  officePictures: [
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800'
  ],
  qualifications: ['Board Certified', 'Family Medicine'],
  medicalActs: [
    { name: 'General Consultation', price: 60 },
    { name: 'Annual Check-up', price: 120 },
    { name: 'Vaccination', price: 40 }
  ],
  paymentMethods: ['Credit Card', 'Cash', 'Health Insurance Card'],
  openingHours: [
    { day: 'Monday', hours: '9:00 - 17:00' },
    { day: 'Tuesday', hours: '9:00 - 17:00' },
    { day: 'Wednesday', hours: '9:00 - 12:00' },
    { day: 'Thursday', hours: '9:00 - 17:00' },
    { day: 'Friday', hours: '9:00 - 16:00' }
  ],
  education: [
    'MD from Paris Descartes University, 2010',
    'Residency in Family Medicine, Hôpital Saint-Louis, 2013'
  ],
  experience: [
    '10+ years in Family Medicine',
    'Former Chief Resident at Hôpital Saint-Louis'
  ],
  insurance: ['CPAM', 'MGEN', 'Harmonie Mutuelle']
};

export default function FeaturedDoctors() {
  const [showProfile, setShowProfile] = useState(false);

  if (showProfile) {
    return (
      <DoctorProfile 
        doctor={featuredDoctor} 
        onClose={() => setShowProfile(false)} 
      />
    );
  }

  return (
    <section className="py-6">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-lg sm:text-xl font-semibold text-mybakup-blue mb-4">Nearest Available Doctor</h2>
        
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center p-4 gap-4">
            <div className="flex items-center sm:block">
              <div className="relative">
                <img
                  src={featuredDoctor.imageUrl}
                  alt={featuredDoctor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-mybakup-coral"
                />
                <div className="absolute -bottom-1 -right-1 bg-mybakup-coral text-white text-xs px-2 py-0.5 rounded-full">
                  {featuredDoctor.distance}
                </div>
              </div>
              <div className="ml-4 sm:ml-0 sm:mt-2 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-mybakup-blue">{featuredDoctor.name}</h3>
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-mybakup-coral fill-current" />
                    <span className="ml-1 text-gray-600">{featuredDoctor.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{featuredDoctor.specialty}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 justify-between">
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Globe2 className="w-4 h-4 mr-1 text-mybakup-blue" />
                  <span>{featuredDoctor.languages.slice(0, 2).join(', ')}</span>
                </div>
                <div className="flex items-center text-mybakup-coral">
                  <span className="font-medium">€{featuredDoctor.consultationPrice}</span>
                </div>
              </div>
              <button 
                onClick={() => setShowProfile(true)}
                className="w-full sm:w-auto flex items-center justify-center text-white bg-mybakup-blue hover:bg-mybakup-blue-dark px-4 py-2 rounded-lg transition-colors"
              >
                <span className="text-sm font-medium">Book Now</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}