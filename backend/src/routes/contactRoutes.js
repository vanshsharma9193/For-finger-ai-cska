import { Router } from 'express';
import { submitContact, getContactMessages } from '../controllers/contactController.js';

const router = Router();

router.post('/', submitContact);
router.get('/messages', getContactMessages);

export default router;

