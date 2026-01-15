import express from 'express';
import { supabase } from '../config/supabase.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Generic CRUD operations for any table

// Create
router.post('/:table', authMiddleware, async (req, res) => {
    try {
        const { table } = req.params;
        const data = req.body;

        const { data: result, error } = await supabase
            .from(table)
            .insert(data)
            .select()
            .single();

        if (error) {
            console.error('Create error:', error);
            return res.status(500).json({ error: 'Failed to create record' });
        }

        return res.json({ success: true, data: result });
    } catch (error) {
        console.error('Create error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Read all
router.get('/:table', authMiddleware, async (req, res) => {
    try {
        const { table } = req.params;
        const { limit = 100, offset = 0 } = req.query;

        const { data, error, count } = await supabase
            .from(table)
            .select('*', { count: 'exact' })
            .range(offset, offset + limit - 1);

        if (error) {
            console.error('Read error:', error);
            return res.status(500).json({ error: 'Failed to fetch records' });
        }

        return res.json({ success: true, data, count });
    } catch (error) {
        console.error('Read error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Read one
router.get('/:table/:id', authMiddleware, async (req, res) => {
    try {
        const { table, id } = req.params;

        const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Read error:', error);
            return res.status(404).json({ error: 'Record not found' });
        }

        return res.json({ success: true, data });
    } catch (error) {
        console.error('Read error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Update
router.put('/:table/:id', authMiddleware, async (req, res) => {
    try {
        const { table, id } = req.params;
        const updates = req.body;

        const { data, error } = await supabase
            .from(table)
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Update error:', error);
            return res.status(500).json({ error: 'Failed to update record' });
        }

        return res.json({ success: true, data });
    } catch (error) {
        console.error('Update error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete
router.delete('/:table/:id', authMiddleware, async (req, res) => {
    try {
        const { table, id } = req.params;

        const { error } = await supabase
            .from(table)
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Delete error:', error);
            return res.status(500).json({ error: 'Failed to delete record' });
        }

        return res.json({ success: true, message: 'Record deleted' });
    } catch (error) {
        console.error('Delete error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
