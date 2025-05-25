
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

export class A4FChatService {
  async sendMessage(params: ChatCompletionParams): Promise<string> {
    try {
      console.log('Sending chat message with A4F API:', params);
      
      const response = await a4fClient.chat.completions.create({
        model: params.model || "provider-1/gpt-4o",
        messages: params.messages,
        temperature: params.temperature || 0.7,
        max_tokens: params.max_tokens || 1000,
      });

      console.log('A4F Chat API response:', response);

      return response.choices[0]?.message?.content || 'No response received';
    } catch (error) {
      console.error('Error sending chat message with A4F:', error);
      throw new Error('Failed to send message. Please try again.');
    }
  }
}

export const a4fImageService = new A4FImageService();
export const a4fChatService = new A4FChatService();
