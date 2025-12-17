import React from 'react';
import OwnerHeader from '../components/OwnerHeader';
import OwnerSidebar from '../components/OwnerSidebar';
import Footer from '../../components/Footer';
import MagicBento from '../../bits/components/MagicBento';
import './OwnerHome.css'; 

function OwnerHome() {
    return (
        <div className="admin-dashboard-layout">
            {/* 1. Sidebar */}
            <OwnerSidebar />
            
            <div className="admin-main-wrapper">
                {/* 2. Header */}
                <OwnerHeader />

                {/* 3. Main Content Area */}
                <main className="admin-main-content">
                    {/* Updated Title and Subtitle */}
                    <h1 className="admin-welcome-title">💰 Owner Earnings Dashboard</h1>
                    <p className="admin-subtitle">Monitor your stations, bookings, and financial performance.</p>

                    <div className="magic-bento-section">
                        {/* 4. Magic Bento Grid as the Dashboard Widgets (Keep existing styling) */}
                        <MagicBento
                            textAutoHide={true}
                            enableStars={true}
                            enableSpotlight={true}
                            enableBorderGlow={true}
                            enableTilt={true}
                            enableMagnetism={true}
                            clickEffect={true}
                            spotlightRadius={400} 
                            particleCount={15}
                            glowColor="37, 255, 175" 
                        />
                    </div>
                </main>

                {/* 5. Footer */}
                <Footer />
            </div>
        </div>
    );
}

export default OwnerHome