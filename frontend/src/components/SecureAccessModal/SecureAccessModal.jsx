import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyClearanceToken } from '../../services/api';
import './SecureAccessModal.css';

const SecureAccessModal = ({ isOpen, onClose }) => {
  const [accessCode, setAccessCode] = useState('');
  const [authStatus, setAuthStatus] = useState(null); // 'verifying', 'granted', 'denied'
  const [clearanceInfo, setClearanceInfo] = useState(null);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthStatus('verifying');

    try {
      const res = await verifyClearanceToken(accessCode);
      if (res && (res.granted || res.success)) {
        setClearanceInfo(res);
        setAuthStatus('granted');
      } else {
        setAuthStatus('denied');
      }
    } catch (err) {
      setAuthStatus('denied');
    }
  };

  const handleEnterTerminal = () => {
    onClose();
    navigate('/dashboard');
  };

  const handleReset = () => {
    setAuthStatus(null);
    setAccessCode('');
    setClearanceInfo(null);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <div className="modal-header">
          <div className="status-indicator"></div>
          <h3>SECURE NODE CLEARANCE</h3>
        </div>

        {authStatus === null && (
          <form onSubmit={handleSubmit} className="modal-form">
            <p className="modal-desc">
              Enter your biometric clearance token or cryptographic authorization key to access the forensic core.
            </p>
            <div className="input-group">
              <label>CLEARANCE KEY</label>
              <input
                type="password"
                placeholder="••••-••••-••••"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                autoFocus
                required
              />
            </div>
            <button type="submit" className="btn-primary modal-btn">
              VERIFY CREDENTIALS
            </button>
          </form>
        )}

        {authStatus === 'verifying' && (
          <div className="modal-state">
            <div className="verifying-spinner"></div>
            <p>HANDSHAKE WITH SECURE PROTOCOL...</p>
          </div>
        )}

        {authStatus === 'granted' && (
          <div className="modal-state granted">
            <div className="success-icon">&#10003;</div>
            <h4>ACCESS GRANTED</h4>
            <p>{clearanceInfo?.clearanceLevel || 'Clearance Level 4 Authenticated.'}</p>
            <button className="btn-primary modal-btn" onClick={handleEnterTerminal}>
              ENTER TERMINAL
            </button>
          </div>
        )}

        {authStatus === 'denied' && (
          <div className="modal-state denied">
            <div className="fail-icon">&#10007;</div>
            <h4>ACCESS DENIED</h4>
            <p>Invalid authorization token. Security event logged.</p>
            <button className="btn-secondary modal-btn" onClick={handleReset}>
              TRY AGAIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecureAccessModal;
