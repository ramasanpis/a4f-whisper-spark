
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { a4fImageService, GeneratedImage } from '../services/a4fService';
import { toast } from 'sonner';
import { Download, Loader2 } from 'lucide-react';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    try {
      const images = await a4fImageService.generateImage({
        prompt: prompt.trim(),
        model: "provider-2/proteus",
        size: "1024x1024",
        n: 1
      });

      setGeneratedImages(images);
      toast.success('Image generated successfully!');
    } catch (error) {
      console.error('Image generation error:', error);
      toast.error('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadImage = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated-image-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Image downloaded!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download image');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">AI Image Generator</h2>
        <p className="text-slate-400">Generate images using Proteus model by Kling AI</p>
        
        <div className="space-y-4">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
            onKeyPress={(e) => e.key === 'Enter' && !isGenerating && handleGenerateImage()}
          />
          
          <Button
            onClick={handleGenerateImage}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Image'
            )}
          </Button>
        </div>
      </div>

      {generatedImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Generated Images</h3>
          <div className="grid gap-4">
            {generatedImages.map((image, index) => (
              <div key={index} className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/30">
                <div className="relative group">
                  <img
                    src={image.url}
                    alt={`Generated image ${index + 1}`}
                    className="w-full rounded-xl"
                    onError={(e) => {
                      console.error('Image failed to load:', image.url);
                      toast.error('Failed to load generated image');
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <Button
                      onClick={() => handleDownloadImage(image.url, index)}
                      variant="secondary"
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                {image.revised_prompt && (
                  <p className="text-sm text-slate-400 mt-2">
                    <strong>Revised prompt:</strong> {image.revised_prompt}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
