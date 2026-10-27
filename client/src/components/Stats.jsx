import React, { useState, useEffect, useRef } from 'react';

export default function Stats() {
  const [counts, setCounts] = useState({
    students: 1000,
    projects: 200,
    clients: 50,
    brands: 3
  });
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1400;
          const stepTime = 30;
          const steps = duration / stepTime;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = Math.min(currentStep / steps, 1);

            setCounts({
              students: Math.floor(progress * 1000),
              projects: Math.floor(progress * 200),
              clients: Math.floor(progress * 50),
              brands: Math.floor(progress * 3)
            });

            if (currentStep >= steps) {
              clearInterval(timer);
              setCounts({ students: 1000, projects: 200, clients: 50, brands: 3 });
            }
          }, stepTime);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="stats-section">
      <div className="container stats-grid">
        {/* Stat 1 */}
        <div className="stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-number">{counts.students}+</span>
            <span className="stat-label">Students Trained</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-number">{counts.projects}+</span>
            <span className="stat-label">Projects Delivered</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-number">{counts.clients}+</span>
            <span className="stat-label">Happy Clients</span>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-number">{counts.brands}</span>
            <span className="stat-label">Brands Under One Roof</span>
          </div>
        </div>
      </div>
    </section>
  );
}
