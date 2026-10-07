import mongoose from 'mongoose';
import { initialPages, initialCaseRules } from '../data/initialKnowledge.js';

let isConnected = false;
let useInMemory = false;

// In-memory fallback store
export const memoryStore = {
  pages: [...initialPages],
  caseRules: [...initialCaseRules],
};

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('username:password')) {
    console.warn('⚠️  MONGODB_URI tidak dikonfigurasi atau masih default. Menggunakan penyimpanan In-Memory Paririmbon.');
    useInMemory = true;
    return false;
  }

  if (isConnected) {
    return true;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    isConnected = true;
    useInMemory = false;
    console.log(`✅ MongoDB Terhubung: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('❌ Gagal terhubung ke MongoDB:', error.message);
    console.warn('⚠️  Mengalihkan otomatis ke penyimpanan In-Memory Paririmbon agar aplikasi tetap berjalan lancar.');
    useInMemory = true;
    return false;
  }
};

export const isUsingInMemory = () => useInMemory;
