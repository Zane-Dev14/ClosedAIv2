import { useState, useRef, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Text3D, Environment } from '@react-three/drei';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Fab, Zoom } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ParticleBackground } from '@/components/ParticleBackground';
import { VoiceCard } from '@/components/VoiceCard';
import { TextInput } from '@/components/TextInput';
import { AudioPlayer } from '@/components/AudioPlayer';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { MouseFollower } from '@/components/MouseFollower';
import { InteractiveBackground } from '@/components/InteractiveBackground';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useVoiceSynthesis } from '@/hooks/useVoiceSynthesis';
import { VoiceModel } from '@/lib/api';
import { Mic, Sparkles, Play, ChevronDown, Zap, Music, AudioWaveform as Waveform, Volume2, Keyboard as KeyboardArrowUp } from 'lucide-react';
import { toast } from 'sonner';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const queryClient = new QueryClient();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
    },
    secondary: {
      main: '#8b5cf6',
    },
    background: {
      default: '#000000',
      paper: 'rgba(26, 26, 26, 0.8)',
    },
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
  },
});

// Enhanced 3D Microphone Component
const MicrophoneContent = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(hovered ? 1.2 : 1);
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} />
      <Environment preset="night" />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <group>
          <Sphere 
            ref={meshRef}
            args={[1, 64, 64]} 
            position={[0, 0, 0]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <MeshDistortMaterial
              color="#3b82f6"
              attach="material"
              distort={0.4}
              speed={3}
              roughness={0.1}
              metalness={0.8}
            />
          </Sphere>
          
          {/* Floating rings */}
          {[...Array(3)].map((_, i) => (
            <mesh key={i} position={[0, 0, 0]} rotation={[0, 0, i * Math.PI / 3]}>
              <torusGeometry args={[1.5 + i * 0.3, 0.02, 16, 100]} />
              <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
            </mesh>
          ))}
        </group>
      </Float>
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
};

const FloatingMicrophone = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas className="w-full h-full">
        <MicrophoneContent />
      </Canvas>
    </div>
  );
};

// Animated Text Component
const AnimatedText = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scroll Progress Indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 origin-left"
      style={{ scaleX }}
    />
  );
};

// Floating Action Button for scroll to top
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      setVisible(scrolled > 300);
    };

    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Zoom in={visible}>
      <Fab
        color="primary"
        size="medium"
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1000,
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          '&:hover': {
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
          }
        }}
      >
        <KeyboardArrowUp />
      </Fab>
    </Zoom>
  );
};

