
import OpenAI from 'openai';

// Default API key - will be overridden by user's key from localStorage
const DEFAULT_A4F_API_KEY = "ddc-a4f-f4ca021ad1a54bda8ab5ccbf457ddd62";
const A4F_BASE_URL = 'https://api.a4f.co/v1';

const getApiKey = (): string => {
  return localStorage.getItem('apiKey') || DEFAULT_A4F_API_KEY;
};

const createA4FClient = () => {
  return new OpenAI({
    apiKey: getApiKey(),
    baseURL: A4F_BASE_URL,
    dangerouslyAllowBrowser: true
  });
};

export interface ImageGenerationParams {
  prompt: string;
  model?: string;
  size?: "256x256" | "512x512" | "1024x1024" | "1024x1536" | "1536x1024" | "1792x1024" | "1024x1792";
  quality?: "standard" | "hd";
  n?: number;
}

export interface GeneratedImage {
  url: string;
  revised_prompt?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatCompletionParams {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

export class A4FImageService {
  async generateImage(params: ImageGenerationParams): Promise<GeneratedImage[]> {
    try {
      console.log('Generating image with A4F API:', params);
      
      const client = createA4FClient();
      const response = await client.images.generate({
        model: params.model || "provider-2/proteus",
        prompt: params.prompt,
        size: params.size || "1024x1024" as const,
        quality: params.quality || "standard" as const,
        n: params.n || 1,
      });

      console.log('A4F API response:', response);

      return response.data.map(image => ({
        url: image.url!,
        revised_prompt: image.revised_prompt
      }));
    } catch (error) {
      console.error('Error generating image with A4F:', error);
      throw new Error('Failed to generate image. Please check your API key and try again.');
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const client = createA4FClient();
      const testResponse = await client.chat.completions.create({
        model: "provider-1/gpt-4o-mini",
        messages: [
          { role: "user", content: "Hello" },
        ],
        max_tokens: 10,
      });
      
      console.log('A4F connection test:', testResponse.choices[0].message.content);
      return true;
    } catch (error) {
      console.error('A4F connection test failed:', error);
      return false;
    }
  }
}

export class A4FChatService {
  async sendMessage(params: ChatCompletionParams): Promise<string> {
    try {
      console.log('Sending chat message with A4F API:', params);
      
      const client = createA4FClient();
      
      // Use the correct model format for A4F
      const modelName = params.model || "provider-1/gpt-4o-mini";
      
      const response = await client.chat.completions.create({
        model: modelName,
        messages: params.messages,
        temperature: params.temperature || 0.7,
        max_tokens: params.max_tokens || 1000,
      });

      console.log('A4F Chat API response:', response);

      return response.choices[0]?.message?.content || 'No response received';
    } catch (error) {
      console.error('Error sending chat message with A4F:', error);
      
      // More specific error handling
      if (error instanceof Error) {
        if (error.message.includes('404')) {
          throw new Error('Model not found. Please try a different model or check your API key.');
        } else if (error.message.includes('401')) {
          throw new Error('Invalid API key. Please check your API key in settings.');
        } else if (error.message.includes('429')) {
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        }
      }
      
      throw new Error('Failed to send message. Please try again.');
    }
  }
}

export const a4fImageService = new A4FImageService();
export const a4fChatService = new A4FChatService();
