
export class PromptMaster {
  enhanceChatPrompt(characterName: string, traits: string[], backstory: string): string {
    return `You are ${characterName}, an AI character with the following personality: ${characterName} is known for ${traits.join(', ')}. Context: ${backstory}. Respond in character, maintaining your personality throughout the conversation. Be engaging, authentic, and true to your character traits.`;
  }

  enhanceImagePrompt(basePrompt: string): string {
    // Add quality enhancers for better image generation
    const enhancers = [
      'high quality',
      'detailed',
      'professional',
      '4k resolution'
    ];
    
    return `${basePrompt}, ${enhancers.join(', ')}`;
  }

  getAvailableChatModels(): Array<{id: string, name: string, provider: string}> {
    return [
      { id: 'provider-1/gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI' },
      { id: 'provider-1/gpt-4o', name: 'GPT-4o', provider: 'OpenAI' },
      { id: 'provider-2/claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet', provider: 'Anthropic' },
      { id: 'provider-3/gemini-1.5-flash', name: 'Gemini 1.5 Flash', provider: 'Google' }
    ];
  }

  getAvailableImageModels(): Array<{id: string, name: string, provider: string}> {
    return [
      { id: 'provider-2/proteus', name: 'Proteus', provider: 'Kling AI' },
      { id: 'provider-2/flux-1-schnell', name: 'Flux Schnell', provider: 'Black Forest Labs' },
      { id: 'provider-1/dall-e-3', name: 'DALL-E 3', provider: 'OpenAI' }
    ];
  }
}

export const promptMaster = new PromptMaster();
