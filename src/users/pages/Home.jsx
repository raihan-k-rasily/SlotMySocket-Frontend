import React from 'react';

import LiquidEther from '../../bits/components/LiquidEther';
import ScrollStack, { ScrollStackItem } from '../../bits/components/ScrollStack';
import Header from '../components/Header';


function Home() {
    // Define the dark purple color for easy reuse
    const darkPurple = 'rgb(116, 59, 169)';
    const textStyle = { transform: 'translateZ(0)' }; // Anti-Jitter Fix

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
                }}
            >
                {/* 1A. LiquidEther Background (Unchanged) */}
                <LiquidEther
                    colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo={true}
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                />
                

                {/* 1B. Header (Navigation) (Unchanged) */}
                <div
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
                </div>

                {/* 1C. Main Heading (SlotMySocket) (Unchanged) */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        color: darkPurple, 
                        zIndex: 10,
                    }}
                >
                    <h1
                        style={{
                            fontSize: '4em',
                            margin: 0,
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'
                        }}
                    >
                        SlotMySocket
                    </h1>
                    <p
                        style={{
                            fontSize: '1.5em',
                            marginTop: '10px',
                            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        Charge Your EV, Book Your Slot.
                    </p>
                </div>
            </div>
            
            {/* 2. SCROLLABLE CONTENT SECTION: Apply the desired background color here. */}
            <div 
                style={{ 
                    // Overlap for smooth transition
                    marginTop: '-20vh', 
                    zIndex: 2, 
                    position: 'relative',
                    boxShadow: '0 -10px 20px rgba(0,0,0,0.1)',
                    padding: '60px 20px', 
                    // Set the background color here
                    backgroundColor: darkPurple 
                }}
            >
                {/* Text for this section is now white/light for contrast */}
                <h2 style={{ textAlign: 'center', color: '#ffffff' }}>⚡ How to Book Your EV Slot</h2>
                <p style={{ textAlign: 'center', marginBottom: '40px', color: '#dddddd' }}>Follow these quick steps to reserve your next charge.</p>
                
                {/* Ensure the ScrollStack cards are visible against the dark background */}
                <ScrollStack useWindowScroll={true}>
                    <ScrollStackItem>
                        <h3 style={textStyle}>1. Find & Filter 🔎</h3>
                        <p style={textStyle}>Locate the nearest charging station using your current location or a target destination. Filter results instantly by **connector type** (CCS, CHAdeMO, etc.) and power level.</p>
                    </ScrollStackItem>
                    <ScrollStackItem>
                        <h3 style={textStyle}>2. Book Your Window 🗓️</h3>
                        <p style={textStyle}>View the station's real-time schedule. Select an available **30, 60, or 90-minute time slot** that perfectly aligns with your travel plans.</p>
                    </ScrollStackItem>
                    <ScrollStackItem>
                        <h3 style={textStyle}>3. Plug In & Pay 💳</h3>
                        <p style={textStyle}>When you arrive, use your **unique booking QR code** to activate the charger. Payment is processed securely upon successful charging session completion.</p>
                    </ScrollStackItem>
                    <ScrollStackItem>
                        <h3 style={textStyle}>4. Get Notified 🔔</h3>
                        <p style={textStyle}>Receive automatic notifications when your reserved slot is **about to begin** and when your charging session is complete, so you never wait unnecessarily.</p>
                    </ScrollStackItem>
                </ScrollStack>
            </div>
        </>
    );
}

export default Home;