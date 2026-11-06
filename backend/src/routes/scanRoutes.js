import { Router } from 'express';
import { verifyScan, getAllSubjects } from '../controllers/scanController.js';

const router = Router();

router.post('/verify', verifyScan);
router.get('/subjects', getAllSubjects);

export default router;

