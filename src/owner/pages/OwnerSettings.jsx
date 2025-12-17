import React from 'react';
import OwnerHeader from '../components/OwnerHeader';
import OwnerSidebar from '../components/OwnerSidebar';
import Footer from '../../components/Footer';
import { TextInput, Button } from 'flowbite-react';
import { motion } from 'framer-motion';
import { HiPencil } from 'react-icons/hi';
import './OwnerSettings.css';

function OwnerSettings() {
  return (
    <div className="admin-dashboard-layout">
      <OwnerSidebar />

      <div className="admin-main-wrapper">
        <OwnerHeader />

        <main className="admin-main-content profile-content">
          <h1 className="admin-page-title">My Profile</h1>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="profile-wrapper"
          >
            {/* LEFT INFO */}
            <div className="profile-info">
              <h2>Profile & Security</h2>
              <p>
                Update your administrator profile and change your password securely.
                Strong credentials help protect system-level access and data integrity.
              </p>
            </div>

            {/* RIGHT CARD */}
            <div className="profile-card">
              <div className="profile-avatar">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="Admin"
                />
                <button className="edit-avatar-btn">
                  <HiPencil size={16} />
                </button>
              </div>

              <h3 className="profile-name">Admin User</h3>
              <p className="profile-role">System Administrator</p>

              <form className="profile-form">
                <TextInput type="text" placeholder="Full Name" />
                <TextInput type="password" placeholder="Current Password" />
                <TextInput type="password" placeholder="New Password" />
                <TextInput type="password" placeholder="Confirm New Password" />

                <div className="profile-actions">
                  <Button type="reset" className="btn-reset">
                    Reset
                  </Button>
                  <Button type="submit" className="btn-update">
                    Update Profile
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default OwnerSettings;
