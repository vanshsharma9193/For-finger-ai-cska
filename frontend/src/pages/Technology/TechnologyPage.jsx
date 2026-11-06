import React from 'react';
import './TechnologyPage.css';

const technologyCards = [
  {
    icon: '01',
    title: 'Ridge Analysis',
    desc: 'Detailed mapping of minutiae points for precise identification even from partial prints.',
    badge: '99.98% Accuracy',
    spec: 'Sub-pixel minutiae extraction, bifurcation detection, delta-point triangulation.'
  },
  {
    icon: '02',
    title: 'Cross-Reference',
    desc: 'Global database connectivity for instantaneous matching across multiple jurisdictions.',
    badge: '< 180ms Latency',
    spec: 'Interpol, FBI IAFIS, and distributed forensic ledger synchronized matching.'
  },
  {
    icon: '03',
    title: 'Dermal Depth',
    desc: 'Advanced subsurface scanning to detect spoofing and bypass surface-level damage.',
    badge: 'Multi-Spectrum',
    spec: 'Optical coherence tomography (OCT) penetrates epidermis to inspect papillary dermis.'
  }
];

const TechnologyPage = ({ isStandalone = false }) => {
  return (
    <section id="about" className={`features ${isStandalone ? 'standalone-page' : ''}`}>
      <div className="section-header">
        <h2>Our Technology</h2>
        <p>Advanced algorithmic architecture designed for unmatched forensic accuracy and speed.</p>
      </div>

      <div className="grid">
        {technologyCards.map((card, idx) => (
          <div className="card" key={idx} style={{ animationDelay: `${idx * 0.8}s` }}>
            <div className="card-icon">{card.icon}</div>
            <div className="card-badge">{card.badge}</div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
            <div className="card-spec">
              <span className="spec-label">TECH SPEC:</span> {card.spec}
            </div>
          </div>
        ))}
      </div>

      {isStandalone && (
        <div className="tech-pipeline-box">
          <div className="pipeline-header">
            <h3>FORENSIC PROCESSING PIPELINE</h3>
            <span className="pipeline-tag">ISO/IEC 19794-2 COMPLIANT</span>
          </div>
          <div className="pipeline-steps">
            <div className="pipeline-step">
              <span className="step-num">STEP 1</span>
              <h4>Spectral Capture</h4>
              <p>5000 DPI multi-angle polarized photon sweep across dermal ridge valleys.</p>
            </div>
            <div className="pipeline-step">
              <span className="step-num">STEP 2</span>
              <h4>Neural Filtering</h4>
              <p>Convolutional neural denoising removes oil artifacts, scars, and ambient noise.</p>
            </div>
            <div className="pipeline-step">
              <span className="step-num">STEP 3</span>
              <h4>Vector Embedding</h4>
              <p>Conversion into 1024-dimensional topological vector maps for instant lookup.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TechnologyPage;

