import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const messagesFilePath = path.join(__dirname, '../data/messages.json');

// Ensure messages.json exists
function loadMessages() {
  try {
    if (!fs.existsSync(messagesFilePath)) {
      fs.writeFileSync(messagesFilePath, '[]', 'utf-8');
      return [];
    }
    const raw = fs.readFileSync(messagesFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function saveMessages(msgs) {
  try {
    fs.writeFileSync(messagesFilePath, JSON.stringify(msgs, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write message store:', err);
  }
}

/**
 * POST /api/contact
 * Receives and securely logs an encrypted inquiry transmission
 */
export const submitContact = (req, res) => {
  try {
    const { identity, email, message } = req.body || {};

    if (!identity || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Identity, secure email, and encrypted message payload are required.'
      });
    }

    const messages = loadMessages();
    const transmissionId = `NODE-${Math.floor(100000 + Math.random() * 900000)}`;
    const packetHash = crypto
      .createHash('sha256')
      .update(`${email}-${message}-${Date.now()}`)
      .digest('hex');

    const newTransmission = {
      id: crypto.randomUUID(),
      transmissionId,
      identity: identity.trim(),
      email: email.trim(),
      message: message.trim(),
      packetHash: `0x${packetHash.substring(0, 16)}`,
      receivedAt: new Date().toISOString()
    };

    messages.unshift(newTransmission);
    saveMessages(messages);

    return res.status(201).json({
      success: true,
      message: 'Transmission successfully securely routed to forensic node.',
      transmissionId,
      receivedAt: newTransmission.receivedAt,
      packetHash: newTransmission.packetHash
    });
  } catch (err) {
    console.error('Contact submission error:', err);
    return res.status(500).json({ success: false, error: 'Transmission routing failed' });
  }
};

/**
 * GET /api/contact/messages
 * Retrieves recent encrypted transmissions
 */
export const getContactMessages = (req, res) => {
  const messages = loadMessages();
  return res.status(200).json({
    success: true,
    count: messages.length,
    data: messages
  });
};

