# FOR FINGER — Full Stack Forensic Biometrics Application

Advanced biometric fingerprint identification and forensic ledger system engineered with a **React (Vite) frontend** and a **Node.js (Express) REST backend**.

---

## 🏗️ Architecture

```text
├── frontend/                # React + Vite Client Application
│   ├── src/
│   │   ├── pages/           # Individual directory for every page
│   │   │   ├── Home/        # Landing page with interactive hero
│   │   │   ├── Technology/  # Ridge analysis, depth scanning & specs
│   │   │   ├── Scanner/     # Live interactive optical fingerprint console
│   │   │   └── Contact/     # Encrypted inquiry dispatch terminal
│   │   ├── components/      # Navbar, Footer, Particle Canvas, Modal
│   │   ├── services/api.js  # Clean API bridge & fallback client
│   │   └── hooks/           # Voiceflow AI Assistant hook
│   └── vite.config.js       # Vite with reverse proxy to http://localhost:5000
│
├── backend/                 # Node.js + Express REST API
│   ├── src/
│   │   ├── controllers/     # Forensic match, contact & auth business logic
│   │   ├── routes/          # API route definitions (/api/*)
│   │   ├── data/            # Biometric subject profiles & message store
│   │   └── server.js        # Server setup, middleware & error handling
│   └── package.json
│
└── package.json             # Root workspace orchestrator
```

---

## ⚡ Quick Start

### 1. Start the Backend API (Port 5000)
```bash
npm run dev:backend
```
*Runs on `http://localhost:5000` with live reload.*

### 2. Start the Frontend Application (Port 3000)
In a separate terminal:
```bash
npm run dev:frontend
```
*Open `http://localhost:3000` in your browser.*

---

## 📡 Backend API Endpoints

- **`GET /api/health`**: System diagnostics & forensic engine telemetry.
- **`POST /api/scan/verify`**: Sub-dermal fingerprint minutiae matching & SHA-256 verification hash.
- **`GET /api/scan/subjects`**: Query registered forensic subject profiles.
- **`POST /api/contact`**: Receive and securely store encrypted message transmissions.
- **`GET /api/contact/messages`**: View dispatched transmissions log.
- **`POST /api/auth/verify-token`**: Cryptographic clearance verification for the "Secure Access" console.

