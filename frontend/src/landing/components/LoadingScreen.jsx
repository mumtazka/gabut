import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="mb-8 p-6 rounded-3xl bg-white/5 border border-white/10"
            >
                <Shield className="w-16 h-16 text-[#FFD700]" strokeWidth={1} />
            </motion.div>

            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-[#FFD700]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                />
            </div>

            <motion.h2
                className="mt-4 text-white/50 font-mono text-sm tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                INITIALIZING SYSTEM...
            </motion.h2>
        </div>
    );
};

export default LoadingScreen;
