import { Router } from 'express';
import { verifyClearanceToken } from '../controllers/authController.js';

const router = Router();

router.post('/verify-token', verifyClearanceToken);

export default router;

