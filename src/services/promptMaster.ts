
export interface PromptTemplate {
  id: string;
  name: string;
  category: 'chat' | 'image' | 'creative';
  template: string;
  variables: string[];
  description: string;
}

export class PromptMasterService {
  private templates: PromptTemplate[] = [
    {
      id: 'friendly-chat',
      name: 'Friendly Conversation',
      category: 'chat',
      template: 'You are a friendly and helpful AI assistant. Your name is {characterName}. {personality} Respond to the user in a warm and engaging way.',
      variables: ['characterName', 'personality'],
      description: 'A template for friendly character conversations'
    },
    {
      id: 'creative-image',
      name: 'Creative Image Generation',
      category: 'image',
      template: 'Create a {style} image of {subject}. The scene should be {mood} with {lighting} lighting. Include {details} in the composition.',
      variables: ['style', 'subject', 'mood', 'lighting', 'details'],
      description: 'Template for detailed image generation'
    },
    {
      id: 'anime-character',
      name: 'Anime Character',
      category: 'image',
      template: 'anime style, {character_description}, beautiful detailed eyes, {emotion} expression, {outfit}, {background}, high quality, detailed artwork',
      variables: ['character_description', 'emotion', 'outfit', 'background'],
      description: 'Template for anime-style character images'
    },
    {
      id: 'storytelling',
      name: 'Creative Storytelling',
      category: 'creative',
      template: 'Tell an engaging story about {topic}. The story should be {tone} and include {elements}. Make it approximately {length} long.',
      variables: ['topic', 'tone', 'elements', 'length'],
      description: 'Template for creative storytelling'
    }
  ];

  getTemplates(category?: 'chat' | 'image' | 'creative'): PromptTemplate[] {
    if (category) {
      return this.templates.filter(template => template.category === category);
    }
    return this.templates;
  }

  getTemplate(id: string): PromptTemplate | undefined {
    return this.templates.find(template => template.id === id);
  }

  processTemplate(templateId: string, variables: Record<string, string>): string {
    const template = this.getTemplate(templateId);
    if (!template) {
      throw new Error(`Template with id ${templateId} not found`);
    }

    let processedPrompt = template.template;
    
    // Replace variables in the template
    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = `{${key}}`;
      processedPrompt = processedPrompt.replace(new RegExp(placeholder, 'g'), value);
    });

    return processedPrompt;
  }

  addCustomTemplate(template: Omit<PromptTemplate, 'id'>): string {
    const id = `custom-${Date.now()}`;
    this.templates.push({
      ...template,
      id
    });
    return id;
  }

  // Enhanced prompts for specific use cases
  enhanceImagePrompt(basePrompt: string, style: 'realistic' | 'anime' | 'artistic' | 'fantasy' = 'realistic'): string {
    const styleEnhancements = {
      realistic: 'photorealistic, high resolution, professional photography, detailed',
      anime: 'anime style, manga style, cel shading, vibrant colors, detailed artwork',
      artistic: 'digital art, concept art, artistic style, creative composition',
      fantasy: 'fantasy art, magical atmosphere, ethereal lighting, mystical elements'
    };

    return `${basePrompt}, ${styleEnhancements[style]}, masterpiece, best quality`;
  }

  enhanceChatPrompt(characterName: string, personality: string, context?: string): string {
    let prompt = `You are ${characterName}, an AI character with the following personality: ${personality}.`;
    
    if (context) {
      prompt += ` Context: ${context}.`;
    }
    
    prompt += ' Respond in character, maintaining your personality throughout the conversation. Be engaging, authentic, and true to your character traits.';
    
    return prompt;
  }
}

export const promptMaster = new PromptMasterService();
