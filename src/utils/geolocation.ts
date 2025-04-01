import { Coordinates } from '../types/geolocation';

export interface GeolocationError {
  type: 'permission_denied' | 'position_unavailable' | 'timeout';
  message: string;
}

const DEFAULT_COORDINATES: Coordinates = {
  latitude: 48.8566, // Paris coordinates as default
  longitude: 2.3522
};

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 10000, // Reduced timeout to 10 seconds for better UX
  maximumAge: 300000 // Cache position for 5 minutes
};

export async function getCurrentPosition(): Promise<{ 
  coordinates: Coordinates; 
  error?: GeolocationError;
}> {
  if (!('geolocation' in navigator)) {
    return {
      coordinates: DEFAULT_COORDINATES,
      error: {
        type: 'position_unavailable',
        message: 'Geolocation is not supported in your browser'
      }
    };
  }

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, GEOLOCATION_OPTIONS);
    });

    return {
      coordinates: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    };
  } catch (error) {
    const geoError = error as GeolocationPositionError;
    let errorDetails: GeolocationError;

    switch (geoError.code) {
      case GeolocationPositionError.PERMISSION_DENIED:
        errorDetails = {
          type: 'permission_denied',
          message: 'Location access was denied. Please enable location services to find nearby doctors.'
        };
        break;
      case GeolocationPositionError.TIMEOUT:
        errorDetails = {
          type: 'timeout',
          message: 'Location request timed out. Please try again.'
        };
        break;
      default:
        errorDetails = {
          type: 'position_unavailable',
          message: 'Unable to determine your location. Please try again.'
        };
    }

    return {
      coordinates: DEFAULT_COORDINATES,
      error: errorDetails
    };
  }
}