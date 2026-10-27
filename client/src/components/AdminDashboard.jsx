import React, { useState, useEffect, useCallback } from 'react';

const getApiBaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || '';
  }
  return '';
};

export default function AdminDashboard({ onNavigate }) {
  // Authentication State
  const [authToken, setAuthToken] = useState(() => sessionStorage.getItem('wintech_admin_token') || '');
  const [adminUser, setAdminUser] = useState(() => sessionStorage.getItem('wintech_admin_user') || '');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Enquiry Management State
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState({ totalCount: 0, newCount: 0, inProgressCount: 0, resolvedCount: 0 });
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [actionMessage, setActionMessage] = useState({ type: '', text: '' });
  const [editingNotes, setEditingNotes] = useState({});

  const showFeedback = (type, text) => {
    setActionMessage({ type, text });
    setTimeout(() => setActionMessage({ type: '', text: '' }), 4000);
  };

  // Logout handler
  const handleLogout = useCallback(async () => {
    if (authToken) {
      try {
        await fetch(`${getApiBaseUrl()}/api/admin/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${authToken}` },
        });
      } catch (_) {}
    }
    sessionStorage.removeItem('wintech_admin_token');
    sessionStorage.removeItem('wintech_admin_user');
    setAuthToken('');
    setAdminUser('');
    setEnquiries([]);
  }, [authToken]);

  // Fetch enquiries with search, category, and status filtering
  const fetchEnquiries = useCallback(async () => {
    if (!authToken) return;
    setLoadingEnquiries(true);

    try {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (categoryFilter !== 'all') params.append('interest', categoryFilter);

      const res = await fetch(`${getApiBaseUrl()}/api/admin/enquiries?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (res.status === 401) {
        showFeedback('error', 'Session expired. Please log in again.');
        handleLogout();
        return;
      }

      const data = await res.json();
      if (data.success) {
        setEnquiries(data.data || []);
        if (data.stats) {
          setStats(data.stats);
        }
      } else {
        showFeedback('error', data.error || 'Failed to load enquiries.');
      }
    } catch (_) {
      showFeedback('error', 'Network error connecting to backend service.');
    } finally {
      setLoadingEnquiries(false);
    }
  }, [authToken, searchQuery, statusFilter, categoryFilter, handleLogout]);

  useEffect(() => {
    if (authToken) {
      fetchEnquiries();
    }
  }, [authToken, fetchEnquiries]);

  // Handle Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch(`${getApiBaseUrl()}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginForm.username.trim(),
          password: loginForm.password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem('wintech_admin_token', data.token);
        sessionStorage.setItem('wintech_admin_user', data.admin?.username || 'admin');
        setAuthToken(data.token);
        setAdminUser(data.admin?.username || 'admin');
        setLoginForm({ username: '', password: '' });
      } else {
        setLoginError(data.error || 'Invalid username or password.');
      }
    } catch (_) {
      setLoginError('Unable to connect to backend service. Please check your connection.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Update Status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        showFeedback('success', `Enquiry #${id} marked as ${newStatus}.`);
        fetchEnquiries();
      } else {
        showFeedback('error', data.error || 'Failed to update status.');
      }
    } catch (_) {
      showFeedback('error', 'Error updating status.');
    }
  };

  // Save Admin Notes
  const handleSaveNotes = async (id) => {
    const notes = editingNotes[id];
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ adminNotes: notes || '' }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, admin_notes: notes } : item))
        );
        showFeedback('success', `Notes saved for Enquiry #${id}.`);
      } else {
        showFeedback('error', data.error || 'Failed to save notes.');
      }
    } catch (_) {
      showFeedback('error', 'Error saving notes.');
    }
  };

  // Delete Enquiry
  const handleDeleteEnquiry = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the enquiry from ${name}?`)) {
      return;
    }

    try {
      const res = await fetch(`${getApiBaseUrl()}/api/admin/enquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiries((prev) => prev.filter((item) => item.id !== id));
        showFeedback('success', `Enquiry #${id} deleted.`);
        fetchEnquiries();
      } else {
        showFeedback('error', data.error || 'Failed to delete enquiry.');
      }
    } catch (_) {
      showFeedback('error', 'Error deleting enquiry.');
    }
  };

  // ===========================================================================
  // 1. RENDER LOGIN SCREEN (If not authenticated)
  // ===========================================================================
  if (!authToken) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-shield-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h2 className="admin-login-title">Admin Portal</h2>
            <p className="admin-login-sub">WiNTech Digital Partner Management</p>
          </div>

          {loginError && (
            <div className="admin-login-alert" role="alert">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="adminUsername">Username</label>
              <input
                type="text"
                id="adminUsername"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                placeholder="Enter admin username"
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="adminPassword">Password</label>
              <input
                type="password"
                id="adminPassword"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" className="btn-admin-primary" disabled={loginLoading}>
              {loginLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="admin-login-footer">
            <button
              type="button"
              className="btn-back-home"
              onClick={() => onNavigate && onNavigate('home')}
            >
              ← Back to Main Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===========================================================================
  // 2. RENDER AUTHENTICATED ADMIN DASHBOARD
  // ===========================================================================
  return (
    <div className="admin-dashboard-wrapper">
      {/* Top Bar */}
      <header className="admin-dash-header">
        <div className="container admin-dash-nav">
          <div className="admin-dash-brand">
            <div className="admin-brand-badge">ADMIN</div>
            <div>
              <h1 className="admin-dash-title">Enquiry Management</h1>
              <span className="admin-dash-meta">Signed in as <strong>{adminUser}</strong></span>
            </div>
          </div>

          <div className="admin-dash-actions">
            <button
              type="button"
              className="btn-admin-refresh"
              onClick={fetchEnquiries}
              disabled={loadingEnquiries}
              title="Refresh leads"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
              <span>{loadingEnquiries ? 'Refreshing...' : 'Refresh'}</span>
            </button>

            <button
              type="button"
              className="btn-admin-secondary"
              onClick={() => onNavigate && onNavigate('home')}
            >
              View Site
            </button>

            <button
              type="button"
              className="btn-admin-danger"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      <div className="container admin-dash-body">
        {/* Action Alert Banner */}
        {actionMessage.text && (
          <div className={`admin-action-banner ${actionMessage.type}`} role="alert">
            <span>{actionMessage.text}</span>
          </div>
        )}

        {/* 4 Metric Cards */}
        <div className="admin-metrics-grid">
          <div className="admin-metric-card">
            <span className="metric-label">Total Enquiries</span>
            <strong className="metric-value">{stats.totalCount || enquiries.length}</strong>
            <span className="metric-sub">Recorded in database</span>
          </div>
          <div className="admin-metric-card card-new">
            <span className="metric-label">New / Pending</span>
            <strong className="metric-value">{stats.newCount || 0}</strong>
            <span className="metric-sub">Require initial contact</span>
          </div>
          <div className="admin-metric-card card-progress">
            <span className="metric-label">In Progress</span>
            <strong className="metric-value">{stats.inProgressCount || 0}</strong>
            <span className="metric-sub">Counseling active</span>
          </div>
          <div className="admin-metric-card card-resolved">
            <span className="metric-label">Resolved / Closed</span>
            <strong className="metric-value">{stats.resolvedCount || 0}</strong>
            <span className="metric-sub">Completed</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="admin-filter-bar">
          <div className="admin-search-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search by customer name, phone, email, or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="btn-clear-search"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>

          <div className="admin-dropdown-filters">
            <div className="filter-select-wrap">
              <label htmlFor="filterStatus">Status:</label>
              <select
                id="filterStatus"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="filter-select-wrap">
              <label htmlFor="filterCategory">Category:</label>
              <select
                id="filterCategory"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="IT Courses">IT Courses</option>
                <option value="IT Services">IT Services</option>
                <option value="Distance Education">Distance Education</option>
                <option value="General Enquiry">General Enquiry</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enquiries Listing */}
        <div className="admin-enquiry-list">
          {loadingEnquiries ? (
            <div className="admin-loading-box">
              <div className="btn-spinner large"></div>
              <span>Loading customer enquiries...</span>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="admin-empty-box">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <h3>No enquiries found</h3>
              <p>Try adjusting your search query or status filter.</p>
            </div>
          ) : (
            enquiries.map((item) => {
              const currentNotes = editingNotes[item.id] !== undefined ? editingNotes[item.id] : item.admin_notes || '';
              return (
                <div key={item.id} className={`admin-enquiry-card status-${item.status || 'new'}`}>
                  <div className="enquiry-card-header">
                    <div className="enquiry-customer-info">
                      <strong className="enquiry-name">{item.name}</strong>
                      <span className="enquiry-category-pill">{item.interest}</span>
                      <span className="enquiry-date">
                        {item.created_at ? new Date(item.created_at).toLocaleString('en-IN') : 'Recent'}
                      </span>
                    </div>

                    <div className="enquiry-status-selector">
                      <label htmlFor={`status-${item.id}`}>Status:</label>
                      <select
                        id={`status-${item.id}`}
                        value={item.status || 'new'}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`badge-select status-${item.status || 'new'}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact Channels */}
                  <div className="enquiry-contacts-row">
                    <div className="contact-chip">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <a href={`tel:${item.phone}`}>{item.phone}</a>
                    </div>

                    {item.email && (
                      <div className="contact-chip">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <a href={`mailto:${item.email}`}>{item.email}</a>
                      </div>
                    )}

                    <div className="contact-chip wa-quick">
                      <a
                        href={`https://wa.me/${String(item.phone).replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${item.name}, thank you for contacting WinTech Digital Partner regarding ${item.interest}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp Chat ➔
                      </a>
                    </div>
                  </div>

                  {/* Customer Message */}
                  <div className="enquiry-message-wrap">
                    <span className="msg-label">Message:</span>
                    <p className="msg-content">{item.message || '(No message provided)'}</p>
                  </div>

                  {/* Admin Notes & Delete */}
                  <div className="enquiry-card-footer">
                    <div className="enquiry-notes-edit">
                      <input
                        type="text"
                        placeholder="Add internal counselor note..."
                        value={currentNotes}
                        onChange={(e) =>
                          setEditingNotes({ ...editingNotes, [item.id]: e.target.value })
                        }
                      />
                      <button
                        type="button"
                        className="btn-save-note"
                        onClick={() => handleSaveNotes(item.id)}
                      >
                        Save Note
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn-delete-enquiry"
                      onClick={() => handleDeleteEnquiry(item.id, item.name)}
                      title="Delete this record"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
