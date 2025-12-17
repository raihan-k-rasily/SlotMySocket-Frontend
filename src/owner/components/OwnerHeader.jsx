import React from 'react';
import '../pages/OwnerHome.css'; 
// import { Bell, User } from 'lucide-react'; 

function OwnerHeader() {
  return (
    <header className="admin-header">
      <div className="header-search-bar">
        {/* Search is now focused on the Owner's context */}
        <input type="text" placeholder="Search my stations, bookings, or payments..." className="header-search-input" />
      </div>
      
      <div className="header-actions">
        <button className="header-icon-button">
          🔔
        </button>
        <div className="header-user-profile">
          <span className="user-name">Station Owner</span> {/* Updated Text */}
          <div className="user-avatar">
            O {/* Changed avatar initial */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default OwnerHeader