
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { characters } from '../data/characters';
import { Character } from '../types/character';
import CharacterCard from '../components/CharacterCard';
import BottomNavigation from '../components/BottomNavigation';

const Characters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'Popular' | 'New' | 'Favorites'>('Popular');
  const navigate = useNavigate();

  const filteredCharacters = characters.filter(character => 
    character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    character.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCharacterClick = (character: Character) => {
    navigate(`/character/${character.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Characters</h1>
          <button className="p-2 text-slate-400 hover:text-white transition-colors">
            <span className="text-xl">⚙️</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-slate-400">🔍</span>
          </div>
          <input
            type="text"
            placeholder="Search characters"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-6">
          {(['Popular', 'New', 'Favorites'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Characters List */}
        <div className="space-y-4">
          {filteredCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onClick={() => handleCharacterClick(character)}
            />
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Characters;
