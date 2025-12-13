import React from 'react';
import { motion } from 'framer-motion'; 
import Header from '../components/Header';
import Footer from '../../components/Footer';

// 🛑 Import the CSS file for ALL structural and alignment fixes
import './Contact.css';

// --- Design Constants (Used for robust inline styling) ---
const DEEP_DARK = '#0D1117';      // Background Color
const HIGHLIGHT_GREEN = '#00A36C'; // Primary Accent
const TEXT_WHITE = '#E2E8F0';     // Main Text Color
const TEXT_GRAY = '#6B7280';      // Subtle Text/Label Color
const GRAY_700 = '#374151';       // Equivalent to Tailwind's gray-700

// Framer Motion Variants (Unchanged)
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
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};


function Contact() {
    
    // Base style object for the form input/textarea element
    const inputBaseStyle = {
        width: '100%',
        padding: '0.75rem 1rem', 
        backgroundColor: 'transparent',
        borderBottom: `2px solid ${GRAY_700}`,
        color: TEXT_WHITE,
        transition: 'border-color 0.3s',
        outline: 'none',
    };

    // Style for the submission button
    const buttonInlineStyle = {
        width: '100%',
        padding: '0.75rem 0',
        marginTop: '1.5rem', 
        fontSize: '1.125rem', 
        fontWeight: '600', 
        textTransform: 'uppercase',
        letterSpacing: '0.1em', 
        backgroundColor: HIGHLIGHT_GREEN,
        color: DEEP_DARK,
        borderRadius: '0.375rem', 
        boxShadow: `0 10px 15px -3px rgba(0, 163, 108, 0.1), 0 4px 6px -2px rgba(0, 163, 108, 0.05)`, 
        transition: 'opacity 0.3s',
        cursor: 'pointer',
    };

    return (
      <div >
      <Header/>
            <div 
                className="contact-page"
                style={{ backgroundColor: DEEP_DARK, color: TEXT_WHITE }}
            >
                <div className="contact-wrapper">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* --- HEADER --- */}
                        <motion.div
                            variants={itemVariants}
                            className="contact-header"
                        >
                            <h1 
                                className="text-5xl md:text-6xl font-extrabold uppercase mb-4" 
                                style={{ color: TEXT_WHITE }}
                            >
                                <span style={{ color: HIGHLIGHT_GREEN }}>Get</span> In Touch
                            </h1>
                            <p className="text-lg" style={{ color: TEXT_GRAY }}>
                                We're here to help you power your journey.
                            </p>
                        </motion.div>

                        {/* --- MAIN TWO-COLUMN LAYOUT --- */}
                        <div className="contact-grid"> 
                            
                            {/* -------------------- COLUMN 1: CONTACT FORM -------------------- */}
                            <motion.div variants={itemVariants} className="contact-form-col">
                                <h2 className="text-3xl font-semibold mb-8 border-b pb-3 contact-col-header" style={{ color: HIGHLIGHT_GREEN, borderColor: TEXT_GRAY }}>
                                    Send Us A Message
                                </h2>
                                <form className="contact-form"> 
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: TEXT_GRAY }}>Full Name</label>
                                        <input type="text" id="name" placeholder="Your Name" style={inputBaseStyle} required />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: TEXT_GRAY }}>Email Address</label>
                                        <input type="email" id="email" placeholder="you@example.com" style={inputBaseStyle} required />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium mb-1" style={{ color: TEXT_GRAY }}>Subject</label>
                                        <input type="text" id="subject" placeholder="Charging Inquiry, Partnership, etc." style={inputBaseStyle} />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium mb-1" style={{ color: TEXT_GRAY }}>Message</label>
                                        <textarea id="message" rows="4" placeholder="How can we assist you today?" style={{ ...inputBaseStyle, resize: 'none' }} required></textarea>
                                    </div>
                                    <button type="submit" style={buttonInlineStyle}>
                                        Send Message
                                    </button>
                                </form>
                            </motion.div>
                            
                            {/* -------------------- COLUMN 2: CONTACT INFO -------------------- */}
                            <motion.div variants={itemVariants} className="contact-info-col">
                                
                                <h2 className="text-3xl font-semibold mb-8 border-b pb-3 contact-col-header" style={{ color: HIGHLIGHT_GREEN, borderColor: TEXT_GRAY }}>
                                    Reach Our Team
                                </h2>

                                <div className="contact-info-list">
                                    {/* Address */}
                                    <div className="info-box">
                                        <div style={{ color: HIGHLIGHT_GREEN, fontSize: '24px' }}>[MAP]</div>
                                        <div>
                                            <p className="font-semibold text-lg">Our Headquarters</p>
                                            <p className="text-sm" style={{ color: TEXT_GRAY }}>123 Green Circuit, Innovation City, 90210</p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="info-box">
                                        <div style={{ color: HIGHLIGHT_GREEN, fontSize: '24px' }}>[MAIL]</div>
                                        <div>
                                            <p className="font-semibold text-lg">General Inquiries</p>
                                            <p className="text-sm" style={{ color: TEXT_GRAY }}>support@slotmysocket.com</p>
                                        </div>
                                    </div>
                                    
                                    {/* Phone */}
                                    <div className="info-box">
                                        <div style={{ color: HIGHLIGHT_GREEN, fontSize: '24px' }}>[PHONE]</div>
                                        <div>
                                            <p className="font-semibold text-lg">Call Us</p>
                                            <p className="text-sm" style={{ color: TEXT_GRAY }}>+1 (555) 765-EVGO</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Social Media Link Reminder */}
                                <p className="contact-social-reminder" style={{ color: TEXT_GRAY }}>
                                    For immediate support, connect with us on social media (links in the footer).
                                </p>
                                
                            </motion.div>

                        </div>
                    </motion.div>
                </div>
            </div>
        <Footer/>
      </div>
    );
}

export default Contact;