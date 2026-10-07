import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import pageRoutes from './routes/pageRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

// Initialize DB connection
connectDB().catch((err) => console.error('Database initialization warning:', err));

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Paririmbon KMS API',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/pages', pageRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);

// 404 handler for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint API tidak ditemukan' });
});

export default app;
