import { useNavigate } from 'react-router-dom';
import { User, Bell, Settings as SettingsIcon, HelpCircle } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';

const Settings = () => {
  const navigate = useNavigate();

  const settingsItems = [
    {
      category: 'Account',
      items: [
        { icon: User, title: 'Profile', description: 'Manage your profile', action: () => navigate('/profile') },
        { icon: '⭐', title: 'Subscription', description: 'Manage your subscription', action: () => {} },
      ]
    },
    {
      category: 'Preferences',
      items: [
        { icon: Bell, title: 'Notifications', description: 'Manage notifications', action: () => {} },
        { icon: SettingsIcon, title: 'Display', description: 'Customize display settings', action: () => {} },
        { icon: '🛡️', title: 'Privacy', description: 'Manage privacy settings', action: () => {} },
      ]
    },
    {
      category: 'Help & Support',
      items: [
        { icon: HelpCircle, title: 'FAQ', description: 'Frequently asked questions', action: () => {} },
        { icon: '📞', title: 'Contact Support', description: 'Contact customer support', action: () => {} },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/')}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            ←
          </button>
          <h1 className="text-2xl font-bold">Settings</h1>
          <div className="w-10"></div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {settingsItems.map((section) => (
            <div key={section.category}>
              <h2 className="text-lg font-semibold mb-4 text-slate-300">{section.category}</h2>
              <div className="space-y-3">
                {section.items.map((item) => {
                  const IconComponent = typeof item.icon === 'string' ? null : item.icon;
                  
                  return (
                    <button
                      key={item.title}
                      onClick={item.action}
                      className="w-full flex items-center space-x-4 p-4 bg-slate-800/50 rounded-2xl hover:bg-slate-800/70 transition-all duration-200 border border-slate-700/30"
                    >
                      <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center">
                        {IconComponent ? (
                          <IconComponent size={20} className="text-slate-300" />
                        ) : (
                          <span className="text-lg">{item.icon}</span>
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-slate-400">{item.description}</p>
                      </div>
                      <span className="text-slate-400">›</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Settings;
