import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { supabase } from '../config/supabase.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Upload photo to Cloudinary
router.post('/photo', authMiddleware, upload.single('photo'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { title, description } = req.body;

        // Upload to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'pkl-photos',
                resource_type: 'auto'
            },
            async (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return res.status(500).json({ error: 'Upload failed' });
                }

                // Save to Supabase
                const { data, error: dbError } = await supabase
                    .from('photos')
                    .insert({
                        url: result.secure_url,
                        cloudinary_id: result.public_id,
                        title: title || 'Untitled',
                        description: description || '',
                        uploaded_by: req.user.email
                    })
                    .select()
                    .single();

                if (dbError) {
                    console.error('Database error:', dbError);
                    return res.status(500).json({ error: 'Failed to save photo metadata' });
                }

                return res.json({
                    success: true,
                    photo: data
                });
            }
        );

        uploadStream.end(req.file.buffer);
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all photos
router.get('/photos', authMiddleware, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('photos')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Failed to fetch photos' });
        }

        return res.json({ photos: data });
    } catch (error) {
        console.error('Fetch error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete photo
router.delete('/photo/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        // Get photo details
        const { data: photo, error: fetchError } = await supabase
            .from('photos')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !photo) {
            return res.status(404).json({ error: 'Photo not found' });
        }

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(photo.cloudinary_id);

        // Delete from database
        const { error: deleteError } = await supabase
            .from('photos')
            .delete()
            .eq('id', id);

        if (deleteError) {
            console.error('Delete error:', deleteError);
            return res.status(500).json({ error: 'Failed to delete photo' });
        }

        return res.json({ success: true, message: 'Photo deleted' });
    } catch (error) {
        console.error('Delete error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
