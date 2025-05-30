import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import PostPage from './pages/PostPage';
import AdminPage from './pages/admin/AdminPage';
import NewPostPage from './pages/admin/NewPostPage';
import EditPostPage from './pages/admin/EditPostPage';
import LoginPage from './pages/admin/LoginPage';
import ContactPage from './pages/ContactPage';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { initSampleData } from './data/sampleData';

function App() {
  useEffect(() => {
    // Initialize sample data asynchronously
    initSampleData().catch(console.error);
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/post/:slug" element={<PostPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
            <Route path="/admin/new" element={<ProtectedRoute><NewPostPage /></ProtectedRoute>} />
            <Route path="/admin/edit/:id" element={<ProtectedRoute><EditPostPage /></ProtectedRoute>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;