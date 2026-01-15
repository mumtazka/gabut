import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar } from './ui/avatar';
import { toast } from 'sonner';

const CommentModal = ({ isOpen, onClose, member }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'John Doe',
      text: 'Great work on the recent project! Your dedication is inspiring.',
      timestamp: '2 hours ago',
      likes: 5
    },
    {
      id: 2,
      author: 'Jane Smith',
      text: 'Always impressed by your attention to detail.',
      timestamp: '5 hours ago',
      likes: 3
    }
  ]);

  const handleSubmit = () => {
    if (!comment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    const newComment = {
      id: comments.length + 1,
      author: 'You',
      text: comment,
      timestamp: 'Just now',
      likes: 0
    };

    setComments([newComment, ...comments]);
    setComment('');
    toast.success('Comment added successfully!');
  };

  if (!member) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Side Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-background z-50 shadow-elevated overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="glass-card p-6 border-b flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary/30"
                />
              </motion.div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold font-display">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {comments.map((c, index) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-card p-4 rounded-2xl"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                        {c.author[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{c.author}</span>
                          <span className="text-xs text-muted-foreground">{c.timestamp}</span>
                        </div>
                        <p className="text-sm">{c.text}</p>
                      </div>
                    </div>
                    
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors ml-13"
                    >
                      <Heart className="w-4 h-4" />
                      {c.likes > 0 && <span>{c.likes}</span>}
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {comments.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No comments yet. Be the first to comment!</p>
                </div>
              )}
            </div>

            {/* Comment Input */}
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="glass-card p-6 border-t"
            >
              <div className="flex gap-3">
                <Textarea
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[80px] rounded-2xl resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                      handleSubmit();
                    }
                  }}
                />
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-primary hover:shadow-glow transition-all rounded-2xl self-end"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Press Ctrl+Enter to send
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommentModal;
