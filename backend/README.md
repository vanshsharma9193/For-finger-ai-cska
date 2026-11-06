# FOR FINGER — Forensic Biometrics Backend API

Express & Node.js REST API providing biometric fingerprint scanning analysis, subject lookup, encrypted message transmission, and clearance authorization.

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | System diagnostics & telemetry status |
| `POST` | `/api/scan/verify` | Analyze optical/dermal scan input & minutiae matching |
| `GET` | `/api/scan/subjects` | Retrieve forensic biometric subject database |
| `POST` | `/api/contact` | Receive and log encrypted dispatch message |
| `GET` | `/api/contact/messages` | Inspect registered message transmissions |
| `POST` | `/api/auth/verify-token`| Authenticate security clearance access key |

## 🚀 Running the Server

```bash
# In backend directory
npm install
npm run dev
```

Server starts on `http://localhost:5000`.

