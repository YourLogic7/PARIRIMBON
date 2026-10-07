import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema(
  {
    chapterNumber: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      default: 'Umum',
    },
    summary: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    readTime: {
      type: String,
      default: '3 min',
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Page = mongoose.models.Page || mongoose.model('Page', pageSchema);
