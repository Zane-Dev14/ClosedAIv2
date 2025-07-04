import { useState, useRef, useEffect, useCallback } from 'react';

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
  error: string | null;
}

export const useAudioPlayer = (audioUrl?: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isLoading: false,
    error: null,
  });

  const [waveformData, setWaveformData] = useState<number[]>([]);

  useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    const handleLoadedMetadata = () => {
      setState(prev => ({
        ...prev,
        duration: audio.duration,
        isLoading: false,
      }));
      generateWaveformData();
    };

    const handleTimeUpdate = () => {
      setState(prev => ({ ...prev, currentTime: audio.currentTime }));
    };

    const handleEnded = () => {
      setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
    };

    const handleError = () => {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to load audio',
      }));
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, [audioUrl]);

  const generateWaveformData = useCallback(() => {
    // Generate mock waveform data for visualization
    const dataPoints = 100;
    const data = Array.from({ length: dataPoints }, () => Math.random() * 100);
    setWaveformData(data);
  }, []);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setState(prev => ({ ...prev, isPlaying: true }));
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      setState(prev => ({ ...prev, volume }));
    }
  }, []);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setState(prev => ({ ...prev, currentTime: time }));
    }
  }, []);

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    ...state,
    waveformData,
    play,
    pause,
    togglePlayPause,
    setVolume,
    seek,
    formatTime,
  };
};