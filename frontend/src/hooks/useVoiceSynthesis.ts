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
      
      // Simulate progress while API call is in progress
      const progressInterval = setInterval(() => {
        setSynthesisState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + Math.random() * 10, 90),
        }));
      }, 300);

      try {
        // Call the actual API
        const response = await api.synthesizeVoice(request);
        
        clearInterval(progressInterval);
        setSynthesisState(prev => ({
          ...prev,
          isLoading: false,
          progress: 100,
          audioUrl: response.audio_url,
          duration: response.duration,
        }));

        return response;
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
    (text: string, model: string, options?: { 
      speed?: number; 
      pitch?: number; 
      use_rag?: boolean; 
      context_window?: number; 
    }) => {
      return synthesizeMutation.mutate({
        text,
        model,
        use_rag: options?.use_rag ?? false,
        context_window: options?.context_window ?? 3,
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