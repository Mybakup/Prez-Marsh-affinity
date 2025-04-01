import React, { useState, useEffect } from 'react';
import { Search, Navigation2, ChevronDown } from 'lucide-react';
import { getCurrentPosition } from '../utils/geolocation';
import type { Doctor } from '../types';
import type { GeolocationError } from '../utils/geolocation';

interface DoctorSearchProps {
  onSearch: (query: string) => void;
  onLocationUpdate: (lat: number, lng: number) => void;
}

export default function DoctorSearch({ onSearch, onLocationUpdate }: DoctorSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<GeolocationError | null>(null);

  const handleGetLocation = async () => {
    setIsLocating(true);
    setLocationError(null);

    const { coordinates, error } = await getCurrentPosition();
    
    if (error) {
      setLocationError(error);
    } else {
      onLocationUpdate(coordinates.latitude, coordinates.longitude);
    }
    
    setIsLocating(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          onSearch(e.target.value);
        }}
        placeholder="Rechercher un médecin, une spécialité..."
        className="w-full h-12 pl-10 pr-24 bg-white border border-gray-200 rounded-xl text-mybakup-blue focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
        <button
          onClick={handleGetLocation}
          disabled={isLocating}
          className={`p-2 rounded-full ${
            isLocating 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors'
          }`}
          title="Utiliser ma position"
        >
          <Navigation2 className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Location Error Message */}
      {locationError && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {locationError.message}
        </div>
      )}
    </div>
  );
}