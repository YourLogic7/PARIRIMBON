import express from 'express';
import {
  getAiOptions,
  getAllRules,
  getAiRecommendation,
} from '../controllers/aiController.js';

const router = express.Router();

router.get('/options', getAiOptions);
router.get('/rules', getAllRules);
router.post('/recommend', getAiRecommendation);

export default router;
