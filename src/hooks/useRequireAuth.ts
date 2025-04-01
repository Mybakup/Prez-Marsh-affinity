import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface UseRequireAuthOptions {
  onUnauthenticated?: () => void;
}

export function useRequireAuth(options?: UseRequireAuthOptions) {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowAuthModal(true);
      options?.onUnauthenticated?.();
    }
  }, [user, options]);

  return {
    isAuthenticated: !!user,
    showAuthModal,
    setShowAuthModal
  };
}