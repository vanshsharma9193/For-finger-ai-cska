import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json({
    status: 'ONLINE',
    service: 'FOR FINGER Forensics API',
    version: '4.2.0',
    systemTime: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    features: {
      subdermalMinutiaeEngine: 'ACTIVE',
      quantumEncryptionBridge: 'ACTIVE',
      interpolIAFISSync: 'CONNECTED'
    }
  });
});

export default router;

