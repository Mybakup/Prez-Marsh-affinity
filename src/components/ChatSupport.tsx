import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  X, 
  Loader2, 
  ChevronLeft,
  ChevronRight,
  Bot, 
  Star, 
  MapPin, 
  Globe2, 
  User,
  ArrowLeft,
  Calendar,
  CreditCard,
  AlertCircle,
  Trash2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockDoctors } from '../data/mockDoctors';
import { specialties } from '../data/specialties';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'human';
  timestamp: Date;
  suggestions?: string[];
  showDoctors?: boolean;
  isUrgent?: boolean;
  avatar?: string;
  name?: string;
}

interface QuickAction {
  id: string;
  text: string;
  icon: React.ReactNode;
  isUrgent?: boolean;
}

const quickActions: QuickAction[] = [
  {
    id: 'find-doctor',
    text: 'Trouver un praticien',
    icon: <User className="w-4 h-4" />
  },
  {
    id: 'emergency',
    text: 'Urgence médicale',
    icon: <AlertCircle className="w-4 h-4" />,
    isUrgent: true
  },
  {
    id: 'reimbursement',
    text: 'Question remboursement',
    icon: <CreditCard className="w-4 h-4" />
  },
  {
    id: 'appointment',
    text: 'Prendre rendez-vous',
    icon: <Calendar className="w-4 h-4" />
  }
];

const cities = [
  'Paris',
  'Lyon',
  'Marseille',
  'Toulouse',
  'Nice',
  'Nantes',
  'Strasbourg',
  'Montpellier',
  'Bordeaux',
  'Lille'
];

const humanAdvisors = [
  {
    id: '1',
    name: 'Sophie',
    role: 'Conseillère MyBakup',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: '2',
    name: 'Thomas',
    role: 'Conseiller MyBakup',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150'
  }
];

