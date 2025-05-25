
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { characters } from '../data/characters';
import { Message } from '../types/character';

const Chat = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const character = characters.find(c => c.id === characterId);

  useEffect(() => {
    if (character && messages.length === 0) {
      // Add initial greeting
      const greeting: Message = {
        id: '1',
        content: `Hello there! It's a pleasure to meet you. I'm ${character.name}, and I'm excited to chat with you. What's on your mind today?`,
        sender: 'character',
        timestamp: new Date()
      };
      setMessages([greeting]);
    }
  }, [character, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responses = [
        "That's really interesting! Tell me more about that.",
        "I love hearing about your thoughts and experiences.",
        "Oh, I love so many things! I enjoy exploring new places, reading fantasy novels, and watching anime. Sometimes, I even try my hand at drawing. What about you? What do you enjoy?",
        "That sounds wonderful! I'd love to learn more about your interests.",
        "You always have such fascinating perspectives on things!"
      ];

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'character',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <button 
          onClick={() => navigate(`/character/${character.id}`)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          ←
        </button>
        <h1 className="text-xl font-bold">{character.name}</h1>
        <div className="w-10"></div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-md mx-auto w-full">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-end space-x-2`}
          >
            {message.sender === 'character' && (
              <img
                src={character.avatar}
                alt={character.name}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
            )}
            
            <div className="max-w-[80%]">
              {message.sender === 'character' && (
                <p className="text-xs text-slate-400 mb-1">{character.name}</p>
              )}
              {message.sender === 'user' && (
                <p className="text-xs text-slate-400 mb-1 text-right">User</p>
              )}
              
              <div
                className={`rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : 'bg-slate-700/70 text-white rounded-bl-md'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>

            {message.sender === 'user' && (
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop&crop=face"
                alt="User"
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start items-end space-x-2">
            <img
              src={character.avatar}
              alt={character.name}
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            <div className="bg-slate-700/70 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3 max-w-md mx-auto">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
              className="w-full bg-slate-800/70 border border-slate-700/50 rounded-2xl py-3 px-4 pr-12 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
              🖼️
            </button>
          </div>
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim()}
            className="p-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-2xl transition-colors duration-200"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
