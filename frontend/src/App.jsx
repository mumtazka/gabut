import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Hero from './components/Hero';
import TeamGrid from './components/TeamGrid';
import BentoGallery from './components/BentoGallery';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PhotoUpload from './pages/PhotoUpload';
import QueryBuilder from './pages/QueryBuilder';
import { Toaster } from './components/ui/sonner';
import './App.css';

function LandingPage() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-subtle overflow-x-hidden">
      <Hero onAdminOpen={() => setIsAdminOpen(true)} />
      <TeamGrid />
      <BentoGallery />

      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/photos" element={<PhotoUpload />} />
        <Route path="/admin/query" element={<QueryBuilder />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;

