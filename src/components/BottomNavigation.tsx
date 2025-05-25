
import { useLocation, useNavigate } from 'react-router-dom';
import { User, Settings } from 'lucide-react';
import React from 'react';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠', path: '/' },
    { id: 'characters', label: 'Characters', icon: '👥', path: '/characters' },
    { id: 'chat', label: 'Chat', icon: '💬', path: '/chat' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = typeof item.icon === 'string' ? null : item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-blue-400 bg-blue-500/10' 
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              {IconComponent ? (
                <IconComponent size={20} />
              ) : (
                <span className="text-lg">{item.icon as string}</span>
              )}
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
