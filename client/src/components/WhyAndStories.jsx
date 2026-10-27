import React, { useState, useEffect } from 'react';

const TESTIMONIALS = [
  {
    name: 'Kavya S',
    role: 'MERN Stack Student',
    avatar: '/images/avatar-kavya.jpg',
    stars: 5,
    quote: '“WinTech gave me the right guidance and practical training. The trainers are very supportive and the placement assistance is really helpful!”'
  },
  {
    name: 'Arun P',
    role: 'Web Development Student',
    avatar: '/images/avatar-arun.jpg',
    stars: 5,
    quote: '“Working on real-world projects gave me tremendous confidence. The Gen Z Neural-X dev team mentored me directly, leading to my software developer placement!”'
  },
  {
    name: 'Priya M',
    role: 'MBA Distance Graduate',
    avatar: '/images/distance-student.jpg',
    stars: 5,
    quote: '“GenSpark University made the university admission and exam process completely stress-free. Wonderful team that answers calls anytime!”'
  }
];

export default function WhyAndStories() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="about" className="dual-section">
      <div className="container dual-layout">
        {/* Left: Why Choose Us */}
        <div className="why-choose-col">
          <div className="badge-tag">WHY CHOOSE US</div>
          <h2 className="section-title">Learn • Build • Grow</h2>
          <p className="section-subtitle">
            We are committed to providing quality education, reliable tech solutions and trusted distance education support.
          </p>

          <div className="why-grid-2x2">
            <div className="why-card">
              <div className="why-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="why-text">
                <h4>Experienced Trainers</h4>
                <p>Industry Experts</p>
              </div>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <polyline points="17 11 19 13 23 9"></polyline>
                </svg>
              </div>
              <div className="why-text">
                <h4>Enrollments</h4>
                <p>1000+ Happy Students</p>
              </div>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div className="why-text">
                <h4>Real Projects</h4>
                <p>Work on Live Projects</p>
              </div>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="why-text">
                <h4>Dedicated Support</h4>
                <p>Always With You</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Student Stories */}
        <div className="testimonials-col">
          <div className="badge-tag">STUDENT STORIES</div>
          <h2 className="section-title">What Our Students Say</h2>
          <p className="section-subtitle">
            Real experiences and career feedback from students who transformed their journeys with us.
          </p>

          <div className="testimonial-carousel-container">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className={`testimonial-slide ${idx === currentSlide ? 'active' : ''}`}
                style={{ display: idx === currentSlide ? 'block' : 'none' }}
              >
                <div className="testimonial-user-row">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="testimonial-avatar"
                    width="52"
                    height="52"
                  />
                  <div className="testimonial-user-info">
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
                </div>
                <div className="testimonial-stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <p className="testimonial-quote">{t.quote}</p>
              </div>
            ))}

            <div className="testimonial-controls">
              <div className="carousel-dots">
                {TESTIMONIALS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`carousel-dot ${idx === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(idx)}
                    role="button"
                    aria-label={`Slide ${idx + 1}`}
                  ></div>
                ))}
              </div>

              <div className="carousel-arrows">
                <button
                  onClick={prevSlide}
                  className="carousel-arrow-btn"
                  aria-label="Previous Testimonial"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="carousel-arrow-btn"
                  aria-label="Next Testimonial"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
