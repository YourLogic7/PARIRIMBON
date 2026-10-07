import express from 'express';
import {
  getAllPages,
  getPageById,
  createPage,
  updatePage,
  deletePage,
} from '../controllers/pageController.js';
import { verifyAdmin } from '../controllers/authController.js';

const router = express.Router();

router.get('/', getAllPages);
router.get('/:id', getPageById);
router.post('/', verifyAdmin, createPage);
router.put('/:id', verifyAdmin, updatePage);
router.delete('/:id', verifyAdmin, deletePage);

export default router;
