import React from 'react'

import PillNav from '../../bits/components/PillNav ';
import logo from '../../assets/SlotMySocket.png';

function Header() {
    return ( 
        <>
            <PillNav
                logo={logo}
                logoAlt="Company Logo"
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Stations', href: '/stations' },
                    // { label: 'Services', href: '/services' },
                    { label: 'Contact', href: '/contact' }
                ]}
                activeHref="/"
                className="custom-nav"
                ease="power2.easeOut"
                // --- COLOR INVERSION APPLIED HERE ---

                // Old: baseColor="#000000" (Black) -> New: White
                baseColor="#00A36C"
                
                // Old: pillColor="#ffffff" (White) -> New: Black
                pillColor="#1A202C"
                
                // Old: hoveredPillTextColor="#ffffff" (White) -> New: Black
                hoveredPillTextColor="#1A202C"
                
                // Old: pillTextColor="#000000" (Black) -> New: White
                pillTextColor="#00A36C"
            />
        </>
    )
}

export default Header