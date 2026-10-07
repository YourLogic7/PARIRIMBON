import React, { useState, useEffect } from 'react';
import { useBook } from '../context/BookContext';
import { api } from '../services/api';
import {
  Sparkles,
  X,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  BookOpen,
  Copy,
  Check,
  RefreshCw,
  HelpCircle,
  ShieldAlert,
} from 'lucide-react';

export const AiAssistModal = () => {
  const { aiModalOpen, setAiModalOpen, goToPage } = useBook();

  // Dropdown options
  const [options, setOptions] = useState({
    caseTypes: [],
    productTypes: [],
    customerTypes: [],
    conditionDetails: [],
  });

  // Selected values
  const [selectedCase, setSelectedCase] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [customNotes, setCustomNotes] = useState('');

  // Result & state
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [copiedScript, setCopiedScript] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Load dropdown options when modal is opened
  useEffect(() => {
    if (aiModalOpen) {
      api
        .getAiOptions()
        .then((data) => {
          setOptions(data);
          if (data.caseTypes?.length && !selectedCase) setSelectedCase(data.caseTypes[0]);
          if (data.productTypes?.length && !selectedProduct) setSelectedProduct(data.productTypes[0]);
          if (data.customerTypes?.length && !selectedCustomer) setSelectedCustomer(data.customerTypes[0]);
          if (data.conditionDetails?.length && !selectedCondition) setSelectedCondition(data.conditionDetails[0]);
        })
        .catch((err) => {
          console.error('Gagal memuat opsi AI:', err);
        });
    }
  }, [aiModalOpen]);

  if (!aiModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setRecommendation(null);

    try {
      const res = await api.getAiRecommendation({
        caseType: selectedCase,
        productType: selectedProduct,
        customerType: selectedCustomer,
        conditionDetail: selectedCondition,
        customNotes,
      });
      setRecommendation(res);
    } catch (err) {
      setErrorMsg(err.message || 'Gagal memproses rekomendasi AI');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyScript = () => {
    if (recommendation?.script) {
      navigator.clipboard.writeText(recommendation.script);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    }
  };

  const handleJumpToPage = (pageNum) => {
    setAiModalOpen(false);
    goToPage(pageNum);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-6 rounded-2xl bg-[#1c120c] border border-amber-600/40 shadow-2xl text-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-amber-950 via-[#2d180e] to-stone-950 border-b border-amber-700/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-600 text-stone-950 shadow-md">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-amber-200">
                AI Assist &bull; Panduan Kasus Pegawai
              </h3>
              <p className="text-xs text-stone-400">
                Pilih kondisi kasus untuk mendapatkan rekomendasi SOP dan skrip respon resmi
              </p>
            </div>
          </div>
          <button
            onClick={() => setAiModalOpen(false)}
            className="p-1.5 rounded-lg bg-stone-900/60 hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Input Form with Dropdowns */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Dropdown 1: Jenis Kasus */}
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1.5 flex items-center gap-1">
                  <span>1. Jenis Kasus / Masalah</span>
                  <HelpCircle className="w-3 h-3 text-stone-500" />
                </label>
                <select
                  value={selectedCase}
                  onChange={(e) => setSelectedCase(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-amber-900/50 text-xs sm:text-sm text-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {options.caseTypes?.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropdown 2: Kategori Produk */}
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                  2. Kategori Produk / Layanan
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-amber-900/50 text-xs sm:text-sm text-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {options.productTypes?.map((p, i) => (
                    <option key={i} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropdown 3: Status Pelanggan */}
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                  3. Status / Kategori Pelanggan
                </label>
                <select
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-amber-900/50 text-xs sm:text-sm text-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {options.customerTypes?.map((cust, i) => (
                    <option key={i} value={cust}>
                      {cust}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropdown 4: Kondisi Spesifik */}
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                  4. Kondisi Spesifik / Detail Kendala
                </label>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-amber-900/50 text-xs sm:text-sm text-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {options.conditionDetails?.map((cond, i) => (
                    <option key={i} value={cond}>
                      {cond}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Optional Additional Notes */}
            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1">
                Catatan Tambahan Kasus (Opsional)
              </label>
              <input
                type="text"
                placeholder="Contoh: Nomor invoice INV-2026-09 atau detail keluhan nasabah..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-amber-900/40 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Menganalisis Panduan Paririmbon...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-stone-950" />
                    <span>Dapatkan Panduan Solusi AI</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Recommendation Result Card */}
          {recommendation && (
            <div className="p-5 rounded-xl bg-stone-900/90 border border-amber-600/50 shadow-xl space-y-4 animate-fadeIn">
              
              {/* Header Status & SLA */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-amber-900/30">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase font-mono font-bold px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-700">
                    {recommendation.severity || 'Prosedur Standar'}
                  </span>
                  <span className="text-xs text-stone-400">
                    SOP Rujukan Terverifikasi
                  </span>
                </div>

                {recommendation.targetPageNumber && (
                  <button
                    onClick={() => handleJumpToPage(recommendation.targetPageNumber)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-900/40 hover:bg-amber-800/60 text-amber-200 text-xs font-semibold border border-amber-700/50 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>Buka Bab Terkait di Buku (Hal {recommendation.targetPageNumber})</span>
                  </button>
                )}
              </div>

              {/* Analisis Kasus */}
              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold mb-1">
                  1. Analisis Kasus & Kebijakan Terkait
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-black/20 p-3 rounded-lg border border-stone-800">
                  {recommendation.analysis}
                </p>
              </div>

              {/* Langkah Tindakan Bertahap */}
              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold mb-2">
                  2. Langkah-Langkah Panduan Penyelesaian
                </h4>
                <div className="space-y-2">
                  {recommendation.steps?.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg bg-black/30 border border-stone-800 text-xs sm:text-sm text-stone-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skrip Komunikasi ke Pelanggan */}
              {recommendation.script && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                      <span>3. Rekomendasi Skrip Percakapan Petugas</span>
                    </h4>
                    <button
                      onClick={handleCopyScript}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-200 text-[11px] transition-colors"
                    >
                      {copiedScript ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-300">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Salin Skrip</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-xs sm:text-sm text-amber-100 italic leading-relaxed">
                    "{recommendation.script}"
                  </div>
                </div>
              )}

              {/* Matriks Eskalasi */}
              {recommendation.escalationNote && (
                <div className="p-3 rounded-lg bg-yellow-950/30 border border-yellow-800/40 flex items-start gap-2 text-xs text-yellow-200">
                  <ShieldAlert className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold block text-yellow-300">
                      Ketentuan Batas Eskalasi:
                    </strong>
                    {recommendation.escalationNote}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-stone-950 border-t border-amber-900/40 flex items-center justify-between text-[11px] text-stone-500">
          <span>PARIRIMBON Knowledge Assistant &bull; Berbasis Panduan SOP Resmi</span>
          <button
            onClick={() => setAiModalOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
