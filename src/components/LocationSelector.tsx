import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface LocationDetails {
  type: 'cabinet' | 'domicile';
  address?: string;
  complement?: string;
}

interface LocationSelectorProps {
  locationDetails: LocationDetails;
  setLocationDetails: (details: LocationDetails) => void;
}

export default function LocationSelector({ locationDetails, setLocationDetails }: LocationSelectorProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleGetCurrentLocation = () => {
    setIsGettingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Here you would typically use a geocoding service to get the address
          // For now, we'll just set the coordinates
          setLocationDetails({
            ...locationDetails,
            address: `${position.coords.latitude}, ${position.coords.longitude}`
          });
          setIsGettingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsGettingLocation(false);
        }
      );
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-[#47559E] mb-2">
          Localisation
        </h2>
        <p className="text-gray-600">
          Certains professionnels de santé ne consultent qu'en cabinet.
        </p>
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-3">
          <input
            type="radio"
            checked={locationDetails.type === 'cabinet'}
            onChange={() => setLocationDetails({ type: 'cabinet' })}
            className="w-5 h-5 text-[#47559E]"
          />
          <span className="text-gray-900">Au cabinet</span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="radio"
            checked={locationDetails.type === 'domicile'}
            onChange={() => setLocationDetails({ type: 'domicile' })}
            className="w-5 h-5 text-[#47559E]"
          />
          <span className="text-gray-900">En déplacement</span>
        </label>
      </div>

      {locationDetails.type === 'domicile' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse complète *
            </label>
            <input
              type="text"
              value={locationDetails.address || ''}
              onChange={(e) => setLocationDetails({
                ...locationDetails,
                address: e.target.value
              })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#47559E]"
              placeholder="Entrez votre adresse"
            />
          </div>

          <button
            onClick={handleGetCurrentLocation}
            disabled={isGettingLocation}
            className="flex items-center gap-2 text-[#47559E] font-medium"
          >
            <MapPin className="w-5 h-5" />
            <span>Utiliser ma position actuelle</span>
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Complément d'adresse
            </label>
            <textarea
              value={locationDetails.complement || ''}
              onChange={(e) => setLocationDetails({
                ...locationDetails,
                complement: e.target.value
              })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#47559E]"
              rows={3}
              placeholder="Digicode, étage, instructions particulières..."
            />
          </div>
        </div>
      )}
    </div>
  );
}