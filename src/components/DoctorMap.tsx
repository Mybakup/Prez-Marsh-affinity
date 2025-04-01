import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import type { Doctor } from '../types';

interface DoctorMapProps {
  doctors: Doctor[];
  selectedDoctor?: Doctor;
  onDoctorSelect?: (doctor: Doctor) => void;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

export default function DoctorMap({ doctors, selectedDoctor, onDoctorSelect }: DoctorMapProps) {
  const [userLocation, setUserLocation] = useState<Coordinates>({
    latitude: 48.8566,
    longitude: 2.3522
  });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.warn('Geolocation error:', error);
          // Keep default Paris coordinates on error
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  }, []);

  const generatePosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI;
    const radius = 20;
    const centerX = 50;
    const centerY = 50;
    
    return {
      top: `${centerY + radius * Math.sin(angle)}%`,
      left: `${centerX + radius * Math.cos(angle)}%`
    };
  };

  // Construct the Mapbox static image URL with your style
  const mapboxUrl = `https://api.mapbox.com/styles/v1/julienbakala/ckoogz6w01ukr17o5ezqj1x89/static/${userLocation.longitude},${userLocation.latitude},13,0/1200x800@2x?access_token=pk.eyJ1IjoianVsaWVuYmFrYWxhIiwiYSI6ImNrb29nZzZ3ODAydGoyb3N0azFqeXJ4NG0ifQ.u23hDthOruKzsnMlZ5UgbQ`;

  return (
    <div className="relative w-full h-full bg-gray-100">
      {/* Map background */}
      <div className="absolute inset-0">
        <img 
          src={mapboxUrl}
          alt="Street Map"
          className="w-full h-full object-cover"
        />
      </div>

      {/* User location marker */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="relative">
          <div className="w-6 h-6 bg-mybakup-blue rounded-full border-4 border-white shadow-lg" />
          <div className="absolute -inset-4 bg-mybakup-blue opacity-20 rounded-full animate-ping" />
        </div>
      </div>
      
      {/* Doctor markers */}
      <div className="absolute inset-0 z-40">
        {doctors.map((doctor, index) => {
          const position = generatePosition(index, doctors.length);
          
          return (
            <button
              key={doctor.id}
              onClick={() => onDoctorSelect?.(doctor)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                top: position.top,
                left: position.left
              }}
            >
              <div className="relative group">
                <div className={`p-1.5 rounded-full bg-white shadow-md transition-all ${
                  selectedDoctor?.id === doctor.id 
                    ? 'ring-2 ring-mybakup-coral scale-110' 
                    : 'hover:scale-110'
                }`}>
                  <MapPin 
                    className={`w-5 h-5 ${
                      selectedDoctor?.id === doctor.id 
                        ? 'text-mybakup-coral' 
                        : 'text-mybakup-blue'
                    }`} 
                  />
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                  <div className="bg-white rounded-lg shadow-lg p-3 text-sm whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <img
                        src={doctor.imageUrl}
                        alt={doctor.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-mybakup-blue">{doctor.name}</p>
                        <p className="text-gray-600 text-xs">{doctor.specialty}</p>
                      </div>
                    </div>
                    <p className="text-mybakup-coral font-medium mt-1">{doctor.distance}</p>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div className="border-8 border-transparent border-t-white" />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}