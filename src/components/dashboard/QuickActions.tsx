import React from 'react';
import { Calendar, FileText, MessageSquare, Settings } from 'lucide-react';

const actions = [
  {
    icon: Calendar,
    label: "Gérer l'agenda",
    color: "text-mybakup-coral"
  },
  {
    icon: FileText,
    label: "Documents",
    color: "text-mybakup-blue"
  },
  {
    icon: MessageSquare,
    label: "Messages",
    color: "text-[#47559E]"
  },
  {
    icon: Settings,
    label: "Paramètres",
    color: "text-gray-400"
  }
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button 
            key={action.label}
            className="p-4 rounded-xl hover:bg-gray-50 transition-colors text-center"
          >
            <Icon className={`w-6 h-6 ${action.color} mx-auto mb-2`} />
            <span className="text-sm text-gray-600">{action.label}</span>
          </button>
        );
      })}
    </div>
  );
}