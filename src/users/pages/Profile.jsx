import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../../components/Footer';
import './Profile.css';

function Profile() {
    // Mock user data - replace with your actual state/context
    const [user, setUser] = useState({
        username: "Deepak Kumar",
        email: "deepak.ev@example.com",
        phone: "+91 98765 43210",
        memberSince: "Jan 2026",
        credits: "₹ 1,250"
    });

    // Mock booked slots
    const [bookings, setBookings] = useState([
        { id: 1, station: "Quantum Charge Hub", socket: "CCS 2 (S1)", time: "10:00 AM", date: "15 Feb 2026", status: "Upcoming" },
        { id: 2, station: "Tesla Supercharger", socket: "Type 2 (S2)", time: "02:00 PM", date: "12 Feb 2026", status: "Completed" },
    ]);

    return (
        <div className="profile-page">
            <div className="stations-header-wrapper">
                <Header />
            </div>

            <div className="profile-container">
                {/* --- USER IDENTITY SECTION --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="user-hero-card"
                >
                    <div className="avatar-section">
                        <div className="profile-avatar">
                            {user.username.charAt(0)}
                        </div>
                        <div className="user-meta">
                            <h1>{user.username}</h1>
                            <p>{user.email}</p>
                            {/* <span className="membership-tag">Premium Member</span> */}
                        </div>
                    </div>
                    
                    <div className="user-stats">
                        {/* <div className="stat-box">
                            <span className="stat-label">Wallet Balance</span>
                            <span className="stat-value highlight">{user.credits}</span>
                        </div> */}
                        <div className="stat-box">
                            <span className="stat-label">Total Charges</span>
                            <span className="stat-value">24</span>
                        </div>
                    </div>
                </motion.div>

                {/* --- BOOKED SLOTS SECTION --- */}
                <section className="bookings-section">
                    <div className="section-header">
                        <h2 className="section-title">My Booked Slots</h2>
                        {/* <button className="view-all-btn">View History</button> */}
                    </div>

                    <div className="bookings-list">
                        {bookings.map((slot) => (
                            <motion.div 
                                whileHover={{ x: 10 }}
                                key={slot.id} 
                                className="booking-item"
                            >
                                <div className="booking-info">
                                    <div className="station-icon">⚡</div>
                                    <div>
                                        <h3>{slot.station}</h3>
                                        <p>{slot.socket} • {slot.date}</p>
                                    </div>
                                </div>
                                <div className="booking-right">
                                    <span className="booking-time">{slot.time}</span>
                                    <span className={`status-pill ${slot.status.toLowerCase()}`}>
                                        {slot.status}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;