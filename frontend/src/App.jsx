import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ParticleCanvas from './components/ParticleCanvas/ParticleCanvas';
import CursorGlow from './components/CursorGlow/CursorGlow';
import SecureAccessModal from './components/SecureAccessModal/SecureAccessModal';
import HomePage from './pages/Home/HomePage';
import TechnologyPage from './pages/Technology/TechnologyPage';
import ScannerPage from './pages/Scanner/ScannerPage';
import ContactPage from './pages/Contact/ContactPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import { useVoiceflow } from './hooks/useVoiceflow';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mount Voiceflow AI forensic assistant
  useVoiceflow();

  return (
    <div className="app-container">
      {/* Background Ambience & Canvas VFX */}
      <div className="noise-overlay" />
      <CursorGlow />
      <ParticleCanvas />

      {/* Global Navigation */}
      <Navbar onOpenAccessModal={() => setIsModalOpen(true)} />

      {/* Page Routing */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/technology" element={<TechnologyPage isStandalone={true} />} />
          <Route path="/scanner" element={<ScannerPage isStandalone={true} />} />
          <Route path="/contact" element={<ContactPage isStandalone={true} />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Secure Access Clearance Modal */}
      <SecureAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
