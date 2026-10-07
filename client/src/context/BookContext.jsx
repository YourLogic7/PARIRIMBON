import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { playPageTurnSound } from '../components/SoundEffect';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // 1 = Daftar Isi, 2+ = Bab-bab buku
  const [pages, setPages] = useState([]);
  const [loadingPages, setLoadingPages] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  
  // Modals
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState(null);

  // Bookmarks saved in local storage
  const [bookmarkedPages, setBookmarkedPages] = useState(() => {
    try {
      const saved = localStorage.getItem('paririmbon_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const loadPages = async () => {
    setLoadingPages(true);
    try {
      const data = await api.getPages();
      setPages(data || []);
    } catch (err) {
      console.error('Gagal mengambil daftar halaman:', err);
    } finally {
      setLoadingPages(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  useEffect(() => {
    localStorage.setItem('paririmbon_bookmarks', JSON.stringify(bookmarkedPages));
  }, [bookmarkedPages]);

  const sound = () => {
    if (soundEnabled) {
      playPageTurnSound();
    }
  };

  const openBook = (targetPage = 1) => {
    sound();
    setCurrentPage(targetPage);
    setIsOpen(true);
  };

  const closeBook = () => {
    sound();
    setIsOpen(false);
  };

  const goToPage = (pageNumber) => {
    sound();
    // 1 is Daftar Isi, max is pages.length + 1
    const clamped = Math.max(1, Math.min(pageNumber, pages.length + 1));
    setCurrentPage(clamped);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const nextPage = () => {
    if (currentPage < pages.length + 1) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const toggleBookmark = (pageNumber) => {
    setBookmarkedPages((prev) =>
      prev.includes(pageNumber) ? prev.filter((p) => p !== pageNumber) : [...prev, pageNumber]
    );
  };

  // Helper to get content page by page index
  // Note: Page 1 = Daftar Isi. Page 2 = pages[0] (Bab 1), Page 3 = pages[1] (Bab 2)
  const getCurrentPageData = () => {
    if (currentPage === 1) return null; // Daftar Isi
    return pages[currentPage - 2] || null;
  };

  return (
    <BookContext.Provider
      value={{
        isOpen,
        currentPage,
        pages,
        loadingPages,
        soundEnabled,
        setSoundEnabled,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        aiModalOpen,
        setAiModalOpen,
        adminModalOpen,
        setAdminModalOpen,
        editingPage,
        setEditingPage,
        bookmarkedPages,
        openBook,
        closeBook,
        goToPage,
        nextPage,
        prevPage,
        toggleBookmark,
        reloadPages: loadPages,
        getCurrentPageData,
        totalPages: pages.length + 1, // 1 for Daftar Isi + N content chapters
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => useContext(BookContext);
