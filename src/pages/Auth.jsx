// Auth.jsx
import React, { useState } from 'react';
import DotGrid from '../bits/components/DotGrid';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
// ⚠️ ASSUMPTION & FIX: Importing necessary items:
// 1. You need your API functions.
// 2. You need the toast library (e.g., react-toastify).
// import { toast } from 'react-toastify';
import { loginAPI, registerUserAPI } from '../services/allAPIs'; // <-- FIX: Assuming this path
import { ToastContainer, toast } from 'react-toastify';

// The component receives userRegister and ownerRegister functions (likely from a parent component)
function Auth({ userRegister, ownerRegister }) {
  // Mode can be 'login', 'user_register', or 'owner_register'
  const [mode, setMode] = useState('login');

  const navigate = useNavigate()

  // The primary state object to hold all form data
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

  // Function to clear form data after successful operation
  const clearFormData = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      slotName: '',
      latitude: '',
      longitude: '',
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === 'login') {
      // 1. LOGIN LOGIC

      // 🐛 FIX: Create payload from formData for login (only username/email and password needed)
      const loginPayload = {
        email: formData.email,
        password: formData.password
      };


      console.log('Login submitted:', loginPayload.username);

      try {
        // 🐛 FIX: Use the correct payload (loginPayload) instead of userData
        const response = await loginAPI(loginPayload);
        console.log(response);

        if (response.status === 201) {
          sessionStorage.setItem("userDetails", JSON.stringify(response.data.user));
          sessionStorage.setItem("token", JSON.stringify(response.data.token));

          toast.success("Login successfully", {
            position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: false,
            pauseOnHover: true, draggable: true, progress: undefined, theme: "colored",
          });

          // Clear form data and navigate
          clearFormData();
          response.data?.user?.role

          if (response.data?.user?.role === "Admin") {
            setTimeout(() => { navigate("/adminhome"); }, 4000);
          } else {
            setTimeout(() => { navigate("/"); }, 4000);
          }

        } else {
          toast.error("Invalid user details", {
            position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: false,
            pauseOnHover: true, draggable: true, progress: undefined, theme: "colored",
          });
          console.log(response.response.data.message);
        }
      } catch (error) {
        console.log("Login Error:", error);
        toast.error("An error occurred during login.", { position: "top-center", autoClose: 3000, theme: "colored" });
      }

    } else if (mode === 'user_register') {
      // 2. USER REGISTER LOGIC

      // 🐛 FIX: Create user registration payload from formData
      const userRegisterPayload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: 'User' // Assuming a default role for clarity
      };

      console.log('User Register submitted:', userRegisterPayload);
      //       userRegister(userRegisterPayload); // Call the prop function

      try {
        // 🐛 FIX: Use the correct payload (userRegisterPayload) instead of userData
        const response = await registerUserAPI(userRegisterPayload);
        console.log(response);

        if (response.status === 201) {
          toast.success("Registered successfully", {
            position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: false,
            pauseOnHover: true, draggable: true, progress: undefined, theme: "colored",
          });

          clearFormData();

          setTimeout(() => { navigate("/login"); }, 4000);

        } else {
          toast.error("User already existing or registration failed.", {
            position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: false,
            pauseOnHover: true, draggable: true, progress: undefined, theme: "colored",
          });
          console.log(response.response.data.message);
        }
      } catch (error) {
        console.log("User Registration Error:", error);
        toast.error("An error occurred during user registration.", { position: "top-center", autoClose: 3000, theme: "colored" });
      }

    } else if (mode === 'owner_register') {
      // 3. OWNER REGISTER LOGIC: Check for slot details (now coordinates)
      const lat = parseFloat(formData.latitude);
      const lon = parseFloat(formData.longitude);

      if (!formData.slotName || isNaN(lat) || isNaN(lon) || !formData.latitude || !formData.longitude) {
        // 💡 IMPROVEMENT: Use toast instead of alert for better UI
        toast.warn("Please fill in all charging slot details and ensure coordinates are valid numbers.", { position: "top-center", autoClose: 3000, theme: "colored" });
        return;
      }

      // 🐛 FIX: Owner payload includes account details + slot details + role
      const ownerRegisterPayload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        slotName: formData.slotName,
        latitude: lat,
        longitude: lon,
        role: 'Owner' // Assuming this is passed to the backend
      };

      console.log('Owner Register submitted:', ownerRegisterPayload);

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
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="auth-input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

              {/* Email (User Register Mode) */}
              {mode === 'user_register' && (
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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
    </div>
  );
}

export default Auth;