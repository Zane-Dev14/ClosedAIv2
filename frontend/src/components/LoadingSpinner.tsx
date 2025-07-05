import { motion } from 'framer-motion';
import { Mic, Sparkles, Volume2, Zap, Music } from 'lucide-react';

interface LoadingSpinnerProps {
  progress: number;
  accentColor?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  progress,
  accentColor = '#3b82f6',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="text-center py-16"
    >
      <div className="relative mx-auto w-48 h-48 mb-12">
        {/* Outer rotating rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: i === 0 ? accentColor : 'rgba(255, 255, 255, 0.1)',
              borderTopColor: 'transparent',
              transform: `scale(${1 - i * 0.15})`,
            }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 3 + i, 
              repeat: Infinity, 
              ease: "linear",
            }}
          />
        ))}
        
        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="90"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="3"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="90"
            fill="none"
            stroke={accentColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 90}`}
            strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 10px ${accentColor}80)`,
            }}
          />
        </svg>

        {/* Center content with enhanced animations */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-24 h-24 rounded-full flex items-center justify-center relative"
            style={{ 
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
              boxShadow: `0 0 30px ${accentColor}60`,
            }}
            animate={{ 
              scale: [1, 1.1, 1],
              boxShadow: [
                `0 0 30px ${accentColor}60`,
                `0 0 50px ${accentColor}80`,
                `0 0 30px ${accentColor}60`,
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Mic className="w-12 h-12 text-white" />
            </motion.div>
          </motion.div>
        </div>

        {/* Floating icons with enhanced animations */}
        <div className="absolute inset-0">
          {[
            { Icon: Sparkles, angle: 0, radius: 120, color: '#fbbf24' },
            { Icon: Volume2, angle: 120, radius: 110, color: '#10b981' },
            { Icon: Zap, angle: 240, radius: 115, color: '#8b5cf6' },
            { Icon: Music, angle: 60, radius: 125, color: '#ef4444' },
          ].map(({ Icon, angle, radius, color }, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
              }}
              animate={{
                rotate: [angle, angle + 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, delay: i * 0.5 },
              }}
            >
              <motion.div
                className="p-3 rounded-full"
                style={{ 
                  backgroundColor: `${color}20`,
                  border: `2px solid ${color}40`,
                }}
                animate={{
                  boxShadow: [
                    `0 0 10px ${color}40`,
                    `0 0 20px ${color}60`,
                    `0 0 10px ${color}40`,
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                <Icon className="w-6 h-6" style={{ color }} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Pulse waves */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: `${accentColor}30`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Enhanced progress text */}
      <div className="space-y-6">
        <motion.h3
          className="text-3xl font-bold text-white"
          animate={{ 
            opacity: [1, 0.8, 1],
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Synthesizing Voice Magic...
        </motion.h3>
        
        <motion.p
          className="text-xl text-gray-300 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {progress < 25 && "🔍 Analyzing your text..."}
          {progress >= 25 && progress < 50 && "🧠 Processing neural patterns..."}
          {progress >= 50 && progress < 75 && "🎵 Generating voice characteristics..."}
          {progress >= 75 && progress < 95 && "✨ Applying final touches..."}
          {progress >= 95 && "🎉 Almost ready!"}
        </motion.p>
        
        <motion.div
          className="text-5xl font-black text-white"
          animate={{ 
            scale: [1, 1.1, 1],
            color: [accentColor, '#ffffff', accentColor],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {Math.round(progress)}%
        </motion.div>

        {/* Progress bar */}
        <div className="max-w-md mx-auto">
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${accentColor}, #8b5cf6, #ec4899)`,
              }}
              animate={{
                width: `${progress}%`,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};