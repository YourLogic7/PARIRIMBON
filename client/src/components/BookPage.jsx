import React from 'react';
import { useBook } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';
import {
  Bookmark,
  Edit3,
  Sparkles,
  Calendar,
  Clock,
  Share2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const BookPage = ({ page, pageNumber }) => {
  const {
    bookmarkedPages,
    toggleBookmark,
    setAdminModalOpen,
    setEditingPage,
    setAiModalOpen,
  } = useBook();

  const { isAdmin } = useAuth();

  if (!page) {
    return (
      <div className="h-full flex items-center justify-center p-8 text-stone-500 italic">
        Halaman tidak ditemukan.
      </div>
    );
  }

  const isBookmarked = bookmarkedPages.includes(pageNumber);

  const handleEdit = () => {
    setEditingPage(page);
    setAdminModalOpen(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Tautan halaman disalin ke clipboard');
  };

  // Helper to parse and format markdown-like text nicely
  const renderFormattedContent = (text) => {
    if (!text) return null;

    const lines = text.split('\n');
    const elements = [];
    let tableBuffer = [];
    let inTable = false;

    const flushTable = (key) => {
      if (tableBuffer.length > 0) {
        const headerLine = tableBuffer[0];
        const rowLines = tableBuffer.slice(2); // Skip separator line

        const parseCols = (str) =>
          str
            .split('|')
            .filter((c, i, arr) => i > 0 && i < arr.length - 1)
            .map((c) => c.trim());

        const headers = parseCols(headerLine);

        elements.push(
          <div key={`table-${key}`} className="my-4 overflow-x-auto rounded-lg border border-amber-900/30 shadow-xs">
            <table className="w-full text-xs text-left text-stone-800">
              <thead className="bg-amber-100/90 font-serif text-amber-950 uppercase border-b border-amber-900/20">
                <tr>
                  {headers.map((h, i) => (
                    <th key={i} className="px-3 py-2">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-900/10 bg-amber-50/40">
                {rowLines.map((row, rIdx) => {
                  const cols = parseCols(row);
                  return (
                    <tr key={rIdx} className="hover:bg-amber-100/40">
                      {cols.map((col, cIdx) => (
                        <td key={cIdx} className="px-3 py-2">
                          {col.replace(/\*\*(.*?)\*\*/g, '$1')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
        tableBuffer = [];
        inTable = false;
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Table line detection
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        inTable = true;
        tableBuffer.push(trimmed);
        return;
      } else if (inTable) {
        flushTable(index);
      }

      // Headings
      if (trimmed.startsWith('### ')) {
        elements.push(
          <h4
            key={index}
            className="font-serif font-bold text-base sm:text-lg text-amber-950 mt-5 mb-2 flex items-center gap-1.5 border-b border-amber-900/15 pb-1"
          >
            <span className="w-1.5 h-4 bg-amber-700 rounded-full inline-block"></span>
            {trimmed.replace('### ', '')}
          </h4>
        );
      } else if (trimmed.startsWith('## ')) {
        elements.push(
          <h3
            key={index}
            className="font-serif font-black text-lg sm:text-xl text-stone-900 mt-6 mb-2 border-b border-amber-900/20 pb-1"
          >
            {trimmed.replace('## ', '')}
          </h3>
        );
      } else if (trimmed.startsWith('- ')) {
        // Bullet points
        const textContent = trimmed.replace('- ', '');
        elements.push(
          <li key={index} className="text-xs sm:text-sm text-stone-700 leading-relaxed ml-4 list-disc mb-1.5 marker:text-amber-800">
            <span
              dangerouslySetInnerHTML={{
                __html: textContent.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong class="text-stone-900 font-semibold">$1</strong>'
                ),
              }}
            />
          </li>
        );
      } else if (/^\d+\.\s/.test(trimmed)) {
        // Numbered list
        const textContent = trimmed.replace(/^\d+\.\s/, '');
        elements.push(
          <div key={index} className="text-xs sm:text-sm text-stone-700 leading-relaxed ml-2 flex items-start gap-2 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-800 shrink-0 mt-0.5" />
            <span
              dangerouslySetInnerHTML={{
                __html: textContent.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong class="text-stone-900 font-semibold">$1</strong>'
                ),
              }}
            />
          </div>
        );
      } else if (trimmed.length > 0) {
        // Regular paragraph
        elements.push(
          <p
            key={index}
            className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-3"
            dangerouslySetInnerHTML={{
              __html: trimmed.replace(
                /\*\*(.*?)\*\*/g,
                '<strong class="text-stone-900 font-semibold">$1</strong>'
              ),
            }}
          />
        );
      }
    });

    if (inTable) {
      flushTable('end');
    }

    return elements;
  };

  return (
    <div className="h-full flex flex-col p-4 sm:p-7 text-stone-800">
      {/* Top Header & Breadcrumb */}
      <div className="flex items-center justify-between pb-3 border-b border-amber-900/20 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-900/10 text-amber-900 border border-amber-900/20">
            Bab {page.chapterNumber}
          </span>
          <span className="text-xs font-serif text-stone-500 hidden sm:inline">
            &bull; {page.category}
          </span>
        </div>

        {/* Action Controls on Page */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => toggleBookmark(pageNumber)}
            className={`p-1.5 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-amber-800 text-amber-100 border-amber-900 shadow-sm'
                : 'bg-amber-100/50 hover:bg-amber-200/50 text-stone-600 border-amber-900/20'
            }`}
            title={isBookmarked ? 'Lepas tanda' : 'Tandai halaman ini'}
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopyLink}
            className="p-1.5 rounded-lg bg-amber-100/50 hover:bg-amber-200/50 text-stone-600 border border-amber-900/20"
            title="Salin Tautan"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          {isAdmin && (
            <button
              onClick={handleEdit}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-xs font-medium"
              title="Edit Bab Ini"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Edit</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Chapter Title */}
      <div className="mb-4">
        <h2 className="font-serif font-black text-xl sm:text-2xl text-stone-900 tracking-tight leading-snug mb-2">
          {page.title}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 italic bg-amber-50/80 p-2.5 rounded-lg border-l-3 border-amber-700">
          "{page.summary}"
        </p>
      </div>

      {/* Chapter Metadata Strip */}
      <div className="flex items-center gap-3 text-[11px] font-mono text-stone-500 mb-4 pb-2 border-b border-amber-900/10">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-amber-800" />
          {page.readTime || '4 min baca'}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-amber-800" />
          {new Date(page.lastUpdated || Date.now()).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>

      {/* Formatted Content Body (Scrollable) */}
      <div className="flex-1 overflow-y-auto pr-1 text-stone-800">
        {renderFormattedContent(page.content)}

        {/* AI Troubleshooter Recommendation Box for this Chapter */}
        <div className="mt-6 p-3.5 rounded-xl bg-gradient-to-r from-amber-100/90 via-amber-50 to-stone-100 border border-amber-600/30 shadow-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-700 text-amber-100">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-serif font-bold text-xs sm:text-sm text-stone-900">
                Hadapi Kasus Pelanggan Terkait Bab Ini?
              </h5>
              <p className="text-[11px] text-stone-600">
                Gunakan AI Assist untuk simulasi solusi bertahap dan skrip respon cepat.
              </p>
            </div>
          </div>
          <button
            onClick={() => setAiModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-amber-800 hover:bg-amber-900 text-amber-50 text-xs font-semibold shrink-0 transition-colors shadow-sm"
          >
            Buka AI
          </button>
        </div>

        {/* Tags */}
        {page.tags && page.tags.length > 0 && (
          <div className="mt-5 pt-3 border-t border-amber-900/15 flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] uppercase font-bold text-stone-500 mr-1">
              Topik:
            </span>
            {page.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[11px] bg-amber-100/70 border border-amber-900/15 text-amber-900 px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Page Footer Numbering */}
      <div className="pt-3 border-t border-amber-900/20 text-center text-xs font-serif font-bold text-amber-950 flex items-center justify-between">
        <span className="text-[10px] text-stone-500 font-sans">Paririmbon KMS</span>
        <span>Halaman {pageNumber}</span>
        <span className="text-[10px] text-stone-500 font-sans">Produk Internal</span>
      </div>
    </div>
  );
};
