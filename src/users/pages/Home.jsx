import React from 'react';
import { motion } from 'framer-motion'; 

import LiquidEther from '../../bits/components/LiquidEther';
import Header from '../components/Header';
import Footer from '../../components/Footer'; // Correctly importing Footer from its own file


// --- Design Constants ---
const CHARCOAL = '#1A202C'; // Primary Background (Deep Dark Grey)
const DEEP_DARK = '#0D1117'; // Extra Dark BG for contrast
const HIGHLIGHT_GREEN = '#00A36C'; // Primary Accent
const LIGHT_GREEN = '#38B2AC'; // Secondary Accent
const TEXT_WHITE = '#E2E8F0'; // Light Text
const TEXT_GRAY = '#A0AEC0'; // Subtle Text

// Fluid colors (Your provided green combo)
const fluidColors = [ '#033f07', '#245b43', '#a3f0ac' ];

// Animation variants
const containerVariants = {
    visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const quoteVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
};

// --- Helper Components for Consistent Layout ---
const ContentBlock = ({ children, style = {} }) => (
    <div 
        style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '100px 30px', 
            ...style 
        }}
    >
        {children}
    </div>
);

// --- Main Component ---
function Home() {
    
    const textStyle = { transform: 'translateZ(0)' }; // Anti-Jitter Fix

    // Premium Button Style using a slight gradient and refined shadow
    const premiumButtonStyle = {
        background: `linear-gradient(90deg, ${HIGHLIGHT_GREEN} 0%, ${LIGHT_GREEN} 100%)`,
        color: CHARCOAL,
        fontSize: '1.4em',
        fontWeight: 800,
        padding: '16px 50px',
        borderRadius: '10px', // More modern squared-off corners
        cursor: 'pointer',
        border: 'none',
        boxShadow: `0 8px 25px rgba(0, 0, 0, 0.7), 0 0 10px ${HIGHLIGHT_GREEN} inset`,
        // Default transition is handled by Framer Motion's whileHover
    };


    return (
        <>
            {/* 1. HERO SECTION: 100vh height */}
            <div
                style={{
                    width: '100%',
                    height: '100vh',
                    position: 'relative',
                    overflow: 'hidden',
                    zIndex: 1,
                    backgroundColor: DEEP_DARK,
                }}
            >
                {/* 1A. LiquidEther Background (Moved below content to act as a deep background effect) */}
                <LiquidEther
                    colors={fluidColors}
                    // ... (other props remain the same)
                    resolution={0.5}
                    autoDemo={true}
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                />


                {/* 1B. Header (Navigation) */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        zIndex: 10,
                        padding: '20px 0',
                        display: 'flex',
                        justifyContent: 'center',
                        transform: 'translateZ(0)',
                    }}
                >
                    <Header />
                </motion.div>

                {/* 1C. Main Heading (SlotMySocket) */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '7%', // Changed from 7% to 50% for center alignment
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        color: TEXT_WHITE,
                        zIndex: 10,
                        ...textStyle, 
                        width: '90%', // Ensure width responsiveness
                    }}
                >
                    {/* Animate the main headline */}
                    <motion.h1
                        variants={itemVariants}
                        style={{
                            fontSize: 'clamp(3em, 8vw, 6.5em)', // Responsive font sizing
                            fontWeight: 900,
                            margin: '0 0 20px 0',
                            letterSpacing: '-2px',
                            textShadow: `0 0 20px rgba(0, 0, 0, 0.9), 0 0 15px ${HIGHLIGHT_GREEN}aa` // Softer glow
                        }}
                    >
                        SlotMySocket
                    </motion.h1>
                    
                    {/* Animate the sub-headline */}
                    <motion.p
                        variants={itemVariants}
                        style={{
                            fontSize: 'clamp(1.2em, 2.5vw, 2em)',
                            fontWeight: 300,
                            color: TEXT_GRAY,
                        }}
                    >
                        The Only EV Charger You Can **Book Ahead**.
                    </motion.p>

                    {/* CTA Button placed directly in Hero for high conversion */}
                    <motion.button
                        variants={itemVariants}
                        style={{ ...premiumButtonStyle, marginTop: '40px' }}
                        whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${HIGHLIGHT_GREEN}`, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Reserve Your First Slot
                    </motion.button>
                </motion.div>
            </div>
            
            {/* 2. STANDARD SCROLLABLE CONTENT SECTION */}
            <div style={{ backgroundColor: CHARCOAL, color: TEXT_WHITE }}>
                
                {/* SECTION 1: The Problem / Quote - Full Width Quote */}
                <ContentBlock style={{ textAlign: 'center', backgroundColor: DEEP_DARK }}>
                    <motion.div
                        variants={quoteVariants}
                        initial="hidden"
                        whileInView="visible" 
                        viewport={{ once: true, amount: 0.8 }}
                        style={{ maxWidth: '900px', margin: '0 auto', ...textStyle }}
                    >
                        <p style={{ fontSize: '1.2em', fontWeight: 500, color: HIGHLIGHT_GREEN, marginBottom: '10px' }}>
                            THE PROBLEM WE SOLVE
                        </p>
                        <h2 style={{ fontSize: 'clamp(2em, 4vw, 3.5em)', fontWeight: 700, lineHeight: 1.3, color: TEXT_WHITE }}>
                            "Stop driving around hoping. Start driving knowing."
                        </h2>
                        <p style={{ fontSize: '1.5em', marginTop: '20px', color: TEXT_GRAY }}>
                            We replace range anxiety and unexpected detours with a guaranteed, reserved slot along your optimized route.
                        </p>
                    </motion.div>
                </ContentBlock>

                {/* SECTION 2: The Solution / Geoapify Feature - Grid Layout */}
                <ContentBlock>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center' }}
                    >
                        {/* Text Content */}
                        <div style={{ paddingRight: '20px' }}>
                            <motion.p variants={itemVariants} style={{ fontSize: '1.1em', fontWeight: 500, color: HIGHLIGHT_GREEN, marginBottom: '10px' }}>
                                INTELLIGENT ROUTING
                            </motion.p>
                            <motion.h2 variants={itemVariants} style={{ fontSize: 'clamp(1.8em, 3vw, 3em)', fontWeight: 900, lineHeight: 1.2 }}>
                                No Detours. Guaranteed Slots. Smart Charging.
                            </motion.h2>
                            <motion.p variants={itemVariants} style={{ fontSize: '1.2em', marginTop: '20px', color: TEXT_GRAY }}>
                                **Powered by Geoapify:** Our intelligent routing finds, verifies, and reserves slots *only* along your direct route. This eliminates wasted time, ensures you arrive on time, and makes range anxiety a thing of the past.
                            </motion.p>
                        </div>
                        
                        {/* Visual Proof / Map */}
                        <motion.div variants={itemVariants} style={{ 
                            height: '350px', 
                            background: DEEP_DARK, 
                            borderRadius: '12px', 
                            boxShadow: `0 0 20px rgba(0, 0, 0, 0.5) inset`,
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            color: LIGHT_GREEN, 
                            border: `2px solid ${HIGHLIGHT_GREEN}33`
                        }}>
                            
                        </motion.div>
                    </motion.div>
                </ContentBlock>

                {/* SECTION 3: Stakeholders / Value Proposition - Three Column Layout */}
                <ContentBlock style={{ backgroundColor: DEEP_DARK, textAlign: 'center' }}>
                    <motion.h2 
                        variants={itemVariants} 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        style={{ fontSize: 'clamp(2em, 4vw, 3.5em)', fontWeight: 700, lineHeight: 1.3, color: HIGHLIGHT_GREEN, marginBottom: '50px' }}
                    >
                        A thriving ecosystem is built on mutual certainty.
                    </motion.h2>
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        style={{ display: 'flex', justifyContent: 'space-between', gap: '30px' }}
                    >
                        {/* Value 1: Owners */}
                        <motion.div variants={itemVariants} style={{ flex: 1, padding: '30px', background: CHARCOAL, borderRadius: '12px', borderTop: `5px solid ${HIGHLIGHT_GREEN}` }}>
                            <h3 style={{ fontSize: '1.8em', fontWeight: 900, color: TEXT_WHITE }}>Owners</h3>
                            <p style={{ color: TEXT_GRAY, marginTop: '10px', fontSize: '1.1em' }}>Guaranteed revenue and maximized asset utilization through predictable booking windows.</p>
                        </motion.div>

                        {/* Value 2: Users */}
                        <motion.div variants={itemVariants} style={{ flex: 1, padding: '30px', background: CHARCOAL, borderRadius: '12px', borderTop: `5px solid ${HIGHLIGHT_GREEN}` }}>
                            <h3 style={{ fontSize: '1.8em', fontWeight: 900, color: TEXT_WHITE }}>Users</h3>
                            <p style={{ color: TEXT_GRAY, marginTop: '10px', fontSize: '1.1em' }}>Guaranteed charge, zero waiting time, and peace of mind on every long trip.</p>
                        </motion.div>
                    </motion.div>
                </ContentBlock>

                {/* SECTION 4: Final CTA - Maximized for Conversion */}
                <ContentBlock style={{ 
                    minHeight: '60vh', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: CHARCOAL 
                }}>
                    <motion.div
                        className="text-center"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        style={{ maxWidth: '800px', margin: '0 auto', ...textStyle, textAlign: 'center' }}
                    >
                        <motion.h2 variants={itemVariants} style={{ fontSize: 'clamp(3em, 6vw, 5em)', fontWeight: 900, color: TEXT_WHITE, marginBottom: '20px', lineHeight: 1 }}>
                            Download SlotMySocket Today.
                        </motion.h2>
                        <motion.p variants={itemVariants} style={{ fontSize: '1.5em', color: TEXT_GRAY, marginBottom: '50px', maxWidth: '600px', margin: '20px auto 50px' }}>
                            Stop searching. Start booking. Download SlotMySocket and redefine your road trip experience.
                        </motion.p>
                        
                        {/* CTA Button: Enhanced with motion.button for strong interaction */}
                        <motion.button
                            variants={itemVariants}
                            style={premiumButtonStyle}
                            whileHover={{ scale: 1.08, boxShadow: `0 0 40px ${HIGHLIGHT_GREEN}`, y: -8 }} // Stronger hover
                            whileTap={{ scale: 0.95 }}
                        >
                            Get SlotMySocket Now
                        </motion.button>
                        
                    </motion.div>
                </ContentBlock>
            </div>
            <Footer/>
        </>
    );
}

export default Home;