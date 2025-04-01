import React, { useState } from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ResetPasswordForm from './ResetPasswordForm';

type AuthView = 'login' | 'signup' | 'reset-password';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialView?: AuthView;
}

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onSuccess,
  initialView = 'login' 
}: AuthModalProps) {
  const [view, setView] = useState<AuthView>(initialView);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-6">
          {view === 'login' && (
            <LoginForm
              onSuccess={() => {
                onSuccess?.();
                onClose();
              }}
              onSignupClick={() => setView('signup')}
              onResetPasswordClick={() => setView('reset-password')}
            />
          )}

          {view === 'signup' && (
            <SignupForm
              onSuccess={() => {
                onSuccess?.();
                onClose();
              }}
              onLoginClick={() => setView('login')}
            />
          )}

          {view === 'reset-password' && (
            <ResetPasswordForm
              onSuccess={() => setView('login')}
              onBackToLogin={() => setView('login')}
            />
          )}
        </div>
      </div>
    </div>
  );
}