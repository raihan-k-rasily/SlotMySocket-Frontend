// AdminHeader.jsx
import React from 'react';
import '../pages/AdminHome.css'; 
// Assuming you have an icon library setup, otherwise you can use Unicode or Font Awesome
// import { Bell, User } from 'lucide-react'; 

function AdminHeader() {
  return (
    <header className="admin-header">
      <div className="header-search-bar">
        {/* Placeholder for a search input */}
        <input type="text" placeholder="Search charges, users, or locations..." className="header-search-input" />
      </div>
      
      <div className="header-actions">
        <button className="header-icon-button">
          {/* Using Unicode/Emoji placeholder for simplicity */}
          🔔
        </button>
        <div className="header-user-profile">
          <span className="user-name">Admin User</span>
          <div className="user-avatar">
            A
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;