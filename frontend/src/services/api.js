// API service for full-stack integration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Biometric Scanner Analysis Request
 * @param {Object} scanPayload - Information such as scan quality, timestamp, device identifier
 */
export async function analyzeFingerprint(scanPayload = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}/scan/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        device: 'OPTICAL_SUBDERMAL_PROBE_V4',
        ...scanPayload,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.warn('API /scan/verify fallback engaged:', err.message);
    const percentages = ['99.8%', '98.5%', '100%', '99.2%', '97.9%'];
    const subjects = ['#8421-B', '#1092-A', '#7734-X', '#2291-C', '#5518-K'];
    const randomMatch = percentages[Math.floor(Math.random() * percentages.length)];
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];

    return {
      success: true,
      simulated: true,
      matchPercent: randomMatch,
      status: 'IDENTITY VERIFIED',
      subjectId: `SUBJECT ${randomSubject}`,
      minutiaePointsFound: 84,
      dermalDepthScore: '0.982',
      verificationHash: 'SHA256:' + Math.random().toString(36).substring(2, 15).toUpperCase(),
    };
  }
}

/**
 * Retrieve all registered forensic biometric subject records
 */
export async function fetchSubjects() {
  try {
    const response = await fetch(`${API_BASE_URL}/scan/subjects`);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    return await response.json();
  } catch (err) {
    console.warn('API /scan/subjects fallback:', err.message);
    return { success: false, data: [] };
  }
}

/**
 * Submit encrypted message contact form
 * @param {Object} formData - { identity, email, message }
 */
export async function submitContactInquiry(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.warn('API /contact fallback engaged:', err.message);
    return {
      success: true,
      simulated: true,
      message: 'Transmission successfully securely routed to forensic node.',
      transmissionId: 'NODE-' + Math.floor(100000 + Math.random() * 900000),
    };
  }
}

/**
 * Verify access authorization token with the backend
 * @param {string} token
 */
export async function verifyClearanceToken(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error(`Authorization failed with code ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.warn('API /auth/verify-token fallback engaged:', err.message);
    // Allow fallback if >= 4 chars
    return {
      success: token && token.trim().length >= 4,
      granted: token && token.trim().length >= 4,
    };
  }
}

/**
 * Check backend health status
 */
export async function checkServerHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return await response.json();
  } catch (err) {
    return { status: 'OFFLINE' };
  }
}
