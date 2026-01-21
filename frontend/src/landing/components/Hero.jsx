import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Shield } from 'lucide-react';

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Hero Title Animations
    const titleScale = useTransform(scrollY, [0, 300], [1, 0.8]);
    const titleOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    const titleBlur = useTransform(scrollY, [0, 300], ["0px", "10px"]);
    const titleY = useTransform(scrollY, [0, 300], [0, -50]);

    // Logo Animations
    const logoRotate = useTransform(scrollY, [0, 300], [0, 360]);
    const logoScale = useTransform(scrollY, [0, 300], [1, 0.3]);
    const logoY = useTransform(scrollY, [0, 300], [0, -300]); // Move up approximates "moving to navbar"
    const logoOpacity = useTransform(scrollY, [200, 400], [1, 0]);

    // Background Dimming
    const bgOpacity = useTransform(scrollY, [0, 400], [1, 0.2]);

    return (
        <motion.section
            ref={containerRef}
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden z-10"
            style={{ opacity: useTransform(scrollY, [300, 500], [1, 0]), pointerEvents: useTransform(scrollY, [400, 500], ['auto', 'none']) }}
        >

            {/* Dynamic Background Element that responds to scroll */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none"
                style={{ opacity: bgOpacity }}
            />

            <div className="relative z-20 flex flex-col items-center text-center px-4">
                {/* Animated 3D Floating Logo */}
                <motion.div
                    style={{
                        rotate: logoRotate,
                        scale: logoScale,
                        y: logoY,
                        opacity: logoOpacity
                    }}
                    className="mb-8 p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_50px_rgba(0,102,204,0.3)]"
                >
                    {/* Using Lucide Shield as placeholder for UNY Logo */}
                    <Shield className="w-24 h-24 text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" fill="currentColor" fillOpacity={0.2} />
                </motion.div>

                {/* Cinematic Title */}
                <motion.div
                    style={{
                        scale: titleScale,
                        opacity: titleOpacity,
                        filter: `blur(${titleBlur})`,
                        y: titleY
                    }}
                    className="flex flex-col items-center"
                >
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200 drop-shadow-[0_0_30px_rgba(0,102,204,0.6)] font-sans">
                        PKL FV UNY
                    </h1>
                    <motion.span
                        className="mt-4 text-3xl md:text-5xl font-light text-[#FFD700] tracking-[0.2em] font-display uppercase"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        2025
                    </motion.span>
                </motion.div>

                {/* CTA Button */}
                <motion.button
                    onClick={() => {
                        const statsSection = document.getElementById('stats');
                        if (statsSection) {
                            statsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,102,204,0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-16 px-8 py-4 bg-[#0066CC] hover:bg-[#0052CC] text-white rounded-full font-semibold text-lg tracking-wide shadow-lg shadow-blue-500/30 transition-all border border-blue-400/30 relative overflow-hidden group cursor-pointer"
                >
                    <span className="relative z-10">Explore Program</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-shimmer" />
                </motion.button>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <span className="text-xs tracking-widest uppercase">Scroll to Discover</span>
                <ArrowDown size={20} />
            </motion.div>
        </motion.section>
    );
};

export default Hero;
