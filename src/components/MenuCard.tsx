import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MenuCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  textColor: string;
  onClick: () => void;
}

export default function MenuCard({ 
  icon: Icon, 
  title, 
  description, 
  color, 
  textColor, 
  onClick 
}: MenuCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className={`w-6 h-6 ${textColor}`} />
        </div>
        <div>
          <h3 className="font-semibold text-mybakup-blue">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}