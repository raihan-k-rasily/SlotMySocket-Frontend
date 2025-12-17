import React from 'react'
import { useLocation } from 'react-router-dom'; // 🛑 NEW: Import useLocation hook

import PillNav from '../../bits/components/PillNav ';
import logo from '../../assets/Logo.png';

function Header() {
    // 🛑 FIX: Call useLocation here to get the current path
    const location = useLocation();
    const currentPath = location.pathname;

    return ( 
        <>
            <PillNav
//                 logo={logo}
                logoAlt="Company Logo"
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Stations', href: '/stations' },
                    { label: 'Contact', href: '/contact' },
                    { label: 'Login', href: '/login' }
                ]}
                // Use the currentPath variable defined above
                activeHref={currentPath}
                className="custom-nav"
                ease="power2.easeOut"
                
                // --- COLOR INVERSION APPLIED HERE ---
                baseColor="#00A36C"
                pillColor="#1A202C"
                hoveredPillTextColor="#1A202C"
                pillTextColor="#00A36C"
            />
        </>
    )
}

export default Header