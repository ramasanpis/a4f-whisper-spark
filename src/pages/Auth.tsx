
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import ApiKeySetup from '@/components/ApiKeySetup';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Auth: React.FC = () => {
  const [step, setStep] = useState<'auth' | 'apikey'>('auth');
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleAuthSuccess = () => {
    setStep('apikey');
  };

  const handleComplete = () => {
    navigate('/');
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="space-y-6 w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Welcome back, {user?.name}!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ApiKeySetup />
              <div className="flex gap-2">
                <Button onClick={handleComplete} className="flex-1">
                  Continue to App
                </Button>
                <Button onClick={logout} variant="outline">
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="space-y-6 w-full max-w-md">
        {step === 'auth' && (
          <AuthForm onSuccess={handleAuthSuccess} />
        )}
        
        {step === 'apikey' && (
          <div className="space-y-4">
            <ApiKeySetup />
            <Button onClick={handleComplete} className="w-full">
              Complete Setup
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
