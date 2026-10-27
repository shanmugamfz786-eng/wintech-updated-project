import React from 'react';

export default function Hero({ onOpenEnquiry }) {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        {/* Left Column Content - Floating cleanly over the backdrop */}
        <div className="hero-content">
          <span className="hero-tag">SKILL • TECHNOLOGY • OPPORTUNITY</span>
          <h1 className="hero-title">
            Learn Technology.<br />
            Build Your Future.<br />
            <span className="highlight-red">Grow Your Business.</span>
          </h1>
          <p className="hero-desc">
            Practical IT training, digital solutions for businesses, and distance education guidance — all under one connected ecosystem.
          </p>

          <div className="hero-cta-group">
            <a href="#courses" className="btn btn-primary btn-arrow">
              <span>Explore IT Courses</span>
              <span className="btn-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </a>
            <a href="#brands" className="btn btn-outline">
              Explore Our Brands
            </a>
          </div>

          {/* Hero Feature Badges */}
          <div className="hero-features-row">
            <div className="hero-feature-item">
              <div className="hero-feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <div className="hero-feature-text">
                <h4>Expert Trainers</h4>
                <p>Industry Experienced</p>
              </div>
            </div>

            <div className="hero-feature-item">
              <div className="hero-feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="hero-feature-text">
                <h4>1000+ Students</h4>
                <p>Trained Successfully</p>
              </div>
            </div>

            <div className="hero-feature-item">
              <div className="hero-feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <div className="hero-feature-text">
                <h4>Real Projects</h4>
                <p>Hands-on Learning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
