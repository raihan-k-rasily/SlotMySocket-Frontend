import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, UserCheck, Eye, Settings, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext'; // Import the hook

const navItems = [
  { name: 'Dashboard', icon: LayoutGrid, path: '/adminhome' },
  { name: 'Verification', icon: UserCheck, path: '/adminverification' },
  { name: 'View', icon: Eye, path: '/adminview' },
  { name: 'System Settings', icon: Settings, path: '/adminsettings' },
];

function AdminSidebar() {
  const { theme, toggleTheme } = useTheme(); // Use global theme logic

  return (
    <nav className="admin-sidebar">
      <div className="sidebar-logo">
        <span className="logo-text">SlotMySocket Admin</span>
      </div>

      <ul className="sidebar-menu">
        {navItems.map(({ name, icon: Icon, path }) => (
          <li key={name} className="menu-item">
            <NavLink
              to={path}
              className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
            >
              <span className="menu-icon"><Icon size={20} /></span>
              <span className="menu-text">{name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        {/* Toggle Button placed on top of Logout */}
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'dark' ? (
            <><Sun size={18} /> Light Mode</>
          ) : (
            <><Moon size={18} /> Dark Mode</>
          )}
        </button>
        <button className="logout-button">🚪 Logout</button>
      </div>
    </nav>
  );
}

export default AdminSidebar;