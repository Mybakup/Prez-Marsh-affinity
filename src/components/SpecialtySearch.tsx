import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { specialties, Specialty } from '../data/specialties';

interface SpecialtySearchProps {
  onSelect: (specialty: Specialty) => void;
}

export default function SpecialtySearch({ onSelect }: SpecialtySearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSpecialties = specialties.filter(specialty =>
    specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularSpecialties = filteredSpecialties.filter(s => s.popular);
  const otherSpecialties = filteredSpecialties.filter(s => !s.popular);

  const handleSelect = (specialty: Specialty) => {
    setSelectedSpecialty(specialty);
    setSearchTerm(specialty.name);
    setIsOpen(false);
    onSelect(specialty);
  };

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Spécialité médicale"
          className="w-full h-12 pl-4 pr-10 bg-transparent text-mybakup-blue focus:outline-none appearance-none"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-b-xl shadow-lg max-h-96 overflow-y-auto">
          {searchTerm === '' && popularSpecialties.length > 0 && (
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
              Les plus consultés
            </div>
          )}
          
          {popularSpecialties.map((specialty) => (
            <button
              key={specialty.id}
              onClick={() => handleSelect(specialty)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-mybakup-blue">{specialty.name}</span>
            </button>
          ))}

          {searchTerm === '' && otherSpecialties.length > 0 && popularSpecialties.length > 0 && (
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
              Toutes les spécialités
            </div>
          )}

          {otherSpecialties.map((specialty) => (
            <button
              key={specialty.id}
              onClick={() => handleSelect(specialty)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-mybakup-blue">{specialty.name}</span>
            </button>
          ))}

          {filteredSpecialties.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-500">
              Aucune spécialité trouvée
            </div>
          )}
        </div>
      )}
    </div>
  );
}