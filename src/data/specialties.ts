export interface Specialty {
  id: string;
  name: string;
  popular?: boolean;
}

export const specialties: Specialty[] = [
  // Spécialités les plus consultées
  { id: 'general', name: 'Médecin Généraliste', popular: true },
  { id: 'dentist', name: 'Dentiste', popular: true },
  { id: 'pediatrician', name: 'Pédiatre', popular: true },

  // Liste complète par ordre alphabétique
  { id: 'acupuncturist', name: 'Acupuncteur' },
  { id: 'allergist', name: 'Allergologue' },
  { id: 'anesthesiologist', name: 'Anesthésiste' },
  { id: 'angiologist', name: 'Angiologue' },
  { id: 'cardiologist', name: 'Cardiologue' },
  { id: 'chiropractor', name: 'Chiropracteur' },
  { id: 'dietician', name: 'Diététicien' },
  { id: 'endocrinologist', name: 'Endocrinologue' },
  { id: 'ent', name: 'ORL (Oto-rhino-laryngologiste)' },
  { id: 'gastroenterologist', name: 'Gastro-entérologue' },
  { id: 'geriatrician', name: 'Gériatre' },
  { id: 'hematologist', name: 'Hématologue' },
  { id: 'infectious-disease', name: 'Infectiologue' },
  { id: 'internist', name: 'Médecine interne' },
  { id: 'nephrologist', name: 'Néphrologue' },
  { id: 'neurologist', name: 'Neurologue' },
  { id: 'nutritionist', name: 'Nutritionniste' },
  { id: 'occupational-therapist', name: 'Ergothérapeute' },
  { id: 'oncologist', name: 'Oncologue' },
  { id: 'ophthalmologist', name: 'Ophtalmologue' },
  { id: 'orthopedist', name: 'Orthopédiste' },
  { id: 'osteopath', name: 'Ostéopathe' },
  { id: 'physiotherapist', name: 'Kinésithérapeute' },
  { id: 'podiatrist', name: 'Podologue' },
  { id: 'psychiatrist', name: 'Psychiatre' },
  { id: 'psychologist', name: 'Psychologue' },
  { id: 'pulmonologist', name: 'Pneumologue' },
  { id: 'radiologist', name: 'Radiologue' },
  { id: 'rheumatologist', name: 'Rhumatologue' },
  { id: 'speech-therapist', name: 'Orthophoniste' },
  { id: 'sports-medicine', name: 'Médecin du sport' },
  { id: 'surgeon', name: 'Chirurgien' },
  { id: 'urologist', name: 'Urologue' }
];