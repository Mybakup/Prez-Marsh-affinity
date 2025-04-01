import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import TimeSlotSelector from '../components/TimeSlotSelector';
import BeneficiaryModal from '../components/BeneficiaryModal';
import PatientSelector from '../components/PatientSelector';
import LocationSelector from '../components/LocationSelector';
import ConsultationDetails from '../components/ConsultationDetails';
import { useAuth } from '../contexts/AuthContext';
import type { Doctor } from '../types';

interface LocationDetails {
  type: 'cabinet' | 'domicile';
  address?: string;
  complement?: string;
}

interface TimeSlot {
  id: string;
  date: Date;
  label: string;
  subLabel: string;
  period: 'morning' | 'afternoon';
}

const steps = [
  { title: 'Disponibilités', progress: 20 },
  { title: 'Patient', progress: 40 },
  { title: 'Localisation', progress: 60 },
  { title: 'Détails', progress: 80 },
  { title: 'Validation', progress: 100 }
];

const generateTimeSlots = () => {
  const slots: TimeSlot[] = [];
  const today = new Date();
  
  for (let i = 1; i <= 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    let label = '';
    let subLabel = '';
    
    if (i === 1) {
      label = 'Demain';
      subLabel = 'Demain';
    } else if (i === 2) {
      label = 'Après-demain';
      subLabel = 'Après-demain';
    } else {
      label = 'Dans deux jours';
      subLabel = 'Dans deux jours';
    }
    
    slots.push({
      id: `day-${i}`,
      date,
      label,
      subLabel,
      period: 'morning'
    });
  }
  
  return slots;
};

export default function AppointmentScheduling() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);
  const [showBeneficiaryModal, setShowBeneficiaryModal] = useState(false);
  const [forSelf, setForSelf] = useState(true);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<any | null>(null);
  const [locationDetails, setLocationDetails] = useState<LocationDetails>({
    type: 'cabinet'
  });
  const [pathologyType, setPathologyType] = useState<'ponctuelle' | 'recurrente'>('ponctuelle');
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  const doctor = location.state?.doctor as Doctor;
  const timeSlots = generateTimeSlots();

  // Protect against direct access without doctor data
  useEffect(() => {
    if (!doctor) {
      navigate('/search');
    }
  }, [doctor, navigate]);

  const handleSlotSelect = (slot: TimeSlot) => {
    const existingSlot = selectedSlots.find(
      s => s.id === slot.id && s.period === slot.period
    );
    
    if (existingSlot) {
      setSelectedSlots(selectedSlots.filter(
        s => !(s.id === slot.id && s.period === slot.period)
      ));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const handleConfirm = () => {
    navigate('/appointment/confirmation', {
      state: {
        patientName: forSelf 
          ? `${user?.firstName} ${user?.lastName}`
          : `${selectedBeneficiary?.firstName} ${selectedBeneficiary?.lastName}`,
        doctor
      }
    });
  };

  const handleBeneficiarySelect = (beneficiary: any) => {
    setSelectedBeneficiary(beneficiary);
    setForSelf(false);
    setShowBeneficiaryModal(false);
  };

  // If no doctor data, don't render anything
  if (!doctor) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#EDF5FF]">
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold text-[#47559E]">
            Demande de rendez-vous
          </h1>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-between py-2">
            {steps.map((step, index) => (
              <div 
                key={step.title}
                className={`text-sm ${
                  index <= currentStep ? 'text-[#47559E]' : 'text-gray-400'
                }`}
              >
                {step.title}
              </div>
            ))}
          </div>
          <div className="flex h-1 mb-2">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`flex-1 ${
                  index === 0 ? 'rounded-l-full' : ''
                } ${
                  index === steps.length - 1 ? 'rounded-r-full' : ''
                } ${
                  index <= currentStep ? 'bg-[#47559E]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto pb-24">
        {currentStep === 0 && (
          <div className="p-4 space-y-6">
            <h2 className="text-xl font-semibold text-[#47559E]">Disponibilités</h2>
            <TimeSlotSelector
              slots={timeSlots}
              selectedSlots={selectedSlots}
              onSlotSelect={handleSlotSelect}
            />
          </div>
        )}

        {currentStep === 1 && (
          <PatientSelector
            forSelf={forSelf}
            setForSelf={setForSelf}
            onAddBeneficiary={() => setShowBeneficiaryModal(true)}
            selectedBeneficiary={selectedBeneficiary}
          />
        )}

        {currentStep === 2 && (
          <LocationSelector
            locationDetails={locationDetails}
            setLocationDetails={setLocationDetails}
          />
        )}

        {currentStep === 3 && (
          <ConsultationDetails
            pathologyType={pathologyType}
            setPathologyType={setPathologyType}
            isFirstVisit={isFirstVisit}
            setIsFirstVisit={setIsFirstVisit}
          />
        )}

        {currentStep === 4 && (
          <div className="p-4 space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-[#47559E] mb-4">
                Informations sur la prise de rendez-vous
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#47559E] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <p className="text-gray-700">
                    Le professionnel de santé vous recontactera dans les plus brefs délais.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#47559E] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <p className="text-gray-700">
                    Vous pouvez annuler le rendez-vous à tout moment.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#47559E] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <p className="text-gray-700">
                    Si le médecin n'est pas disponible, vous êtes immédiatement notifié.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full py-3 bg-[#47559E] text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors"
            >
              Confirmer ma demande
            </button>
          </div>
        )}
      </div>

      {/* Bottom Button - Only show for steps 0-3 */}
      {currentStep < 4 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={handleContinue}
              disabled={
                (currentStep === 0 && selectedSlots.length === 0) ||
                (currentStep === 1 && !forSelf && !selectedBeneficiary) ||
                (currentStep === 2 && locationDetails.type === 'domicile' && !locationDetails.address)
              }
              className={`w-full py-3 rounded-xl font-medium transition-colors ${
                ((currentStep === 0 && selectedSlots.length > 0) || 
                 (currentStep === 1 && (forSelf || selectedBeneficiary)) ||
                 (currentStep === 2 && (locationDetails.type === 'cabinet' || locationDetails.address)) ||
                 currentStep === 3)
                  ? 'bg-[#47559E] text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {currentStep === 0 
                ? selectedSlots.length > 0
                  ? `Continuer (${selectedSlots.length} créneau${selectedSlots.length > 1 ? 'x' : ''} sélectionné${selectedSlots.length > 1 ? 's' : ''})`
                  : 'Sélectionnez un créneau'
                : 'Suivant'
              }
            </button>
          </div>
        </div>
      )}

      {/* Beneficiary Modal */}
      <BeneficiaryModal
        isOpen={showBeneficiaryModal}
        onClose={() => setShowBeneficiaryModal(false)}
        onSelect={handleBeneficiarySelect}
      />
    </div>
  );
}