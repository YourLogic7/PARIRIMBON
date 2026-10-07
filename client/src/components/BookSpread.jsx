import React, { useState } from 'react';
import { useBook } from '../context/BookContext';
import { TableOfContents } from './TableOfContents';
import { BookPage } from './BookPage';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ListOrdered,
  X,
  Compass,
  Sparkles,
} from 'lucide-react';

export const BookSpread = () => {
  const {
    currentPage,
    pages,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    closeBook,
    getCurrentPageData,
    setAiModalOpen,
  } = useBook();

  const [flipping, setFlipping] = useState(false);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setFlipping(true);
      setTimeout(() => {
        nextPage();
        setFlipping(false);
      }, 150);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setFlipping(true);
      setTimeout(() => {
        prevPage();
        setFlipping(false);
      }, 150);
    }
  };

  const activePageData = getCurrentPageData();

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-4 flex flex-col items-center">
      {/* Top Floating Control Bar */}
      <div className="w-full flex items-center justify-between mb-3 px-2 sm:px-4 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => goToPage(1)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
              currentPage === 1
                ? 'bg-amber-900/60 border-amber-600 text-amber-200 font-bold'
                : 'bg-stone-900 border-amber-900/40 text-stone-300 hover:bg-stone-800'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5 text-amber-400" />
            <span>Daftar Isi</span>
          </button>

          <span className="text-stone-400 text-xs hidden sm:inline">
            &bull; Menampilkan {currentPage === 1 ? 'Indeks Daftar Isi' : `Bab ${currentPage - 1}: ${activePageData?.title || ''}`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Page Indicator */}
          <span className="font-mono text-amber-300 bg-stone-900 px-2.5 py-1 rounded-md border border-amber-900/40 text-xs">
            Hal {currentPage} / {totalPages}
          </span>

          {/* Close Book Button */}
          <button
            onClick={closeBook}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 border border-red-800/40 text-red-200 text-xs transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tutup Buku</span>
          </button>
        </div>
      </div>

      {/* The 3D Open Book Spread */}
      <div className="relative w-full rounded-2xl p-2 sm:p-4 bg-gradient-to-b from-[#1c0f08] via-[#2a160d] to-[#120804] border-2 border-amber-900/80 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
        
        {/* Exterior Leather Border Margin & Stitches */}
        <div className="relative rounded-xl border border-dashed border-amber-700/40 bg-[#f6efe1] overflow-hidden shadow-2xl min-h-[580px] sm:min-h-[640px] flex flex-col md:flex-row">
          
          {/* LEFT SPREAD (Desktop) / Main Page View */}
          <div
            className={`flex-1 parchment-bg relative flex flex-col border-b md:border-b-0 md:border-r border-amber-900/20 transition-all duration-300 ${
              flipping ? 'opacity-70 scale-[0.99]' : 'opacity-100 scale-100'
            }`}
          >
            {/* Shading near left spine edge */}
            <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-amber-950/15 to-transparent pointer-events-none hidden md:block"></div>

            {/* Left Page Content: If on page 1, Table of Contents. If on chapter page, chapter overview or previous chapter */}
            {currentPage === 1 ? (
              <TableOfContents />
            ) : (
              <div className="h-full flex flex-col p-5 sm:p-8 text-stone-800">
                <div className="pb-3 border-b border-amber-900/20 mb-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-800 font-bold">
                    Ikhtisar Bab &bull; Paririmbon
                  </span>
                  <button
                    onClick={() => goToPage(1)}
                    className="text-xs text-amber-900 hover:underline flex items-center gap-1 font-serif font-semibold"
                  >
                    <ListOrdered className="w-3.5 h-3.5" />
                    Kembali ke Daftar Isi
                  </button>
                </div>

                <div className="my-auto py-6 text-center max-w-sm mx-auto">
                  <div className="w-16 h-16 rounded-full bg-amber-900/10 border border-amber-900/20 flex items-center justify-center mx-auto mb-4 text-amber-900">
                    <Compass className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif font-black text-xl text-stone-900 mb-2">
                    {activePageData?.title}
                  </h3>
                  <p className="text-xs text-stone-600 italic mb-6 leading-relaxed">
                    "{activePageData?.summary}"
                  </p>

                  <div className="p-3 rounded-lg bg-amber-100/60 border border-amber-900/15 text-left text-xs text-stone-700 space-y-2 mb-6">
                    <div className="font-serif font-bold text-amber-950 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                      Pedoman Penting Bab Ini:
                    </div>
                    <ul className="list-disc ml-4 space-y-1 text-[11px]">
                      <li>Pahami esensi SOP sebelum mengambil keputusan diskresi.</li>
                      <li>Gunakan panduan AI Assist bila menghadapi variasi kasus langka.</li>
                      <li>Verifikasi identitas dan status pelanggan secara berkala.</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setAiModalOpen(true)}
                    className="px-4 py-2 rounded-lg bg-amber-800 hover:bg-amber-900 text-amber-50 text-xs font-semibold shadow-md flex items-center justify-center gap-2 mx-auto transition-transform hover:scale-105"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Butuh Rekomendasi Kasus Terkait?</span>
                  </button>
                </div>

                <div className="pt-3 border-t border-amber-900/20 text-center text-xs font-serif font-bold text-amber-900">
                  Halaman {currentPage - 1} &bull; Paririmbon KMS
                </div>
              </div>
            )}
          </div>

          {/* CENTER BOOK SPINE (Realistic 3D Binding Shadow) */}
          <div className="hidden md:flex w-6 relative bg-gradient-to-r from-stone-400/20 via-black/25 to-stone-400/20 border-x border-amber-950/20 flex-col items-center justify-center">
            <div className="w-px h-full bg-black/30"></div>
            {/* Center stitched ribbon marker */}
            <div className="absolute top-0 w-2.5 h-20 bg-amber-800/80 rounded-b shadow-md"></div>
          </div>

          {/* RIGHT SPREAD (Desktop) / Active Chapter or Quick Welcome Guide */}
          <div
            className={`flex-1 parchment-bg relative flex flex-col transition-all duration-300 ${
              flipping ? 'opacity-70 scale-[0.99]' : 'opacity-100 scale-100'
            }`}
          >
            {/* Shading near right spine edge */}
            <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-amber-950/15 to-transparent pointer-events-none hidden md:block"></div>

            {/* Right Page Content */}
            {currentPage === 1 ? (
              // If on Page 1, Right page shows "Petunjuk & Panduan Singkat Paririmbon"
              <div className="h-full flex flex-col p-5 sm:p-8 text-stone-800">
                <div className="text-center pb-4 border-b border-amber-900/20 mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-amber-800 font-bold block mb-1">
                    Pedoman Penggunaan
                  </span>
                  <h3 className="font-serif font-black text-xl sm:text-2xl text-stone-900">
                    KITAB PANDUAN PARIRIMBON
                  </h3>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 text-xs leading-relaxed text-stone-700 pr-1">
                  <div className="p-3.5 rounded-xl bg-amber-100/60 border border-amber-900/20">
                    <h4 className="font-serif font-bold text-sm text-amber-950 mb-1 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-amber-800" />
                      Cara Menavigasi Paririmbon
                    </h4>
                    <p className="text-[12px] text-stone-700">
                      Klik salah satu topik di <strong>Daftar Isi</strong> (halaman kiri) untuk langsung membalik buku ke bab konten yang dituju. Anda juga dapat menggunakan tombol panah di bawah untuk membalik halaman secara berurutan.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-100/60 border border-amber-900/20">
                    <h4 className="font-serif font-bold text-sm text-amber-950 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-800" />
                      Menu Asisten AI (AI Assist)
                    </h4>
                    <p className="text-[12px] text-stone-700">
                      Menghadapi komplain atau kendala nasabah yang memerlukan respon cepat? Buka tombol <strong>AI Assist</strong> di bilah atas. Masukkan jenis kasus dan kondisi melalui dropdown, lalu sistem akan menyusun rekomendasi langkah taktis beserta template kalimat komunikasi profesional.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-100/60 border border-amber-900/20">
                    <h4 className="font-serif font-bold text-sm text-amber-950 mb-1 flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-amber-800" />
                      Hak Akses & Pengelolaan Admin
                    </h4>
                    <p className="text-[12px] text-stone-700">
                      Pengurus dan Administrator dapat menambahkan bab baru, memperbarui SOP, atau menghapus materi yang sudah usang melalui tombol <strong>Admin</strong>.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-amber-900/20 text-center text-xs font-serif font-bold text-amber-950 flex items-center justify-between">
                  <span className="text-[10px] text-stone-500 font-sans">Edisi Pegawai 2026</span>
                  <span>Halaman 1</span>
                  <span className="text-[10px] text-stone-500 font-sans">KMS Terpadu</span>
                </div>
              </div>
            ) : (
              // If on Page 2+, render the actual content of the active chapter!
              <BookPage page={activePageData} pageNumber={currentPage} />
            )}
          </div>
        </div>

        {/* Bottom Page Navigation Buttons & Slider */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-2 sm:px-4">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            disabled={currentPage <= 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              currentPage <= 1
                ? 'opacity-40 cursor-not-allowed bg-stone-900/50 text-stone-500'
                : 'bg-stone-900 hover:bg-stone-800 border border-amber-600/40 text-amber-300 shadow-md hover:scale-105 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Halaman Sebelumnya</span>
          </button>

          {/* Quick Chapter Selector Dots / Slider */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-xs sm:max-w-md py-1">
            <button
              onClick={() => goToPage(1)}
              className={`px-2 py-1 rounded text-[11px] font-mono transition-all ${
                currentPage === 1
                  ? 'bg-amber-600 text-stone-950 font-bold shadow'
                  : 'bg-stone-900/80 text-stone-400 hover:text-amber-200'
              }`}
              title="Daftar Isi"
            >
              Daftar Isi
            </button>
            {pages.map((p, idx) => {
              const pageIdx = idx + 2;
              return (
                <button
                  key={idx}
                  onClick={() => goToPage(pageIdx)}
                  className={`w-7 h-7 rounded text-[11px] font-serif transition-all flex items-center justify-center ${
                    currentPage === pageIdx
                      ? 'bg-amber-500 text-stone-950 font-black shadow-md scale-110'
                      : 'bg-stone-900/80 text-stone-400 hover:text-amber-200 border border-amber-900/30'
                  }`}
                  title={`Bab ${idx + 1}: ${p.title}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage >= totalPages}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              currentPage >= totalPages
                ? 'opacity-40 cursor-not-allowed bg-stone-900/50 text-stone-500'
                : 'bg-stone-900 hover:bg-stone-800 border border-amber-600/40 text-amber-300 shadow-md hover:scale-105 active:scale-95'
            }`}
          >
            <span>Halaman Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
