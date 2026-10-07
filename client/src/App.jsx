import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { BookProvider, useBook } from './context/BookContext';
import { Navbar } from './components/Navbar';
import { BookCover } from './components/BookCover';
import { BookSpread } from './components/BookSpread';
import { AiAssistModal } from './components/AiAssistModal';
import { AdminModal } from './components/AdminModal';
import { Loader2 } from 'lucide-react';

const MainContent = () => {
  const { isOpen, loadingPages } = useBook();

  if (loadingPages) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-amber-200">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500 mb-3" />
        <h3 className="font-serif text-lg tracking-wider">Mempersiapkan Kitab Paririmbon...</h3>
        <p className="text-xs text-stone-400 mt-1">Memuat basis pengetahuan produk pegawai</p>
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-4">
      {isOpen ? <BookSpread /> : <BookCover />}
      <AiAssistModal />
      <AdminModal />
    </main>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <div className="min-h-screen bg-[#110e0c] bg-[radial-gradient(#26170e_1px,transparent_1px)] [background-size:24px_24px] text-stone-100 flex flex-col">
          <Navbar />
          <MainContent />
          <footer className="py-4 text-center text-stone-500 text-xs border-t border-amber-950/30">
            PARIRIMBON &bull; Knowledge Management System &copy; {new Date().getFullYear()} &bull; Dibuat untuk Pelayanan Prima Pegawai
          </footer>
        </div>
      </BookProvider>
    </AuthProvider>
  );
}
