import React, { useState } from 'react';

export default function ITCoursesPage({ onOpenEnquiry, onNavigate }) {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // 5 Course Categories
  const categories = [
    {
      title: 'Web Development',
      desc: 'HTML, CSS, JavaScript, React, Node.js & more',
      iconBg: '#e0f2fe',
      iconColor: '#0284c7',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      )
    },
    {
      title: 'Programming Languages',
      desc: 'Python, Java, C, C++ and more',
      iconBg: '#ecfdf5',
      iconColor: '#059669',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      )
    },
    {
      title: 'UI/UX Design',
      desc: 'Design thinking, Figma, Adobe XD & more',
      iconBg: '#fdf2f8',
      iconColor: '#db2777',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
          <path d="M2 2l7.586 7.586"></path>
          <circle cx="11" cy="11" r="2"></circle>
        </svg>
      )
    },
    {
      title: 'Data Analytics',
      desc: 'Excel, SQL, Power BI, Data Visualization',
      iconBg: '#eff6ff',
      iconColor: '#2563eb',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      )
    },
    {
      title: 'AI & Machine Learning',
      desc: 'Python, ML, Deep Learning, AI Tools',
      iconBg: '#f5f3ff',
      iconColor: '#7c3aed',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2"></rect>
          <rect x="9" y="9" width="6" height="6"></rect>
          <line x1="9" y1="1" x2="9" y2="4"></line>
          <line x1="15" y1="1" x2="15" y2="4"></line>
          <line x1="9" y1="20" x2="9" y2="23"></line>
          <line x1="15" y1="20" x2="15" y2="23"></line>
          <line x1="20" y1="9" x2="23" y2="9"></line>
          <line x1="20" y1="14" x2="23" y2="14"></line>
          <line x1="1" y1="9" x2="4" y2="9"></line>
          <line x1="1" y1="14" x2="4" y2="14"></line>
        </svg>
      )
    }
  ];

  // 5 Top IT Courses
  const topCourses = [
    {
      title: 'Full Stack Development',
      subtitle: 'MERN Stack',
      duration: '6 Months',
      mode: 'Online + Offline',
      desc: 'Learn to build complete web applications from frontend to backend.',
      image: '/images/course-fullstack.jpg',
      badge: 'Most Popular'
    },
    {
      title: 'Python Programming',
      subtitle: 'Beginner to Advanced',
      duration: '4 Months',
      mode: 'Online + Offline',
      desc: 'Master Python with real-time projects and problem-solving.',
      image: '/images/course-python.jpg'
    },
    {
      title: 'Java Development',
      subtitle: 'Java & Spring Boot',
      duration: '5 Months',
      mode: 'Online + Offline',
      desc: 'Build scalable applications using Java and Spring Boot framework.',
      image: '/images/course-java.jpg'
    },
    {
      title: 'UI/UX Design',
      subtitle: 'Figma & Adobe XD',
      duration: '3 Months',
      mode: 'Online + Offline',
      desc: 'Create user-friendly designs and build modern digital experiences.',
      image: '/images/course-uiux.jpg'
    },
    {
      title: 'Data Analytics',
      subtitle: 'Excel, SQL, Power BI',
      duration: '4 Months',
      mode: 'Online + Offline',
      desc: 'Turn data into valuable insights with powerful tools.',
      image: '/images/course-data.jpg'
    }
  ];

  // 4 Why Learn With WinTech
  const whyWinTech = [
    {
      title: 'Industry Focused Curriculum',
      desc: 'Learn what the industry really needs.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>
      )
    },
    {
      title: 'Hands-on Learning',
      desc: 'Work on real projects and build your portfolio.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
      )
    },
    {
      title: 'Placement Support',
      desc: 'Get career guidance and interview preparation.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      )
    },
    {
      title: 'Flexible Learning',
      desc: 'Choose online or classroom learning.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    }
  ];

  // 5 Process Steps
  const learningJourney = [
    {
      step: '01',
      title: 'Explore Courses',
      desc: 'Find the right course for your goals.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      )
    },
    {
      step: '02',
      title: 'Enroll',
      desc: 'Complete your registration easily.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>
      )
    },
    {
      step: '03',
      title: 'Learn',
      desc: 'Access expert-led sessions and hands-on projects.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      )
    },
    {
      step: '04',
      title: 'Build Portfolio',
      desc: 'Showcase your skills with real projects.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    },
    {
      step: '05',
      title: 'Get Placed',
      desc: 'Receive career guidance and job support.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      )
    }
  ];

  // 3 Student Testimonials
  const testimonials = [
    {
      quote: 'The trainers are supportive and the hands-on projects really helped me understand the concepts. I got placed within 3 months!',
      author: 'Arun K',
      course: 'Full Stack Development',
      avatar: '/images/avatar-arun.jpg'
    },
    {
      quote: 'Great learning environment, real-world projects and excellent support from the placement team. Highly recommended!',
      author: 'Priya S',
      course: 'Python Programming',
      avatar: '/images/avatar-priya.jpg'
    },
    {
      quote: 'The course content is well-structured and easy to follow. I gained confidence in my skills and started working on live projects.',
      author: 'Vikram T',
      course: 'UI/UX Design',
      avatar: '/images/avatar-vikram.jpg'
    }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="courses-page-wrapper">
      {/* =========================================================================
          HERO SECTION (Navy Background with Tech Glow & Student Visual)
          ========================================================================= */}
      <section className="courses-hero-section">
        <div className="container courses-hero-container">
          {/* Left Column: Headlines & Actions */}
          <div className="courses-hero-content">
            {/* Tag Badge */}
            <div className="courses-hero-badge">
              <span className="courses-badge-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </span>
              <span>WINTECH &nbsp;|&nbsp; IT COURSES</span>
            </div>

            {/* Main Headline */}
            <h1 className="courses-hero-title">
              Build In-Demand Skills <br />
              for a <span className="courses-gradient-text">Better Tomorrow</span>
            </h1>

            {/* Subtitle */}
            <p className="courses-hero-desc">
              Get industry-relevant IT training with hands-on projects, expert mentors and real career support. Learn at your pace and take the next step in your tech career.
            </p>

            {/* Buttons Row */}
            <div className="courses-hero-actions">
              <button onClick={onOpenEnquiry} className="btn-courses-primary">
                <span>Explore All Courses</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <button onClick={onOpenEnquiry} className="btn-courses-outline">
                <span>Download Brochure</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
            </div>

            {/* Highlights Strip */}
            <div className="courses-hero-highlights">
              <div className="courses-highlight-item">
                <div className="courses-highlight-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="courses-highlight-text">
                  <strong>Expert Trainers</strong>
                  <span>Industry Experienced</span>
                </div>
              </div>

              <div className="courses-highlight-item">
                <div className="courses-highlight-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <div className="courses-highlight-text">
                  <strong>Hands-on Projects</strong>
                  <span>Real World Practice</span>
                </div>
              </div>

              <div className="courses-highlight-item">
                <div className="courses-highlight-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                  </svg>
                </div>
                <div className="courses-highlight-text">
                  <strong>Placement Support</strong>
                  <span>Career Guidance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual with Student & Floating Tech Icons */}
          <div className="courses-hero-visual-wrapper">
            <div className="courses-hero-image-card">
              <img
                src="/images/courses-hero-student.jpg"
                alt="WinTech Student Learning with Laptop and Headphones"
                className="courses-hero-img"
                width="640"
                height="440"
              />

              {/* Handwritten Note */}
              <div className="courses-handwritten-note">
                <span className="c-note-line">Learn</span>
                <span className="c-note-line c-note-indent1">
                  <span className="c-note-arrow">→</span> Code
                </span>
                <span className="c-note-line c-note-indent2">
                  <span className="c-note-arrow">→</span> Build
                </span>
                <span className="c-note-line c-note-indent3">
                  <span className="c-note-arrow">→</span> Grow
                </span>
              </div>

              {/* Floating Tech Badges */}
              <div className="floating-tech-badge badge-py" title="Python">
                <span>🐍</span>
              </div>
              <div className="floating-tech-badge badge-java" title="Java">
                <span>☕</span>
              </div>
              <div className="floating-tech-badge badge-code" title="Code">
                <span>&lt;/&gt;</span>
              </div>
              <div className="floating-tech-badge badge-figma" title="Figma UI/UX">
                <span>🎨</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: POPULAR COURSE CATEGORIES
          ========================================================================= */}
      <section className="courses-cat-section">
        <div className="container">
          <div className="courses-section-header-row">
            <div>
              <div className="courses-section-label">
                <span className="courses-label-icon">🎓</span> EXPLORE OUR COURSES
              </div>
              <h2 className="courses-section-title">Popular Course Categories</h2>
              <p className="courses-section-desc">
                Choose from a wide range of IT courses designed to build your skills and boost your career.
              </p>
            </div>

            <button onClick={onOpenEnquiry} className="btn-courses-outline-dark">
              <span>View All Courses</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* 5 Category Cards */}
          <div className="courses-cat-grid">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="courses-cat-card"
                onClick={onOpenEnquiry}
                role="button"
                tabIndex={0}
              >
                <div
                  className="courses-cat-icon-wrap"
                  style={{ backgroundColor: cat.iconBg, color: cat.iconColor }}
                >
                  {cat.icon}
                </div>
                <h3 className="courses-cat-title">{cat.title}</h3>
                <p className="courses-cat-desc">{cat.desc}</p>
                <span className="courses-cat-link">
                  View Courses <span className="cat-arrow">→</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: OUR TOP IT COURSES
          ========================================================================= */}
      <section id="top-courses" className="courses-top-section">
        <div className="container">
          <div className="courses-section-header-row">
            <div>
              <div className="courses-section-label">— FEATURED COURSES</div>
              <h2 className="courses-section-title">Our Top IT Courses</h2>
              <p className="courses-section-desc">
                Explore our most popular courses with detailed syllabus, duration and career outcomes.
              </p>
            </div>

            <button onClick={onOpenEnquiry} className="btn-courses-outline-dark">
              <span>View All Courses</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* 5 Course Cards Grid */}
          <div className="courses-cards-grid-5">
            {topCourses.map((c, idx) => (
              <div key={idx} className="course-card-top">
                <div className="course-card-thumb-wrap">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="course-card-thumb"
                    loading="lazy"
                  />
                  {c.badge && (
                    <span className="course-card-popular-badge">{c.badge}</span>
                  )}
                </div>

                <div className="course-card-body">
                  <h3 className="course-card-title">{c.title}</h3>
                  <span className="course-card-subtitle">{c.subtitle}</span>

                  <div className="course-card-meta-row">
                    <span className="course-meta-pill">⏱ {c.duration}</span>
                    <span className="course-meta-pill">💻 {c.mode}</span>
                  </div>

                  <p className="course-card-desc">{c.desc}</p>

                  <button onClick={onOpenEnquiry} className="btn-courses-card-action">
                    <span>View Details</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: WHY LEARN WITH WINTECH? (DARK NAVY FULL-WIDTH SECTION)
          ========================================================================= */}
      <section className="courses-why-section">
        <div className="container">
          <div className="courses-why-layout">
            {/* Left Content */}
            <div className="courses-why-left">
              <div className="courses-section-label-cyan">— WHY CHOOSE WINTECH</div>
              <h2 className="courses-why-title">Why Learn with WinTech?</h2>
              <p className="courses-why-desc">
                We are committed to providing quality training, practical exposure and complete career support to help you achieve your goals.
              </p>
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('home');
                  setTimeout(() => {
                    const el = document.getElementById('about');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                className="btn-courses-primary"
              >
                <span>About WinTech</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

            {/* Right 4 Horizontal Feature Badges */}
            <div className="courses-why-features-grid">
              {whyWinTech.map((item, idx) => (
                <div key={idx} className="courses-why-feature-box">
                  <div className="courses-why-icon-circle">{item.icon}</div>
                  <h3 className="courses-why-feature-title">{item.title}</h3>
                  <p className="courses-why-feature-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: YOUR LEARNING JOURNEY (5-STEP PROCESS)
          ========================================================================= */}
      <section className="courses-journey-section">
        <div className="container">
          <div className="courses-section-header-row">
            <div>
              <div className="courses-section-label">— OUR PROCESS</div>
              <h2 className="courses-section-title">Your Learning Journey</h2>
              <p className="courses-section-desc">
                A simple and effective process to help you learn, grow and get placed.
              </p>
            </div>

            <button onClick={onOpenEnquiry} className="btn-courses-outline-dark">
              <span>View All Courses</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* 5-Step Pipeline */}
          <div className="courses-journey-pipeline">
            {learningJourney.map((st, idx) => (
              <React.Fragment key={idx}>
                <div className="courses-journey-card">
                  <div className="courses-journey-card-top">
                    <div className="courses-journey-icon-circle">{st.icon}</div>
                    <span className="courses-journey-number">{st.step}</span>
                  </div>
                  <h4 className="courses-journey-card-title">{st.title}</h4>
                  <p className="courses-journey-card-desc">{st.desc}</p>
                </div>

                {idx < learningJourney.length - 1 && (
                  <div className="courses-journey-arrow" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: WHAT OUR STUDENTS SAY (STUDENT TESTIMONIALS)
          ========================================================================= */}
      <section className="courses-testimonials-section">
        <div className="container">
          <div className="courses-section-header-row">
            <div>
              <div className="courses-section-label">— STUDENT TESTIMONIALS</div>
              <h2 className="courses-section-title">What Our Students Say</h2>
              <p className="courses-section-desc">
                Hear from our students who have transformed their careers with WinTech.
              </p>
            </div>

            <button onClick={onOpenEnquiry} className="btn-courses-outline-dark">
              <span>View More Testimonials</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* Testimonials Cards Grid */}
          <div className="courses-testimonials-grid">
            {testimonials.map((t, idx) => (
              <div key={idx} className="courses-testimonial-card">
                <p className="courses-testimonial-quote">"{t.quote}"</p>
                <div className="courses-testimonial-author">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="courses-author-avatar"
                    width="44"
                    height="44"
                  />
                  <div>
                    <h5 className="courses-author-name">{t.author}</h5>
                    <span className="courses-author-course">{t.course}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="courses-testimonials-controls">
            <button
              className="c-carousel-btn"
              onClick={() => setActiveTestimonialIdx((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))}
              aria-label="Previous Testimonial"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <div className="c-carousel-dots">
              {testimonials.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  className={`c-dot ${activeTestimonialIdx === dotIdx ? 'active' : ''}`}
                  onClick={() => setActiveTestimonialIdx(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            <button
              className="c-carousel-btn"
              onClick={() => setActiveTestimonialIdx((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))}
              aria-label="Next Testimonial"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: CTA BANNER (READY TO START YOUR JOURNEY?)
          ========================================================================= */}
      <section className="courses-cta-section">
        <div className="container">
          <div className="courses-cta-box">
            <div className="courses-cta-left">
              {/* Graduation Cap Icon */}
              <div className="courses-cta-cap-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <div>
                <h3 className="courses-cta-title">Ready to Start Your Journey?</h3>
                <p className="courses-cta-subtitle">
                  Get in touch with us for course details, fees, and career guidance.
                </p>
              </div>
            </div>

            <div className="courses-cta-right">
              <button onClick={onOpenEnquiry} className="btn-courses-primary btn-courses-cta-btn">
                <span>Get Free Consultation</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <a
                href="https://wa.me/918144008298?text=Hello%20WinTech,%20I%20am%20interested%20in%20IT%20Courses!"
                target="_blank"
                rel="noreferrer"
                className="btn-courses-whatsapp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: WINTECH DIGITAL PARTNER FOOTER
          ========================================================================= */}
      <footer className="courses-footer-dark">
        <div className="container">
          <div className="courses-footer-grid">
            {/* Col 1: Brand Info */}
            <div className="courses-footer-brand-col">
              <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }} className="brand-logo" aria-label="WinTech Digital Partner">
                <img src="/images/wintech-icon.png" alt="WinTech Digital Partner" className="brand-icon-img" width="44" height="44" />
                <div className="brand-text">
                  <div className="brand-title">
                    <span className="win">WiN</span>
                    <span className="tech">TECH</span>
                  </div>
                  <span className="brand-subtitle">DIGITAL PARTNER</span>
                </div>
              </a>
              <p className="courses-footer-brand-desc">
                Your premier destination for industry-aligned IT courses, practical software development, and recognized academic degrees.
              </p>
            </div>

            {/* Col 2: Quick Links */}
            <div className="courses-footer-col">
              <h4 className="courses-footer-heading">Quick Links</h4>
              <ul className="courses-footer-links">
                <li><a href="#home" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }}>Home</a></li>
                <li><a href="#top-courses">IT Courses</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('services'); }}>IT Services</a></li>
                <li><a href="#distance" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }}>Distance Education</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }}>About Us</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); onOpenEnquiry(); }}>Contact</a></li>
              </ul>
            </div>

            {/* Col 3: Popular Courses */}
            <div className="courses-footer-col">
              <h4 className="courses-footer-heading">Popular Courses</h4>
              <ul className="courses-footer-links">
                <li><a href="#top-courses" onClick={onOpenEnquiry}>Full Stack Development</a></li>
                <li><a href="#top-courses" onClick={onOpenEnquiry}>Python Programming</a></li>
                <li><a href="#top-courses" onClick={onOpenEnquiry}>Java Development</a></li>
                <li><a href="#top-courses" onClick={onOpenEnquiry}>UI/UX Design</a></li>
                <li><a href="#top-courses" onClick={onOpenEnquiry}>Data Analytics</a></li>
                <li><a href="#top-courses" onClick={onOpenEnquiry}>AI & Machine Learning</a></li>
              </ul>
            </div>

            {/* Col 4: Contact Us */}
            <div className="courses-footer-col">
              <h4 className="courses-footer-heading">Contact Us</h4>
              <div className="courses-footer-contact-items">
                <div className="c-contact-line">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <a href="tel:+918144008298">+91 81440 08298</a>
                </div>
                <div className="c-contact-line">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <a href="mailto:info@wintechdigitalpartner.com">info@wintechdigitalpartner.com</a>
                </div>
                <div className="c-contact-line">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span>Chennai, Tamil Nadu</span>
                </div>
              </div>

              {/* Social icons */}
              <div className="courses-footer-socials">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l16 16M4 20L20 4"></path></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="mailto:info@wintechdigitalpartner.com" aria-label="Email">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>
            </div>

            {/* Col 5: Stay Updated */}
            <div className="courses-footer-col">
              <h4 className="courses-footer-heading">Stay Updated</h4>
              <p className="courses-footer-update-text">Get the latest updates and new courses.</p>

              <form onSubmit={handleNewsletterSubmit} className="courses-newsletter-form">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="courses-newsletter-input"
                />
                <button type="submit" className="courses-newsletter-btn" aria-label="Subscribe to course updates">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>
              {newsletterSubscribed && (
                <span className="courses-subscribe-success">✓ Subscribed successfully!</span>
              )}
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="courses-footer-bottom">
            <div>© 2026 WinTech Digital Partner. All rights reserved.</div>
            <div className="courses-footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <span>|</span>
              <a href="#terms">Terms & Conditions</a>
              <span>|</span>
              <a href="#sitemap">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
