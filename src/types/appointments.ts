export interface Appointment {
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
}

export interface AppointmentRequest {
  id: string;
  patient: {
    name: string;
    age: number;
    gender: string;
    imageUrl: string;
    languages: string[];
  };
  proposedDate: string;
  proposedTime: string;
  alternativeDates: string[];
  type: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'waiting' | 'in_progress';
  isFirstVisit: boolean;
  pathologyType: 'ponctuelle' | 'recurrente';
  contact: {
    phone: string;
    email: string;
  };
  source: {
    type: 'hotel' | 'agency' | 'insurance';
    name: string;
  };
  professionalId?: string;
}