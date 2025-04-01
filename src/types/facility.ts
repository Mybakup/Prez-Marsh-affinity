export type FacilityType = 'clinic' | 'hospital' | 'dispensary' | 'medical-center';

export const facilityTypes = [
  { value: 'clinic', label: 'Clinique' },
  { value: 'hospital', label: 'Hôpital' },
  { value: 'dispensary', label: 'Dispensaire' },
  { value: 'medical-center', label: 'Centre médical' }
] as const;

export interface WeekSchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  morning?: {
    start: string;
    end: string;
  };
  afternoon?: {
    start: string;
    end: string;
  };
}

export interface Address {
  street: string;
  postalCode: string;
  city: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface HealthcareFacility {
  id: string;
  name: string;
  type: FacilityType;
  address: Address;
  phone: string;
  email: string;
  specialties: string[];
  schedule: WeekSchedule;
  logo?: string;
  photos: string[];
}

export interface HealthcareProfessional {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  specialty: string;
  registrationNumber: string;
  email: string;
  phone: string;
  languages: string[];
  description?: string;
  imageUrl?: string;
  schedule: WeekSchedule;
}