export default function ChatSupport() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(true);
  const [showWelcomeNotification, setShowWelcomeNotification] = useState(true);
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
  const [filteredDoctors, setFilteredDoctors] = useState(mockDoctors);
  const [isConnectingToHuman, setIsConnectingToHuman] = useState(false);
  const [connectedHumanAdvisor, setConnectedHumanAdvisor] = useState<typeof humanAdvisors[0] | null>(null);
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const clearHistory = () => {
    setMessages([{
      id: Date.now().toString(),
      text: getWelcomeMessage(),
      sender: 'bot',
      timestamp: new Date(),
      suggestions: quickActions.map(action => action.text)
    }]);
    setShowClearConfirm(false);
    setFilteredDoctors([]);
    setCurrentDoctorIndex(0);
    setConnectedHumanAdvisor(null);
    setIsConnectingToHuman(false);
    setConnectionProgress(0);
  };

  const getWelcomeMessage = () => {
    if (window.location.pathname.includes('/partner/malakoff-humanis')) {
      return "Bonjour ! Malakoff Humanis et MyBakup sont là pour vous. Posez-nous vos questions !";
    }
    return "Bonjour ! Je suis ici pour vous aider. Que puis-je faire pour vous aujourd'hui ?";
  };

  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: getWelcomeMessage(),
        sender: 'bot',
        timestamp: new Date(),
        suggestions: quickActions.map(action => action.text)
      }
    ]);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setPulseAnimation(false);
      setShowWelcomeNotification(false);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnreadMessages(false);
    }
  }, [messages, isOpen]);

  const connectToHumanAdvisor = async () => {
    setIsConnectingToHuman(true);
    setConnectionProgress(0);

    const interval = setInterval(() => {
      setConnectionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      const advisor = humanAdvisors[Math.floor(Math.random() * humanAdvisors.length)];
      setConnectedHumanAdvisor(advisor);
      setIsConnectingToHuman(false);
      setConnectionProgress(100);

      const advisorMessage: Message = {
        id: Date.now().toString(),
        text: `Bonjour, je suis ${advisor.name}, votre conseiller MyBakup. Je suis là pour vous aider. Comment puis-je vous assister aujourd'hui ?`,
        sender: 'human',
        timestamp: new Date(),
        avatar: advisor.avatar,
        name: advisor.name
      };
      setMessages(prev => [...prev, advisorMessage]);
    }, 2500);
  };

  const processMessage = (text: string) => {
    const lowerText = text.toLowerCase();
    
    const urgentKeywords = ['urgence', 'urgent', 'grave', 'emergency', 'immédiat', 'douleur'];
    const isUrgent = urgentKeywords.some(keyword => lowerText.includes(keyword));

    if (isUrgent) {
      connectToHumanAdvisor();
      return "Je vais vous connecter à un conseiller humain. Cela peut prendre jusqu'à 1-2 minutes. En attendant, voici les numéros d'urgence :\n\n• SAMU : 15\n• Pompiers : 18\n• Numéro d'urgence européen : 112";
    }

    const mentionedCity = cities.find(city => 
      lowerText.includes(city.toLowerCase())
    );

    const mentionedSpecialty = specialties.find(specialty => 
      lowerText.includes(specialty.name.toLowerCase())
    );

    const languages = ['français', 'french', 'anglais', 'english', 'espagnol', 'spanish'];
    const mentionedLanguage = languages.find(lang => lowerText.includes(lang));

    let filtered = [...mockDoctors];

    if (mentionedCity) {
      filtered = filtered.filter(doctor => 
        doctor.address.toLowerCase().includes(mentionedCity.toLowerCase())
      );
    }

    if (mentionedSpecialty) {
      filtered = filtered.filter(doctor => 
        doctor.specialty.toLowerCase() === mentionedSpecialty.name.toLowerCase()
      );
    }

    if (mentionedLanguage) {
      filtered = filtered.filter(doctor => {
        const doctorLanguages = doctor.languages.map(lang => lang.toLowerCase());
        return doctorLanguages.some(lang => {
          if (mentionedLanguage === 'french') return lang === 'français';
          if (mentionedLanguage === 'english') return lang === 'anglais';
          if (mentionedLanguage === 'spanish') return lang === 'espagnol';
          return lang === mentionedLanguage;
        });
      });
    }

    setFilteredDoctors(filtered);
    setCurrentDoctorIndex(0);

    let response = "Je peux vous aider à trouver un praticien. Voici les praticiens qui correspondent à votre recherche :";
    if (filtered.length === 0) {
      response = "Je n'ai pas trouvé de praticien correspondant exactement à vos critères. Pouvez-vous reformuler votre demande ou élargir vos critères ?";
    }

    return response;
  };

  const handleQuickAction = (actionText: string, isUrgent?: boolean) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: actionText,
      sender: 'user',
      timestamp: new Date(),
      isUrgent
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    if (isUrgent) {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Je vais vous connecter à un conseiller humain. Cela peut prendre jusqu'à 1-2 minutes. En attendant, voici les numéros d'urgence :\n\n• SAMU : 15\n• Pompiers : 18\n• Numéro d'urgence européen : 112",
        sender: 'bot',
        timestamp: new Date(),
        isUrgent: true
      };

      setMessages(prev => [...prev, botMessage]);
      connectToHumanAdvisor();
      setIsTyping(false);
      return;
    }

    setTimeout(() => {
      let response = '';
      let showDoctors = false;

      switch (actionText) {
        case 'Trouver un praticien':
          response = "Je peux vous aider à trouver un praticien. Dites-moi quel type de praticien vous cherchez et dans quelle ville. Par exemple :\n- Un dentiste à Paris\n- Un pédiatre qui parle anglais\n- Un généraliste proche de Lyon";
          break;
        case 'Question remboursement':
          response = "Je peux vous aider avec vos remboursements. Quelle est votre question ?\n- Suivi d'un remboursement\n- Comprendre vos garanties\n- Demander une prise en charge";
          break;
        case 'Prendre rendez-vous':
          response = "Je vais vous aider à prendre rendez-vous. Dites-moi quel type de praticien vous cherchez et vos préférences (ville, langue, etc.)";
          break;
        default:
          response = "Je vais vous aider avec votre demande. Pouvez-vous me donner plus de détails ?";
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
        showDoctors
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    const response = processMessage(message);

    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: connectedHumanAdvisor ? 'human' : 'bot',
        timestamp: new Date(),
        showDoctors: !connectedHumanAdvisor && filteredDoctors.length > 0,
        avatar: connectedHumanAdvisor?.avatar,
        name: connectedHumanAdvisor?.name
      };
      
      setMessages(prev => [...prev, responseMessage]);
      setIsTyping(false);
      if (!isOpen) {
        setHasUnreadMessages(true);
      }
    }, 1500);
  };

  const handlePrevDoctor = () => {
    setCurrentDoctorIndex(prev => 
      prev === 0 ? filteredDoctors.length - 1 : prev - 1
    );
  };

  const handleNextDoctor = () => {
    setCurrentDoctorIndex(prev => 
      prev === filteredDoctors.length - 1 ? 0 : prev + 1
    );
  };

  const DoctorSlider = () => {
    if (filteredDoctors.length === 0) {
      return (
        <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-500">
          Aucun praticien ne correspond à vos critères
        </div>
      );
    }

    const doctor = filteredDoctors[currentDoctorIndex];

    return (
      <div className="relative bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="p-3">
          <div className="flex items-center gap-3">
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-mybakup-blue truncate">{doctor.name}</h3>
                <span className="text-xs text-mybakup-coral">{doctor.distance}</span>
              </div>
              <p className="text-sm text-gray-600">{doctor.specialty}</p>
              <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-mybakup-coral fill-current" />
                  <span>{doctor.rating}</span>
                </div>
                <span>€{doctor.consultationPrice}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Globe2 className="w-3 h-3" />
              <span>{doctor.languages.join(', ')}</span>
            </div>
            <button 
              onClick={() => navigate('/appointment', { state: { doctor } })}
              className="px-3 py-1.5 bg-mybakup-coral text-white text-xs font-medium rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Réserver
            </button>
          </div>
        </div>

        {filteredDoctors.length > 1 && (
          <>
            <button
              onClick={handlePrevDoctor}
              className="absolute left-1 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white shadow-md hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleNextDoctor}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white shadow-md hover:bg-gray-50"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>

            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
              {filteredDoctors.map((_, index) => (
                <div
                  key={index}
                  className={`w-1 h-1 rounded-full transition-colors ${
                    index === currentDoctorIndex ? 'bg-mybakup-coral' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      {showWelcomeNotification && !isOpen && (
        <div className="fixed bottom-20 right-4 z-[60] w-72 bg-white rounded-xl shadow-lg border border-gray-200 p-4 animate-fade-in-up">
          <button
            onClick={() => setShowWelcomeNotification(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
          <p className="text-sm text-gray-600">{getWelcomeMessage()}</p>
        </div>
      )}

      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={`fixed ${isOpen ? 'hidden' : 'bottom-4 right-4'} z-[60] p-4 rounded-full shadow-lg transition-all duration-300 ${
          pulseAnimation ? 'animate-pulse' : ''
        } ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-mybakup-blue hover:bg-mybakup-blue/90'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 text-white" />
            {hasUnreadMessages && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            )}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5 text-gray-500" />
              </button>
              {connectedHumanAdvisor ? (
                <>
                  <img
                    src={connectedHumanAdvisor.avatar}
                    alt={connectedHumanAdvisor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-mybakup-blue">{connectedHumanAdvisor.name}</h3>
                    <p className="text-sm text-gray-500">{connectedHumanAdvisor.role}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-mybakup-blue/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-mybakup-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-mybakup-blue">Assistance MyBakup</h3>
                    <p className="text-sm text-gray-500">Disponible 24/7 - Assistance IA supervisée</p>
                  </div>
                </>
              )}
            </div>
            {!isConnectingToHuman && messages.length > 1 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                title="Effacer l'historique"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Connection Progress Bar */}
          {isConnectingToHuman && (
            <div className="p-4 bg-blue-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-700">Connexion à un conseiller...</span>
                <span className="text-sm font-medium text-blue-700">{connectionProgress}%</span>
              </div>
              <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${connectionProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id}>
                <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-mybakup-blue/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-mybakup-blue" />
                    </div>
                  )}
                  {msg.sender === 'human' && msg.avatar && (
                    <img
                      src={msg.avatar}
                      alt={msg.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  )}
                  <div className={`max-w-[80%] rounded-2xl p-3 ${
                    msg.sender === 'user'
                      ? 'bg-mybakup-blue text-white'
                      : msg.sender === 'human'
                      ? 'bg-mybakup-coral/10 text-gray-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {msg.sender === 'human' && msg.name && (
                      <p className="text-xs font-medium text-mybakup-coral mb-1">{msg.name}</p>
                    )}
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-mybakup-coral/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-mybakup-coral" />
                    </div>
                  )}
                </div>

                {msg.showDoctors && (
                  <div className="mt-4">
                    <DoctorSlider />
                  </div>
                )}

                {msg.suggestions && (
                  <div className="mt-4 space-y-2">
                    {quickActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action.text, action.isUrgent)}
                        className={`w-full flex items-center gap-2 p-3 rounded-xl border transition-colors text-left ${
                          action.isUrgent
                            ? 'border-red-200 hover:border-red-300 hover:bg-red-50'
                            : 'border-gray-200 hover:border-mybakup-coral hover:bg-mybakup-coral/5'
                        }`}
                      >
                        <div className={`p-1 rounded-lg ${
                          action.isUrgent
                            ? 'bg-red-100'
                            : 'bg-mybakup-blue/10'
                        }`}>
                          {action.icon}
                        </div>
                        <span className={`text-sm ${
                          action.isUrgent ? 'text-red-700' : 'text-gray-700'
                        }`}>
                          {action.text}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start items-end gap-2">
                {connectedHumanAdvisor ? (
                  <img
                    src={connectedHumanAdvisor.avatar}
                    alt={connectedHumanAdvisor.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-mybakup-blue/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-mybakup-blue" />
                  </div>
                )}
                <div className="bg-gray-100 rounded-2xl p-4">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="p-2 bg-mybakup-coral text-white rounded-xl hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Clear History Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-mybakup-blue mb-4">
              Effacer l'historique
            </h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir effacer tout l'historique de conversation ?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={clearHistory}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              >
                Effacer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}