import React, { useState } from 'react';
import { submitContactInquiry } from '../../services/api';
import './ContactPage.css';

const ContactPage = ({ isStandalone = false }) => {
  const [formData, setFormData] = useState({
    identity: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await submitContactInquiry(formData);
      setSubmissionReceipt(res);
      setFormData({ identity: '', email: '', message: '' });
    } catch (err) {
      setErrorMsg('Transmission dropped. Please retry encrypted routing.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`contact-section ${isStandalone ? 'standalone-page' : ''}`}>
      <div className="section-header">
        <h2>Secure Communication</h2>
        <p>Contact our forensic specialists and biometric engineers for mission-critical inquiries.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="info-item">
            <span className="label">ENCRYPTED LINE:</span>
            <span className="value">+1 (800) FOR-FINGER</span>
            <span className="info-sub">Quantum-resistant voice & fax transmission</span>
          </div>
          <div className="info-item">
            <span className="label">SECURE NODE:</span>
            <span className="value">hq@forfinger.io</span>
            <span className="info-sub">PGP Key ID: 0x9B42F18A31C</span>
          </div>
          <div className="info-item">
            <span className="label">LABORATORY LOCATIONS:</span>
            <span className="value">Zurich // Tokyo // Austin</span>
            <span className="info-sub">Level 4 Biometric Facilities</span>
          </div>
        </div>

        <div className="form-wrapper">
          {submissionReceipt ? (
            <div className="transmission-success">
              <div className="success-badge">&#10003; TRANSMISSION ENCRYPTED & LOGGED</div>
              <h3>Data Packet Received</h3>
              <p>{submissionReceipt.message}</p>
              {submissionReceipt.transmissionId && (
                <div className="receipt-token">
                  <span>RECEIPT ID:</span> <code>{submissionReceipt.transmissionId}</code>
                </div>
              )}
              <button
                className="btn-secondary"
                onClick={() => setSubmissionReceipt(null)}
                style={{ marginTop: '1.5rem' }}
              >
                Send Another Dispatch
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {errorMsg && <div className="form-error">{errorMsg}</div>}

              <div className="field-group">
                <label htmlFor="identity">SUBJECT / AGENT IDENTITY</label>
                <input
                  id="identity"
                  type="text"
                  name="identity"
                  placeholder="e.g. Inspector Vance / Department of Forensics"
                  value={formData.identity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field-group">
                <label htmlFor="email">SECURE RETURN EMAIL</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="agent@agency.gov / user@org.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field-group">
                <label htmlFor="message">ENCRYPTED INQUIRY MESSAGE</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter forensic specification, case inquiry, or deployment request..."
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn-primary transmit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'TRANSMITTING OVER SECURE LINK...' : 'TRANSMIT ENCRYPTED DATA'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactPage;

