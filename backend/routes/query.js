import express from 'express';
import { supabase } from '../config/supabase.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Execute custom query
router.post('/execute', authMiddleware, async (req, res) => {
    try {
        const { table, select, filters, orderBy, limit } = req.body;

        if (!table) {
            return res.status(400).json({ error: 'Table name required' });
        }

        // Build query
        let query = supabase.from(table);

        // Select columns
        if (select && select.length > 0) {
            query = query.select(select.join(', '));
        } else {
            query = query.select('*');
        }

        // Apply filters
        if (filters && Array.isArray(filters)) {
            filters.forEach(filter => {
                const { column, operator, value } = filter;

                switch (operator) {
                    case 'eq':
                        query = query.eq(column, value);
                        break;
                    case 'neq':
                        query = query.neq(column, value);
                        break;
                    case 'gt':
                        query = query.gt(column, value);
                        break;
                    case 'gte':
                        query = query.gte(column, value);
                        break;
                    case 'lt':
                        query = query.lt(column, value);
                        break;
                    case 'lte':
                        query = query.lte(column, value);
                        break;
                    case 'like':
                        query = query.like(column, `%${value}%`);
                        break;
                    case 'ilike':
                        query = query.ilike(column, `%${value}%`);
                        break;
                    case 'in':
                        query = query.in(column, value);
                        break;
                    case 'is':
                        query = query.is(column, value);
                        break;
                    default:
                        break;
                }
            });
        }

        // Apply ordering
        if (orderBy) {
            const { column, ascending = true } = orderBy;
            query = query.order(column, { ascending });
        }

        // Apply limit
        if (limit) {
            query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Query error:', error);
            return res.status(500).json({ error: 'Query execution failed', details: error.message });
        }

        return res.json({ success: true, data, count: data.length });
    } catch (error) {
        console.error('Execute error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Get list of tables
router.get('/tables', authMiddleware, async (req, res) => {
    try {
        // Query Supabase information schema
        const { data, error } = await supabase
            .rpc('get_table_names');

        if (error) {
            // Fallback: return common tables
            return res.json({
                tables: ['photos', 'admin_users']
            });
        }

        return res.json({ tables: data });
    } catch (error) {
        console.error('Tables error:', error);
        return res.json({ tables: ['photos', 'admin_users'] });
    }
});

// Get table schema
router.get('/schema/:table', authMiddleware, async (req, res) => {
    try {
        const { table } = req.params;

        // Get first row to infer schema
        const { data, error } = await supabase
            .from(table)
            .select('*')
            .limit(1);

        if (error) {
            console.error('Schema error:', error);
            return res.status(500).json({ error: 'Failed to fetch schema' });
        }

        if (!data || data.length === 0) {
            return res.json({ columns: [] });
        }

        const columns = Object.keys(data[0]).map(key => ({
            name: key,
            type: typeof data[0][key]
        }));

        return res.json({ columns });
    } catch (error) {
        console.error('Schema error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
