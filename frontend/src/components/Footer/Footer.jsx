import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-logo">
          FOR <span>FINGER</span>
        </div>
        <p className="footer-tagline">Advanced Biometric & Forensic Fingerprint Intelligence</p>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} FOR FINGER Forensics. All rights reserved. Encrypted Protocols Active.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

