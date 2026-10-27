import React, { useState, useEffect } from 'react';

export default function Navbar({ activePage = 'services', onNavigate, onOpenEnquiry, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page, targetId) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(page);
    }
    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          {/* Brand Logo - dynamically adapts based on page */}
          {activePage === 'services' ? (
            <a
              href="#services"
              className="brand-logo it-brand-logo"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('services');
              }}
              aria-label="Gen Z Neural-X IT Services & Solutions"
            >
              <div className="genz-nav-logo-badge">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <div className="brand-text">
                <div className="genz-nav-title">Gen Z Neural-X</div>
                <span className="genz-nav-subtitle">IT SERVICES & SOLUTIONS</span>
              </div>
            </a>
          ) : (
            <a
              href="#home"
              className="brand-logo"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              aria-label="WinTech Digital Partner Home"
            >
              <img src="/images/wintech-icon.png" alt="WinTech Digital Partner" className="brand-icon-img" width="40" height="40" />
              <div className="brand-text">
                <div className="brand-title">
                  <span className="win">WiN</span>
                  <span className="tech">TECH</span>
                </div>
                <span className="brand-subtitle">DIGITAL PARTNER</span>
              </div>
            </a>
          )}

          {/* Desktop Navigation Menu */}
          <nav className="nav-menu" aria-label="Primary Navigation">
            <a
              href="#home"
              className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
            >
              Home
            </a>
            <a
              href="#courses"
              className={`nav-link ${activePage === 'courses' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('courses');
              }}
            >
              IT Courses
            </a>
            <a
              href="#services"
              className={`nav-link ${activePage === 'services' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('services');
              }}
            >
              IT Services
            </a>
            <a
              href="#distance"
              className={`nav-link ${activePage === 'distance' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('distance');
              }}
            >
              Distance Education
            </a>
            <a
              href="#about"
              className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about');
              }}
            >
              About
            </a>
            <a
              href="#contact"
              className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
            >
              Contact
            </a>
          </nav>

          {/* Header Actions */}
          <div className="nav-actions">
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="btn-icon"
              aria-label="Open Search"
              title="Search courses and services"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            {/* Get Enquiry Button */}
            <button
              onClick={onOpenEnquiry}
              className="btn btn-primary btn-sm btn-arrow"
            >
              <span>Get Enquiry</span>
              <span className="btn-arrow">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <a
          href="#home"
          className={`mobile-nav-link ${activePage === 'home' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
        >
          Home
        </a>
        <a
          href="#courses"
          className={`mobile-nav-link ${activePage === 'courses' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('courses');
          }}
        >
          IT Courses
        </a>
        <a
          href="#services"
          className={`mobile-nav-link ${activePage === 'services' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('services');
          }}
        >
          IT Services
        </a>
        <a
          href="#distance"
          className={`mobile-nav-link ${activePage === 'distance' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('distance');
          }}
        >
          Distance Education
        </a>
        <a
          href="#about"
          className={`mobile-nav-link ${activePage === 'about' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('about');
          }}
        >
          About
        </a>
        <a
          href="#contact"
          className={`mobile-nav-link ${activePage === 'contact' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('contact');
          }}
        >
          Contact
        </a>
        <button
          className="btn btn-primary"
          style={{ marginTop: '10px', width: '100%' }}
          onClick={() => {
            setMobileMenuOpen(false);
            onOpenEnquiry();
          }}
        >
          Get Enquiry
        </button>
      </div>
    </>
  );
}
