
import OpenAI from 'openai';

const A4F_API_KEY = "ddc-a4f-f4ca021ad1a54bda8ab5ccbf457ddd62";
const A4F_BASE_URL = 'https://api.a4f.co/v1';

const a4fClient = new OpenAI({
  apiKey: A4F_API_KEY,
  baseURL: A4F_BASE_URL,
  dangerouslyAllowBrowser: true
});

export interface ImageGenerationParams {
  prompt: string;
  model?: string;
  size?: string;
  quality?: string;
  n?: number;
}

export interface GeneratedImage {
  url: string;
  revised_prompt?: string;
}

export class A4FImageService {
  async generateImage(params: ImageGenerationParams): Promise<GeneratedImage[]> {
    try {
      console.log('Generating image with A4F API:', params);
      
      const response = await a4fClient.images.generate({
        model: params.model || "provider-2/proteus",
        prompt: params.prompt,
        size: params.size || "1024x1024",
        quality: params.quality || "standard",
        n: params.n || 1,
      });

      console.log('A4F API response:', response);

      return response.data.map(image => ({
        url: image.url!,
        revised_prompt: image.revised_prompt
      }));
    } catch (error) {
      console.error('Error generating image with A4F:', error);
      throw new Error('Failed to generate image. Please try again.');
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const testResponse = await a4fClient.chat.completions.create({
        model: "provider-1/gpt-4o",
        messages: [
          { role: "user", content: "Hello from TypeScript!" },
        ],
      });
      
      console.log('A4F connection test:', testResponse.choices[0].message.content);
      return true;
    } catch (error) {
      console.error('A4F connection test failed:', error);
      return false;
    }
  }
}

export const a4fImageService = new A4FImageService();
