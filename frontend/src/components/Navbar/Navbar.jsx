import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onOpenAccessModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <nav className="main-nav">
      <Link to="/" className="logo" onClick={closeMobile}>
        FOR <span>FINGER</span>
      </Link>

      <div className={`nav-links-wrapper ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="nav-links">
          <li>
            {isHome ? (
              <a href="#hero" onClick={closeMobile}>Home</a>
            ) : (
              <Link to="/" onClick={closeMobile}>Home</Link>
            )}
          </li>
          <li>
            {isHome ? (
              <a href="#about" onClick={closeMobile}>Technology</a>
            ) : (
              <Link to="/technology" onClick={closeMobile}>Technology</Link>
            )}
          </li>
          <li>
            {isHome ? (
              <a href="#scanner" onClick={closeMobile}>Scanner</a>
            ) : (
              <Link to="/scanner" onClick={closeMobile}>Scanner</Link>
            )}
          </li>
          <li>
            {isHome ? (
              <a href="#contact" onClick={closeMobile}>Contact</a>
            ) : (
              <Link to="/contact" onClick={closeMobile}>Contact</Link>
            )}
          </li>
          <li>
            <Link to="/dashboard" onClick={closeMobile} className="terminal-nav-link">
              Terminal
            </Link>
          </li>
        </ul>

        <button
          className="cta-nav"
          onClick={() => {
            closeMobile();
            if (onOpenAccessModal) onOpenAccessModal();
          }}
        >
          Secure Access
        </button>
      </div>

      <button
        className="mobile-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle navigation"
      >
        <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
        <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
        <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
      </button>
    </nav>
  );
};

export default Navbar;
