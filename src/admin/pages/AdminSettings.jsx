import React, { useState } from 'react';
import AdminHeader from '../components/AdminHeader'; // Assume these exist
import AdminSidebar from '../components/AdminSidebar'; // Assume these exist
import Footer from '../../components/Footer'; // Assume this exists
import { Tabs, TabItem, ToggleSwitch, TextInput, Button } from 'flowbite-react';
import { motion } from 'framer-motion';
import { HiUserCircle, HiLockClosed, HiCog, HiCloud, HiExclamationCircle, HiPencil } from 'react-icons/hi';
import './AdminSettings.css'; // Ensure this is imported

function AdminSettings() {
  const [isMaintenanceMode, setMaintenanceMode] = useState(false);
  const [isOwnerRegistrationOpen, setOwnerRegistrationOpen] = useState(true);

  return (
    <div className="admin-dashboard-layout">
      <AdminSidebar />

      <div className="admin-main-wrapper">
         <AdminHeader />

        <main className="admin-main-content settings-content">
          <h1 className="admin-page-title">System Settings & Configuration</h1>

          {/* Vertical Tabs for inner navigation - Use the corrected props */}
          <Tabs
            variant="pills"
            className="admin-horizontal-tabs"
          >


            {/* 1. My Profile (New Section based on your provided code) */}
            <TabItem title="My Profile" icon={HiUserCircle}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="settings-panel-content"
              >
                <h2 className="panel-title">Admin Profile & Password Update</h2>
                <p className="panel-description">Manage your login credentials and personal information.</p>

                <div className="settings-grid">
                  {/* LEFT: Info Section (Retained from your code) */}
                  <div className="profile-info-section">
                    <p className="mb-4">
                      This section allows you to update your profile picture and change your administrator password securely. Always use a strong, unique password.
                    </p>
                    <p>
                      Your profile details help the system track internal administrative actions. Note: Changing your profile picture is instant, but password changes require confirmation of your current password.
                    </p>
                  </div>

                  {/* RIGHT: Profile Card (The styled section) */}
                  <div className="profile-card-base">
                    {/* Avatar */}
                    <div className="profile-avatar">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="Profile"
                      />
                      <button className="edit-profile-btn">
                        <HiPencil size={18} />
                      </button>
                    </div>

                    <h3 className="profile-name">Admin User</h3>
                    <p className="profile-role">System Administrator</p>

                    {/* Form */}
                    <form className="profile-form">
                      <TextInput type="text" placeholder="Email" className="dark-input" />
                      <TextInput type="text" placeholder="Name" className="dark-input" />
                      <TextInput type="password" placeholder="Password" className="dark-input" />
                      {/* <TextInput type="password" placeholder="New Password" className="dark-input" />
                      <TextInput type="password" placeholder="Confirm New Password" className="dark-input" /> */}

                      <div className="profile-actions">
                        <Button type="reset" className="btn-reset">Reset</Button>
                        <Button type="submit" className="btn-update-profile">Update</Button>
                      </div>
                    </form>
                  </div>

                </div>
              </motion.div>
            </TabItem>

            {/* 2. Global System Controls (Shifted to second tab) */}
            {/* <TabItem title="System Controls" icon={HiCog}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="settings-panel-content"
              >
                <h2 className="panel-title">Global Application Status</h2>
                <p className="panel-description">Manage high-level status and access controls for the entire platform.</p>

                <div className="setting-card">
                  <h3 className="setting-title">Maintenance Mode</h3>
                  <p className="setting-detail">Toggle to restrict user access during updates or critical maintenance. Users will see a maintenance screen.</p>
                  <ToggleSwitch
                    checked={isMaintenanceMode}
                    label={isMaintenanceMode ? "Maintenance Mode: ON" : "Maintenance Mode: OFF"}
                    onChange={setMaintenanceMode}
                    className="system-toggle"
                  />
                  {isMaintenanceMode && (
                    <div className="warning-note">
                      <HiExclamationCircle className="text-warning-yellow" /> System access is currently restricted.
                    </div>
                  )}
                </div>

                <div className="setting-card">
                  <h3 className="setting-title">Owner Registration</h3>
                  <p className="setting-detail">Allow or prevent new owners (resource providers) from signing up for the platform.</p>
                  <ToggleSwitch
                    checked={isOwnerRegistrationOpen}
                    label={isOwnerRegistrationOpen ? "Registration: OPEN" : "Registration: CLOSED"}
                    onChange={setOwnerRegistrationOpen}
                    className="system-toggle"
                  />
                </div>
              </motion.div>
            </TabItem> */}

            {/* 3. Security and Access */}
            {/* <TabItem title="Security & Access" icon={HiLockClosed}>
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }} 
                                animate={{ opacity: 1, x: 0 }} 
                                className="settings-panel-content"
                            >
                                <h2 className="panel-title">Security Policies</h2>
                                <p className="panel-description">Configure authentication requirements and password policies.</p>
                                
                                <div className="setting-card">
                                    <h3 className="setting-title">Minimum Password Length</h3>
                                    <div className="input-group">
                                        <TextInput type="number" defaultValue={8} min={6} max={20} className="w-20 dark-input" />
                                        <Button className="btn-save">Save Setting</Button>
                                    </div>
                                </div>
                                
                                <div className="setting-card">
                                    <h3 className="setting-title">Admin Session Timeout (minutes)</h3>
                                    <div className="input-group">
                                        <TextInput type="number" defaultValue={60} min={15} max={180} className="w-20 dark-input" />
                                        <Button className="btn-save">Save Setting</Button>
                                    </div>
                                </div>
                            </motion.div>
                        </TabItem> */}

            {/* 4. API/Integrations (Placeholder) */}
            {/* <TabItem title="API & Integrations" icon={HiCloud}>
                            <div className="placeholder-text settings-panel-content">
                                <h2 className="panel-title">API Key Management</h2>
                                <p className="panel-description">Future configuration for external API endpoints and webhooks.</p>
                            </div>
                        </TabItem> */}
          </Tabs>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default AdminSettings;