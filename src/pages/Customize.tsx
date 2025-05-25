
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';

const Customize = () => {
  const navigate = useNavigate();

  const customizationOptions = [
    {
      category: 'Appearance',
      items: [
        { icon: '👕', title: 'Outfit', description: "Change the character's outfit" },
        { icon: '✂️', title: 'Hair', description: "Modify the character's hairstyle" },
        { icon: '👓', title: 'Accessories', description: 'Add or remove accessories' },
      ]
    },
    {
      category: 'Personality',
      items: [
        { icon: '😊', title: 'Friendliness', description: "Adjust the character's friendliness" },
        { icon: '😄', title: 'Humor', description: "Modify the character's humor" },
        { icon: '💬', title: 'Interaction Style', description: "Change the character's interaction style" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pb-32">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/profile')}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            ←
          </button>
          <h1 className="text-2xl font-bold">Customize</h1>
          <div className="w-10"></div>
        </div>

        {/* Customization Options */}
        <div className="space-y-8">
          {customizationOptions.map((section) => (
            <div key={section.category}>
              <h2 className="text-lg font-semibold mb-4 text-slate-300">{section.category}</h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <button
                    key={item.title}
                    className="w-full flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl hover:bg-slate-800/70 transition-all duration-200 border border-slate-700/30"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center">
                        <span className="text-lg">{item.icon}</span>
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-slate-400">{item.description}</p>
                      </div>
                    </div>
                    <span className="text-slate-400">›</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="fixed bottom-24 left-0 right-0 px-4">
          <div className="max-w-md mx-auto">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-2xl transition-colors duration-200">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Customize;
