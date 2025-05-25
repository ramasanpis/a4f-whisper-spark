
import { useNavigate } from 'react-router-dom';
import { characters } from '../data/characters';
import BottomNavigation from '../components/BottomNavigation';

const Index = () => {
  const navigate = useNavigate();

  const featuredCharacters = characters.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <p className="text-slate-400">Ready for another conversation?</p>
          </div>
          <button 
            onClick={() => navigate('/settings')}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            ⚙️
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-4 border border-blue-500/30">
            <div className="text-2xl font-bold text-blue-400 mb-1">4</div>
            <div className="text-sm text-slate-300">Active Chats</div>
          </div>
          <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-2xl p-4 border border-green-500/30">
            <div className="text-2xl font-bold text-green-400 mb-1">247</div>
            <div className="text-sm text-slate-300">Messages Today</div>
          </div>
        </div>

        {/* Recent Characters */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Continue Chatting</h2>
            <button 
              onClick={() => navigate('/characters')}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {featuredCharacters.map((character) => (
              <button
                key={character.id}
                onClick={() => navigate(`/chat/${character.id}`)}
                className="w-full flex items-center space-x-4 p-4 bg-slate-800/50 rounded-2xl hover:bg-slate-800/70 transition-all duration-300 border border-slate-700/30"
              >
                <img
                  src={character.avatar}
                  alt={character.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-400/30"
                />
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-white">{character.name}</h3>
                  <p className="text-sm text-slate-400 truncate">{character.description}</p>
                </div>
                <div className="text-slate-400">
                  <span className="text-2xl">💬</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/characters')}
            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30 hover:scale-105 transition-transform duration-200"
          >
            <div className="text-3xl mb-2">👥</div>
            <div className="font-semibold">Browse Characters</div>
            <div className="text-xs text-slate-400 mt-1">Discover new companions</div>
          </button>
          
          <button 
            onClick={() => navigate('/profile')}
            className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-500/30 hover:scale-105 transition-transform duration-200"
          >
            <div className="text-3xl mb-2">🎨</div>
            <div className="font-semibold">Customize</div>
            <div className="text-xs text-slate-400 mt-1">Personalize experience</div>
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Index;
