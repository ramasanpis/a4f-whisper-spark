
export interface Character {
  id: string;
  name: string;
  description: string;
  avatar: string;
  category: 'Popular' | 'New' | 'Favorites';
  personality: {
    backstory: string;
    traits: string;
    status: string;
  };
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'character';
  timestamp: Date;
}

export interface ChatSession {
  characterId: string;
  messages: Message[];
}
