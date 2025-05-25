
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { characters } from '../data/characters';
import BottomNavigation from '../components/BottomNavigation';

const CharacterProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'About' | 'Personality' | 'Relationship'>('About');

  const character = characters.find(c => c.id === id);

  if (!character) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Character not found</h1>
          <button 
            onClick={() => navigate('/characters')}
            className="text-blue-400 hover:text-blue-300"
          >
            Back to Characters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => navigate('/characters')}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            ←
          </button>
          <h1 className="text-xl font-bold">Character Profile</h1>
          <div className="w-10"></div>
        </div>

        {/* Character Info */}
        <div className="text-center px-6 py-8">
          <div className="relative inline-block mb-4">
            <img
              src={character.avatar}
              alt={character.name}
              className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-400/30 mx-auto"
            />
          </div>
          <h2 className="text-3xl font-bold mb-2">{character.name}</h2>
          <p className="text-slate-400 mb-6">AI Companion</p>

          {/* Chat Button */}
          <button 
            onClick={() => navigate(`/chat/${character.id}`)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-2xl transition-colors duration-200"
          >
            Chat
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-6 mb-6">
          {(['About', 'Personality', 'Relationship'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-center py-3 font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="px-6">
          {activeTab === 'About' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Backstory</h3>
                <p className="text-slate-300 leading-relaxed">{character.personality.backstory}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Traits</h3>
                <p className="text-slate-300 leading-relaxed">{character.personality.traits}</p>
              </div>
            </div>
          )}

          {activeTab === 'Personality' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Core Traits</h3>
                <p className="text-slate-300 leading-relaxed">{character.personality.traits}</p>
              </div>
            </div>
          )}

          {activeTab === 'Relationship' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Status</h3>
                <p className="text-slate-300 leading-relaxed">{character.personality.status}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default CharacterProfile;
