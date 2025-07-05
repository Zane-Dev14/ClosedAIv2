import { motion } from 'framer-motion';
import { VoiceModel } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, Sparkles, Play } from 'lucide-react';
import { useState } from 'react';

interface VoiceCardProps {
  voice: VoiceModel;
  isSelected: boolean;
  onSelect: (voice: VoiceModel) => void;
  index: number;
}

export const VoiceCard: React.FC<VoiceCardProps> = ({
  voice,
  isSelected,
  onSelect,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      className="relative group perspective-1000"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className={`relative overflow-hidden cursor-pointer transition-all duration-500 transform-gpu ${
          isSelected
            ? 'ring-2 ring-blue-500 shadow-2xl shadow-blue-500/25'
            : 'hover:shadow-2xl hover:shadow-white/10'
        }`}
        onClick={() => onSelect(voice)}
        style={{
          background: isSelected
            ? `linear-gradient(135deg, ${voice.color}20, ${voice.accent}15, rgba(26, 26, 26, 0.9))`
            : 'rgba(26, 26, 26, 0.7)',
          backdropFilter: 'blur(20px)',
          border: isSelected
            ? `2px solid ${voice.accent}80`
            : '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, ${voice.accent}30, transparent 70%)`,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ 
                backgroundColor: voice.accent,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 50 - 25, 0],
                y: [0, Math.random() * 50 - 25, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <div className="relative p-8 z-10">
          {/* Avatar with enhanced effects */}
          <div className="relative mb-6">
            <motion.div
              className="w-24 h-24 rounded-full mx-auto overflow-hidden ring-2 ring-white/20 shadow-xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.img
                src={voice.avatar}
                alt={voice.name}
                className="w-full h-full object-cover"
                animate={{
                  filter: isHovered ? 'brightness(1.2) contrast(1.1)' : 'brightness(1) contrast(1)',
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            
            {/* Enhanced microphone icon */}
            <motion.div
              className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: voice.accent }}
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              animate={{
                boxShadow: isHovered 
                  ? `0 0 20px ${voice.accent}80` 
                  : `0 0 10px ${voice.accent}40`,
              }}
            >
              <Mic className="w-5 h-5 text-white" />
            </motion.div>

            {/* Play button overlay on hover */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <Play className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          {/* Voice info with enhanced typography */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <motion.h3 
              className="text-xl font-bold text-white mb-3 tracking-wide"
              animate={{
                color: isSelected ? voice.accent : '#ffffff',
              }}
              transition={{ duration: 0.3 }}
            >
              {voice.name}
            </motion.h3>
            
            <motion.p 
              className="text-sm text-gray-300 mb-4 line-clamp-2 leading-relaxed"
              animate={{
                color: isHovered ? '#e5e7eb' : '#d1d5db',
              }}
              transition={{ duration: 0.3 }}
            >
              {voice.description}
            </motion.p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge
                variant="secondary"
                className="bg-white/10 text-white border-white/20 px-4 py-2 font-medium"
                style={{
                  background: isSelected 
                    ? `${voice.accent}20` 
                    : 'rgba(255, 255, 255, 0.1)',
                  borderColor: isSelected 
                    ? `${voice.accent}40` 
                    : 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-3 h-3 mr-2" />
                </motion.div>
                ClosedAi
              </Badge>
            </motion.div>
          </motion.div>

          {/* Selection indicator with pulse effect */}
          {isSelected && (
            <motion.div
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: voice.accent }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            >
              <motion.div
                className="w-3 h-3 bg-white rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}

          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${voice.accent}10, transparent, ${voice.color}10)`,
              filter: 'blur(1px)',
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </Card>
    </motion.div>
  );
};