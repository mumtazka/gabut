import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, Linkedin, ExternalLink } from 'lucide-react';

const CardShell = ({ children, mouseX, mouseY, onMouseMove, onMouseLeave, delay }) => {
    // rotation calculation
    const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
    const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay }}
            className="group relative h-[450px] w-full perspective-1000"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
        >
            {children}
        </motion.div>
    );
}

const AdvisorCard = ({ name, role, expertise, image, delay }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <CardShell
            mouseX={mouseX}
            mouseY={mouseY}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            delay={delay}
        >
            <div className="relative h-full flex flex-col z-20 bg-slate-900/80 backdrop-blur-md rounded-xl overflow-hidden p-[1px]">
                {/* Gradient Border flowing */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-yellow-500 opacity-20 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative h-full bg-slate-900 rounded-xl overflow-hidden flex flex-col">
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden group-hover:h-56 transition-all duration-300 ease-out">
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col relative">
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#FFD700] transition-colors">{name}</h3>
                        <p className="text-blue-400 font-medium mb-4">{role}</p>

                        <div className="mb-6">
                            <span className="text-xs text-slate-400 uppercase tracking-widest">Expertise</span>
                            <p className="text-slate-300 mt-1">{expertise}</p>
                        </div>

                        <div className="mt-auto flex gap-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <button className="p-2 rounded-full bg-white/10 hover:bg-[#0066CC] hover:text-white text-slate-300 transition-colors">
                                <Mail size={18} />
                            </button>
                            <button className="p-2 rounded-full bg-white/10 hover:bg-[#0077b5] hover:text-white text-slate-300 transition-colors">
                                <Linkedin size={18} />
                            </button>
                            <button className="ml-auto flex items-center gap-2 text-sm text-[#FFD700] hover:underline">
                                Profile <ExternalLink size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </CardShell>
    );
};

const AdvisorSection = () => {
    const advisors = [
        {
            name: "Dr. Budi Santoso",
            role: "Lead Advisor",
            expertise: "Software Engineering & AI",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&q=80",
        },
        {
            name: "Siti Rahmawati, M.Kom",
            role: "Industry Liaison",
            expertise: "Cloud Computing & DevOps",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop&q=80",
        },
        {
            name: "Ahmad Rizky",
            role: "Technical Mentor",
            expertise: "Frontend Architecture",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop&q=80",
        },
    ];

    return (
        <section className="py-24 px-4 relative z-20">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-orange-500 mb-4 inline-block">
                        Our Advisors
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Guided by industry experts and academic leaders committed to your professional growth.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {advisors.map((advisor, index) => (
                        <AdvisorCard key={index} {...advisor} delay={index * 0.2} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AdvisorSection;
