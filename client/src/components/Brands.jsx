import React from 'react';

export default function Brands({ onNavigateServices, onNavigateCourses, onNavigateDistance }) {
  return (
    <section id="brands" className="brands-section">
      <div className="container">
        <div className="brands-header">
          <div className="badge-tag centered">OUR BRANDS</div>
          <h2 className="section-title">Three Brands. One Vision.</h2>
          <p className="section-subtitle">Education &nbsp;|&nbsp; Technology &nbsp;|&nbsp; Growth</p>
        </div>

        <div className="brands-grid">
          {/* Brand 1: WinTech IT Courses */}
          <div className="brand-card brand-blue">
            <div className="brand-card-icon brand-icon-badge">
              <img src="/images/wintech-icon.png" alt="WinTech IT Courses" width="56" height="56" style={{ borderRadius: '12px', boxShadow: '0 4px 14px rgba(229, 37, 42, 0.25)' }} />
            </div>
            <h3 className="brand-card-title">WINTECH</h3>
            <span className="brand-card-subtitle">IT COURSES</span>
            <p className="brand-card-desc">
              MERN Stack, Java, Python, Generative AI, AI/ML, Web Development, WordPress, Digital Marketing & more.
            </p>
            <button
              onClick={onNavigateCourses}
              className="btn btn-brand-blue btn-arrow"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              <span>Explore Courses</span>
              <span className="btn-arrow">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </button>
          </div>

          {/* Brand 2: Gen Z Neural-X IT Services */}
          <div className="brand-card brand-green">
            <div className="brand-card-icon green-bg">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            <h3 className="brand-card-title">Gen Z Neural-X</h3>
            <span className="brand-card-subtitle">IT SERVICES</span>
            <p className="brand-card-desc">
              Website & Mobile App Development, Software Solutions, AI Solutions, Digital Marketing, Graphic Designing.
            </p>
            <button
              onClick={onNavigateServices}
              className="btn btn-brand-green btn-arrow"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              <span>Explore Services</span>
              <span className="btn-arrow">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </button>
          </div>

          {/* Brand 3: GenSpark University Distance Education */}
          <div className="brand-card brand-purple">
            <div className="brand-card-icon purple-bg">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </div>
            <h3 className="brand-card-title">GenSpark University</h3>
            <span className="brand-card-subtitle">DISTANCE EDUCATION</span>
            <p className="brand-card-desc">
              Recognised University Programmes, Admission Guidance, Eligibility, Fees & Application Support.
            </p>
            <button
              onClick={onNavigateDistance}
              className="btn btn-brand-purple btn-arrow"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              <span>Explore University</span>
              <span className="btn-arrow">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
