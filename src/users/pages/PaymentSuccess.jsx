import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../../components/Footer';
import './PaymentSuccess.css';

function PaymentSuccess() {
    const navigate = useNavigate();

    return (
        <div className="success-page">
            {/* <div className="stations-header-wrapper">
                <Header />
            </div> */}

            <div className="success-container">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="success-card"
                >
                    {/* Animated Checkmark */}
                    <div className="check-container">
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            className="check-circle"
                        >
                            <span className="check-icon">✓</span>
                        </motion.div>
                        <div className="pulse-ring"></div>
                    </div>

                    <h1 className="success-title">Booking Confirmed!</h1>
                    <p className="success-subtitle">Your charging slot has been successfully reserved.</p>

                    {/* Simple Receipt Section */}
                    {/* <div className="receipt-box">
                        <div className="receipt-row">
                            <span>Transaction ID</span>
                            <span className="receipt-value">#EV-99201-QX</span>
                        </div>
                        <div className="receipt-row">
                            <span>Amount Paid</span>
                            <span className="receipt-value highlight">₹ 450.00</span>
                        </div>
                        <div className="receipt-row">
                            <span>Payment Status</span>
                            <span className="status-badge">Success</span>
                        </div>
                    </div> */}

                    <div className="action-buttons">
                        <button onClick={() => navigate('/')} className="primary-btn">
                            Go to Dashboard
                        </button>
                        {/* <button onClick={() => window.print()} className="secondary-btn">
                            Download Receipt
                        </button> */}
                    </div>
                </motion.div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default PaymentSuccess;