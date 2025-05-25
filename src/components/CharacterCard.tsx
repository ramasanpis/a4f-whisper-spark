
import { Character } from '../types/character';

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

const CharacterCard = ({ character, onClick }: CharacterCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 cursor-pointer hover:bg-slate-800/70 transition-all duration-300 hover:scale-[1.02] border border-slate-700/30"
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            src={character.avatar}
            alt={character.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-400/30"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold text-white truncate">{character.name}</h3>
            <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">
              {character.category}
            </span>
          </div>
          <p className="text-sm text-slate-400 line-clamp-2">{character.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
