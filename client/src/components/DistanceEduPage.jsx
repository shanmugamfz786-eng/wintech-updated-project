import React, { useState } from 'react';

export default function DistanceEduPage({ onOpenEnquiry, onNavigate }) {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // 4 Popular Programs
  const popularPrograms = [
    {
      title: 'Undergraduate (UG) Programs',
      desc: 'Build a strong foundation for your future with flexible learning options.',
      actionText: 'Explore UG Programs',
      iconBg: '#e0f2fe',
      iconColor: '#0284c7',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      )
    },
    {
      title: 'Postgraduate (PG) Programs',
      desc: 'Advance your career with industry-relevant programs.',
      actionText: 'Explore PG Programs',
      iconBg: '#e0e7ff',
      iconColor: '#4f46e5',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      )
    },
    {
      title: 'Online Degrees',
      desc: 'Learn at your own pace with 100% online learning.',
      actionText: 'Explore Online Degrees',
      iconBg: '#ecfdf5',
      iconColor: '#059669',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    },
    {
      title: 'Admission Guidance',
      desc: 'Get expert help with course selection, eligibility and application process.',
      actionText: 'Get Guidance',
      iconBg: '#eff6ff',
      iconColor: '#2563eb',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    }
  ];

  // 6 Why Choose Cards
  const whyChooseList = [
    {
      title: 'Guidance from Experts',
      desc: 'Get personalized counselling and course recommendations.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <polyline points="16 11 18 13 22 9"></polyline>
        </svg>
      )
    },
    {
      title: 'Verified Information',
      desc: 'Accurate and up-to-date details on programs and institutions.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      )
    },
    {
      title: 'Wide Course Options',
      desc: 'UG, PG, online and more – across multiple fields.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      )
    },
    {
      title: 'Easy Application Support',
      desc: 'Step-by-step help with admissions and documentation.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
    {
      title: 'Trusted Institutions',
      desc: 'Access programs from recognized universities.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3l9 7H3z"></path>
        </svg>
      )
    },
    {
      title: 'Ongoing Support',
      desc: "We're with you even after admission.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      )
    }
  ];

  // 4 Featured Programs
  const featuredPrograms = [
    {
      title: 'B.Sc Computer Science',
      badge: 'UG Program',
      duration: '3 Years',
      mode: 'Distance',
      desc: 'Build a career in technology with comprehensive computer science program.',
      image: '/images/distance-student.jpg'
    },
    {
      title: 'M.Sc Data Science',
      badge: 'PG Program',
      duration: '2 Years',
      mode: 'Distance',
      desc: 'Gain expertise in data analysis, machine learning and data-driven decision making.',
      image: '/images/hero-students-realistic.jpg'
    },
    {
      title: 'MBA (General)',
      badge: 'Online Degree',
      duration: '2 Years',
      mode: 'Online',
      desc: 'Develop leadership and management skills for a global career.',
      image: '/images/avatar-kavya.jpg'
    },
    {
      title: 'Admission Support',
      badge: 'Guidance',
      duration: 'Multiple Programs',
      mode: '100% Free',
      desc: 'Get expert guidance for course selection, eligibility and application process.',
      image: '/images/courses-hero-student.jpg',
      isGuidance: true
    }
  ];

  // 4 Simple Steps
  const simpleSteps = [
    {
      step: '01',
      title: 'Explore Programs',
      desc: 'Browse courses and find your interest.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      )
    },
    {
      step: '02',
      title: 'Check Eligibility',
      desc: 'Confirm requirements and documents.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4"></polyline>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      )
    },
    {
      step: '03',
      title: 'Get Guidance',
      desc: 'Talk to our experts for personalized support.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      )
    },
    {
      step: '04',
      title: 'Apply & Enrol',
      desc: 'Complete the application and start your journey.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <polyline points="17 11 19 13 23 9"></polyline>
        </svg>
      )
    }
  ];

  // 2 Testimonials
  const testimonials = [
    {
      quote: 'The guidance process was very helpful and made my admission journey simple and stress-free.',
      author: 'Priya S',
      role: 'UG Student',
      avatar: '/images/avatar-priya.jpg'
    },
    {
      quote: 'Flexible learning helped me balance my work and studies. Great support throughout the process.',
      author: 'Rahul K',
      role: 'PG Student',
      avatar: '/images/avatar-arun.jpg'
    }
  ];

  // FAQs
  const faqs = [
    {
      q: 'What is the difference between UG and PG programs?',
      a: 'UG (Undergraduate) programs like B.Sc, BBA, B.Com are bachelor-level degrees pursued after 10+2. PG (Postgraduate) programs like MBA, M.Sc, M.Com are advanced master-level degrees completed after graduation.'
    },
    {
      q: 'Are distance education degrees valid?',
      a: 'Yes, all degrees offered through our partner universities are UGC-DEB approved, government-recognized, and widely accepted for private jobs, government exams, and higher studies abroad.'
    },
    {
      q: 'How do I apply for a course?',
      a: 'You can apply directly through our portal or reach out to our admission counselors. We assist you with document verification, course selection, and university enrollment without extra agent fees.'
    },
    {
      q: 'Can I study while working?',
      a: 'Yes! Distance and online education programs are specifically tailored with flexible weekend schedules, digital study materials, and self-paced learning modules so you can balance work and academics effortlessly.'
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
    <div className="dist-page-wrapper">
      {/* =========================================================================
          HERO SECTION (Deep Midnight Navy with Student Visual)
          ========================================================================= */}
      <section className="dist-hero-section">
        <div className="container dist-hero-container">
          {/* Left Column: Headlines & Actions */}
          <div className="dist-hero-content">
            {/* Tag Badge */}
            <div className="dist-hero-badge">
              <span className="dist-badge-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </span>
              <span>DISTANCE EDUCATION</span>
            </div>

            {/* Main Headline */}
            <h1 className="dist-hero-title">
              Your Education Journey <br />
              Without <span className="dist-gradient-text">Boundaries</span>
            </h1>

            {/* Subtitle */}
            <p className="dist-hero-desc">
              Explore flexible distance education programs, get expert admission guidance, and find the right course for your future. Learn from anywhere, at your own pace.
            </p>

            {/* Actions */}
            <div className="dist-hero-actions">
              <button onClick={onOpenEnquiry} className="btn-dist-primary">
                <span>Explore Programs</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <button onClick={onOpenEnquiry} className="btn-dist-outline">
                <span>Get Admission Guidance</span>
              </button>
            </div>

            {/* Highlights Strip */}
            <div className="dist-hero-highlights">
              <div className="dist-highlight-item">
                <div className="dist-highlight-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                  </svg>
                </div>
                <div className="dist-highlight-text">
                  <strong>UG &amp; PG Programs</strong>
                  <span>Wide Range of Courses</span>
                </div>
              </div>

              <div className="dist-highlight-item">
                <div className="dist-highlight-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <div className="dist-highlight-text">
                  <strong>Online &amp; Distance</strong>
                  <span>Flexible Learning</span>
                </div>
              </div>

              <div className="dist-highlight-item">
                <div className="dist-highlight-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  </svg>
                </div>
                <div className="dist-highlight-text">
                  <strong>Expert Guidance</strong>
                  <span>Complete Support</span>
                </div>
              </div>

              <div className="dist-highlight-item">
                <div className="dist-highlight-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <polyline points="9 12 11 14 15 10"></polyline>
                  </svg>
                </div>
                <div className="dist-highlight-text">
                  <strong>Verified Institutions</strong>
                  <span>Trusted Information</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual with Student & Handwritten Note */}
          <div className="dist-hero-visual-wrapper">
            <div className="dist-hero-image-card">
              <img
                src="/images/distance-student.jpg"
                alt="Student learning with distance education"
                className="dist-hero-img"
                width="640"
                height="440"
              />

              {/* Handwritten Note */}
              <div className="dist-handwritten-note">
                <span className="d-note-line">Learn</span>
                <span className="d-note-line d-note-indent1">
                  <span className="d-note-arrow">→</span> Grow
                </span>
                <span className="d-note-line d-note-indent2">
                  <span className="d-note-arrow">→</span> Achieve
                </span>
              </div>

              {/* Floating Glass Icons */}
              <div className="dist-floating-icon d-icon-cap" title="University Degree">
                <span>🎓</span>
              </div>
              <div className="dist-floating-icon d-icon-cert" title="UGC Recognized">
                <span>📜</span>
              </div>
              <div className="dist-floating-icon d-icon-book" title="Online Syllabus">
                <span>📚</span>
              </div>
              <div className="dist-floating-icon d-icon-laptop" title="Study Anywhere">
                <span>💻</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: POPULAR PROGRAMS (4 CARDS)
          ========================================================================= */}
      <section className="dist-programs-section">
        <div className="container">
          <div className="dist-section-header-row">
            <div>
              <div className="dist-section-label">— EXPLORE PROGRAMS</div>
              <h2 className="dist-section-title">Popular Programs</h2>
              <p className="dist-section-desc">
                Find the right course that matches your interests and career goals.
              </p>
            </div>

            <button onClick={onOpenEnquiry} className="btn-dist-outline-dark">
              <span>View All Programs</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* 4 Cards Grid */}
          <div className="dist-programs-grid">
            {popularPrograms.map((prog, idx) => (
              <div
                key={idx}
                className="dist-program-card"
                onClick={onOpenEnquiry}
                role="button"
                tabIndex={0}
              >
                <div
                  className="dist-program-icon-wrap"
                  style={{ backgroundColor: prog.iconBg, color: prog.iconColor }}
                >
                  {prog.icon}
                </div>
                <h3 className="dist-program-card-title">{prog.title}</h3>
                <p className="dist-program-card-desc">{prog.desc}</p>
                <span className="dist-program-card-link">
                  {prog.actionText} <span className="prog-arrow">→</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: WHY CHOOSE WINTECH FOR DISTANCE EDUCATION?
          ========================================================================= */}
      <section className="dist-why-section">
        <div className="container">
          <div className="dist-why-layout">
            {/* Left Content */}
            <div className="dist-why-left">
              <div className="dist-section-label">— WHY CHOOSE US</div>
              <h2 className="dist-section-title">
                Why Choose WinTech <br />
                for Distance Education?
              </h2>
              <p className="dist-section-desc">
                We help you make informed decisions with reliable information, expert guidance and complete support throughout your journey.
              </p>
              <button onClick={onOpenEnquiry} className="btn-dist-primary btn-dist-blue-pill">
                <span>Learn More About Us</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

            {/* Right 6 Cards Grid (2 rows of 3) */}
            <div className="dist-why-cards-grid">
              {whyChooseList.map((item, idx) => (
                <div key={idx} className="dist-why-card">
                  <div className="dist-why-icon-wrap">{item.icon}</div>
                  <div>
                    <h3 className="dist-why-card-title">{item.title}</h3>
                    <p className="dist-why-card-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: EXPLORE OUR FEATURED PROGRAMS (4 CARDS)
          ========================================================================= */}
      <section id="dist-featured" className="dist-featured-section">
        <div className="container">
          <div className="dist-section-header-row">
            <div>
              <div className="dist-section-label">— FEATURED PROGRAMS</div>
              <h2 className="dist-section-title">Explore Our Featured Programs</h2>
              <p className="dist-section-desc">
                Discover popular courses and learn more about eligibility, duration and admission process.
              </p>
            </div>

            <button onClick={onOpenEnquiry} className="btn-dist-outline-dark">
              <span>View All Programs</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* 4 Featured Program Cards */}
          <div className="dist-featured-grid">
            {featuredPrograms.map((fp, idx) => (
              <div key={idx} className="dist-featured-card">
                <div className="dist-featured-thumb-wrap">
                  <img
                    src={fp.image}
                    alt={fp.title}
                    className="dist-featured-thumb"
                    loading="lazy"
                  />
                  <span className="dist-featured-pill">{fp.badge}</span>
                </div>

                <div className="dist-featured-body">
                  <h3 className="dist-featured-card-title">{fp.title}</h3>
                  <div className="dist-featured-meta">
                    <span>⏱ {fp.duration}</span>
                    <span>•</span>
                    <span>💻 {fp.mode}</span>
                  </div>
                  <p className="dist-featured-card-desc">{fp.desc}</p>
                  <button onClick={onOpenEnquiry} className="dist-featured-action-btn">
                    <span>{fp.isGuidance ? 'Get Guidance' : 'View Details'}</span>
                    <span className="fp-arrow">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: SIMPLE STEPS TO YOUR FUTURE (DARK NAVY STRIP)
          ========================================================================= */}
      <section className="dist-steps-section">
        <div className="container">
          <div className="dist-steps-header">
            <div className="dist-section-label-cyan">— HOW IT WORKS</div>
            <h2 className="dist-steps-title">Simple Steps to Your Future</h2>
            <p className="dist-steps-desc">
              From exploring courses to starting your classes, we make the process easy and straightforward.
            </p>
          </div>

          <div className="dist-steps-pipeline">
            {simpleSteps.map((st, idx) => (
              <React.Fragment key={idx}>
                <div className="dist-step-card">
                  <div className="dist-step-icon-circle">{st.icon}</div>
                  <div className="dist-step-number">{st.step}</div>
                  <h4 className="dist-step-card-title">{st.title}</h4>
                  <p className="dist-step-card-desc">{st.desc}</p>
                </div>

                {idx < simpleSteps.length - 1 && (
                  <div className="dist-step-arrow-divider" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
          SECTION 5: TWO COLUMNS (STUDENT TESTIMONIALS + COMMON QUESTIONS FAQ)
          ========================================================================= */}
      <section className="dist-split-section">
        <div className="container">
          <div className="dist-split-layout">
            {/* Left: What Our Students Say */}
            <div className="dist-split-left">
              <div className="dist-section-label">— STUDENT TESTIMONIALS</div>
              <h2 className="dist-section-title">What Our Students Say</h2>
              <p className="dist-section-desc">
                Hear from learners who are building their future with distance education.
              </p>

              {/* 2 Testimonial Cards */}
              <div className="dist-testi-cards-grid">
                {testimonials.map((t, idx) => (
                  <div key={idx} className="dist-testi-card">
                    <p className="dist-testi-quote">"{t.quote}"</p>
                    <div className="dist-testi-author">
                      <img
                        src={t.avatar}
                        alt={t.author}
                        className="dist-testi-avatar"
                        width="44"
                        height="44"
                      />
                      <div>
                        <h5 className="dist-testi-name">{t.author}</h5>
                        <span className="dist-testi-role">{t.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Controls */}
              <div className="dist-testi-controls">
                <button
                  className="d-carousel-btn"
                  onClick={() => setActiveTestimonialIdx((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))}
                  aria-label="Previous Testimonial"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>

                <div className="d-carousel-dots">
                  {testimonials.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      className={`d-dot ${activeTestimonialIdx === dotIdx ? 'active' : ''}`}
                      onClick={() => setActiveTestimonialIdx(dotIdx)}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                <button
                  className="d-carousel-btn"
                  onClick={() => setActiveTestimonialIdx((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))}
                  aria-label="Next Testimonial"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            {/* Right: Common Questions (FAQ Accordion) */}
            <div className="dist-split-right">
              <div className="dist-section-label">— FREQUENTLY ASKED QUESTIONS</div>
              <h2 className="dist-section-title">Common Questions</h2>

              <div className="dist-faq-list">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div key={idx} className={`dist-faq-item ${isOpen ? 'open' : ''}`}>
                      <button
                        className="dist-faq-question-btn"
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <span className="dist-faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                      </button>
                      {isOpen && (
                        <div className="dist-faq-answer">
                          <p>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenEnquiry();
                }}
                className="dist-faq-view-all"
              >
                <span>View All FAQs</span>
                <span className="faq-arr">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: CTA BANNER (NEED HELP CHOOSING THE RIGHT PROGRAM?)
          ========================================================================= */}
      <section className="dist-cta-section">
        <div className="container">
          <div className="dist-cta-box">
            <div className="dist-cta-left">
              {/* Graduation Cap Icon */}
              <div className="dist-cta-cap-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <div>
                <h3 className="dist-cta-title">Need Help Choosing the Right Program?</h3>
                <p className="dist-cta-subtitle">
                  Get expert guidance from our counsellors and find the best course for your future.
                </p>
              </div>
            </div>

            <div className="dist-cta-right">
              <button onClick={onOpenEnquiry} className="btn-dist-primary btn-dist-cta-btn">
                <span>Get Free Guidance</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <a
                href="https://wa.me/918144008298?text=Hello%20WinTech,%20I%20am%20interested%20in%20Distance%20Education%20programs!"
                target="_blank"
                rel="noreferrer"
                className="btn-dist-whatsapp"
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
      <footer className="dist-footer-dark">
        <div className="container">
          <div className="dist-footer-grid">
            {/* Col 1: Brand Info */}
            <div className="dist-footer-brand-col">
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
              <p className="dist-footer-brand-desc">
                Your premier educational partner providing verified distance degrees, online education programs, and career guidance across recognized universities.
              </p>
            </div>

            {/* Col 2: Quick Links */}
            <div className="dist-footer-col">
              <h4 className="dist-footer-heading">Quick Links</h4>
              <ul className="dist-footer-links">
                <li><a href="#home" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }}>Home</a></li>
                <li><a href="#courses" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('courses'); }}>IT Courses</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('services'); }}>IT Services</a></li>
                <li><a href="#dist-featured">Distance Education</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }}>About Us</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); onOpenEnquiry(); }}>Contact</a></li>
              </ul>
            </div>

            {/* Col 3: Our Services / Programs */}
            <div className="dist-footer-col">
              <h4 className="dist-footer-heading">Our Services</h4>
              <ul className="dist-footer-links">
                <li><a href="#dist-featured" onClick={onOpenEnquiry}>Website Development</a></li>
                <li><a href="#dist-featured" onClick={onOpenEnquiry}>Ecommerce Development</a></li>
                <li><a href="#dist-featured" onClick={onOpenEnquiry}>Web App Development</a></li>
                <li><a href="#dist-featured" onClick={onOpenEnquiry}>AI Automation</a></li>
                <li><a href="#dist-featured" onClick={onOpenEnquiry}>UI/UX Design</a></li>
                <li><a href="#dist-featured" onClick={onOpenEnquiry}>SEO & Digital Marketing</a></li>
              </ul>
            </div>

            {/* Col 4: Get In Touch */}
            <div className="dist-footer-col">
              <h4 className="dist-footer-heading">Get in Touch</h4>
              <div className="dist-footer-contact-items">
                <div className="d-contact-line">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </div>
                <div className="d-contact-line">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <a href="mailto:info@wintech-digitalpartner.com">info@wintech-digitalpartner.com</a>
                </div>
                <div className="d-contact-line">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span>Chennai, Tamil Nadu</span>
                </div>
              </div>

              {/* Social icons */}
              <div className="dist-footer-socials">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l16 16M4 20L20 4"></path></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="mailto:info@wintech-digitalpartner.com" aria-label="Email">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>
            </div>

            {/* Col 5: Stay Updated */}
            <div className="dist-footer-col">
              <h4 className="dist-footer-heading">Stay Updated</h4>
              <p className="dist-footer-update-text">Get the latest updates and new courses.</p>

              <form onSubmit={handleNewsletterSubmit} className="dist-newsletter-form">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="dist-newsletter-input"
                />
                <button type="submit" className="dist-newsletter-btn" aria-label="Subscribe to course updates">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>
              {newsletterSubscribed && (
                <span className="dist-subscribe-success">✓ Subscribed successfully!</span>
              )}
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="dist-footer-bottom">
            <div>© 2026 WinTech Digital Partner. All rights reserved.</div>
            <div className="dist-footer-legal">
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
