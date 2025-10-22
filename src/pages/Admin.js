// Author: Smangalene Charles Sema & Ntsikayethu Nyamezele
// Date: 5 September 2025
// Description: Admin portal for Sethuse Community Haven - Restricted access

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import AdminLogin from '../components/Admin/AdminLogin';
import ProjectManagement from '../components/Admin/ProjectManagement';
import './Admin.css';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner">Loading...</div>
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