import { motion } from 'framer-motion';
import { Sparkles, Mic, Zap } from 'lucide-react';

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        {/* Animated logo */}
        <motion.div
          className="w-32 h-32 mx-auto mb-8 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <Mic className="w-16 h-16 text-white" />
          </div>
          
          {/* Orbiting particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-white rounded-full"
              style={{
                left: '50%',
                top: '50%',
                marginLeft: '-8px',
                marginTop: '-8px',
              }}
              animate={{
                x: [0, 60, 0],
                y: [0, 0, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl font-bold text-white mb-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          AI Voice Synthesis Studio
        </motion.h1>

        {/* Loading text */}
        <motion.p
          className="text-gray-400 text-lg mb-8"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Initializing your voice synthesis experience...
        </motion.p>

        {/* Loading dots */}
        <div className="flex items-center justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-blue-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Status indicators */}
        <motion.div
          className="flex items-center justify-center gap-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="flex items-center gap-2 text-green-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <Zap className="w-5 h-5" />
            <span className="text-sm">System Ready</span>
          </motion.div>
          
          <motion.div
            className="flex items-center gap-2 text-blue-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm">AI Models Loaded</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}; 