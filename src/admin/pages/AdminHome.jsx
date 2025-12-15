// AdminHome.jsx
import React from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import Footer from '../../components/Footer';
import MagicBento from '../../bits/components/MagicBento';
import './AdminHome.css'; // 🟢 NEW: Dedicated CSS for layout

function AdminHome() {
    return (
        <div className="admin-dashboard-layout">
            {/* 1. Sidebar */}
            <AdminSidebar />
            
            <div className="admin-main-wrapper">
                {/* 2. Header */}
                <AdminHeader />

                {/* 3. Main Content Area */}
                <main className="admin-main-content">
                    <h1 className="admin-welcome-title">⚡️ Admin Console Overview</h1>
                    <p className="admin-subtitle">Real-time usage, analytics, and operational control panel.</p>

                    <div className="magic-bento-section">
                        {/* 4. Magic Bento Grid as the Dashboard Widgets */}
                        <MagicBento
                            textAutoHide={true}
                            enableStars={true}
                            enableSpotlight={true}
                            enableBorderGlow={true}
                            enableTilt={true}
                            enableMagnetism={true}
                            clickEffect={true}
                            spotlightRadius={400} // Increased radius for better effect
                            particleCount={15}
                            glowColor="37, 255, 175" // 🟢 PREMIUM: Changed glow to a Cyan/Electric Green for better contrast with the dark background
                        />
                    </div>
                </main>

                {/* 5. Footer */}
                <Footer />
            </div>
        </div>
    );
}

export default AdminHome;