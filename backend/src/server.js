import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import scanRoutes from './routes/scanRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoutes.js';
import healthRoutes from './routes/healthRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/scan', scanRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

// Root Welcome Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'FOR FINGER Forensic Biometrics Core API is running.',
    documentation: {
      health: 'GET /api/health',
      scanVerification: 'POST /api/scan/verify',
      subjects: 'GET /api/scan/subjects',
      contact: 'POST /api/contact',
      messages: 'GET /api/contact/messages',
      auth: 'POST /api/auth/verify-token'
    }
  });
});

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint Not Found',
    path: req.originalUrl
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err);
  res.status(err.status || 500).json({
    error: 'Internal Forensic Server Error',
    message: err.message || 'An unexpected error occurred.'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`⚡ FOR FINGER Backend running on http://localhost:${PORT}`);
  console.log(`📡 Ready for Forensic Biometric Requests on /api/*`);
});

export default app;

