// LuxPillNav.jsx - UPDATED for the clean, floating pill look

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../css/PillNav.css'; 

// LUXURY PALETTE (Unchanged)
const LUX_TEXT = '#f0f0f0';
const LUX_CARD_FILL = '#1e1b30'; // Dark Purple/Slate (Use for background of the Nav bar itself)
const LUX_ACCENT = '#00D2FF';
const LUX_ACTIVE = '#FF8C00';

// ... (hoverPillVariants unchanged) ...

// We will use a wrapper variant for the new floating capsule effect
const containerEntranceVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: "spring", stiffness: 70, damping: 10, delay: 0.1 }
    }
};

const LuxPillNav = ({
    // ... (props unchanged) ...
}) => {
    // ... (render logic unchanged) ...
    
    return (
        <motion.div 
            // 1. Apply the entrance animation to the container
            initial="hidden"
            animate="visible"
            variants={containerEntranceVariants}
            
            // 2. Center the whole component
            className="pill-nav-container" 
            style={{
                // Make the container itself a floating capsule
                backgroundColor: LUX_CARD_FILL, // Use the dark slate color for the capsule background
                borderRadius: '50px', // High border radius for the pill shape
                padding: '5px 10px', // Internal spacing
                border: `1px solid ${LUX_ACCENT}30`, // Subtle border glow
                boxShadow: `0 8px 15px rgba(0, 0, 0, 0.4), 0 0 10px ${LUX_ACCENT}20`,
                
                // Ensure it floats in the middle
                width: 'auto',
                display: 'inline-flex',
            }}
        >
            {/* The inner NAV element should now be simplified */}
            <nav 
                className={`pill-nav ${className}`} 
                aria-label="Primary"
                style={{
                    backgroundColor: 'transparent', // Make the nav transparent inside the container
                    padding: '0', // Remove inner padding
                }}
            >
                {/* 1. Logo (We keep the logo within the navigation structure) */}
                <motion.div 
                    // ... (logo motion props unchanged) ...
                >
                    <Link to={items?.[0]?.href || '/'} aria-label="Home">
                        {/* Ensure the logo is clearly visible */}
                        <img src={logo} alt={logoAlt} style={{ filter: 'brightness(1.5)' }} /> 
                    </Link>
                </motion.div>

                {/* 2. Navigation Items (Individual Pills) */}
                <div className="pill-nav-items desktop-only">
                    <ul className="pill-list" role="menubar">
                        {items.map((item, i) => {
                            const isActive = activeHref === item.href;
                            
                            // Re-applying the improved LI style here:
                            const PillWrapper = (
                                <motion.li 
                                    key={item.href || `item-${i}`} 
                                    role="none"
                                    initial="rest"
                                    whileHover="hover" 
                                    style={{
                                        listStyle: 'none',
                                        position: 'relative',
                                        display: 'inline-block',
                                        borderRadius: '50px',
                                        // Pill is slightly lighter than the LUX_CARD_FILL background
                                        backgroundColor: isActive ? LUX_CARD_FILL : 'transparent',
                                        border: `1px solid ${isActive ? LUX_ACTIVE : LUX_TEXT}20`,
                                        margin: '0 5px'
                                    }}
                                >
                                    {/* ... Link content remains unchanged ... */}
                                </motion.li>
                            );
                            return PillWrapper;
                        })}
                    </ul>
                </div>
            </nav>
        </motion.div>
    );
};

export default LuxPillNav;