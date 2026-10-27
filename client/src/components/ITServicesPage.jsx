import React, { useState } from 'react';

export default function ITServicesPage({ onOpenEnquiry, onNavigate }) {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // 6 Services
  const servicesList = [
    {
      title: 'Website Development',
      desc: 'Modern, responsive and SEO-friendly websites.',
      category: 'Web',
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
      title: 'Ecommerce Development',
      desc: 'Scalable online stores for your business.',
      category: 'Ecommerce',
      iconBg: '#e0e7ff',
      iconColor: '#4f46e5',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      )
    },
    {
      title: 'Web Application Development',
      desc: 'Custom web apps for better productivity.',
      category: 'SaaS',
      iconBg: '#ede9fe',
      iconColor: '#7c3aed',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    },
    {
      title: 'AI Automation',
      desc: 'Smart automation to save time and cost.',
      category: 'AI',
      iconBg: '#ecfdf5',
      iconColor: '#059669',
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
    },
    {
      title: 'UI/UX Design',
      desc: 'User-focused designs that make an impact.',
      category: 'Design',
      iconBg: '#f0fdf4',
      iconColor: '#10b981',
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
      title: 'SEO & Digital Marketing',
      desc: 'Grow your online presence and reach more customers.',
      category: 'Marketing',
      iconBg: '#eff6ff',
      iconColor: '#2563eb',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      )
    }
  ];

  // 4 Why Choose Us
  const whyChooseItems = [
    {
      title: 'Custom Approach',
      desc: 'Every business is unique. We build solutions that fit your goals.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      )
    },
    {
      title: 'Latest Technologies',
      desc: 'Stay ahead with modern tools and frameworks.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      )
    },
    {
      title: 'Transparent Process',
      desc: 'Clear communication at every step.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <polyline points="9 12 11 14 15 10"></polyline>
        </svg>
      )
    },
    {
      title: 'Ongoing Support',
      desc: "We're with you even after delivery.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      )
    }
  ];

  // 4 Featured Projects
  const featuredProjects = [
    {
      title: 'Business Website',
      subtitle: 'Corporate Website Development',
      tag: 'Web Development',
      image: '/images/proj-business-web.jpg'
    },
    {
      title: 'Ecommerce Platform',
      subtitle: 'Online Store Development',
      tag: 'Ecommerce',
      image: '/images/proj-ecommerce.jpg'
    },
    {
      title: 'Task Management App',
      subtitle: 'Web Application Development',
      tag: 'Web App',
      image: '/images/proj-task-app.jpg'
    },
    {
      title: 'AI Chatbot',
      subtitle: 'AI Automation Solution',
      tag: 'AI/ML',
      image: '/images/proj-ai-chat.jpg'
    }
  ];

  // 5 Process Steps
  const processSteps = [
    {
      step: '01',
      title: 'Discover',
      desc: 'Understand your goals and requirements.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      )
    },
    {
      step: '02',
      title: 'Plan',
      desc: 'Design the right solution and roadmap.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
    {
      step: '03',
      title: 'Develop',
      desc: 'Build, test and refine your product.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      )
    },
    {
      step: '04',
      title: 'Launch',
      desc: 'Deploy and ensure smooth operation.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      )
    },
    {
      step: '05',
      title: 'Support',
      desc: 'Ongoing support for long-term success.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <polyline points="9 12 11 14 15 10"></polyline>
        </svg>
      )
    }
  ];

  // 3 Testimonials
  const testimonials = [
    {
      quote: 'The team delivered our website on time and exceeded our expectations. Highly recommended!',
      author: 'Arun K',
      role: 'Business Owner',
      avatar: '/images/avatar-arun.jpg'
    },
    {
      quote: 'Excellent support and professional service. Our application is running smoothly.',
      author: 'Priya S',
      role: 'Startup Founder',
      avatar: '/images/avatar-priya.jpg'
    },
    {
      quote: 'Great experience working with Gen Z Neural-X. They understood our needs and delivered quality work.',
      author: 'Vikram T',
      role: 'Product Manager',
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
    <div className="it-page-wrapper">
      {/* =========================================================================
          HERO SECTION (Dark Slate Background with Glowing Accent)
          ========================================================================= */}
      <section className="it-hero-section">
        <div className="container it-hero-container">
          {/* Left Column: Headline & Action */}
          <div className="it-hero-content">
            {/* Tag Badge */}
            <div className="it-hero-badge">
              <span className="it-badge-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </span>
              <span>GEN Z NEURAL-X &nbsp;|&nbsp; IT SERVICES</span>
            </div>

            {/* Main Headline */}
            <h1 className="it-hero-title">
              Innovative IT Solutions <br />
              for a <span className="it-gradient-text">Smarter Tomorrow</span>
            </h1>

            {/* Subtitle */}
            <p className="it-hero-desc">
              We build modern websites, powerful applications, AI-driven solutions and digital experiences that help businesses grow and stay ahead.
            </p>

            {/* Actions */}
            <div className="it-hero-actions">
              <button onClick={onOpenEnquiry} className="btn-it-primary">
                <span>Request a Quote</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <a href="#featured-projects" className="btn-it-outline">
                <span>View Our Work</span>
              </a>
            </div>

            {/* Feature Highlights Strip */}
            <div className="it-hero-highlights">
              <div className="it-highlight-item">
                <div className="it-highlight-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </div>
                <div className="it-highlight-text">
                  <strong>Custom Solutions</strong>
                  <span>Tailored to Your Needs</span>
                </div>
              </div>

              <div className="it-highlight-item">
                <div className="it-highlight-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="it-highlight-text">
                  <strong>Skilled Team</strong>
                  <span>Experienced Developers</span>
                </div>
              </div>

              <div className="it-highlight-item">
                <div className="it-highlight-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="it-highlight-text">
                  <strong>On-Time Delivery</strong>
                  <span>Agile & Transparent</span>
                </div>
              </div>

              <div className="it-highlight-item">
                <div className="it-highlight-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </div>
                <div className="it-highlight-text">
                  <strong>Ongoing Support</strong>
                  <span>Long-Term Partnership</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual with Team & Annotation */}
          <div className="it-hero-visual-wrapper">
            <div className="it-hero-image-card">
              <img
                src="/images/it-hero-team.jpg"
                alt="Gen Z Neural-X Developers Collaborating on Code"
                className="it-hero-img"
                width="640"
                height="440"
              />
              {/* Handwritten Floating Annotation */}
              <div className="it-hero-handwritten-note">
                <span className="it-note-line">Ideas</span>
                <span className="it-note-line it-note-indent1">
                  <span className="it-note-arrow">→</span> Code
                </span>
                <span className="it-note-line it-note-indent2">
                  <span className="it-note-arrow">→</span> Impact
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: WHAT WE OFFER -> OUR IT SERVICES
          ========================================================================= */}
      <section id="services-offer" className="it-services-section-light">
        <div className="container">
          <div className="it-offer-layout">
            {/* Left Header Box */}
            <div className="it-offer-header-col">
              <div className="it-section-label">— WHAT WE OFFER</div>
              <h2 className="it-section-title">Our IT Services</h2>
              <p className="it-section-desc">
                From web development to AI automation, we provide end-to-end IT services to turn your ideas into powerful digital solutions.
              </p>
              <button onClick={onOpenEnquiry} className="btn-it-primary btn-it-green-pill">
                <span>Explore All Services</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

            {/* Right Grid of 6 Services */}
            <div className="it-services-cards-grid">
              {servicesList.map((srv, idx) => (
                <div
                  key={idx}
                  className="it-service-card"
                  onClick={onOpenEnquiry}
                  role="button"
                  tabIndex={0}
                >
                  <div
                    className="it-service-icon-box"
                    style={{ backgroundColor: srv.iconBg, color: srv.iconColor }}
                  >
                    {srv.icon}
                  </div>
                  <div className="it-service-info">
                    <h3 className="it-service-title">{srv.title}</h3>
                    <p className="it-service-desc">{srv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: WHY CHOOSE US
          ========================================================================= */}
      <section className="it-why-section">
        <div className="container">
          <div className="it-why-layout">
            {/* Left Content */}
            <div className="it-why-content">
              <div className="it-section-label">— WHY CHOOSE US</div>
              <h2 className="it-section-title">
                Why Businesses <br />
                Choose Gen Z Neural-X
              </h2>
              <p className="it-section-desc">
                We combine technology, creativity and strategy to deliver solutions that work — for today and tomorrow.
              </p>
              <button onClick={onOpenEnquiry} className="btn-it-blue-pill">
                <span>Learn More</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

            {/* Right 4 Horizontal/Grid Cards */}
            <div className="it-why-cards-grid">
              {whyChooseItems.map((item, idx) => (
                <div key={idx} className="it-why-card">
                  <div className="it-why-icon-wrap">{item.icon}</div>
                  <h3 className="it-why-card-title">{item.title}</h3>
                  <p className="it-why-card-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: FEATURED PROJECTS (OUR WORK)
          ========================================================================= */}
      <section id="featured-projects" className="it-projects-section">
        <div className="container">
          <div className="it-projects-header">
            <div>
              <div className="it-section-label">— OUR WORK</div>
              <h2 className="it-section-title">Featured Projects</h2>
              <p className="it-section-desc">
                Explore some of our recent IT solutions and digital products.
              </p>
            </div>

            <button onClick={onOpenEnquiry} className="btn-it-outline-dark">
              <span>View All Projects</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* 4 Projects Grid */}
          <div className="it-projects-grid">
            {featuredProjects.map((proj, idx) => (
              <div
                key={idx}
                className="it-project-card"
                onClick={onOpenEnquiry}
                role="button"
                tabIndex={0}
              >
                <div className="it-project-img-box">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="it-project-img"
                    loading="lazy"
                  />
                </div>
                <div className="it-project-details">
                  <h3 className="it-project-title">{proj.title}</h3>
                  <p className="it-project-subtitle">{proj.subtitle}</p>

                  <div className="it-project-footer">
                    <span className="it-project-tag">{proj.tag}</span>
                    <button className="it-project-arrow-btn" aria-label={`View ${proj.title}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: HOW WE WORK (OUR PROCESS)
          ========================================================================= */}
      <section className="it-process-section">
        <div className="container">
          <div className="it-process-header">
            <div className="it-section-label">— OUR PROCESS</div>
            <h2 className="it-section-title">How We Work</h2>
            <p className="it-section-desc">
              A simple and effective process to turn your ideas into reality.
            </p>
          </div>

          {/* 5-Step Pipeline */}
          <div className="it-process-pipeline">
            {processSteps.map((st, idx) => (
              <React.Fragment key={idx}>
                <div className="it-process-step-card">
                  <div className="it-process-card-top">
                    <div className="it-process-icon-circle">{st.icon}</div>
                    <span className="it-process-number">{st.step}</span>
                  </div>
                  <h4 className="it-process-step-title">{st.title}</h4>
                  <p className="it-process-step-desc">{st.desc}</p>
                </div>

                {idx < processSteps.length - 1 && (
                  <div className="it-process-arrow-divider" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
          SECTION 5: WHAT OUR CLIENTS SAY (DARK BLUE SECTION)
          ========================================================================= */}
      <section className="it-testimonials-dark-section">
        <div className="container">
          <div className="it-testimonials-header">
            <div>
              <div className="it-section-label-cyan">— CLIENTS & PARTNERS</div>
              <h2 className="it-section-title-white">What Our Clients Say</h2>
              <p className="it-section-desc-light">
                We're proud to help businesses and individuals achieve their goals.
              </p>
            </div>

            <button onClick={onOpenEnquiry} className="btn-it-outline-light">
              <span>View More Testimonials</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* Testimonial Cards */}
          <div className="it-testimonials-grid">
            {testimonials.map((t, idx) => (
              <div key={idx} className="it-testimonial-card">
                {/* Cyan Quote Mark */}
                <div className="it-quote-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path>
                  </svg>
                </div>
                <p className="it-testimonial-quote">"{t.quote}"</p>
                <div className="it-testimonial-author">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="it-author-avatar"
                    width="44"
                    height="44"
                  />
                  <div>
                    <h5 className="it-author-name">{t.author}</h5>
                    <span className="it-author-role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial Carousel Controls */}
          <div className="it-testimonials-controls">
            <button
              className="it-carousel-btn"
              onClick={() => setActiveTestimonialIdx((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))}
              aria-label="Previous Testimonial"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <div className="it-carousel-dots">
              {testimonials.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  className={`it-dot ${activeTestimonialIdx === dotIdx ? 'active' : ''}`}
                  onClick={() => setActiveTestimonialIdx(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            <button
              className="it-carousel-btn"
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
          SECTION 6: CTA BANNER (LET'S BUILD SOMETHING GREAT TOGETHER)
          ========================================================================= */}
      <section className="it-cta-banner-section">
        <div className="container">
          <div className="it-cta-banner-box">
            <div className="it-cta-left">
              {/* Origami Paper Plane Icon */}
              <div className="it-plane-icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13"></path>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </div>
              <div>
                <h3 className="it-cta-title">Let's Build Something Great Together</h3>
                <p className="it-cta-subtitle">
                  Get in touch with us for a free consultation. We're here to help you turn your ideas into digital solutions.
                </p>
              </div>
            </div>

            <div className="it-cta-right">
              <button onClick={onOpenEnquiry} className="btn-it-green-action">
                <span>Get Free Consultation</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <div className="it-cta-chips">
                <span className="it-cta-chip">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line></svg>
                  Website Development
                </span>
                <span className="it-cta-chip">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                  App Development
                </span>
                <span className="it-cta-chip">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><circle cx="9" cy="9" r="1"></circle><circle cx="15" cy="9" r="1"></circle><path d="M8 15h8"></path></svg>
                  AI Solutions
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: DEDICATED GEN Z NEURAL-X FOOTER
          ========================================================================= */}
      <footer className="it-footer-dark">
        <div className="container">
          <div className="it-footer-grid">
            {/* Col 1: Brand */}
            <div className="it-footer-brand-col">
              <div className="it-footer-logo">
                <div className="it-footer-logo-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <div>
                  <div className="it-footer-logo-title">Gen Z Neural-X</div>
                  <div className="it-footer-logo-subtitle">IT SERVICES & SOLUTIONS</div>
                </div>
              </div>
              <p className="it-footer-brand-bio">
                Empowering businesses with modern websites, custom software, and intelligent AI automation solutions.
              </p>
            </div>

            {/* Col 2: Quick Links */}
            <div className="it-footer-col">
              <h4 className="it-footer-heading">Quick Links</h4>
              <ul className="it-footer-links">
                <li><a href="#home" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }}>Home</a></li>
                <li><a href="#services-offer">IT Services</a></li>
                <li><a href="#featured-projects">Portfolio</a></li>
                <li><a href="#home" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }}>About Us</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); onOpenEnquiry(); }}>Contact</a></li>
              </ul>
            </div>

            {/* Col 3: Our Services */}
            <div className="it-footer-col">
              <h4 className="it-footer-heading">Our Services</h4>
              <ul className="it-footer-links">
                <li><a href="#services-offer" onClick={onOpenEnquiry}>Website Development</a></li>
                <li><a href="#services-offer" onClick={onOpenEnquiry}>Ecommerce Development</a></li>
                <li><a href="#services-offer" onClick={onOpenEnquiry}>Web App Development</a></li>
                <li><a href="#services-offer" onClick={onOpenEnquiry}>AI Automation</a></li>
                <li><a href="#services-offer" onClick={onOpenEnquiry}>UI/UX Design</a></li>
                <li><a href="#services-offer" onClick={onOpenEnquiry}>SEO & Digital Marketing</a></li>
              </ul>
            </div>

            {/* Col 4: Get In Touch */}
            <div className="it-footer-col">
              <h4 className="it-footer-heading">Get in Touch</h4>
              <div className="it-footer-contact-items">
                <div className="it-contact-line">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </div>
                <div className="it-contact-line">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <a href="mailto:info@genzneuralx.com">info@genzneuralx.com</a>
                </div>
                <div className="it-contact-line">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span>Chennai, Tamil Nadu</span>
                </div>
              </div>

              {/* Social icons */}
              <div className="it-footer-socials">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l16 16M4 20L20 4"></path></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="mailto:info@genzneuralx.com" aria-label="Email">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>
            </div>

            {/* Col 5: Stay Updated */}
            <div className="it-footer-col">
              <h4 className="it-footer-heading">Stay Updated</h4>
              <p className="it-footer-update-text">Get the latest updates and tech insights.</p>
              
              <form onSubmit={handleNewsletterSubmit} className="it-newsletter-form">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="it-newsletter-input"
                />
                <button type="submit" className="it-newsletter-btn" aria-label="Subscribe to newsletter">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>
              {newsletterSubscribed && (
                <span className="it-subscribe-success">✓ Subscribed successfully!</span>
              )}
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="it-footer-bottom">
            <div>© 2026 Gen Z Neural-X. All rights reserved.</div>
            <div className="it-footer-legal">
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
