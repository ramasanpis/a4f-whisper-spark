
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Key, Eye, EyeOff } from 'lucide-react';

const ApiKeySetup: React.FC = () => {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { apiKey, setApiKey } = useAuth();

  const handleSaveApiKey = () => {
    if (apiKeyInput.trim()) {
      setApiKey(apiKeyInput.trim());
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const handleClearApiKey = () => {
    setApiKey('');
    setApiKeyInput('');
    localStorage.removeItem('apiKey');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key size={20} />
          API Key Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium mb-1">
            A4F API Key
          </label>
          <div className="relative">
            <Input
              id="apiKey"
              type={showApiKey ? 'text' : 'password'}
              value={apiKeyInput || apiKey || ''}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="Enter your A4F API key"
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1 h-8 w-8 p-0"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </div>

        {success && (
          <Alert>
            <AlertDescription>API key saved successfully!</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button onClick={handleSaveApiKey} className="flex-1">
            Save API Key
          </Button>
          {apiKey && (
            <Button onClick={handleClearApiKey} variant="outline">
              Clear
            </Button>
          )}
        </div>

        <div className="text-xs text-gray-500">
          <p>Your API key is stored locally and never sent to our servers.</p>
          <p className="mt-1">Get your A4F API key from: <a href="https://api.a4f.co" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">api.a4f.co</a></p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeySetup;
