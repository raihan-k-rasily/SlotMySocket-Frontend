// Auth.jsx
import React, { useState } from 'react';
import DotGrid from '../bits/components/DotGrid'; 
import './Auth.css';

function Auth({ userRegister, ownerRegister }) {
  // Mode can be 'login', 'user_register', or 'owner_register'
  const [mode, setMode] = useState('login'); 
  
  const [formData, setFormData] = useState({
    username: '', 
    email: '',
    password: '',
    // Owner specific fields
    slotName: '',
    latitude: '', 
    longitude: '', 
  });

  const isRegisterMode = mode !== 'login';
  const isOwnerRegisterMode = mode === 'owner_register';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (mode === 'login') {
      // 1. LOGIN LOGIC
      console.log('Login submitted:', formData.username);
    } else if (mode === 'user_register') {
      // 2. USER REGISTER LOGIC
      console.log('User Register submitted:', formData);
      userRegister(formData);
    } else if (mode === 'owner_register') {
      // 3. OWNER REGISTER LOGIC: Check for slot details (now coordinates)
      const lat = parseFloat(formData.latitude);
      const lon = parseFloat(formData.longitude);

      if (!formData.slotName || isNaN(lat) || isNaN(lon) || !formData.latitude || !formData.longitude) {
        alert("Please fill in all charging slot details and ensure coordinates are valid numbers.");
        return;
      }
      
      console.log('Owner Register submitted:', { ...formData, latitude: lat, longitude: lon });
      ownerRegister({ ...formData, latitude: lat, longitude: lon });
    }
  };

  return (
    <div className="auth-container">
      
      {/* 1. DotGrid Background */}
      <div className="dot-grid-wrapper">
        <DotGrid
          dotSize={10}
          gap={15}
          baseColor="#1A202C" 
          activeColor="#39FF14" 
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* 2. Authentication Card Overlay */}
      <div className="auth-card">
        <h2 className="auth-header">
          {mode === 'login' ? 'Welcome Back' : (isOwnerRegisterMode ? 'Register as Owner' : 'Register as User')}
        </h2>
        <p className="auth-subheader">
          {mode === 'login' ? 'Sign in to access your dashboard' : (isOwnerRegisterMode ? 'Create account and list your charging slot' : 'Create your user account')}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          
          {/* 🟢 OWNER REGISTER MODE: 2-COLUMN GRID */}
          {isOwnerRegisterMode ? (
            <div className="owner-form-grid">
              
              {/* === COLUMN 1: Account Credentials === */}
              <div className="auth-col">
                <div className="form-divider-secondary">Account Details</div>
                
                {/* Username Input */}
                <div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    className="auth-input"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="auth-input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Password Input */}
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="auth-input"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              {/* === COLUMN 2: E-Charging Slot Details === */}
              <div className="auth-col">
                <div className="form-divider-secondary">Slot Details</div>
                
                {/* Slot Name Input */}
                <div>
                  <input
                    type="text"
                    name="slotName"
                    placeholder="Slot Name (e.g., Green Spot 1)"
                    required
                    className="auth-input"
                    value={formData.slotName}
                    onChange={handleChange}
                  />
                </div>

                {/* Latitude Input */}
                <div>
                  <input
                    type="number" 
                    name="latitude"
                    placeholder="Latitude (e.g., 28.6139)"
                    required
                    step="any" 
                    className="auth-input"
                    value={formData.latitude}
                    onChange={handleChange}
                  />
                </div>

                {/* Longitude Input */}
                <div>
                  <input
                    type="number" 
                    name="longitude"
                    placeholder="Longitude (e.g., 77.2090)"
                    required
                    step="any" 
                    className="auth-input"
                    value={formData.longitude}
                    onChange={handleChange}
                  />
                </div>
              </div>

            </div>
          ) : (
            /* --- FALLBACK: Standard 1-column layout for Login/User Register --- */
            <>
              {/* Username Input */}
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  required={mode !== 'login'} 
                  className="auth-input"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              {/* Email (User Register Mode) */}
              {mode === 'user_register' && (
                <div>
                  
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="auth-input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              )}
              {/* Password Input */}
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="auth-input"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

            </>
          )}
          
          {/* Submit Button (outside the grid) */}
          <button type="submit" className="auth-button">
            {mode === 'login' ? 'Login' : 'Submit Registration'}
          </button>
        </form>

        {/* Toggle between Login and Signup */}
        <div className="auth-toggle">
          {/* Back to Login link */}
          {mode !== 'login' && (
            <p>
              <button 
                type="button" 
                className="toggle-button"
                onClick={() => setMode('login')}
              >
                Go back to Login
              </button>
            </p>
          )}

          {/* Registration Mode Selector */}
          {mode === 'login' && (
            <>
              <p>
                Don't have an account? Choose a role to register:
              </p>
              <div className="register-options">
                <button 
                  type="button" 
                  className="toggle-button"
                  onClick={() => setMode('user_register')}
                >
                  Register as User
                </button>
                <span className="toggle-separator"> | </span>
                <button 
                  type="button" 
                  className="toggle-button"
                  onClick={() => setMode('owner_register')}
                >
                  Register as Owner
                </button>
              </div>
            </>
          )}
          
          {/* Switching between registration types */}
          {isRegisterMode && (
            <p>
              Switch to:
              <button 
                type="button" 
                className="toggle-button"
                onClick={() => setMode(isOwnerRegisterMode ? 'user_register' : 'owner_register')}
              >
                {isOwnerRegisterMode ? 'User Registration' : 'Owner Registration'}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;