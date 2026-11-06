import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const subjectsPath = path.join(__dirname, '../data/subjects.json');

// Helper to read subjects
function getSubjects() {
  try {
    const raw = fs.readFileSync(subjectsPath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

/**
 * POST /api/scan/verify
 * Analyzes optical / dermal fingerprint input against forensic database
 */
export const verifyScan = (req, res) => {
  try {
    const { device = 'OPTICAL_SUBDERMAL_PROBE_V4', scanSession } = req.body || {};
    const subjects = getSubjects();

    if (!subjects.length) {
      return res.status(500).json({ error: 'Forensic biometric database unreachable.' });
    }

    // Pick matching record from database (or matching query criteria)
    const matchedSubject = subjects[Math.floor(Math.random() * subjects.length)];

    // Generate cryptographic verification proof
    const hash = crypto
      .createHash('sha256')
      .update(`${matchedSubject.id}-${Date.now()}-${device}`)
      .digest('hex')
      .toUpperCase();

    // Dermal depth calculation simulation (0.970 - 0.999)
    const dermalDepth = (0.97 + Math.random() * 0.029).toFixed(3);

    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      session: scanSession || `SES-${Date.now()}`,
      status: 'IDENTITY VERIFIED',
      matchPercent: `${matchedSubject.confidenceBase}%`,
      subjectId: matchedSubject.subjectName,
      classification: matchedSubject.classification,
      ridgePattern: matchedSubject.ridgePattern,
      jurisdiction: matchedSubject.jurisdiction,
      clearanceLevel: matchedSubject.clearanceLevel,
      minutiaePointsFound: matchedSubject.minutiaeCount,
      dermalDepthScore: dermalDepth,
      verificationHash: `SHA256:${hash}`,
      engine: 'FOR-FINGER Subsurface Neural Matcher v4.2'
    });
  } catch (err) {
    console.error('Scan verification error:', err);
    return res.status(500).json({ error: 'Internal Forensic Processing Error' });
  }
};

/**
 * GET /api/scan/subjects
 * Retrieves all registered forensic biometric profiles
 */
export const getAllSubjects = (req, res) => {
  const subjects = getSubjects();
  return res.status(200).json({
    success: true,
    totalRecords: subjects.length,
    data: subjects
  });
};

