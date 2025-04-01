import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Clock } from 'lucide-react';

const stats = [
  {
    icon: Users,
    label: 'Patients',
    value: '124',
    color: 'bg-[#FFE8E8]',
    textColor: 'text-mybakup-coral',
    path: '/patients'
  },
  {
    icon: Calendar,
    label: 'Rendez-vous',
    value: '48',
    color: 'bg-[#EDF5FF]',
    textColor: 'text-mybakup-blue',
    path: '/appointments'
  },
  {
    icon: Clock,
    label: 'Messages',
    value: '12',
    color: 'bg-[#E8F4FF]',
    textColor: 'text-[#47559E]',
    path: '/messages'
  }
];

export default function QuickStats() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <button 
            key={index}
            onClick={() => navigate(stat.path)}
            className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <Icon className={`w-5 h-5 ${stat.textColor}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-xl font-semibold text-mybakup-blue">
                  {stat.value}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}