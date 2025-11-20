/* 
  Footer component for Sethuse Community Haven website.
              Features include:
                - Organization name, tagline, and physical address
                - Quick navigation links for easy site access
                - Social media links with icons (Facebook, Instagram, TikTok)
                - Bottom copyright and registration information
                - Admin access link for authorized staff
                - Password reset functionality
*/

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaMapMarkerAlt, FaUserShield } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

function Footer() {
  const [user, setUser] = useState(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const navigate = useNavigate(); // Add navigation hook

  // Check auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setShowAdminModal(false);
      // Redirect to admin page after successful login
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
      switch (error.code) {
        case 'auth/invalid-email':
          setLoginError('Invalid email address.');
          break;
        case 'auth/user-disabled':
          setLoginError('This account has been disabled.');
          break;
        case 'auth/user-not-found':
          setLoginError('No account found with this email.');
          break;
        case 'auth/wrong-password':
          setLoginError('Incorrect password.');
          break;
        default:
          setLoginError('Login failed. Please check your credentials.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    setResetError('');
    setResetSuccess('');

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSuccess('Password reset email sent! Check your inbox for instructions.');
      setResetEmail('');
      
      // Auto-close reset modal after success
      setTimeout(() => {
        setShowResetModal(false);
        setResetSuccess('');
      }, 3000);
      
    } catch (error) {
      console.error('Password reset error:', error);
      switch (error.code) {
        case 'auth/invalid-email':
          setResetError('Invalid email address.');
          break;
        case 'auth/user-not-found':
          setResetError('No account found with this email.');
          break;
        case 'auth/too-many-requests':
          setResetError('Too many attempts. Please try again later.');
          break;
        default:
          setResetError('Failed to send reset email. Please try again.');
      }
    } finally {
      setResetLoading(false);
    }
  };

  const handleAdminLogout = async () => {
    try {
      await signOut(auth);
      // Redirect to home page after logout
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const openResetModal = () => {
    setShowResetModal(true);
    setShowAdminModal(false);
    setResetEmail(loginEmail); // Pre-fill with login email if available
  };

  const backToLogin = () => {
    setShowResetModal(false);
    setShowAdminModal(true);
    setResetError('');
    setResetSuccess('');
  };

  return (
    <footer className="footer">
      
      <div className="footer-container" data-aos="fade-up">
        {/* Left Section: Organization Name, Tagline, and Address */}
        <div className="footer-logo">
          <h2>Sethuse Community Haven</h2>
          <p>Empowering communities, transforming lives.</p>

          <div className="footer-address">
            <FaMapMarkerAlt size={16} style={{ marginRight: '8px' }} />
            <span>516 Unit 18, Imbali, Pietermaritzburg, 3201</span>
          </div>

          {/* Admin Access Section */}
          <div className="footer-admin">
            {user ? (
              <div className="admin-status">
                <span>Staff Portal: <strong>Active</strong></span>
                <div className="admin-actions">
                  <Link to="/admin" className="admin-portal-link">
                    <FaUserShield /> Go to Admin
                  </Link>
                  <button onClick={handleAdminLogout} className="admin-logout-btn">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setShowAdminModal(true)}
                className="admin-access-btn"
              >
                <FaUserShield /> Staff Login
              </button>
            )}
          </div>
        </div>

        {/* Middle Section: Quick Navigation Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/work">Our Work</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/donate">Donate</Link></li>
            {/* Add Admin link to quick links when logged in */}
            {user && (
              <li><Link to="/admin">Admin Portal</Link></li>
            )}
          </ul>
        </div>

        {/* Right Section: Social Media Icons */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            {/* Facebook link */}
            <a 
              href="https://www.facebook.com/profile.php?id=100092553245300#" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaFacebookF size={20} />
            </a>

            {/* TikTok link */}
            <a 
              href="https://www.tiktok.com/search?q=sethuse%20community%20haven&t=1751316789756" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <SiTiktok size={20} />
            </a>

            {/* Instagram link */}
            <a 
              href="https://www.instagram.com/sethuse_community_haven_npo/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom: Copyright & Registration Info */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Sethuse Community Haven. All rights reserved.</p>
        <p>Reg. No: NPO 290-151 | Established: 2023</p>
      </div>

      {/* Admin Login Modal */}
      {showAdminModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>Staff Portal Access</h3>
              <button 
                onClick={() => setShowAdminModal(false)}
                className="close-modal-btn"
              >
                ×
              </button>
            </div>
            <div className="admin-modal-body">
              <p className="admin-notice">
                ⚠️ Restricted to authorized Sethuse staff only
              </p>
              <form onSubmit={handleAdminLogin} className="admin-login-form">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Enter your staff email"
                    required
                    disabled={loginLoading}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    disabled={loginLoading}
                  />
                </div>
                {loginError && (
                  <div className="login-error">{loginError}</div>
                )}
                <button 
                  type="submit" 
                  disabled={loginLoading}
                  className="login-submit-btn"
                >
                  {loginLoading ? 'Signing In...' : 'Sign In to Admin Portal'}
                </button>
                
                {/* Forgot Password Link */}
                <div className="forgot-password-link">
                  <button 
                    type="button"
                    onClick={openResetModal}
                    className="forgot-password-btn"
                  >
                    Forgot your password?
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Password Reset Modal */}
      {showResetModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>Reset Your Password</h3>
              <button 
                onClick={() => setShowResetModal(false)}
                className="close-modal-btn"
              >
                ×
              </button>
            </div>
            <div className="admin-modal-body">
              <p className="admin-notice">
                Enter your email address and we'll send you instructions to reset your password.
              </p>
              <form onSubmit={handlePasswordReset} className="admin-login-form">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your staff email"
                    required
                    disabled={resetLoading}
                  />
                </div>
                
                {resetError && (
                  <div className="login-error">{resetError}</div>
                )}
                
                {resetSuccess && (
                  <div className="reset-success">
                    <span className="success-icon">✅</span>
                    {resetSuccess}
                  </div>
                )}
                
                <button 
                  type="submit" 
                  disabled={resetLoading || resetSuccess}
                  className="login-submit-btn"
                >
                  {resetLoading ? 'Sending...' : 'Send Reset Instructions'}
                </button>
                
                {/* Back to Login Link */}
                <div className="back-to-login">
                  <button 
                    type="button"
                    onClick={backToLogin}
                    className="back-to-login-btn"
                  >
                    ← Back to Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
}

export default Footer;