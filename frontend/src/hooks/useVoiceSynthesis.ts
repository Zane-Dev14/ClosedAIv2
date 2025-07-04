import { useState, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api, mockVoices, SynthesisRequest, SynthesisResponse } from '@/lib/api';

export interface SynthesisState {
  isLoading: boolean;
  progress: number;
  error: string | null;
  audioUrl: string | null;
  duration: number;
}

export const useVoiceSynthesis = () => {
  const [synthesisState, setSynthesisState] = useState<SynthesisState>({
    isLoading: false,
    progress: 0,
    error: null,
    audioUrl: null,
    duration: 0,
  });

  const { data: voicesData } = useQuery({
    queryKey: ['voices'],
    queryFn: api.getModels,
    initialData: mockVoices,
    retry: 3,
    retryDelay: 1000,
  });

  // Ensure voices is always an array
  const voices = Array.isArray(voicesData) ? voicesData : mockVoices;

  const { data: systemStatus } = useQuery({
    queryKey: ['system-status'],
    queryFn: api.validateSystem,
    refetchInterval: 30000,
    retry: 3,
    retryDelay: 1000,
  });

  const synthesizeMutation = useMutation({
    mutationFn: async (request: SynthesisRequest) => {
      setSynthesisState(prev => ({ ...prev, isLoading: true, progress: 0, error: null }));
      
      // Simulate progress for demo
      const progressInterval = setInterval(() => {
        setSynthesisState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + Math.random() * 15, 90),
        }));
      }, 200);

      try {
        // For demo purposes, simulate API response
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const mockResponse: SynthesisResponse = {
          audio_url: 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3',
          duration: 120,
          status: 'success',
        };

        clearInterval(progressInterval);
        setSynthesisState(prev => ({
          ...prev,
          isLoading: false,
          progress: 100,
          audioUrl: mockResponse.audio_url,
          duration: mockResponse.duration,
        }));

        return mockResponse;
      } catch (error) {
        clearInterval(progressInterval);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        setSynthesisState(prev => ({
          ...prev,
          isLoading: false,
          progress: 0,
          error: errorMessage,
        }));
        throw error;
      }
    },
  });

  const synthesizeVoice = useCallback(
    (text: string, voiceId: string, options?: { speed?: number; pitch?: number }) => {
      return synthesizeMutation.mutate({
        text,
        voice_id: voiceId,
        speed: options?.speed,
        pitch: options?.pitch,
      });
    },
    [synthesizeMutation]
  );

  const resetSynthesis = useCallback(() => {
    setSynthesisState({
      isLoading: false,
      progress: 0,
      error: null,
      audioUrl: null,
      duration: 0,
    });
  }, []);

  return {
    voices,
    systemStatus,
    synthesisState,
    synthesizeVoice,
    resetSynthesis,
    isSystemReady: systemStatus?.status === 'ready',
  };
};