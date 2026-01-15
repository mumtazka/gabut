import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { Button } from './ui/button';

const BentoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Gallery images - user will replace these
  const galleryItems = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
      title: 'Team Collaboration',
      caption: 'Working together on innovative solutions',
      size: 'large' // spans 2 columns
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800',
      title: 'Strategy Session',
      caption: 'Planning our next big project',
      size: 'medium'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800',
      title: 'Creative Workspace',
      caption: 'Where magic happens',
      size: 'medium'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1535957998253-26ae1ef29506?w=800',
      title: 'Modern Office',
      caption: 'Our inspiring environment',
      size: 'tall' // spans 2 rows
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1622675363311-3e1904dc1885?w=800',
      title: 'Innovation Hub',
      caption: 'Building the future together',
      size: 'medium'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      title: 'Tech Setup',
      caption: 'State-of-the-art technology',
      size: 'medium'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1648737966636-2fc3a5fffc8a?w=800',
      title: 'Development',
      caption: 'Coding excellence',
      size: 'large'
    },
    {
      id: 8,
      src: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?w=800',
      title: 'Team Spirit',
      caption: 'United in our mission',
      size: 'medium'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

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
          <motion.div
            initial={{ scale: 0 }}
            animate={controls}
            variants={{
              visible: { scale: 1 }
            }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6"
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium">Gallery</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 text-gradient-primary">
            Our Journey in Pictures
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Moments that define our internship experience
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="bento-grid"
        >
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`image-${item.id}`}
              variants={itemVariants}
              className={`bento-item bento-item-${item.size}`}
            >
              <GalleryItem 
                item={item} 
                onClick={() => setSelectedImage(item)} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Expanded Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <ImageModal 
            item={selectedImage} 
            onClose={() => setSelectedImage(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

// Gallery Item Component with Hover Effects
const GalleryItem = ({ item, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative h-full overflow-hidden rounded-3xl cursor-pointer group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      {/* Image */}
      <motion.img
        src={item.src}
        alt={item.title}
        className="w-full h-full object-cover"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Overlay gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: isHovered ? 1 : 0.6 }}
        transition={{ duration: 0.3 }}
      />

      {/* Zoom icon */}
      <motion.div
        className="absolute top-4 right-4 glass-card p-3 rounded-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8
        }}
        transition={{ duration: 0.2 }}
      >
        <ZoomIn className="w-5 h-5" />
      </motion.div>

      {/* Caption - Slides up on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6"
        initial={{ y: 20 }}
        animate={{ y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        <motion.h3 
          className="text-xl font-bold text-white mb-2 font-display"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {item.title}
        </motion.h3>
        
        <motion.p
          className="text-sm text-white/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {item.caption}
        </motion.p>
      </motion.div>

      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 bg-shimmer bg-[length:200%_100%]"
        initial={{ backgroundPosition: '-200% center', opacity: 0 }}
        animate={{ 
          backgroundPosition: isHovered ? '200% center' : '-200% center',
          opacity: isHovered ? 0.3 : 0
        }}
        transition={{ 
          backgroundPosition: { duration: 0.8 },
          opacity: { duration: 0.3 }
        }}
      />
    </motion.div>
  );
};

// Image Modal Component with Smooth Expansion
const ImageModal = ({ item, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 right-6 glass-card rounded-full w-12 h-12 hover:bg-white/20 z-10"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Expanded image with smooth animation */}
      <motion.div
        layoutId={`image-${item.id}`}
        className="relative max-w-5xl w-full max-h-[90vh] rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-contain"
        />
        
        {/* Caption overlay */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 glass-card p-8 m-6 rounded-2xl"
        >
          <h3 className="text-2xl font-bold mb-2 font-display">{item.title}</h3>
          <p className="text-muted-foreground">{item.caption}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default BentoGallery;
