import React from 'react';

export default function AboutPage({ onOpenEnquiry, onNavigate }) {
  const handleNav = (page, anchorId) => {
    if (onNavigate) {
      onNavigate(page);
    }
    if (anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="about-page-wrapper">
      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <section className="about-hero-section">
        <div className="about-hero-bg-glow"></div>
        <div className="container about-hero-container">
          {/* Left Text Content */}
          <div className="about-hero-content">
            <span className="about-badge-tag">— ABOUT US</span>
            <h1 className="about-hero-title">
              Empowering People<br />
              Through Technology
            </h1>
            <p className="about-hero-description">
              WinTech Digital Partner is a forward-thinking digital education and technology solutions company, committed to helping individuals and businesses grow in the digital era.
            </p>
            <div className="about-hero-actions">
              <button
                className="btn-about-hero-pill"
                onClick={() => handleNav('services')}
              >
                <span>Explore Our Services</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Right Hero Visual with Handwriting Badge */}
          <div className="about-hero-visual">
            <div className="about-hero-image-card">
              <img
                src="/images/hero-students-realistic.jpg"
                alt="Empowering people through technology - WinTech Digital Partner team"
                className="about-hero-main-img"
              />
              {/* Handwritten Floating Badge: Learn -> Build -> Grow */}
              <div className="about-handwritten-badge" aria-hidden="true">
                <span className="hw-learn">Learn</span>
                <div className="hw-build-row">
                  <span className="hw-arrow">➔</span>
                  <span className="hw-build">Build</span>
                </div>
                <span className="hw-grow">Grow</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. OUR STORY SECTION
          ========================================================================= */}
      <section className="about-story-section" id="about-story">
        <div className="container about-story-container">
          {/* Left Column: Story narrative */}
          <div className="about-story-content">
            <span className="about-badge-tag-blue">— OUR STORY</span>
            <h2 className="about-story-title">
              A Vision to Build<br />
              a Better Digital Future
            </h2>
            <div className="about-story-paragraphs">
              <p>
                WinTech Digital Partner was founded with a simple belief — that technology can create real opportunities. We started with a mission to make quality education, practical skills and technology solutions accessible to everyone.
              </p>
              <p>
                Today, we bring together three powerful verticals — IT Courses, IT Services and Distance Education — under one brand, helping individuals learn, businesses innovate and learners achieve their dreams.
              </p>
            </div>
            <div className="about-story-actions">
              <button
                className="btn-about-blue-pill"
                onClick={() => {
                  const el = document.getElementById('about-verticals');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Learn More About Us</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column: Modern Building Exterior with 3D Brand Signage & Floating Highlights */}
          <div className="about-story-visual">
            <div className="about-building-facade-card">
              {/* Modern Building Facade Illustration/Graphic */}
              <div className="building-glass-backdrop">
                <div className="building-sky-reflection"></div>
                <div className="building-glass-grid">
                  <div className="building-panel-row">
                    <span className="glass-panel"></span>
                    <span className="glass-panel"></span>
                    <span className="glass-panel"></span>
                    <span className="glass-panel"></span>
                  </div>
                  <div className="building-panel-row">
                    <span className="glass-panel"></span>
                    <span className="glass-panel"></span>
                    <span className="glass-panel"></span>
                    <span className="glass-panel"></span>
                  </div>
                  <div className="building-panel-row">
                    <span className="glass-panel"></span>
                    <span className="glass-panel"></span>
                    <span className="glass-panel"></span>
                    <span className="glass-panel"></span>
                  </div>
                </div>

                {/* 3D Brand Logo on the Building Facade */}
                <div className="building-brand-signage">
                  <img src="/images/wintech-icon.png" alt="WinTech Sign" className="signage-icon" />
                  <div className="signage-text">
                    <div className="signage-brand">
                      <span className="win">WiN</span>
                      <span className="tech">TECH</span>
                    </div>
                    <span className="signage-sub">DIGITAL PARTNER</span>
                  </div>
                </div>
              </div>

              {/* Floating Pill Card on Right */}
              <div className="building-floating-feature-card">
                <div className="feature-pill-item">
                  <div className="pill-icon-circle blue-circle">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                    </svg>
                  </div>
                  <span className="pill-item-text">Trusted Learning Partner</span>
                </div>

                <div className="feature-pill-item">
                  <div className="pill-icon-circle blue-circle">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </div>
                  <span className="pill-item-text">Innovative Technology Solutions</span>
                </div>

                <div className="feature-pill-item">
                  <div className="pill-icon-circle blue-circle">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <span className="pill-item-text">Guidance for a Brighter Future</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. OUR THREE VERTICALS SECTION
          ========================================================================= */}
      <section className="about-verticals-section" id="about-verticals">
        <div className="container">
          {/* Header Row with 3 mini tags on right */}
          <div className="about-verticals-header-row">
            <div className="about-verticals-title-group">
              <span className="about-badge-tag-blue">— OUR THREE VERTICALS</span>
              <h2 className="about-section-heading">Three Brands. One Vision.</h2>
              <p className="about-section-subheading">
                We operate through three specialized verticals, each designed to create value in its own way — education, technology and career growth.
              </p>
            </div>

            {/* Quick mini vertical tabs */}
            <div className="about-verticals-quick-tabs">
              <div className="quick-tab-item" onClick={() => handleNav('courses')}>
                <span className="qt-icon">🎓</span>
                <div className="qt-text">
                  <span className="qt-label">Learn</span>
                  <span className="qt-brand">IT Courses</span>
                </div>
              </div>

              <div className="quick-tab-item" onClick={() => handleNav('services')}>
                <span className="qt-icon">👥</span>
                <div className="qt-text">
                  <span className="qt-label">Build</span>
                  <span className="qt-brand">IT Services</span>
                </div>
              </div>

              <div className="quick-tab-item" onClick={() => handleNav('distance')}>
                <span className="qt-icon">📖</span>
                <div className="qt-text">
                  <span className="qt-label">Grow</span>
                  <span className="qt-brand">Distance Education</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Brand Cards Grid */}
          <div className="about-verticals-grid">
            {/* Card 1: WinTech IT Courses */}
            <div className="about-vertical-card card-courses">
              <div className="vertical-card-media">
                <img src="/images/courses-hero-student.jpg" alt="WinTech IT Courses" className="vertical-card-img" />
                <div className="vertical-media-badge badge-blue">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                  </svg>
                </div>
              </div>
              <div className="vertical-card-body">
                <h3 className="vertical-card-brand">WinTech</h3>
                <span className="vertical-card-tag tag-blue">IT COURSES</span>
                <p className="vertical-card-desc">
                  Gain in-demand skills with industry-focused training and hands-on projects.
                </p>
                <button
                  className="vertical-card-link link-blue"
                  onClick={() => handleNav('courses')}
                >
                  <span>Explore Courses</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            {/* Card 2: Gen Z Neural-X IT Services */}
            <div className="about-vertical-card card-services">
              <div className="vertical-card-media">
                <img src="/images/it-hero-team.jpg" alt="Gen Z Neural-X IT Services" className="vertical-card-img" />
                <div className="vertical-media-badge badge-teal">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
              </div>
              <div className="vertical-card-body">
                <h3 className="vertical-card-brand">Gen Z Neural-X</h3>
                <span className="vertical-card-tag tag-teal">IT SERVICES</span>
                <p className="vertical-card-desc">
                  Custom software, web & mobile apps, AI solutions and digital transformation.
                </p>
                <button
                  className="vertical-card-link link-teal"
                  onClick={() => handleNav('services')}
                >
                  <span>Explore Services</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            {/* Card 3: Distance Academy Distance Education */}
            <div className="about-vertical-card card-distance">
              <div className="vertical-card-media">
                <img src="/images/distance-student.jpg" alt="Distance Academy Distance Education" className="vertical-card-img" />
                <div className="vertical-media-badge badge-purple">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </div>
              </div>
              <div className="vertical-card-body">
                <h3 className="vertical-card-brand">Distance Academy</h3>
                <span className="vertical-card-tag tag-purple">DISTANCE EDUCATION</span>
                <p className="vertical-card-desc">
                  Get expert guidance for your higher education journey.
                </p>
                <button
                  className="vertical-card-link link-purple"
                  onClick={() => handleNav('distance')}
                >
                  <span>Explore Education</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. NUMBERS THAT TELL OUR STORY (OUR IMPACT)
          ========================================================================= */}
      <section className="about-stats-section">
        <div className="container about-stats-container">
          {/* Left Text */}
          <div className="about-stats-left">
            <span className="about-badge-tag-cyan">— OUR IMPACT</span>
            <h2 className="about-stats-title">Numbers That Tell Our Story</h2>
            <p className="about-stats-sub">
              We are proud of the progress we have made and the learners, businesses and communities we support.
            </p>
          </div>

          {/* Right Stats Grid */}
          <div className="about-stats-grid">
            {/* Stat 1 */}
            <div className="about-stat-item">
              <div className="stat-circle-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <div className="stat-number">1000+</div>
              <div className="stat-label">Students Trained</div>
            </div>

            {/* Stat 2 */}
            <div className="about-stat-item">
              <div className="stat-circle-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="stat-number">200+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>

            {/* Stat 3 */}
            <div className="about-stat-item">
              <div className="stat-circle-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
              </div>
              <div className="stat-number">50+</div>
              <div className="stat-label">Happy Clients</div>
            </div>

            {/* Stat 4 */}
            <div className="about-stat-item">
              <div className="stat-circle-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <div className="stat-number">3</div>
              <div className="stat-label">Brands Under One Roof</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. OUR TEAM SECTION
          ========================================================================= */}
      <section className="about-team-section" id="about-team">
        <div className="container">
          <div className="about-team-header-row">
            <div className="about-team-title-group">
              <span className="about-badge-tag-blue">— OUR TEAM</span>
              <h2 className="about-section-heading">Passionate People. Real Support.</h2>
              <p className="about-section-subheading">
                Our team is made up of experienced trainers, developers, mentors and education consultants who are dedicated to your success.
              </p>
            </div>
            <div className="about-team-header-action">
              <button className="btn-about-blue-pill" onClick={onOpenEnquiry}>
                <span>Meet Our Team</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* 4 Team Member Cards */}
          <div className="about-team-grid">
            {/* Member 1: Arun K */}
            <div className="about-team-card">
              <div className="team-card-avatar-wrap">
                <img src="/images/avatar-arun.jpg" alt="Arun K" className="team-avatar-img" />
              </div>
              <div className="team-card-info">
                <h4 className="team-member-name">Arun K</h4>
                <p className="team-member-role">Founder & CEO</p>
                <div className="team-social-links">
                  <a href="#about" className="team-social-btn" aria-label="LinkedIn" onClick={(e) => e.preventDefault()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#about" className="team-social-btn" aria-label="Twitter X" onClick={(e) => e.preventDefault()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="#about" className="team-social-btn" aria-label="Portfolio" onClick={(e) => e.preventDefault()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Member 2: Priya S */}
            <div className="about-team-card">
              <div className="team-card-avatar-wrap">
                <img src="/images/avatar-priya.jpg" alt="Priya S" className="team-avatar-img" />
              </div>
              <div className="team-card-info">
                <h4 className="team-member-name">Priya S</h4>
                <p className="team-member-role">Education Head</p>
                <div className="team-social-links">
                  <a href="#about" className="team-social-btn" aria-label="LinkedIn" onClick={(e) => e.preventDefault()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#about" className="team-social-btn" aria-label="Twitter X" onClick={(e) => e.preventDefault()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="#about" className="team-social-btn" aria-label="Portfolio" onClick={(e) => e.preventDefault()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Member 3: Karthik R */}
            <div className="about-team-card">
              <div className="team-card-avatar-wrap">
                <img src="/images/avatar-vikram.jpg" alt="Karthik R" className="team-avatar-img" />
              </div>
              <div className="team-card-info">
                <h4 className="team-member-name">Karthik R</h4>
                <p className="team-member-role">Tech Lead</p>
                <div className="team-social-links">
                  <a href="#about" className="team-social-btn" aria-label="LinkedIn" onClick={(e) => e.preventDefault()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#about" className="team-social-btn" aria-label="Twitter X" onClick={(e) => e.preventDefault()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="#about" className="team-social-btn" aria-label="Portfolio" onClick={(e) => e.preventDefault()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Member 4: Sneha V */}
            <div className="about-team-card">
              <div className="team-card-avatar-wrap">
                <img src="/images/avatar-kavya.jpg" alt="Sneha V" className="team-avatar-img" />
              </div>
              <div className="team-card-info">
                <h4 className="team-member-name">Sneha V</h4>
                <p className="team-member-role">Support Head</p>
                <div className="team-social-links">
                  <a href="#about" className="team-social-btn" aria-label="LinkedIn" onClick={(e) => e.preventDefault()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#about" className="team-social-btn" aria-label="Twitter X" onClick={(e) => e.preventDefault()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="#about" className="team-social-btn" aria-label="Portfolio" onClick={(e) => e.preventDefault()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. OUR MISSION & VISION SECTION
          ========================================================================= */}
      <section className="about-mission-section">
        <div className="container about-mission-container">
          {/* Left Column: Heading & Description */}
          <div className="about-mission-left">
            <span className="about-badge-tag-blue">— OUR MISSION & VISION</span>
            <h2 className="about-mission-title">
              Building Skills.<br />
              Creating Opportunities.
            </h2>
            <p className="about-mission-desc">
              Our mission is to bridge the gap between education, technology and opportunity by providing accessible, practical and future-ready solutions for individuals and businesses.
            </p>
            <button className="btn-about-blue-pill" onClick={onOpenEnquiry}>
              <span>Meet Our Team</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* Right Column: Mission and Vision Cards */}
          <div className="about-mission-right">
            {/* Card 1: Our Mission */}
            <div className="about-mv-card">
              <div className="mv-card-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                  <path d="M9 12H4s.55-3.03 2-4.5c1.45-1.47 4.5-2 4.5-2"></path>
                  <path d="M12 15v5s3.03-.55 4.5-2c1.47-1.45 2-4.5 2-4.5"></path>
                </svg>
              </div>
              <div className="mv-card-content">
                <h4 className="mv-card-title">Our Mission</h4>
                <p className="mv-card-text">
                  To empower individuals and businesses with the right skills, solutions and guidance for a successful digital future.
                </p>
              </div>
            </div>

            {/* Card 2: Our Vision */}
            <div className="about-mv-card">
              <div className="mv-card-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <div className="mv-card-content">
                <h4 className="mv-card-title">Our Vision</h4>
                <p className="mv-card-text">
                  To be a leading digital partner in education, technology and career growth, recognized for our impact and innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. CTA BANNER (READY TO START YOUR JOURNEY?)
          ========================================================================= */}
      <section className="about-cta-section">
        <div className="container about-cta-container">
          <div className="about-cta-left">
            <div className="about-cta-paperplane">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </div>
            <div className="about-cta-text">
              <h3 className="about-cta-title">Ready to Start Your Journey?</h3>
              <p className="about-cta-desc">Get in touch with us for courses, services or distance education.</p>
            </div>
          </div>

          <div className="about-cta-actions">
            <button className="btn-about-cta-white" onClick={onOpenEnquiry}>
              <span>Contact Us</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <a
              href="https://wa.me/918144008298?text=Hello%20WinTech%20Digital%20Partner,%20I%20would%20like%20to%20know%20more%20about%20your%20services%20and%20courses."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-about-cta-whatsapp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/>
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. FOOTER
          ========================================================================= */}
      <footer className="about-footer-section">
        <div className="container">
          <div className="about-footer-grid">
            {/* Col 1: Brand */}
            <div className="about-footer-col">
              <a href="#home" className="about-footer-brand" onClick={(e) => { e.preventDefault(); handleNav('home'); }}>
                <img src="/images/wintech-icon.png" alt="WinTech Digital Partner" className="about-footer-logo-img" />
                <div className="about-footer-logo-text">
                  <div className="footer-logo-title">
                    <span className="win">WiN</span>
                    <span className="tech">TECH</span>
                  </div>
                  <span className="footer-logo-sub">DIGITAL PARTNER</span>
                </div>
              </a>
            </div>

            {/* Col 2: Quick Links */}
            <div className="about-footer-col">
              <h4 className="about-footer-heading">Quick Links</h4>
              <ul className="about-footer-links">
                <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNav('home'); }}>Home</a></li>
                <li><a href="#courses" onClick={(e) => { e.preventDefault(); handleNav('courses'); }}>IT Courses</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>IT Services</a></li>
                <li><a href="#distance" onClick={(e) => { e.preventDefault(); handleNav('distance'); }}>Distance Education</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNav('about'); }}>About Us</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNav('home', 'contact'); }}>Contact</a></li>
              </ul>
            </div>

            {/* Col 3: Our Services */}
            <div className="about-footer-col">
              <h4 className="about-footer-heading">Our Services</h4>
              <ul className="about-footer-links">
                <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>Web Development</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>Ecommerce Development</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>App Development</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>AI & Automation</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>UI/UX Design</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>SEO & Digital Marketing</a></li>
              </ul>
            </div>

            {/* Col 4: Get in Touch */}
            <div className="about-footer-col">
              <h4 className="about-footer-heading">Get In Touch</h4>
              <div className="about-footer-contact-info">
                <div className="contact-row">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </div>
                <div className="contact-row">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <a href="mailto:info@wintech-digitalpartner.com">info@wintech-digitalpartner.com</a>
                </div>
                <div className="contact-row">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span>Chennai, Tamil Nadu</span>
                </div>
              </div>
              <div className="about-footer-socials">
                <a href="#about" aria-label="Facebook" onClick={(e) => e.preventDefault()}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                <a href="#about" aria-label="Twitter X" onClick={(e) => e.preventDefault()}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                <a href="#about" aria-label="Instagram" onClick={(e) => e.preventDefault()}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                <a href="#about" aria-label="LinkedIn" onClick={(e) => e.preventDefault()}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                <a href="#about" aria-label="YouTube" onClick={(e) => e.preventDefault()}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
              </div>
            </div>

            {/* Col 5: Stay Updated */}
            <div className="about-footer-col">
              <h4 className="about-footer-heading">Stay Updated</h4>
              <p className="about-footer-subtext">Get the latest updates and new courses.</p>
              <form className="about-newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="about-newsletter-input"
                  required
                />
                <button type="submit" className="about-newsletter-btn" aria-label="Subscribe">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            </div>
          </div>

          <div className="about-footer-bottom">
            <p>© 2026 WinTech Digital Partner. All rights reserved.</p>
            <div className="about-footer-legal">
              <a href="#about" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              <span className="dot">•</span>
              <a href="#about" onClick={(e) => e.preventDefault()}>Terms & Conditions</a>
              <span className="dot">•</span>
              <a href="#about" onClick={(e) => e.preventDefault()}>Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
