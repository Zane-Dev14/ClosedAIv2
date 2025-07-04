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
      
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setSynthesisState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + Math.random() * 15, 90),
        }));
      }, 200);

      try {
        // Call the real backend API
        const response = await api.synthesizeVoice(request);

        clearInterval(progressInterval);
        setSynthesisState(prev => ({
          ...prev,
          isLoading: false,
          progress: 100,
          audioUrl: response.audioUrl,
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
    (text: string, voiceId: string) => {
      return synthesizeMutation.mutate({
        text,
        model: voiceId,
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