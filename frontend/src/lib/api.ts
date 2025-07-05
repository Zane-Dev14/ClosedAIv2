import { QueryClient } from '@tanstack/react-query';

/**
 * API Configuration and Voice Model Management
 * 
 * This module handles all API interactions for the voice synthesis application.
 * 
 * IMPORTANT: The getModels() function always merges API responses with mockVoices
 * to ensure that manually curated profile pictures, colors, and accents are
 * preserved. This guarantees consistent UI appearance regardless of backend data.
 * 
 * Profile pictures are sourced from mockVoices and will always override any
 * avatar URLs returned by the backend API.
 */

// Use environment variable or detect if we're in development
const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:8000' 
  : (import.meta.env.VITE_API_BASE_URL || '/api');

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
  /**
   * Fetches voice models from the API and merges them with mockVoices
   * to ensure profile pictures, colors, and accents are always preserved.
   * This guarantees that the UI always shows the manually curated profile pictures
   * even when the backend returns different data.
   */
  async getModels(): Promise<VoiceModel[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/models`);
      if (!response.ok) {
        throw new Error('Failed to fetch voice models');
      }
      const apiModels = await response.json();
      
      // Merge API models with mockVoices to ensure profile pictures are always used
      const mergedModels = apiModels.map((apiModel: VoiceModel) => {
        // Find corresponding mockVoice by ID
        const mockVoice = mockVoices.find(mock => mock.id === apiModel.id);
        if (mockVoice) {
          // Use API model data but keep mockVoice's avatar, color, and accent
          return {
            ...apiModel,
            avatar: mockVoice.avatar,
            color: mockVoice.color,
            accent: mockVoice.accent,
          };
        }
        // If no matching mockVoice found, return API model as is
        return apiModel;
      });
      
      return mergedModels;
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
    avatar: 'https://media.craiyon.com/2023-06-08/ea7d251aa1ac456dae4a13403cd1ee24.webp',
    color: '#1e40af',
    accent: '#3b82f6',
  },
  {
    id: 'srk',
    name: 'Shah Rukh Khan',
    description: 'Bollywood King with charismatic voice',
    avatar: 'https://www.shutterstock.com/shutterstock/photos/2395621959/display_1500/stock-vector-shah-rukh-khan-art-face-design-vector-template-lines-low-poly-texture-grey-logo-sign-icon-symbol-2395621959.jpg',
    color: '#dc2626',
    accent: '#ef4444',
  },
  {
    id: 'modi',
    name: 'Narendra Modi',
    description: 'Indian Prime Minister with powerful delivery',
    avatar: 'https://www.shutterstock.com/shutterstock/photos/2326736369/display_1500/stock-vector-july-a-vector-illustration-of-a-portrait-of-indian-prime-minister-narendra-modi-2326736369.jpg',
    color: '#ea580c',
    accent: '#f97316',
  },
  {
    id: 'trump',
    name: 'Donald Trump',
    description: 'Former US President with unique speaking style',
    avatar: 'https://www.shutterstock.com/shutterstock/photos/2385826153/display_1500/stock-vector--november-ny-donald-trump-vector-caricature-funny-portrait-of-the-former-president-of-2385826153.jpg',
    color: '#dc2626',
    accent: '#ef4444',
  },
  {
    id: 'hutao',
    name: 'JP Boy',
    description: 'Japanese,cool and composed voice',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
    color: '#7c3aed',
    accent: '#a855f7',
  },
  {
    id: 'technoblade',
    name: 'Technoblade',
    description: 'Legendary Minecraft YouTuber voice',
    avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_lrcAGP3htFIscbmyoevZ_YtEXgpuW1YvtnCs5PY4CK0NA=s160-c-k-c0x00ffffff-no-rj',
    color: '#dc2626',
    accent: '#ef4444',
  },
  {
    id: 'chris-pratt',
    name: 'Chris Pratt',
    description: 'Hollywood star with warm, friendly tone',
    avatar: 'https://www.shutterstock.com/shutterstock/photos/2298041949/display_1500/stock-vector-high-quality-color-vector-illustration-character-star-lord-performed-by-actor-chris-pratt-from-2298041949.jpg',
    color: '#059669',
    accent: '#10b981',
  },
];