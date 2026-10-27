import React from 'react';

export default function DistanceEdu({ onOpenEnquiry }) {
  const features = [
    {
      title: 'Recognised Universities',
      desc: 'UGC Approved Programmes',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4338ca" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 3 3.5 6 3.5s6-1.5 6-3.5v-5" />
          <circle cx="22" cy="16" r="1.5" fill="#4338ca" stroke="none" />
        </svg>
      )
    },
    {
      title: 'Wide Range of Courses',
      desc: 'UG / PG Programmes',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4338ca" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      )
    },
    {
      title: 'Easy Admission Process',
      desc: 'Expert Guidance',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4338ca" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M9 13l2 2 4-4" />
        </svg>
      )
    },
    {
      title: 'Complete Support',
      desc: 'Eligibility, Fees & More',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4338ca" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    }
  ];

  return (
    <section id="distance" className="distance-section">
      <div className="container">
        {/* Unified Lavender Banner Card Matching Mockup */}
        <div className="distance-banner-card">
          {/* Left Column: Heading, Subtitle & Pill Button */}
          <div className="distance-content">
            <div className="badge-tag">DISTANCE EDUCATION</div>
            <h2 className="section-title">
              Distance Learning for<br />
              a Brighter Tomorrow
            </h2>
            <p className="section-subtitle">
              Study from anywhere, at your own pace. Get guidance on recognised university programmes with complete admission support.
            </p>
            <button onClick={onOpenEnquiry} className="btn btn-primary btn-arrow">
              <span>Explore Programmes</span>
              <span className="btn-arrow">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </button>
          </div>

          {/* Center Column: Grounded Student Illustration */}
          <div className="distance-media-wrapper">
            <img
              src="/images/distance-banner-student.png"
              alt="Indian university distance education student smiling with books"
              className="distance-student-img"
              width="360"
              height="320"
              loading="lazy"
            />
          </div>

          {/* Right Column: 4 Minimalist Floating Feature Items */}
          <div className="distance-features-list">
            {features.map((feat, idx) => (
              <div key={idx} className="distance-feature-item">
                <div className="distance-feature-disc">
                  {feat.icon}
                </div>
                <div className="distance-feature-info">
                  <h4>{feat.title}</h4>
                  <p>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
