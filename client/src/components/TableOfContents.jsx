import React, { useMemo } from 'react';
import { useBook } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  BookOpen,
  PlusCircle,
  Edit3,
  Trash2,
  Clock,
  Tag,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { api } from '../services/api';

export const TableOfContents = () => {
  const {
    pages,
    goToPage,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setAdminModalOpen,
    setEditingPage,
    reloadPages,
  } = useBook();

  const { isAdmin, adminToken } = useAuth();

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(['Semua']);
    pages.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [pages]);

  // Filtered pages based on search & category
  const filteredPages = useMemo(() => {
    return pages.filter((page) => {
      const matchCategory =
        selectedCategory === 'Semua' || page.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [pages, selectedCategory, searchQuery]);

  const handleDelete = async (e, page) => {
    e.stopPropagation();
    if (!window.confirm(`Hapus bab "${page.title}" dari Paririmbon?`)) return;

    try {
      await api.deletePage(page._id || page.id, adminToken);
      await reloadPages();
    } catch (err) {
      alert(err.message || 'Gagal menghapus bab');
    }
  };

  const handleEdit = (e, page) => {
    e.stopPropagation();
    setEditingPage(page);
    setAdminModalOpen(true);
  };

  return (
    <div className="h-full flex flex-col p-4 sm:p-7 text-stone-800">
      {/* Title & Ornamental Header */}
      <div className="text-center pb-4 border-b border-amber-900/20 mb-4">
        <span className="text-[11px] font-mono uppercase tracking-widest text-amber-800 font-bold block mb-1">
          Halaman Awal &bull; Indeks Paririmbon
        </span>
        <h2 className="font-serif font-black text-2xl sm:text-3xl text-stone-900 tracking-wide">
          DAFTAR ISI
        </h2>
        <div className="flex items-center justify-center gap-2 mt-1">
          <div className="h-px w-12 bg-amber-700/40"></div>
          <span className="text-amber-800 font-serif italic text-xs">
            Pilih bab untuk langsung membuka halaman konten
          </span>
          <div className="h-px w-12 bg-amber-700/40"></div>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-2.5 mb-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            placeholder="Cari bab, topik, atau kata kunci..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-amber-50/70 border border-amber-900/20 text-xs sm:text-sm text-stone-900 placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-700 focus:bg-white transition-all shadow-inner"
          />
        </div>

        {/* Categories Pill Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
          <Filter className="w-3.5 h-3.5 text-stone-500 shrink-0 mr-0.5" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all font-medium ${
                selectedCategory === cat
                  ? 'bg-amber-800 text-amber-50 shadow-sm'
                  : 'bg-stone-200/60 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Admin Action: Add New Chapter */}
      {isAdmin && (
        <div className="mb-3">
          <button
            onClick={() => {
              setEditingPage(null);
              setAdminModalOpen(true);
            }}
            className="w-full py-2 px-3 rounded-lg border-2 border-dashed border-emerald-600/60 bg-emerald-50/60 hover:bg-emerald-100/70 text-emerald-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-emerald-700" />
            <span>Tambah Bab Baru ke Paririmbon (Admin)</span>
          </button>
        </div>
      )}

      {/* Daftar Isi List Items (Scrollable) */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
        {filteredPages.length === 0 ? (
          <div className="text-center py-10 text-stone-500 text-xs">
            <BookOpen className="w-8 h-8 mx-auto text-amber-900/30 mb-2" />
            Tidak ada bab yang sesuai dengan pencarian.
          </div>
        ) : (
          filteredPages.map((page, index) => {
            // Find original page index in full list to calculate target page number
            const originalIndex = pages.findIndex(
              (p) => (p._id || p.id) === (page._id || page.id)
            );
            const targetPageNum = originalIndex >= 0 ? originalIndex + 2 : index + 2;

            return (
              <div
                key={page._id || page.id || index}
                onClick={() => goToPage(targetPageNum)}
                className="group relative p-3 sm:p-3.5 rounded-xl bg-amber-50/60 hover:bg-amber-100/90 border border-amber-900/15 hover:border-amber-700/40 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col gap-1.5"
              >
                {/* Header: Bab number & Category */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-amber-900/10 group-hover:bg-amber-800 group-hover:text-amber-100 text-amber-900 text-xs font-serif font-bold flex items-center justify-center transition-colors">
                      {page.chapterNumber || originalIndex + 1}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-stone-200/70 text-stone-700">
                      {page.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-mono text-stone-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-400" />
                      {page.readTime || '3 min'}
                    </span>
                    <span className="text-xs font-bold font-serif text-amber-900 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      Hal {targetPageNum}
                      <ArrowRight className="w-3.5 h-3.5 inline text-amber-700" />
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 group-hover:text-amber-950 transition-colors">
                  {page.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {page.summary}
                </p>

                {/* Tags & Admin Buttons */}
                <div className="flex items-center justify-between pt-1 border-t border-amber-900/10 mt-1">
                  <div className="flex items-center gap-1 overflow-hidden">
                    <Tag className="w-3 h-3 text-amber-800/60 shrink-0" />
                    <div className="flex items-center gap-1 truncate text-[10px] text-stone-500">
                      {(page.tags || []).slice(0, 3).map((t, i) => (
                        <span key={i} className="bg-stone-200/50 px-1.5 py-0.2 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {isAdmin && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => handleEdit(e, page)}
                        className="p-1 rounded hover:bg-amber-200 text-amber-900 transition-colors"
                        title="Edit Bab"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, page)}
                        className="p-1 rounded hover:bg-red-200 text-red-700 transition-colors"
                        title="Hapus Bab"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer hint */}
      <div className="pt-3 border-t border-amber-900/20 text-center text-[11px] text-stone-500 italic">
        Total {pages.length} Bab pengetahuan produk tersedia
      </div>
    </div>
  );
};
