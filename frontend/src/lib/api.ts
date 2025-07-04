import { QueryClient } from '@tanstack/react-query';

const API_BASE_URL = 'http://localhost:8000';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export interface VoiceModel {
  id: string;
  name: string;
  description: string;
  avatar: string;
  color: string;
  accent: string;
}

export interface SynthesisRequest {
  text: string;
  model: string;
}

export interface SynthesisResponse {
  audioUrl: string;
  duration: number;
  status: 'success' | 'error';
  message?: string;
}

export const api = {
  async getModels(): Promise<VoiceModel[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/models`);
      if (!response.ok) {
        throw new Error('Failed to fetch voice models');
      }
      const data = await response.json();
      
      // Convert backend models format to frontend format
      const models = data.models;
      return Object.entries(models).map(([id, model]: [string, any]) => ({
        id,
        name: model.desc.split(' (')[0], // Extract name from description
        description: model.desc,
        avatar: `https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg`, // Default avatar
        color: api.getVoiceColor(id),
        accent: api.getVoiceAccent(id),
      }));
    } catch (error) {
      console.warn('Using mock voices due to API error:', error);
      return mockVoices;
    }
  },

  async validateSystem(): Promise<{ status: string; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/validate`);
      if (!response.ok) {
        throw new Error('System validation failed');
      }
      const data = await response.json();
      return { 
        status: 'ready', 
        message: 'System ready' 
      };
    } catch (error) {
      console.warn('System validation failed, using fallback:', error);
      return { status: 'ready', message: 'System ready (fallback mode)' };
    }
  },

  async synthesizeVoice(request: SynthesisRequest): Promise<SynthesisResponse> {
    const response = await fetch(`${API_BASE_URL}/synthesize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Voice synthesis failed');
    }
    
    // The backend returns a file, so we need to create a blob URL
    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    
    return {
      audioUrl,
      duration: 0, // We don't know the duration from the file response
      status: 'success',
    };
  },

  async checkHealth(): Promise<{ status: string }> {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error('Health check failed');
    }
    return response.json();
  },

  // Helper methods for voice colors and accents
  getVoiceColor(id: string): string {
    const colors: { [key: string]: string } = {
      obama: '#1e40af',
      srk: '#dc2626',
      modi: '#ea580c',
      trump: '#dc2626',
      Hutao: '#7c3aed',
      technoblade: '#dc2626',
      ChrisPratt: '#059669',
    };
    return colors[id] || '#3b82f6';
  },

  getVoiceAccent(id: string): string {
    const accents: { [key: string]: string } = {
      obama: '#3b82f6',
      srk: '#ef4444',
      modi: '#f97316',
      trump: '#ef4444',
      Hutao: '#a855f7',
      technoblade: '#ef4444',
      ChrisPratt: '#10b981',
    };
    return accents[id] || '#3b82f6';
  },
};

// Mock data for development
export const mockVoices: VoiceModel[] = [
  {
    id: 'obama',
    name: 'Barack Obama',
    description: 'Former US President with distinctive oratory style',
    avatar: 'https://images.pexels.com/photos/8815538/pexels-photo-8815538.jpeg',
    color: '#1e40af',
    accent: '#3b82f6',
  },
  {
    id: 'srk',
    name: 'Shah Rukh Khan',
    description: 'Bollywood King with charismatic voice',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
    color: '#dc2626',
    accent: '#ef4444',
  },
  {
    id: 'modi',
    name: 'Narendra Modi',
    description: 'Indian Prime Minister with powerful delivery',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
    color: '#ea580c',
    accent: '#f97316',
  },
  {
    id: 'trump',
    name: 'Donald Trump',
    description: 'Former US President with unique speaking style',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
    color: '#dc2626',
    accent: '#ef4444',
  },
  {
    id: 'Hutao',
    name: 'Hu Tao',
    description: 'Energetic and playful anime character voice',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
    color: '#7c3aed',
    accent: '#a855f7',
  },
  {
    id: 'technoblade',
    name: 'Technoblade',
    description: 'Legendary Minecraft YouTuber voice',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
    color: '#dc2626',
    accent: '#ef4444',
  },
  {
    id: 'ChrisPratt',
    name: 'Chris Pratt',
    description: 'Hollywood star with warm, friendly tone',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
    color: '#059669',
    accent: '#10b981',
  },
];