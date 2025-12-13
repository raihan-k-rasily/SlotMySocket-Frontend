import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function Footer() {
  return (
    <motion.footer
      className="footer"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="footer-container">

        <motion.div className="footer-main" variants={itemVariants}>
          {/* LEFT */}
          <div className="footer-brand">
            <h3>SlotMySocket</h3>
            <p>
              The ultimate smart navigation platform for EV drivers.
              Find, reserve, and pay for charging with effortless precision.
            </p>
          </div>

          {/* RIGHT */}
          <div className="footer-social">
            <h4>Connect With Us</h4>
            <div className="footer-icons">
              <i><FaInstagram /></i>
              <i><FaFacebook /></i>
              <i><BsTwitterX /></i>
            </div>
          </div>
        </motion.div>

        <motion.div className="footer-bottom" variants={itemVariants}>
          <p className="footer-copy">
            © 2025 SlotMySocket. All rights reserved.
          </p>
          <p className="footer-tagline">
            The Future of EV Charging.
          </p>
        </motion.div>

      </div>
    </motion.footer>
  );
}

export default Footer;
