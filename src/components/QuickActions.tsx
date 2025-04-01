import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Info, Phone, PlusCircle, Building2 } from 'lucide-react';

const actions = [
  { 
    icon: Stethoscope, 
    text: "Find a doctor", 
    command: "find-doctor", 
    path: "/search",
    color: "text-mybakup-coral"
  },
  { 
    icon: Info, 
    text: "Health info", 
    command: "health-info",
    color: "text-mybakup-coral"
  },
  { 
    icon: Phone, 
    text: "Emergency numbers", 
    command: "emergency",
    color: "text-mybakup-coral"
  },
  { 
    icon: PlusCircle, 
    text: "Book appointment", 
    command: "book",
    color: "text-mybakup-coral"
  },
  { 
    icon: Building2, 
    text: "Nearest pharmacy", 
    command: "pharmacy",
    color: "text-mybakup-coral"
  }
];

export default function QuickActions({ onSelect }: { onSelect: (command: string) => void }) {
  const navigate = useNavigate();

  const handleClick = (command: string, path?: string) => {
    if (path) {
      navigate(path);
    } else {
      onSelect(command);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full max-w-4xl mx-auto">
      {actions.map(({ icon: Icon, text, command, path, color }) => (
        <button
          key={text}
          onClick={() => handleClick(command, path)}
          className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
        >
          <div className="w-12 h-12 flex items-center justify-center mb-3">
            <Icon className={`w-8 h-8 ${color}`} />
          </div>
          <span className="text-sm text-mybakup-blue text-center font-medium">{text}</span>
        </button>
      ))}
    </div>
  );
}