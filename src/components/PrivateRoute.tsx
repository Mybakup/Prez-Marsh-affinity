import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './auth/AuthModal';
import { useRequireAuth } from '../hooks/useRequireAuth';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { showAuthModal, setShowAuthModal, isAuthenticated } = useRequireAuth();

  if (!isAuthenticated) {
    return (
      <>
        <Navigate to="/" state={{ from: location }} replace />
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => setShowAuthModal(false)}
        />
      </>
    );
  }

  return <>{children}</>;
}