import express from 'express';
import { loginAdmin, verifyAdmin, getSession } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/session', verifyAdmin, getSession);

export default router;
