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
            
        </>
    );
}

export default Home;