import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MessageCircle, Github, Linkedin, Mail, Award } from 'lucide-react';
import CommentModal from './CommentModal';
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

  // Mock data - user will fill this
  const teamData = {
    mentor: {
      name: 'Dr. Sarah Johnson',
      role: 'Program Mentor',
      level: 'mentor',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: 'Leading innovation in tech education with 15+ years of experience',
      stats: { projects: 50, mentees: 200, awards: 5 },
      social: { github: '#', linkedin: '#', email: 'sarah@example.com' }
    },
    leader: {
      name: 'Alex Rivera',
      role: 'Team Leader',
      level: 'leader',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: 'Passionate about building scalable solutions and mentoring developers',
      stats: { projects: 30, commits: 1500, reviews: 250 },
      social: { github: '#', linkedin: '#', email: 'alex@example.com' }
    },
    members: [
      {
        id: 1,
        name: 'Emily Chen',
        role: 'Frontend Developer',
        level: 'member',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        specialty: 'React & UI/UX',
        contributions: 45
      },
      {
        id: 2,
        name: 'Marcus Williams',
        role: 'Backend Engineer',
        level: 'member',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        specialty: 'Node.js & APIs',
        contributions: 52
      },
      {
        id: 3,
        name: 'Priya Patel',
        role: 'Full Stack Developer',
        level: 'member',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        specialty: 'MERN Stack',
        contributions: 38
      },
      {
        id: 4,
        name: 'Jordan Lee',
        role: 'DevOps Engineer',
        level: 'member',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        specialty: 'CI/CD & Cloud',
        contributions: 41
      }
    ]
  };

  const handleComment = (member) => {
    setSelectedMember(member);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
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
          className="space-y-8"
        >
          {/* Level 1: Mentor - Hero Style Card */}
          <motion.div variants={itemVariants}>
            <MentorCard data={teamData.mentor} onComment={handleComment} />
          </motion.div>

          {/* Level 2: Leader - Glassmorphism Card */}
          <motion.div variants={itemVariants}>
            <LeaderCard data={teamData.leader} onComment={handleComment} />
          </motion.div>

          {/* Level 3: Members - 3D Tilt Cards */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {teamData.members.map((member, index) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
              >
                <MemberCard data={member} onComment={handleComment} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Comment Modal */}
      <CommentModal 
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        member={selectedMember}
      />
    </section>
  );
};

// Mentor Card Component with Glowing Border Animation
const MentorCard = ({ data, onComment }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse-glow" />
      
      <div className="relative glass-card rounded-3xl p-8 md:p-12 border-2 border-primary/30 animate-border-glow overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            className="relative flex-shrink-0"
          >
            <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-2xl opacity-50" />
            <img
              src={data.image}
              alt={data.name}
              className="relative w-40 h-40 md:w-48 md:h-48 rounded-3xl object-cover ring-4 ring-primary/50"
            />
            <motion.div
              className="absolute -top-3 -right-3 bg-gradient-primary p-3 rounded-2xl shadow-glow"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Award className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <Badge className="mb-3 bg-primary text-white">Level 1 - Mentor</Badge>
            <h3 className="text-3xl md:text-4xl font-bold font-display mb-2">{data.name}</h3>
            <p className="text-xl text-primary font-semibold mb-4">{data.role}</p>
            <p className="text-muted-foreground mb-6">{data.bio}</p>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-4 mb-6 justify-center md:justify-start">
              {Object.entries(data.stats).map(([key, value]) => (
                <div key={key} className="glass-card px-4 py-2 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{value}</div>
                  <div className="text-xs text-muted-foreground capitalize">{key}</div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-center md:justify-start">
              <Button size="sm" variant="outline" className="rounded-xl">
                <Github className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="rounded-xl">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="rounded-xl">
                <Mail className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                onClick={() => onComment(data)}
                className="bg-primary hover:bg-primary/90 rounded-xl"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Leader Card Component with Unique Glassmorphism
const LeaderCard = ({ data, onComment }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative group"
    >
      <div className="glass-card rounded-3xl p-8 md:p-10 backdrop-blur-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="relative flex-shrink-0"
          >
            <img
              src={data.image}
              alt={data.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover ring-2 ring-secondary/50"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/20 to-transparent" />
          </motion.div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <Badge className="mb-3 bg-secondary text-white">Level 2 - Leader</Badge>
            <h3 className="text-2xl md:text-3xl font-bold font-display mb-2">{data.name}</h3>
            <p className="text-lg text-secondary font-semibold mb-3">{data.role}</p>
            <p className="text-muted-foreground mb-4">{data.bio}</p>
            
            {/* Stats */}
            <div className="flex gap-4 mb-4 justify-center md:justify-start">
              {Object.entries(data.stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-xl font-bold text-secondary">{value}</div>
                  <div className="text-xs text-muted-foreground capitalize">{key}</div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-center md:justify-start">
              <Button size="sm" variant="outline" className="rounded-xl">
                <Github className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="rounded-xl">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                onClick={() => onComment(data)}
                className="bg-secondary hover:bg-secondary/90 rounded-xl"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Member Card Component with 3D Tilt Effect
const MemberCard = ({ data, onComment }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [showQuickComment, setShowQuickComment] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setShowQuickComment(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setShowQuickComment(true)}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
      className="relative glass-card rounded-2xl p-6 cursor-pointer group hover:shadow-elevated"
    >
      {/* Avatar */}
      <div className="relative mb-4 overflow-hidden rounded-2xl">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          src={data.image}
          alt={data.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Contributions Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 glass-card px-3 py-1 rounded-xl text-sm font-bold"
        >
          {data.contributions} commits
        </motion.div>
      </div>

      {/* Info */}
      <div className="mb-4">
        <h4 className="text-xl font-bold font-display mb-1">{data.name}</h4>
        <p className="text-sm text-muted-foreground mb-2">{data.role}</p>
        <Badge variant="outline" className="text-xs">
          {data.specialty}
        </Badge>
      </div>

      {/* Quick Comment Button (appears on hover) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: showQuickComment ? 1 : 0,
          y: showQuickComment ? 0 : 10
        }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-4 right-4"
      >
        <Button
          size="sm"
          onClick={() => onComment(data)}
          className="rounded-full w-12 h-12 p-0 bg-accent hover:bg-accent/90 shadow-glow"
        >
          <MessageCircle className="w-5 h-5" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default TeamGrid;
