import React, { useState, useEffect } from 'react';
import { fetchSubjects, checkServerHealth } from '../../services/api';
import './DashboardPage.css';

const DashboardPage = () => {
  const [health, setHealth] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('subjects'); // 'subjects' | 'messages' | 'telemetry'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [healthRes, subjectsRes, messagesRes] = await Promise.allSettled([
          checkServerHealth(),
          fetchSubjects(),
          fetch('/api/contact/messages').then((r) => r.json()),
        ]);

        if (healthRes.status === 'fulfilled') setHealth(healthRes.value);
        if (subjectsRes.status === 'fulfilled' && subjectsRes.value?.data) {
          setSubjects(subjectsRes.value.data);
        }
        if (messagesRes.status === 'fulfilled' && messagesRes.value?.data) {
          setMessages(messagesRes.value.data);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="clearance-badge">LEVEL 4 SECURE CONSOLE</div>
        <h1>FORENSIC INTELLIGENCE TERMINAL</h1>
        <p>Classified Minutiae Records, Secure Dispatches & System Telemetry</p>
      </div>

      {/* Metric Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">SYSTEM HEALTH</span>
          <div className="metric-val status-online">
            <span className="live-dot" /> {health?.status || 'ONLINE'}
          </div>
          <span className="metric-sub">Version: {health?.version || '4.2.0'}</span>
        </div>

        <div className="metric-card">
          <span className="metric-label">REGISTERED SUBJECTS</span>
          <div className="metric-val accent-val">{subjects.length || 4}</div>
          <span className="metric-sub">IAFIS Synced</span>
        </div>

        <div className="metric-card">
          <span className="metric-label">ENCRYPTED DISPATCHES</span>
          <div className="metric-val">{messages.length}</div>
          <span className="metric-sub">Stored Transmissions</span>
        </div>

        <div className="metric-card">
          <span className="metric-label">QUANTUM ENCRYPTION</span>
          <div className="metric-val accent-val">AES-256-GCM</div>
          <span className="metric-sub">Active Bridge</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'subjects' ? 'active' : ''}`}
          onClick={() => setActiveTab('subjects')}
        >
          Biometric Database ({subjects.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          Secure Transmissions ({messages.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'telemetry' ? 'active' : ''}`}
          onClick={() => setActiveTab('telemetry')}
        >
          Telemetry & Protocols
        </button>
      </div>

      {/* Tab Panels */}
      <div className="tab-content">
        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Decrypting secure ledger data...</p>
          </div>
        ) : (
          <>
            {activeTab === 'subjects' && (
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Subject ID</th>
                      <th>Clearance</th>
                      <th>Minutiae Pattern</th>
                      <th>Points</th>
                      <th>Match Baseline</th>
                      <th>Jurisdiction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((s, idx) => (
                      <tr key={s.id || idx}>
                        <td className="subject-id-col">
                          <strong>{s.subjectName}</strong>
                          <span className="sub-tag">{s.classification}</span>
                        </td>
                        <td>
                          <span className="clearance-tag">{s.clearanceLevel}</span>
                        </td>
                        <td>{s.ridgePattern}</td>
                        <td className="points-col">{s.minutiaeCount} pts</td>
                        <td className="confidence-col">{s.confidenceBase}%</td>
                        <td className="jurisdiction-col">{s.jurisdiction}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="messages-feed">
                {messages.length === 0 ? (
                  <div className="empty-feed">No secure dispatches logged yet.</div>
                ) : (
                  messages.map((m) => (
                    <div className="message-item" key={m.id}>
                      <div className="message-meta">
                        <span className="msg-trans-id">{m.transmissionId}</span>
                        <span className="msg-date">{new Date(m.receivedAt).toLocaleString()}</span>
                      </div>
                      <div className="msg-sender">
                        <strong>AGENT: {m.identity}</strong> ({m.email})
                      </div>
                      <p className="msg-body">"{m.message}"</p>
                      <div className="msg-hash">
                        <span>HASH:</span> <code>{m.packetHash}</code>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'telemetry' && (
              <div className="telemetry-panel">
                <div className="telemetry-card">
                  <h4>Subdermal Minutiae Engine</h4>
                  <p>Status: OPERATIONAL</p>
                  <p>Minutiae Extraction Resolution: 5000 DPI</p>
                  <p>False Acceptance Rate (FAR): &lt; 0.0001%</p>
                </div>
                <div className="telemetry-card">
                  <h4>Cryptographic Ledger Bridge</h4>
                  <p>Status: SYNCHRONIZED</p>
                  <p>Signature Algorithm: SHA-256 ECDSA</p>
                  <p>Integrity Verification: Real-Time Validated</p>
                </div>
                <div className="telemetry-card">
                  <h4>Active Jurisdictions</h4>
                  <p>Interpol Central Bureau — Lyon, France</p>
                  <p>FBI CJIS Division — Clarksburg, WV</p>
                  <p>Tokyo Metropolitan Police Cyber Forensics</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

