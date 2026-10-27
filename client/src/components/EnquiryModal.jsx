import React, { useState } from 'react';
 
const getApiBaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || '';
  }
  return '';
};

export default function EnquiryModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const endpoint = `${getApiBaseUrl()}/api/enquiries`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessMsg(result.message || 'Enquiry submitted successfully!');
        setFormData({
          name: '',
          phone: '',
          email: '',
          interest: '',
          message: ''
        });
        setTimeout(() => {
          setSuccessMsg(null);
          onClose();
        }, 2200);
      } else {
        setErrorMsg(result.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Make sure backend server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

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
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close Enquiry Modal"
        >
          &times;
        </button>

        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <img src="/images/wintech-icon.png" alt="WinTech" width="38" height="38" style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(229, 37, 42, 0.25)' }} />
            <h3 className="modal-title" style={{ margin: 0 }}>Get Free Consultation &amp; Enquiry</h3>
          </div>
          <p className="modal-subtitle">
            Speak with our expert counselors for Courses, IT Services or Distance Education
          </p>
        </div>

        {successMsg && (
          <div style={{
            backgroundColor: '#ecfdf5',
            color: '#047857',
            padding: '14px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '0.9rem',
            textAlign: 'center',
            border: '1px solid #a7f3d0'
          }}>
            🎉 {successMsg}
          </div>
        )}

        {errorMsg && (
          <div style={{
            backgroundColor: '#fef2f2',
            color: '#b91c1c',
            padding: '14px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '0.9rem',
            textAlign: 'center',
            border: '1px solid #fecaca'
          }}>
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. Arun Kumar"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. +91 98765 43210"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. arun@example.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="interest">Interested In *</label>
            <select
              id="interest"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select an Option</option>
              <option value="IT Courses">WinTech - IT Courses (MERN, Python, Java, AI)</option>
              <option value="IT Services">Gen Z Neural-X - IT Services (Web, App, Software)</option>
              <option value="Distance Education">GenSpark University - Distance Education (UG/PG)</option>
              <option value="General Inquiry">General Consultation</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="message">Message / Specific Requirement</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Tell us about your learning goals or business project..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Submitting Enquiry...' : 'Submit Enquiry'}
          </button>
        </form>
      </div>
    </div>
  );
}
