import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './ui/button';
import { Sparkles, ArrowRight, Shield } from 'lucide-react';

export const Hero = ({ onAdminOpen }) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [scrambledText, setScrambledText] = useState('');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const finalText = 'Internship Journey';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  // Mouse follow spotlight effect
  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  // Text scramble effect on load
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setScrambledText(
        finalText
          .split('')
          .map((letter, index) => {
            if (letter === ' ') return ' ';
            if (index < iteration) {
              return finalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= finalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        '--x': `${mousePosition.x}%`,
        '--y': `${mousePosition.y}%`,
      }}
    >
      {/* Animated gradient background with parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 opacity-60"
      />
      
      {/* Mouse follow spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, hsl(220 76% 58% / 0.15), transparent 60%)`,
          transition: 'background 0.3s ease',
        }}
      />

      {/* Floating decorative elements */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-float"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl animate-float-slow"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-2xl animate-float"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Main content */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        {/* Glass card with stunning effects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card p-12 md:p-16 rounded-3xl relative overflow-hidden group"
        >
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-3xl animate-border-glow pointer-events-none" 
               style={{ border: '2px solid transparent' }} 
          />
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-shimmer bg-[length:200%_100%] opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-shimmer pointer-events-none" />

          {/* Icon badge with pulse */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-xl opacity-60 animate-pulse-glow" />
              <div className="relative bg-gradient-primary p-4 rounded-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Scrambled text headline */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display mb-6 text-gradient-primary"
          >
            {scrambledText || finalText}
          </motion.h1>

          {/* Subtitle with staggered animation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Experience innovation through collaboration. 
            <span className="text-foreground font-semibold"> Witness the future </span> 
            of learning and growth.
          </motion.p>

          {/* Stats with count-up animation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-3 gap-8 mb-10 max-w-2xl mx-auto"
          >
            {[
              { value: '50+', label: 'Projects' },
              { value: '100+', label: 'Team Members' },
              { value: '24/7', label: 'Support' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
                className="glass-card p-4 rounded-2xl hover:shadow-glow transition-shadow duration-300"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-gradient-primary text-white px-8 py-6 text-lg rounded-2xl shadow-glow hover:shadow-elevated transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={onAdminOpen}
              className="glass-card px-8 py-6 text-lg rounded-2xl hover:shadow-glass transition-all duration-300 hover:scale-105 group"
            >
              <Shield className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Admin Panel
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-muted-foreground text-sm"
          >
            <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full mx-auto mb-2 relative">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-primary rounded-full absolute left-1/2 top-2 -translate-x-1/2"
              />
            </div>
            Scroll to explore
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
