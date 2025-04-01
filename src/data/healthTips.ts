export interface HealthTip {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  tag: string;
}

export interface HealthTipCategory {
  id: string;
  title: string;
  description: string;
  tips: HealthTip[];
}

export const healthTipCategories: HealthTipCategory[] = [
  {
    id: 'essentials',
    title: 'Essentiels du voyage',
    description: 'Les bases pour voyager en toute sérénité',
    tips: [
      {
        id: 'vaccines',
        title: 'Vaccins et voyages',
        description: 'Conseils sur les vaccinations essentielles selon votre destination',
        image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '4:30',
        doctorName: 'Dr. Sarah Chen',
        doctorSpecialty: 'Médecin généraliste',
        doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
        tag: 'Conseil santé'
      },
      {
        id: 'first-aid',
        title: 'Trousse de premiers secours',
        description: 'Les indispensables à emporter pour faire face aux imprévus',
        image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '3:45',
        doctorName: 'Dr. Sarah Chen',
        doctorSpecialty: 'Médecin généraliste',
        doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
        tag: 'Conseil santé'
      },
      {
        id: 'medications',
        title: 'Médicaments en voyage',
        description: 'Comment transporter et conserver ses médicaments',
        image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '5:00',
        doctorName: 'Dr. Sarah Chen',
        doctorSpecialty: 'Médecin généraliste',
        doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
        tag: 'Conseil santé'
      },
      {
        id: 'insurance',
        title: 'Assurance voyage',
        description: 'Comprendre et choisir son assurance santé voyage',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '4:15',
        doctorName: 'Dr. Sarah Chen',
        doctorSpecialty: 'Médecin généraliste',
        doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
        tag: 'Conseil santé'
      }
    ]
  },
  {
    id: 'family',
    title: 'Voyager en famille',
    description: 'Conseils pour partir avec des enfants',
    tips: [
      {
        id: 'kids-travel',
        title: 'Voyager avec des enfants',
        description: 'Comment préparer un voyage en famille serein',
        image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '5:15',
        doctorName: 'Dr. Maria Rodriguez',
        doctorSpecialty: 'Pédiatre',
        doctorImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
        tag: 'Pédiatrie'
      },
      {
        id: 'baby-care',
        title: 'Soins des bébés en voyage',
        description: 'Conseils pratiques pour voyager avec les tout-petits',
        image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '4:20',
        doctorName: 'Dr. Maria Rodriguez',
        doctorSpecialty: 'Pédiatre',
        doctorImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
        tag: 'Pédiatrie'
      },
      {
        id: 'kids-nutrition',
        title: 'Alimentation des enfants',
        description: 'Bien nourrir ses enfants pendant le voyage',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '4:45',
        doctorName: 'Dr. Maria Rodriguez',
        doctorSpecialty: 'Pédiatre',
        doctorImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
        tag: 'Pédiatrie'
      },
      {
        id: 'kids-activities',
        title: 'Activités en voyage',
        description: 'Occuper et divertir les enfants pendant le trajet',
        image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '3:30',
        doctorName: 'Dr. Maria Rodriguez',
        doctorSpecialty: 'Pédiatre',
        doctorImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
        tag: 'Pédiatrie'
      }
    ]
  },
  {
    id: 'sleep',
    title: 'Sommeil et décalage horaire',
    description: 'Gérer son rythme pendant le voyage',
    tips: [
      {
        id: 'jet-lag',
        title: 'Décalage horaire',
        description: 'Gérer le jet lag et maintenir son rythme',
        image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '3:45',
        doctorName: 'Dr. Thomas Weber',
        doctorSpecialty: 'Neurologue',
        doctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
        tag: 'Sommeil'
      },
      {
        id: 'sleep-tips',
        title: 'Bien dormir en voyage',
        description: 'Conseils pour un sommeil réparateur',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '4:10',
        doctorName: 'Dr. Thomas Weber',
        doctorSpecialty: 'Neurologue',
        doctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
        tag: 'Sommeil'
      },
      {
        id: 'sleep-hygiene',
        title: 'Hygiène du sommeil',
        description: 'Maintenir une bonne hygiène de sommeil en déplacement',
        image: 'https://images.unsplash.com/photo-1585858966753-e25673d9c46c?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '4:30',
        doctorName: 'Dr. Thomas Weber',
        doctorSpecialty: 'Neurologue',
        doctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
        tag: 'Sommeil'
      },
      {
        id: 'sleep-supplements',
        title: 'Compléments naturels',
        description: 'Les aides naturelles pour mieux dormir',
        image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '3:55',
        doctorName: 'Dr. Thomas Weber',
        doctorSpecialty: 'Neurologue',
        doctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
        tag: 'Sommeil'
      }
    ]
  },
  {
    id: 'chronic',
    title: 'Maladies chroniques',
    description: 'Voyager avec une maladie chronique',
    tips: [
      {
        id: 'diabetes',
        title: 'Diabète et voyage',
        description: 'Gérer son diabète à l\'étranger',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '5:30',
        doctorName: 'Dr. Sarah Chen',
        doctorSpecialty: 'Médecin généraliste',
        doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
        tag: 'Maladie chronique'
      },
      {
        id: 'asthma',
        title: 'Asthme en voyage',
        description: 'Prévenir et gérer les crises d\'asthme',
        image: 'https://images.unsplash.com/photo-1584516150909-4ed33d482822?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '4:45',
        doctorName: 'Dr. Sarah Chen',
        doctorSpecialty: 'Médecin généraliste',
        doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
        tag: 'Maladie chronique'
      },
      {
        id: 'heart',
        title: 'Maladies cardiaques',
        description: 'Voyager avec une maladie cardiaque',
        image: 'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '5:15',
        doctorName: 'Dr. Sarah Chen',
        doctorSpecialty: 'Médecin généraliste',
        doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
        tag: 'Maladie chronique'
      },
      {
        id: 'allergies',
        title: 'Allergies à l\'étranger',
        description: 'Gérer ses allergies en voyage',
        image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '4:20',
        doctorName: 'Dr. Sarah Chen',
        doctorSpecialty: 'Médecin généraliste',
        doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
        tag: 'Maladie chronique'
      }
    ]
  },
  {
    id: 'nutrition',
    title: 'Nutrition et alimentation',
    description: 'Bien manger pendant ses voyages',
    tips: [
      {
        id: 'food-safety',
        title: 'Sécurité alimentaire',
        description: 'Éviter les intoxications alimentaires en voyage',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '4:30',
        doctorName: 'Dr. Emma Bennett',
        doctorSpecialty: 'Nutritionniste',
        doctorImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=300&h=300',
        tag: 'Nutrition'
      },
      {
        id: 'hydration',
        title: 'Hydratation en voyage',
        description: 'Rester bien hydraté sous tous les climats',
        image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '3:45',
        doctorName: 'Dr. Emma Bennett',
        doctorSpecialty: 'Nutritionniste',
        doctorImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=300&h=300',
        tag: 'Nutrition'
      },
      {
        id: 'local-food',
        title: 'Découvrir la cuisine locale',
        description: 'Comment profiter de la gastronomie locale en toute sécurité',
        image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '4:15',
        doctorName: 'Dr. Emma Bennett',
        doctorSpecialty: 'Nutritionniste',
        doctorImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=300&h=300',
        tag: 'Nutrition'
      },
      {
        id: 'special-diets',
        title: 'Régimes spéciaux',
        description: 'Voyager avec un régime alimentaire particulier',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '5:00',
        doctorName: 'Dr. Emma Bennett',
        doctorSpecialty: 'Nutritionniste',
        doctorImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=300&h=300',
        tag: 'Nutrition'
      }
    ]
  }
];