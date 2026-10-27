import React, { useState } from 'react';

const SEARCHABLE_ITEMS = [
  { title: 'MERN Stack Development', type: 'IT Course', link: '#courses' },
  { title: 'Python Programming & Data Structures', type: 'IT Course', link: '#courses' },
  { title: 'Java Full Stack Development', type: 'IT Course', link: '#courses' },
  { title: 'Generative AI & Prompt Engineering', type: 'IT Course', link: '#courses' },
  { title: 'AI & Machine Learning Specialization', type: 'IT Course', link: '#courses' },
  { title: 'Full Stack Web Development', type: 'IT Course', link: '#courses' },
  { title: 'Frontend Web Development (React / HTML / CSS)', type: 'IT Course', link: '#courses' },
  { title: 'WordPress CMS Development', type: 'IT Course', link: '#courses' },
  { title: 'Digital Marketing & SEO', type: 'IT Course', link: '#courses' },
  { title: 'Website Design & Development', type: 'IT Service', link: '#services' },
  { title: 'Mobile App Development (iOS & Android)', type: 'IT Service', link: '#services' },
  { title: 'Custom Software Development', type: 'IT Service', link: '#services' },
  { title: 'AI Automation & Chatbots', type: 'IT Service', link: '#services' },
  { title: 'Graphic & UI/UX Design', type: 'IT Service', link: '#services' },
  { title: 'UGC Approved Distance Degree Programmes', type: 'Distance Edu', link: '#distance' },
  { title: 'Distance MBA & MCA Guidance', type: 'Distance Edu', link: '#distance' },
  { title: 'Undergraduate (BBA, BCA, B.Com) Distance Education', type: 'Distance Edu', link: '#distance' }
];

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = SEARCHABLE_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="modal-overlay active"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-card">
        <button onClick={onClose} className="modal-close-btn" aria-label="Close Search">
          &times;
        </button>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '8px' }}>
            <img src="/images/wintech-icon.png" alt="WinTech" width="34" height="34" style={{ borderRadius: '7px', boxShadow: '0 2px 8px rgba(229, 37, 42, 0.25)' }} />
            <h3 className="modal-title" style={{ margin: 0 }}>Search WinTech</h3>
          </div>
          <p className="modal-subtitle">Find courses, tech services, and degree programmes</p>
        </div>

        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Type course or service name (e.g. Python, Web, MBA)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <span className="search-icon-inside">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
        </div>

        <div className="search-results-list">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 0', color: '#64748b', fontSize: '0.9rem' }}>
              No matching courses or services found.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="search-result-item"
                onClick={onClose}
              >
                <span style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.88rem' }}>
                  {item.title}
                </span>
                <span className="search-item-badge">{item.type}</span>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
