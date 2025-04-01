import { DivideIcon as LucideIcon, MapPin, Calendar } from 'lucide-react';

interface MainAction {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  color: string;
  textColor: string;
  borderColor: string;
}

export const mainActions: MainAction[] = [
  {
    icon: MapPin,
    title: 'Trouver un praticien',
    description: 'Trouvez un médecin près de chez vous',
    path: '/search',
    color: 'bg-white',
    textColor: 'text-[#ff3c00]',
    borderColor: 'border-[#ff3c00]'
  },
  {
    icon: Calendar,
    title: 'Mes rendez-vous',
    description: 'Consultez et gérez vos rendez-vous',
    path: '/appointments',
    color: 'bg-white',
    textColor: 'text-[#424e6f]',
    borderColor: 'border-[#424e6f]'
  }
];