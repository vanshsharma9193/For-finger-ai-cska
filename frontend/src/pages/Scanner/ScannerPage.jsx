import React, { useState } from 'react';
import { analyzeFingerprint } from '../../services/api';
import './ScannerPage.css';

const ScannerPage = ({ isStandalone = false }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState('idle'); // 'idle' | 'scanning' | 'analyzing' | 'completed'
  const [result, setResult] = useState(null);
  const [scanCount, setScanCount] = useState(0);

  const handleStartScan = async () => {
    if (isScanning) return;

    setIsScanning(true);
    setScanStep('scanning');
    setResult(null);

    // Phase 1: Fingerprint optical scan
    setTimeout(async () => {
      setScanStep('analyzing');

      // Phase 2: Contact API / Forensic backend
      try {
        const data = await analyzeFingerprint({
          scanSession: `SESSION-${Date.now()}`,
          scanIndex: scanCount + 1,
        });

        // Small delay to simulate deep cryptographic minutiae matching
        setTimeout(() => {
          setResult(data);
          setIsScanning(false);
          setScanStep('completed');
          setScanCount((prev) => prev + 1);
        }, 1200);
      } catch (err) {
        setIsScanning(false);
        setScanStep('idle');
      }
    }, 1800);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setIsScanning(false);
    setScanStep('idle');
    setResult(null);
  };

  return (
    <section id="scanner" className={`scanner-section ${isStandalone ? 'standalone-page' : ''}`}>
      <div className="scanner-container">
        {isStandalone && (
          <div className="section-header">
            <h2>Biometric Scanner Console</h2>
            <p>Direct interface with the neural sub-dermal fingerprint recognition engine.</p>
          </div>
        )}

        <div className="scanner-ui">
          <div className="scanner-header">
            <div className="terminal-title">
              <span className="terminal-prefix">TERMINAL //</span>
              <h3>
                {scanStep === 'idle' && 'SYSTEM ACTIVE - READY FOR SCAN'}
                {scanStep === 'scanning' && 'CAPTURING DERMAL CONTOUR...'}
                {scanStep === 'analyzing' && 'CROSS-REFERENCING FORENSIC LEDGER...'}
                {scanStep === 'completed' && 'IDENTIFICATION REPORT COMPILED'}
              </h3>
            </div>
            <div className="status-indicator-box">
              <span className="status-label">
                {scanStep === 'idle' && 'STANDBY'}
                {scanStep === 'scanning' && 'SAMPLING'}
                {scanStep === 'analyzing' && 'SEARCHING'}
                {scanStep === 'completed' && 'RESOLVED'}
              </span>
              <div className={`status-pulse ${scanStep}`} />
            </div>
          </div>

          <div className="scanner-main">
            {/* Interactive Scan Touchpad */}
            <div
              className={`scan-area ${isScanning ? 'scanning-active' : ''} ${scanStep === 'completed' ? 'scan-finished' : ''}`}
              id="scanArea"
              onClick={handleStartScan}
              title="Click to place finger on optical surface"
            >
              <div className="scanner-svg">
                <svg viewBox="0 0 100 100">
                  <path
                    d="M30,20 Q50,10 70,20 T70,80 Q50,90 30,80 T30,20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M35,30 Q50,25 65,30 T65,70 Q50,75 35,70 T35,30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M40,40 Q50,38 60,40 T60,60 Q50,62 40,60 T40,40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.8"
                  />
                  <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.6" />
                </svg>
              </div>

              {isScanning && <div className="interactive-laser-line" />}
              <div className="scan-overlay" />

              <div className="scan-text">
                {scanStep === 'idle' && 'PLACE FINGER TO START'}
                {scanStep === 'scanning' && 'HOLD STILL - ANALYZING...'}
                {scanStep === 'analyzing' && 'COMPARING MINUTIAE...'}
                {scanStep === 'completed' && 'SCAN COMPLETE - TAP TO RESCAN'}
              </div>
            </div>

            {/* Results Display Area */}
            <div className="results-area" id="resultsArea">
              {scanStep === 'idle' && (
                <div className="idle-state">
                  <div className="idle-icon">&#128269;</div>
                  <p>Awaiting biometric input</p>
                  <span className="idle-sub">Click the biometric sensor pad to start extraction</span>
                </div>
              )}

              {(scanStep === 'scanning' || scanStep === 'analyzing') && (
                <div className="loader-box">
                  <div className="matching-loader">
                    <div className="bar" />
                    <div className="bar" />
                    <div className="bar" />
                    <div className="bar" />
                    <div className="bar" />
                  </div>
                  <p className="loader-status">
                    {scanStep === 'scanning' ? 'Optical Sweep in Progress...' : 'Querying Interpol & IAFIS nodes...'}
                  </p>
                </div>
              )}

              {scanStep === 'completed' && result && (
                <div className="result-data">
                  <div className="result-chip">CONFIRMED MATCH</div>
                  <div className="match-percent">{result.matchPercent}</div>
                  <div className="identity-label">{result.status}</div>
                  <div className="identity-name">{result.subjectId}</div>

                  <div className="result-meta">
                    <div className="meta-row">
                      <span>Dermal Depth:</span>
                      <strong>{result.dermalDepthScore || '0.982'}</strong>
                    </div>
                    <div className="meta-row">
                      <span>Minutiae Points:</span>
                      <strong>{result.minutiaePointsFound || 84}</strong>
                    </div>
                    {result.verificationHash && (
                      <div className="meta-row hash-row">
                        <span>Hash:</span>
                        <code>{result.verificationHash.substring(0, 16)}...</code>
                      </div>
                    )}
                  </div>

                  <button className="btn-secondary reset-btn" onClick={handleReset}>
                    Clear & Rescan
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScannerPage;

