import React, { useState } from 'react';
import { useBook } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';
import {
  Book,
  BookOpen,
  Sparkles,
  Bookmark,
  Volume2,
  VolumeX,
  ShieldCheck,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react';

export const Navbar = () => {
  const {
    isOpen,
    openBook,
    closeBook,
    soundEnabled,
    setSoundEnabled,
    setAiModalOpen,
    setAdminModalOpen,
    bookmarkedPages,
    goToPage,
    pages,
  } = useBook();

  const { isAdmin, adminUser, logout } = useAuth();
  const [bookmarkDropdownOpen, setBookmarkDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-stone-950/85 backdrop-blur-md border-b border-amber-900/40 text-stone-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          onClick={() => (isOpen ? closeBook() : openBook(1))}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 via-amber-800 to-amber-950 flex items-center justify-center border border-amber-500/50 shadow-md group-hover:scale-105 transition-transform">
            <Book className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-xl tracking-wider text-amber-200 group-hover:text-amber-100 transition-colors">
                PARIRIMBON
              </span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                KMS v1.0
              </span>
            </div>
            <p className="text-[11px] text-stone-400 -mt-0.5 hidden sm:block">
              Kitab Pengetahuan Produk Pegawai & Panduan Kasus Pintar
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Assist Button */}
          <button
            onClick={() => setAiModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-500 text-stone-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-900/40 hover:shadow-amber-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4 animate-pulse text-amber-100" />
            <span className="text-white drop-shadow-sm">AI Assist</span>
            <span className="hidden md:inline text-[11px] bg-black/20 text-amber-100 px-1 rounded ml-1">
              Panduan Kasus
            </span>
          </button>

          {/* Toggle Book Open / Close */}
          <button
            onClick={() => (isOpen ? closeBook() : openBook(1))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-amber-900/50 text-xs sm:text-sm text-amber-300 hover:text-amber-200 transition-colors"
          >
            {isOpen ? (
              <>
                <Book className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Tutup Buku</span>
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Buka Buku</span>
              </>
            )}
          </button>

          {/* Bookmarks Dropdown */}
          <div className="relative">
            <button
              onClick={() => setBookmarkDropdownOpen(!bookmarkDropdownOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-amber-900/40 text-xs sm:text-sm text-stone-300"
              title="Halaman Ditandai"
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              <span className="text-xs bg-amber-950 text-amber-300 border border-amber-800 px-1.5 py-0.2 rounded-full font-semibold">
                {bookmarkedPages.length}
              </span>
              <ChevronDown className="w-3 h-3 text-stone-400 hidden sm:inline" />
            </button>

            {bookmarkDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-stone-900 border border-amber-800/60 rounded-xl shadow-2xl py-2 z-50 text-xs">
                <div className="px-3 py-1.5 border-b border-stone-800 font-semibold text-amber-300 flex items-center justify-between">
                  <span>Halaman Ditandai</span>
                  <span className="text-[10px] text-stone-400">
                    {bookmarkedPages.length} halaman
                  </span>
                </div>
                {bookmarkedPages.length === 0 ? (
                  <div className="px-3 py-4 text-center text-stone-500">
                    Belum ada halaman yang ditandai. Klik ikon pita di halaman untuk menyimpan.
                  </div>
                ) : (
                  <div className="max-h-56 overflow-y-auto">
                    {bookmarkedPages.map((pageNum) => {
                      const pageTitle =
                        pageNum === 1
                          ? 'Daftar Isi'
                          : pages[pageNum - 2]?.title || `Bab ${pageNum - 1}`;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => {
                            goToPage(pageNum);
                            setBookmarkDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-amber-950/40 text-stone-300 hover:text-amber-200 flex items-center justify-between transition-colors"
                        >
                          <span className="truncate pr-2">{pageTitle}</span>
                          <span className="text-[10px] font-mono text-amber-400 bg-stone-800 px-1.5 py-0.5 rounded">
                            Hal {pageNum}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-amber-900/40 text-stone-400 hover:text-amber-300 transition-colors"
            title={soundEnabled ? 'Matikan Suara Kertas' : 'Aktifkan Suara Kertas'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-amber-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-500" />
            )}
          </button>

          {/* Admin Management Button */}
          {isAdmin ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setAdminModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/50 text-xs text-emerald-300 font-medium"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="hidden md:inline">Kelola Paririmbon</span>
              </button>
              <button
                onClick={logout}
                className="p-1.5 rounded-lg bg-stone-900 hover:bg-red-950 border border-red-900/30 text-stone-400 hover:text-red-300"
                title="Keluar Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAdminModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-amber-900/40 text-xs text-stone-300 hover:text-amber-300"
            >
              <User className="w-4 h-4 text-amber-400/80" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
