import React, { useState, useEffect } from 'react';
import { useBook } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import {
  ShieldCheck,
  X,
  Lock,
  User,
  PlusCircle,
  Edit3,
  Trash2,
  Save,
  CheckCircle,
  AlertCircle,
  FileText,
  Database,
} from 'lucide-react';

export const AdminModal = () => {
  const {
    adminModalOpen,
    setAdminModalOpen,
    editingPage,
    setEditingPage,
    pages,
    reloadPages,
  } = useBook();

  const { isAdmin, adminToken, login, logout, authLoading } = useAuth();

  // Login form state
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('paririmbon2026');
  const [loginError, setLoginError] = useState('');

  // Page CRUD Form state
  const [formData, setFormData] = useState({
    chapterNumber: '',
    title: '',
    category: 'Dasar Produk',
    summary: '',
    content: '',
    tags: '',
    readTime: '3 min',
  });
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Sync form when editingPage changes
  useEffect(() => {
    if (editingPage) {
      setFormData({
        chapterNumber: editingPage.chapterNumber || '',
        title: editingPage.title || '',
        category: editingPage.category || 'Dasar Produk',
        summary: editingPage.summary || '',
        content: editingPage.content || '',
        tags: Array.isArray(editingPage.tags) ? editingPage.tags.join(', ') : '',
        readTime: editingPage.readTime || '3 min',
      });
    } else {
      setFormData({
        chapterNumber: pages.length + 1,
        title: '',
        category: 'Dasar Produk',
        summary: '',
        content: '',
        tags: '',
        readTime: '3 min',
      });
    }
  }, [editingPage, pages.length]);

  if (!adminModalOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    const res = await login(username, password);
    if (!res.success) {
      setLoginError(res.message || 'Kredensial salah');
    }
  };

  const handlePageFormSubmit = async (e) => {
    e.preventDefault();
    setActionError('');
    setActionSuccess('');
    setSubmitting(true);

    try {
      const payload = {
        chapterNumber: Number(formData.chapterNumber),
        title: formData.title,
        category: formData.category,
        summary: formData.summary,
        content: formData.content,
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
        readTime: formData.readTime,
      };

      if (editingPage) {
        await api.updatePage(editingPage._id || editingPage.id, payload, adminToken);
        setActionSuccess('Bab berhasil diperbarui di Paririmbon!');
      } else {
        await api.createPage(payload, adminToken);
        setActionSuccess('Bab baru berhasil ditambahkan ke Paririmbon!');
        setFormData({
          chapterNumber: pages.length + 2,
          title: '',
          category: 'Dasar Produk',
          summary: '',
          content: '',
          tags: '',
          readTime: '3 min',
        });
      }

      await reloadPages();
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err) {
      setActionError(err.message || 'Terjadi kesalahan');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (page) => {
    if (!window.confirm(`Hapus bab "${page.title}" dari Paririmbon?`)) return;
    try {
      await api.deletePage(page._id || page.id, adminToken);
      if (editingPage && (editingPage._id === page._id || editingPage.id === page.id)) {
        setEditingPage(null);
      }
      await reloadPages();
      setActionSuccess('Bab berhasil dihapus');
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err) {
      setActionError(err.message || 'Gagal menghapus bab');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl my-6 rounded-2xl bg-[#1b130e] border border-amber-600/40 shadow-2xl text-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-amber-950 via-[#2f190e] to-stone-950 border-b border-amber-700/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-700 text-stone-950 shadow-md">
              <ShieldCheck className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-amber-200">
                Panel Administrator Paririmbon
              </h3>
              <p className="text-xs text-stone-400">
                Kelola Daftar Isi, materi konten buku, dan aturan rekomendasi produk
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditingPage(null);
              setAdminModalOpen(false);
            }}
            className="p-1.5 rounded-lg bg-stone-900/60 hover:bg-stone-800 text-stone-400 hover:text-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {!isAdmin ? (
            // Admin Login Form
            <div className="max-w-md mx-auto py-8">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-amber-900/20 border border-amber-600/40 flex items-center justify-center mx-auto mb-3 text-amber-300">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-xl text-stone-100">
                  Masuk sebagai Administrator
                </h4>
                <p className="text-xs text-stone-400 mt-1">
                  Masukkan kredensial admin untuk menambah, mengedit, atau menghapus materi buku.
                </p>
              </div>

              {loginError && (
                <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Username Admin
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-stone-900 border border-amber-900/40 text-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-stone-900 border border-amber-900/40 text-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-[11px] text-amber-300/80">
                  Kredensial Default Sistem: <strong>admin</strong> / <strong>paririmbon2026</strong>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  {authLoading ? 'Memverifikasi...' : 'Masuk Panel Admin'}
                </button>
              </form>
            </div>
          ) : (
            // Admin Logged In Dashboard
            <div className="space-y-6">
              {/* Notification banners */}
              {actionSuccess && (
                <div className="p-3 rounded-lg bg-emerald-950/70 border border-emerald-700 text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{actionSuccess}</span>
                </div>
              )}
              {actionError && (
                <div className="p-3 rounded-lg bg-red-950/70 border border-red-700 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{actionError}</span>
                </div>
              )}

              {/* Form Section: Tambah / Edit Bab */}
              <div className="p-4 sm:p-5 rounded-xl bg-stone-900/80 border border-amber-800/40">
                <div className="flex items-center justify-between pb-3 border-b border-amber-900/30 mb-4">
                  <h4 className="font-serif font-bold text-base text-amber-200 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>
                      {editingPage
                        ? `Edit Materi: Bab ${editingPage.chapterNumber} - ${editingPage.title}`
                        : 'Tambah Bab Baru ke Paririmbon'}
                    </span>
                  </h4>
                  {editingPage && (
                    <button
                      onClick={() => setEditingPage(null)}
                      className="text-xs text-stone-400 hover:text-stone-200 underline"
                    >
                      Batal Edit / Buat Baru
                    </button>
                  )}
                </div>

                <form onSubmit={handlePageFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Nomor Bab
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.chapterNumber}
                        onChange={(e) => setFormData({ ...formData, chapterNumber: e.target.value })}
                        required
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-amber-900/40 text-xs text-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Kategori Bab
                      </label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="Contoh: Garansi & Retur, SOP Finansial"
                        required
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-amber-900/40 text-xs text-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Estimasi Waktu Baca
                      </label>
                      <input
                        type="text"
                        value={formData.readTime}
                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                        placeholder="Contoh: 4 min"
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-amber-900/40 text-xs text-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Judul Bab
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Contoh: SOP Penanganan Retur & Kerusakan Produk"
                      required
                      className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-amber-900/40 text-xs sm:text-sm text-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Ringkasan Singkat (Akan ditampilkan di Daftar Isi)
                    </label>
                    <input
                      type="text"
                      value={formData.summary}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      placeholder="Ringkasan poin-poin utama bab ini..."
                      required
                      className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-amber-900/40 text-xs text-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Konten Lengkap Bab (Mendukung Markdown, Tabel, dan List)
                    </label>
                    <textarea
                      rows={7}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Tuliskan teks SOP, spesifikasi produk, pedoman langkah-langkah di sini..."
                      required
                      className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-amber-900/40 text-xs sm:text-sm font-mono text-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Tag / Kata Kunci (Pisahkan dengan koma)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="SOP, Retur, Garansi, Panduan"
                      className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-amber-900/40 text-xs text-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    {editingPage && (
                      <button
                        type="button"
                        onClick={() => setEditingPage(null)}
                        className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-stone-300"
                      >
                        Batal
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingPage ? 'Simpan Perubahan' : 'Tambahkan Bab Baru'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Table / List of All Chapters */}
              <div className="p-4 sm:p-5 rounded-xl bg-stone-900/80 border border-amber-800/40">
                <h4 className="font-serif font-bold text-base text-amber-200 mb-3 flex items-center justify-between">
                  <span>Daftar Seluruh Bab Paririmbon ({pages.length})</span>
                  <span className="text-xs font-sans text-stone-400 font-normal">
                    Klik Edit untuk mengubah isi bab
                  </span>
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-stone-300">
                    <thead className="bg-stone-950 text-stone-400 uppercase font-mono border-b border-amber-900/30">
                      <tr>
                        <th className="px-3 py-2">Bab</th>
                        <th className="px-3 py-2">Judul</th>
                        <th className="px-3 py-2">Kategori</th>
                        <th className="px-3 py-2 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800">
                      {pages.map((p, idx) => (
                        <tr key={p._id || p.id || idx} className="hover:bg-amber-950/20">
                          <td className="px-3 py-2.5 font-mono text-amber-400 font-bold">
                            {p.chapterNumber || idx + 1}
                          </td>
                          <td className="px-3 py-2.5 font-serif font-semibold text-stone-200">
                            {p.title}
                          </td>
                          <td className="px-3 py-2.5">
                            <span className="px-2 py-0.5 rounded bg-stone-800 text-[10px]">
                              {p.category}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => setEditingPage(p)}
                              className="px-2 py-1 rounded bg-amber-900/40 hover:bg-amber-800 text-amber-200 inline-flex items-center gap-1"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(p)}
                              className="px-2 py-1 rounded bg-red-950/60 hover:bg-red-900 text-red-200 inline-flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Hapus</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Database info card */}
              <div className="p-3.5 rounded-lg bg-stone-950 border border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-amber-500" />
                  <span>
                    Status Basis Data: Terhubung ke MongoDB / In-Memory Failover Storage
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="text-red-400 hover:text-red-300 underline text-xs"
                >
                  Keluar dari Admin
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
