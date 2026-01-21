import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Shield, Menu, X } from 'lucide-react';

import Hero from './components/Hero';
import AdvisorSection from './components/AdvisorSection';
import StatsSection from './components/StatsSection';
import InteractiveBackground from './components/InteractiveBackground';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';

import TeamGrid from '../components/TeamGrid';
import BentoGallery from '../components/BentoGallery';

const Navbar = ({ visible }) => {
    const navigate = useNavigate();

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between"
            initial={{ y: -100 }}
            animate={{ y: visible ? 0 : -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Shield className="w-8 h-8 text-[#FFD700]" />
                <span className="font-bold text-white tracking-wider">PKL FV UNY</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                <button onClick={() => scrollToSection('stats')} className="hover:text-white transition-colors">Program</button>
                <button onClick={() => scrollToSection('advisors')} className="hover:text-white transition-colors">Advisors</button>
                <button onClick={() => scrollToSection('team')} className="hover:text-white transition-colors">Students</button>
                <button onClick={() => scrollToSection('gallery')} className="hover:text-white transition-colors">Gallery</button>
                <button
                    onClick={() => navigate('/admin/login')}
                    className="px-5 py-2 rounded-full bg-white/10 hover:bg-[#0066CC] text-white transition-all"
                >
                    Login Portal
                </button>
            </div>

            <button className="md:hidden text-white">
                <Menu />
            </button>
        </motion.nav>
    );
};

const LandingPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showNavbar, setShowNavbar] = useState(false);
    const { scrollY } = useScroll();
    const progressScale = useTransform(scrollY, [0, 2000], [0, 1]);

    // Handle Loading Simulation - Only show on first visit
    useEffect(() => {
        const hasVisited = sessionStorage.getItem('hasVisited');
        if (hasVisited) {
            setIsLoading(false);
        } else {
            const timer = setTimeout(() => {
                setIsLoading(false);
                sessionStorage.setItem('hasVisited', 'true');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    // Handle Navbar Visibility (Show after 300px scroll)
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 300 && !showNavbar) setShowNavbar(true);
        if (latest <= 300 && showNavbar) setShowNavbar(false);
    });

    // Konami Code Easter Egg
    useEffect(() => {
        let keys = [];
        const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

        const handleKeyDown = (e) => {
            keys.push(e.key);
            keys = keys.slice(-10);
            if (JSON.stringify(keys) === JSON.stringify(konami)) {
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ['#0066CC', '#FFD700', '#ffffff']
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (isLoading) return <LoadingScreen />;

    return (
        <div className="bg-slate-950 min-h-screen text-white selection:bg-blue-500/30 selection:text-[#FFD700] overflow-x-hidden">
            <CustomCursor />

            {/* Background Layer */}
            <InteractiveBackground />

            {/* Navigation */}
            <Navbar visible={showNavbar} />

            {/* Scroll Progress Bar at top */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-[#FFD700] z-50 origin-left"
                style={{ scaleX: progressScale }}
            />

            {/* Main Content */}
            <main className="relative z-10">

                {/* Hero Section (Fixed/Sticky behavior handled internally or via wrapper) */}
                <div className="fixed inset-0 z-0 flex flex-col pointer-events-none">
                    {/* Pointer events none on container so we can click through to content if needed, 
                BUT Hero has buttons. So we need pointer-events-auto on the Hero itself. 
                The Hero component handles its own pointer-events logic based on scroll.
            */}
                    <div className="pointer-events-auto h-full w-full">
                        <Hero />
                    </div>
                </div>

                {/* Spacer for Parallax Scroll */}
                <div className="h-screen w-full invisible pointer-events-none" />

                {/* Content Section that slides up */}
                <div className="relative z-20 bg-slate-950 border-t border-white/10 rounded-t-[3rem] shadow-[0_-50px_100px_rgba(0,0,0,0.8)] overflow-hidden">

                    {/* Decorative Top glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent blur-sm" />

                    <div className="pt-20 pb-40">
                        <div id="stats">
                            <StatsSection />
                        </div>
                        <div id="advisors">
                            <AdvisorSection />
                        </div>
                        <div id="team">
                            <TeamGrid />
                        </div>
                        <div id="gallery">
                            <BentoGallery />
                        </div>

                        {/* Simple Footer */}
                        <footer className="mt-20 pt-10 border-t border-white/5 text-center text-slate-500 text-sm pb-10">
                            <p>© 2025 PKL FV UNY. All rights reserved.</p>
                        </footer>
                    </div>
                </div>

            </main>

            {/* Floating Action Button - Scroll to Top */}
            <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 z-40 bg-[#0066CC] hover:bg-[#0052CC] text-white p-4 rounded-full shadow-lg shadow-blue-500/40 border border-white/20"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                title="Scroll to top"
            >
                <div className="grid place-items-center w-6 h-6">
                    <span className="text-xl font-bold">↑</span>
                </div>
            </motion.button>

        </div>
    );
};

export default LandingPage;
