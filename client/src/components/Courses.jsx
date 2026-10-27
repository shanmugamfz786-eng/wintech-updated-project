import React, { useState, useEffect } from 'react';

const DEFAULT_COURSES = [
  { id: 1, title: 'MERN Stack\nDevelopment', icon: 'react' },
  { id: 2, title: 'Python\nProgramming', icon: 'python' },
  { id: 3, title: 'Java\nDevelopment', icon: 'java' },
  { id: 4, title: 'Generative AI', icon: 'openai' },
  { id: 5, title: 'AI & Machine Learning', icon: 'aiml' },
  { id: 6, title: 'Full Stack\nDevelopment', icon: 'fullstack' },
  { id: 7, title: 'Frontend\nDevelopment', icon: 'html5' },
  { id: 8, title: 'WordPress\nDevelopment', icon: 'wordpress' },
  { id: 9, title: 'Digital Marketing', icon: 'marketing' },
];

const getApiBaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || '';
  }
  return '';
};

export default function Courses({ onOpenEnquiry }) {
  const [courses, setCourses] = useState(DEFAULT_COURSES);

  useEffect(() => {
    // Fetch live courses from backend
    fetch(`${getApiBaseUrl()}/api/courses`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          const mapped = data.data.map((item, idx) => {
            const fallback = DEFAULT_COURSES[idx % DEFAULT_COURSES.length];
            return {
              id: item.id,
              title: item.title,
              icon: item.icon || fallback.icon,
            };
          });
          setCourses(mapped);
        }
      })
      .catch(() => {
        // Fallback already active
      });
  }, []);

  const renderIcon = (type) => {
    switch (type) {
      case 'react':
        return (
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#00d8ff" strokeWidth="1.6" transform="rotate(30 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#00d8ff" strokeWidth="1.6" transform="rotate(90 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#00d8ff" strokeWidth="1.6" transform="rotate(150 12 12)" />
            <circle cx="12" cy="12" r="2.2" fill="#00d8ff" />
          </svg>
        );
      case 'python':
        return (
          <svg width="28" height="28" viewBox="0 0 110 110" fill="none">
            <path d="M54.5 10C29.6 10 31.2 20.8 31.2 20.8l.03 10.9h23.7v3.3H21.5S10 33.7 10 58.7c0 24.9 10.1 24 10.1 24h6v-8.4s-.3-10.1 10-10.1h23.5s9.7.2 9.7-9.5V29.5S70.8 10 54.5 10zm-12.7 7.5a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6z" fill="#387eb8"/>
            <path d="M55.5 100c24.9 0 23.3-10.8 23.3-10.8l-.03-10.9H55.07v-3.3h33.43s11.5 1.3 11.5-23.7c0-24.9-10.1-24-10.1-24h-6v8.4s.3 10.1-10 10.1H50.4s-9.7-.2-9.7 9.5v24.2s-1.5 19.5 14.8 19.5zm12.7-7.5a3.8 3.8 0 1 1 0-7.6 3.8 3.8 0 0 1 0 7.6z" fill="#ffd438"/>
          </svg>
        );
      case 'java':
        return (
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path d="M12.5 4c2 2-1 4.5 0 7" stroke="#e5252a" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M17.5 2c2.5 2.5-1 5 0 8.5" stroke="#e5252a" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M9 13.5h12c2.8 0 4.5 2 4.5 4.5s-1.7 4.5-4.5 4.5h-1c-1.5 3-5 5-10 5-4.5 0-7.5-2-7.5-5.5 0-4 3.5-8.5 6.5-8.5z" stroke="#007396" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M21 16h2c1.4 0 2.5 1 2.5 2s-1.1 2-2.5 2h-2" stroke="#007396" strokeWidth="1.8"/>
            <path d="M6 28.5c5 2 15 2 20 0" stroke="#007396" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'openai':
      case 'sparkle':
        return (
          <svg width="28" height="28" viewBox="0 0 100 100" fill="#0f172a">
            <path d="M86.5 41.5a24 24 0 0 0-1.7-16.7 24.3 24.3 0 0 0-17.6-12.7 24.2 24.2 0 0 0-21.4 5.3 24 24 0 0 0-17-5.5 24.3 24.3 0 0 0-20.9 14.8A24.2 24.2 0 0 0 9.8 41a24 24 0 0 0-1.7 16.7 24.3 24.3 0 0 0 17.6 12.7 24.2 24.2 0 0 0 21.4-5.3 24 24 0 0 0 17 5.5 24.3 24.3 0 0 0 20.9-14.8 24.2 24.2 0 0 0-1.5-14.3zm-32 44.7a16.6 16.6 0 0 1-13-6.4l1.5-1 14.8-8.5a3.8 3.8 0 0 0 1.9-3.3V44.2l6.8 3.9v18.7a16.7 16.7 0 0 1-12 19.4zm-28.7-14.2a16.6 16.6 0 0 1-5.3-13.5l1.6.2 17.1 3a3.8 3.8 0 0 0 3.7-1.1l19.6-19.6 3.9 6.8L38 67.5a16.7 16.7 0 0 1-12.2 4.5zM20 40a16.6 16.6 0 0 1 7.6-12.3l.1 1.8V47a3.8 3.8 0 0 0 1.8 3.3L49 61.9l-3.9 6.8L28.8 59A16.7 16.7 0 0 1 20 40zm53.8 19.3L56.7 49a3.8 3.8 0 0 0-3.7 1.1L33.4 69.7l-3.9-6.8 17.1-17.1a16.7 16.7 0 0 1 27.2 13.5zm6.4-12.5a16.6 16.6 0 0 1-7.6 12.3V57.3a3.8 3.8 0 0 0-1.8-3.3L51 43.7l3.9-6.8 16.3 9.7a16.7 16.7 0 0 1 9 12.7zm-14.7-9.5L48.3 32a3.8 3.8 0 0 0-3.8 0L27.4 42.1V34a16.7 16.7 0 0 1 24.2-13.9l13.9 17.2z"/>
          </svg>
        );
      case 'aiml':
      case 'brain':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 2A4.5 4.5 0 0 0 5 6.5c0 .6.1 1.2.3 1.7A4.5 4.5 0 0 0 3 12c0 2 1.3 3.7 3.1 4.3A4.5 4.5 0 0 0 10 20.5v-1a4 4 0 0 0 4-4v-1"/>
            <path d="M14.5 2A4.5 4.5 0 0 1 19 6.5c0 .6-.1 1.2-.3 1.7A4.5 4.5 0 0 1 21 12c0 2-1.3 3.7-3.1 4.3A4.5 4.5 0 0 1 14 20.5v-1a4 4 0 0 1-4-4v-1"/>
            <line x1="12" y1="3" x2="12" y2="21" stroke="#2563eb" strokeWidth="1.8"/>
            <circle cx="8" cy="8" r="1" fill="#2563eb"/>
            <circle cx="7" cy="14" r="1" fill="#2563eb"/>
            <circle cx="16" cy="8" r="1" fill="#2563eb"/>
            <circle cx="17" cy="14" r="1" fill="#2563eb"/>
          </svg>
        );
      case 'fullstack':
      case 'layers':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6d28d9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" fill="#7c3aed" fillOpacity="0.25"/>
            <polyline points="2 12 12 17 22 12"/>
            <polyline points="2 17 12 22 22 17"/>
          </svg>
        );
      case 'html5':
      case 'html':
        return (
          <svg width="28" height="28" viewBox="0 0 512 512" fill="none">
            <path d="M71 460L32 24h448l-39 436-185 52-185-52z" fill="#E44D26"/>
            <path d="M256 472l151-42 33-376H256v418z" fill="#F16529"/>
            <path d="M256 176h70l5-54H177l15 166h134l-6 63-70 19-70-19-4-45h-54l8 88 120 33 120-33 16-180H256v-53z" fill="#FFFFFF"/>
          </svg>
        );
      case 'wordpress':
        return (
          <svg width="28" height="28" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="54" stroke="#21759b" strokeWidth="9" fill="none"/>
            <path d="M24 60c0 14.2 8.1 26.5 20 32.5L25.3 40.5C24.5 46.5 24 53 24 60zm63.4-3.5c0-6.8-2.4-11.6-4.5-15.3-2.8-4.5-5.4-8.3-5.4-12.8 0-5 3.8-9.7 9.2-9.7.2 0 .5 0 .7.1-7.5-6.8-17.4-10.8-27.4-10.8-14.8 0-27.8 7.3-35.8 18.5 1 .1 1.9.1 2.7.1 4.5 0 11.5-.6 11.5-.6 2.3-.2 2.6 3.2.3 3.5 0 0-2.3.3-4.9.4l15.6 46.3 9.4-28.1-6.7-18.2c-2.3-.1-4.5-.4-4.5-.4-2.3-.2-2-3.6.3-3.5 0 0 7.2.6 11.4.6 4.5 0 11.5-.6 11.5-.6 2.3-.2 2.6 3.2.3 3.5 0 0-2.3.3-4.9.4l15.3 45.6 4.3-14.3c1.9-6.3 3.4-10.8 3.4-14.7zm-26.6 11.6l-12.8 37.3c3.8 1.1 7.8 1.7 12 1.7 5 0 9.8-.9 14.2-2.5l-13.4-36.5zm33.5-35.3c.4 2.3.6 4.8.6 7.6 0 7.5-1.4 15.9-5.7 26.6l12.7 36.8c7.3-7.7 11.7-18.1 11.7-29.4 0-16.7-9.5-31.1-23.3-38.3l4 3.7z" fill="#21759b"/>
          </svg>
        );
      case 'marketing':
      case 'megaphone':
      default:
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#7c3aed" stroke="#6d28d9" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M15 9.5a4 4 0 0 1 0 5" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M18.5 7a7.5 7.5 0 0 1 0 10" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M6 15v3a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-3" fill="#6d28d9"/>
          </svg>
        );
    }
  };

  return (
    <section id="courses" className="courses-section">
      <div className="container courses-layout">
        {/* Left Column: Courses Intro & Perks */}
        <div className="courses-info">
          <div className="badge-tag">POPULAR COURSES</div>
          <h2 className="section-title">
            Build In-Demand Skills<br />
            with WinTech
          </h2>
          <p className="section-subtitle">
            Get trained by industry experts and work on real-time projects. Choose from a wide range of IT courses designed for your future.
          </p>
          <button onClick={onOpenEnquiry} className="btn btn-primary btn-arrow">
            <span>View All Courses</span>
            <span className="btn-arrow">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </button>

          {/* Clean Perks Row with Dividers */}
          <div className="courses-perks-row">
            <div className="perk-item">
              <div className="perk-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                  <path d="M6 8h4M6 12h8" />
                </svg>
              </div>
              <div className="perk-text">
                <h5>Flexible Batches</h5>
                <p>Online &amp; Offline</p>
              </div>
            </div>

            <div className="perk-divider"></div>

            <div className="perk-item">
              <div className="perk-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <circle cx="12" cy="11" r="2.5" fill="#2563eb" />
                  <path d="M9 19l3 3 3-3" />
                </svg>
              </div>
              <div className="perk-text">
                <h5>Certification</h5>
                <p>After Completion</p>
              </div>
            </div>

            <div className="perk-divider"></div>

            <div className="perk-item">
              <div className="perk-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" fill="#dbeafe" />
                  <path d="M9 12h6M9 16h4" />
                </svg>
              </div>
              <div className="perk-text">
                <h5>Placement Support</h5>
                <p>Career Guidance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3x3 Course Cards Grid matching user mockup */}
        <div className="courses-grid-wrapper">
          <div className="courses-grid">
            {courses.map((course) => (
              <div
                key={course.id}
                className="course-card"
                onClick={onOpenEnquiry}
                title={`Enroll in ${course.title.replace('\n', ' ')}`}
              >
                <div className="course-icon-disc">
                  {renderIcon(course.icon)}
                </div>
                <span className="course-title" style={{ whiteSpace: 'pre-line' }}>
                  {course.title}
                </span>
              </div>
            ))}
          </div>

          <div className="courses-bottom-link">
            <a href="#courses" onClick={onOpenEnquiry}>
              View All Courses &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
