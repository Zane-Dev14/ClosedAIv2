import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FileText, Sparkles, Zap, Type } from 'lucide-react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = "Enter the text you want to synthesize...",
  maxLength = 1000,
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const words = value.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    
    if (value.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [value]);

  const progress = (value.length / maxLength) * 100;
  const isNearLimit = progress > 90;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative"
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Label className="text-2xl font-bold text-white flex items-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: isTyping ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <FileText className="w-7 h-7" />
            </motion.div>
            Text to Synthesize
          </Label>
        </motion.div>

        <motion.div
          className="relative"
          animate={{
            scale: isFocused ? 1.02 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Enhanced background glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: isFocused
                ? 'linear-gradient(135deg, #3b82f630, #8b5cf630, #ec489930)'
                : 'transparent',
              filter: 'blur(8px)',
            }}
            animate={{
              opacity: isFocused ? 1 : 0,
              scale: isFocused ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Floating particles around input */}
          <AnimatePresence>
            {isFocused && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full"
                    initial={{ 
                      opacity: 0, 
                      scale: 0,
                      x: Math.random() * 400,
                      y: Math.random() * 200,
                    }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: Math.random() * 400,
                      y: Math.random() * 200,
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={disabled}
            className="relative min-h-[160px] resize-none text-white placeholder:text-gray-400 border-white/20 bg-black/30 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-500 text-lg leading-relaxed rounded-2xl p-6"
            style={{
              background: 'rgba(26, 26, 26, 0.8)',
              backdropFilter: 'blur(20px)',
              fontSize: '18px',
              lineHeight: '1.6',
            }}
          />

          {/* Enhanced animated border */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              border: isFocused ? '3px solid transparent' : '2px solid transparent',
              background: isFocused
                ? 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899) border-box'
                : 'transparent',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'subtract',
            }}
            animate={{
              opacity: isFocused ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                className="absolute bottom-4 right-4 flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm rounded-full px-3 py-1"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Type className="w-4 h-4 text-blue-400" />
                </motion.div>
                <span className="text-blue-400 text-sm font-medium">Typing...</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced stats and progress */}
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge
                variant="secondary"
                className="bg-white/10 text-white border-white/20 px-4 py-2 text-base font-medium"
              >
                <motion.div
                  animate={{ rotate: wordCount > 0 ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                </motion.div>
                {wordCount} words
              </Badge>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge
                variant={isNearLimit ? "destructive" : "secondary"}
                className={
                  isNearLimit
                    ? "bg-red-500/20 text-red-300 border-red-500/20 px-4 py-2 text-base font-medium"
                    : "bg-white/10 text-white border-white/20 px-4 py-2 text-base font-medium"
                }
              >
                <Zap className="w-4 h-4 mr-2" />
                {value.length}/{maxLength}
              </Badge>
            </motion.div>
          </div>

          {/* Enhanced progress bar */}
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm font-medium">Progress</span>
            <div className="w-32 h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: isNearLimit
                    ? 'linear-gradient(90deg, #ef4444, #dc2626)'
                    : 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
                }}
                animate={{
                  width: `${progress}%`,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <span className="text-gray-400 text-sm font-medium">{Math.round(progress)}%</span>
          </div>
        </motion.div>

        {/* Enhanced ready indicator */}
        <AnimatePresence>
          {value.length > 0 && (
            <motion.div
              className="flex items-center justify-center gap-3 text-lg text-gray-300 bg-green-500/10 border border-green-500/20 rounded-xl p-4"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div
                className="w-3 h-3 bg-green-500 rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="font-medium">Ready to synthesize your voice</span>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-green-400" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};