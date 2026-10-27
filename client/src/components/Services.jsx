import React from 'react';

export default function Services({ onOpenEnquiry }) {
  const serviceItems = [
    {
      name: 'Website Development',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    },
    {
      name: 'Mobile App Development',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      )
    },
    {
      name: 'Software Development',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      )
    },
    {
      name: 'AI Solutions & Automation',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      )
    },
    {
      name: 'Digital Marketing',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      )
    },
    {
      name: 'Graphic Design',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
          <path d="M2 2l7.586 7.586"></path>
          <circle cx="11" cy="11" r="2"></circle>
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="it-services-section">
      <div className="container services-layout">
        {/* Left: Content */}
        <div className="services-content">
          <div className="badge-tag white-tag">IT SERVICES</div>
          <h2 className="section-title white">Custom Digital Solutions for Your Business</h2>
          <p className="section-subtitle white">
            From websites to industry experts, we build solutions that help your business grow and succeed in the digital world.
          </p>

          <button onClick={onOpenEnquiry} className="btn btn-primary btn-arrow">
            <span>Explore Our Services</span>
            <span className="btn-arrow">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </button>

          <div className="services-metrics-row">
            <div className="service-metric-item">
              <div className="service-metric-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <div className="service-metric-text">
                <h5>Modern Technology</h5>
                <p>Latest Tools & Frameworks</p>
              </div>
            </div>

            <div className="service-metric-item">
              <div className="service-metric-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div className="service-metric-text">
                <h5>On-Time Delivery</h5>
                <p>Committed to Your Goals</p>
              </div>
            </div>

            <div className="service-metric-item">
              <div className="service-metric-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                </svg>
              </div>
              <div className="service-metric-text">
                <h5>Dedicated Support</h5>
                <p>Long-Term Partnership</p>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Device Mockup */}
        <div className="services-mockup-wrapper">
          <img
            src="/images/devices-mockup.jpg"
            alt="Responsive Web and Mobile App Mockup on Laptop, Tablet, and Phone"
            className="services-mockup-img"
            width="600"
            height="400"
            loading="lazy"
          />
        </div>

        {/* Right: Glassmorphism Service Cards */}
        <div className="services-list-stack">
          {serviceItems.map((item, idx) => (
            <div
              key={idx}
              className="service-pill-card"
              onClick={onOpenEnquiry}
              role="button"
              tabIndex={0}
            >
              <div className="service-pill-icon">{item.icon}</div>
              <span className="service-pill-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
