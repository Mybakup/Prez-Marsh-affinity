import React from 'react';
import { MessageCircle, Instagram, Facebook, Newspaper } from 'lucide-react';

const socialLinks = [
  {
    icon: Newspaper,
    label: 'Blog',
    href: 'https://blog.mybakup.com',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://instagram.com/mybakup_fr',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    href: 'https://facebook.com/mybakup.fr',
  },
  {
    icon: MessageCircle,
    label: 'Tchat',
    href: 'https://chat.mybakup.com',
  }
];

export default function SocialLinks() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-2.5 border border-gray-100">
      <div className="grid grid-cols-4 gap-1.5">
        {socialLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Icon className="w-5 h-5 text-mybakup-coral" />
              <span className="text-[10px] font-medium text-gray-600">{link.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}