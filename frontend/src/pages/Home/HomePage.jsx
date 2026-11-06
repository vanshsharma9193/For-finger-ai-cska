import React from 'react';
import { Link } from 'react-router-dom';
import TechnologyPage from '../Technology/TechnologyPage';
import ScannerPage from '../Scanner/ScannerPage';
import ContactPage from '../Contact/ContactPage';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-content">
          <div className="system-badge">FOR FINGER PROTOCOL // V2.8 ACTIVE</div>
          <h1 className="reveal-text">
            THE FUTURE OF <br />
            <span className="accent">BIOMETRIC FORENSICS</span>
          </h1>
          <p className="hero-sub">
            Unlocking the unique identity hidden in every touch. Precision, speed, and undeniable accuracy powered by
            deep-dermal algorithmic scanning.
          </p>
          <div className="hero-btns">
            <a href="#scanner" className="btn-primary">
              Initialize Scan
            </a>
            <a href="#about" className="btn-secondary">
              Learn More
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="fingerprint-container">
            <div className="scan-line" />
            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
              alt="Biometric Fingerprint Trace"
              className="hero-img"
              loading="lazy"
            />
            <div className="visual-hologram-hud">
              <span className="hud-metric">LATENCY: 12ms</span>
              <span className="hud-metric">SECURITY: AES-GCM-256</span>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <TechnologyPage />

      {/* Interactive Scanner Section */}
      <ScannerPage />

      {/* Secure Contact Section */}
      <ContactPage />
    </div>
  );
};

export default HomePage;

