import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('mybakup_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('mybakup_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mybakup_user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, validate credentials here
    if (password.length < 6) {
      throw new Error('Invalid credentials');
    }
    
    // Mock user data - In a real app, this would come from the API
    setUser({
      firstName: 'John',
      lastName: 'Doe',
      email,
      birthDate: '1990-01-01',
      phone: '+33 6 12 34 56 78',
      address: {
        street: '123 Rue de la Santé',
        city: 'Paris',
        postalCode: '75014',
        country: 'France'
      }
    });
  };

  const signup = async (data: SignupData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, create user account here
    if (data.password.length < 6) {
      throw new Error('Password too short');
    }
    
    setUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      birthDate: data.birthDate
    });
  };

  const updateProfile = async (data: Partial<User>) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, send reset password email here
    if (!email.includes('@')) {
      throw new Error('Invalid email');
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}