// AdminSidebar.jsx
import React from 'react';
import '../pages/AdminHome.css';
// We need to import the icons to use them in the navItems array
import { LayoutGrid, UserCheck, Eye, Settings } from 'lucide-react'; 

const navItems = [
    { name: 'Dashboard', icon: LayoutGrid, active: true, path: '/adminhome' },
    { name: 'Verification', icon: UserCheck, active: false, path: '/adminverification' },
    { name: 'View', icon: Eye, active: false, path: '/adminview' },
    { name: 'System Settings', icon: Settings, active: false, path: '/adminsettings' },
];

function AdminSidebar() {
   return (
        <nav className="admin-sidebar">
            <div className="sidebar-logo">
                <span className="logo-text">SlotMySocket Admin</span>
            </div>
            <ul className="sidebar-menu">
                {navItems.map(item => {
                    const IconComponent = item.icon;

                    return (
                        <li key={item.name} className={`menu-item ${item.active ? 'active' : ''}`}>
                            {/* 🎯 FIX: Use item.path in the href attribute */}
                            <a href={item.path} className="menu-link">
                                <span className="menu-icon">
                                    <IconComponent size={20} /> 
                                </span>
                                <span className="menu-text">{item.name}</span>
                            </a>
                        </li>
                    );
                })}
            </ul>
            <div className="sidebar-footer">
                <button className="logout-button">
                    🚪 Logout
                </button>
            </div>
        </nav>
    );
}

export default AdminSidebar;