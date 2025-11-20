// Admin portal for Sethuse Community Haven - Restricted access

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Add this import
import { auth } from '../firebase/config';
import AdminLogin from '../components/Admin/AdminLogin';
import ProjectManagement from '../components/Admin/ProjectManagement';
import Loading from '../components/Loading/Loading';
import './Admin.css';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Add navigation hook

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Simulate loading for better UX
      setTimeout(() => {
        setUser(user);
        setLoading(false);
      }, 1000);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect to home page after successful logout
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <Loading 
          type="spinner" 
          size="large" 
          text="Loading Admin Portal..." 
          overlay={true}
        />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLogin={() => setUser(auth.currentUser)} />;
  }

  return (
    <div className="admin-portal">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>Sethuse Community Haven Admin</h1>
          <div className="admin-user">
            <span>Welcome, {user.email}</span>
            <button onClick={handleLogout} className="logout-btn">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <ProjectManagement />
        {/* Add more management sections here later */}
      </main>
    </div>
  );
};

export default Admin;