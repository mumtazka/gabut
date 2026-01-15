import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Trash2, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import api from '../services/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';

export default function PhotoUpload() {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const loadPhotos = useCallback(async () => {
        setLoading(true);
        try {
            const result = await api.getPhotos();
            setPhotos(result.photos || []);
        } catch (error) {
            toast.error('Failed to load photos');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadPhotos();
    }, [loadPhotos]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            toast.error('Please select a file');
            return;
        }

        setUploading(true);
        try {
            await api.uploadPhoto(selectedFile, title, description);
            toast.success('Photo uploaded successfully!');
            setSelectedFile(null);
            setPreview(null);
            setTitle('');
            setDescription('');
            loadPhotos();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this photo?')) return;

        try {
            await api.deletePhoto(id);
            toast.success('Photo deleted');
            loadPhotos();
        } catch (error) {
            toast.error('Failed to delete photo');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                <Button onClick={() => navigate('/admin/dashboard')} variant="outline" className="mb-6 gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Button>

                <h1 className="text-4xl font-bold text-white mb-8">Photo Upload</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Upload Form */}
                    <Card className="bg-card/50 backdrop-blur border-primary/20">
                        <CardHeader>
                            <CardTitle>Upload New Photo</CardTitle>
                            <CardDescription>Upload photos to Cloudinary</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleUpload} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="photo">Photo</Label>
                                    <Input
                                        id="photo"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        required
                                    />
                                </div>

                                {preview && (
                                    <div className="relative w-full h-48 rounded-lg overflow-hidden bg-slate-800">
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Photo title"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Photo description"
                                        rows={3}
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={uploading}>
                                    <Upload className="w-4 h-4 mr-2" />
                                    {uploading ? 'Uploading...' : 'Upload Photo'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Stats */}
                    <Card className="bg-card/50 backdrop-blur border-primary/20">
                        <CardHeader>
                            <CardTitle>Gallery Stats</CardTitle>
                            <CardDescription>Overview of uploaded photos</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <ImageIcon className="w-8 h-8 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total Photos</p>
                                            <p className="text-2xl font-bold">{photos.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Photo Gallery */}
                <Card className="bg-card/50 backdrop-blur border-primary/20">
                    <CardHeader>
                        <CardTitle>Photo Gallery</CardTitle>
                        <CardDescription>All uploaded photos</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <p className="text-center text-muted-foreground">Loading...</p>
                        ) : photos.length === 0 ? (
                            <p className="text-center text-muted-foreground">No photos uploaded yet</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {photos.map((photo) => (
                                    <div key={photo.id} className="group relative rounded-lg overflow-hidden bg-slate-800">
                                        <img src={photo.url} alt={photo.title} className="w-full h-48 object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                            <h3 className="text-white font-semibold">{photo.title}</h3>
                                            <p className="text-slate-300 text-sm mb-2">{photo.description}</p>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(photo.id)}
                                                className="gap-2"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
