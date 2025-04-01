export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  languages: string[];
  address: string;
  availability: string[];
  rating: number;
  imageUrl: string;
  officePictures: string[];
  qualifications: string[];
  distance: string;
  phone: string;
  consultationPrice: number;
  medicalActs: {
    name: string;
    price: number;
  }[];
  paymentMethods: string[];
  openingHours: {
    day: string;
    hours: string;
  }[];
  education: string[];
  experience: string[];
  insurance: string[];
}