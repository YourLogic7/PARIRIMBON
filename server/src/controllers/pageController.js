import { Page } from '../models/Page.js';
import { isUsingInMemory, memoryStore } from '../config/db.js';
import { initialPages } from '../data/initialKnowledge.js';

// Get all pages (Daftar Isi & Konten)
export const getAllPages = async (req, res) => {
  try {
    if (isUsingInMemory()) {
      return res.json({
        success: true,
        source: 'in-memory',
        data: memoryStore.pages.sort((a, b) => a.chapterNumber - b.chapterNumber),
      });
    }

    let pages = await Page.find().sort({ chapterNumber: 1 });

    // Seed if empty in MongoDB
    if (!pages || pages.length === 0) {
      await Page.insertMany(initialPages.map(({ id, ...rest }) => rest));
      pages = await Page.find().sort({ chapterNumber: 1 });
    }

    res.json({
      success: true,
      source: 'mongodb',
      data: pages,
    });
  } catch (error) {
    console.error('Error fetching pages:', error);
    // Graceful fallback to memory store if query fails
    res.json({
      success: true,
      source: 'in-memory-fallback',
      data: memoryStore.pages.sort((a, b) => a.chapterNumber - b.chapterNumber),
    });
  }
};

// Get single page by id
export const getPageById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isUsingInMemory()) {
      const page = memoryStore.pages.find((p) => p.id === id || p._id === id || String(p.chapterNumber) === id);
      if (!page) {
        return res.status(404).json({ success: false, message: 'Halaman tidak ditemukan' });
      }
      return res.json({ success: true, data: page });
    }

    const page = await Page.findById(id);
    if (!page) {
      return res.status(404).json({ success: false, message: 'Halaman tidak ditemukan' });
    }
    res.json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new page (Admin)
export const createPage = async (req, res) => {
  try {
    const { title, category, summary, content, tags, chapterNumber, readTime } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Judul dan konten wajib diisi' });
    }

    if (isUsingInMemory()) {
      const nextChapter = chapterNumber || memoryStore.pages.length + 1;
      const newPage = {
        id: `page-${Date.now()}`,
        _id: `page-${Date.now()}`,
        chapterNumber: Number(nextChapter),
        title,
        category: category || 'Umum',
        summary: summary || title,
        content,
        tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t) => t.trim()) : [],
        readTime: readTime || '3 min',
        lastUpdated: new Date().toISOString(),
      };
      memoryStore.pages.push(newPage);
      return res.status(201).json({ success: true, message: 'Halaman berhasil ditambahkan', data: newPage });
    }

    const count = await Page.countDocuments();
    const newPage = new Page({
      chapterNumber: chapterNumber || count + 1,
      title,
      category: category || 'Umum',
      summary: summary || title,
      content,
      tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t) => t.trim()) : [],
      readTime: readTime || '3 min',
    });

    const savedPage = await newPage.save();
    res.status(201).json({ success: true, message: 'Halaman berhasil ditambahkan ke Paririmbon', data: savedPage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update existing page (Admin)
export const updatePage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, summary, content, tags, chapterNumber, readTime } = req.body;

    if (isUsingInMemory()) {
      const index = memoryStore.pages.findIndex((p) => p.id === id || p._id === id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Halaman tidak ditemukan' });
      }

      memoryStore.pages[index] = {
        ...memoryStore.pages[index],
        title: title !== undefined ? title : memoryStore.pages[index].title,
        category: category !== undefined ? category : memoryStore.pages[index].category,
        summary: summary !== undefined ? summary : memoryStore.pages[index].summary,
        content: content !== undefined ? content : memoryStore.pages[index].content,
        tags: tags !== undefined ? (Array.isArray(tags) ? tags : tags.split(',').map((t) => t.trim())) : memoryStore.pages[index].tags,
        chapterNumber: chapterNumber !== undefined ? Number(chapterNumber) : memoryStore.pages[index].chapterNumber,
        readTime: readTime !== undefined ? readTime : memoryStore.pages[index].readTime,
        lastUpdated: new Date().toISOString(),
      };

      return res.json({
        success: true,
        message: 'Halaman berhasil diperbarui',
        data: memoryStore.pages[index],
      });
    }

    const updated = await Page.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(category && { category }),
        ...(summary && { summary }),
        ...(content && { content }),
        ...(tags && { tags: Array.isArray(tags) ? tags : tags.split(',').map((t) => t.trim()) }),
        ...(chapterNumber && { chapterNumber }),
        ...(readTime && { readTime }),
        lastUpdated: new Date(),
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Halaman tidak ditemukan' });
    }

    res.json({ success: true, message: 'Halaman berhasil diperbarui', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete page (Admin)
export const deletePage = async (req, res) => {
  try {
    const { id } = req.params;

    if (isUsingInMemory()) {
      const prevLength = memoryStore.pages.length;
      memoryStore.pages = memoryStore.pages.filter((p) => p.id !== id && p._id !== id);
      if (memoryStore.pages.length === prevLength) {
        return res.status(404).json({ success: false, message: 'Halaman tidak ditemukan' });
      }
      return res.json({ success: true, message: 'Halaman berhasil dihapus dari Paririmbon' });
    }

    const deleted = await Page.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Halaman tidak ditemukan' });
    }

    res.json({ success: true, message: 'Halaman berhasil dihapus dari Paririmbon' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
