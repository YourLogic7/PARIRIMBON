const API_BASE = '/api';

export const api = {
  // --- Pages (Buku & Daftar Isi) ---
  async getPages() {
    const res = await fetch(`${API_BASE}/pages`);
    if (!res.ok) throw new Error('Gagal memuat halaman buku');
    const data = await res.json();
    return data.data;
  },

  async getPageById(id) {
    const res = await fetch(`${API_BASE}/pages/${id}`);
    if (!res.ok) throw new Error('Halaman tidak ditemukan');
    const data = await res.json();
    return data.data;
  },

  async createPage(pageData, token) {
    const res = await fetch(`${API_BASE}/pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(pageData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Gagal menambahkan halaman');
    return data.data;
  },

  async updatePage(id, pageData, token) {
    const res = await fetch(`${API_BASE}/pages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(pageData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Gagal memperbarui halaman');
    return data.data;
  },

  async deletePage(id, token) {
    const res = await fetch(`${API_BASE}/pages/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Gagal menghapus halaman');
    return data;
  },

  // --- AI Assist ---
  async getAiOptions() {
    const res = await fetch(`${API_BASE}/ai/options`);
    if (!res.ok) throw new Error('Gagal memuat opsi AI Assist');
    const data = await res.json();
    return data.data;
  },

  async getAiRecommendation(requestData) {
    const res = await fetch(`${API_BASE}/ai/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Gagal mendapatkan rekomendasi AI');
    return data.data;
  },

  async getAiRules() {
    const res = await fetch(`${API_BASE}/ai/rules`);
    if (!res.ok) throw new Error('Gagal memuat aturan AI');
    const data = await res.json();
    return data.data;
  },

  // --- Authentication ---
  async loginAdmin(username, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login gagal');
    return data;
  },

  async checkAdminSession(token) {
    const res = await fetch(`${API_BASE}/auth/session`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Sesi admin tidak valid');
    return await res.json();
  },
};
