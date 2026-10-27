import React, { useState } from 'react';

// Environment-based API endpoint resolver:
// Reuses VITE_API_URL or VITE_BACKEND_URL in production cross-origin setups.
// Defaults to relative '/api/enquiries' (supported by Vite proxy in dev and unified domain in production).
const getApiBaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || '';
  }
  return '';
};
const ENQUIRY_API_ENDPOINT = `${getApiBaseUrl()}/api/enquiries`;

// Verified business configuration (reused across the project)
const BUSINESS_CONFIG = {
  name: 'WiNTech Digital Partner',
  phoneDisplay: '+91 81440 08298 / +91 81248 98219',
  phoneCall: '+918144008298',
  phoneAltCall: '+918124898219',
  whatsappDigits: '918144008298', // Digits-only international format for wa.me
  email: 'info@wintechdigitalpartner.com',
  emailAlt: 'info@wintech-digitalpartner.com',
  officeCity: 'Chennai, Tamil Nadu',
  // Verified business locations present in codebase:
  officeAddressLine: 'Chennai, Tamil Nadu, India',
  regOfficeLine: 'Srivilliputtur, Tamil Nadu, India',
  // Exact street/door number placeholder clearly identified for business owner supply:
  exactStreetNote: 'Exact street/door number is configurable here in BUSINESS_CONFIG.officeAddressLine when provided by the business owner.',
  workingHours: 'Mon – Sat: 9:00 AM – 6:00 PM IST',
  mapEmbedUrl: 'https://maps.google.com/maps?q=Chennai%2C%20Tamil%20Nadu&t=&z=13&ie=UTF8&iwloc=&output=embed',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=WinTech+Digital+Partner+Chennai+Tamil+Nadu',
};

// WhatsApp category messages mapping
const WA_CATEGORY_MESSAGES = {
  'IT Courses': 'Hello WinTech Digital Partner, I am interested in inquiring about your IT Courses and training programs.',
  'IT Services': 'Hello WinTech Digital Partner, I would like to discuss an IT Services & software development project.',
  'Distance Education': 'Hello WinTech Digital Partner, I am looking for admission guidance for recognized Distance Education degrees.',
  'General Enquiry': 'Hello WinTech Digital Partner, I have a general enquiry about your services and programs.',
};

