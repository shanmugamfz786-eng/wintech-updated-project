import React from 'react';

export default function CtaBanner({ onOpenEnquiry }) {
  return (
    <section className="cta-banner-section">
      <div className="container cta-banner-layout">
        <div className="cta-banner-left">
          {/* Logo Badge in Banner */}
          <div className="cta-banner-logo">
            <img src="/images/wintech-icon.png" alt="WinTech" className="brand-icon-img" width="38" height="38" />
            <div className="brand-text">
              <div className="brand-title">
                <span className="win" style={{ color: '#ffffff' }}>WiN</span>
                <span className="tech" style={{ color: '#ffffff' }}>TECH</span>
              </div>
              <span className="brand-subtitle" style={{ color: '#cbd5e1' }}>DIGITAL PARTNER</span>
            </div>
          </div>

          <div className="cta-banner-text">
            <h3>Ready to Start Your Journey?</h3>
            <p>Get in touch with us for courses, services or distance education.</p>
          </div>
        </div>

        <div className="cta-banner-buttons">
          <button onClick={onOpenEnquiry} className="btn btn-white btn-arrow">
            <span>Contact Us</span>
            <span className="btn-arrow">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </button>

          <a
            href="https://wa.me/918144008298?text=Hello%20WinTech,%20I%20would%20like%20to%20inquire%20about%20your%20courses%20and%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.179L2 22l4.954-1.401A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.273c-1.636 0-3.174-.472-4.48-1.289l-.322-.199-2.943.832.844-2.868-.215-.337A8.256 8.256 0 0 1 3.727 12c0-4.562 3.711-8.273 8.273-8.273 4.562 0 8.273 3.711 8.273 8.273 0 4.562-3.711 8.273-8.273 8.273z" />
            </svg>
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
