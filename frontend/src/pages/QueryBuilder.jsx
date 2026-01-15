import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Plus, Trash2 } from 'lucide-react';
import api from '../services/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';

const OPERATORS = [
    { value: 'eq', label: 'Equals (=)' },
    { value: 'neq', label: 'Not Equals (!=)' },
    { value: 'gt', label: 'Greater Than (>)' },
    { value: 'gte', label: 'Greater or Equal (>=)' },
    { value: 'lt', label: 'Less Than (<)' },
    { value: 'lte', label: 'Less or Equal (<=)' },
    { value: 'like', label: 'Like (LIKE)' },
    { value: 'ilike', label: 'Case Insensitive Like' },
    { value: 'in', label: 'In (IN)' },
    { value: 'is', label: 'Is (IS)' }
];

export default function QueryBuilder() {
    const navigate = useNavigate();
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');
    const [columns, setColumns] = useState([]);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [filters, setFilters] = useState([]);
    const [orderBy, setOrderBy] = useState({ column: '', ascending: true });
    const [limit, setLimit] = useState(100);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadTables();
    }, []);

    useEffect(() => {
        if (selectedTable) {
            loadSchema(selectedTable);
        }
    }, [selectedTable]);

    const loadTables = async () => {
        try {
            const result = await api.getTables();
            setTables(result.tables || []);
        } catch (error) {
            toast.error('Failed to load tables');
        }
    };

    const loadSchema = async (table) => {
        try {
            const result = await api.getTableSchema(table);
            setColumns(result.columns || []);
            setSelectedColumns([]);
            setFilters([]);
        } catch (error) {
            toast.error('Failed to load schema');
        }
    };

    const addFilter = () => {
        setFilters([...filters, { column: '', operator: 'eq', value: '' }]);
    };

    const removeFilter = (index) => {
        setFilters(filters.filter((_, i) => i !== index));
    };

    const updateFilter = (index, field, value) => {
        const newFilters = [...filters];
        newFilters[index][field] = value;
        setFilters(newFilters);
    };

    const executeQuery = async () => {
        if (!selectedTable) {
            toast.error('Please select a table');
            return;
        }

        setLoading(true);
        try {
            const queryConfig = {
                table: selectedTable,
                select: selectedColumns.length > 0 ? selectedColumns : undefined,
                filters: filters.filter(f => f.column && f.value),
                orderBy: orderBy.column ? orderBy : undefined,
                limit
            };

            const result = await api.executeQuery(queryConfig);
            setResults(result);
            toast.success(`Query executed: ${result.count} rows returned`);
        } catch (error) {
            toast.error(error.response?.data?.error || 'Query failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                <Button onClick={() => navigate('/admin/dashboard')} variant="outline" className="mb-6 gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Button>

                <h1 className="text-4xl font-bold text-white mb-8">Query Builder</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Query Configuration */}
                    <div className="space-y-6">
                        <Card className="bg-card/50 backdrop-blur border-primary/20">
                            <CardHeader>
                                <CardTitle>Table Selection</CardTitle>
                                <CardDescription>Choose a table to query</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Select value={selectedTable} onValueChange={setSelectedTable}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select table" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tables.map(table => (
                                            <SelectItem key={table} value={table}>{table}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </CardContent>
                        </Card>

                        {selectedTable && (
                            <>
                                <Card className="bg-card/50 backdrop-blur border-primary/20">
                                    <CardHeader>
                                        <CardTitle>Columns</CardTitle>
                                        <CardDescription>Select columns to retrieve (leave empty for all)</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {columns.map(col => (
                                                <label key={col.name} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedColumns.includes(col.name)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedColumns([...selectedColumns, col.name]);
                                                            } else {
                                                                setSelectedColumns(selectedColumns.filter(c => c !== col.name));
                                                            }
                                                        }}
                                                        className="rounded"
                                                    />
                                                    <span className="text-sm">{col.name} ({col.type})</span>
                                                </label>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-card/50 backdrop-blur border-primary/20">
                                    <CardHeader>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <CardTitle>Filters</CardTitle>
                                                <CardDescription>Add conditions to filter results</CardDescription>
                                            </div>
                                            <Button size="sm" onClick={addFilter}>
                                                <Plus className="w-4 h-4 mr-2" />
                                                Add Filter
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {filters.map((filter, index) => (
                                                <div key={index} className="flex gap-2 items-end">
                                                    <div className="flex-1 space-y-2">
                                                        <Label>Column</Label>
                                                        <Select value={filter.column} onValueChange={(val) => updateFilter(index, 'column', val)}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Column" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {columns.map(col => (
                                                                    <SelectItem key={col.name} value={col.name}>{col.name}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="flex-1 space-y-2">
                                                        <Label>Operator</Label>
                                                        <Select value={filter.operator} onValueChange={(val) => updateFilter(index, 'operator', val)}>
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {OPERATORS.map(op => (
                                                                    <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="flex-1 space-y-2">
                                                        <Label>Value</Label>
                                                        <Input
                                                            value={filter.value}
                                                            onChange={(e) => updateFilter(index, 'value', e.target.value)}
                                                            placeholder="Value"
                                                        />
                                                    </div>
                                                    <Button size="icon" variant="destructive" onClick={() => removeFilter(index)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                            {filters.length === 0 && (
                                                <p className="text-sm text-muted-foreground text-center">No filters added</p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-card/50 backdrop-blur border-primary/20">
                                    <CardHeader>
                                        <CardTitle>Options</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Limit</Label>
                                            <Input
                                                type="number"
                                                value={limit}
                                                onChange={(e) => setLimit(parseInt(e.target.value))}
                                                min="1"
                                                max="1000"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Button onClick={executeQuery} className="w-full" disabled={loading}>
                                    <Play className="w-4 h-4 mr-2" />
                                    {loading ? 'Executing...' : 'Execute Query'}
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Results */}
                    <Card className="bg-card/50 backdrop-blur border-primary/20 lg:sticky lg:top-8 h-fit">
                        <CardHeader>
                            <CardTitle>Results</CardTitle>
                            <CardDescription>
                                {results ? `${results.count} rows returned` : 'Execute a query to see results'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {results ? (
                                <div className="overflow-auto max-h-[600px]">
                                    <pre className="text-xs bg-slate-900 p-4 rounded-lg overflow-x-auto">
                                        {JSON.stringify(results.data, null, 2)}
                                    </pre>
                                </div>
                            ) : (
                                <p className="text-center text-muted-foreground">No results yet</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
