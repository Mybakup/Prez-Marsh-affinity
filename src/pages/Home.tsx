import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  X,
  Play,
  ArrowRight
} from 'lucide-react';
import QuickSignupModal from '../components/QuickSignupModal';
import SocialLinks from '../components/SocialLinks';
import MarshAffinity from './MarshAffinity';
import DoctorProfile from '../components/DoctorProfile';
import RatingModal from '../components/RatingModal';
import { services } from '../data/services';
import { mainActions } from '../data/mainActions';
import { useRequireAuth } from '../hooks/useRequireAuth';
import AuthModal from '../components/auth/AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { slides } from '../data/slides';
import { nextAppointment, pastAppointments } from '../data/appointments';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMarshModal, setShowMarshModal] = useState(false);
  const [showDoctorProfile, setShowDoctorProfile] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const { showAuthModal, setShowAuthModal } = useRequireAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleProtectedAction = (action: () => void) => {
    if (!showAuthModal) {
      action();
    }
  };

  const handleServiceClick = (service: typeof services[0]) => {
    if (service.isExternal) {
      window.open(service.path, '_blank');
    } else {
      handleProtectedAction(() => navigate(service.path));
    }
  };

  const handleRatingSubmit = (ratings: any) => {
    console.log('Ratings submitted:', ratings);
    setShowRatingModal(false);
    setSelectedAppointment(null);
  };

  const getSliderTitle = () => {
    return currentSlide >= 1 ? "Les conseils des experts" : "Votre partenaire";
  };

  return (
    <div className="min-h-screen bg-[#EDF5FF]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#EDF5FF] z-50">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <img 
            src="https://i.imgur.com/jxMQcJi.png" 
            alt="MyBakup" 
            className="h-6"
          />
          <button
            onClick={() => navigate('/profile')}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <UserCircle className="w-5 h-5 text-[#424e6f]" />
          </button>
        </div>
      </header>

      <main className="pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Welcome Message */}
          {user && (
            <p className="text-gray-600 mb-2">Bienvenue <span className="font-bold">{user.firstName}</span>,</p>
          )}

          {/* Main Actions */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#424e6f] mb-4">Les indispensables</h2>
            <div className="grid grid-cols-2 gap-4">
              {mainActions.map((action, index) => (
                <div
                  key={index}
                  onClick={() => handleProtectedAction(() => navigate(action.path))}
                  className={`h-[140px] ${action.color} rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border ${action.borderColor} group flex flex-col justify-between`}
                >
                  <div className={`p-3 rounded-xl ${action.color}`}>
                    <action.icon className={`w-6 h-6 ${action.textColor}`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${action.textColor} mb-1`}>{action.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{action.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Slider Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#424e6f] mb-4">{getSliderTitle()}</h2>
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`flex-shrink-0 w-[85%] sm:w-[500px] rounded-2xl overflow-hidden transition-transform duration-500 relative group cursor-pointer snap-start ${
                      slide.path ? 'hover:opacity-90' : ''
                    }`}
                    onClick={() => {
                      if (slide.path) {
                        if (slide.isPartner) {
                          setShowMarshModal(true);
                        } else {
                          navigate(slide.path);
                        }
                      }
                    }}
                  >
                    <div className="relative h-[200px] sm:h-[240px]">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      {slide.isVideo && (
                        <>
                          <div className="absolute top-3 right-3 z-20 px-2.5 py-1 bg-black/70 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                            {slide.duration}
                          </div>
                          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-14 sm:h-14 bg-white shadow-lg rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                            <Play className="w-5 h-5 sm:w-7 sm:h-7 text-mybakup-coral fill-current" />
                          </button>
                        </>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20">
                        <div className="flex items-end justify-between gap-3">
                          {/* Description à gauche */}
                          <div className="flex-1 min-w-0">
                            {slide.isPartner && (
                              <img
                                src={slide.logo}
                                alt={slide.title}
                                className="h-6 sm:h-8 mb-2 sm:mb-3 drop-shadow-md"
                              />
                            )}
                            <span className="inline-block px-2 py-1 sm:px-3 sm:py-1.5 bg-[#ff3c00] text-white text-xs sm:text-sm font-medium rounded-full shadow-sm mb-2">
                              {slide.tag}
                            </span>
                            <h3 className="text-base sm:text-xl font-bold text-white drop-shadow-sm mb-1 sm:mb-2 line-clamp-2">
                              {slide.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-white/95 line-clamp-2 leading-snug">
                              {slide.description}
                            </p>
                          </div>

                          {/* Informations du praticien */}
                          {slide.isVideo && (
                            <div className="flex items-center gap-2 sm:gap-3 bg-black/30 p-2 sm:p-3 rounded-lg backdrop-blur-sm flex-shrink-0">
                              <img
                                src={slide.doctorImage}
                                alt={slide.doctorName}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-white/20"
                              />
                              <div className="min-w-0">
                                <p className="text-white text-sm font-medium truncate">{slide.doctorName}</p>
                                <p className="text-white/80 text-xs truncate">{slide.doctorSpecialty}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex-shrink-0 w-[85%] sm:w-[500px] rounded-2xl overflow-hidden bg-white border border-gray-200 flex items-center justify-center p-6 snap-start">
                  <button
                    onClick={() => navigate('/health-tips')}
                    className="flex items-center gap-2 text-mybakup-coral hover:text-mybakup-coral/80 transition-colors"
                  >
                    <span className="font-medium">Voir plus de conseils santé</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg z-20"
              >
                <ChevronLeft className="w-5 h-5 text-[#424e6f]" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg z-20"
              >
                <ChevronRight className="w-5 h-5 text-[#424e6f]" />
              </button>

              <div className="flex justify-center gap-2 mt-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? 'bg-[#ff3c00] w-4' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#424e6f] mb-4">Mes services</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              {services.map((service, index) => (
                <div
                  key={index}
                  onClick={() => handleServiceClick(service)}
                  className="flex-shrink-0 w-[240px] bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 group"
                >
                  <div className={`p-3 rounded-xl ${service.color} mb-3`}>
                    <service.icon className={`w-6 h-6 ${service.textColor}`} />
                  </div>
                  <h3 className="font-semibold text-[#424e6f] mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-500">{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Next Appointment */}
          <section className="mb-8">
            <div className="bg-[#FFE8E8] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#ff3c00] mb-4">Mon prochain rendez-vous</h2>
              <div 
                className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
                onClick={() => setShowDoctorProfile(true)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={nextAppointment.doctor.imageUrl}
                    alt={nextAppointment.doctor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#424e6f]">
                      {nextAppointment.doctor.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {nextAppointment.doctor.specialty}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{nextAppointment.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{nextAppointment.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{nextAppointment.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Past Appointments */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#424e6f] mb-4">Historique des rendez-vous</h2>
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={appointment.doctor.imageUrl}
                      alt={appointment.doctor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#424e6f]">
                        {appointment.doctor.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {appointment.doctor.specialty}
                      </p>
                      <div className="mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{appointment.date}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setShowRatingModal(true);
                      }}
                      className="px-4 py-2 bg-mybakup-blue text-white rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                      Noter ce praticien
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Social Links */}
          <section className="mb-8">
            <SocialLinks />
          </section>
        </div>
      </main>

      {/* Modals */}
      <QuickSignupModal 
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
      />

      {showMarshModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center overflow-y-auto">
          <div className="relative w-full max-w-3xl mx-auto my-8">
            <button
              onClick={() => setShowMarshModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white z-50"
            >
              <X className="w-6 h-6" />
            </button>
            <MarshAffinity onClose={() => setShowMarshModal(false)} />
          </div>
        </div>
      )}

      {showDoctorProfile && (
        <DoctorProfile 
          doctor={nextAppointment.doctor} 
          onClose={() => setShowDoctorProfile(false)} 
        />
      )}

      {showRatingModal && selectedAppointment && (
        <RatingModal
          isOpen={showRatingModal}
          onClose={() => {
            setShowRatingModal(false);
            setSelectedAppointment(null);
          }}
          doctorName={selectedAppointment.doctor.name}
          onSubmit={handleRatingSubmit}
        />
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />
    </div>
  );
}