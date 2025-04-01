import React from 'react';
import DoctorCard from './DoctorCard';
import DoctorMap from './DoctorMap';
import type { Doctor } from '../types';

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    specialty: 'General Practitioner',
    languages: ['English', 'Mandarin', 'French'],
    address: '123 Medical Center, Paris',
    availability: ['Tomorrow at 10:00', 'Thursday at 14:00'],
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
    officePictures: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=800'
    ],
    qualifications: ['Board Certified', 'Family Medicine'],
    distance: '1.2 km',
    phone: '+33 1 23 45 67 89',
    consultationPrice: 60,
    medicalActs: [
      { name: 'General Consultation', price: 60 },
      { name: 'Annual Check-up', price: 120 },
      { name: 'Vaccination', price: 40 },
      { name: 'Blood Test', price: 50 }
    ],
    paymentMethods: ['Credit Card', 'Cash', 'Health Insurance Card'],
    openingHours: [
      { day: 'Monday', hours: '9:00 - 17:00' },
      { day: 'Tuesday', hours: '9:00 - 17:00' },
      { day: 'Wednesday', hours: '9:00 - 12:00' },
      { day: 'Thursday', hours: '9:00 - 17:00' },
      { day: 'Friday', hours: '9:00 - 16:00' },
      { day: 'Saturday', hours: '10:00 - 12:00' },
      { day: 'Sunday', hours: 'Closed' }
    ],
    education: [
      'MD from Paris Descartes University, 2010',
      'Residency in Family Medicine, Hôpital Saint-Louis, 2013',
      'Fellowship in Primary Care, 2014'
    ],
    experience: [
      '10+ years in Family Medicine',
      'Former Chief Resident at Hôpital Saint-Louis'
    ],
    insurance: ['CPAM', 'MGEN', 'Harmonie Mutuelle', 'Allianz']
  },
  {
    id: '2',
    name: 'Dr. Jean Dupont',
    specialty: 'Dentist',
    languages: ['French', 'English'],
    address: '45 Avenue Health, Paris',
    availability: ['Today at 16:00', 'Friday at 11:00'],
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300',
    officePictures: [
      'https://images.unsplash.com/photo-1629909615032-f306a4f92f67?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=800'
    ],
    qualifications: ['Dental Surgery Specialist', 'Orthodontics'],
    distance: '2.5 km',
    phone: '+33 1 98 76 54 32',
    consultationPrice: 80,
    medicalActs: [
      { name: 'Dental Check-up', price: 80 },
      { name: 'Cleaning', price: 100 },
      { name: 'Filling', price: 120 },
      { name: 'Root Canal', price: 500 }
    ],
    paymentMethods: ['Credit Card', 'Cash', 'Check'],
    openingHours: [
      { day: 'Monday', hours: '8:30 - 18:00' },
      { day: 'Tuesday', hours: '8:30 - 18:00' },
      { day: 'Wednesday', hours: '8:30 - 18:00' },
      { day: 'Thursday', hours: '8:30 - 18:00' },
      { day: 'Friday', hours: '8:30 - 16:00' },
      { day: 'Saturday', hours: 'By appointment' },
      { day: 'Sunday', hours: 'Closed' }
    ],
    education: [
      'DDS from University of Paris, 2008',
      'Advanced Certificate in Orthodontics, 2010'
    ],
    experience: [
      '12+ years in Dental Practice',
      'Specialist in Pediatric Dentistry'
    ],
    insurance: ['CPAM', 'Mutuelle Générale', 'AXA', 'SwissLife']
  },
  {
    id: '3',
    name: 'Dr. Maria Rodriguez',
    specialty: 'Pediatrician',
    languages: ['Spanish', 'English', 'French'],
    address: '78 Rue des Enfants, Paris',
    availability: ['Tomorrow at 9:00', 'Wednesday at 15:00'],
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
    officePictures: [
      'https://images.unsplash.com/photo-1631217868624-85d89197f5fc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1631217868288-0b8b4eaa3f44?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1631217868814-804a1c4178a6?auto=format&fit=crop&q=80&w=800'
    ],
    qualifications: ['Board Certified Pediatrician', 'Child Development Specialist'],
    distance: '1.8 km',
    phone: '+33 1 34 56 78 90',
    consultationPrice: 70,
    medicalActs: [
      { name: 'Pediatric Consultation', price: 70 },
      { name: 'Vaccination', price: 45 },
      { name: 'Growth Assessment', price: 60 },
      { name: 'Development Check', price: 80 }
    ],
    paymentMethods: ['Credit Card', 'Cash', 'Health Insurance Card', 'Mobile Payment'],
    openingHours: [
      { day: 'Monday', hours: '8:00 - 16:00' },
      { day: 'Tuesday', hours: '8:00 - 16:00' },
      { day: 'Wednesday', hours: '8:00 - 16:00' },
      { day: 'Thursday', hours: '8:00 - 16:00' },
      { day: 'Friday', hours: '8:00 - 14:00' },
      { day: 'Saturday', hours: '9:00 - 12:00' },
      { day: 'Sunday', hours: 'Closed' }
    ],
    education: [
      'MD from Universidad de Barcelona, 2009',
      'Pediatric Residency at Necker-Enfants Malades Hospital, 2013',
      'Fellowship in Child Development, 2014'
    ],
    experience: [
      '11+ years in Pediatrics',
      'Former Head of Pediatrics at Clinique des Enfants',
      'Research in Early Childhood Development'
    ],
    insurance: ['CPAM', 'MGEN', 'Malakoff Humanis', 'April']
  },
  {
    id: '4',
    name: 'Dr. Amir Patel',
    specialty: 'Cardiologist',
    languages: ['English', 'Hindi', 'French', 'Arabic'],
    address: '156 Boulevard Haussmann, Paris',
    availability: ['Friday at 10:30', 'Monday at 14:00'],
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
    officePictures: [
      'https://images.unsplash.com/photo-1631217868475-86e29e665baf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1631217868537-35b26460c9db?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1631217868584-24d7c4a08e45?auto=format&fit=crop&q=80&w=800'
    ],
    qualifications: ['Interventional Cardiology', 'Echocardiography'],
    distance: '3.1 km',
    phone: '+33 1 87 65 43 21',
    consultationPrice: 120,
    medicalActs: [
      { name: 'Cardiac Consultation', price: 120 },
      { name: 'ECG', price: 80 },
      { name: 'Stress Test', price: 200 },
      { name: 'Echocardiogram', price: 250 }
    ],
    paymentMethods: ['Credit Card', 'Bank Transfer', 'Health Insurance Card'],
    openingHours: [
      { day: 'Monday', hours: '9:30 - 18:00' },
      { day: 'Tuesday', hours: '9:30 - 18:00' },
      { day: 'Wednesday', hours: '9:30 - 18:00' },
      { day: 'Thursday', hours: '9:30 - 18:00' },
      { day: 'Friday', hours: '9:30 - 16:00' },
      { day: 'Saturday', hours: 'By appointment' },
      { day: 'Sunday', hours: 'Closed' }
    ],
    education: [
      'MBBS from All India Institute of Medical Sciences, 2005',
      'Cardiology Fellowship at Pitié-Salpêtrière Hospital, 2011',
      'Advanced Training in Interventional Cardiology, 2013'
    ],
    experience: [
      '15+ years in Cardiology',
      'Director of Cardiac Research at Paris Heart Institute',
      'Published researcher in cardiovascular medicine'
    ],
    insurance: ['CPAM', 'Allianz', 'AXA', 'Generali', 'SwissLife']
  }
];

export default function SearchResults({ query }: { query: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Search Results</h2>
          <p className="text-gray-600">Found {mockDoctors.length} doctors for "{query}"</p>
        </div>
        {mockDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
      <div className="lg:sticky lg:top-6 h-fit">
        <DoctorMap doctors={mockDoctors} />
      </div>
    </div>
  );
}