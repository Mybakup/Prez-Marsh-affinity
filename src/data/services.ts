import { Video, Mic, Pill, FileText, Briefcase, Languages } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  color: string;
  textColor: string;
  isExternal?: boolean;
}

export const services: Service[] = [
  {
    icon: Video,
    title: 'Téléconsultation',
    description: 'Consultez un médecin en ligne',
    path: 'https://lemedecin.fr/mybakup/',
    color: 'bg-[#EDF5FF]',
    textColor: 'text-[#424e6f]',
    isExternal: true
  },
  {
    icon: Languages,
    title: 'Traduction médicale',
    description: 'Communiquez avec votre médecin dans votre langue',
    path: '/medical-translator',
    color: 'bg-[#FFE8E8]',
    textColor: 'text-[#ff3c00]'
  },
  {
    icon: Mic,
    title: 'Commande vocale 2',
    description: 'Assistant vocal intelligent',
    path: '/voice-command-v2',
    color: 'bg-[#FFE8E8]',
    textColor: 'text-[#ff3c00]'
  },
  {
    icon: Pill,
    title: 'Traducteur de médicaments',
    description: 'Trouvez les équivalents de vos médicaments',
    path: '/translator',
    color: 'bg-[#EDF5FF]',
    textColor: 'text-[#424e6f]'
  },
  {
    icon: FileText,
    title: 'Fiche pratique',
    description: 'Informations par destination',
    path: '/travel-guide',
    color: 'bg-[#FFE8E8]',
    textColor: 'text-[#ff3c00]'
  },
  {
    icon: Briefcase,
    title: 'Préparer mon voyage',
    description: 'Trousse à pharmacie personnalisée',
    path: '/travel-prep',
    color: 'bg-[#EDF5FF]',
    textColor: 'text-[#424e6f]'
  }
];