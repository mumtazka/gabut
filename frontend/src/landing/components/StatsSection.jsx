import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Users, Briefcase, Clock, Award } from 'lucide-react';

const Counter = ({ value, label, icon: Icon, delay }) => {
    const ref = useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { stiffness: 50, damping: 20 });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    // Format number for display
    const [displayValue, setDisplayValue] = React.useState(0);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
    }, [springValue]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: delay, duration: 0.8 }}
            className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group"
        >
            <div className="p-4 rounded-full bg-blue-500/20 text-blue-400 mb-4 group-hover:scale-110 group-hover:bg-blue-500/30 transition-all duration-300">
                <Icon size={32} />
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-br from-white to-blue-200">
                {displayValue}+
            </h3>
            <p className="text-gray-400 font-medium tracking-wide uppercase text-sm">{label}</p>
        </motion.div>
    );
};

const StatsSection = () => {
    const stats = [
        { label: "Active Projects", value: 50, icon: Briefcase },
        { label: "Students Placed", value: 120, icon: Users },
        { label: "Partner Companies", value: 35, icon: Award },
        { label: "Hours of Experience", value: 5000, icon: Clock },
    ];

    return (
        <section className="py-20 relative z-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <Counter
                            key={index}
                            {...stat}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
