import React from 'react';
import { NavLink, useNavigate  } from 'react-router-dom';
import '../pages/OwnerHome.css';
// Changed icons to be more relevant to an Owner/Provider role
import { Home, Zap, MapPin, Settings } from 'lucide-react'; 

const navItems = [
  // Home for the Owner dashboard
  { name: 'Dashboard', icon: Home, path: '/ownerhome' }, 
  // Managing their own charging stations/sockets
  { name: 'My Stations', icon: Zap, path: '/ownerstations' }, 
  // Viewing booking/usage logs for their stations
  // { name: 'Usage & Earnings', icon: MapPin, path: '/owner/earnings' }, 
  // Owner-specific settings (profile, bank details, etc.)
  { name: 'Owner Settings', icon: Settings, path: '/ownersettings' }, 
];

function OwnerSidebar() {
    const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
};
  return (
    <nav className="admin-sidebar">
      <div className="sidebar-logo">
        <span className="logo-text">SlotMySocket Owner Portal</span> {/* Updated Text */}
      </div>

      <ul className="sidebar-menu">
        {navItems.map(({ name, icon: Icon, path }) => (
          <li key={name} className="menu-item">
            <NavLink
              to={path}
              className={({ isActive }) =>
                `menu-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="menu-icon">
                <Icon size={20} />
              </span>
              <span className="menu-text">{name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <button type='button' className="logout-button" onClick={logout}>🚪 Logout</button>
      </div>
    </nav>
  );
}

export default OwnerSidebar