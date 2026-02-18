import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../../components/Footer';
import './PaymentError.css';

function PaymentError() {
    const navigate = useNavigate();

    return (
        <div className="error-page">
            {/* <div className="stations-header-wrapper">
                <Header />
            </div> */}

            <div className="error-container">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="error-card"
                >
                    {/* Animated Error Icon */}
                    <div className="icon-container">
                        <motion.div 
                            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="error-circle"
                        >
                            <span className="error-icon">!</span>
                        </motion.div>
                        <div className="error-pulse-ring"></div>
                    </div>

                    <h1 className="error-title">Payment Failed</h1>
                    <p className="error-subtitle">
                        We couldn't process your transaction. This could be due to insufficient funds or a temporary bank issue.
                    </p>

                    {/* <div className="error-details-box">
                        <div className="error-row">
                            <span>Error Code</span>
                            <span className="error-value">ERR_PYMNT_DECLINED</span>
                        </div>
                        <div className="error-row">
                            <span>Timestamp</span>
                            <span className="error-value">Feb 15, 2026 - 05:10 AM</span>
                        </div>
                    </div> */}

                    <div className="action-buttons">
                        <button onClick={() => navigate('/')} className="retry-btn">
                            Go to Dashboard
                        </button>
                        {/* <button onClick={() => navigate('/support')} className="ghost-btn">
                            Contact Support
                        </button> */}
                    </div>
                </motion.div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default PaymentError;