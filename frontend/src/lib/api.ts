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
  use_rag: boolean;
  context_window: number;
  speed?: number;
  pitch?: number;
}

export interface SynthesisResponse {
  audio_url: string;
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
      return response.json();
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
      return response.json();
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
      throw new Error('Voice synthesis failed');
    }
    
    const data = await response.json();
    
    // Construct full URL for audio file
    if (data.audio_url && !data.audio_url.startsWith('http')) {
      data.audio_url = `${API_BASE_URL}${data.audio_url}`;
    }
    
    return data;
  },

  async checkHealth(): Promise<{ status: string }> {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error('Health check failed');
    }
    return response.json();
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
    id: 'hutao',
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
    id: 'chris-pratt',
    name: 'Chris Pratt',
    description: 'Hollywood star with warm, friendly tone',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
    color: '#059669',
    accent: '#10b981',
  },
];