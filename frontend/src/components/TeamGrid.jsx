import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  MessageCircle, Github, Linkedin, Mail, Award,
  X, ExternalLink, Calendar, Code, Zap, Heart,
  Star, Trophy, ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

const TeamGrid = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const teamData = {
    mentor: {
      name: 'Dr. Sarah Johnson',
      role: 'Program Mentor',
      level: 'mentor',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: 'Leading innovation in tech education with 15+ years of experience in distributed systems and cloud architecture.',
      stats: { projects: 50, mentees: 200, awards: 5 },
      social: { github: '#', linkedin: '#', email: 'sarah@example.com' },
      skills: ['System Design', 'Cloud Architecture', 'Leadership', 'AI/ML'],
      experience: '15+ Years',
      joined: 'January 2024'
    },
    leader: {
      name: 'Alex Rivera',
      role: 'Team Leader',
      level: 'leader',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: 'Passionate about building scalable solutions and mentoring developers. Focused on frontend performance and UI/UX.',
      stats: { projects: 30, commits: 1500, reviews: 250 },
      social: { github: '#', linkedin: '#', email: 'alex@example.com' },
      skills: ['React', 'TypeScript', 'Project Management', 'UI/UX'],
      experience: '8+ Years',
      joined: 'March 2024'
    },
    members: [
      {
        id: 1,
        name: 'Emily Chen',
        role: 'Frontend Developer',
        level: 'member',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        bio: 'Specializing in creating immersive user experiences with React and Framer Motion.',
        stats: { projects: 12, commits: 450, reviews: 80 },
        social: { github: '#', linkedin: '#', email: 'emily@example.com' },
        skills: ['React', 'Framer Motion', 'Tailwind CSS'],
        experience: '3+ Years',
        joined: 'May 2024'
      },
      {
        id: 2,
        name: 'Marcus Williams',
        role: 'Backend Engineer',
        level: 'member',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        bio: 'Focused on building robust and scalable APIs using Node.js and PostgreSQL.',
        stats: { projects: 15, commits: 520, reviews: 95 },
        social: { github: '#', linkedin: '#', email: 'marcus@example.com' },
        skills: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
        experience: '5+ Years',
        joined: 'June 2024'
      },
      {
        id: 3,
        name: 'Priya Patel',
        role: 'Full Stack Developer',
        level: 'member',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        bio: 'Bridging the gap between frontend elegance and backend efficiency.',
        stats: { projects: 10, commits: 380, reviews: 70 },
        social: { github: '#', linkedin: '#', email: 'priya@example.com' },
        skills: ['MERN Stack', 'GraphQL', 'AWS'],
        experience: '4+ Years',
        joined: 'July 2024'
      },
      {
        id: 4,
        name: 'Jordan Lee',
        role: 'DevOps Engineer',
        level: 'member',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        bio: 'Streamlining deployment pipelines and ensuring high availability.',
        stats: { projects: 20, commits: 410, reviews: 110 },
        social: { github: '#', linkedin: '#', email: 'jordan@example.com' },
        skills: ['Kubernetes', 'CI/CD', 'Terraform', 'Vault'],
        experience: '6+ Years',
        joined: 'August 2024'
      }
    ]
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 text-sm px-4 py-1.5 bg-primary/10 text-primary border-primary/20">
            Our Team
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 text-gradient-primary">
            Meet the Dream Team
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A hierarchy of excellence, innovation, and collaboration
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-12"
        >
          {/* Level 1 & 2: Mentor and Leader Cards - Stacked & Centered */}
          <div className="flex flex-col items-center gap-8 max-w-md mx-auto">
            <motion.div variants={itemVariants} className="w-full">
              <UnifiedCard
                data={teamData.mentor}
                onClick={() => setSelectedMember(teamData.mentor)}
                variant="primary"
                label="Level 1 - Mentor"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="w-full">
              <UnifiedCard
                data={teamData.leader}
                onClick={() => setSelectedMember(teamData.leader)}
                variant="secondary"
                label="Level 2 - Leader"
              />
            </motion.div>
          </div>

          {/* Level 3: Members - Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8"
          >
            {teamData.members.map((member) => (
              <motion.div key={member.id} variants={itemVariants}>
                <UnifiedCard
                  data={member}
                  onClick={() => setSelectedMember(member)}
                  variant="accent"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Professional Detail Modal */}
      <ProfileDetailModal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        member={selectedMember}
      />
    </section>
  );
};

// Unified Card Component
const UnifiedCard = ({ data, onClick, variant = 'primary', label }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const colors = {
    primary: 'bg-primary border-primary/30 text-primary',
    secondary: 'bg-secondary border-secondary/30 text-secondary',
    accent: 'bg-accent border-accent/30 text-accent'
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    setRotation({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotation({ x: 0, y: 0 })}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
      className="relative glass-card rounded-2xl p-5 cursor-pointer group hover:shadow-elevated transition-shadow duration-300"
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative mb-5 overflow-hidden rounded-xl aspect-[4/5]">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {label && (
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${variant === 'primary' ? 'bg-primary' : variant === 'secondary' ? 'bg-secondary' : 'bg-accent'}`}>
            {label}
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div className="flex flex-col">
            <h4 className="text-lg font-bold text-white leading-tight">{data.name}</h4>
            <p className="text-xs text-white/70">{data.role}</p>
          </div>
          <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg group-hover:bg-primary/20 transition-colors">
            <ChevronRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] text-muted-foreground font-medium uppercase tracking-widest px-1">
        <span>{data.experience || '3+ yrs exp'}</span>
        <span>{data.joined || 'joined 2024'}</span>
      </div>
    </motion.div>
  );
};

// Professional Profile Detail Modal - "God-Tier" Aesthetic
const ProfileDetailModal = ({ isOpen, onClose, member }) => {
  if (!member) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-slate-950 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/50 hover:bg-white/10 text-white z-20 transition-colors backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Image & Basic Info */}
            <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-slate-950/40 to-slate-950 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 right-8">
                <Badge className="mb-3 bg-primary text-white text-[10px]">
                  {member.level.toUpperCase()}
                </Badge>
                <h2 className="text-3xl font-bold text-white mb-1">{member.name}</h2>
                <p className="text-primary font-medium">{member.role}</p>
              </div>
            </div>

            {/* Right Column: Details & Stats */}
            <div className="flex-1 p-8 md:p-12 overflow-y-auto no-scrollbar bg-slate-950">
              <section className="mb-8">
                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Professional Biography
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {member.bio}
                </p>
              </section>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {Object.entries(member.stats).map(([key, value]) => (
                  <div key={key} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center group hover:border-primary/50 transition-colors">
                    <div className="text-2xl font-bold text-white mb-1 uppercase tracking-tight">{value}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest">{key}</div>
                  </div>
                ))}
              </div>

              <section className="mb-8">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Code className="w-4 h-4 text-blue-500" />
                  Expertise & Core Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {member.skills?.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                      {skill}
                    </span>
                  )) || ['React', 'TypeScript', 'Tailwind']}
                </div>
              </section>

              <div className="flex items-center justify-between pt-8 border-t border-white/10">
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" className="rounded-xl border-white/10 hover:bg-white/10">
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-xl border-white/10 hover:bg-white/10">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-xl border-white/10 hover:bg-white/10">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 h-11">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TeamGrid;
