import React from 'react';
import { motion } from 'framer-motion'; 
import Header from '../components/Header';
import Footer from '../../components/Footer';
import './Stations.css'; // 🛑 Import the CSS

// --- Design Constants (Match Contact Page) ---
const DEEP_DARK = '#0D1117';      // Background Color
const HIGHLIGHT_GREEN = '#00A36C'; // Primary Accent
const TEXT_WHITE = '#E2E8F0';     // Main Text Color
const TEXT_GRAY = '#6B7280';      // Subtle Text/Label Color

// Framer Motion Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { 
            delayChildren: 0.3, 
            staggerChildren: 0.2 
        } 
    }
};

const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
};

// --- DUMMY COMPONENTS (For structure visualization) ---

const FilterPanel = () => (
    <motion.div variants={itemVariants} className="filter-panel" style={{ backgroundColor: '#161B22', color: TEXT_WHITE }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: HIGHLIGHT_GREEN }}>Filter Stations</h2>
        <div className="filter-group">
            <label style={{ color: TEXT_GRAY }}>Connector Type:</label>
            <select style={{ backgroundColor: '#21262D', color: TEXT_WHITE, border: `1px solid ${TEXT_GRAY}` }}>
                <option>All</option>
                <option>CCS</option>
                <option>CHAdeMO</option>
                <option>Type 2</option>
            </select>
        </div>
        <div className="filter-group">
            <label style={{ color: TEXT_GRAY }}>Availability:</label>
            <select style={{ backgroundColor: '#21262D', color: TEXT_WHITE, border: `1px solid ${TEXT_GRAY}` }}>
                <option>Available Now</option>
                <option>All Stations</option>
            </select>
        </div>
        <div className="filter-group">
            <p className="text-lg mt-4 font-semibold">12 Stations Found</p>
        </div>
        
        <div className="station-list-preview">
            {['Green Circuit', 'Main Street Hub', 'City Center'].map((name, index) => (
                <div key={index} className="list-item">
                    <p className="font-semibold">{name}</p>
                    <span className="availability" style={{ color: HIGHLIGHT_GREEN }}>Available (3)</span>
                </div>
            ))}
        </div>
    </motion.div>
);

const MapDisplay = () => (
    <motion.div variants={containerVariants} className="map-display">
        <div className="map-placeholder" style={{ backgroundColor: '#161B22', color: TEXT_GRAY }}>
            <p className="text-2xl text-center">
                [Interactive Map Integration Area]
            </p>
            <p className="text-sm mt-2 text-center">
                Search, zoom, and select markers to view station details.
            </p>
        </div>
        <div className="search-bar-overlay">
            <input 
                type="text" 
                placeholder="Search location or address..." 
                className="map-search-input"
            />
            <button className="search-button">
                🔍
            </button>
        </div>
    </motion.div>
);

// --- MAIN COMPONENT ---

function Stations() {
    return (
        <div style={{ backgroundColor: DEEP_DARK, minHeight: '100vh', position: 'relative' }}>
            
            {/* 🛑 1. Absolute Positioned Header Wrapper (like Home/Contact) */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="stations-header-wrapper" // New class for CSS targeting
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 10,
                    padding: '20px 0',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Header />
            </motion.div>
            
            {/* 2. Main Content Area */}
            <div className="stations-page-content">
                
                <div className="stations-wrapper">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants} className="stations-header">
                            <h1 className="text-5xl font-extrabold uppercase mb-2" style={{ color: TEXT_WHITE }}>
                                Find Your <span style={{ color: HIGHLIGHT_GREEN }}>Charge</span>
                            </h1>
                            <p className="text-lg" style={{ color: TEXT_GRAY }}>
                                Discover available charging stations near you.
                            </p>
                        </motion.div>
                        
                        <div className="stations-grid">
                            
                            {/* Left Column: Filters and List */}
                            <FilterPanel />
                            
                            {/* Right Column: Map */}
                            <MapDisplay />
                            
                        </div>
                    </motion.div>
                </div>
            </div>
            
            <Footer/>
        </div>
    );
}

export default Stations;