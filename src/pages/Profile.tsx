
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/settings')}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            ←
          </button>
          <h1 className="text-2xl font-bold">Profile</h1>
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
            Edit
          </button>
        </div>

        {/* Profile Info */}
        <div className="text-center mb-8">
          <img
            src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop&crop=face"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-400/30 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold mb-1">Alex Chen</h2>
          <p className="text-slate-400">Premium Member</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/50 rounded-2xl p-4 text-center border border-slate-700/30">
            <div className="text-2xl font-bold text-blue-400 mb-1">4</div>
            <div className="text-xs text-slate-400">Characters</div>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-4 text-center border border-slate-700/30">
            <div className="text-2xl font-bold text-green-400 mb-1">247</div>
            <div className="text-xs text-slate-400">Messages</div>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-4 text-center border border-slate-700/30">
            <div className="text-2xl font-bold text-purple-400 mb-1">12</div>
            <div className="text-xs text-slate-400">Days Active</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <button 
            onClick={() => navigate('/customize')}
            className="w-full flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl hover:bg-slate-800/70 transition-all duration-200 border border-slate-700/30"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <span className="text-purple-400">🎨</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Customize Characters</h3>
                <p className="text-sm text-slate-400">Personalize appearance and personality</p>
              </div>
            </div>
            <span className="text-slate-400">›</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl hover:bg-slate-800/70 transition-all duration-200 border border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <span className="text-blue-400">🏆</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Achievements</h3>
                <p className="text-sm text-slate-400">View your milestones and rewards</p>
              </div>
            </div>
            <span className="text-slate-400">›</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl hover:bg-slate-800/70 transition-all duration-200 border border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                <span className="text-green-400">📊</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Analytics</h3>
                <p className="text-sm text-slate-400">See your conversation insights</p>
              </div>
            </div>
            <span className="text-slate-400">›</span>
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
