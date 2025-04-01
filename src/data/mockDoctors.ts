import type { Doctor } from '../types';

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    specialty: 'Médecin généraliste',
    languages: ['English', 'Mandarin', 'French'],
    address: '123 Medical Center, Paris',
    availability: ['Tomorrow at 10:00', 'Thursday at 14:00'],
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
    officePictures: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800'
    ],
    qualifications: ['Board Certified', 'Family Medicine', 'Preventive Medicine'],
    distance: '1.2 km',
    phone: '+33 1 23 45 67 89',
    consultationPrice: 60,
    medicalActs: [
      { name: 'General Consultation', price: 60 },
      { name: 'Annual Check-up', price: 120 },
      { name: 'Vaccination', price: 40 },
      { name: 'Blood Test', price: 50 },
      { name: 'ECG', price: 75 }
    ],
    paymentMethods: ['Credit Card', 'Cash', 'Health Insurance Card', 'Apple Pay', 'Google Pay'],
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
      'Fellowship in Primary Care, 2014',
      'Master in Public Health, 2015'
    ],
    experience: [
      '10+ years in Family Medicine',
      'Former Chief Resident at Hôpital Saint-Louis',
      'Research in Preventive Medicine',
      'International Medical Experience in China and UK'
    ],
    insurance: ['CPAM', 'MGEN', 'Harmonie Mutuelle', 'Allianz', 'AXA', 'SwissLife']
  },
  {
    id: '2',
    name: 'Dr. Jean Dupont',
    specialty: 'Dentiste',
    languages: ['French', 'English', 'German'],
    address: '45 Avenue Health, Paris',
    availability: ['Today at 16:00', 'Friday at 11:00'],
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300',
    officePictures: [
      'https://images.unsplash.com/photo-1629909615032-f306a4f92f67?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=800'
    ],
    qualifications: [
      'Dental Surgery Specialist',
      'Orthodontics',
      'Implantology',
      'Aesthetic Dentistry'
    ],
    distance: '2.5 km',
    phone: '+33 1 98 76 54 32',
    consultationPrice: 80,
    medicalActs: [
      { name: 'Dental Check-up', price: 80 },
      { name: 'Cleaning', price: 100 },
      { name: 'Filling', price: 120 },
      { name: 'Root Canal', price: 500 },
      { name: 'Crown', price: 800 },
      { name: 'Teeth Whitening', price: 350 }
    ],
    paymentMethods: [
      'Credit Card',
      'Cash',
      'Check',
      'Health Insurance Card',
      'Payment Plan Available'
    ],
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
      'Advanced Certificate in Orthodontics, 2010',
      'Implantology Certification, European Institute, 2012',
      'Aesthetic Dentistry Diploma, 2014'
    ],
    experience: [
      '12+ years in Dental Practice',
      'Specialist in Pediatric Dentistry',
      'Former Head of Dental Department, Clinique Saint-Michel',
      'International Training in Switzerland and Germany'
    ],
    insurance: [
      'CPAM',
      'Mutuelle Générale',
      'AXA',
      'SwissLife',
      'Allianz',
      'MAAF Santé'
    ]
  },
  {
    id: '3',
    name: 'Dr. Maria Rodriguez',
    specialty: 'Pédiatre',
    languages: ['Spanish', 'English', 'French', 'Portuguese'],
    address: '78 Rue des Enfants, Paris',
    availability: ['Tomorrow at 9:00', 'Wednesday at 15:00'],
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
    officePictures: [
      'https://images.unsplash.com/photo-1631217868624-85d89197f5fc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1631217868288-0b8b4eaa3f44?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1631217868814-804a1c4178a6?auto=format&fit=crop&q=80&w=800'
    ],
    qualifications: [
      'Board Certified Pediatrician',
      'Child Development Specialist',
      'Neonatal Care Expert',
      'Pediatric Emergency Medicine'
    ],
    distance: '1.8 km',
    phone: '+33 1 34 56 78 90',
    consultationPrice: 70,
    medicalActs: [
      { name: 'Pediatric Consultation', price: 70 },
      { name: 'Vaccination', price: 45 },
      { name: 'Growth Assessment', price: 60 },
      { name: 'Development Check', price: 80 },
      { name: 'Allergy Testing', price: 120 },
      { name: 'Emergency Consultation', price: 90 }
    ],
    paymentMethods: [
      'Credit Card',
      'Cash',
      'Health Insurance Card',
      'Mobile Payment',
      'Bank Transfer'
    ],
    openingHours: [
      { day: 'Monday', hours: '8:00 - 16:00' },
      { day: 'Tuesday', hours: '8:00 - 16:00' },
      { day: 'Wednesday', hours: '8:00 - 16:00' },
      { day: 'Thursday', hours: '8:00 - 16:00' },
      { day: 'Friday', hours: '8:00 - 14:00' },
      { day: 'Saturday', hours: '9:00 - 12:00' },
      { day: 'Sunday', hours: 'Emergency Only' }
    ],
    education: [
      'MD from Universidad de Barcelona, 2009',
      'Pediatric Residency at Necker-Enfants Malades Hospital, 2013',
      'Fellowship in Child Development, 2014',
      'Master in Pediatric Emergency Medicine, 2015'
    ],
    experience: [
      '11+ years in Pediatrics',
      'Former Head of Pediatrics at Clinique des Enfants',
      'Research in Early Childhood Development',
      'Volunteer Work with Médecins Sans Frontières',
      'International Experience in Spain and Brazil'
    ],
    insurance: [
      'CPAM',
      'MGEN',
      'Malakoff Humanis',
      'April',
      'Allianz Santé',
      'Generali'
    ]
  },
  {
    id: '5',
    name: 'Dr. Sophie Laurent',
    specialty: 'Dermatologue',
    languages: ['French', 'English', 'Italian'],
    address: '92 Boulevard Saint-Germain, Paris',
    availability: ['Monday at 11:30', 'Wednesday at 14:15'],
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=300&h=300',
    officePictures: [
      'https://images.unsplash.com/photo-1631217868624-85d89197f5fc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800'
    ],
    qualifications: [
      'Board Certified Dermatologist',
      'Aesthetic Dermatology',
      'Skin Cancer Specialist',
      'Laser Treatment Expert'
    ],
    distance: '3.2 km',
    phone: '+33 1 45 67 89 10',
    consultationPrice: 90,
    medicalActs: [
      { name: 'Dermatological Consultation', price: 90 },
      { name: 'Skin Cancer Screening', price: 120 },
      { name: 'Acne Treatment', price: 85 },
      { name: 'Laser Treatment', price: 200 },
      { name: 'Botox Injection', price: 350 },
      { name: 'Skin Biopsy', price: 150 }
    ],
    paymentMethods: [
      'Credit Card',
      'Cash',
      'Health Insurance Card',
      'Apple Pay',
      'Bank Transfer'
    ],
    openingHours: [
      { day: 'Monday', hours: '9:00 - 18:00' },
      { day: 'Tuesday', hours: '9:00 - 18:00' },
      { day: 'Wednesday', hours: '9:00 - 18:00' },
      { day: 'Thursday', hours: '9:00 - 18:00' },
      { day: 'Friday', hours: '9:00 - 16:00' },
      { day: 'Saturday', hours: '9:00 - 13:00' },
      { day: 'Sunday', hours: 'Closed' }
    ],
    education: [
      'MD from Université Paris Diderot, 2007',
      'Dermatology Residency at Hôpital Saint-Louis, 2012',
      'Fellowship in Aesthetic Dermatology, 2013',
      'Advanced Training in Laser Treatments, 2014'
    ],
    experience: [
      '13+ years in Dermatology',
      'Head of Aesthetic Dermatology at Clinique de la Peau',
      'Research in Skin Cancer Prevention',
      'International Training in Italy and Switzerland'
    ],
    insurance: [
      'CPAM',
      'MGEN',
      'Allianz',
      'AXA',
      'SwissLife',
      'Generali'
    ]
  },
  {
    id: '6',
    name: 'Dr. Thomas Weber',
    specialty: 'Cardiologue',
    languages: ['German', 'French', 'English'],
    address: '156 Avenue des Champs-Élysées, Paris',
    availability: ['Tuesday at 9:45', 'Thursday at 15:30'],
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
    officePictures: [
      'https://images.unsplash.com/photo-1629909615032-f306a4f92f67?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=800'
    ],
    qualifications: [
      'Board Certified Cardiologist',
      'Interventional Cardiology',
      'Heart Failure Specialist',
      'Cardiac Imaging Expert'
    ],
    distance: '2.8 km',
    phone: '+33 1 56 78 90 12',
    consultationPrice: 110,
    medicalActs: [
      { name: 'Cardiac Consultation', price: 110 },
      { name: 'ECG', price: 75 },
      { name: 'Stress Test', price: 180 },
      { name: 'Echocardiogram', price: 220 },
      { name: 'Holter Monitoring', price: 150 },
      { name: 'Cardiac Risk Assessment', price: 160 }
    ],
    paymentMethods: [
      'Credit Card',
      'Cash',
      'Health Insurance Card',
      'Bank Transfer',
      'Mobile Payment'
    ],
    openingHours: [
      { day: 'Monday', hours: '8:30 - 17:30' },
      { day: 'Tuesday', hours: '8:30 - 17:30' },
      { day: 'Wednesday', hours: '8:30 - 17:30' },
      { day: 'Thursday', hours: '8:30 - 17:30' },
      { day: 'Friday', hours: '8:30 - 15:00' },
      { day: 'Saturday', hours: 'By appointment' },
      { day: 'Sunday', hours: 'Closed' }
    ],
    education: [
      'MD from Charité - Universitätsmedizin Berlin, 2006',
      'Cardiology Residency at Hôpital Européen Georges-Pompidou, 2011',
      'Fellowship in Interventional Cardiology, 2013',
      'Advanced Cardiac Imaging Certification, 2014'
    ],
    experience: [
      '15+ years in Cardiology',
      'Director of Cardiac Catheterization Lab',
      'Research in Preventive Cardiology',
      'International Experience in Germany and France'
    ],
    insurance: [
      'CPAM',
      'MGEN',
      'Allianz',
      'AXA',
      'SwissLife',
      'Harmonie Mutuelle'
    ]
  },
  {
    id: '7',
    name: 'Dr. Emma Bennett',
    specialty: 'Psychiatre',
    languages: ['English', 'French', 'Spanish'],
    address: '23 Rue de la Paix, Paris',
    availability: ['Friday at 13:00', 'Monday at 10:00'],
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=300&h=300',
    officePictures: [
      'https://images.unsplash.com/photo-1631217868624-85d89197f5fc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800'
    ],
    qualifications: [
      'Board Certified Psychiatrist',
      'Cognitive Behavioral Therapy Specialist',
      'Trauma and PTSD Expert',
      'Child and Adolescent Mental Health'
    ],
    distance: '1.5 km',
    phone: '+33 1 67 89 01 23',
    consultationPrice: 95,
    medicalActs: [
      { name: 'Initial Consultation', price: 95 },
      { name: 'Follow-up Session', price: 85 },
      { name: 'Family Therapy', price: 120 },
      { name: 'Group Therapy', price: 60 },
      { name: 'Online Consultation', price: 80 },
      { name: 'Emergency Session', price: 130 }
    ],
    paymentMethods: [
      'Credit Card',
      'Bank Transfer',
      'Health Insurance Card',
      'PayPal',
      'Mobile Payment'
    ],
    openingHours: [
      { day: 'Monday', hours: '9:00 - 19:00' },
      { day: 'Tuesday', hours: '9:00 - 19:00' },
      { day: 'Wednesday', hours: '9:00 - 19:00' },
      { day: 'Thursday', hours: '9:00 - 19:00' },
      { day: 'Friday', hours: '9:00 - 17:00' },
      { day: 'Saturday', hours: '10:00 - 14:00' },
      { day: 'Sunday', hours: 'Closed' }
    ],
    education: [
      'MD from University of Oxford, 2008',
      'Psychiatry Residency at Pitié-Salpêtrière Hospital, 2013',
      'Fellowship in Child Psychiatry, 2014',
      'CBT Certification from Beck Institute, 2015'
    ],
    experience: [
      '12+ years in Psychiatry',
      'Clinical Director at Mental Health Paris',
      'Research in Anxiety Disorders',
      'International Experience in UK and France'
    ],
    insurance: [
      'CPAM',
      'MGEN',
      'Allianz',
      'AXA',
      'Harmonie Mutuelle',
      'April'
    ]
  }
];