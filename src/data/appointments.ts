export const nextAppointment = {
  id: '1',
  doctor: {
    id: '1',
    name: 'Dr. Sarah Chen',
    specialty: 'Généraliste',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
    languages: ['English', 'Mandarin', 'French'],
    address: '123 Medical Center, Paris',
    availability: ['Tomorrow at 10:00', 'Thursday at 14:00'],
    rating: 4.8,
    distance: '1.2 km',
    phone: '+33 1 23 45 67 89',
    consultationPrice: 60,
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
    insurance: ['CPAM', 'MGEN', 'Harmonie Mutuelle'],
    officePictures: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800'
    ],
    qualifications: ['Board Certified', 'Family Medicine']
  },
  date: '2 avril 2024',
  time: '14:30',
  type: 'Cabinet'
};

export const pastAppointments = [
  {
    id: '2',
    date: '2 juin 2023',
    time: '09:30',
    doctor: {
      name: 'Dr Virginie USOLINI',
      specialty: 'Laboratoire',
      imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300'
    },
    type: 'Cabinet'
  },
  {
    id: '3',
    date: '28 décembre 2023',
    time: '09:00',
    doctor: {
      name: 'Dr Romain O.',
      specialty: 'Médecin généraliste',
      imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300'
    },
    type: 'Cabinet'
  }
];