export default function ContactPage({ onOpenEnquiry, onNavigate }) {
  // Contact Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    interestedIn: 'IT Courses',
    message: '',
    website: '', // Honeypot field for spam bots
  });

  // Validation Errors State
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  // WhatsApp quick category selection state
  const [selectedWaCategory, setSelectedWaCategory] = useState('IT Courses');

  // FAQ Accordion State (open question index, -1 for all closed)
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Safe Navigation Handler
  const handleNav = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate dynamic WhatsApp URL with prefilled user details if available
  const getWhatsAppUrl = (category = selectedWaCategory) => {
    let msg = WA_CATEGORY_MESSAGES[category] || WA_CATEGORY_MESSAGES['General Enquiry'];

    // If user has already entered their name in the form, personalize the message
    if (formData.fullName.trim()) {
      msg = `Hello WinTech Digital Partner, my name is ${formData.fullName.trim()}. I am inquiring about ${category}.`;
    }

    if (formData.message.trim()) {
      msg += ` Note: ${formData.message.trim().slice(0, 150)}`;
    }

    return `https://wa.me/${BUSINESS_CONFIG.whatsappDigits}?text=${encodeURIComponent(msg)}`;
  };

  // Form Field Validation
  const validateField = (name, value) => {
    let error = '';

    if (name === 'fullName') {
      if (!value.trim()) {
        error = 'Full name is required.';
      } else if (value.trim().length < 2) {
        error = 'Name must be at least 2 characters.';
      } else if (!/^[a-zA-Z\s.'-]+$/.test(value.trim())) {
        error = 'Please enter a valid name using letters only.';
      }
    }

    if (name === 'phone') {
      const digits = value.replace(/\D/g, '');
      if (!value.trim()) {
        error = 'Phone number is required.';
      } else if (digits.length < 10) {
        error = 'Phone number must be at least 10 digits.';
      } else if (!/^(?:\+?91|0)?[6-9]\d{9}$/.test(value.replace(/[\s-]/g, ''))) {
        error = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).';
      }
    }

    if (name === 'email') {
      if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        error = 'Please enter a valid email address (e.g. name@example.com).';
      }
    }

    if (name === 'interestedIn') {
      if (!value) {
        error = 'Please select your area of interest.';
      }
    }

    if (name === 'message') {
      if (!value.trim()) {
        error = 'Message is required.';
      } else if (value.trim().length < 10) {
        error = 'Please provide a little more detail (at least 10 characters).';
      }
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time error clearance
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setFormErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate all fields
    const errors = {
      fullName: validateField('fullName', formData.fullName),
      phone: validateField('phone', formData.phone),
      email: validateField('email', formData.email),
      interestedIn: validateField('interestedIn', formData.interestedIn),
      message: validateField('message', formData.message),
    };

    // Filter out empty errors
    const activeErrors = Object.fromEntries(Object.entries(errors).filter(([_, err]) => err));

    if (Object.keys(activeErrors).length > 0) {
      setFormErrors(activeErrors);
      return;
    }

    // Anti-spam check
    if (formData.website) {
      // Silently finish if honeypot filled
      setSubmitSuccess(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Connect to existing backend endpoint via environment-based endpoint
      const response = await fetch(ENQUIRY_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          interest: formData.interestedIn,
          message: formData.message.trim(),
          website: formData.website, // server-side honeypot validation
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Success: record submitted info and reset form
        setSubmittedData({
          name: formData.fullName.trim(),
          interest: formData.interestedIn,
        });
        setSubmitSuccess(true);
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          interestedIn: 'IT Courses',
          message: '',
          website: '',
        });
        setFormErrors({});
      } else {
        // Real server error message
        const errMsg = data.error || 'Server rejected the submission. Please check your details and try again.';
        setSubmitError(errMsg);
      }
    } catch {
      setSubmitError(
        'Unable to connect to the enquiry service right now. Please check your internet connection or reach out to us directly on WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // FAQ Data (8 accurate questions with verified project details and in-app route links)
  const faqs = [
    {
      id: 'faq-courses',
      q: 'What IT courses do you offer?',
      renderAnswer: () => (
        <>
          <p>
            We offer comprehensive, career-focused courses in <strong>Full Stack Web Development (MERN, Java, Python)</strong>, <strong>Data Analytics</strong>, <strong>UI/UX Design</strong>, and <strong>Artificial Intelligence</strong> with hands-on live project training and industry mentor guidance.
          </p>
          <div className="faq-link-row">
            <a
              href="#courses"
              className="faq-route-link"
              onClick={(e) => {
                e.preventDefault();
                handleNav('courses');
              }}
            >
              Explore our IT Courses curriculum & details ➔
            </a>
          </div>
        </>
      ),
    },
    {
      id: 'faq-placement',
      q: 'Do you provide placement assistance?',
      renderAnswer: () => (
        <>
          <p>
            Yes, we provide dedicated career guidance and placement preparation to assist students with their job search. Our support includes resume building, GitHub portfolio development, mock technical interviews, and interview preparation to connect learners with available IT opportunities. Placement outcomes depend on individual student commitment, skillset mastery, and performance in employer interviews.
          </p>
          <div className="faq-link-row">
            <a
              href="#courses"
              className="faq-route-link"
              onClick={(e) => {
                e.preventDefault();
                handleNav('courses');
              }}
            >
              Explore our IT Courses & Training ➔
            </a>
          </div>
        </>
      ),
    },
    {
      id: 'faq-modes',
      q: 'Are your courses available online and offline?',
      renderAnswer: () => (
        <p>
          Yes! We offer flexible learning models including interactive online sessions and classroom-based learning where batches are currently scheduled. Please connect with our team on WhatsApp or phone to confirm the latest batch timings and available modes for your chosen course.
        </p>
      ),
    },
    {
      id: 'faq-services',
      q: 'What IT services do you provide?',
      renderAnswer: () => (
        <>
          <p>
            Through <strong>Gen Z Neural-X</strong>, our specialized technology division, we deliver custom web application development, mobile apps (iOS & Android), ecommerce platforms, cloud architecture, AI automation, and digital marketing solutions for businesses.
          </p>
          <div className="faq-link-row">
            <a
              href="#services"
              className="faq-route-link"
              onClick={(e) => {
                e.preventDefault();
                handleNav('services');
              }}
            >
              View Gen Z Neural-X IT Services ➔
            </a>
          </div>
        </>
      ),
    },
    {
      id: 'faq-distance',
      q: 'How can I get admission guidance for distance education?',
      renderAnswer: () => (
        <>
          <p>
            Our counselors assist you in exploring available distance degree programs (including UG and PG options), understanding eligibility criteria, and completing the admission documentation. Institutional accreditations and recognitions are shared transparently based on official university notifications during your consultation.
          </p>
          <div className="faq-link-row">
            <a
              href="#distance"
              className="faq-route-link"
              onClick={(e) => {
                e.preventDefault();
                handleNav('distance');
              }}
            >
              Explore Distance Education programs ➔
            </a>
          </div>
        </>
      ),
    },
    {
      id: 'faq-contact',
      q: 'How can I contact your team?',
      renderAnswer: () => (
        <p>
          You can reach us through multiple channels: call us directly at <strong>+91 81440 08298</strong> / <strong>+91 81248 98219</strong>, chat with us on <strong>WhatsApp</strong>, send an email to <strong>info@wintechdigitalpartner.com</strong>, or fill out the contact form on this page.
        </p>
      ),
    },
    {
      id: 'faq-response',
      q: 'How long does it take to receive a response?',
      renderAnswer: () => (
        <p>
          Our team reviews inquiries during regular working hours (Monday through Saturday, 9:00 AM – 6:00 PM IST). We aim to respond as quickly as possible, typically within 1 to 2 business days. For faster assistance, our WhatsApp chat connects you directly with a team member.
        </p>
      ),
    },
    {
      id: 'faq-location',
      q: 'Where is your office located?',
      renderAnswer: () => (
        <>
          <p>
            Our office operations are based in <strong>Chennai, Tamil Nadu</strong>, with our registered branch in <strong>Srivilliputtur, Tamil Nadu</strong>. Please reach out to us by phone or WhatsApp to schedule an appointment prior to your visit for academic counseling or project discussions.
          </p>
          <div className="faq-link-row">
            <a
              href="#office-map"
              className="faq-route-link"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('office-map');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See our office location on the map below ↓
            </a>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="contact-page-wrapper">
      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <section className="contact-hero-section">
        <div className="contact-hero-bg-glow"></div>
        <div className="container contact-hero-container">
          {/* Left Text Content */}
          <div className="contact-hero-content">
            <h1 className="contact-hero-title">
              Get in Touch<br />
              <span className="contact-hero-subtitle-highlight">We're Here to Help</span>
            </h1>

            <p className="contact-hero-description">
              Have questions about our courses, IT services, or distance education programs? Our team is ready to assist you. Reach out to us through any of the channels below.
            </p>

            {/* 3 Trust Badges */}
            <div className="contact-trust-badges-row">
              <div className="contact-trust-item">
                <div className="contact-trust-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <polyline points="10 9 12 11 16 7"></polyline>
                  </svg>
                </div>
                <div className="contact-trust-text">
                  <strong>Quick Response</strong>
                  <span>Within 24 Hours</span>
                </div>
              </div>

              <div className="contact-trust-item">
                <div className="contact-trust-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="contact-trust-text">
                  <strong>Expert Guidance</strong>
                  <span>From Our Team</span>
                </div>
              </div>

              <div className="contact-trust-item">
                <div className="contact-trust-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <polyline points="9 12 11 14 15 10"></polyline>
                  </svg>
                </div>
                <div className="contact-trust-text">
                  <strong>Your Privacy</strong>
                  <span>Always Protected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="contact-hero-visual">
            <div className="contact-hero-img-wrap">
              <img
                src="/images/contact-support-hero.jpg"
                alt="WinTech Digital Partner Support Team"
                className="contact-hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CONTACT INFORMATION & FORM (2-COLUMN)
          ========================================================================= */}
      <section className="contact-main-section">
        <div className="container contact-main-container">
          {/* Left Column: Multiple Ways to Reach Us */}
          <div className="contact-channels-col">
            <span className="contact-tag-blue">— CONTACT INFORMATION</span>
            <h2 className="contact-section-title">Multiple Ways to Reach Us</h2>
            <p className="contact-section-desc">
              Choose the channel that works best for you. We're available through phone, email, WhatsApp and our office location.
            </p>

            {/* 2x2 Contact Cards Grid */}
            <div className="contact-cards-grid">
              {/* Card 1: Phone */}
              <div className="contact-channel-card">
                <div className="channel-icon-circle blue-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <h4 className="channel-title">Phone</h4>
                <div className="channel-phone-links">
                  <a href={`tel:${BUSINESS_CONFIG.phoneCall}`} className="channel-detail">
                    +91 81440 08298
                  </a>
                  <span className="phone-separator">/</span>
                  <a href={`tel:${BUSINESS_CONFIG.phoneAltCall}`} className="channel-detail">
                    +91 81248 98219
                  </a>
                </div>
                <span className="channel-sub">{BUSINESS_CONFIG.workingHours}</span>
              </div>

              {/* Card 2: Email */}
              <div className="contact-channel-card">
                <div className="channel-icon-circle navy-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <h4 className="channel-title">Email</h4>
                <a href={`mailto:${BUSINESS_CONFIG.email}`} className="channel-detail channel-email">
                  {BUSINESS_CONFIG.email}
                </a>
                <span className="channel-sub">We reply within 24 hours</span>
              </div>

              {/* Card 3: WhatsApp Quick Enquiry (Feature 1) */}
              <div className="contact-channel-card card-whatsapp-enhanced">
                <div className="channel-icon-circle green-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/>
                  </svg>
                </div>
                <div className="wa-card-header">
                  <h4 className="channel-title">WhatsApp Quick Enquiry</h4>
                  <span className="channel-sub">Instant response on mobile</span>
                </div>

                {/* Category Selector for WhatsApp */}
                <div className="wa-category-selector" aria-label="Select enquiry category for WhatsApp">
                  {['IT Courses', 'IT Services', 'Distance Education', 'General Enquiry'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`wa-pill-btn ${selectedWaCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedWaCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <a
                  href={getWhatsAppUrl(selectedWaCategory)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-chat"
                  title="Open official WhatsApp chat in a new tab"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/>
                  </svg>
                  <span>Chat on WhatsApp</span>
                  <span className="wa-arrow">➔</span>
                </a>
              </div>

              {/* Card 4: Our Office */}
              <div className="contact-channel-card">
                <div className="channel-icon-circle blue-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h4 className="channel-title">Our Office</h4>
                <div className="channel-detail">{BUSINESS_CONFIG.name}</div>
                <span className="channel-address">{BUSINESS_CONFIG.officeAddressLine}</span>
                <span className="channel-sub">Branch: {BUSINESS_CONFIG.regOfficeLine}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Send Us a Message Form (Feature 3) */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              {submitSuccess ? (
                /* Success State with Check Icon and Next Steps */
                <div className="form-success-card" role="alert">
                  <div className="success-badge-circle">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <h3 className="success-card-title">Message Sent Successfully!</h3>
                  <p className="success-card-desc">
                    Thank you, <strong>{submittedData?.name}</strong>! Your enquiry regarding{' '}
                    <strong>{submittedData?.interest}</strong> has been safely recorded in our system.
                  </p>

                  <div className="success-next-steps-box">
                    <h4 className="next-steps-title">What Happens Next?</h4>
                    <ol className="next-steps-list">
                      <li>Our technical and academic counselors will review your requirements.</li>
                      <li>We will reach out to you within 24 business hours via phone or email.</li>
                      <li>Need an immediate answer? Click below to chat directly with us on WhatsApp.</li>
                    </ol>
                  </div>

                  <div className="success-actions">
                    <a
                      href={getWhatsAppUrl(submittedData?.interest || 'General Enquiry')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp-chat"
                    >
                      <span>Continue on WhatsApp</span>
                      <span>➔</span>
                    </a>
                    <button
                      type="button"
                      className="btn-submit-another"
                      onClick={() => setSubmitSuccess(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                /* Native Form with Validation */
                <>
                  <h3 className="form-card-title">Send Us a Message</h3>
                  <p className="form-card-desc">
                    Fill in your details and our team will get back to you as soon as possible.
                  </p>

                  {submitError && (
                    <div className="form-error-banner" role="alert">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <span>{submitError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="contact-native-form" noValidate>
                    {/* Hidden anti-spam honeypot */}
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      style={{ display: 'none' }}
                      tabIndex="-1"
                      autoComplete="off"
                    />

                    {/* Row 1: Full Name & Phone Number */}
                    <div className="form-grid-row">
                      <div className="form-group">
                        <label htmlFor="fullName">
                          Full Name <span className="req-star">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          placeholder="e.g. Priya Sharma"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={formErrors.fullName ? 'is-invalid' : ''}
                          aria-invalid={!!formErrors.fullName}
                          aria-describedby={formErrors.fullName ? 'fullName-error' : undefined}
                          disabled={isSubmitting}
                          required
                        />
                        {formErrors.fullName && (
                          <span className="form-inline-error" id="fullName-error" role="alert">
                            {formErrors.fullName}
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone">
                          Phone Number <span className="req-star">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="e.g. 9876543210"
                          value={formData.phone}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={formErrors.phone ? 'is-invalid' : ''}
                          aria-invalid={!!formErrors.phone}
                          aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                          disabled={isSubmitting}
                          required
                        />
                        {formErrors.phone && (
                          <span className="form-inline-error" id="phone-error" role="alert">
                            {formErrors.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Email Address & Interested In */}
                    <div className="form-grid-row">
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="e.g. name@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={formErrors.email ? 'is-invalid' : ''}
                          aria-invalid={!!formErrors.email}
                          aria-describedby={formErrors.email ? 'email-error' : undefined}
                          disabled={isSubmitting}
                        />
                        {formErrors.email && (
                          <span className="form-inline-error" id="email-error" role="alert">
                            {formErrors.email}
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="interestedIn">
                          Interested In <span className="req-star">*</span>
                        </label>
                        <select
                          id="interestedIn"
                          name="interestedIn"
                          value={formData.interestedIn}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={formErrors.interestedIn ? 'is-invalid' : ''}
                          aria-invalid={!!formErrors.interestedIn}
                          disabled={isSubmitting}
                          required
                        >
                          <option value="IT Courses">IT Courses & Training</option>
                          <option value="IT Services">IT Services & Solutions</option>
                          <option value="Distance Education">Distance Education Degrees</option>
                          <option value="General Enquiry">General Consultation / Other</option>
                        </select>
                        {formErrors.interestedIn && (
                          <span className="form-inline-error" role="alert">
                            {formErrors.interestedIn}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Row 3: Message */}
                    <div className="form-group">
                      <label htmlFor="message">
                        Message <span className="req-star">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        placeholder="Tell us about your learning goals or project requirements..."
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={formErrors.message ? 'is-invalid' : ''}
                        aria-invalid={!!formErrors.message}
                        aria-describedby={formErrors.message ? 'message-error' : undefined}
                        disabled={isSubmitting}
                        required
                      ></textarea>
                      {formErrors.message && (
                        <span className="form-inline-error" id="message-error" role="alert">
                          {formErrors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn-contact-submit-pill"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="btn-spinner" aria-hidden="true"></span>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                          </svg>
                          <span>Send Message</span>
                          <span className="submit-arrow">→</span>
                        </>
                      )}
                    </button>

                    <div className="form-privacy-note">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <span>Your information is safe with us. We respect your privacy.</span>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. GOOGLE MAPS + DIRECTIONS & FAQS (2-COLUMN) (Features 2 & 4)
          ========================================================================= */}
      <section className="contact-map-faq-section" id="office-map">
        <div className="container contact-map-faq-container">
          {/* Left Column: Google Maps + Directions (Feature 2) */}
          <div className="contact-map-col">
            <span className="contact-tag-blue">— OUR LOCATION</span>
            <h2 className="contact-section-title">Find Us on the Map</h2>
            <p className="contact-section-desc">
              We are located in {BUSINESS_CONFIG.officeCity}. Feel free to visit our campus or get in touch before your visit.
            </p>

            <div className="contact-map-card">
              {/* Office Address Info Banner */}
              <div className="map-office-banner">
                <div className="office-pin-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="office-address-details">
                  <strong className="office-name">{BUSINESS_CONFIG.name}</strong>
                  <span className="office-line">{BUSINESS_CONFIG.officeAddressLine} (Branch: {BUSINESS_CONFIG.regOfficeLine})</span>
                  <span className="office-hours">{BUSINESS_CONFIG.workingHours}</span>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="contact-map-iframe-wrap">
                <iframe
                  title="WinTech Digital Partner Office Location Map in Chennai, Tamil Nadu"
                  src={BUSINESS_CONFIG.mapEmbedUrl}
                  width="100%"
                  height="340"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Get Directions Action Bar */}
              <div className="contact-map-actions-bar">
                <a
                  href={BUSINESS_CONFIG.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-get-directions"
                  title="Open driving or walking directions in Google Maps"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                  </svg>
                  <span>Get Directions in Google Maps</span>
                  <span className="dir-arrow">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: FAQ Section (Feature 4 - 8 Accordion Questions) */}
          <div className="contact-faq-col">
            <span className="contact-tag-blue">— FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="contact-section-title">Quick Answers</h2>
            <p className="contact-section-desc">
              Find answers to common questions. If you need more help, feel free to contact us directly.
            </p>

            <div className="contact-faq-accordion" role="region" aria-label="Frequently Asked Questions">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.id}
                    className={`contact-faq-item ${isOpen ? 'open' : ''}`}
                  >
                    <button
                      type="button"
                      id={`faq-btn-${idx}`}
                      className="contact-faq-question"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                    >
                      <span className="faq-question-text">{faq.q}</span>
                      <span className="faq-toggle-icon" aria-hidden="true">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div
                        id={`faq-answer-${idx}`}
                        className="contact-faq-answer"
                        role="region"
                        aria-labelledby={`faq-btn-${idx}`}
                      >
                        {faq.renderAnswer()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="contact-faq-footer">
              <button
                type="button"
                className="contact-view-faqs-btn"
                onClick={() => setOpenFaqIndex(openFaqIndex === -1 ? 0 : -1)}
              >
                <span>{openFaqIndex === -1 ? 'Expand FAQs' : 'Collapse FAQs'}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CONVERSATION BANNER: YOUR FUTURE STARTS WITH A CONVERSATION
          ========================================================================= */}
      <section className="contact-conversation-banner-section">
        <div className="container contact-conv-banner-container">
          {/* Left Text with Airplane */}
          <div className="conv-banner-left">
            <div className="conv-paperplane-wrap">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </div>
            <div className="conv-banner-text">
              <span className="conv-eyebrow">READY TO START?</span>
              <h3 className="conv-banner-title">Your Future Starts with a Conversation</h3>
              <p className="conv-banner-sub">
                Whether it's a course, a project or career guidance — we're here to help you make the right choice. Reach out to us today!
              </p>
            </div>
          </div>

          {/* Right 3 Pathway Cards */}
          <div className="conv-banner-pathways">
            {/* Card 1: IT Courses */}
            <div className="conv-pathway-card" onClick={() => handleNav('courses')}>
              <div className="pathway-icon blue-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <h4 className="pathway-title">Explore IT Courses</h4>
              <div className="pathway-link">
                <span>Build your skills</span>
                <span className="pathway-arrow">→</span>
              </div>
            </div>

            {/* Card 2: IT Services */}
            <div className="conv-pathway-card" onClick={() => handleNav('services')}>
              <div className="pathway-icon teal-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <h4 className="pathway-title">Get IT Services</h4>
              <div className="pathway-link">
                <span>Grow your business</span>
                <span className="pathway-arrow">→</span>
              </div>
            </div>

            {/* Card 3: Distance Education */}
            <div className="conv-pathway-card" onClick={() => handleNav('distance')}>
              <div className="pathway-icon purple-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
              <h4 className="pathway-title">Distance Education</h4>
              <div className="pathway-link">
                <span>Plan your future</span>
                <span className="pathway-arrow">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Quick Action Button (Desktop & Mobile) */}
      <a
        href={getWhatsAppUrl(formData.interestedIn || 'General Enquiry')}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        aria-label="Chat on WhatsApp"
        title="Chat directly with WinTech on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/>
        </svg>
      </a>

      {/* =========================================================================
          5. FOOTER
          ========================================================================= */}
      <footer className="contact-footer-section">
        <div className="container">
          <div className="contact-footer-grid">
            {/* Col 1: Brand */}
            <div className="contact-footer-col">
              <a href="#home" className="contact-footer-brand" onClick={(e) => { e.preventDefault(); handleNav('home'); }}>
                <img src="/images/wintech-icon.png" alt="WinTech Digital Partner" className="contact-footer-logo-img" />
                <div className="contact-footer-logo-text">
                  <div className="footer-logo-title">
                    <span className="win">WiN</span>
                    <span className="tech">TECH</span>
                  </div>
                  <span className="footer-logo-sub">DIGITAL PARTNER</span>
                </div>
              </a>
            </div>

            {/* Col 2: Quick Links */}
            <div className="contact-footer-col">
              <h4 className="contact-footer-heading">Quick Links</h4>
              <ul className="contact-footer-links">
                <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNav('home'); }}>Home</a></li>
                <li><a href="#courses" onClick={(e) => { e.preventDefault(); handleNav('courses'); }}>IT Courses</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>IT Services</a></li>
                <li><a href="#distance" onClick={(e) => { e.preventDefault(); handleNav('distance'); }}>Distance Education</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNav('about'); }}>About Us</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNav('contact'); }}>Contact</a></li>
              </ul>
            </div>

            {/* Col 3: Our Services */}
            <div className="contact-footer-col">
              <h4 className="contact-footer-heading">Our Services</h4>
              <ul className="contact-footer-links">
                <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>Web Development</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>Ecommerce Development</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>App Development</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>AI & Automation</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>UI/UX Design</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>SEO & Digital Marketing</a></li>
              </ul>
            </div>

            {/* Col 4: Get In Touch */}
            <div className="contact-footer-col">
              <h4 className="contact-footer-heading">Get In Touch</h4>
              <div className="contact-footer-contact-info">
                <div className="contact-row">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <a href={`tel:${BUSINESS_CONFIG.phoneCall}`}>{BUSINESS_CONFIG.phoneDisplay}</a>
                </div>
                <div className="contact-row">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <a href={`mailto:${BUSINESS_CONFIG.email}`}>{BUSINESS_CONFIG.email}</a>
                </div>
                <div className="contact-row">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span>{BUSINESS_CONFIG.officeCity}</span>
                </div>
              </div>
              <div className="contact-footer-socials">
                <a href="#contact" aria-label="Facebook" onClick={(e) => e.preventDefault()}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                <a href="#contact" aria-label="Twitter X" onClick={(e) => e.preventDefault()}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                <a href="#contact" aria-label="Instagram" onClick={(e) => e.preventDefault()}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                <a href="#contact" aria-label="LinkedIn" onClick={(e) => e.preventDefault()}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                <a href="#contact" aria-label="YouTube" onClick={(e) => e.preventDefault()}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
              </div>
            </div>

            {/* Col 5: Stay Updated */}
            <div className="contact-footer-col">
              <h4 className="contact-footer-heading">Stay Updated</h4>
              <p className="contact-footer-subtext">Get the latest updates and new courses.</p>
              <form className="contact-newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="contact-newsletter-input"
                  required
                />
                <button type="submit" className="contact-newsletter-btn" aria-label="Subscribe">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            </div>
          </div>

          <div className="contact-footer-bottom">
            <p>© 2026 WinTech Digital Partner. All rights reserved.</p>
            <div className="contact-footer-legal">
              <a href="#contact" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              <span className="dot">•</span>
              <a href="#contact" onClick={(e) => e.preventDefault()}>Terms & Conditions</a>
              <span className="dot">•</span>
              <a href="#contact" onClick={(e) => e.preventDefault()}>Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
