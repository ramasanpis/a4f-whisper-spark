
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import ImageGenerator from '../components/ImageGenerator';

const ImageGeneration = () => {
  const navigate = useNavigate();

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
          <h1 className="text-xl font-bold">AI Images</h1>
          <div className="w-10"></div>
        </div>

        <ImageGenerator />
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ImageGeneration;
