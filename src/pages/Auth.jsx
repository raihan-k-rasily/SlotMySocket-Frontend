// Auth.jsx
import React, { useState } from 'react';
import DotGrid from '../bits/components/DotGrid';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
// ⚠️ ASSUMPTION & FIX: Importing necessary items:
// 1. You need your API functions.
// 2. You need the toast library (e.g., react-toastify).
// import { toast } from 'react-toastify';
import { loginAPI, registerUserAPI, GoogleloginUserAPI, registerOwnerAPI } from '../services/allAPIs'; // <-- FIX: Assuming this path
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'

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
    stationName: '',
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
      stationName: '',
      latitude: '',
      longitude: '',
    });
  }

  //google login
  const handleGoogleLogin = async (credentialResponse) => {
    console.log("google login", credentialResponse);
    const decode = jwtDecode(credentialResponse.credential);
    console.log(decode);

    const response = await GoogleloginUserAPI({
      email: decode.email,
      password: "google",
      username: decode.name,
      profile: decode.picture,
      role: "User"
    });
    console.log(response);
    if (response.status == 200) {
      sessionStorage.setItem("userDetails", JSON.stringify(response.data.user));
      sessionStorage.setItem(
        "token",
        JSON.stringify(response.data.token));
      toast.success("Login successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  };

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
          } else if (response.data?.user?.role === "Owner") {
            // Check if the user status is ACTIVE
            if (response.data?.user?.status === "ACTIVE") {
              toast.success("Login Successful! Redirecting to Owner Dashboard...");
              setTimeout(() => {
                navigate("/ownerhome");
              }, 2000); // Reduced to 2s for better UX, change back to 4000 if preferred
            } else {
              // If status is BLOCKED or anything else
              toast.error("Your account is currently inactive. Please contact the Admin.");
            }
          } else {
            // Check if the user status is ACTIVE
            if (response.data?.user?.status === "ACTIVE") {
              toast.success("Login Successful! Redirecting to User Dashboard...");
              setTimeout(() => {
                navigate("/");
              }, 2000); // Reduced to 2s for better UX, change back to 4000 if preferred
            } else {
              // If status is BLOCKED or anything else
              toast.error("Your account is currently inactive. Please contact the Admin.");
            }
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
      // 1. Convert to numbers
      const lat = parseFloat(formData.latitude);
      const lon = parseFloat(formData.longitude);

      // 2. Simple validation
      const isValidCoordinate = !isNaN(lat) && lat >= -90 && lat <= 90 &&
        !isNaN(lon) && lon >= -180 && lon <= 180;

      // Added check for basic fields to ensure nothing is empty
      if (!formData.username || !formData.email || !formData.password || !formData.stationName || !isValidCoordinate) {
        toast.warn("Please fill in all details and ensure coordinates are valid.", {
          position: "top-center",
          theme: "colored"
        });
        return;
      }

      // 3. Define the Payload
      const ownerRegisterPayload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        stationName: formData.stationName,
        latitude: lat,
        longitude: lon,
        role: 'Owner'
      };

      console.log('Owner Register submitted:', ownerRegisterPayload);

      try {
        // 🐛 FIXED: Using ownerRegisterPayload correctly here
        const response = await registerOwnerAPI(ownerRegisterPayload);
        console.log(response);

        if (response.status === 201) {
          toast.success("Owner Registered successfully! Waiting for Admin approval.", {
            position: "top-center",
            autoClose: 3000,
            theme: "colored",
          });

          clearFormData();

          // Delay navigation so user can read the success message
          setTimeout(() => {
            navigate("/login");
          }, 3500);

        } else {
          // Handle cases like 401 (User exists) or 409 (Location exists)
          const errorMsg = response.response?.data?.message || "Registration failed.";
          toast.error(errorMsg, {
            position: "top-center",
            autoClose: 3000,
            theme: "colored",
          });
        }
      } catch (error) {
        console.log("Owner Registration Error:", error);
        toast.error("Server error. Please try again later.", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored"
        });
      }
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
          {mode === 'login' ? 'Sign in to access your dashboard' : (isOwnerRegisterMode ? 'Create account and list your charging Station' : 'Create your user account')}
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

              {/* === COLUMN 2: E-Charging Station Details === */}
              <div className="auth-col">
                <div className="form-divider-secondary">Station Details</div>

                {/* Station Name Input */}
                <div>
                  <input
                    type="text"
                    name="stationName"
                    placeholder="Station Name (e.g., Green Spot 1)"
                    required
                    className="auth-input"
                    value={formData.stationName}
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
          <br />
          <br />
          {
            (mode === "user_register" || mode === "login") &&
            <div>
              <GoogleLogin
                onClick={() => handleGoogleLogin(credentialResponse)}
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                  handleGoogleLogin(credentialResponse)
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
          }
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