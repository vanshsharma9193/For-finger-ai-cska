# FOR FINGER — Biometric Forensics Frontend

A production-grade React application for advanced biometric fingerprint analysis and forensic intelligence, built with Vite, React, React Router, and modular component architecture.

## 📁 Architecture Overview

```text
frontend/
├── src/
│   ├── pages/                       # Dedicated directory for each page
│   │   ├── Home/                    # Home Page (Hero + Integrated Sections)
│   │   │   ├── HomePage.jsx
│   │   │   └── HomePage.css
│   │   ├── Technology/              # Technology Page (Ridge, Dermal, Cross-Ref)
│   │   │   ├── TechnologyPage.jsx
│   │   │   └── TechnologyPage.css
│   │   ├── Scanner/                 # Scanner Page (Live Biometric Terminal)
│   │   │   ├── ScannerPage.jsx
│   │   │   └── ScannerPage.css
│   │   └── Contact/                 # Contact Page (Encrypted Dispatch)
│   │       ├── ContactPage.jsx
│   │       └── ContactPage.css
│   ├── components/                  # Reusable Global Components
│   │   ├── Navbar/                  # Header & Responsive Nav
│   │   ├── Footer/                  # Forensic Footer
│   │   ├── ParticleCanvas/          # Interactive Canvas Particle Matrix
│   │   ├── CursorGlow/              # Custom Radial Glow Follower
│   │   └── SecureAccessModal/       # Security Token Authorization Modal
│   ├── hooks/
│   │   └── useVoiceflow.js          # Voiceflow AI Assistant Integration
│   ├── services/
│   │   └── api.js                   # Full-Stack API Layer (Ready for backend)
│   ├── App.jsx                      # Router & Master Layout
│   ├── index.css                    # Design Tokens & Global CSS
│   └── main.jsx                     # Application Root
├── index.html
├── vite.config.js
└── package.json
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```

## 🔌 Full-Stack Integration
The API service (`src/services/api.js`) is pre-configured with endpoints:
- `POST /api/scan/verify` — Receives biometric scan frames and returns match data.
- `POST /api/contact` — Receives encrypted inquiries from the contact form.

It features graceful fallbacks with simulated forensic verification while the backend is being attached.

