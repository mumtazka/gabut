import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Database, LogOut, Image } from 'lucide-react';
import api from '../services/api';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            navigate('/admin/login');
            return;
        }

        api.verifyToken(token).then(result => {
            if (!result.valid) {
                navigate('/admin/login');
            } else {
                setUser(result.user);
            }
        }).catch(() => {
            navigate('/admin/login');
        });
    }, [navigate]);

    const handleLogout = () => {
        api.clearToken();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
                        <p className="text-slate-300">Welcome back, {user?.email}</p>
                    </div>
                    <Button onClick={handleLogout} variant="outline" className="gap-2">
                        <LogOut className="w-4 h-4" />
                        Logout
                    </Button>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card
                        className="cursor-pointer hover:shadow-glow transition-all duration-300 bg-card/50 backdrop-blur border-primary/20"
                        onClick={() => navigate('/admin/photos')}
                    >
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                                <Image className="w-6 h-6 text-primary" />
                            </div>
                            <CardTitle>Photo Upload</CardTitle>
                            <CardDescription>
                                Upload and manage photos with Cloudinary
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full">
                                <Upload className="w-4 h-4 mr-2" />
                                Manage Photos
                            </Button>
                        </CardContent>
                    </Card>

                    <Card
                        className="cursor-pointer hover:shadow-glow transition-all duration-300 bg-card/50 backdrop-blur border-primary/20"
                        onClick={() => navigate('/admin/query')}
                    >
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                                <Database className="w-6 h-6 text-primary" />
                            </div>
                            <CardTitle>Query Builder</CardTitle>
                            <CardDescription>
                                Execute custom database queries
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full">
                                <Database className="w-4 h-4 mr-2" />
                                Build Queries
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
