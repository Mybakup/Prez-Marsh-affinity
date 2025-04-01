import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Users,
  LogOut,
  Plus,
  ChevronRight,
  Shield,
  Plane,
  FileText,
  Clock,
  CreditCard,
  Pencil,
  Settings,
  Lock,
  Globe,
  DollarSign,
  Trash2,
  Edit,
  Check,
  X,
  RefreshCw
} from 'lucide-react';
import BeneficiaryModal from '../components/BeneficiaryModal';
import EditProfileModal from '../components/EditProfileModal';
import SettingsModal from '../components/SettingsModal';

// Mock user data
const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  age: 35,
  email: 'john.doe@example.com'
};

// Mock beneficiaries data
const initialBeneficiaries = [
  {
    id: '1',
    firstName: 'Jane',
    lastName: 'Doe',
    age: 32,
    gender: 'female',
    phone: '+33612345678',
    relationship: 'Conjoint'
  },
  {
    id: '2',
    firstName: 'Tom',
    lastName: 'Doe',
    age: 8,
    gender: 'male',
    phone: '+33612345679',
    relationship: 'Enfant'
  }
];

export default function Profile() {
  const navigate = useNavigate();
  const [showBeneficiaryModal, setShowBeneficiaryModal] = useState(false);
  const [editSection, setEditSection] = useState<'personal' | 'contact' | null>(null);
  const [settingsSection, setSettingsSection] = useState<'password' | 'language' | 'currency' | null>(null);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<string | null>(null);
  const [isEditingInsurance, setIsEditingInsurance] = useState(false);
  const [insuranceNumber, setInsuranceNumber] = useState('MB-2024-789456123');
  const [tempInsuranceNumber, setTempInsuranceNumber] = useState(insuranceNumber);
  const [beneficiaries, setBeneficiaries] = useState(initialBeneficiaries);

  const MAX_BENEFICIARIES = 3;
  const remainingBeneficiaries = MAX_BENEFICIARIES - beneficiaries.length;

  const handleLogout = () => {
    navigate('/');
  };

  const handleSaveProfile = async (data: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  };

  const handleSaveInsurance = () => {
    setInsuranceNumber(tempInsuranceNumber);
    setIsEditingInsurance(false);
  };

  const handleCancelInsurance = () => {
    setTempInsuranceNumber(insuranceNumber);
    setIsEditingInsurance(false);
  };

  const handleRemoveBeneficiary = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bénéficiaire ?')) {
      setBeneficiaries(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleAddBeneficiary = (beneficiary: any) => {
    setBeneficiaries(prev => [...prev, beneficiary]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-mybakup-blue" />
          </button>
          <h1 className="ml-4 text-xl font-semibold text-mybakup-blue">
            Mon profil
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Bouton Changer de profil */}
        <section className="bg-white rounded-xl p-6">
          <button
            onClick={() => navigate('/profile-choice')}
            className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-50 text-purple-500 group-hover:bg-purple-100 transition-colors">
                <RefreshCw className="w-5 h-5" />
              </div>
              <span className="font-medium text-gray-700">Changer de profil</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </section>

        {/* Personal Information */}
        <section 
          onClick={() => setEditSection('personal')}
          className="bg-white rounded-xl p-6 space-y-4 cursor-pointer hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-mybakup-blue flex items-center gap-2">
              <User className="w-5 h-5" />
              Informations personnelles
            </h2>
            <Pencil className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Nom complet</label>
              <p className="text-mybakup-blue font-medium">
                {mockUser.firstName} {mockUser.lastName}
              </p>
            </div>
            
            <div>
              <label className="text-sm text-gray-500">Âge</label>
              <p className="text-mybakup-blue font-medium">{mockUser.age} ans</p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section 
          onClick={() => setEditSection('contact')}
          className="bg-white rounded-xl p-6 space-y-4 cursor-pointer hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-mybakup-blue flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Coordonnées
            </h2>
            <Pencil className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="text-mybakup-blue font-medium">{mockUser.email}</p>
            </div>
            
            <div>
              <label className="text-sm text-gray-500">Téléphone</label>
              <p className="text-mybakup-blue font-medium">+33 6 50 43 96 64</p>
            </div>
            
            <div>
              <label className="text-sm text-gray-500">Adresse</label>
              <p className="text-mybakup-blue font-medium">123 Rue de la Santé, 75014 Paris</p>
            </div>
          </div>
        </section>

        {/* Settings */}
        <section className="bg-white rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-mybakup-blue flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Paramètres
          </h2>
          
          <div className="space-y-2">
            <button
              onClick={() => setSettingsSection('password')}
              className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-50 text-purple-500 group-hover:bg-purple-100 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-700">Changer mon mot de passe</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button
              onClick={() => setSettingsSection('language')}
              className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-500 group-hover:bg-blue-100 transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-700">Changer la langue</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button
              onClick={() => setSettingsSection('currency')}
              className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-50 text-green-500 group-hover:bg-green-100 transition-colors">
                  <DollarSign className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-700">Changer la devise</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </section>

        {/* Insurance Information */}
        <section className="bg-white rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-mybakup-blue flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Mon assurance
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-500">Numéro d'assuré</label>
              {isEditingInsurance ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveInsurance}
                    className="p-1 text-green-500 hover:bg-green-50 rounded-full"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleCancelInsurance}
                    className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditingInsurance(true)}
                  className="p-1 text-gray-400 hover:text-mybakup-blue rounded-full hover:bg-gray-100"
                >
                  <Pencil className="w-5 h-5" />
                </button>
              )}
            </div>
            {isEditingInsurance ? (
              <input
                type="text"
                value={tempInsuranceNumber}
                onChange={(e) => setTempInsuranceNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mybakup-coral text-mybakup-blue font-medium"
                placeholder="Entrez votre numéro d'assuré"
              />
            ) : (
              <p className="text-mybakup-blue font-medium">{insuranceNumber}</p>
            )}

            {/* Assistance médicale */}
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Plane className="w-5 h-5 text-mybakup-coral" />
                <h3 className="font-medium text-mybakup-blue">Assistance médicale et rapatriement</h3>
              </div>
              <p className="text-sm text-gray-600">
                Couverture mondiale 24/7 avec prise en charge des frais médicaux jusqu'à 150 000€ et rapatriement sanitaire inclus. Assistance téléphonique multilingue disponible en permanence.
              </p>
            </div>

            {/* Annulation de voyage */}
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-mybakup-coral" />
                <h3 className="font-medium text-mybakup-blue">Annulation de voyage</h3>
              </div>
              <p className="text-sm text-gray-600">
                Remboursement jusqu'à 5 000€ pour les frais non récupérables en cas d'annulation pour raison médicale, avec une franchise de 50€. Couverture étendue aux membres de la famille.
              </p>
            </div>

            {/* Responsabilité civile */}
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-mybakup-coral" />
                <h3 className="font-medium text-mybakup-blue">Responsabilité civile à l'étranger</h3>
              </div>
              <p className="text-sm text-gray-600">
                Protection jusqu'à 1 000 000€ pour les dommages causés à des tiers lors de vos déplacements à l'étranger. Assistance juridique incluse en cas de litige.
              </p>
            </div>

            {/* Retard ou annulation de vol */}
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-mybakup-coral" />
                <h3 className="font-medium text-mybakup-blue">Retard ou annulation de vol</h3>
              </div>
              <p className="text-sm text-gray-600">
                Indemnisation jusqu'à 500€ pour les retards de plus de 4 heures. Prise en charge des frais d'hébergement et de restauration en cas d'annulation de vol.
              </p>
            </div>

            {/* Protection des documents */}
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-mybakup-coral" />
                <h3 className="font-medium text-mybakup-blue">Protection des documents et des moyens de paiement</h3>
              </div>
              <p className="text-sm text-gray-600">
                Remboursement jusqu'à 1 000€ en cas de vol ou perte de documents d'identité et moyens de paiement. Service d'opposition et de remplacement d'urgence disponible 24/7.
              </p>
            </div>
          </div>
        </section>

        {/* Beneficiaries */}
        <section className="bg-white rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-mybakup-blue flex items-center gap-2">
              <Users className="w-5 h-5" />
              Bénéficiaires
            </h2>
            <span className="text-sm text-gray-500">
              {remainingBeneficiaries} place{remainingBeneficiaries > 1 ? 's' : ''} restante{remainingBeneficiaries > 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="space-y-3">
            {beneficiaries.map((beneficiary) => (
              <div
                key={beneficiary.id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-mybakup-coral transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-mybakup-blue">
                      {beneficiary.firstName} {beneficiary.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {beneficiary.age} ans • {beneficiary.relationship || 'Non spécifié'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedBeneficiary(beneficiary.id);
                      setShowBeneficiaryModal(true);
                    }}
                    className="p-2 text-gray-400 hover:text-mybakup-blue rounded-full hover:bg-gray-100"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleRemoveBeneficiary(beneficiary.id)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            {remainingBeneficiaries > 0 && (
              <button
                onClick={() => {
                  setSelectedBeneficiary(null);
                  setShowBeneficiaryModal(true);
                }}
                className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-mybakup-coral text-gray-500 hover:text-mybakup-coral transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Ajouter un bénéficiaire</span>
              </button>
            )}
          </div>
        </section>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-4 text-red-500 hover:underline"
        >
          <LogOut className="w-5 h-5" />
          <span>Se déconnecter</span>
        </button>
      </main>

      {/* Modals */}
      <BeneficiaryModal
        isOpen={showBeneficiaryModal}
        onClose={() => {
          setShowBeneficiaryModal(false);
          setSelectedBeneficiary(null);
        }}
        onSelect={handleAddBeneficiary}
        selectedBeneficiaryId={selectedBeneficiary}
      />

      <EditProfileModal
        isOpen={editSection !== null}
        onClose={() => setEditSection(null)}
        onSave={handleSaveProfile}
        section={editSection || 'personal'}
        initialData={{
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          age: mockUser.age,
          email: mockUser.email,
          phone: '+33 6 50 43 96 64',
          address: '123 Rue de la Santé, 75014 Paris'
        }}
      />

      <SettingsModal
        isOpen={settingsSection !== null}
        onClose={() => setSettingsSection(null)}
        section={settingsSection}
      />
    </div>
  );
}