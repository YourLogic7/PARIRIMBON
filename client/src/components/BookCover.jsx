import React from 'react';
import { useBook } from '../context/BookContext';
import { BookOpen, Sparkles, Compass, Shield, BookMarked, ArrowRight } from 'lucide-react';

export const BookCover = () => {
  const { openBook, setAiModalOpen, pages } = useBook();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
      {/* 3D Book Container */}
      <div className="relative group max-w-xl w-full">
        {/* Soft Book Drop Shadow & Glow */}
        <div className="absolute -inset-4 bg-gradient-to-r from-amber-900/30 via-yellow-900/20 to-stone-900/40 rounded-3xl blur-2xl opacity-70 group-hover:opacity-90 transition-opacity"></div>

        {/* Hardcover Outer Frame */}
        <div className="relative rounded-2xl p-3 sm:p-4 bg-gradient-to-b from-[#1f1008] via-[#2d170c] to-[#120804] border-2 border-amber-800/80 shadow-[0_30px_70px_rgba(0,0,0,0.85)]">
          
          {/* Decorative Gold Filigree Stitching Frame */}
          <div className="rounded-xl p-6 sm:p-10 border border-dashed border-amber-600/40 bg-radial-gradient relative overflow-hidden flex flex-col items-center text-center">
            
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

            {/* Corner Ornaments */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-500/70 pointer-events-none"></div>
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-500/70 pointer-events-none"></div>
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-500/70 pointer-events-none"></div>
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-500/70 pointer-events-none"></div>

            {/* Book Spine Fold Indicator (Left edge shading) */}
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/60 to-transparent pointer-events-none"></div>

            {/* Golden Header Subtitle */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/50 text-amber-300 text-xs tracking-widest uppercase font-semibold mb-6">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Knowledge Management System</span>
            </div>

            {/* Main Title */}
            <h1 className="font-serif font-black text-4xl sm:text-6xl tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-700 drop-shadow-md mb-2">
              PARIRIMBON
            </h1>

            {/* Subtitle in Indonesian */}
            <h2 className="font-serif italic text-amber-200/90 text-sm sm:text-lg tracking-wide mb-6">
              Kitab Pengetahuan Produk & Pedoman Pelayanan Prima
            </h2>

            {/* Central Ornate Emblem */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-amber-500/60 p-2 flex items-center justify-center shadow-inner bg-stone-950/40">
                <div className="w-full h-full rounded-full border border-dashed border-amber-400/50 flex flex-col items-center justify-center text-amber-400">
                  <Shield className="w-8 h-8 text-amber-400 mb-0.5" />
                  <span className="text-[10px] tracking-widest font-mono uppercase font-bold text-amber-300">
                    RESMI
                  </span>
                </div>
              </div>
            </div>

            {/* Brief Description */}
            <p className="text-stone-300/80 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-8">
              Pusat acuan terpadu bagi seluruh pegawai. Memuat spesifikasi produk, SOP transaksi, regulasi garansi, serta asisten AI interaktif untuk panduan penyelesaian kasus.
            </p>

            {/* Action Buttons on Cover */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              <button
                onClick={() => openBook(1)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-sm sm:text-base shadow-xl shadow-amber-950/60 hover:shadow-amber-500/30 transform hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <BookOpen className="w-5 h-5 text-stone-950" />
                <span>Buka Paririmbon</span>
                <ArrowRight className="w-4 h-4 text-stone-950 ml-1" />
              </button>

              <button
                onClick={() => setAiModalOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-amber-500/50 text-amber-300 font-semibold text-sm sm:text-base hover:border-amber-400 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI Panduan Kasus</span>
              </button>
            </div>

            {/* Quick Stats Strip */}
            <div className="mt-8 pt-6 border-t border-amber-900/40 w-full flex items-center justify-around text-center text-stone-400">
              <div>
                <span className="block font-serif font-bold text-lg sm:text-xl text-amber-300">
                  {pages.length} Bab
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-400">
                  Modul Materi
                </span>
              </div>
              <div className="h-7 w-px bg-amber-900/50"></div>
              <div>
                <span className="block font-serif font-bold text-lg sm:text-xl text-amber-300">
                  100%
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-400">
                  SOP Standar
                </span>
              </div>
              <div className="h-7 w-px bg-amber-900/50"></div>
              <div>
                <span className="block font-serif font-bold text-lg sm:text-xl text-amber-300">
                  AI Active
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-400">
                  Rekomendasi
                </span>
              </div>
            </div>

          </div>

          {/* Hanging Ribbon Bookmark from Bottom Edge */}
          <div className="absolute -bottom-7 left-12 w-6 h-12 bg-red-800 shadow-lg border-x border-red-950 flex flex-col justify-end items-center pointer-events-none">
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-red-800 translate-y-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
