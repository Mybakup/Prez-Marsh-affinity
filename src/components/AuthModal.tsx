import React, { useState } from 'react';
import { X, Mail, Apple, Chrome, ArrowRight, Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type Step = 'initial' | 'email' | 'plan' | 'payment';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  isPopular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    interval: 'month',
    features: [
      'Access to all healthcare providers',
      'Basic appointment scheduling',
      'Email support'
    ]
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 19.99,
    interval: 'month',
    features: [
      'All Basic features',
      'Priority appointments',
      'Video consultations',
      '24/7 support',
      'Health records storage'
    ],
    isPopular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 39.99,
    interval: 'month',
    features: [
      'All Professional features',
      'Custom healthcare network',
      'Dedicated account manager',
      'API access',
      'Advanced analytics'
    ]
  }
];

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [step, setStep] = useState<Step>('initial');
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Simulate email validation
    setTimeout(() => {
      if (email.includes('@')) {
        setStep('plan');
        setLoading(false);
      } else {
        setError('Please enter a valid email address');
        setLoading(false);
      }
    }, 1000);
  };

  const handleSocialSignIn = (provider: 'google' | 'apple') => {
    setLoading(true);
    setError(null);

    // Simulate social sign-in
    setTimeout(() => {
      setStep('plan');
      setLoading(false);
    }, 1000);
  };

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setStep('payment');
  };

  const handlePayment = () => {
    setLoading(true);
    setError(null);

    // Simulate payment processing
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {step === 'initial' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Get Started</h2>
                <p className="mt-2 text-gray-600">Choose how you'd like to continue</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setStep('email')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>Continue with Email</span>
                </button>
                <button
                  onClick={() => handleSocialSignIn('google')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Chrome className="w-5 h-5" />
                  <span>Continue with Google</span>
                </button>
                <button
                  onClick={() => handleSocialSignIn('apple')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Apple className="w-5 h-5" />
                  <span>Continue with Apple</span>
                </button>
              </div>
            </div>
          )}

          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Sign up with Email</h2>
                <p className="mt-2 text-gray-600">Enter your email to get started</p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                  required
                />
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {step === 'plan' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Choose your plan</h2>
                <p className="mt-2 text-gray-600">Select the plan that best fits your needs</p>
              </div>

              <div className="space-y-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative p-6 border rounded-xl cursor-pointer transition-all ${
                      plan.isPopular
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-500'
                    }`}
                    onClick={() => handlePlanSelect(plan)}
                  >
                    {plan.isPopular && (
                      <span className="absolute -top-3 right-4 px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                        Popular
                      </span>
                    )}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                        <ul className="mt-2 space-y-1">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">
                          €{plan.price}
                        </span>
                        <span className="text-gray-500">/{plan.interval}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 'payment' && selectedPlan && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
                <p className="mt-2 text-gray-600">
                  You selected the {selectedPlan.name} plan at €{selectedPlan.price}/{
                    selectedPlan.interval
                  }
                </p>
              </div>

              <div className="border-t border-b border-gray-200 py-4">
                <div className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">€{selectedPlan.price}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Complete Payment'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}