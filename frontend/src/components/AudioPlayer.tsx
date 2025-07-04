import { motion } from 'framer-motion';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, VolumeX, Download, AudioWaveform as Waveform, Music } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string;
  onDownload?: () => void;
  accentColor?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  onDownload,
  accentColor = '#3b82f6',
}) => {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    error,
    waveformData,
    togglePlayPause,
    setVolume,
    seek,
    formatTime,
  } = useAudioPlayer(audioUrl);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-red-400"
      >
        <p>Error loading audio: {error}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card
        className="p-6 border-white/20 bg-black/20 backdrop-blur-sm"
        style={{
          background: 'rgba(26, 26, 26, 0.7)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: accentColor }}
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
              >
                <Music className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Generated Audio
                </h3>
                <p className="text-sm text-gray-400">
                  {formatTime(duration)} • High Quality
                </p>
              </div>
            </div>

            <Badge
              variant="secondary"
              className="bg-green-500/20 text-green-300 border-green-500/20"
            >
              <Waveform className="w-3 h-3 mr-1" />
              Ready
            </Badge>
          </div>

          {/* Waveform Visualization */}
          <div className="relative h-16 bg-black/30 rounded-lg overflow-hidden">
            <div className="flex items-end justify-center h-full gap-1 px-4">
              {waveformData.map((height, index) => (
                <motion.div
                  key={index}
                  className="w-1 rounded-full transition-all duration-150"
                  style={{
                    height: `${Math.max(4, height * 0.6)}px`,
                    backgroundColor: index < (waveformData.length * progress) / 100
                      ? accentColor
                      : 'rgba(255, 255, 255, 0.3)',
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(4, height * 0.6)}px` }}
                  transition={{ delay: index * 0.01 }}
                />
              ))}
            </div>

            {/* Progress indicator */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{
                width: '2px',
                left: `${progress}%`,
                background: `linear-gradient(to bottom, transparent, ${accentColor}, transparent)`,
              }}
              animate={{ opacity: isPlaying ? 1 : 0 }}
            />
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider
              value={[currentTime]}
              max={duration}
              step={0.1}
              onValueChange={(value) => seek(value[0])}
              className="w-full"
              disabled={isLoading}
            />
            <div className="flex justify-between text-sm text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Play/Pause Button */}
              <Button
                onClick={togglePlayPause}
                disabled={isLoading}
                size="lg"
                className="w-12 h-12 rounded-full p-0"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
                }}
              >
                {isLoading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <motion.div
                    key={isPlaying ? 'pause' : 'play'}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    )}
                  </motion.div>
                )}
              </Button>

              {/* Volume Control */}
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setVolume(volume === 0 ? 1 : 0)}
                  className="text-white hover:bg-white/10"
                >
                  {volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
                <Slider
                  value={[volume]}
                  max={1}
                  step={0.1}
                  onValueChange={(value) => setVolume(value[0])}
                  className="w-20"
                />
              </div>
            </div>

            {/* Download Button */}
            <Button
              onClick={onDownload}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};