import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Image as ImageIcon, Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Skeleton } from './ui/skeleton';
import { toast } from 'sonner';

const AdminPanel = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setUploadSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsUploading(true);
    
    // Simulate upload with delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsUploading(false);
    setUploadSuccess(true);
    toast.success('Image uploaded successfully!');
    
    // Reset after 2 seconds
    setTimeout(() => {
      setSelectedFile(null);
      setPreview(null);
      setUploadSuccess(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Center Modal with Dark Neon Theme */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-elevated border border-primary/30 overflow-hidden">
              {/* Neon glow effect */}
              <div className="absolute inset-0 bg-gradient-primary opacity-10 blur-2xl animate-pulse-glow" />
              
              {/* Header */}
              <div className="relative p-6 border-b border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold font-display text-white flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-white" />
                      </div>
                      Admin Dashboard
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">Manage gallery images</p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-white hover:bg-white/10 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6 space-y-6">
                {/* Upload Zone */}
                <div className="space-y-3">
                  <Label className="text-white text-lg font-semibold">Upload Image</Label>
                  
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative"
                  >
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    
                    <label
                      htmlFor="file-upload"
                      className="block cursor-pointer"
                    >
                      <div className="border-2 border-dashed border-primary/40 rounded-2xl p-12 text-center hover:border-primary/60 hover:bg-primary/5 transition-all">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-primary/20 rounded-2xl flex items-center justify-center">
                            <Upload className="w-8 h-8 text-primary" />
                          </div>
                          <div>
                            <p className="text-white font-semibold mb-1">Click to upload image</p>
                            <p className="text-sm text-slate-400">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        </div>
                      </div>
                    </label>
                  </motion.div>
                </div>

                {/* Preview with Skeleton Loading */}
                {preview && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <Label className="text-white text-lg font-semibold">Preview</Label>
                    
                    <div className="relative rounded-2xl overflow-hidden bg-slate-800/50 border border-primary/20">
                      {isUploading ? (
                        <div className="space-y-3 p-4">
                          <Skeleton className="h-64 w-full bg-slate-700/50" />
                          <div className="flex items-center gap-2 text-slate-400">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">Uploading...</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-64 object-cover"
                          />
                          
                          {uploadSuccess && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute inset-0 bg-black/80 flex items-center justify-center"
                            >
                              <div className="text-center">
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: 'spring', stiffness: 200 }}
                                >
                                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-3" />
                                </motion.div>
                                <p className="text-white font-semibold text-lg">Upload Complete!</p>
                              </div>
                            </motion.div>
                          )}
                        </>
                      )}
                    </div>

                    {/* File info */}
                    <div className="flex items-center justify-between text-sm text-slate-400 bg-slate-800/30 p-3 rounded-xl">
                      <span>{selectedFile?.name}</span>
                      <span>{(selectedFile?.size / 1024).toFixed(2)} KB</span>
                    </div>
                  </motion.div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading || uploadSuccess}
                    className="flex-1 bg-gradient-primary hover:shadow-glow transition-all rounded-2xl h-12 text-base font-semibold"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : uploadSuccess ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Uploaded
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Upload Image
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="border-slate-700 text-white hover:bg-slate-800 rounded-2xl h-12 px-8"
                  >
                    Cancel
                  </Button>
                </div>

                {/* Info note */}
                <div className="flex items-start gap-3 bg-primary/10 border border-primary/20 p-4 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-slate-300">
                    <p className="font-semibold mb-1">Note:</p>
                    <p className="text-slate-400">
                      This is a demo admin panel. In production, uploaded images would be saved to your backend storage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdminPanel;