function AppContent() {
  const [selectedVoice, setSelectedVoice] = useState<VoiceModel | null>(null);
  const [inputText, setInputText] = useState('');
  const [useRag, setUseRag] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 200]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  const {
    voices,
    synthesisState,
    synthesizeVoice,
    resetSynthesis,
    isSystemReady,
  } = useVoiceSynthesis();

  useEffect(() => {
    // Advanced GSAP animations
    const tl = gsap.timeline();
    
    tl.from('.hero-title', {
      duration: 1.2,
      y: 100,
      opacity: 0,
      ease: 'power4.out',
      stagger: 0.2
    })
    .from('.hero-subtitle', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-cta', {
      duration: 0.8,
      scale: 0,
      opacity: 0,
      ease: 'backOut'
    }, '-=0.3');

    // Scroll-triggered animations
    gsap.utils.toArray('.animate-on-scroll').forEach((element: any) => {
      gsap.fromTo(element, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleVoiceSelect = (voice: VoiceModel) => {
    setSelectedVoice(voice);
    toast.success(`Selected ${voice.name}`, {
      style: {
        background: 'rgba(26, 26, 26, 0.9)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        color: 'white',
      }
    });
  };

  const handleSynthesize = async () => {
    if (!selectedVoice || !inputText.trim()) {
      toast.error('Please select a voice and enter text');
      return;
    }

    try {
      await synthesizeVoice(inputText, selectedVoice.id, {
        use_rag: useRag,
        context_window: 3
      });
      toast.success('Voice synthesis completed!');
    } catch (error) {
      toast.error('Failed to synthesize voice');
    }
  };

  const handleDownload = () => {
    if (synthesisState.audioUrl) {
      const link = document.createElement('a');
      link.href = synthesisState.audioUrl;
      link.download = `${selectedVoice?.name || 'voice'}-synthesis.mp3`;
      link.click();
      toast.success('Download started!');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <ScrollProgress />
      <MouseFollower />
      <InteractiveBackground />
      
      {/* Enhanced Particle Background */}
      <ParticleBackground
        accentColor={selectedVoice?.accent || '#3b82f6'}
        intensity={80}
        interactive={true}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center">
        <motion.div 
          style={{ y: y1 }}
          className="container mx-auto px-4 text-center z-10"
        >
          <div className="max-w-6xl mx-auto">
            {/* 3D Microphone */}
            <motion.div 
              className="w-40 h-40 mx-auto mb-12"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FloatingMicrophone />
            </motion.div>

            {/* Enhanced Title with Gradient Animation */}
            <div className="hero-title">
              <motion.h1
                className="text-7xl md:text-9xl font-black mb-6 leading-none"
                style={{
                  background: 'linear-gradient(45deg, #ffffff, #3b82f6, #8b5cf6, #ec4899)',
                  backgroundSize: '400% 400%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                AI VOICE
              </motion.h1>
            </div>

            <div className="hero-title">
                          <motion.h2
              className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "backOut" }}
            >
                SYNTHESIS STUDIO
              </motion.h2>
            </div>

            {/* Enhanced Subtitle */}
            <motion.p
              className="hero-subtitle text-2xl md:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Transform text into{' '}
              <motion.span
                className="text-blue-400 font-semibold"
                animate={{ color: ['#3b82f6', '#8b5cf6', '#ec4899', '#3b82f6'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                authentic celebrity voices
              </motion.span>
              {' '}with cutting-edge AI technology
            </motion.p>

            {/* Enhanced System Status */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-6 mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant={isSystemReady ? "default" : "secondary"}
                  className={`px-6 py-3 text-base font-medium ${
                    isSystemReady
                      ? 'bg-green-500/20 text-green-300 border-green-500/30 shadow-lg shadow-green-500/20'
                      : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30 shadow-lg shadow-yellow-500/20'
                  }`}
                >
                  <motion.div
                    animate={{ rotate: isSystemReady ? 0 : 360 }}
                    transition={{ duration: 2, repeat: isSystemReady ? 0 : Infinity, ease: "linear" }}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                  </motion.div>
                  {isSystemReady ? 'System Ready' : 'Initializing...'}
                </Badge>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-6 py-3 text-base font-medium shadow-lg shadow-blue-500/20"
                >
                  <Music className="w-5 h-5 mr-2" />
                  {Array.isArray(voices) ? voices.length : 0} Premium Voices
                </Badge>
              </motion.div>
            </motion.div>

            {/* Enhanced CTA Button */}
            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "backOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="px-12 py-6 text-xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-500 shadow-2xl shadow-blue-500/25 border-0 rounded-2xl"
                  onClick={() => {
                    document.getElementById('voices-section')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Play className="w-6 h-6 mr-3" />
                  </motion.div>
                  Start Creating
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            animate={{ 
              y: [0, 15, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="cursor-pointer"
            >
              <ChevronDown className="w-10 h-10 text-gray-400" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Voice Selection Section */}
      <section id="voices-section" className="relative py-32 animate-on-scroll mt-40">
        <motion.div 
          style={{ y: y2 }}
          className="container mx-auto px-4 z-10"
        >
          <AnimatedText className="text-center mb-20" delay={0.2}>
            <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Choose Your Voice
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Select from our collection of{' '}
              <span className="text-blue-400 font-semibold">premium celebrity voices</span>
              {' '}powered by advanced AI
            </p>
          </AnimatedText>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {Array.isArray(voices) ? (
              voices.map((voice, index) => (
                <VoiceCard
                  key={voice.id}
                  voice={voice}
                  isSelected={selectedVoice?.id === voice.id}
                  onSelect={handleVoiceSelect}
                  index={index}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 text-lg">Loading voices...</div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Text Input Section */}
      <section className="relative py-32 animate-on-scroll">
        <div className="container mx-auto px-4 z-10">
          <AnimatedText className="max-w-4xl mx-auto" delay={0.3}>
            <div className="text-center mb-16">
              <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Enter Your Text
              </h2>
              <p className="text-2xl text-gray-300 font-light">
                Type the message you want to convert to speech
              </p>
            </div>

            <TextInput
              value={inputText}
              onChange={setInputText}
              placeholder={`Enter text to synthesize with ${selectedVoice?.name || 'selected voice'}...`}
              maxLength={1000}
              disabled={synthesisState.isLoading}
            />

            {/* RAG Toggle */}
            <motion.div
              className="mt-8 flex items-center justify-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10">
                <Switch
                  id="rag-mode"
                  checked={useRag}
                  onCheckedChange={setUseRag}
                  className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-600"
                />
                <Label 
                  htmlFor="rag-mode" 
                  className="text-lg font-medium text-white cursor-pointer"
                >
                  Use RAG
                </Label>
                {useRag && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-2"
                  >
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      Active
                    </Badge>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Enhanced Generate Button */}
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={handleSynthesize}
                  disabled={!selectedVoice || !inputText.trim() || synthesisState.isLoading}
                  className="px-12 py-6 text-xl font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 transition-all duration-500 disabled:opacity-50 shadow-2xl shadow-purple-500/25 border-0 rounded-2xl"
                >
                  {synthesisState.isLoading ? (
                    <>
                      <motion.div
                        className="w-6 h-6 mr-3 border-3 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Synthesizing Magic...
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Sparkles className="w-6 h-6 mr-3" />
                      </motion.div>
                      Generate Voice
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </AnimatedText>
        </div>
      </section>

      {/* Synthesis Progress */}
      <AnimatePresence>
        {synthesisState.isLoading && (
          <motion.section
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative py-32"
          >
            <div className="container mx-auto px-4 z-10">
              <LoadingSpinner
                progress={synthesisState.progress}
                accentColor={selectedVoice?.accent || '#3b82f6'}
              />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Audio Player Section */}
      <AnimatePresence>
        {synthesisState.audioUrl && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="relative py-32"
          >
            <div className="container mx-auto px-4 z-10">
              <AnimatedText className="text-center mb-16">
                <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-green-200 to-blue-200 bg-clip-text text-transparent">
                  Your Voice is Ready
                </h2>
                <p className="text-2xl text-gray-300 font-light">
                  Listen to your generated{' '}
                  <span className="text-green-400 font-semibold">{selectedVoice?.name}</span>
                  {' '}voice
                </p>
              </AnimatedText>

              <AudioPlayer
                audioUrl={synthesisState.audioUrl}
                onDownload={handleDownload}
                accentColor={selectedVoice?.accent || '#3b82f6'}
              />

              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    onClick={resetSynthesis}
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl"
                  >
                    <Waveform className="w-5 h-5 mr-2" />
                    Generate Another
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Error State */}
      <AnimatePresence>
        {synthesisState.error && (
          <motion.section
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative py-32"
          >
            <div className="container mx-auto px-4 z-10">
              <Card className="max-w-lg mx-auto p-8 bg-red-500/10 border-red-500/30 backdrop-blur-sm">
                <div className="text-center">
                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Volume2 className="w-10 h-10 text-red-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-red-300 mb-4">
                    Synthesis Failed
                  </h3>
                  <p className="text-red-200 mb-6 text-lg">
                    {synthesisState.error}
                  </p>
                  <Button
                    onClick={resetSynthesis}
                    className="bg-red-600 hover:bg-red-700 px-8 py-3 text-lg rounded-xl"
                  >
                    Try Again
                  </Button>
                </div>
              </Card>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Enhanced Footer */}
      <footer className="relative py-20 border-t border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 z-10">
          <div className="text-center">
            <motion.p
              className="text-gray-400 text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              © 2024 AI Voice Synthesis Studio. Powered by{' '}
              <span className="text-blue-400 font-semibold">advanced AI technology</span>.
            </motion.p>
          </div>
        </div>
      </footer>

      <ScrollToTop />
      <Toaster theme="dark" />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <AppContent />
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;